import { writeFileSync } from 'node:fs';
import { redirectRules } from '../src/lib/redirects.ts';
writeFileSync('public/_redirects', redirectRules());
console.log('public/_redirects written');
