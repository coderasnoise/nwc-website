# North Western Clinic Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Follow `CLAUDE.md` (model routing, one consolidated review per phase, minimal subagent context).

**Goal:** Build a static, bilingual (EN/TR), WhatsApp-only, doctor-first website for North Western Clinic.

**Architecture:** Astro static site. Content lives in Astro content collections (Markdown) plus one typed site-config module. Pure helpers (WhatsApp URL, JSON-LD builders, redirect map, i18n paths) are unit-tested with Vitest; pages are verified by building and checking the generated HTML.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS, Vitest, `@astrojs/sitemap`, Node 22.

**Spec:** `docs/specs/2026-11-26-nwc-website-design.md`

## Global Constraints

- Languages: `en` (default, served at `/`) and `tr` (served at `/tr/`). No Swedish.
- No prices anywhere, no forms. The only call to action is WhatsApp.
- WhatsApp number from the current site: `905421548578` (display `+90 542 154 85 78`); mark "to be confirmed" in `src/config/site.ts`.
- Credential copy: "Turkish board-certified plastic surgeon" only; no other international body.
- Do not use the misspelt email `clinic@nortwesternclinic.com`; use `TODO_CONFIRM_EMAIL` placeholder constant until confirmed.
- Stats ("9000+ operations", "16 years") come from `site.ts` and are flagged `unverified: true`.
- Featured procedures (in order): deep plane facelift, necklift, temporal lift, upper eyelid, lower eyelid, browlift, lip lift, body surgery. No dental, hair transplant or obesity pages.
- Legal, medical-ad and coordinator copy carries the visible banner text `Draft: pending professional review` (constant `REVIEW_NOTICE` in `src/config/site.ts`).
- Photos and video are placeholders (`/placeholders/*.svg`) listed in `docs/content-needed.md`.
- Mobile first; Lighthouse-style targets: no client JS framework, images with width/height and lazy loading.
- Do not deploy or touch the domain. PR only when ready.

## Review Focus

- Procedure exists in EN but not TR (or vice versa): build must fail with a clear error, not emit a broken page (Task 2 test).
- WhatsApp message text with spaces, `&`, `?`, Turkish characters (`ğ ş İ`): must be URL-encoded correctly (Task 3 test).
- Old WordPress URLs (including trailing-slash and uppercase variants) must redirect to the nearest new page, never 404 (Task 8 test).
- `hreflang` and canonical must be reciprocal between EN and TR on every page, including blog posts that exist in only one language (Task 8 test).
- Structured data must not output review ratings or prices unless explicitly configured (Task 8 test).

---

### Task 1: Scaffold, tooling, site config

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `vitest.config.ts`, `.gitignore`, `src/config/site.ts`, `src/i18n/index.ts`, `tests/i18n.test.ts`, `README.md`

**Interfaces:**
- Produces: `site` (object: `name`, `doctor`, `whatsappNumber`, `phoneDisplay`, `address`, `mapUrl`, `email`, `stats`, `reviewLinks`), `REVIEW_NOTICE: string`; `type Lang = 'en' | 'tr'`; `localePath(lang: Lang, path: string): string`; `otherLang(lang: Lang): Lang`; `t(lang: Lang, key: string): string` reading `src/i18n/en.json` / `tr.json`.

- [ ] **Step 1:** Write `tests/i18n.test.ts` asserting `localePath('en','/doctor')==='/doctor/'`, `localePath('tr','/doctor')==='/tr/doctor/'`, `localePath('tr','/')==='/tr/'`, `otherLang('en')==='tr'`, and that `t` throws on a missing key.
- [ ] **Step 2:** Run `npx vitest run tests/i18n.test.ts`; expect FAIL (module missing).
- [ ] **Step 3:** Scaffold Astro (empty template, TypeScript strict), add Tailwind, `@astrojs/sitemap`, Vitest; set `site` in `astro.config.mjs` to `https://northwesternclinic.com`, i18n `defaultLocale: 'en'`, `locales: ['en','tr']`, `routing.prefixDefaultLocale: false`; implement `src/i18n/index.ts` and `site.ts` per Interfaces.
- [ ] **Step 4:** Run `npx vitest run` and `npm run build`; expect PASS and a successful build.
- [ ] **Step 5:** Commit `feat: scaffold astro site, i18n helpers and site config`.

