# Episode 5 · P1-2 · Data Matching

**Stage:** Phase 1, stop 2 of 5 · **Customer in the room:** yes · **Your prep:** about 1 hour
**When it happens:** only when the CRM already has data. If the customer's CRM is empty, this meeting is skipped.

---

## Where we are

Episode 5. Meeting P1-2: Data Matching. Phase 1, stop two of five. Show the series map with P1-1 filled in and P1-2 highlighted.

## Previously

In Episode 4, the license showed HubSpot as an existing system: Cobalt Creek's companies and contacts are already in it. The matching plan was to match companies on customer code or name and contacts by email. The sync into HubSpot has stayed off, waiting for this meeting.

## Why this meeting exists

To **link the records already in the CRM to the right ERP records** before any ERP data flows into the CRM. The link is a **key field**: the ERP's identifier, such as the customer code, stored on the CRM record. **Match first, then turn on the CRM sync.** Turn it on first and Commercient can't recognize the existing records, so it creates duplicates.

## Who's in the room

- The **customer**, who owns every decision about which duplicates to keep
- Commercient's **data matching team**
- **You**, shadowing

## What happens

1. **Why matching matters.** Show what a duplicate looks like when matching is skipped: two copies of the same customer, and a sales team that doesn't trust either one.
2. **Dedup decisions first.** Duplicates already in the CRM have to be cleaned up before matching. **The customer decides** which record survives.
3. **Account matching with the matching tool:**
   1. Choose the CRM object and the ERP table or view to match against.
   2. Choose which columns to compare.
   3. Choose how to compare them. Start with **equals**, then try **contains** for what's left, combining columns with AND or OR.
4. **Read the results.** They come back in four groups: **Matched**, **Duplicate**, **Unmatched CRM** and **Unmatched ERP**.
5. **Write the keys back.** For matched records, the tool writes the ERP key onto each CRM record. What's left can be matched by **spreadsheet import**: two columns, the CRM record ID and the ERP key.
6. **Contacts next.** Usually matched by email.
7. **Products last.**
8. **Spot-check in the CRM.** Open a few records and confirm the keys are there.
9. **Turn on the CRM sync.** With the keys in place, the first ERP data lands on the existing CRM records instead of creating new ones. Check a few to confirm.

The order matters: **accounts, then contacts, then products, then the CRM sync.**

## Your prep hour

1. **Watch this episode.**
2. **Find the ERP's customer, contact and item tables**, and the key format for this ERP.
3. **Ask Commercient support** whether any custom matching views are needed.
4. **Pull an export from the CRM** to see how messy the data really is.
5. **Bring one question.**

## What you walk out with

- Existing CRM records **linked to their ERP records** by key fields
- The **CRM sync turned on**, with the first records landing on matched records
- Your action items:
  - Build the import files for anything the tool couldn't match.
  - Keep a **dedup decision log**: what was merged or kept, and who decided.
  - Record the final match counts for each object.

**On your next project, you'll run matching with the customer.**

## Watch-outs

- **Never turn on the CRM sync before matching is done.** That's the one mistake that creates duplicates at scale.
- **Equals before contains.** "Contains" is looser and can match the wrong record. Check those results by hand.
- **The customer decides on duplicates, not you.** Write the decisions down.
- **Key formats must be exact.** A key in the wrong format won't link.

## Cobalt Creek in this episode

- HubSpot has some companies twice, under slightly different names. The **operations manager** decides which to keep, and you log each decision.
- Most companies match on **customer code**. The rest match on **company name**, and the leftovers go through a **spreadsheet import**.
- Contacts match by **email**. Products come last.
- You record the final counts. HubSpot's existing records are now linked to Acumatica.
- **The sync into HubSpot is turned on.** The first Acumatica data lands on the matched companies, with no duplicates.

## Callbacks

- Episode 4: the matching plan is carried out here.
- Plant a seed for Phase 2: these same links let Phase 2 send deals to the right Acumatica customer later (Episode 9).

## Next up

**Next up, Episode 6: The Personalization Session.** With the existing records matched, the team builds Cobalt Creek's customization list into the sync itself. End on the series map with P1-2 filled in and P1-3 pulsing.

---

## Terms in this episode

Data matching, key field, duplicate, dedup, matching tool, equals, contains, Matched / Duplicate / Unmatched CRM / Unmatched ERP, spreadsheet import, CRM sync.
