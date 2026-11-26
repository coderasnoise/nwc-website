import { describe, it, expect } from 'vitest';
import { resolveLegacyPath, redirectRules } from '../src/lib/redirects';

describe('resolveLegacyPath', () => {
  it('maps facelift, case and slash insensitive', () => {
    expect(resolveLegacyPath('/PlasticSurgery/Facelift-Rhytidectomy')).toBe('/procedures/deep-plane-facelift/');
    expect(resolveLegacyPath('/plasticsurgery/neck-lift/')).toBe('/procedures/necklift/');
  });
  it('maps body procedures to body surgery', () => {
    expect(resolveLegacyPath('/plasticsurgery/tummy-tuck-abdominoplasty/')).toBe('/procedures/body-surgery/');
  });
  it('sends procedures we no longer feature to the index, never a 404', () => {
    expect(resolveLegacyPath('/plasticsurgery/rhinoplasty-nose-job/')).toBe('/procedures/');
  });
  it('sends dental, hair and obesity to the procedures index', () => {
    for (const p of ['/other-treatments/dental-treatments/dental-implants/', '/other-treatments/hair-transplant/fue/', '/other-treatments/obesity-surgery/gastric-sleeve/'])
      expect(resolveLegacyPath(p)).toBe('/procedures/');
  });
  it('maps about, doctors, guide, prices, swedish', () => {
    expect(resolveLegacyPath('/about-us/our-legacy/')).toBe('/doctor/');
    expect(resolveLegacyPath('/doctors/dr-tolga-aksan/')).toBe('/doctor/');
    expect(resolveLegacyPath('/doctors/dr-bilge-odabasi/')).toBe('/team/');
    expect(resolveLegacyPath('/patient-guide/after-surgery/')).toBe('/journey/');
    expect(resolveLegacyPath('/prices/')).toBe('/journey/');
    expect(resolveLegacyPath('/sv/')).toBe('/');
    expect(resolveLegacyPath('/before-after/')).toBe('/results/');
  });
  it('returns null for unknown and for already-valid paths', () => {
    expect(resolveLegacyPath('/totally/unknown/')).toBeNull();
    expect(resolveLegacyPath('/procedures/lip-lift/')).toBeNull();
  });
  it('generates rules with both slash variants and no price words', () => {
    const rules = redirectRules();
    expect(rules).toContain('/plasticsurgery/liposuction /procedures/body-surgery/ 301');
    expect(rules).toContain('/plasticsurgery/liposuction/ /procedures/body-surgery/ 301');
    expect(rules).toContain('/sv/* / 301');
  });
});
