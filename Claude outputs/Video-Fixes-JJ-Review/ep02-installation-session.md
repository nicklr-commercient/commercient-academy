# Episode 2 · I2 · The Installation Session

**Stage:** Installation, stop 2 of 3 · **Customer in the room:** yes, live screen-share · **Your prep:** about 1 hour

---

## Where we are

Episode 2. Meeting I2: The Installation Session. Installation, stop two of three. Show the series map with I1 filled in and I2 highlighted.

## Previously

In Episode 1, Cobalt Creek agreed on an API connection to their cloud Acumatica and finished the requirements checklist. Every item has an owner and a date. Today that checklist becomes a working connection.

## Why this meeting exists

To **connect Commercient to the ERP and prove it works.** The session ends when the connection is verified. Then the installation team checks the **record counts**, and the customer approves them before anything moves forward.

## Who's in the room

- The customer's **IT administrator**, at the keyboard. For on-premises ERPs they're on the ERP server; for cloud ERPs they're in the ERP's admin settings.
- Commercient's **installation team**, guiding and troubleshooting
- **You**, shadowing. On this project you drive at least one step yourself.

## What happens

The session follows one of two paths, depending on the method chosen in Episode 1.

**Path for on-premises ERPs (SQL Sync or ODBC Sync):**
1. **Registration: the database step.** In Commercient's registration portal, the customer chooses the database type (SQL Server, ODBC, or API) and enters the connection details.
2. **Install the Sync Agent.** Download Commercient's Sync Agent and install it on the ERP server.
3. **Set up and test the connection.** For SQL Sync, the agent uses the dedicated SQL login. For ODBC Sync, it uses an ODBC data source the customer created. Test the connection before saving.
4. **Run the scheduled task.** The agent creates a task in Windows Task Scheduler. Its first run copies the ERP's tables for Commercient; wait for it to finish.
5. **Check the logs.** For SQL Sync, Windows Event Viewer; for ODBC Sync, the agent's log folder. Look for today's entry and confirm there are no errors.

**Path for cloud ERPs (API):**
1. **Registration: the database step.** The customer chooses API and enters the ERP's address, an admin user and the company name.
2. **OAuth approval.** The customer sets up authorization with OAuth 2.0 and approves Commercient's access inside the ERP. No password is shared.
3. **No Sync Agent.** API connections run on Commercient's servers, so there's nothing to install.
4. **After the call, Level 2 takes over.** Commercient's Level 2 developers finish configuring access to the ERP data.

**Both paths end the same way: the record count check.** The installation team counts the records Commercient sees for each object (customers, contacts, items, orders) and the customer approves them before the project moves on. **Nothing syncs into the CRM yet.** If the CRM already has data, the CRM sync stays off until those records are matched (Episode 5).

## Your prep hour

1. **Watch this episode.**
2. **Watch Commercient's setup video** for the chosen method.
3. **Read that method's steps** in the installation guide.
4. **Confirm the prerequisite exists** before the call: the SQL login, the ODBC data source, or the OAuth setup.
5. **Know where the logs live** for this method.
6. **Bring one question.**

## What you walk out with

- A **working connection**, verified by clean logs (on-premises) or OAuth approval plus Level 2 handoff (API)
- **Record counts** checked and sent to the customer for approval
- Your action items:
  - Write an **install record**: method, server, task names, log locations, and any issues you hit.
  - For API installs, **track the Level 2 handoff** until it's done.
  - **Get the record counts approved** by the customer.

**On your next project, you'll drive this session.**

## Watch-outs

- **It isn't done until it's verified and approved.** Clean logs or Level 2 sign-off, then customer-approved record counts.
- **Don't turn on the CRM sync yet.** If the CRM has data, matching comes first.
- **Install with Windows admin rights** on on-premises servers, or steps fail partway.
- **Set expectations for the API wait.** The customer should know Level 2 work happens after the call.

## Cobalt Creek in this episode

- Cobalt Creek takes the **API path**. Their IT administrator enters Acumatica's details in the registration portal while you walk them through it. That's the step you drive.
- The IT administrator **approves Commercient's access in Acumatica** through OAuth. No password changes hands.
- There's **no Sync Agent.** After the call, Level 2 finishes the setup.
- The installation team checks the **record counts** and sends them to the operations manager for approval. HubSpot already has Cobalt Creek's data, so the **sync into HubSpot stays off** for now.
- You write the **install record** and log the Level 2 handoff.

## Callbacks

- Episode 1: the requirements checklist made today possible. Point out that every item on it was ready.

## Next up

**Next up, Episode 3: Record Counts and the Handoff.** Cobalt Creek approves the counts, sees their own Acumatica data for the first time, and the project moves to the Phase 1 team. End on the series map with I2 filled in and I3 pulsing.

---

## Terms in this episode

Registration portal, database step, Sync Agent, Task Scheduler, logs, OAuth, Level 2, record counts, approval, install record.
