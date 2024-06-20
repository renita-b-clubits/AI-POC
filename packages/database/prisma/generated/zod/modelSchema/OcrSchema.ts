import { z } from 'zod';

/////////////////////////////////////////
// OCR SCHEMA
/////////////////////////////////////////

export const OcrSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  type: z.string(),
  extractedData: z.string(),
  uploadedData: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.number().int().nullable(),
  updatedById: z.number().int().nullable(),
  qrId: z.string().nullable(),
})

export type Ocr = z.infer<typeof OcrSchema>

/////////////////////////////////////////
// OCR PARTIAL SCHEMA
/////////////////////////////////////////

export const OcrPartialSchema = OcrSchema.partial()

export type OcrPartial = z.infer<typeof OcrPartialSchema>

/////////////////////////////////////////
// OCR OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OcrOptionalDefaultsSchema = OcrSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type OcrOptionalDefaults = z.infer<typeof OcrOptionalDefaultsSchema>

export default OcrSchema;
