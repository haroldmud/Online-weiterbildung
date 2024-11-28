import { randomBytes } from 'crypto';

export const generateSecureToken = (length: number = 32): string => {
  return randomBytes(length).toString('hex');
};
