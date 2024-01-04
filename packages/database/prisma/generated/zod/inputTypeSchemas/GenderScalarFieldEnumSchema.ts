import { z } from 'zod';

export const GenderScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export default GenderScalarFieldEnumSchema;