### Task 2: Content collections (procedures, doctors, blog, FAQ)

**Files:**
- Create: `src/content.config.ts`, `src/content/procedures/en/*.md`, `src/content/procedures/tr/*.md` (8 featured procedures each), `src/content/doctor/en.md`, `src/content/doctor/tr.md`, `src/content/faq/en.md`, `src/content/faq/tr.md`, `src/lib/procedures.ts`, `tests/procedures.test.ts`

**Interfaces:**
- Consumes: `Lang` from Task 1.
- Produces: `getProcedures(lang: Lang): Promise<Procedure[]>` (sorted in the Global Constraints order; `Procedure = { slug, title, summary, group: 'face' | 'body', order }`); `assertProcedureParity(): Promise<void>` throws if EN and TR slug sets differ.

- [ ] **Step 1:** Write `tests/procedures.test.ts`: parity passes for real content; parity throws `Missing TR: <slug>` when given mismatched slug lists (inject lists into a pure `diffSlugs(a: string[], b: string[])` helper); `getProcedures('en')[0].slug === 'deep-plane-facelift'`.
- [ ] **Step 2:** Run it; expect FAIL.
- [ ] **Step 3:** Define collections with Zod schemas (title, summary, order, group, `draft?: boolean`); write short, factual placeholder copy per procedure (who it suits, recovery overview, risks stated generally, no claims or prices, `Draft: pending professional review`); implement `src/lib/procedures.ts`; call `assertProcedureParity()` from the build via `astro.config.mjs` integration hook `astro:build:start`.
- [ ] **Step 4:** Run `npx vitest run` and `npm run build`; expect PASS.
- [ ] **Step 5:** Commit `feat: content collections and procedure parity check`.

### Task 3: WhatsApp helper and layout shell

**Files:**
- Create: `src/lib/whatsapp.ts`, `src/components/WhatsAppButton.astro`, `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/LangSwitch.astro`, `tests/whatsapp.test.ts`

**Interfaces:**
- Consumes: `site`, `Lang`, `localePath`, `t`.
- Produces: `buildWhatsAppUrl(message?: string): string` (format `https://wa.me/905421548578?text=<encoded>`); `<Base lang title description path />` layout; `<WhatsAppButton lang procedure? variant? />` which builds a pre-filled message naming the procedure when given.

- [ ] **Step 1:** Write `tests/whatsapp.test.ts`: no message gives `https://wa.me/905421548578`; `"Hello & İstanbul? ğş"` encodes via `encodeURIComponent` and decodes back identically; newlines encode as `%0A`.
- [ ] **Step 2:** Run it; expect FAIL.
- [ ] **Step 3:** Implement helper and shell. Header: logo (placeholder SVG), Dr. Aksan, Procedures, Results, Journey, Blog, language switch, WhatsApp button; mobile sticky WhatsApp bar; footer with address, map link, phone, legal links, `REVIEW_NOTICE` where relevant. Navy accent (`#0b1f3a`), serif display + sans body via system/self-hosted fonts (no third-party font requests).
- [ ] **Step 4:** Run `npx vitest run` and `npm run build`; expect PASS.
- [ ] **Step 5:** Commit `feat: whatsapp helper, base layout, header and footer`.

### Task 4: Home page (EN + TR)

**Files:**
- Create: `src/pages/index.astro`, `src/pages/tr/index.astro`, `src/components/home/{Hero,TrustStrip,AboutDoctor,ProcedureGrid,Journey,Reviews,Faq,ClosingCta}.astro`, `public/placeholders/doctor-portrait.svg`, `public/placeholders/doctor-casual.svg`, `docs/content-needed.md`

**Interfaces:**
- Consumes: `getProcedures`, `Base`, `WhatsAppButton`, `site.reviewLinks`.
- Produces: section components taking `{ lang: Lang }`.

