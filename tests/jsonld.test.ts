import { describe, it, expect } from 'vitest';
import { clinicJsonLd, physicianJsonLd, procedureJsonLd, faqJsonLd, breadcrumbJsonLd } from '../src/lib/jsonld';
import { site } from '../src/config/site';

const BANNED = /aggregateRating|"review"|offers|price/i;

describe('jsonld', () => {
  const proc = { slug: 'lip-lift', title: 'Lip lift', summary: 'Shortens the lip.' };
  it('has correct types', () => {
    expect(clinicJsonLd('en')['@type']).toBe('MedicalClinic');
    expect(physicianJsonLd('tr')['@type']).toBe('Physician');
    expect(procedureJsonLd('en', proc)['@type']).toBe('MedicalProcedure');
    expect(faqJsonLd([{ q: 'Q?', a: 'A.' }])['@type']).toBe('FAQPage');
    expect(breadcrumbJsonLd([{ name: 'Home', path: '/' }])['@type']).toBe('BreadcrumbList');
  });
  it('never outputs ratings, reviews or prices by default', () => {
    for (const o of [clinicJsonLd('en'), physicianJsonLd('en'), procedureJsonLd('en', proc)])
      expect(JSON.stringify(o)).not.toMatch(BANNED);
  });
  it('outputs aggregateRating only when configured', () => {
    site.reviewLinks.aggregate = { rating: 4.9, count: 120 };
    expect(JSON.stringify(clinicJsonLd('en'))).toContain('aggregateRating');
    site.reviewLinks.aggregate = undefined;
  });
  it('uses absolute urls', () => {
    expect(procedureJsonLd('tr', proc).url).toBe('https://northwesternclinic.com/tr/islemler/lip-lift/');
    expect(breadcrumbJsonLd([{ name: 'Home', path: '/' }]).itemListElement[0].item).toBe('https://northwesternclinic.com/');
  });
});
