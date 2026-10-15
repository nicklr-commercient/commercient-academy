# Commercient Academy — Developer Handoff
_Last updated: 2026-07-09 (exec-review build). Supersedes all earlier versions of this doc._

A static-frontend **multi-course certification LMS** ("Commercient Academy") backed by **Supabase** (auth, progress sync, server-side quiz grading, credential registry, public verification). Frontend is still plain HTML/CSS/JS with no build step — edit a file, refresh the browser.

> **If you only read one thing:** content lives in `data.js` (`ACADEMY` + `COURSES` + `MODULES` + `QUIZ`); logic/UI in `app.js`; all server interaction goes through the **`Backend` adapter in `backend.js`**; styling in `styles.css`. To add a course you append one object to `COURSES` **and** seed its answer key into the `quiz_keys` table (answer keys no longer ship to the browser). Auth is a **swappable layer**: magic-link sign-in is a stand-in until the Academy is embedded in the Commercient admin panel (SSO handoff replaces only the auth section of `backend.js`).

---

## 0. Portal integration & the content pipeline — READ FIRST (for the dev team / Aaron)

_This section supersedes any earlier "hosting" notes below. It captures how the Academy plugs into the Commercient admin panel and — critically — how Nick keeps updating content without becoming (or waiting on) a bottleneck._

