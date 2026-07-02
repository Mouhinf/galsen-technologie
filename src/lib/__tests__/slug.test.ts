import { generateSlug } from '../slug';

describe('generateSlug', () => {
  it('converts simple title to slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('removes accents', () => {
    expect(generateSlug('Éléphant numérique')).toBe('elephant-numerique');
  });

  it('replaces & with et', () => {
    expect(generateSlug('Web & Mobile')).toBe('web-et-mobile');
  });

  it('removes special characters', () => {
    expect(generateSlug('Sécurité 2024!')).toBe('securite-2024');
  });

  it('handles multiple spaces and dashes', () => {
    expect(generateSlug('  Galsen   Technologie  ')).toBe('galsen-technologie');
  });

  it('handles empty or edge input', () => {
    expect(generateSlug(' ')).toBe('');
  });
});
