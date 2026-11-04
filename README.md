# Commercient Academy

Commercient's certification site: six courses, server-graded quizzes, publicly verifiable credentials and LinkedIn-shareable badges. Plain HTML/CSS/JS with no build step, backed by Supabase.

Handed over by Nick Lynn-Rulon on 2026-11-04. **`HANDOFF.md` is the full developer guide** (file map, content model, how to add a course, guardrails, changelog). **`LAUNCH-KIT.md`** covers hosting and publishing.

## Where it runs today, and what Commercient needs to take over

Everything below was set up on Nick's personal accounts because no company accounts were available. Move each piece to a Commercient account before those accounts close.

| Piece | Where it is | Owner today | What to do |
|---|---|---|---|
| Live site | https://commercient-academy.pages.dev | Cloudflare Pages direct-upload project `commercient-academy`, Nick's personal Cloudflare account | Create a Pages project in a Commercient Cloudflare account and deploy `dist/` from this repo. Cloudflare can't move a Pages project between accounts. |
| Backend: sign-in, progress, quiz grading, credential registry | Supabase project `eswuflpckfoohrgnxhez` | Nick's Supabase account, free tier | Transfer the project to a Commercient Supabase organization. The `credentials` table is the roster of everyone certified. The free tier pauses after about a week without traffic, so upgrade to Pro or add a keep-alive. |
| Legacy site | https://commercient-academy.netlify.app | Netlify site `8f86d22c-489b-4ca2-91ed-dfb76a08ea63` | Retire it, or point it to the new site, once the custom domain is live. |
| Custom domain | `academy.commercient.com` (not live yet) | commercient.com DNS (web team) | Add the domain in Cloudflare Pages, then a CNAME to the Pages hostname. Supabase already allows this domain for sign-in redirects. |
| Course videos | `assets/implementation/ep00.mp4` to `ep14.mp4` (in this repo) | n/a | The masters are also in the implementation course's Google Drive folder. |

## Courses

| Key | Course |
|---|---|
| `fluency` | Agentic Enterprise Fluency |
| `platform` | Commercient AI & Data Lake Platform |
| `portal` | Partner Portal |
| `customer-panel` | Customer Panel |
| `external-agent` | External Agent Setup |
| `implementation` | Implementation Training and Roadmap (15 modules, one video per customer meeting) |
| `ai-admin` | Placeholder tile, no content yet |

Quiz answer keys live server-side in the Supabase `quiz_keys` table, seeded by the files in `supabase/`. They must never ship to the browser. **Keep this repo private**, because `supabase/` contains the answer keys.

## Run it locally

```bash
python3 -m http.server 4137
```

Then open http://localhost:4137.

## Publish a change

```bash
./scripts/publish.sh "what changed"
```

The script syntax-checks the JS, builds `dist/` from an allowlist (so `supabase/`, notes and anything unlisted can't reach the public site), commits, pushes, and runs `wrangler pages deploy dist`. The Pages project is direct-upload, so a git push alone does not deploy.

Before the next person uses it, adjust the paths that point at Nick's Mac. The script expects Node 22 at `~/.nvm/versions/node/v22.18.0` and an optional Cloudflare API token at `~/.config/commercient-academy/cf-token`. It deploys to the project named `commercient-academy` in whichever Cloudflare account wrangler is signed in to.

## Open items as of 2026-11-04

- **Custom domain:** the CNAME for `academy.commercient.com` was never added. After it is, set `SITE_URL` in `config.js` to the domain.
- **HubSpot lead capture:** already built, and inactive until someone creates a "Commercient Academy Registration" form in Commercient's production HubSpot. Then put its portal ID and form GUID into `HUBSPOT_PORTAL_ID` and `HUBSPOT_FORM_GUID` in `config.js`.
- **LinkedIn company ID:** `LINKEDIN_ORG_ID` in `config.js` is empty, so certificates use the free-text company name.
- **Supabase pausing:** see the table above.
- **Admin-panel single sign-on:** parked. `WEB-TEAM-INTEGRATION.md` documents the integration point.
- **Implementation course review:** an Oct 28 audit compared `implementation-course.js` with the implementation knowledge base (the "Commercient Implementation Knowledge Base" folder in Google Drive). It flagged four disagreements: whether Phase 1 and Phase 2 can overlap, whether partners complete CGI, how installation ends, and whether Final Sign-Off is the final delivery (the knowledge base treats Project Final Delivery as a separate milestone). The overlap and CGI wording came from JJ's Oct 13 accuracy review. JJ, Sergio and Naren should settle those two before anyone edits the course.
- **AI Admin course:** needs subject-matter content.

## What's in this repo

- Site source: `index.html`, `app.js`, `data.js`, `implementation-course.js`, `backend.js`, `config.js`, `styles.css`, `verify.html`, `404.html`, `_headers`
- `assets/`: badges, screenshots, and all 15 implementation videos. `assets/implementation/superseded-2026-10-08/` keeps the Oct 8 cuts that were replaced and the full-resolution episode 1.
- `supabase/`: the schema and upgrade SQL, including the quiz answer keys
- `scripts/`: the build and publish scripts
- `Claude outputs/`: working notes, including the production notes for the six re-cut videos from JJ's review and the onboarding plan worksheet
- Not included: `dist/` (rebuild it with `scripts/build-dist.sh`), and `_deploy/` and the `.zip` files, which are old Netlify drag-and-drop copies
