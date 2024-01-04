import { z } from 'zod';

/////////////////////////////////////////
// DEMO PATIENT SCHEMA
/////////////////////////////////////////

export const DemoPatientSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string(),
  dateOfBirth: z.coerce.date(),
  contactNumber: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  remarks: z.string().nullable(),
  genderId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type DemoPatient = z.infer<typeof DemoPatientSchema>

/////////////////////////////////////////
// DEMO PATIENT PARTIAL SCHEMA
/////////////////////////////////////////

export const DemoPatientPartialSchema = DemoPatientSchema.partial()

export type DemoPatientPartial = z.infer<typeof DemoPatientPartialSchema>

/////////////////////////////////////////
// DEMO PATIENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DemoPatientOptionalDefaultsSchema = DemoPatientSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DemoPatientOptionalDefaults = z.infer<typeof DemoPatientOptionalDefaultsSchema>

export default DemoPatientSchema;
