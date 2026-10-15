
/* ============================================================
   COMMERCIENT IMPLEMENTATION TRAINING AND ROADMAP
   One module per meeting in a Commercient project (Start Here + 14).
   Primary content is the video; the text is a short outline.

   ADDING VIDEOS: paste each episode's link into IMPL_VIDEOS below.
   Accepted: YouTube, Vimeo, Loom, Google Drive (shared file link),
   or a file path like "assets/implementation/ep01.mp4".
   Empty = a "Video coming soon" placeholder.
   ============================================================ */
const IMPL_VIDEOS = {
  1:  "assets/implementation/ep00.mp4",   // Episode 0  · Start Here
  2:  "assets/implementation/ep01.mp4",   // Episode 1  · I1 Installation Discovery
  3:  "assets/implementation/ep02.mp4",   // Episode 2  · I2 The Installation Session
  4:  "assets/implementation/ep03.mp4",   // Episode 3  · I3 Record Counts and the Handoff
  5:  "assets/implementation/ep04.mp4",   // Episode 4  · P1-1 Layout Training and the Phase 1 Kickoff
  6:  "assets/implementation/ep05.mp4",   // Episode 5  · P1-2 Data Matching
  7:  "assets/implementation/ep06.mp4",   // Episode 6  · P1-3 The Personalization Session
  8:  "assets/implementation/ep07.mp4",   // Episode 7  · P1-4 Full Sync and User Testing
  9:  "assets/implementation/ep08.mp4",   // Episode 8  · P1-5 Delivery and Handover
  10: "assets/implementation/ep09.mp4",   // Episode 9  · P2-1 The Phase 2 Kickoff
  11: "assets/implementation/ep10.mp4",   // Episode 10 · P2-2 Queries and Process Creation
  12: "assets/implementation/ep11.mp4",   // Episode 11 · P2-3 Mapping and Result Mapping
  13: "assets/implementation/ep12.mp4",   // Episode 12 · P2-4 Internal Testing
  14: "assets/implementation/ep13.mp4",   // Episode 13 · P2-5 The Live Demo and Initial Sign-off
  15: "assets/implementation/ep14.mp4"    // Episode 14 · P2-6 Final Sign-off
};
function implVideo(n, title){
  const src = (IMPL_VIDEOS[n] || "").trim();
  const t = title.replace(/"/g, '&quot;');
  const wrap = inner => `<figure class="vid">${inner}<figcaption>${title}</figcaption></figure>`;
  const frame = url => wrap(`<div class="vid-frame"><iframe src="${url}" title="${t}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`);
  let m;
  if(!src) return wrap(`<div class="vid-ph"><strong>Video coming soon</strong><span>The outline below covers this meeting in the meantime.</span></div>`);
  if((m = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/))) return frame(`https://www.youtube-nocookie.com/embed/${m[1]}`);
  if((m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return frame(`https://player.vimeo.com/video/${m[1]}`);
  if((m = src.match(/loom\.com\/(?:share|embed)\/(\w+)/))) return frame(`https://www.loom.com/embed/${m[1]}`);
  if((m = src.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) return frame(`https://drive.google.com/file/d/${m[1]}/preview`);
  if(/\.(mp4|webm|mov)(\?|$)/i.test(src)) return wrap(`<div class="vid-file"><video controls playsinline preload="metadata" src="${src}#t=0.5"></video></div>`);
  return wrap(`<div class="vid-ph"><a href="${src}" target="_blank" rel="noopener">Watch the video</a></div>`);
}
function implGlance(stage, room, prep, produces){
  return `<div class="glance"><div><span>Stage</span>${stage}</div><div><span>Customer in the room</span>${room}</div><div><span>Your prep</span>${prep}</div><div><span>Produces</span>${produces}</div></div>`;
}

const IMPLEMENTATION_MODULES = [
  {
    id: 1, group: "Start Here",
    title: "Start here: your first Commercient project",
    time: "3 min video · 3 min read",
    objectives: [
      "Know how the three-customer ramp works",
      "See the 14 meetings of a project and how each feeds the next",
      "Know how to use your prep hour before each meeting"
    ],
    body: `
${implVideo(1, 'Episode 0 · Start Here')}
<p>You'll learn to implement Commercient <strong>live, alongside the Commercient team,</strong> on a real customer project. This course supports that: one short video and outline per meeting, so you walk into each one knowing what it's for, what will happen, and what it should produce.</p>
<h3>The three-customer ramp</h3>
<ol><li><strong>Customer 1: you shadow.</strong> Commercient runs every meeting; you prepare for each one and take on small pieces.</li>
<li><strong>Customer 2: you lead.</strong> You run the meetings, with Commercient supporting every step.</li>
<li><strong>Customer 3: you run it.</strong> Commercient is there when you need it.</li></ol>
<h3>Before your first customer meeting</h3>
<p>You can't join customer meetings or get system logins until you've <strong>completed CGI onboarding</strong>, <strong>signed the NDA</strong>, and, if the project needs one, <strong>signed a TPAF</strong>. Commercient's partner team walks you through all three.</p>
<h3>The roadmap: 14 meetings, three stages</h3>
<p><strong>Installation</strong> (3 meetings) connects the ERP. <strong>Phase 1</strong> (5 meetings) brings ERP data into the CRM. <strong>Phase 2</strong> (6 meetings, when licensed) sends records the customer chooses back into the ERP. Every meeting produces something the next meeting depends on.</p>
<p>Installation always comes first. <strong>Phase 1 and Phase 2 can overlap:</strong> once the first sync is verified and working, Phase 2 can run alongside Phase 1, if it's licensed and the customer agrees.</p>
<h3>Your prep hour</h3>
<ul><li>Watch that meeting's video.</li><li>Read its outline here.</li><li>Do one hands-on task, on a test system where you have one.</li><li>Bring one question.</li></ul>
<h3>Your team</h3>
<p>Mirror Commercient's team: a <strong>delivery lead</strong> plus an <strong>installer</strong>, a <strong>Phase 1 configurator</strong>, a <strong>data matching specialist</strong> and a <strong>Phase 2 configurator</strong>. One person can cover several roles; the configuration roles need real SQL skills.</p>
<div class="callout"><h4>Follow along</h4><p>The videos follow one fictional customer, <strong>Cobalt Creek Supply</strong> (Acumatica + HubSpot), from the first meeting to the last.</p></div>`,
    takeaways: [
      "Customer 1 you shadow, Customer 2 you lead, Customer 3 you run",
      "A project is 14 meetings across Installation, Phase 1 and Phase 2, each feeding the next",
      "Before every meeting: watch, read, do one hands-on task, bring one question"
    ]
  },
  {
    id: 2, group: "Installation",
    title: "I1 · Installation discovery",
    time: "3 min video · 4 min read",
    objectives: [
      "Choose between SQL Sync, ODBC Sync and API",
      "Build a complete requirements checklist with owners and dates",
      "Set sync frequency expectations with the customer"
    ],
    body: `
${implVideo(2, 'Episode 1 · I1 Installation Discovery')}
${implGlance('Installation · 1 of 3', 'Yes', '~1 hour', 'Connection method + requirements checklist')}
<h3>Why this meeting exists</h3>
<p>To decide how Commercient connects to the customer's ERP, collect every requirement for that connection, and line up the customer's IT and ERP people.</p>
<h3>What happens</h3>
<ol><li><strong>Scope boundary:</strong> Commercient syncs; it doesn't manage the ERP or CRM.</li>
<li><strong>Pick the method:</strong> SQL Sync (SQL Server 2008+), ODBC Sync (in the contract or via a voucher), or API (OAuth 2.0, or Zoho Vault if OAuth isn't available).</li>
<li><strong>Requirements checklist,</strong> with an owner and date per item: server, Windows admin access, ports, VPN or IP whitelisting.</li>
<li><strong>Sync frequency:</strong> agreed during implementation; the cost is part of monthly usage.</li>
<li><strong>Phase 2 connection details,</strong> if licensed. Ask now.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Watch the customer's ERP setup video from the installation video list.</li><li>Pre-fill the requirements checklist with what you know.</li><li>Check the contract for ODBC coverage.</li></ul>
<h3>What you walk out with</h3>
<p>The agreed connection method and a complete requirements checklist. Send the checklist, confirm the ERP consultant is engaged, and flag any ODBC voucher.</p>
<div class="callout"><h4>Watch out</h4><p>An incomplete checklist is the main reason installation sessions stall. Get names and dates, not "we'll get to it."</p></div>`,
    takeaways: [
      "SQL Sync for SQL Server 2008+, ODBC for other databases, API for cloud ERPs",
      "Every checklist item gets an owner and a date",
      "Sync frequency is agreed during implementation and billed through monthly usage"
    ]
  },
  {
    id: 3, group: "Installation",
    title: "I2 · The installation session",
    time: "3 min video · 4 min read",
    objectives: [
      "Follow the on-premises and API install paths",
      "Know where to verify a connection",
      "Keep an install record"
    ],
    body: `
${implVideo(3, 'Episode 2 · I2 The Installation Session')}
${implGlance('Installation · 2 of 3', 'Yes, live screen-share', '~1 hour', 'A verified connection; customer-approved record counts')}
<h3>Why this meeting exists</h3>
<p>To connect Commercient to the ERP and prove it works.</p>
<h3>What happens</h3>
<p><strong>On-premises (SQL or ODBC):</strong></p>
<ol><li>Registration database step in the registration portal.</li><li>Install the Commercient Sync Agent on the ERP server.</li><li>Configure and test the connection.</li><li>Run the Task Scheduler task and wait for the first run.</li><li>Check the logs: Event Viewer for SQL, the agent's log folder for ODBC.</li></ol>
<p><strong>Cloud (API):</strong></p>
<ol><li>Registration database step, then OAuth approval inside the ERP.</li><li>No Sync Agent. After the call, Level 2 finishes the setup.</li></ol>
<p><strong>Both paths: the record count check.</strong> The installation team checks the record counts for each object, and the customer approves them before the project moves on. Nothing syncs into the CRM yet.</p>
<h3>Your prep hour</h3>
<ul><li>Watch the setup video for the chosen method.</li><li>Confirm the SQL login, ODBC data source or OAuth setup exists.</li><li>Know where the logs live.</li></ul>
<h3>What you walk out with</h3>
<p>A verified connection and your <strong>install record</strong>: method, server, task names, log paths and issues. For API installs, track the Level 2 handoff. Get the record counts approved by the customer.</p>
<div class="callout"><h4>Watch out</h4><p>It isn't done until it's verified and approved: clean logs or Level 2 sign-off, then customer-approved record counts. If the CRM already has data, don't turn on the CRM sync until matching is done.</p></div>`,
    takeaways: [
      "On-premises installs use the Sync Agent; API installs run on Commercient's servers",
      "Every install ends with a record count check the customer approves",
      "Verify before calling it done, and write the install record"
    ]
  },
  {
    id: 4, group: "Installation",
    title: "I3 · Record counts and the handoff",
    time: "3 min video · 3 min read",
    objectives: [
      "Get the record counts approved",
      "Write a specific customization list",
      "Hand the project to the Phase 1 team"
    ],
    body: `
${implVideo(4, 'Episode 3 · I3 Record Counts and the Handoff')}
${implGlance('Installation · 3 of 3', 'Yes', '~45 minutes', 'Approved record counts; the first customization list')}
<h3>Why this meeting exists</h3>
<p>The customer approves the record counts and gets a first look at their ERP data. Capture changes and hand off to Phase 1. It can also open the Phase 1 kickoff.</p>
<h3>What happens</h3>
<ol><li>The customer approves the record counts. Nothing moves forward until they do.</li><li>Check whether the CRM already has data. If it does, the CRM sync stays off until matching is done. If it's empty, a small batch of sample records can go to the CRM.</li><li>Review a few records field by field against the ERP: in Commercient's portal, or in the CRM if sample records went there.</li><li>Capture mapping changes: extra fields, picklists (not synced by default), filters.</li><li>Confirm the sync frequency.</li><li>Book the Phase 1 kickoff.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Check the record counts against what the customer expects.</li><li>Draft a customization list before the meeting.</li></ul>
<h3>What you walk out with</h3>
<p>Approved record counts, the first <strong>customization list</strong>, and your install record handed to the Phase 1 lead.</p>
<div class="callout"><h4>Watch out</h4><p>Existing CRM data means the CRM sync waits for matching; turning it on first creates duplicates. Be specific: each item names the object, the field and an example record. Don't promise changes yet; the Phase 1 team decides what's standard and what's extra scope.</p></div>`,
    takeaways: [
      "The customer approves record counts before anything moves on",
      "If the CRM already has data, the CRM sync waits until matching is done",
      "Customization items name the object, field and an example record",
      "Picklists aren't synced by default"
    ]
  },
  {
    id: 5, group: "Phase 1",
    title: "P1-1 · Layout training and the Phase 1 kickoff",
    time: "3 min video · 4 min read",
    objectives: [
      "Validate the first records and tour the configuration",
      "Read a license for target objects, add-ons and matching",
      "Draft the matching plan"
    ],
    body: `
${implVideo(5, 'Episode 4 · P1-1 Layout Training and the Phase 1 Kickoff')}
${implGlance('Phase 1 · 1 of 5', 'Yes', '~1 hour', 'Validation result, customization list, matching plan')}
<h3>Why this meeting exists</h3>
<p>Phase 1 brings ERP data into the CRM. This kickoff validates the first records, shows the customer their configuration and logs, and captures what to customize and match.</p>
<h3>What happens</h3>
<ol><li>Validate a few records field by field: in Commercient's portal, or in the CRM if it was empty and sample records went there.</li><li>Portal tour: CRM Configuration, the <strong>view</strong> (SQL query) behind each object, and the sync log.</li><li>Decide account ownership.</li><li>Confirm the customization list. History defaults to 6 months.</li><li>Plan matching. The CRM sync stays off until it's done. Then the path to full sync.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Read the license: target object, core or add-on, and whether matching is needed for each item.</li><li>Open two or three records and compare them with the ERP.</li></ul>
<h3>What you walk out with</h3>
<p>A validation write-up, the confirmed customization list, a matching plan, and the ERP's key-field format from Commercient support.</p>
<div class="callout"><h4>Watch out</h4><p>"Existing system" in the license means the CRM already has data, so matching comes first, and the CRM sync stays off until it's done.</p></div>`,
    takeaways: [
      "A view is the SQL query that maps ERP fields to CRM fields",
      "\"Existing system\" in the license means matching is required",
      "Default history is 6 months; ask whether the customer wants more or less"
    ]
  },
  {
    id: 6, group: "Phase 1",
    title: "P1-2 · Data matching",
    time: "3 min video · 4 min read",
    objectives: [
      "Explain why matching comes before the CRM sync",
      "Run matching in the right order",
      "Keep a dedup decision log"
    ],
    body: `
${implVideo(6, 'Episode 5 · P1-2 Data Matching')}
${implGlance('Phase 1 · 2 of 5 (only when the CRM already has data)', 'Yes', '~1 hour', 'Existing CRM records linked to the ERP; CRM sync turned on')}
<h3>Why this meeting exists</h3>
<p>To link records already in the CRM to their ERP records with a <strong>key field</strong> before any ERP data flows into the CRM. <strong>Match first, then turn on the CRM sync.</strong> Turn it on first and it creates duplicates.</p>
<h3>What happens</h3>
<ol><li>Dedup first. <strong>The customer decides</strong> which duplicates survive.</li><li>Set up the matching tool: object, ERP table or view, columns to compare, and the operation (equals first, then contains).</li><li>Read the results: Matched, Duplicate, Unmatched CRM, Unmatched ERP.</li><li>Write keys back, or import what's left by spreadsheet (CRM ID + key).</li><li>Order: accounts, then contacts (usually by email), then products. Spot-check in the CRM.</li><li>Turn on the CRM sync. The first ERP data lands on the matched records. Check a few.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Find the ERP's customer, contact and item tables, and its key format.</li><li>Pull a CRM export to see how messy the data is.</li></ul>
<h3>What you walk out with</h3>
<p>Import files for anything left over, a dedup decision log, and final match counts per object.</p>
<div class="callout"><h4>Watch out</h4><p>Never turn on the CRM sync before matching is done. Check "contains" matches by hand.</p></div>`,
    takeaways: [
      "Match first, then turn on the CRM sync, or it creates duplicates",
      "The customer owns every duplicate decision; log them",
      "Accounts first, then contacts, then products"
    ]
  },
  {
    id: 7, group: "Phase 1",
    title: "P1-3 · The personalization session",
    time: "3 min video · 4 min read",
    objectives: [
      "Use the CRM Configuration switches correctly",
      "Edit a view safely",
      "Sort requests into self-serve vs. Commercient work"
    ],
    body: `
${implVideo(7, 'Episode 6 · P1-3 The Personalization Session')}
${implGlance('Phase 1 · 3 of 5', 'No, internal working session', '~1 hour', 'Updated views, ready for the full sync')}
<h3>Why this meeting exists</h3>
<p>To build the customization list into the sync. You make the self-serve changes hands-on; Commercient's developers handle the rest.</p>
<h3>What happens</h3>
<ol><li>CRM Configuration: keep <strong>Get CRM Records ID</strong> on; leave <strong>Create CRM Fields</strong> off unless you're adding fields.</li><li>Read a view: each line follows <code>table.column AS crm_field_name</code>.</li><li>Make one edit: a field, a WHERE filter, a CASE calculation or a static default.</li><li><strong>Execute before Save.</strong> Then resync with Sync History → Remove Timestamp.</li><li>Sort the rest into self-serve or Commercient, and check scope.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Draft the SQL change for one requirement.</li><li>Look up the CRM internal (API) names for new fields.</li></ul>
<h3>What you walk out with</h3>
<p>Updated, tested views; remaining self-serve items to finish; developer requests logged.</p>
<div class="callout"><h4>Watch out</h4><p>Use internal names, not labels, after AS. And check scope before promising: some changes need a license update or voucher.</p></div>`,
    takeaways: [
      "Execute before Save, every time",
      "The name after AS is the CRM field's internal (API) name",
      "Remove Timestamp resends records on the next run"
    ]
  },
  {
    id: 8, group: "Phase 1",
    title: "P1-4 · Full sync and user testing",
    time: "3 min video · 3 min read",
    objectives: [
      "Run a readiness check and get an explicit green light",
      "Lead user testing with a checklist",
      "Route issues to the right owner"
    ],
    body: `
${implVideo(8, 'Episode 7 · P1-4 Full Sync and User Testing')}
${implGlance('Phase 1 · 4 of 5', 'Yes', '~45 minutes', "The customer's sign-off on the data")}
<h3>Why this meeting exists</h3>
<p>To get the green light, run the full sync (every licensed object and record, with history), and have the customer's users check the data.</p>
<h3>What happens</h3>
<ol><li>Readiness check: matching and personalization done; data-volume estimate.</li><li>Explicit green light, then the full sync.</li><li>Dashboard: Clone Sync, CRM Sync, Execution History.</li><li>User testing: records in both systems, values match, no duplicates, related records under the right parent, edge cases, manual create and update.</li><li>Issue log with an owner per issue.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Get the data-volume estimate.</li><li>Build a user-testing checklist from the customer's own accounts.</li></ul>
<h3>What you walk out with</h3>
<p>The customer's sign-off. Route each issue: ERP data to the customer, CRM rules to the CRM admin or partner, views to the configurator.</p>
<div class="callout"><h4>Watch out</h4><p>Check related records, not just the top level. A company can look right while its contacts sit under the wrong one.</p></div>`,
    takeaways: [
      "No full sync without an explicit green light",
      "Test related records, not just top-level ones",
      "Many \"sync problems\" are really ERP data or CRM rules"
    ]
  },
  {
    id: 9, group: "Phase 1",
    title: "P1-5 · Delivery and handover",
    time: "3 min video · 4 min read",
    objectives: [
      "Read a sync log error",
      "Choose between Remove Timestamp and Remove Record",
      "Set the customer up to monitor their own sync"
    ],
    body: `
${implVideo(9, 'Episode 8 · P1-5 Delivery and Handover')}
${implGlance('Phase 1 · 5 of 5', 'Yes', '~45 minutes', 'Monitoring set up; Phase 1 delivered')}
<h3>Why this meeting exists</h3>
<p>To close Phase 1 and leave the customer able to watch their own sync, then move to Phase 2 if it's licensed.</p>
<h3>What happens</h3>
<ol><li>Read a sync log error: process, object, record key, CRM message.</li><li>Sync History: <strong>Remove Timestamp</strong> resends a record (the usual fix); <strong>Remove Record</strong> is a hard reset for "invalid reference" errors.</li><li>Common errors: duplicate rule, restricted picklist, blank mandatory field, insufficient access after a hard delete, inactive owner.</li><li>Who fixes what; error alerts and the daily summary, requested through support.</li><li>Delivery confirmation and Phase 2 readiness.</li></ol>
<h3>Your prep hour</h3>
<ul><li>List the notifications the customer wants and who should get each one.</li></ul>
<h3>What you walk out with</h3>
<p>A handover note, the notification request, and your lessons learned: which steps you could lead next time.</p>
<div class="callout"><h4>Watch out</h4><p>Most requests after go-live are CRM-side changes. That ongoing work is often yours.</p></div>`,
    takeaways: [
      "Every sync log error has four parts: process, object, record key, CRM message",
      "Reach for Remove Timestamp before Remove Record",
      "Name an owner for alerts so someone actually reads them"
    ]
  },
  {
    id: 10, group: "Phase 2",
    title: "P2-1 · The Phase 2 kickoff",
    time: "3 min video · 4 min read",
    objectives: [
      "Explain how a record is triggered in Phase 2",
      "Build the license review table",
      "Flag the Export New vs. Update gap early"
    ],
    body: `
${implVideo(10, 'Episode 9 · P2-1 The Phase 2 Kickoff')}
${implGlance('Phase 2 · 1 of 6', 'Yes', '~1 hour', 'The license review table')}
<h3>Why this meeting exists</h3>
<p>Phase 2 sends CRM records back into the ERP. A user ticks <strong>Commercient Import</strong> on a record; the next sync run creates it in the ERP; <strong>Commercient Completed</strong> and <strong>Commercient Message</strong> report the result. This kickoff confirms what gets built and sets the 2–10 week timeline.</p>
<p><strong>Phase 2 doesn't have to wait for Phase 1 to finish.</strong> Once the first sync is verified and working, it can run alongside Phase 1, if it's licensed and the customer agrees.</p>
<h3>What happens</h3>
<ol><li>How a record gets triggered.</li><li><strong>License review table:</strong> each process, its ERP object, CRM object and extra filters.</li><li>Processes on hold, confirmed in writing.</li><li>Templates vs. custom mapping; mirroring Phase 1 to avoid circular sync.</li><li>Next steps: configuration, internal testing (test records agreed), UAT document, live demo.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Draft the license review table.</li><li>List objects that depend on existing ERP records. These depend on matching.</li></ul>
<h3>What you walk out with</h3>
<p>A final license table, on-hold items logged, the test-record approach agreed, and expectation gaps flagged.</p>
<div class="callout"><h4>Watch out</h4><p>"Export New" processes create records; they don't update them later. Say so now if the customer expects updates.</p></div>`,
    takeaways: [
      "Phase 2 is triggered by the Commercient Import checkbox",
      "The license review table defines every process",
      "Export New creates records; it doesn't update them"
    ]
  },
  {
    id: 11, group: "Phase 2",
    title: "P2-2 · Queries and process creation",
    time: "3 min video · 3 min read",
    objectives: [
      "Write a CRM query that follows the two rules",
      "Create a process with the right DLL",
      "Protect the ERP with safe test filters"
    ],
    body: `
${implVideo(11, 'Episode 10 · P2-2 Queries and Process Creation')}
${implGlance('Phase 2 · 2 of 6', 'No, internal working session', '~1 hour', 'Processes created, with safe test filters')}
<h3>Why this meeting exists</h3>
<p>To turn each row of the license table into a process: a <strong>query</strong> (which CRM records and fields) plus a <strong>DLL</strong> (the ERP operation, such as "create new customer").</p>
<h3>What happens</h3>
<ol><li>Query rules: the record ID goes first; the Commercient fields stay out.</li><li>Syntax by CRM: HubSpot is a field list plus the object name; Salesforce is SOQL; Dynamics is FetchXML.</li><li>Create the process and choose the DLL. The DLL decides which ERP fields you can map.</li><li>Add a safe test filter: never true, or a single test record ID.</li><li>HubSpot: enable with the safe filter and wait one sync run so the Commercient fields exist before loading fields.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Look up the internal (API) names for every field you need.</li><li>Draft one query.</li></ul>
<h3>What you walk out with</h3>
<p>Processes created with safe filters; queries for the rest; the DLL noted for each process.</p>
<div class="callout"><h4>Watch out</h4><p>Never enable a process without a safe filter. A live process sends every qualifying record on the next run.</p></div>`,
    takeaways: [
      "ID first; Commercient fields out of the query",
      "The DLL decides which ERP fields are available to map",
      "No process goes live without a safe test filter"
    ]
  },
  {
    id: 12, group: "Phase 2",
    title: "P2-3 · Mapping and result mapping",
    time: "3 min video · 3 min read",
    objectives: [
      "Map CRM fields to ERP fields three ways",
      "Set up result mapping in the Phase 1 key format",
      "Check file mapping"
    ],
    body: `
${implVideo(12, 'Episode 11 · P2-3 Mapping and Result Mapping')}
${implGlance('Phase 2 · 3 of 6', 'No, internal working session', '~1 hour', 'Mapped processes, ready to test')}
<h3>Why this meeting exists</h3>
<p>To map the fields so each process knows which CRM field fills which ERP field, then set up result mapping so Phase 1 doesn't create duplicates.</p>
<h3>What happens</h3>
<ol><li>Process mapping. Keys are case-sensitive.</li><li>Three ways to build it: <strong>Path A</strong> from scratch, <strong>Path B</strong> a template, <strong>Path C</strong> mirror the Phase 1 view.</li><li><strong>Result mapping:</strong> write the new ERP ID back to the CRM record in exactly the Phase 1 key format, so Phase 1 updates that record instead of creating a second one.</li><li>File mapping: set once per sync instance.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Get the Phase 1 view and its key format.</li><li>Draft a mapping table: each required ERP field and the CRM field that fills it.</li></ul>
<h3>What you walk out with</h3>
<p>Finished mappings and the process-mapping help document.</p>
<div class="callout"><h4>Watch out</h4><p>One character off in the key format and Phase 1 creates a duplicate on its next run.</p></div>`,
    takeaways: [
      "Path A from scratch, Path B a template, Path C mirror Phase 1",
      "Result mapping must copy the Phase 1 key format exactly",
      "Every required ERP field needs a source"
    ]
  },
  {
    id: 13, group: "Phase 2",
    title: "P2-4 · Internal testing",
    time: "3 min video · 4 min read",
    objectives: [
      "Test one record and check it in three places",
      "Read the six log statuses",
      "Know when to reset and when to re-flag"
    ],
    body: `
${implVideo(13, 'Episode 12 · P2-4 Internal Testing')}
${implGlance('Phase 2 · 4 of 6', 'No, internal', '~45 minutes', 'Test evidence + the UAT document')}
<h3>Why this meeting exists</h3>
<p>To prove each process works, one test record at a time, without polluting real ERP data.</p>
<h3>What happens</h3>
<ol><li>Environment check: test or production ERP, sandbox or live CRM.</li><li>Turn on Download DLL and Text Log; enable processes with single-record filters.</li><li>Flag a test record and check three places: the CRM fields, the ERP record, the Logs status.</li><li>Statuses: <strong>Awaiting</strong>, <strong>Ready</strong>, <strong>Created</strong>, <strong>Success</strong>, <strong>Failed</strong>, <strong>Hold</strong> (contact support).</li><li>Work one failure: <strong>Reset</strong> retries the queued data; if you changed the CRM record, <strong>re-flag</strong> it instead.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Write the single-record filter for each process.</li><li>Draft a test-record plan.</li></ul>
<h3>What you walk out with</h3>
<p>Test evidence for every process, a draft UAT document, and escalations logged: Hold, "DLL not found", missing return values.</p>
<div class="callout"><h4>Watch out</h4><p>Never test against a production ERP without the customer's agreement. A green log with a wrong ERP record is still a failure.</p></div>`,
    takeaways: [
      "Check the CRM, the ERP and the Logs for every test",
      "Hold means contact Commercient support",
      "Reset retries queued data; re-flag picks up CRM changes"
    ]
  },
  {
    id: 14, group: "Phase 2",
    title: "P2-5 · The live demo and initial sign-off",
    time: "3 min video · 3 min read",
    objectives: [
      "Run a live Phase 2 demo",
      "Train the customer on their panel",
      "Start the customer testing window"
    ],
    body: `
${implVideo(14, 'Episode 13 · P2-5 The Live Demo and Initial Sign-off')}
${implGlance('Phase 2 · 5 of 6', 'Yes', '~45 minutes', 'Initial sign-off; a 2–3 week testing window')}
<h3>Why this meeting exists</h3>
<p>To show the customer the processes working live, train them on the customer panel, and open their testing window. Commercient sends the initial sign-off afterward.</p>
<h3>What happens</h3>
<ol><li>Recap the trigger: Commercient Import, Completed, Message.</li><li>Walk the processes against the license review table.</li><li>Live test: a customer user flags a record and everyone watches it reach the ERP.</li><li>Customer panel training: mappings and logs.</li><li>The 2–3 week customer testing window starts.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Draft the demo script.</li><li>Line up ERP and CRM access for the call.</li><li>Rehearse the panel tour.</li></ul>
<h3>What you walk out with</h3>
<p>Initial sign-off sent and the window's end date on everyone's calendar. Track personalization requests during the window.</p>
<div class="callout"><h4>Watch out</h4><p>Rehearse, and have access ready in both systems. A live demo is the customer's strongest impression of Phase 2.</p></div>`,
    takeaways: [
      "The live test is the payoff: a real record, flagged and delivered",
      "Train the customer to read their own mappings and logs",
      "Make the testing window's end date explicit"
    ]
  },
  {
    id: 15, group: "Phase 2",
    title: "P2-6 · Final sign-off",
    time: "3 min video · 3 min read",
    objectives: [
      "Sort requests into in-scope and add-on",
      "Get explicit confirmation from the customer",
      "Close the project and capture lessons learned"
    ],
    body: `
${implVideo(15, 'Episode 14 · P2-6 Final Sign-off')}
${implGlance('Phase 2 · 6 of 6', 'Yes, or by email', '~30 minutes', 'Project closed')}
<h3>Why this meeting exists</h3>
<p>To confirm the customer is satisfied and close the original scope. After final sign-off, changes are billable.</p>
<h3>What happens</h3>
<ol><li>Review the personalization done during the testing window.</li><li>Get clear, explicit confirmation.</li><li>Explain the change-request policy.</li><li>Commercient sends the final sign-off, which also marks final delivery if Phase 1 was part of the project.</li></ol>
<h3>Your prep hour</h3>
<ul><li>Sort every request from the window into <strong>in scope</strong> or <strong>add-on and chargeable</strong>.</li></ul>
<h3>What you walk out with</h3>
<p>A closed project, your lessons learned, and the skills gaps you noticed. On your next customer, you lead.</p>
<div class="callout"><h4>Watch out</h4><p>Get confirmation, not silence. A clear yes closes the scope.</p></div>`,
    takeaways: [
      "Sort requests before the meeting, not during it",
      "After final sign-off, changes are chargeable",
      "Next project, you lead"
    ]
  }
];

const IMPLEMENTATION_CHECKS = {
  1:  { q: "On your first partner-led project (Customer 1), what's your role?",
        a: ["You run every meeting while Commercient observes and grades your work",
            "You shadow: Commercient runs each meeting while you prepare and take on small pieces",
            "You handle only the installation stage and hand off Phase 1 and Phase 2",
            "You review recordings after the project instead of attending the meetings"], c: 1 },
  2:  { q: "Which connection method fits an ERP whose data lives in SQL Server 2008 or newer?",
        a: ["SQL Sync, using a dedicated SQL login and the Sync Agent",
            "ODBC Sync, which always requires a separate voucher",
            "API with Zoho Vault, since SQL Server has no OAuth support",
            "A nightly CSV export the partner uploads by hand"], c: 0 },
  3:  { q: "For a cloud ERP connected by API, what happens after the OAuth approval?",
        a: ["The customer installs the Sync Agent on a Windows server",
            "The full sync starts immediately with all licensed objects",
            "Level 2 finishes configuring access, then Support confirms record counts",
            "The partner emails the ERP admin password to Commercient support"], c: 2 },
  4:  { q: "What makes a customization list item useful to the Phase 1 team?",
        a: ["It describes the overall feel of the CRM after the sync",
            "It promises the customer a delivery date for each change",
            "It's written in SQL so the team can paste it straight in",
            "It names the object, the field and an example record"], c: 3 },
  5:  { q: "A license lists the CRM as an \"existing system.\" What does that tell you?",
        a: ["The CRM already has data, so matching comes before the CRM sync",
            "The customer is keeping an older CRM alongside the new one",
            "The CRM is on-premises, so it needs the Sync Agent",
            "No customization is allowed for that CRM"], c: 0 },
  6:  { q: "Why must data matching finish before the CRM sync is turned on?",
        a: ["The full sync uses matching results to estimate the data volume",
            "Otherwise the sync can't recognize existing CRM records and creates duplicates",
            "The license only activates once matching counts are submitted",
            "Matching sets the sync frequency the customer agreed to"], c: 1 },
  7:  { q: "You've edited a view. What's the right next move?",
        a: ["Save it, then execute it on the next sync run",
            "Turn on Create CRM Fields so the edit applies",
            "Execute it first, save only when it runs clean, then resync with Remove Timestamp",
            "Use Remove Record so every record reloads with the change"], c: 2 },
  8:  { q: "During user testing, a contact sits under the wrong company because of an old ERP duplicate. Who owns the fix?",
        a: ["The configurator, by editing the contact view",
            "Commercient support, through a voucher",
            "The CRM admin, by changing a duplicate rule",
            "The customer, because it's ERP data"], c: 3 },
  9:  { q: "When should you reach for Remove Record instead of Remove Timestamp?",
        a: ["For \"invalid reference\" errors, since it's a hard reset",
            "Whenever a record needs to sync again on the next run",
            "After every view edit during personalization",
            "When a customer asks for a new alert"], c: 0 },
  10: { q: "How does a record get sent from the CRM to the ERP in Phase 2?",
        a: ["Every new CRM record syncs automatically on the next run",
            "A user ticks Commercient Import on the record, and the next run picks it up",
            "The partner exports qualifying records to a CSV each week",
            "Commercient support pushes records on request"], c: 1 },
  11: { q: "What protects the ERP before a new process is switched on?",
        a: ["Leaving the query empty until the demo",
            "Turning off result mapping",
            "A safe test filter: one that's never true, or a single test record ID",
            "Putting the Commercient fields in the WHERE clause"], c: 2 },
  12: { q: "Why must result mapping copy the Phase 1 key format exactly?",
        a: ["Because HubSpot only accepts uppercase keys",
            "So the DLL can locate the ERP server",
            "Because the quiz grader checks the key format",
            "So Phase 1 recognizes the record and updates it instead of creating a duplicate"], c: 3 },
  13: { q: "A test record failed and you corrected the CRM record. How do you retry it?",
        a: ["Re-flag the record so the corrected data is picked up",
            "Reset the log row, which retries the corrected data",
            "Delete the process and build it again",
            "Wait for the status to change to Hold"], c: 0 },
  14: { q: "What starts after the live demo and initial sign-off?",
        a: ["The full Phase 1 sync",
            "A 2–3 week customer testing window",
            "A new installation session",
            "Billing for every change request"], c: 1 },
  15: { q: "A customer asks for a brand-new process after final sign-off. How is it handled?",
        a: ["It's added free as part of the original scope",
            "It's ignored until the next contract renewal",
            "It's handled as an add-on, scoped and charged separately",
            "The partner builds it without telling Commercient"], c: 2 }
};
IMPLEMENTATION_MODULES.forEach(m => { m.check = IMPLEMENTATION_CHECKS[m.id]; });

// Answer key lives ONLY in supabase/upgrade-007.sql / the quiz_keys table.
const IMPLEMENTATION_QUIZ = {
  passMark: 0.8,
  sections: ["Installation", "Phase 1", "Phase 2"],
  questions: [
    { s:0, q:"Which connection method fits ERP data stored in SQL Server 2008 or newer?",
      a:["ODBC Sync, bought with a separate ODBC voucher",
         "SQL Sync, with a dedicated SQL login and the Sync Agent",
         "API, with credentials shared through Zoho Vault",
         "A scheduled CSV export uploaded by the partner"] },
    { s:0, q:"How is sync frequency set for a new customer?",
      a:["It's fixed in the contract and can't change later",
         "The partner picks it alone after go-live",
         "It's agreed during implementation, and the cost rolls into monthly usage",
         "Every customer syncs exactly once a day"] },
    { s:0, q:"For a cloud ERP connected by API, what happens after OAuth approval?",
      a:["Level 2 finishes configuring access, then Support confirms record counts",
         "The customer installs the Sync Agent on their ERP server",
         "The customer emails the ERP password to support",
         "The full sync starts immediately"] },
    { s:0, q:"What is the most common reason installation sessions stall?",
      a:["The CRM has too many custom fields",
         "The customer chose the API method",
         "The partner skipped the record count review",
         "An incomplete requirements checklist from discovery"] },
    { s:1, q:"Why must data matching finish before the CRM sync is turned on?",
      a:["Matching speeds up the Sync Agent",
         "Otherwise the sync can't recognize existing CRM records and creates duplicates",
         "The license requires matching counts for billing",
         "Matching is needed to install the Sync Agent"] },
    { s:1, q:"During matching, who decides which duplicate record survives?",
      a:["Commercient's data matching team",
         "The partner POC",
         "The customer",
         "The matching tool, automatically"] },
    { s:1, q:"What's the rule when you edit a view?",
      a:["Execute before Save",
         "Save before Execute",
         "Always turn on Create CRM Fields first",
         "Use Remove Record after every edit"] },
    { s:1, q:"In user testing, a contact sits under the wrong company because of an old ERP duplicate. Who owns the fix?",
      a:["The configurator",
         "Commercient support",
         "The CRM admin",
         "The customer, because it's ERP data"] },
    { s:2, q:"How is a record sent from the CRM to the ERP in Phase 2?",
      a:["Every new CRM record syncs automatically",
         "A user ticks Commercient Import on the CRM record",
         "The partner exports a CSV each week",
         "Commercient support pushes it manually"] },
    { s:2, q:"What does an \"Export New\" process do?",
      a:["Creates new records in the ERP; it doesn't update them later",
         "Updates existing ERP records whenever the CRM changes",
         "Exports the full ERP database to the CRM",
         "Deletes ERP records that no longer exist in the CRM"] },
    { s:2, q:"Why must result mapping copy the Phase 1 key format exactly?",
      a:["So the certification quiz passes",
         "Because HubSpot requires uppercase keys",
         "So Phase 1 recognizes the record and updates it instead of creating a duplicate",
         "So the DLL can find the ERP server"] },
    { s:2, q:"A test record failed and you fixed the CRM record. What do you do next?",
      a:["Reset the log row, which retries the already-queued data",
         "Re-flag the record so the corrected CRM data is picked up",
         "Delete the process and rebuild it",
         "Wait for the Hold status to clear"] }
  ]
};

const IMPLEMENTATION_COURSE = {
  id: "implementation",
  status: "available",
  title: "Commercient Implementation Training and Roadmap",
  tagline: "Every meeting of a Commercient project, in order: a short video and outline for each, so you walk in prepared and leave knowing what comes next.",
  audience: "Implementation partners and their delivery teams",
  estTime: "~2 hours",
  icon: "assets/commercient-icon.png",
  badge: {
    name: "Commercient Implementation Certified",
    blurb: "Trained on the full Commercient implementation roadmap: installation, Phase 1 and Phase 2, meeting by meeting.",
    img: "assets/badge-implementation.png"   // drop the PNG in assets/ and it lights up; CSS disc fallback until then
  },
  skills: ["Systems Integration", "ERP", "CRM", "Data Migration", "Project Management"],
  payoff: "Learn the roadmap once and you can run Commercient implementations for your own clients: shadow your first project, lead your second, run your third.",
  payoffShort: "Shadow one project, lead the next, run the third.",
  brag: "I'm trained on the Commercient Implementation Roadmap, from installation through Phase 1 and Phase 2.",
  groups: [
    { name: "Start Here", modules: [1] },
    { name: "Installation", modules: [2, 3, 4] },
    { name: "Phase 1", modules: [5, 6, 7, 8, 9] },
    { name: "Phase 2", modules: [10, 11, 12, 13, 14, 15, "quiz"] }
  ],
  roadmap: [
    { step: 1, title: "Start here", desc: "The three-customer ramp, the 14-meeting roadmap and your prep hour." },
    { step: 2, title: "Installation", desc: "Discovery, the installation session, record counts and the handoff." },
    { step: 3, title: "Phase 1", desc: "Kickoff, data matching, personalization, full sync and delivery." },
    { step: 4, title: "Phase 2", desc: "Kickoff, queries, mapping, testing, the live demo and final sign-off." },
    { step: 5, title: "Get certified", desc: "Pass the quiz and earn the Commercient Implementation Certified badge." }
  ],
  learn: [
    "Run installation discovery and choose the right connection method.",
    "Follow the on-premises and API installation paths and verify a connection.",
    "Validate records, plan and run data matching, and personalize views safely.",
    "Lead a full sync, user testing and Phase 1 handover.",
    "Scope, build, test and demo Phase 2 processes without creating duplicates.",
    "Prepare for every meeting in about an hour."
  ],
  modules: IMPLEMENTATION_MODULES,
  quiz: IMPLEMENTATION_QUIZ
};

