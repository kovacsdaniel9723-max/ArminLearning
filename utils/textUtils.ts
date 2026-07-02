/**
 * Szöveg normalizálás játékokhoz.
 * Minden felhasználói bemenet és összehasonlítás lowercase + trim.
 * Magyar ékezetes betűk megmaradnak: á é í ó ö ő ú ü ű
 */
export const normalizeInput = (input: string): string =>
  input.toLowerCase().trim();
