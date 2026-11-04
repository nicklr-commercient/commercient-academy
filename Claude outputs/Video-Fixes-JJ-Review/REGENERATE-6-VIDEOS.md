# Regenerate 6 videos (JJ's review, Oct 2026)

JJ's review found four places where the series didn't match how Commercient implements. The fixes touch six videos. The other nine stay as they are.

## What changed

1. **Matching before the CRM sync.** When the CRM already has data, nothing syncs into it until matching is done. Sample records only go to an empty CRM.
2. **Record count check.** The installation team checks record counts and the customer approves them before the project moves on.
3. **Phase 1 and Phase 2 can overlap** once the first sync is verified, if Phase 2 is licensed and the customer agrees.
4. **Onboarding first.** Partners can't join customer meetings or get logins until CGI onboarding, the NDA and (if required) a TPAF are done.

## Step 1: refresh the sources in NotebookLM

In the **Commercient Partner Implementation Series** notebook:

1. **Delete** these old sources: `00-series-bible.md`, `ep00-start-here.md`, `ep02-installation-session.md`, `ep03-sample-records-handoff.md`, `ep04-layout-training-kickoff.md`, `ep05-data-matching.md`, `ep09-phase2-kickoff.md`.
2. **Upload** the new versions from this kit: `00-series-bible.md`, `ep00-start-here.md`, `ep02-installation-session.md`, `ep03-record-counts-handoff.md` (new name), `ep04-layout-training-kickoff.md`, `ep05-data-matching.md`, `ep09-phase2-kickoff.md`.
3. Keep `01-visual-brand-guide.md` and the other episode files as they are.

## Step 2: regenerate each video

Same settings as before: **Studio → Video Overview → customize**, Format **Explainer**, tick only the three sources listed, paste the prompt. Visual style (Custom), if offered:

```
Flat vector corporate illustration in Swiss International Typographic Style: minimalist, clean grid layouts, generous white space. Simple geometric shapes, rounded corners, consistent thin outlines, solid flat color fills; no gradients, shadows, textures, sketch lines or watercolor. Infographic diagrams, icons and flowcharts with arrows. Palette: white and pale blue #dce7f1 backgrounds, navy #1c3b60, teal #19a4d0 as the only accent, light blues #a2bedb and #789cc2, graphite #444444 text. Bold uppercase geometric sans-serif titles with wide letter spacing. No logos, mascots or photos.
```

### Regenerate: Episode 0 · Start Here: Your First Commercient Project

- **Stage:** Orientation
- **Sources to tick:** `00-series-bible.md`, `01-visual-brand-guide.md`, `ep00-start-here.md`
- **Format:** Explainer

**Prompt:**

```
Episode 0 of the Commercient Partner Implementation Series: "Start Here: Your First Commercient Project." Follow the Episode 0 file beat by beat, using the series bible's voice and the visual brand guide's look. Speak to the partner POC as "you." They already know Commercient: don't explain the product or its value. Frame this as orientation for learning the platform live with the Commercient team. Introduce the 14-meeting series map and the fictional example customer, Cobalt Creek Supply. Mention that Phase 1 and Phase 2 can overlap once the first sync is verified. Include the 'Before your first customer meeting' beat: CGI onboarding, the NDA, and a TPAF if required, before any customer meeting or login. Don't go into any one meeting's detail. End by pointing to Episode 1: Installation Discovery. Keep the whole video to about 3 minutes: pick the essentials and skip detail.
```

**What's different:** Adds the 'Before your first customer meeting' beat (CGI onboarding, NDA, TPAF) and says Phase 1 and Phase 2 can overlap.

### Regenerate: Episode 2 · I2 · The Installation Session

- **Stage:** Installation
- **Sources to tick:** `00-series-bible.md`, `01-visual-brand-guide.md`, `ep02-installation-session.md`
- **Format:** Explainer

**Prompt:**

```
Episode 2 of the Commercient Partner Implementation Series: I2 · The Installation Session. Follow the series bible's nine-beat episode structure, using the Episode 2 file for the content and the visual brand guide for the look. Keep it to 2–3 minutes using the bible's short cut: one or two sentences per beat, top 3–4 steps only. Open on the series map with I2 highlighted. Speak to the partner POC as "you," and keep Cobalt Creek Supply (fictional) as the running example, picking up where Episode 1 left off. Show both install paths briefly, then follow Cobalt Creek down the API path. End both paths on the record count check: the installation team checks the counts and the customer approves them. Make clear nothing syncs into the CRM yet. Cover only this meeting. Close by teasing Episode 3: Record Counts and the Handoff.
```

**What's different:** Ends on the record count check: the installation team checks counts and the customer approves them. Nothing syncs into the CRM yet.

### Regenerate: Episode 3 · I3 · Record Counts and the Handoff

