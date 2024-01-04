import { z } from 'zod';

/////////////////////////////////////////
// GENDER SCHEMA
/////////////////////////////////////////

export const GenderSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Gender = z.infer<typeof GenderSchema>

/////////////////////////////////////////
// GENDER PARTIAL SCHEMA
/////////////////////////////////////////

export const GenderPartialSchema = GenderSchema.partial()

export type GenderPartial = z.infer<typeof GenderPartialSchema>

/////////////////////////////////////////
// GENDER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const GenderOptionalDefaultsSchema = GenderSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type GenderOptionalDefaults = z.infer<typeof GenderOptionalDefaultsSchema>

export default GenderSchema;
