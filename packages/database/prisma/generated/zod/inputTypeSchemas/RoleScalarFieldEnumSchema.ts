import { z } from 'zod';

export const RoleScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export default RoleScalarFieldEnumSchema;
