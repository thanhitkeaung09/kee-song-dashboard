// Generate secret key
import { randomBytes } from 'crypto';

export const secretKey = randomBytes(32).toString('hex');

// console.log('Generated Secret Key:', secretKey);