- **Stage:** Installation
- **Sources to tick:** `00-series-bible.md`, `01-visual-brand-guide.md`, `ep03-record-counts-handoff.md`
- **Format:** Explainer

**Prompt:**

```
Episode 3 of the Commercient Partner Implementation Series: I3 · Record Counts and the Handoff. Follow the series bible's nine-beat episode structure, using the Episode 3 file for the content and the visual brand guide for the look. Keep it to 2–3 minutes using the bible's short cut: one or two sentences per beat, top 3–4 steps only. Open on the series map with I3 highlighted. Speak to the partner POC as "you," and keep Cobalt Creek Supply (fictional) as the running example, picking up where Episode 2 left off. Lead with the customer approving the record counts. Make the rule clear: when the CRM already has data, the CRM sync stays off until matching is done, so Cobalt Creek reviews its data in Commercient's portal, not in HubSpot. Close the Installation stage. Cover only this meeting. Close by teasing Episode 4: Layout Training and the Phase 1 Kickoff.
```

**What's different:** Renamed to 'Record Counts and the Handoff'. Customer approves counts; when the CRM has data, the CRM sync stays off until matching, so the first look happens in Commercient's portal.

### Regenerate: Episode 4 · P1-1 · Layout Training and the Phase 1 Kickoff

- **Stage:** Phase 1
- **Sources to tick:** `00-series-bible.md`, `01-visual-brand-guide.md`, `ep04-layout-training-kickoff.md`
- **Format:** Explainer

**Prompt:**

```
Episode 4 of the Commercient Partner Implementation Series: P1-1 · Layout Training and the Phase 1 Kickoff. Follow the series bible's nine-beat episode structure, using the Episode 4 file for the content and the visual brand guide for the look. Keep it to 2–3 minutes using the bible's short cut: one or two sentences per beat, top 3–4 steps only. Open on the series map with P1-1 highlighted. Speak to the partner POC as "you," and keep Cobalt Creek Supply (fictional) as the running example, picking up where Episode 3 left off. Open with the short Phase 1 stage intro. Stress that "existing system" in the license means matching comes first, and the CRM sync stays off until it's done. Cover only this meeting. Close by teasing Episode 5: Data Matching.
```

**What's different:** Validation happens in the portal (or in the CRM only if it was empty). The CRM sync stays off until matching is done.

### Regenerate: Episode 5 · P1-2 · Data Matching

- **Stage:** Phase 1
- **Sources to tick:** `00-series-bible.md`, `01-visual-brand-guide.md`, `ep05-data-matching.md`
- **Format:** Explainer

**Prompt:**

```
Episode 5 of the Commercient Partner Implementation Series: P1-2 · Data Matching. Follow the series bible's nine-beat episode structure, using the Episode 5 file for the content and the visual brand guide for the look. Keep it to 2–3 minutes using the bible's short cut: one or two sentences per beat, top 3–4 steps only. Open on the series map with P1-2 highlighted. Speak to the partner POC as "you," and keep Cobalt Creek Supply (fictional) as the running example, picking up where Episode 4 left off. Make the core rule unmistakable: match first, then turn on the CRM sync. Turning it on first creates duplicates. End the meeting with the CRM sync turned on and the first records landing on matched records. Cover only this meeting. Close by teasing Episode 6: The Personalization Session.
```

**What's different:** Match first, then turn on the CRM sync. The meeting now ends with the CRM sync turned on.

### Regenerate: Episode 9 · P2-1 · The Phase 2 Kickoff

- **Stage:** Phase 2
- **Sources to tick:** `00-series-bible.md`, `01-visual-brand-guide.md`, `ep09-phase2-kickoff.md`
- **Format:** Explainer

**Prompt:**

```
Episode 9 of the Commercient Partner Implementation Series: P2-1 · The Phase 2 Kickoff. Follow the series bible's nine-beat episode structure, using the Episode 9 file for the content and the visual brand guide for the look. Keep it to 2–3 minutes using the bible's short cut: one or two sentences per beat, top 3–4 steps only. Open on the series map with P2-1 highlighted. Speak to the partner POC as "you," and keep Cobalt Creek Supply (fictional) as the running example, picking up where Episode 8 left off. Open with the short Phase 2 stage intro on the Commercient Import checkbox, including that Phase 2 can run alongside Phase 1 once the first sync is verified, if the customer agrees. Make "Export New creates; it doesn't update" land clearly. Cover only this meeting. Close by teasing Episode 10: Queries and Process Creation.
```

**What's different:** Adds that Phase 2 can run alongside Phase 1 once the first sync is verified, if the customer agrees.

## Step 3: swap them in

Replace these files in the Drive review folders and in the Academy (`assets/implementation/epNN.mp4`): Episodes 0, 2, 3, 4, 5 and 9. Episode 3's Drive folder is now named for 'Record Counts and the Handoff'.
