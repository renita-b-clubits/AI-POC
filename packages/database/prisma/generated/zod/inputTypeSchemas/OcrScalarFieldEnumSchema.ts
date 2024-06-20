import { z } from 'zod';

export const OcrScalarFieldEnumSchema = z.enum(['id','userId','type','extractedData','uploadedData','createdAt','updatedAt','createdById','updatedById','qrId']);

export default OcrScalarFieldEnumSchema;
