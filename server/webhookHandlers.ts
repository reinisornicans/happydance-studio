import { getStripeSync } from './stripeClient';
import { storage } from './storage';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. '
      );
    }

    const sync = await getStripeSync();
    await sync.processWebhook(payload, signature);
  }

  static async handleCheckoutCompleted(sessionId: string): Promise<void> {
    await storage.confirmBookingBySession(sessionId);
  }

  static async handlePaymentFailed(sessionId: string): Promise<void> {
    await storage.cancelBookingBySession(sessionId);
  }
}
