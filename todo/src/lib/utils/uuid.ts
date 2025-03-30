export type UUID = string;

export const generateUUID = (): UUID => {
  return crypto.randomUUID();
};