# Episode 4 · P1-1 · Layout Training and the Phase 1 Kickoff

**Stage:** Phase 1, stop 1 of 5 · **Customer in the room:** yes · **Your prep:** about 1 hour

---

## Where we are

Episode 4. Meeting P1-1: Layout Training and the Phase 1 Kickoff. Phase 1, stop one of five. Show the series map with Installation filled in and the Phase 1 section lighting up, P1-1 highlighted.

**Stage intro (this episode only):** Phase 1 moves ERP data into the CRM: customers, contacts, and order and invoice history. It's the first promise of every project, so it's where the customer decides whether the project is working.

## Previously

In Episode 3, Cobalt Creek approved their record counts and built a customization list: add payment terms, add sales territory, and sync only active customers. Because HubSpot already has their data, the sync into HubSpot is still off. The Phase 1 team now has the list and your install record.

## Why this meeting exists

To **validate the first records**, show the customer how their sync is configured and logged, and capture everything they want **customized** and **matched**. It sets the plan for the rest of Phase 1.

## Who's in the room

- The customer's **project owner** and **CRM admin**
- Commercient's **Phase 1 lead**, who runs the meeting
- **You**, shadowing

## What happens

1. **Recap where things stand.** Record counts are approved. If the CRM already has data, the CRM sync is still off; if it was empty, a small batch of sample records is already there.
2. **Validation.** Check a few records field by field against the ERP screen: in Commercient's portal, or in the CRM if sample records went there.
3. **Portal tour.** Show the customer their **CRM Configuration** and the **view** behind each object. A view is the SQL query that decides which ERP fields go to which CRM fields. Show the **sync log**, where every run and every error is recorded.
4. **Ownership.** Decide who owns the accounts in the CRM.
5. **Customization list.** Confirm and expand the list: extra fields, picklists (not synced by default), and filters. By default, Phase 1 brings in **6 months** of order and invoice history; filters can change that.
6. **Matching plan.** If the CRM already has records, plan how they'll be matched to the ERP. **The CRM sync stays off until matching is done.**
7. **Path to full sync.** What has to be finished before everything in the license is switched on.

## Your prep hour

1. **Watch this episode.**
2. **Read the customer's license.** For each item, note:
   - the CRM object it lands in
   - whether it's core or an add-on
   - whether matching is needed. If the license lists the CRM as an "existing system," it already has data, and matching is required.
3. **Open two or three records** and compare them with the ERP.
4. **Bring one question.**

## What you walk out with

- A written **validation result**
- The **customization list**, confirmed
- A draft **matching plan**
- Your action items:
  - Write up the validation result.
  - Draft the customization list and the matching plan.
  - Ask Commercient support for the **key-field format** for this ERP: the identifier that links each CRM record to its ERP record.

**On your next project, you'll lead this kickoff.**

## Watch-outs

- **"Existing system" in the license means matching comes first.** Miss it and turning on the CRM sync creates duplicates.
- **Ask about history.** Six months is the default. Some customers want more, some want less.
- **Ownership decides who sees what in the CRM.** Settle it before the full sync, not after.

## Cobalt Creek in this episode

- A sample customer record, reviewed in Commercient's portal, **validates cleanly** against Acumatica.
- The portal tour shows the operations manager the view behind the company object. The payment terms and sales territory fields she asked for aren't in it yet.
- The **customization list** is confirmed: payment terms, sales territory, active customers only.
- The license lists HubSpot as an **existing system**: Cobalt Creek's companies and contacts are already there. The **matching plan**: match companies on the customer code where HubSpot has it and on company name where it doesn't; match contacts by email. The sync into HubSpot stays off until that's done.

## Callbacks

- Episode 3: the customization list started there and is confirmed here.

## Next up

**Next up, Episode 5: Data Matching.** Before any Acumatica data flows into HubSpot, every company and contact already there has to be linked to its Acumatica record. End on the series map with P1-1 filled in and P1-2 pulsing.

---

## Terms in this episode

Phase 1, record counts, validation, CRM Configuration, view, sync log, ownership, customization list, default history, existing system, matching plan, key field.
