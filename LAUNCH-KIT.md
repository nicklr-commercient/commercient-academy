# Academy Launch Kit — self-hosted, no dev team required

_Last updated 2026-10-15. This replaces the Netlify drag-drop workflow._

**The architecture in three lines:** code + content live in the GitHub repo
(`github.com/nickrulon/commercient-academy`). Cloudflare Pages (free, no usage
credits, unlimited bandwidth) builds and serves the site on every push. The only
thing the company ever provides is one DNS record pointing
`academy.commercient.com` at it.

**Division of labor:** Nick does the three account-login steps below (Claude
can't create accounts or enter credentials). Claude does everything else —
content edits, commits, pushes, config flips, verification.

---

## Part 1 — Connect Cloudflare Pages (~10 min, once)

1. Go to **dash.cloudflare.com** → Sign up with your work email (free plan).
2. In the left sidebar: **Workers & Pages** → **Create** → **Pages** tab →
   **Connect to Git**.
3. Authorize GitHub when prompted, and select the repo
   **nickrulon/commercient-academy**. (If it asks which repos to grant, just
   grant that one.)
4. Project name: **commercient-academy** — exactly that, so the URL is
   `commercient-academy.pages.dev` and the Bhavesh message below is accurate.
5. Build settings:
   - Framework preset: **None**
   - Build command: `bash scripts/build-dist.sh`
   - Build output directory: `dist`
6. Click **Save and Deploy**. ~1 minute later the site is live at
   **https://commercient-academy.pages.dev**.

From this moment, every push to `main` auto-deploys. The bottleneck is dead.

## Part 2 — Tell Supabase about the new URL (~2 min, once)

Sign-in magic links only redirect to approved URLs.

1. **supabase.com/dashboard** → project `eswuflpckfoohrgnxhez` →
   **Authentication → URL Configuration**.
2. Add to **Redirect URLs**: `https://commercient-academy.pages.dev/*`
   (keep `http://localhost:4137` for local dev).
3. When the real domain lands (Part 4), add
   `https://academy.commercient.com/*` and set it as the **Site URL**.

## Part 3 — Videos (before sharing the Implementation course)

The 15 implementation episodes are too big for git and the static host, so the
deploy automatically shows "Video coming soon" placeholders until they're
hosted properly.

1. Upload the files in `assets/implementation/` to YouTube as **Unlisted**
   (batch-select all 15 in YouTube Studio; titles = episode names).
2. Paste each link into `IMPL_VIDEOS` at the top of
   `implementation-course.js` (or hand Claude the 15 links — 2-minute job).
3. Publish (Part 5). Local mp4s keep working for local preview either way.

Until the YouTube copies exist, these mp4s live ONLY on this Mac — keep a copy
in Drive if that makes you nervous.

## Part 4 — The domain (the one thing only the company can do)

1. In the Cloudflare Pages project: **Custom domains → Set up a custom
   domain** → enter `academy.commercient.com`. Cloudflare will display the
   CNAME target (it's `commercient-academy.pages.dev`).
2. Send whoever manages commercient.com DNS (Bhavesh / web team):

   > Hey Bhavesh! Scratch the GitHub-org ask—I'm hosting the Academy myself.
   > Only thing I need is one DNS record whenever someone has 30 seconds:
   >
   > academy.commercient.com → CNAME → commercient-academy.pages.dev
   >
   > Site is hosted and maintained on my end—nothing for dev to run, deploy,
   > or support, now or later.

3. Once the record exists, HTTPS turns on automatically. Then: add the domain
   in Supabase (Part 2.3) and pin `SITE_URL` in `config.js` to
   `https://academy.commercient.com` (ask Claude).

Until that record lands, `commercient-academy.pages.dev` is a fully working
public URL — fine to share internally and with pilot partners.

## Part 5 — Publishing content, forever

Either tell Claude "publish the academy," or run:

```bash
cd "/Users/nicklynn-rulon/App Projects/Commercient Partner Academy" && ./scripts/publish.sh "what changed"
```

That syntax-checks the JS, rebuilds `dist/` locally to catch mistakes, commits,
and pushes — live in ~1 minute. No zip files, no drag-drop, no dev team.

**Safety rails built into the pipeline:**
- `scripts/build-dist.sh` deploys an explicit **allowlist** — `supabase/`
  (quiz answer keys), `HANDOFF.md`, working folders, and anything else
  not named in it can never reach the public site.
- The build fails loudly if a referenced file is missing or any file exceeds
  Cloudflare's 25MB limit.
- `_headers` makes HTML/JS/CSS revalidate on every load in production, so the
  old "bump `?v=` or users see stale code" ritual no longer matters on the
  live site.

## Loose ends, tracked

- **Old Netlify site** (`commercient-academy.netlify.app`): leave it up until
  the new domain is live, then replace it with a redirect page (ask Claude).
- **HubSpot lead wiring** (registrations → HubSpot contacts): Claude's job,
  after launch. Not a blocker.
- **Company ownership**: when a Commercient GitHub org ever materializes, the
  repo transfers in ~10 minutes with full history; Cloudflare project and
  Supabase org transfer similarly. Nothing built here gets thrown away.
- **Panel SSO (phase 2)**: parked until a partner deal closes;
  `WEB-TEAM-INTEGRATION.md` already documents the one-file integration point.
