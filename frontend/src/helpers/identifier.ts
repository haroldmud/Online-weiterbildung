import {v4 as uuidv4} from 'uuid';

export function generateIdentifier(): string {
  const timestamp = new Date().getTime().toString();
  return `${uuidv4()} ${timestamp}`;
}
