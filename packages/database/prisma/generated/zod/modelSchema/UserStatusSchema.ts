import { z } from 'zod';

/////////////////////////////////////////
// USER STATUS SCHEMA
/////////////////////////////////////////

export const UserStatusSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserStatus = z.infer<typeof UserStatusSchema>

/////////////////////////////////////////
// USER STATUS PARTIAL SCHEMA
/////////////////////////////////////////

export const UserStatusPartialSchema = UserStatusSchema.partial()

export type UserStatusPartial = z.infer<typeof UserStatusPartialSchema>

/////////////////////////////////////////
// USER STATUS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserStatusOptionalDefaultsSchema = UserStatusSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserStatusOptionalDefaults = z.infer<typeof UserStatusOptionalDefaultsSchema>

export default UserStatusSchema;
