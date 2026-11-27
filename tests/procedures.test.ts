import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { diffSlugs, PROCEDURE_ORDER, sortBySlugOrder } from '../src/lib/procedure-meta';

const list = (l: string) =>
  readdirSync(`src/content/procedures/${l}`).filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));

describe('procedures', () => {
  it('EN and TR have the same slugs', () => {
    expect(() => diffSlugs(list('en'), list('tr'))).not.toThrow();
  });
  it('diffSlugs reports the missing TR slug', () => {
    expect(() => diffSlugs(['a', 'b'], ['a'])).toThrow('Missing TR: b');
    expect(() => diffSlugs(['a'], ['a', 'c'])).toThrow('Missing EN: c');
  });
  it('content covers exactly the featured procedures, in order', () => {
    expect([...list('en')].sort()).toEqual([...PROCEDURE_ORDER].sort());
    expect(sortBySlugOrder(list('en').map((slug) => ({ slug })))[0].slug).toBe('deep-plane-facelift');
  });
  it('has no dental, hair or obesity pages', () => {
    expect(list('en').join(' ')).not.toMatch(/dental|hair|obesity|gastric/);
  });
});
