import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl } from '../src/lib/whatsapp';

describe('buildWhatsAppUrl', () => {
  it('has no text param without a message', () => {
    expect(buildWhatsAppUrl()).toBe('https://wa.me/905421548578');
  });
  it('round-trips special and Turkish characters', () => {
    const msg = 'Hello & İstanbul? ğş';
    const url = new URL(buildWhatsAppUrl(msg));
    expect(url.searchParams.get('text')).toBe(msg);
    expect(url.search).not.toContain('&İ');
  });
  it('encodes newlines as %0A', () => {
    expect(buildWhatsAppUrl('a\nb')).toContain('a%0Ab');
  });
});
