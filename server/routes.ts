import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertTimeSlotSchema, insertBookingSchema } from "@shared/schema";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { appendInquiryToSheet } from "./googleSheets";
import { sendAutoReply, sendNotificationToOwner } from "./gmailClient";

const shopProducts = [
  {
    id: "interactive-posters",
    name: "Interactive Posters – Classroom Tools for Inspired Teaching",
    price: 1199,
    image: "https://pe56d.s3.amazonaws.com/o_1iuplhgof4036f21cfgjlg1hk517.png",
    description: "Beautifully designed classroom posters that inspire movement and mindfulness."
  },
  {
    id: "mindful-journal",
    name: "Mindful Dance Teacher's Journal – A Printable Guide for Reflection & Planning",
    price: 1499,
    image: "https://pe56d.s3.amazonaws.com/o_1iupkr22j15e3hpt177s1lt41qa7r.png",
    description: "A thoughtfully crafted journal for dance educators."
  },
  {
    id: "companion-pack",
    name: "Mindful Dance Teacher: Printable Companion Pack",
    price: 2499,
    image: "https://pe56d.s3.amazonaws.com/o_1iupja5fa1ql91f6ci871m041uvhr.png",
    description: "The complete companion pack featuring all essential printables."
  },
  {
    id: "attuned-class",
    name: "The Attuned Class – 7 Mindful Starters for Intentional Teaching",
    price: 0,
    image: "https://pe56d.s3.amazonaws.com/o_1isdkt2rj1cho1ql544dkjiq1h11.png",
    description: "A free collection of 7 mindful class starters."
  }
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      const inquiryData = {
        name: input.name,
        email: input.email,
        subject: input.subject || 'General Inquiry',
        message: input.message,
      };
      appendInquiryToSheet(inquiryData);
      sendAutoReply(input.email, input.name);
      sendNotificationToOwner(inquiryData);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get("/api/stripe/publishable-key", async (req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (err) {
      res.status(500).json({ error: "Failed to get Stripe key" });
    }
  });

  app.get("/api/time-slots", async (req, res) => {
    try {
      const { from, to } = req.query;
      const fromDate = from ? new Date(from as string) : undefined;
      const toDate = to ? new Date(to as string) : undefined;
      const slots = await storage.listTimeSlots(fromDate, toDate);
      res.json(slots);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch time slots" });
    }
  });

  app.post("/api/time-slots", async (req, res) => {
    try {
      const input = insertTimeSlotSchema.parse({
        ...req.body,
        startAt: new Date(req.body.startAt)
      });
      const slot = await storage.createTimeSlot(input);
      res.status(201).json(slot);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.patch("/api/time-slots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      if (updates.startAt) {
        updates.startAt = new Date(updates.startAt);
      }
      const slot = await storage.updateTimeSlot(id, updates);
      if (!slot) {
        return res.status(404).json({ error: "Time slot not found" });
      }
      res.json(slot);
    } catch (err) {
      res.status(500).json({ error: "Failed to update time slot" });
    }
  });

  app.delete("/api/time-slots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteTimeSlot(id);
      if (!deleted) {
        return res.status(404).json({ error: "Time slot not found" });
      }
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete time slot" });
    }
  });

  app.get("/api/booking/availability", async (req, res) => {
    try {
      const { from, to } = req.query;
      if (!from || !to) {
        return res.status(400).json({ error: "from and to dates are required" });
      }
      const slots = await storage.getAvailableSlots(
        new Date(from as string),
        new Date(to as string)
      );
      res.json(slots);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  });

  app.post("/api/booking/checkout", async (req, res) => {
    try {
      const { slotId, customerName, customerEmail } = req.body;
      
      const slot = await storage.getTimeSlot(slotId);
      if (!slot) {
        return res.status(404).json({ error: "Time slot not found" });
      }
      
      if (slot.status !== "available" || slot.bookedCount >= slot.capacity) {
        return res.status(400).json({ error: "Time slot is not available" });
      }

      const stripe = await getUncachableStripeClient();
      
      const slotDate = new Date(slot.startAt);
      const formattedDate = slotDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'eur',
            unit_amount: slot.priceEur,
            product_data: {
              name: 'Private Dance Session',
              description: `Couples dance session on ${formattedDate} (${slot.durationMinutes} minutes)`,
            },
          },
          quantity: 1,
        }],
        mode: 'payment',
        customer_email: customerEmail,
        success_url: `${req.protocol}://${req.get('host')}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.protocol}://${req.get('host')}/couples`,
        metadata: {
          slotId: slotId.toString(),
          customerName,
          customerEmail
        }
      });

      await storage.createBooking(
        { slotId, customerName, customerEmail },
        session.id
      );

      res.json({ url: session.url });
    } catch (err: any) {
      console.error("Checkout error:", err);
      res.status(500).json({ error: err.message || "Failed to create checkout session" });
    }
  });

  app.post("/api/booking/confirm", async (req, res) => {
    try {
      const { sessionId } = req.body;
      const booking = await storage.confirmBookingBySession(sessionId);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (err) {
      res.status(500).json({ error: "Failed to confirm booking" });
    }
  });

  app.get("/api/booking/:sessionId", async (req, res) => {
    try {
      const booking = await storage.getBookingBySession(req.params.sessionId);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      const slot = await storage.getTimeSlot(booking.slotId);
      res.json({ booking, slot });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.post("/api/shop/checkout", async (req, res) => {
    try {
      const { items, customerEmail } = req.body;
      
      if (!items || items.length === 0) {
        return res.status(400).json({ error: "No items provided" });
      }

      const stripe = await getUncachableStripeClient();

      const lineItems = items.map((item: { id: string; quantity: number }) => {
        const product = shopProducts.find(p => p.id === item.id);
        if (!product) {
          throw new Error(`Product ${item.id} not found`);
        }
        
        if (product.price === 0) {
          return null;
        }

        return {
          price_data: {
            currency: 'eur',
            unit_amount: product.price,
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.image],
            },
          },
          quantity: item.quantity,
        };
      }).filter(Boolean);

      if (lineItems.length === 0) {
        return res.json({ url: null, freeItems: true });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        customer_email: customerEmail,
        success_url: `${req.protocol}://${req.get('host')}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.protocol}://${req.get('host')}/checkout`,
      });

      res.json({ url: session.url });
    } catch (err: any) {
      console.error("Shop checkout error:", err);
      res.status(500).json({ error: err.message || "Failed to create checkout session" });
    }
  });

  return httpServer;
}
