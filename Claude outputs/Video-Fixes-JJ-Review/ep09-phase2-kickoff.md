# Episode 9 · P2-1 · The Phase 2 Kickoff

**Stage:** Phase 2, stop 1 of 6 · **Customer in the room:** yes · **Your prep:** about 1 hour

---

## Where we are

Episode 9. Meeting P2-1: The Phase 2 Kickoff. Phase 2, stop one of six. Show the series map with Installation and Phase 1 filled in and the Phase 2 section lighting up, P2-1 highlighted.

**Stage intro (this episode only):** Phase 2 runs the other direction: CRM to ERP. Unlike Phase 1, it isn't automatic for every record. A user chooses which records to send by ticking a box called **Commercient Import** on the CRM record. On the next sync run, Commercient picks the record up and creates it in the ERP. Two more fields report back: **Commercient Completed** (did it work?) and **Commercient Message** (the new ERP ID, or the error if it failed).

**Phase 2 doesn't have to wait for Phase 1 to finish.** Once the first sync is verified and working, Phase 2 can run at the same time as Phase 1, as long as the customer bought Phase 2 and agrees. Cobalt Creek chose to finish Phase 1 first.

## Previously

In Episode 8, Phase 1 was delivered. (Phase 2 could have started earlier, once the first sync was verified; Cobalt Creek chose to finish Phase 1 first.) Cobalt Creek's Acumatica data flows into HubSpot, and their team knows how to watch the sync. Now they want deals and new companies created in HubSpot to flow back into Acumatica.

## Why this meeting exists

To **confirm exactly what gets built, process by process**, and set expectations for testing, the demo and the timeline. A **process** is one Phase 2 flow, such as "new HubSpot company becomes a new Acumatica customer." Phase 2 typically takes **2 to 10 weeks**, depending mostly on the customer.

## Who's in the room

- The customer's **project owner**, **ERP admin** and **CRM admin**
- Commercient's **Phase 2 lead**, who runs the meeting
- **You**, shadowing

## What happens

1. **How a record gets triggered.** Walk through the Commercient Import checkbox and the two fields that report back.
2. **License review.** This is the most important part of the meeting. Fill in a table with one row per process: the process, its **ERP object**, its **CRM object**, and any extra **filters** (which records qualify).
3. **Processes on hold.** If the customer wants to defer a licensed process, record it and get it confirmed in writing.
4. **Templates vs. custom mapping.** Some ERP and CRM pairs have ready-made mapping templates; others are mapped from scratch.
5. **Mirroring Phase 1.** When Phase 1 and Phase 2 both touch the same object, their mappings must mirror each other. If they don't, the two directions overwrite each other. This is called **circular sync**.
6. **Next steps:** configuration, internal testing, troubleshooting, a user-testing (UAT) document, and a live demo. For testing, the customer either lets Commercient create test records or provides test records by an agreed date.
7. **Timeline.** Ask for the customer's expected timeline or deadline.

## Your prep hour

1. **Watch this episode.**
2. **Draft the license review table** from the customer's license.
3. **List the objects that depend on records already in the ERP**, such as a sales order that needs an existing customer and existing products. These depend on data matching.
4. **Bring one question.**

## What you walk out with

- The **license review table**, final
- Your action items:
  - Finalize the license table.
  - Log any on-hold processes.
  - Confirm the test-record approach.
  - **Flag expectation gaps.** Example: an "Export New" process creates new records in the ERP. It doesn't update them later. If the customer expects updates, say so now.

**On your next project, you'll run this kickoff.**

## Watch-outs

- **"Export New" creates; it doesn't update.** This is the most common expectation gap in Phase 2.
- **Get on-hold processes in writing.**
- **Mirror Phase 1** wherever both phases touch the same object, or you get circular sync.

## Cobalt Creek in this episode

- The license review table has **two rows**:
  1. **New HubSpot company → new Acumatica customer.** Extra filter: only companies with a complete billing address.
  2. **HubSpot deal → Acumatica sales order.** Sales orders include their line items by default.
- The sales order process depends on **customers and products already existing in Acumatica**. That's why the matching in Episode 5 matters here.
- The operations manager assumes that changing a deal later will update the sales order. It won't: this is an "Export New" process. You flag the gap, and she agrees changes after creation happen in Acumatica.
- The company process touches the same object Phase 1 already syncs, so its mapping will **mirror Phase 1** to avoid circular sync.
- Cobalt Creek will provide test records by an agreed date.

## Callbacks

- Episode 0: Commercient Import was introduced there. This is where it starts working.
- Episode 5: matching links deals to the right Acumatica customers and products.
- Episode 6: the Phase 1 company view is what Phase 2 will mirror.

## Next up

**Next up, Episode 10: Queries and Process Creation.** The license table becomes real processes. You'll watch the first one being built, then build one yourself. End on the series map with P2-1 filled in and P2-2 pulsing.

---

## Terms in this episode

Phase 2, Commercient Import, Commercient Completed, Commercient Message, process, license review table, ERP object, CRM object, filter, on hold, template, mirroring, circular sync, Export New, UAT document.
