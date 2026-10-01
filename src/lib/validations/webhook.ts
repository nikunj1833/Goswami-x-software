import { z } from "zod";

export const whatsAppWebhookMessageSchema = z.object({
  from: z.string().optional(),
  id: z.string().optional(),
  timestamp: z.string().optional(),
  type: z.string().optional(),
  text: z.object({ body: z.string() }).optional(),
});

export const whatsAppWebhookStatusSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  timestamp: z.string().optional(),
  recipient_id: z.string().optional(),
});

export const whatsAppWebhookValueSchema = z.object({
  messaging_product: z.literal("whatsapp").optional(),
  metadata: z
    .object({
      display_phone_number: z.string().optional(),
      phone_number_id: z.string().optional(),
    })
    .optional(),
  messages: z.array(whatsAppWebhookMessageSchema).optional(),
  statuses: z.array(whatsAppWebhookStatusSchema).optional(),
});

export const whatsAppWebhookChangeSchema = z.object({
  field: z.string(),
  value: whatsAppWebhookValueSchema,
});

export const whatsAppWebhookEntrySchema = z.object({
  id: z.string(),
  changes: z.array(whatsAppWebhookChangeSchema),
});

export const whatsAppWebhookPayloadSchema = z.object({
  object: z.literal("whatsapp_business_account"),
  entry: z.array(whatsAppWebhookEntrySchema),
});

export type WhatsAppWebhookPayload = z.infer<typeof whatsAppWebhookPayloadSchema>;
