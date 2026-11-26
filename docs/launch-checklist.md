# Launch checklist

Nothing here is done by the build. Do not change the domain or deploy until the owner (Batuğ) says go.

- [ ] Confirm the WhatsApp number and phone in `src/config/site.ts`; set the real email (`TODO_CONFIRM_EMAIL`).
- [ ] Confirm statistics (9000+ operations, 16 years) and set `stats.unverified` to false.
- [ ] Professional review of privacy, terms, procedure copy, results and medical-advertising wording (Turkey and target countries). Remove the "pending review" notices only after that.
- [ ] Replace placeholders with real portrait, photos and video (see `content-needed.md`).
- [ ] Add real Trustpilot and Google review links (and approved quotes). Set `reviewLinks.aggregate` only if the numbers are accurate and allowed.
- [ ] Run the blog import where the old site is reachable: `node scripts/import-wp-blog.mjs https://northwesternclinic.com src/content/blog/en`; review, update and set `draft: false` per post. Add Turkish versions.
- [ ] Add other doctors and coordinators on the team page, or remove the page from the footer.
- [ ] Host (Cloudflare Pages or similar), build command `npm run build`, output `dist`. `public/_redirects` carries the old-URL redirects (Cloudflare/Netlify format).
- [ ] Point the domain (DNS) only after approval; keep the old WordPress site until redirects are tested.
- [ ] Align Google Business Profile details; submit `sitemap-index.xml` in Search Console.
- [ ] Check analytics and cookie needs before adding any tracking script.
