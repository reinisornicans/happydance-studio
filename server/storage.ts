import { db } from "./db";
import { eq, gte, lte, and, sql } from "drizzle-orm";
import {
  inquiries,
  timeSlots,
  bookings,
  type InsertInquiry,
  type Inquiry,
  type InsertTimeSlot,
  type TimeSlot,
  type InsertBooking,
  type Booking
} from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  listTimeSlots(from?: Date, to?: Date): Promise<TimeSlot[]>;
  getTimeSlot(id: number): Promise<TimeSlot | undefined>;
  createTimeSlot(slot: InsertTimeSlot): Promise<TimeSlot>;
  updateTimeSlot(id: number, updates: Partial<InsertTimeSlot>): Promise<TimeSlot | undefined>;
  deleteTimeSlot(id: number): Promise<boolean>;
  getAvailableSlots(from: Date, to: Date): Promise<TimeSlot[]>;
  createBooking(booking: InsertBooking, sessionId: string): Promise<Booking>;
  confirmBookingBySession(sessionId: string): Promise<Booking | undefined>;
  cancelBookingBySession(sessionId: string): Promise<Booking | undefined>;
  getBookingBySession(sessionId: string): Promise<Booking | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async listTimeSlots(from?: Date, to?: Date): Promise<TimeSlot[]> {
    let query = db.select().from(timeSlots);
    
    if (from && to) {
      return await db.select().from(timeSlots)
        .where(and(gte(timeSlots.startAt, from), lte(timeSlots.startAt, to)))
        .orderBy(timeSlots.startAt);
    }
    
    return await db.select().from(timeSlots).orderBy(timeSlots.startAt);
  }

  async getTimeSlot(id: number): Promise<TimeSlot | undefined> {
    const [slot] = await db.select().from(timeSlots).where(eq(timeSlots.id, id));
    return slot;
  }

  async createTimeSlot(slot: InsertTimeSlot): Promise<TimeSlot> {
    const [created] = await db.insert(timeSlots).values(slot).returning();
    return created;
  }

  async updateTimeSlot(id: number, updates: Partial<InsertTimeSlot>): Promise<TimeSlot | undefined> {
    const [updated] = await db
      .update(timeSlots)
      .set(updates)
      .where(eq(timeSlots.id, id))
      .returning();
    return updated;
  }

  async deleteTimeSlot(id: number): Promise<boolean> {
    const result = await db.delete(timeSlots).where(eq(timeSlots.id, id)).returning();
    return result.length > 0;
  }

  async getAvailableSlots(from: Date, to: Date): Promise<TimeSlot[]> {
    return await db.select().from(timeSlots)
      .where(and(
        gte(timeSlots.startAt, from),
        lte(timeSlots.startAt, to),
        eq(timeSlots.status, "available"),
        sql`${timeSlots.bookedCount} < ${timeSlots.capacity}`
      ))
      .orderBy(timeSlots.startAt);
  }

  async createBooking(booking: InsertBooking, sessionId: string): Promise<Booking> {
    const [created] = await db.insert(bookings).values({
      ...booking,
      status: "pending_payment",
      stripeSessionId: sessionId
    }).returning();
    
    await db.update(timeSlots)
      .set({ bookedCount: sql`${timeSlots.bookedCount} + 1` })
      .where(eq(timeSlots.id, booking.slotId));
    
    return created;
  }

  async confirmBookingBySession(sessionId: string): Promise<Booking | undefined> {
    const [updated] = await db
      .update(bookings)
      .set({ status: "confirmed" })
      .where(eq(bookings.stripeSessionId, sessionId))
      .returning();
    return updated;
  }

  async cancelBookingBySession(sessionId: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings)
      .where(eq(bookings.stripeSessionId, sessionId));
    
    if (booking) {
      await db.update(timeSlots)
        .set({ bookedCount: sql`GREATEST(${timeSlots.bookedCount} - 1, 0)` })
        .where(eq(timeSlots.id, booking.slotId));
      
      const [updated] = await db
        .update(bookings)
        .set({ status: "cancelled" })
        .where(eq(bookings.stripeSessionId, sessionId))
        .returning();
      return updated;
    }
    return undefined;
  }

  async getBookingBySession(sessionId: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings)
      .where(eq(bookings.stripeSessionId, sessionId));
    return booking;
  }
}

export const storage = new DatabaseStorage();
