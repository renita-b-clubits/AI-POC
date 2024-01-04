import { z } from 'zod';

export const DemoPatientScalarFieldEnumSchema = z.enum(['id','firstName','middleName','lastName','dateOfBirth','contactNumber','address','city','state','country','remarks','genderId','createdAt','updatedAt']);

export default DemoPatientScalarFieldEnumSchema;
