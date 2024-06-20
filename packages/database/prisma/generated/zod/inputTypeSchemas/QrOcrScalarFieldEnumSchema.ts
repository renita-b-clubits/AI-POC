import { z } from 'zod';

export const QrOcrScalarFieldEnumSchema = z.enum(['id','userId','createdAt','updatedAt','qrId','isUploaded','expiryAt']);

export default QrOcrScalarFieldEnumSchema;
