import { z } from 'zod';

/////////////////////////////////////////
// DATA SCHEMA
/////////////////////////////////////////

export const DataSchema = z.object({
  id: z.number().int(),
  callDate: z.coerce.date(),
  callType: z.string(),
  source: z.string(),
  destination: z.string(),
  duration: z.number().int(),
  talktime: z.number().int(),
  disposition: z.string(),
  audio: z.string(),
  batchTranscriptionBaseUrl: z.string().nullable(),
})

export type Data = z.infer<typeof DataSchema>

/////////////////////////////////////////
// DATA PARTIAL SCHEMA
/////////////////////////////////////////

export const DataPartialSchema = DataSchema.partial()

export type DataPartial = z.infer<typeof DataPartialSchema>

/////////////////////////////////////////
// DATA OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DataOptionalDefaultsSchema = DataSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type DataOptionalDefaults = z.infer<typeof DataOptionalDefaultsSchema>

export default DataSchema;
