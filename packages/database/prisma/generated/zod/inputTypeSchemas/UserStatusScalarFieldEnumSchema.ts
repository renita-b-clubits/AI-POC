import { z } from 'zod';

export const UserStatusScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export default UserStatusScalarFieldEnumSchema;
