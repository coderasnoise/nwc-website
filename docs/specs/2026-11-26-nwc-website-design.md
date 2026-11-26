# North Western Clinic – new website: design (DRAFT for approval)

Status: draft, awaiting final approval; nothing built. Written 2026-11-26. Items marked **[my call]** are my proposals, not decisions by Batuğ.

## 1. Intent
Rebuild northwesternclinic.com from scratch (leaving WordPress) as a simple, modern site that puts Dr. Tolga Aksan front and centre. The site exists to (a) make people message the clinic on WhatsApp and (b) get found on Google and in AI answers (ChatGPT, Gemini, etc.), because found-directly patients convert best.

## 2. Decisions from Batuğ
- Main conversion: WhatsApp. No form, no other workflow.
- Languages: English and Turkish. Swedish is dropped completely.
- No prices anywhere. Flow: free online consultation -> personalised surgery plan and quote on WhatsApp.
- Credential shown: Turkish board certification only; no other international body.
- Show Trustpilot and Google reviews.
- Featured procedures: deep plane facelift, necklift, temporal lift, upper and lower eyelid, browlift, lip lift, and body surgeries.
- Blog is migrated and posts are refreshed.
- Dental, hair transplant and obesity surgery are out of scope (confirmed 2026-11-26); old URLs for them redirect to the Procedures index.
- No patient coordinators yet: draft page/section, update later.
- Legal and medical-advertising text has no advisor yet: I draft it, mark it "pending professional review".
- Photos and video of the doctor do not exist yet: use placeholders, list what must be shot.
- Domain is owned by Batuğ and can be pointed at any host.
- Design reference: https://dralex.framer.website/ (a cardiologist template). Direction only; no text, photos or branding copied.

## 3. Goals / non-goals / anti-goals
Goals: doctor-first, fast, mobile-first, strong SEO and AI-search readiness, one clear action (WhatsApp), easy to update.
Non-goals: online booking, patient logins, price lists, forms, payments, Swedish, and dental / hair transplant / obesity pages (confirmed by Batuğ: not part of the new site; may be added later if needed).
Anti-goals: a site that looks generic "clinic template", a heavy site, anything that implies unverified credentials or guaranteed results.

## 4. Design direction (from the reference)
From the reference page (structure only; colours and fonts could not be read from the fetched text, so I propose my own):
- One-page-style home with a repeating rhythm: small eyebrow label, large headline, then text or cards.
- Hero is a tall doctor portrait with a headline and social proof next to it (rating plus patient count).
- A second, warmer doctor photo in the About section.
- Service cards, a 4-step "how I work" section, education, testimonials, FAQ accordion, closing CTA banner, footer.
- Few nav items and one highlighted button (here: WhatsApp).

Adapted for NWC **[my call]**:
- Header: logo, Dr. Aksan, Procedures, Results, Journey, Blog, language switch (EN/TR), WhatsApp button (always visible; sticky on mobile).
- Hero: portrait of Dr. Aksan, "Dr. Tolga Aksan, Plastic Surgeon, Istanbul", "Free online consultation on WhatsApp" button, Trustpilot/Google rating chips.
- Trust strip: Turkish board certification, 9000+ operations and 16 years (numbers to be confirmed by the clinic).
- About Dr. Aksan: short, professional bio (credentials, focus on facial surgery, mentor to 20+ surgeons); personal side kept to one line.
- Procedures: grid of featured face procedures first, then body; each links to its own page.
- Results: before/after gallery (see risks).
- Patient journey in 4 steps: WhatsApp consultation, personal plan and quote, travel and surgery, recovery and follow-up.
- Reviews: Trustpilot and Google, embedded or quoted with source links.
- FAQ, closing WhatsApp banner, footer with address, map, legal links.
- Look: calm and light, lots of white space, existing navy as accent, one serif display font with one clean sans for body **[my call]**. Mobile first because most WhatsApp traffic is on phones.

## 5. Approaches considered
A. **Astro (static), Markdown/MDX content, Tailwind, Cloudflare Pages or Vercel** - recommended. Minimal JavaScript = fastest pages, best for SEO; built-in i18n for EN/TR; content in files is easy for me and for AI to read; free or cheap hosting; edits via Git or a light CMS later.
B. Next.js. More power (logins, dashboards, server features) that this site does not need; heavier by default.
C. Framer or another no-code builder (like the reference). Quick to launch, but less control over SEO structure, structured data, URL redirects and long-term ownership.

Recommendation: A. Batuğ has not picked yet; this needs approval.

## 6. Site map (draft)
EN at `/`, TR at `/tr/`. Pages: Home, Dr. Tolga Aksan, Procedures (index + one page per featured procedure), Results, Patient Journey, Reviews, FAQ, Blog (migrated), Clinic / Contact, Team (other doctors and coordinators, draft), Privacy, Terms / Medical disclaimer. Old URLs 301-redirect to the nearest new page.

## 7. SEO and AI-search plan
- Each procedure page: plain-language answer first, who it suits, recovery, risks, FAQ; written by or reviewed by the doctor.
- Structured data: Physician, MedicalClinic, MedicalProcedure, FAQPage, Review/AggregateRating (only if allowed and accurate), BreadcrumbList; hreflang for EN/TR.
- `llms.txt`, clean sitemap, fast Core Web Vitals, Google Business Profile aligned with site details.
- Blog posts updated and given authorship by Dr. Aksan with dates.

## 8. WhatsApp
Single number from the current site (+90 542 154 85 78, to be confirmed). Buttons open a pre-filled message that includes the page or procedure, e.g. "Hello, I'd like a free consultation about deep plane facelift." No data is stored by the site.

## 9. Content needed from the clinic
Doctor portrait (hero), a second casual photo, a short intro video, clinic photos, procedure descriptions reviewed by the doctor, consented before/after photos, confirmed statistics, credential details (board certificate), Trustpilot and Google review links. Placeholders are used until then.

## 10. Risks and things to verify (not legal advice)
- Medical advertising rules in Turkey and in target countries (before/after photos, claims, "best", testimonials). **Needs professional review before launch.**
- Footer email on the current site looks misspelt (`nortwestern`); confirm the correct address.
- Statistics are inconsistent on the current site (300+ vs 9000+ patients); confirm.
- Review widgets and reCAPTCHA-free design: no cookies by default, but Trustpilot/Google embeds may need a cookie notice.

## 11. Left to the builder
Component library, exact colours and fonts, CMS choice, analytics (privacy-friendly by default), image pipeline, redirect map.

## 12. Next steps
Approve (or change) this design -> I write the implementation plan -> only then code.
