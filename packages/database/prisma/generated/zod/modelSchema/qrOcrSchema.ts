import { z } from 'zod';

/////////////////////////////////////////
// QR OCR SCHEMA
/////////////////////////////////////////

export const qrOcrSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  qrId: z.string(),
  isUploaded: z.boolean(),
  expiryAt: z.coerce.date(),
})

export type qrOcr = z.infer<typeof qrOcrSchema>

/////////////////////////////////////////
// QR OCR PARTIAL SCHEMA
/////////////////////////////////////////

export const qrOcrPartialSchema = qrOcrSchema.partial()

export type qrOcrPartial = z.infer<typeof qrOcrPartialSchema>

/////////////////////////////////////////
// QR OCR OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const qrOcrOptionalDefaultsSchema = qrOcrSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type qrOcrOptionalDefaults = z.infer<typeof qrOcrOptionalDefaultsSchema>

export default qrOcrSchema;
