# Commercient Academy: Admin Panel Integration Guide

**For:** the Commercient web team
**From:** Nick Lynn-Rulon
**Goal:** run the Academy inside the Commercient admin panel, using the panel's existing login. A signed-in panel user opens the Academy with no second sign-in, and their progress and credentials are stored against their panel user ID.

**Live reference build:** https://commercient-academy.netlify.app
**Source:** `github.com/nickrulon/commercient-academy` (private; ask Nick for access). `HANDOFF.md` in the repo has the full technical reference.

---

## 1. What you're receiving

A static front end (plain HTML, CSS and JavaScript; no build step, no framework) plus a small backend.

| Piece | Files | Notes |
|---|---|---|
| App shell and UI | `index.html`, `app.js`, `styles.css` | No dependencies except the Supabase JS client |
| Course content | `data.js`, `assets/` | Every course, module, knowledge check and quiz question. Nick edits these. |
| Config | `config.js` | Backend URL/key and the public site URL |
| **Backend adapter** | `backend.js` | **The only file that talks to a server.** This is your integration point. |
| Credential verification | `verify.html` | Public page for checking a credential ID (linked from LinkedIn) |
| Backend reference | `supabase/schema.sql` + `upgrade-00N.sql` | Tables, row-level security, and two server functions. Contains quiz answer keys, so never deploy it publicly. |

## 2. The key design point: one adapter to replace

`app.js` never calls a server directly. Everything goes through a single object, `Backend`, in `backend.js`. To integrate, **re-implement this object against the admin panel's auth and your database.** No UI code needs to change.

| Function | What it must do | Today (Supabase) |
|---|---|---|
| `init()` | Set up the session; return `true` when a backend is available | Creates the Supabase client |
| `enabled()` | `true` when a backend is configured | |
| `user()` | The signed-in user, at minimum `{ id, email }` | Supabase auth user |
| `profile()` / `refreshProfile()` | `{ first_name, last_name, company, email }` | `profiles` table |
| `onChange(cb)` | Call `cb` when the signed-in user changes | Supabase auth listener |
| `signIn(email)` / `signOut()` | **Replace with the panel's session.** Sign-in can become a redirect to the panel login or a no-op. | Magic-link email |
| `fetchProgress()` | Return `[{ course_id, done, quiz }]` for the current user | `progress` table |
| `pushProgress(map)` | Upsert one row per course for the current user | `progress` table |
| `gradeQuiz(course, answers, reg)` | **Grade on the server.** Return `{ correct, total, passed, results[], credential \| null }` | `grade_quiz` function |
| `fetchCredentials()` | Return the user's non-revoked credentials | `credentials` table |
| `verifyUrl(credId)` | Public URL of the verify page for a credential | Built from `SITE_URL` |

## 3. Mapping to your database

Four tables. Every user-linked table keys on the user ID, so mapping is a matter of **using the admin panel user ID wherever `user_id` appears.**

| Academy table | Purpose | Key columns | Map to |
|---|---|---|---|
| `profiles` | Name and company on certificates | `id` (user), `email`, `first_name`, `last_name`, `company` | **Your existing user table.** Expose these fields; no new table needed. |
| `progress` | Modules completed and quiz result, per course | `user_id`, `course_id` (PK together), `done` (JSON), `quiz` (JSON), `updated_at` | New table, `user_id` → panel user ID |
| `credentials` | Issued certificates, publicly verifiable | `credential_id` (e.g. `CA-IMPL-2026-1A2B3C`), `user_id`, `course_id`, `holder_name`, `company`, `email`, `score`, `total`, `issued_at`, `expires_at`, `revoked` | New table, `user_id` → panel user ID |
| `quiz_keys` | Correct answers per course | `course_id`, `pass_mark`, `answers` (int array) | New table. **Server-only.** Never sent to the browser. |

The `done` and `quiz` JSON blobs are owned by the front end. Store them as-is; don't model their insides.

**Two server functions to port** (both in `supabase/schema.sql`, about 100 lines of SQL together):
- **`grade_quiz`**: compares submitted answers to `quiz_keys`, records the result in `progress`, and on a pass issues or renews a row in `credentials`. Port to an API endpoint, or keep as a stored procedure.
- **`verify_credential`**: public, read-only lookup by credential ID for `verify.html`. Returns name, company, course, badge and dates; never email.

## 4. Two ways to host it

**Option A: Standalone app with single sign-on (recommended).**
Host the Academy at `academy.commercient.com` or `commercient.com/academy`. The panel links to it and passes the session (shared cookie on the same parent domain, or a signed token). `backend.js` reads that session and calls your API.
- Design stays exactly as built.
- Nick can keep updating content without a panel release (see section 5).

**Option B: Embedded in the admin panel.**
Mount the Academy inside the panel app. Tighter integration, but every content change rides the panel's release cycle unless you also do the content-store step in section 5.

Either way, **keep the Academy's own design.** It's deliberately distinct from the panel.

## 5. Keeping content updates off your plate

Nick adds and updates courses continuously. Today a course change is an edit to `data.js` and `assets/`, plus one `quiz_keys` row for a new quiz. Pick one:

1. **Auto-deploy from Git (best with Option A):** the repo deploys on push to `main`. Nick pushes; it's live in a minute. Your involvement: one-time pipeline setup.
2. **Content store (best with Option B):** load course content from a table at runtime, and give Nick an admin-only page to publish updates.
3. **Pull requests (fallback):** Nick opens a PR; you review and merge.

## 6. Migrating existing learners

The Netlify build has its own users in Supabase (project `eswuflpckfoohrgnxhez`). To carry them over, match on **email**: export `progress` and `credentials`, swap each Supabase `user_id` for the panel user ID with the same email, and import. Keep existing `credential_id` values so LinkedIn links and the verify page keep working.

## 7. Integration checklist

- [ ] Decide Option A or B, and the URL
- [ ] Re-implement `Backend` in `backend.js` against panel auth and your API
- [ ] Create `progress`, `credentials`, `quiz_keys`; expose name/company/email from your user table
- [ ] Port `grade_quiz` (server-side) and `verify_credential` (public)
- [ ] Seed `quiz_keys` from `supabase/schema.sql` and every `upgrade-00N.sql`
- [ ] Set `SITE_URL` in `config.js` to the new public URL, so verify links point there
- [ ] Set up the content-update path from section 5
- [ ] Migrate existing learners by email (section 6)
- [ ] Test: panel login → Academy → finish a module → pass a quiz → credential appears → verify page resolves
