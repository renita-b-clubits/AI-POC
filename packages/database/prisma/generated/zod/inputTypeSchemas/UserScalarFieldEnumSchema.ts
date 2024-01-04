import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','username','password','name','mobile','email','otp','expiryTime','twoFactor','roleId','statusId','createdAt','updatedAt','createdById','updatedById']);

export default UserScalarFieldEnumSchema;