### How users reach it
The Academy lives inside the **Commercient admin panel** — the single portal where customers, partners, and employees all sign in. A user signs into the panel with their **existing Commercient credentials** and opens their own Academy instance from the panel with **no second sign-in**. So: auth = **Commercient SSO** (the magic-link/Supabase auth in `backend.js` is a dev stand-in, meant to be swapped out — it's isolated to the auth section of the adapter). Per-user progress and earned credentials should be **native records tied to the user's Commercient identity**.

### Two ways to host it — the dev team's call
Nick will hand over the built front end (HTML/CSS/JS) + content. Pick the integration depth:
1. **Native** — mount/rebuild the Academy inside the admin panel's own app. Most tightly integrated, but it couples every content change to the portal's release cycle (see the bottleneck note — mitigate with the content store).
2. **Standalone + reroute (recommended for content velocity)** — host the Academy as its own app on `commercient.com` (e.g. `/academy` or `academy.commercient.com`); the panel **links/reroutes** to it with an SSO handoff. Preserves the design 1:1 and keeps it independently deployable. Nick can hand the files straight to Aaron for this.

Either way: **keep this design** (don't reskin it into the admin-panel look — the distinct look is deliberate) and use SSO so there's no second login.

### The content pipeline — this must NOT bottleneck on the dev team
Nick authors content and will keep adding/updating courses continuously. He can build pages and content, but he does **not** have production deploy access — today he must hand builds to someone to deploy. **Goal: make Nick's content changes self-serve.** The move is to decouple *content* from *deploy*:

- **Today's shape:** all course copy is one file (`data.js`); images are files in `assets/`; quiz **answer keys are rows in Supabase `quiz_keys`** (deliberately server-side so learners can't read them). Changing content = edit `data.js` (± an image ± a key). Whether that's self-serve depends entirely on how it's deployed.

- **Recommended — "Nick's push is the deploy" (pairs with the Standalone option).** Put the Academy in a Git repo (already at `github.com/nickrulon/commercient-academy`) wired to **auto-deploy on push to `main`** (Netlify/Vercel/any static CI). Nick edits `data.js` (with Claude) + drops images in `assets/`, commits, pushes → **live in ~1 minute, no dev in the loop.** This converts "deploy" into something Nick can already do (git), removing the human bottleneck **without** giving him portal backend access. Dev involvement drops to a one-time setup + rare app-shell changes.

- **If hosted Native — externalize content so Nick still self-serves.** Move course content out of `data.js` into a data store Nick can write to (a `course_content` JSON table, fetched by the app at runtime) and add a small **admin-only "Author" page** in the Academy where Nick pastes/uploads updated course JSON + images and hits **Publish** → live, no code deploy. Answer keys can live in the same table behind RLS (server-side grading reads them; they never reach the browser), so even quiz edits stay self-serve. Dev builds the fetch + author page once; after that Nick owns content end to end.

- **Fallback — clean batch submission (until a self-serve path exists).** Nick edits `data.js` + assets, commits to a branch, opens a **PR** (all self-serve). The dev team's only step is a ~2-minute review-and-merge (which auto-deploys, or they deploy). Reviewable diffs, no rebuilds, weekly cadence.

**Decide the content-update path *with* the hosting decision — they're linked.** Native embedding with no content store = a permanent dev bottleneck; standalone + auto-deploy (or native + Author page) = Nick self-serves. The same pattern (a repo Nick can push to + auto-deploy, or a small CMS) solves the identical problem Nick has updating the `commercient.com` website.

**Non-negotiable:** whatever the pipeline, keep quiz answer keys **out of the shipped client code** (protected DB column or the SQL step) — server-side grading only.

---

## 0b. Implementation Training and Roadmap course (added 2026-10-08)
- Lives in its own file, `implementation-course.js` (loaded before `data.js`; registered in `COURSES`). 15 modules: Start Here + one per meeting (I1–I3, P1-1–P1-5, P2-1–P2-6), 15 knowledge checks, 12-question quiz.
- **Videos:** paste links into `IMPL_VIDEOS` at the top of that file (YouTube, Vimeo, Loom, Google Drive, or `assets/implementation/epNN.mp4`). Empty = "Video coming soon" placeholder.
- **Badge:** drop `assets/badge-implementation.png` in; CSS disc fallback until then.
- **Quiz key:** run `supabase/upgrade-007.sql` before learners take the quiz.
- Web-team integration notes: `WEB-TEAM-INTEGRATION.md`.

## 1. Location & run

**Project root (local):**
```
/Users/nicklynn-rulon/App Projects/Commercient Partner Academy/
```

**Run locally** — it's static, so any static server works:
```bash
# from the project folder
python3 -m http.server 4137
# then open http://localhost:4137
```
Or use the preapproved Claude Code preview config at `~/.claude/launch.json`, server name **`academy`** (serves this folder on port 4137 via `--directory`). It also works from `file://` by double-clicking `index.html`.

No install step. No `package.json`, `node_modules`, or bundler.

---

## 2. File map

| File | Role |
|------|------|
| `index.html` | Entry point. Loads supabase-js (CDN) → `config.js` → `backend.js` → `data.js` → `app.js`. Contains the **top nav** (incl. `#navAuth` account chip). Asset links carry `?v=` cache-busting (see §9). |
| `config.js` | Environment: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (public by design), `SITE_URL` (used for verify links). If placeholders are unfilled, the app runs local-only and the quiz is gated with a config notice. |
| `backend.js` | **`Backend` adapter** (also `window.Backend`). Auth (magic link — the swappable part), profile, progress fetch/push, `gradeQuiz` RPC call, `fetchCredentials`, `verifyUrl()`. All Supabase access lives here. |
| `supabase/schema.sql` | **Run once in the Supabase SQL Editor.** Tables (`profiles`, `progress`, `quiz_keys`, `credentials`), RLS, `grade_quiz` RPC (server-side grading + credential issuance), `verify_credential` RPC (anon, exact-ID lookup only), profile-on-signup trigger, platform answer-key seed. |
| `supabase/upgrade-001.sql` | **Run once, after schema.sql.** Adds sequential `cred_no` (founding credential numbers) and updates both RPCs to return it. Future schema changes = new `upgrade-00N.sql` files, never edits to already-run ones. |
| `supabase/upgrade-002.sql` | **Run once, after 001.** Seeds the `quiz_keys` row for the Fluency course (`fluency`, 12 answers, pass 80%). Until it's run, the fluency quiz errors with "No quiz is registered". |
| `supabase/upgrade-003.sql` | **Run once, after 002.** Seeds the `quiz_keys` row for the Partner Portal course (`portal`, 13 answers, pass 80%). Same "No quiz is registered" failure until run. |
| `supabase/upgrade-004.sql` | **Run once, after 003.** Seeds the `quiz_keys` row for the Customer Panel course (`customer-panel`, 13 answers, pass 80%). Same "No quiz is registered" failure until run. |
| `supabase/upgrade-005.sql` | **Run once.** Sets the `platform` `quiz_keys` row for the current AI & Data Lake Platform course (**45 answers**, pass 80% = 36/45). Re-run whenever the platform quiz changes. Verify with `select course_id, array_length(answers,1) from quiz_keys;` → platform=45, fluency=12, portal=13, customer-panel=13. |
| `assets/customer-panel/` | Screenshots for the Customer Panel course, `01-login.png` … `14-associated-records.png` (list in §11). Placeholder-until-present, same as the portal set. |
| `assets/portal/` | Screenshots for the Portal course, named `01-login.png` … `13-notifications.png` (list in §11). Each module figure shows a styled placeholder with its exact filename until the PNG lands — drop files in, no code change needed. |
| `assets/charlie.png` | Charlie, the journey guide (exported from Canva design `DAGoG7rWBL8`; resized 512px 2026-07-09). Circular-masked in UI. **Rule: Charlie appears on the learning journey only — NEVER on the certificate, badge, or verify page.** (The downloadable *share card* is a separate social artifact and may include Charlie.) |
| `assets/charlie/` | **Charlie's gear** (milestone cosmetics) — optional transparent PNG overlays: `gear-hat.png` (1 cert), `gear-shades.png` (2), `gear-pet.png` (3). Feature auto-hides until `gear-hat.png` exists (`html.gear-ready` probe at init); positions in styles.css `.charlie-gear.*`. AWAITING ART. |
| `assets/og-card.png` | 1200×630 link-preview card (og:image for index + verify). Generated 2026-07-09 (PIL); replace with a Canva export any time — keep the filename. |
| `404.html` | Branded not-found page with Charlie (Netlify serves `404.html` automatically). |
| `verify.html` | **Public credential verification page** (standalone, no supabase-js — plain fetch to the `verify_credential` RPC). `?id=CA-…` deep link; LinkedIn `certUrl` points here. |
| `data.js` | **All content.** Globals: `ACADEMY`, `MODULES` (14 module objects), `CHECKS` (per-module knowledge checks, client-graded, attached as `m.check`), `GAME` (XP values + level ladder), `QUIZ` (25 questions — **`c` correct-answer fields removed**; the key lives only in `quiz_keys`), `COURSES` (the catalog — defined last). |
| `app.js` | **All logic/UI.** One IIFE. Router, per-course progress (local-first + account sync), catalog, module reader, quiz (server-graded), certificate, badges, LinkedIn flow, cert-PNG export, My Achievements, sign-in page, nav auth chip. |
| `styles.css` | **All styling.** Brand tokens + spacing tokens are CSS variables in `:root` at top. |
| `assets/commercient-logo.png` | Horizontal lockup (nav + certificate). |
| `assets/commercient-icon.png` | Circular mark (course tiles + favicon). |
| `assets/badge-ai-platform.png` | Completion **badge** image for the Platform course (circular-masked in UI; also stamped into the downloadable cert PNG). |
| `assets/badge-agentic-fluency.png` | Completion badge image for the Fluency course (same treatment as above). |
| `Commercient_Partner_Academy.html` | Single-file build. **STALE — do not use.** Regenerate per §10 before sharing. |
| `HANDOFF.md` | This file. |

---

## 3. Content model (`data.js`)

### `ACADEMY` — the umbrella
```js
const ACADEMY = {
  name, headline, intro,           // goal-first hero copy for the home page
  audiences: [{icon,title,desc}],  // "Who is this for?" cards
  payoff: {title, body}            // green money-motivation band
};
```

### `MODULES` — array of 14 course units (legacy content, unchanged)
Each: `{ id, group, title, time, objectives[], body (HTML string), takeaways[] }`.
`body` is an HTML template literal using helper classes from `styles.css` (`.callout`, `.callout.money`, `.data-table`, `.flow`, `.two-col`, `.col-card.is/.isnt`, `.step-h`). `objectives` are stored but **not rendered**.

### `QUIZ` — the Platform course's assessment
`{ passMark: 0.8, sections: [3 strings], questions: [{ s: sectionIndex, q, a:[4], c: correctIndex }] }`.

### `COURSES` — the catalog (the important part)
An array of course objects. **Defined at the bottom of `data.js`** so it can reference `MODULES`/`QUIZ`. Three courses today:

| id | status | notes |
|----|--------|-------|
| `fluency` | `available` | "Agentic Enterprise Fluency Certification" — 6-module identity/messaging course (the "how we talk about Commercient" cert, distilled from the booth-messaging positioning work; all event references and names stripped). First in the catalog by design — the ~35-min "start here" on-ramp for employees AND partners. Data: `FLUENCY_MODULES`/`FLUENCY_CHECKS`/`FLUENCY_QUIZ` in data.js. Badge "Agentic Enterprise Fluent" (`assets/badge-agentic-fluency.png`). **Answer key seeded by `supabase/upgrade-002.sql` — must be run before anyone takes this quiz.** |
| `platform` | `available` | "Commercient AI & Datalake Platform Certification" — REBUILT 2026-07-10 from Nick's newest source (`~/Downloads/Commercient_AI_and_Datalake_Platform_Certification.docx`), which reframes the platform as THREE connected pieces (AI Platform, Data Lake, Data Integration). **19 modules** (18 content + M19 glossary/reference-tables appendix) across 7 groups + a **45-question, 6-section quiz**. Every module has a per-module knowledge check (`CHECKS` populated → gating on). Data in `MODULES`/`CHECKS`/`QUIZ`. Generated via `scratchpad/parse2-platform.js` → `splice2-platform.js` from a docx extraction (fixed `<w:t(?: [^>]*)?>` regex; correct answers detected from `✓ CORRECT` markers). **Key: `supabase/upgrade-005.sql` (45 answers).** KNOWN ISSUE: 19/45 quiz questions have a length tell (correct answer longer than distractors) — from the source; offer to rebalance. |
| `portal` | `available` | "Commercient **Partner** Portal Certification" — 6-module course on the PARTNER portal (from J.J. Perez's walkthrough). Re-scoped 2026-07-06 to partner-only (was "partner AND customer") once the customer-panel recording proved the two UIs differ. Data: `PORTAL_MODULES`/`PORTAL_CHECKS`/`PORTAL_QUIZ`. Badge `assets/badge-portal.png`. Screenshots: `assets/portal/`. **Key: `supabase/upgrade-003.sql`.** |
| `customer-panel` | `available` | "Commercient Customer Panel Certification" — 6-module course on the CUSTOMER panel (from Johaina Cubar's customer-panel + HubSpot-layout recording). Different UI from the partner portal: CloneSync/CRM-Sync two-stage model, Query Editor v1/v2, self-service SQL, Purchase/add-ons/sync-frequency, 3GB usage limit, User Mgmt (3 free), main-user password rule. Transferable CRM concepts from the layout portion included; CRM-native view-building noted, not taught. Data: `CUSTOMER_PANEL_MODULES`/`CUSTOMER_PANEL_CHECKS`/`CUSTOMER_PANEL_QUIZ`. Badge `assets/badge-customer-panel.png`. Screenshots: `assets/customer-panel/`. **Key: `supabase/upgrade-004.sql`.** |
| `external-agent` | `available` | "External Agent Setup Certification" — staff/implementer runbook built from `ExternalAgentSetupGuide.pdf` (7 steps → 8 modules) for standing up a customer-facing website agent. Data: `EXTERNAL_AGENT_MODULES`/`EXTERNAL_AGENT_CHECKS`/`EXTERNAL_AGENT_QUIZ` + inline `EXTERNAL_AGENT_COURSE`; helpers `eaShot`/`eaPrompt`. 15 REAL annotated screenshots extracted from the PDF via pypdf → `assets/external-agent/`. Includes the two verbatim Claude prompts (system-message adaptation + demo-page) in `<pre>` blocks (tags HTML-escaped). Internal person-names genericized to roles. 12-Q quiz. Badge `assets/badge-external-agent.png` (not yet made). **Key: `supabase/upgrade-006.sql` (12 answers).** **REPLACES the old `web-agent` coming-soon tile** (removed 2026-07-20). Audience is EXTERNAL/partner-facing (Nick confirmed) — audience line + Module-1 callout reworded accordingly. |
| `ai-admin` | `coming-soon` | Placeholder tile. Customer-admin track. |

An **available** course object:
```js
{
  id, status:"available", title, tagline, audience, estTime,
  icon,                                  // tile/overview image
  badge: { name, blurb, img },           // img = completion badge PNG (optional)
  skills: [ "…" ],                       // LinkedIn skill suggestions (click-to-copy chips)
  payoff,                                // money callout string
  groups: [ { name, modules:[ids…,"quiz"] } ],  // sidebar grouping AND canonical order
  roadmap: [ { step, title, desc } ],
  learn:   [ "…" ],
  modules: MODULES,                      // reference to the module array for this course
  quiz:    QUIZ                          // reference to the quiz for this course
}
```
A **coming-soon** course omits `groups/roadmap/learn/modules/quiz` and adds a `note`.

### ➕ How to add a new course (the extensibility path)
1. Define its module array + quiz (or reuse a shared one) **above** `COURSES`. **Do NOT put correct-answer indices in the client quiz** — questions/options only.
   **Answer-authoring rules (applies to checks AND quizzes):** all four options must be similar in length — a longer, more polished option is a giveaway (keep correct ≤ ~1.3× the average distractor); distractors must be plausible and positive in tone — never a statement that plants a negative thought about Commercient (or a competitor).
2. Append a new object to `COURSES` with `status:"available"`, its own `groups`/`roadmap`/`learn`, and `modules`/`quiz` references.
3. **Seed the answer key server-side:** `insert into quiz_keys (course_id, pass_mark, answers) values ('<id>', 0.8, array[…0-based indices…]);` in the Supabase SQL Editor.
4. Add a `badge.img` asset if you have one (falls back to a CSS disc badge if absent — see §4).
Catalog, sidebar, progress sync, grading, credential issuance, verification, and My Achievements all pick it up automatically. Catalog order = order in `COURSES`; module order within a course = `groups`.

---

## 4. Logic map (`app.js`)

Single IIFE. Key pieces:

**State**
- `progress` persisted in `localStorage` under **`cpa_progress_v2`** — shape `{ courses: { [id]: {done:{}, quiz, reg, emailed} } }`. On load it **migrates `cpa_progress_v1`** (the old single-course blob) into `courses.platform`.
- `cur` = current course object; `order` = flattened `[moduleId…, 'quiz']` for `cur`, built in `setCourse(id)`.
- `cs(id)` returns/creates a course's progress; `st()` = current course's progress.

**Router — `route(go)`** (string routes, mirrored to the URL hash as of 2026-07-02): every route maps to a hash (`#/`, `#/achievements`, `#/course/platform`, `#/course/platform/module/3`, `#/course/platform/quiz`, `#/course/platform/cert`, `#/signin`) via `toHash`/`parseHash`, so views are deep-linkable, refresh keeps your place, and the back button works. Hashes containing `=` are ignored (Supabase magic-link tokens). Internally the `data-go` strings below are unchanged:
| route | renders |
|-------|---------|
| `home` (or empty) | catalog / academy landing |
| `achievements` | My Achievements page |
| `c:<id>` | course overview (sets `cur`) |
| `m:<id>` | module reader |
| `quiz` / `quiz:<id>` | pre-quiz registration → quiz |
| `cert` / `cert:<id>` | certificate |
| `overview` | legacy → course or home |

Nav elements use `data-go="…"`. `bindGo()` wires `main`'s links each render; the top-nav links are bound once at init. Adding a nav item = add an `<a data-go="…">` in `index.html` and a matching branch in `route()`.

**Render functions:** `renderHome`, `renderAchievements`, `renderCourse`, `renderModule`, `renderRegForm`, `renderQuiz`, `renderCert`, plus `renderSidebarHome` / `renderSidebarCourse`.

**Badges — `badgeHTML(course, size)`**
- If `course.badge.img` is set → renders the PNG, **circular-masked** (crops square backgrounds cleanly), with a graceful fallback to the CSS-disc badge if the image 404s (`onerror` adds `.noimg`).
- Sizes: `''` (default), `lg` (achievement panel), `sm` (badge strips).

**Certificate + credential (`renderCert`)**
- **Credential ID** via `makeCredId(reg, issued)` → deterministic `CA-{COURSEID[0..3].toUpperCase()}-{YEAR}-{6-char base36 hash}` (e.g. `CA-PLAT-2026-1A2B3C`). Persisted at `quiz.credId`, stable across re-views. Shown on the cert, in the email, and in the LinkedIn URL.
- **LinkedIn** via `linkedInAddUrl(issued, expiry, credId)` → LinkedIn "Add to profile" deep link. Prefills name, org, issue/expiration dates, `certId`, `certUrl`. ⚠️ LinkedIn's deep link has **no parameters for Skills or Media** — those are surfaced as click-to-copy chips and an auto-downloading cert PNG for manual entry.
- **Certificate PNG** via `downloadCertImage(...)` → renders the cert to a `<canvas>` (logo + badge seal + text) and downloads a PNG. No external libraries. Used for the "Download for media" button and auto-fired when clicking "Add to LinkedIn."
- **Email** via `emailCertificate(...)` → a **`mailto:` draft** (to the learner, cc `partners@commercient.com`). NOT true server-side send (see §11).

**My Achievements (`renderAchievements`)** — buckets available courses into: **completed** (quiz passed → clickable badge → `cert:<id>`), **certifications in progress** (registered/attempted, not passed → resume to `quiz:<id>`), **courses in progress** (modules started, no quiz attempt → resume to `c:<id>`). Buckets are mutually exclusive.

---

## 5. Editing copy

- **Course/catalog copy, audiences, money bands, badges, skills:** `data.js`.
- **Module bodies & takeaways:** `data.js` → `MODULES[n].body` / `.takeaways` (HTML strings).
- **Quiz questions/answers:** `data.js` → `QUIZ`.
- **Page chrome / labels / button text:** `app.js` (render functions).
- **Reorder/renumber modules:** update both the module `id`s and the course's `groups` array (order + prev/next derive from `groups`), and fix any in-body "see Module N" cross-references.

**Quiz answer key** (Platform course — REBUILT from three-pieces source, pass = 36/45 = 80%; seeded by `upgrade-005.sql`):
`array[2,0,1,2,0,1,3,3,0,0,1,1,2,0,1,0,2,1,1,0,3,1,0,0,2,2,3,2,0,3,0,3,0,1,2,0,0,0,1,2,1,3,0,1,2]` (0-indexed; **45 answers** — must match `supabase/upgrade-005.sql`. Quiz option lengths were rebalanced 2026-07-20 to remove length tells; option ORDER preserved, so the key is unchanged.)

**Quiz answer key** (Fluency course, pass = 10/12 = 80%; seeded by `upgrade-002.sql`):
`1B 2C 3A 4D · 5B 6C 7A 8D · 9B 10C 11B 12A`

**Quiz answer key** (Partner Portal course, pass = 11/13 = 80%; seeded by `upgrade-003.sql`):
`1C 2A 3B 4A · 5C 6B 7A 8D 9B · 10A 11C 12B 13D`

**Quiz answer key** (Customer Panel course, pass = 11/13 = 80%; seeded by `upgrade-004.sql`):
`1C 2A 3B 4C · 5C 6A 7B 8D 9A · 10B 11A 12C 13B`

---

## 6. Branding (source of truth)

Use the **`commercient-brand-kit`** skill for anything brand-related.
- **Colors** (CSS vars in `styles.css`): Teal `#29ABE2` (primary), Charcoal `#3D3D3D` (text), Navy `#1B3A5C` (hero/footers), Cloud `#E8EEF4` (page bg), plus steel/med/pale blues.
- **Fonts:** Raleway (headings) + Open Sans (body), Google Fonts.
- **Spacing tokens** (also in `:root`): `--gutter` (main padding), `--pad-x` (shared horizontal inset that aligns hero text, headings, and cards), `--sec-gap` (vertical rhythm). Prefer these over hard-coded px.
- **Logos** exported from the Canva brand guidelines design `DAGB2xebsak`, **page 4** (clean lockup + circular mark) — never page 3, never AI-generated/placeholder logos.

---

## 7. Content source of truth

Course copy originates from the Google Drive doc **`Commercient_Partner_Academy_Source`** (latest build used fileId `1qMvYQ4NZEowvBqex5ME-UWv1n2mrx_lP07A4Vn8Ugm4`, modified 2026-06-22). For implementation/domain accuracy use the `commercient-implementation` and `commercient-brand-kit` skills.

---

## 8. Hosting (Netlify) — LIVE (2026-07-02)

Deployed as the **public home**; portals link to it.
- **URL (live):** https://commercient-academy.netlify.app
- **Slug:** `commercient-academy` (renamed from `commercient-partner-academy`)
- **Site ID:** `8f86d22c-489b-4ca2-91ed-dfb76a08ea63`
- **Team ID:** `6a39834a180a1d0aba971697` (`nf_team_dev`)
- **Deploys page (drag-drop target):** https://app.netlify.com/projects/commercient-academy/deploys

**To deploy:** zip `index.html, verify.html, 404.html, config.js, backend.js, implementation-course.js, data.js, app.js, styles.css, assets/` (do **NOT** include `supabase/schema.sql` — it contains answer keys — nor `HANDOFF.md`/the stale single-file build) and drag onto the Deploys page. Bump `?v=` versions first (§9).

**Supabase project:** `eswuflpckfoohrgnxhez` (Nick's account). Auth → URL Configuration: Site URL = the Netlify URL; `http://localhost:4137` allowed for local dev.

Deploy either via the Netlify MCP connector (`deploy-site` with the Site ID, then run the returned `npx @netlify/mcp … --site-id …` from inside the project folder) or by drag-dropping the whole folder onto the Deploys page. Deployed entry is `index.html` (multi-file). Don't rely on the stale single-file build.

---

## 9. Caching / version query ⚠️

`index.html` links assets with a version query — currently `styles.css?v=8`, `config.js?v=2`, `backend.js?v=2`, `data.js?v=20`, `app.js?v=7`. Browsers aggressively cache the JS/CSS on this static host; **when you edit any of these files, bump that file's `?v=` number in `index.html`** or users will see stale code. (This caused repeated "my change isn't showing" confusion before it was added.)

---

## 10. Regenerating the single-file build

`Commercient_Partner_Academy.html` inlines everything into one shareable file. It is **stale and now second-class**: the app has a backend (auth redirects, verify page), so the single-file build only makes sense for offline *browsing* demos — sign-in, grading, and verification require the hosted app. Regenerate only if needed (keep the replaced strings in sync with the current `?v=` values in `index.html`):
```bash
cd "/Users/nicklynn-rulon/App Projects/Commercient Partner Academy"
node --check data.js && node --check app.js && node --check backend.js && node --check config.js
python3 - <<'PY'
import base64
b64=lambda p:'data:image/png;base64,'+base64.b64encode(open(p,'rb').read()).decode()
logo=b64('assets/commercient-logo.png'); icon=b64('assets/commercient-icon.png'); badge=b64('assets/badge-ai-platform.png')
html=open('index.html').read(); css=open('styles.css').read()
inline=lambda f:'<script>\n'+open(f).read()+'\n</script>'
html=html.replace('<link rel="stylesheet" href="styles.css?v=7">','<style>\n'+css+'\n</style>')
html=html.replace('<script src="config.js?v=1"></script>',inline('config.js'))
html=html.replace('<script src="backend.js?v=2"></script>',inline('backend.js'))
html=html.replace('<script src="data.js?v=20"></script>',inline('data.js'))
html=html.replace('<script src="app.js?v=5"></script>',inline('app.js'))
html=html.replace('assets/commercient-logo.png',logo).replace('assets/commercient-icon.png',icon).replace('assets/badge-ai-platform.png',badge)
open('Commercient_Partner_Academy.html','w').write(html)
print('wrote', len(html), 'bytes')
PY
```
(The supabase-js CDN `<script>` stays remote — the single-file build needs internet for auth anyway.)

---

## 11. Known issues / open work

- **Exec-review build (2026-07-09)** — full product review, then fixes (data.js v16, app.js v7, styles.css v8, config.js v2):
  - **Platform course knowledge checks AUTHORED** — `CHECKS` now has all 18 (was `{}` after the rebuild; modules gated on nothing and Charlie's welcome promised checks that didn't exist). Audit clean: no length tells, correct-index spread varied.
  - **Honest times** — all module `time` fields recalculated from word count (ceil(words/200)+1 for the check); estTimes now: fluency/portal/customer-panel ~30 min, platform **~90 minutes** (was ~3 hours — inflated ~2×).
  - **Email honesty** — REMOVED the auto-fired `mailto:` and the false "has been emailed / cc'd to partners@" banner. Email is now an explicit "Email me a copy" button (opens a draft). **The `credentials` table is the roster** — nobody at partners@ was ever actually receiving anything.
  - **Magic-link return** — intended route stashed in `localStorage.cpa_next` when the sign-in link is requested; auth `onChange` resumes it (e.g. straight back to the quiz) instead of dumping on home.
  - **Quiz drafts** — selections persist per course (`quizDraft` in the progress blob, local-only); reload/misclick no longer wipes 43 answers. Scorebar shows "N/M answered". Cleared on reset and passing submit.
  - **LinkedIn** — `LINKEDIN_ORG_ID` in config.js (NEEDS the numeric company ID; free-text fallback until set); per-course `brag` in data.js (old copy said "Commercient AI Platform" for every course); new one-click **Post on LinkedIn** (feed composer prefilled with brag + verify URL); founding credential № surfaced on the achieve banner and in the brag.
  - **Share card** — `downloadShareCard()` renders a 1080×1080 social square (Charlie + badge + name + cred №). Separate from the certificate, which stays corporate.
  - **Next-course pull** — cert page recommends the specific next uncertified course with its estTime.
  - **Screenshot placeholders hidden in prod** — `html.prod` set for non-localhost; `.prod .shot.missing{display:none}`. Placeholders (with filenames) still show locally for authoring. REAL SCREENSHOTS STILL WANTED (see portal/customer-panel lists below).
  - **Badges compressed** — badge-ai-platform 3.96MB→69KB, badge-agentic-fluency 1.3MB→61KB (800px, circle-masked so downloads have no square corners; originals in the session scratchpad `asset-originals/`). Badge art is now the course-tile icon (`.tile-mark.is-badge`, falls back to the Commercient icon on 404). "Download badge" renders only after the file is probed to exist; filename is per-course.
  - **Charlie's gear scaffold** — milestone cosmetics (1/2/3 certs → cap/shades/robo-pup) wired end-to-end but INVISIBLE until `assets/charlie/gear-hat.png` exists. Cert count is server-truthful (credentials table), so unlocks can't be farmed. Deliberate design call: gear is **milestone unlocks, NOT spendable XP** — no store, no farming incentive, no cheat surface.
  - **Misc** — og:image is now a real 1200×630 card (`og-card.png`, also on verify.html) + `summary_large_image`; branded `404.html`; achievements page hides the empty "Certifications in progress" section; sign-in page has Charlie; reg-form copy no longer claims auto-email; cert `total` fallback derives from the quiz length (was hardcoded 25); duplicate `.badge-link` CSS consolidated; catalog tiles use one-line `payoffShort`.
- ~~No credential verification~~ **DONE (2026-07-02):** credentials are issued server-side by `grade_quiz` and publicly verifiable at `verify.html?id=…` via the anon `verify_credential` RPC. LinkedIn `certUrl` points at the verify page.
- ~~No accounts / localStorage-only~~ **DONE (2026-07-02):** Supabase auth (magic link stand-in — see `backend.js` header; will be replaced by Commercient admin-panel SSO), progress syncs to the `progress` table, credentials to `credentials`. localStorage remains the local-first cache.
- **Hosting decision made:** public home on Netlify (portals link to it). Rename slug to `commercient-academy` at deploy time and keep `config.js → SITE_URL` in sync.
- **Email is still a `mailto` draft, not true send** — deliberately deferred. Real send = Resend (or similar) + commercient.com DNS verification; wire it into an edge function or the cert flow when IT can do DNS.
- **Single-file build stale** (§10) — now also missing `config.js`/`backend.js`; regen script needs updating before next use.
- **Old local passes have no registered credential** — anyone who passed before the registry existed sees a "retake to register" notice on the cert page (by design; nobody real is affected pre-deploy).
- **Web Agent & AI Admin courses are placeholders** — need SME content (Connor/Heath for Web Agent). Remember: new course = seed `quiz_keys` row (§3).
- **Customer Panel course — Nick edit pass (2026-07-08):** Applied Nick's copy feedback (now codified in memory [[course-copy-rules]]). Removed ALL Key Takeaways from the 6 customer-panel modules (app.js now guards `m.takeaways` so any course can omit them — v6). Generified every ERP/CRM brand name (no Applied/HubSpot/Salesforce; "company matching"→"account matching") and removed all "in the training"/"61,603 records" recording references. Deleted the "Salesforce naming-convention trap" (callout, objective, and quiz Q6 → replaced with a Query Editor v1 question; answer key UNCHANGED). Reframed the payoff around platform value/independence (not "faster integration"). De-emphasized the main-user password rule (out of title/takeaways; kept as one plain callout). Removed negative/uncertain phrasing ("that's expected, not a fault," "don't panic"). Reworded Help Desk + AI-tools note. Roadmap: split "Run it & get certified" into "Manage the account" + "Get certified" (quiz its own step). data.js v12; audit clean (balanced, no leaks). OPEN QUESTIONS FOR JJ: (1) is the CloneSync-vs-CRM-Sync framing true for every project? (2) do we need real Phase 2 content (recording skipped it — currently one brief callout)?
- **New course: External Agent Setup (2026-07-20):** Built `external-agent` from `~/Downloads/ExternalAgentSetupGuide.pdf` (44-page staff runbook; pypdf extracted the text layer AND 44 embedded screenshots — poppler was unavailable). 8 modules across 5 groups, per-module knowledge checks, 12-Q quiz; 15 curated real annotated screenshots in `assets/external-agent/`; the two reusable Claude prompts embedded verbatim. Internal names (Connor/Sudha/Kevin/Shailin) genericized to roles. data.js v20; `supabase/upgrade-006.sql` seeds the key. Verified live: renders, screenshots load, prompt blocks safe, no console errors. 2026-07-20 UPDATE: Nick confirmed it is EXTERNAL/partner-facing and it REPLACES the `web-agent` coming-soon tile — web-agent tile removed from COURSES, audience + Module-1 callout reworded external. Remaining: badge art still to make.
- **Launch-prep pass (2026-07-20):** Cleared the review's content blockers on `platform`. Title typo fixed ("Datalake"→"Data Lake"). Added `payoffShort` + `brag` to the platform course (were missing). Removed the internal name "John" from the `web-agent` teaser. Module 19 given a `time` ("2 min"). **Rebalanced all 19 length-tell quiz questions** — padded terse distractors with specific/plausible detail and tightened over-long correct answers; correct-answer INDEX and meaning preserved on every one, so `upgrade-005.sql` is unchanged (max option-length ratio now 1.30, no tells). data.js **v18**. Repo created: **github.com/nickrulon/commercient-academy** (private). Still outstanding: 2 badges (portal, customer-panel), 27 screenshots (portal 13 + customer-panel 14), run the 6 SQL files on the target Supabase, Netlify deploy of the new zip.
- **AI Platform course — FULL REBUILD v3 (2026-07-10):** Rebuilt `platform` from Nick's newest source (`Commercient_AI_and_Datalake_Platform_Certification.docx`), which restructures the whole course around the platform's THREE connected pieces (AI Platform, Data Lake, Data Integration) and the four integrators (CDC Replicator/UDC, Enterprise System Transactional, Enterprise CRM, Point-to-Point Pulse). Now **19 modules** (18 content + M19 = glossary + Signal→agent + Delivery-roles reference tables), 7 groups, **45-question 6-section quiz**, and a **per-module knowledge check on every module** (source marked correct answers with `✓ CORRECT`; `CHECKS` now populated → module gating restored). Title changed to "Commercient AI & Datalake Platform Certification". Pipeline: `scratchpad/parse2-platform.js` (docx→structured text→JSON, deriving key + checks from `✓ CORRECT`) → `splice2-platform.js` (marker-based replace of MODULES/CHECKS/QUIZ/catalog). Backup: `scratchpad/data.js.bak2`. data.js v17; sidebar-safe (all group refs resolve); 0 lowercase "commercial". **Run `supabase/upgrade-005.sql` (now 45 answers).** FLAGGED: (1) 19/45 quiz questions have a correct-answer-longer length tell — offer to rebalance distractors; (2) title says "Datalake" while badge/body say "Data Lake" — likely a typo to confirm.
- **AI Platform course — Nick refinement pass (2026-07-08):** Applied Nick's edits via `scratchpad/refine-platform.js` (reads `platform.json`, re-splices). REMOVED the "Working as a Partner" module (old M17), its group, and its 2 quiz questions (old Q44/Q45 = Section 7) — this cert is now GENERAL AUDIENCE; a separate partner cert will hold commission content. Also removed all 7 "FOR COMMERCIAL PARTNERS" callouts across modules (general audience + they'd force a nonsensical "Commercient" rename). "commercial"→ resolved by intent: "commercial partner(s)"→"partner(s)", "commercial model"→"pricing model", company-dictation "commercial"→"Commercient" (0 "commercial" left). Modules renumbered to 1–18 (glossary now M18). Quiz refinements: Q17 correct→"One-time CRM migration"; Q22 correct→data-lake framing ("each sees one system; Commercient AI reasons across your whole data lake"); Q35 question "commercial"→"Commercient" + neutralized the negative-toned distractors; Q37 fixed the too-obvious "no access at all" distractor; Q38 correct→"begin the Commercient Guided Implementation (CGI), with live Customer Success available"; Q42 correct→"Rightworks blocks the API, so Commercient can't connect — customer would need a different hosting provider". data.js v14, 18 modules / 43-q / 6-section, no length tells. **Re-run `supabase/upgrade-005.sql` (now 43 answers).** NOTE: Modules 9 & 10 (Partner Portal, Quoting Tool) were kept — still partner-tool-focused; flag if those should also move to the partner cert.
- **AI Platform course — FULL REBUILD (2026-07-08):** Rebuilt `platform` from Nick's new source docx (he expanded scope with new info). Was 14 modules/25-q quiz → now **19 modules** (18 authored: platform, connections, data lake, pricing×2, opportunity-spotting×3, portal, quoting, demo, positioning, AI discovery, CGI, scope, timelines, partner earnings, reference; + M19 glossary synthesized from Appendix A) in 8 groups, **45-question 7-section quiz**. Faithful conversion via docx→structured-text extraction (`scratchpad/parse-platform.js`) then JSON splice into data.js (`splice-platform.js`); backup at `scratchpad/data.js.bak`. Key facts: source has NO per-module knowledge checks so `CHECKS={}` (modules don't gate anymore — OFFER to author checks if wanted); source doesn't bold body prose so no `<strong>` (faithful); "FOR COMMERCIAL PARTNERS" callouts kept as-is; ERP/CRM brand names kept where Nick used them (this is his authored copy, not a recording-derived one). **Run `supabase/upgrade-005.sql`** (replaces the old 25-answer platform key). data.js v13. No length tells in the 45 questions. OPEN: no per-module screenshots (source is text) — could add for portal/quoting/demo modules if wanted.
- ~~Customer Panel course~~ **DONE (2026-07-06):** "Commercient Customer Panel Certification" (`customer-panel`) — 6 modules + 13-question quiz from Johaina Cubar's customer-panel recording. Distinct UI from the partner portal (CloneSync/CRM-Sync, query editors, self-service SQL, Purchase, 3GB limit, user mgmt, main-user password rule). Transferable CRM concepts from the HubSpot-layout half included; native view-building noted only. **Run `supabase/upgrade-004.sql`.** Screenshots wanted (must-have starred): 01-login, *02-left-nav, *03-dashboard-project, 04-weekly-sync, *05-help-desk, *06-query-editor-v1, *07-crm-config, *08-sync-logs, 09-query-editor-v2, *10-purchase, *11-accounting, 12-user-management, 13-alerts, *14-associated-records → `assets/customer-panel/`. Capture from Johaina's demo/test account, REDACT the real customer (Arachas/Lindsay) data and any SQL/table contents. Badge art wanted: `assets/badge-customer-panel.png`. ALSO re-scoped the Portal course to partner-only (title, tagline, audience, module-1 & module-2 callouts) since this recording proved the panels differ.
- ~~Portal course~~ **DONE (2026-07-02):** "Commercient Portal Certification" (`portal`) — 6 modules + 13-question quiz built from J.J.'s Partner Portal walkthrough recording; framed for partners AND customer admins (partner-only tools flagged in callouts). **Run `supabase/upgrade-003.sql` before the quiz goes live.** Screenshot system added (`.shot` figures in styles.css): each figure shows a placeholder with its exact filename until the PNG is dropped into `assets/portal/`. Wanted screenshots (must-have starred): 01-login, *02-dashboard, *03-quoting-tool, 04-submit-lead, 05-customers, *06-project-status, *07-company-dashboard, *08-sync-logs, 09-ai-tools, *10-usage, *11-add-ticket, 12-charlie, *13-notifications. Capture from a demo/test account, redact real customer data (especially the API-keys screen), PNG ~1400–1600px wide. Terms to verify with J.J. (transcript was garbled): exact project-stage names, the user-count type labels on the usage screen, and "SO moved to external system" (assumed = sales orders). Badge art wanted: `assets/badge-portal.png`.
- ~~Messaging/identity training course~~ **DONE (2026-07-02):** "Agentic Enterprise Fluency Certification" (`fluency`) — 6 modules + 12-question quiz distilling the booth-messaging/positioning source docs into a standalone, outward-facing cert (event references, names, and the dollar-goal framing stripped per direction). Placed FIRST in the catalog as the universal on-ramp; badge "Agentic Enterprise Fluent"; full 500 XP (uniform cert value was a deliberate call — a smaller number would signal a lesser badge). **Before the quiz works in prod: run `supabase/upgrade-002.sql`.** Platform Module 6 was backported to match the fluency guardrails ("agents that take action" instead of "surfaces insights") and now cross-links the fluency course. Badge art: `assets/badge-agentic-fluency.png` (added 2026-07-02).
- ~~Gamification layer~~ **DONE (2026-07-02):** XP (derived, never stored: `GAME.xpModule`/module + `GAME.xpCert`/cert), level ladder by certifications earned (Explorer → Practitioner → Specialist → Expert, in `GAME.levels`), in-module knowledge checks gate "Mark complete" (client-graded practice; `CHECKS` in data.js — **new module = add a check**), Charlie as journey guide (course welcome, checks, quiz coach, pass/fail reactions, achievements empty state — never on the certificate), founding credential numbers (`cred_no`, upgrade-001).
- **Gamification guardrail:** the credential stays sacred — no confetti on certs, no login streaks, no participation badges. Fun lives on the journey; the certificate stays corporate and verifiable. (The one confetti burst fires on **quiz pass** — journey side — never on the cert page.)
- ~~Design/UX pass~~ **DONE (2026-07-02, "enterprise-polish" build):**
  - **SVG icon system** (`ICONS` + `icon(name)` in `app.js`) replaced ALL emoji — audience cards, money callouts, level ladder, XP chip, badges, time chips. `data.js` `audiences[].icon` and `GAME.levels[].icon` are now icon **names**, not emoji. New icon = add a key to `ICONS`.
  - **URL hash routing** — deep links, back button, refresh-safe (see §4). LinkedIn/social can now link to a specific course.
  - **Course overview redesigned** — duplicate title card removed, Start/Continue CTA (with % when started) lives in the hero, and an **"earn panel"** shows the actual badge up front (grayscale-locked until certified) with verifiable/XP/LinkedIn meta.
  - **Module reader** — renders the previously-unused `objectives` ("In this module"), eyebrow shows "Module x of N · group · time", course-progress bar in the hero, pager buttons name their destination module.
  - **Home** — "Continue where you left off" resume strip (conic progress ring, deep-links to first incomplete unit), hero trust chips (verifiable / LinkedIn-ready / free), hero CTA adapts to progress; money band restyled (deep brand green + dollar icon, no more Bootstrap green).
  - **Mobile** — top nav no longer overflows (external links + redundant labels hidden ≤820px); sidebar becomes a **drawer** opened by a floating "Course menu" button (`#sbToggle`; auto-closes on navigation).
  - **Keyboard a11y** — all `data-go` elements are focusable with Enter/Space activation (`wireGo`), `:focus-visible` outlines.
  - **Quiz pass celebration** — one confetti burst + XP toast on first pass (journey only).
- **Still open (future):** certified-people directory (opt-in, public — strong social proof), Charlie as an actual AI tutor (ask questions about module content — the academy dogfooding the platform it certifies), real email send (Resend + DNS).

---

## 12. Strategic direction (context for prioritization)

Repositioned from a partner-only training checkbox into a general commercial-AI learning platform framed around **earning money** ("Learn Commercient AI. Get certified. Get paid to deploy it."). Guiding priorities:

1. **Content is the bottleneck, not the platform.** The multi-course architecture is done; value is now gated on real courses. Highest-leverage next step: build the **Web Agent Deployment** cert (the "learn in ~10 hrs → bill 20–30 customers" money path).
2. **Decide the hosting home before more polish** — a public, shareable instance is recommended, since shareable badges + verifiable credentials only work at a public URL; portals can route to it.
3. **Close the credential-trust loop** (verify page + true email send) once the money path is proven — that's when a lightweight backend earns its keep.
4. **Keep authorship modular** (`COURSES` append-to-add) so onboarding/other teams can contribute courses.
5. **Watch the "for everyone → for no one" risk:** the architecture supports all audiences, but lead with **partners + the web-agent money path** as the flagship rather than diluting the homepage across five audiences equally.