- [ ] **Step 1:** Add a build-output test `tests/build-home.test.ts` (runs after `npm run build`): `dist/index.html` contains one `<h1>`, a `wa.me/905421548578` link, links to all 8 procedure pages, and does not contain `€`, `$`, `price` or `<form`; same for `dist/tr/index.html` (Turkish words `fiyat`, `form` absent).
- [ ] **Step 2:** Run it; expect FAIL.
- [ ] **Step 3:** Build sections in spec order: Hero (portrait placeholder, "Dr. Tolga Aksan" H1, free online consultation button, rating chips linking to Trustpilot/Google), trust strip, about doctor, face procedures grid then body, 4-step journey, reviews (links and quotes marked as placeholders until real review text is supplied), FAQ accordion (`<details>`), closing CTA. Fill `docs/content-needed.md` from spec section 9.
- [ ] **Step 4:** Run `npm run build && npx vitest run`; expect PASS.
- [ ] **Step 5:** Commit `feat: home page in english and turkish`.

### Task 5: Doctor and procedure pages

**Files:**
- Create: `src/pages/doctor.astro`, `src/pages/tr/doktor.astro`, `src/pages/procedures/index.astro`, `src/pages/procedures/[slug].astro`, `src/pages/tr/islemler/index.astro`, `src/pages/tr/islemler/[slug].astro`

**Interfaces:**
- Consumes: `getProcedures`, content collections, `WhatsAppButton` (procedure-specific message).
- Produces: routes `/doctor/`, `/procedures/<slug>/`, `/tr/doktor/`, `/tr/islemler/<slug>/`; exports `procedurePath(lang: Lang, slug: string): string` from `src/lib/procedures.ts`.

- [ ] **Step 1:** Extend build test: every procedure has an EN and TR page with exactly one `<h1>`, a WhatsApp link whose decoded `text` contains the procedure title, and a back link to the index; doctor pages contain "board" (EN) and "board" sertifikası wording (TR) and no other organisation names.
- [ ] **Step 2:** Run; expect FAIL.
- [ ] **Step 3:** Implement pages; doctor page: credentials, focus, mentoring, one personal line, video placeholder, WhatsApp CTA. Procedure page: plain-language answer first, who it suits, recovery, risks, FAQ, WhatsApp CTA, related procedures.
- [ ] **Step 4:** Run build and tests; expect PASS.
- [ ] **Step 5:** Commit `feat: doctor and procedure pages`.

### Task 6: Results, journey, reviews, team, clinic, legal pages

**Files:**
- Create: `src/pages/{results,journey,reviews,team,clinic,privacy,terms}.astro` and `src/pages/tr/{sonuclar,yolculuk,yorumlar,ekip,klinik,gizlilik,kosullar}.astro`

**Interfaces:**
- Consumes: `Base`, `REVIEW_NOTICE`, `site`.
- Produces: routes as named.

- [ ] **Step 1:** Extend build test: `privacy`, `terms`, `team`, `results` pages (both languages) contain `REVIEW_NOTICE` text; results page contains a note that images are placeholders and no claim of guaranteed results; no page contains a price or form.
- [ ] **Step 2:** Run; expect FAIL.
- [ ] **Step 3:** Implement pages; results is a gallery shell with placeholder cards and consent note; team lists Dr. Aksan first and other doctors/coordinators as drafts; privacy and terms are short drafts covering WhatsApp contact, no data stored by the site, analytics (if added), medical disclaimer.
- [ ] **Step 4:** Run build and tests; expect PASS.
- [ ] **Step 5:** Commit `feat: results, journey, reviews, team, clinic and legal pages`.

### Task 7: Blog collection and WordPress import script

