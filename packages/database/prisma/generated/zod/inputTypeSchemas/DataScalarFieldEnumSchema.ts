import { z } from 'zod';

export const DataScalarFieldEnumSchema = z.enum(['id','callDate','callType','source','destination','duration','talktime','disposition','audio','batchTranscriptionBaseUrl']);

export default DataScalarFieldEnumSchema;