**Files:**
- Create: `src/content/blog/en/`, `src/content/blog/tr/`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/tr/blog/index.astro`, `src/pages/tr/blog/[slug].astro`, `scripts/import-wp-blog.mjs`, `tests/import-wp.test.ts`, `src/lib/wp-import.ts`

**Interfaces:**
- Produces: `wpPostToMarkdown(post: { slug: string; title: { rendered: string }; date: string; content: { rendered: string } }): { filename: string; body: string }` (front matter: `title`, `date`, `updated?`, `author: 'Dr. Tolga Aksan'`, `draft: true`); `scripts/import-wp-blog.mjs <baseUrl> <outDir>` fetches `/wp-json/wp/v2/posts?per_page=100` and writes files.

- [ ] **Step 1:** Write `tests/import-wp.test.ts`: HTML entities decoded in title; `<h2>`→`##`, `<p>`, `<a>`, `<ul>` converted; scripts/styles stripped; filename `<slug>.md`; output always `draft: true` (posts must be reviewed and refreshed before publishing).
- [ ] **Step 2:** Run; expect FAIL.
- [ ] **Step 3:** Implement converter with `turndown`; blog routes list non-draft posts only; show an "updated" date when present. Add one sample EN post flagged `draft: false` clearly labelled placeholder. Do not run the import against the live site in CI; the owner or a networked session runs it.
- [ ] **Step 4:** Run tests and build; expect PASS.
- [ ] **Step 5:** Commit `feat: blog collection and wordpress import script`.

### Task 8: SEO, structured data, redirects, llms.txt

**Files:**
- Create: `src/lib/jsonld.ts`, `src/lib/redirects.ts`, `public/robots.txt`, `src/pages/llms.txt.ts`, `public/_redirects`, `tests/jsonld.test.ts`, `tests/redirects.test.ts`, `tests/hreflang.test.ts`; Modify: `src/layouts/Base.astro`

**Interfaces:**
- Consumes: `site`, `getProcedures`, `procedurePath`.
- Produces: `physicianJsonLd(lang)`, `clinicJsonLd(lang)`, `procedureJsonLd(lang, procedure)`, `faqJsonLd(items: {q: string; a: string}[])`, `breadcrumbJsonLd(items: {name: string; path: string}[])` all returning plain objects; `resolveLegacyPath(path: string): string | null`; `Base` accepts `alternates: { en?: string; tr?: string }`.

- [ ] **Step 1:** Write tests: `clinicJsonLd` and `procedureJsonLd` contain no `aggregateRating`, `review`, `offers` or `price` keys unless `site.reviewLinks.aggregate` is set; `resolveLegacyPath('/plasticsurgery/rhinoplasty-nose-job/')` is `null` (procedure not offered, falls back) while `'/PlasticSurgery/Facelift-Rhytidectomy'` resolves to `/procedures/deep-plane-facelift/`; dental, hair-transplant and obesity paths resolve to `/procedures/`; `'/about-us/our-legacy/'` resolves to `/doctor/`; unknown paths return `null`. Hreflang test: for every built page with an alternate, the target page links back and each has a self-referencing canonical.
- [ ] **Step 2:** Run; expect FAIL.
- [ ] **Step 3:** Implement helpers; generate `public/_redirects` from `src/lib/redirects.ts` via `scripts/build-redirects.mjs` (Cloudflare/Netlify syntax, 301, lowercase and trailing-slash variants); add canonical, hreflang, Open Graph, JSON-LD to `Base`; `llms.txt` lists clinic summary, doctor, procedures and key pages in both languages; sitemap via `@astrojs/sitemap` with i18n.
- [ ] **Step 4:** Run `npx vitest run`, `npm run build`; expect PASS.
- [ ] **Step 5:** Commit `feat: seo, structured data, redirects and llms.txt`.

### Task 9: Quality pass and final verification

**Files:**
- Modify: as needed; Create: `docs/launch-checklist.md`

- [ ] **Step 1:** Run `npm run build`, `npx vitest run`, `npx astro check`; expect zero errors.
- [ ] **Step 2:** Check built HTML: every `<img>` has `alt`, `width`, `height`; every page has one `<h1>`, a `lang` attribute, a unique `<title>`; no external script requests except those listed in the checklist (Trustpilot widget is link-only until approved).
- [ ] **Step 3:** Write `docs/launch-checklist.md`: confirm phone and email, confirm statistics, professional legal and medical-ad review, real photos/video, domain DNS change (needs Batuğ's go-ahead), Google Business Profile alignment, submit sitemap.
- [ ] **Step 4:** Run one consolidated review (Sonnet) over the whole branch against the spec and the Review Focus list; fix findings.
- [ ] **Step 5:** Commit `chore: quality pass and launch checklist`; open a PR only when the above passes.
