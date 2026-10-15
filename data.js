/* Commercient Academy — course content
   Source: Commercient_Partner_Academy_Source (Google Drive)
   Structure: ACADEMY (umbrella identity) + COURSES (catalog) defined at the
   bottom of this file, referencing the MODULES and QUIZ that follow. */

const ACADEMY = {
  name: "Commercient Academy",
  // Goal-first framing: lead with the payoff, not the curriculum.
  headline: "Learn Commercient AI. Get certified. Get paid to deploy it.",
  intro: "Commercient Academy turns the Commercient platform into a skill you can earn from. Start free, get certified, and walk away able to deploy, sell, and speak with authority about Commercient AI — whoever you are.",
  // "Who is this for?" — shown first, before any curriculum.
  // `icon` = name from the ICONS set in app.js (SVG, brand-colored — no emoji).
  audiences: [
    { icon: "handshake", title: "Partners & resellers", desc: "Add a high-margin AI line to what you already sell." },
    { icon: "building", title: "Customers & admins", desc: "Get more out of the apps your business already runs." },
    { icon: "compass", title: "Consultants", desc: "Bill for setups you can finish in hours, not weeks." },
    { icon: "code", title: "Developers", desc: "Learn the platform, agents, and APIs hands-on." },
    { icon: "gradcap", title: "Students & newcomers", desc: "Break into Commercient AI with a credential to show." }
  ],
  // Money-motivation copy woven through the catalog and course pages.
  payoff: {
    title: "Why people take these courses",
    body: "Every certification here points at the same outcome: revenue. Partners bill customers for web-agent setups and add a recurring AI line. Consultants turn a 10-hour skill into 20–30 billable deployments. Customers unlock capacity without new headcount. Get certified once, then get paid for it again and again."
  }
};

const MODULES = [
  {
    "id": 1,
    "group": "The Platform",
    "title": "The Commercient Platform: three connected pieces",
    "time": "4 min",
    "objectives": [
      "Describe the Commercient Platform and its three connected pieces",
      "Explain how the Data Lake is the always-current center the other pieces connect to",
      "Explain the expansion motion and why an already-connected customer is the moat"
    ],
    "body": "<p>Commercient is a platform, not a single product. Under the platform umbrella sit three connected pieces — the Commercient AI Platform, the Commercient Data Lake, and Commercient Data Integration — that together give a customer one always-current view of their business.</p><h3>The three pieces</h3><ul><li>Commercient AI Platform — agent hosting and cloud platform, the AI tools / API / webhook platform, and an AI knowledge base, configured in the Commercient AI Portal and connected to a customer's agents through the AI Platform External MCP Server.</li><li>Commercient Data Lake — a Data Lake hosting and cloud platform with Data Lake API entity management, configured in the Commercient Portal's Data Lake configuration, and opened to a customer's agents through the Data Lake External MCP Server.</li><li>Commercient Data Integration — the movement layer. It moves data with the CDC Replicator (the Commercient Universal Data Connector), the Enterprise System Transactional Integrator, the Enterprise CRM Integrator, and the Point-to-Point Pulse Integrator.</li></ul><h3>One always-current view</h3><p>The Data Lake is the center. Data Integration pulls from the customer's systems on a schedule and lands the data in the Data Lake with correct column types. From there, three surfaces serve the data out — APIs, AI agents (through MCP), and real-time events — every one behind the same security gate. The AI Platform hosts the agents that reason over that data. So the pieces aren't three products bolted together; they're one loop: integration moves data in, the lake governs and keeps it current, and the AI Platform and the other surfaces put it to work.</p><h3>The expansion motion and the moat</h3><p>Because everything reads and writes the same lake, the hard part — connecting and coalescing the data — is done once. A customer who is already connected has the foundation for every other surface with no re-integration work. That's the moat. The conversation that used to be \"let's get them integrated\" is now \"let's get them on the Commercient Platform.\" Once they're on it, the same conversation continues into the Data Lake, AI, and automation — same customer, multiple expansions, same data layer. Each expansion is faster than the last.</p>",
    "takeaways": [
      "The Commercient Platform has three connected pieces: the AI Platform, the Data Lake, and Data Integration.",
      "The Data Lake is the always-current center; Data Integration moves data in and out; the AI Platform and the other surfaces put it to work.",
      "A connected customer already has the foundation for every other piece — no re-integration required. That's the expansion story and the moat."
    ]
  },
  {
    "id": 2,
    "group": "The Platform",
    "title": "Commercient Data Integration",
    "time": "6 min",
    "objectives": [
      "Name the four integrators and what each one moves",
      "Describe how a source connects (connection methods and the on-premise agent)",
      "Explain, at a working level, Change Data Capture and its net-change, hypersync, and self-healing features"
    ],
    "body": "<p>Every piece of the platform depends on getting data out of a customer's systems reliably and keeping it current. Commercient Data Integration is the movement layer that does it. You don't need to be an engineer to sell it, but knowing how data moves helps you scope deals and set accurate expectations.</p><h3>The four integrators</h3><p>Data Integration moves data with four integrators, each pointed in a specific direction:</p><ul><li>CDC Replicator (Commercient Universal Data Connector) — replicates data INTO the Data Lake from multiple sources using the Universal Data Connector: ODBC, SQL, CSV, SFTP, REST, SOAP, and API. This is the inbound integrator.</li><li>Enterprise System Transactional Integrator — writes data FROM the Data Lake INTO enterprise systems such as SAP, Sage, Epicor, NetSuite, Microsoft Dynamics, and Infor.</li><li>Enterprise CRM Integrator — writes data FROM the Data Lake INTO CRM and eCommerce systems such as Salesforce, HubSpot, Zoho, Microsoft, Adobe Commerce, Magento, Shopify, and BigCommerce.</li><li>Point-to-Point Pulse Integrator — pushes data FROM the Data Lake into thousands of REST API endpoints and webhooks.</li></ul><p>The pattern: one integrator brings data in (CDC Replicator), and three push data back out — to enterprise systems, to CRM/eCommerce, and to REST endpoints. (Third-party API licenses may be required for some connections.) The catalog of pre-built connectors still covers 200+ ERPs and the major CRM, eCommerce, and business systems.</p><h3>The connection methods</h3><p>The CDC Replicator reaches a source through one of several methods. You don't configure these yourself, but recognizing them helps you gather the right information early:</p><ul><li>API — for cloud systems exposing REST, SOAP, or SDK access. Needs the base URL, endpoints, and credentials.</li><li>ODBC — common for on-premise ERPs and databases. IT installs the correct 32-bit ODBC driver, creates a 32-bit System DSN, and confirms read access.</li><li>SQL — a direct read-only connection to a supported database.</li><li>CSV / SFTP / structured files — clean, consistently formatted files in a stable location, read as tables.</li></ul><p>The Universal Data Connector normalizes whatever it reads into a consistent SQL-like model and uses source sampling to help build the profile — which is how \"that system isn't a standard connector\" often still becomes a supported project.</p><h3>Reaching inside the network — the on-premise agent</h3><p>When a connection needs to reach a source inside the customer's network, Commercient installs a small program on a customer-controlled Windows machine. It needs administrator rights, .NET Framework 4.8, and outbound HTTPS on port 443 to Commercient — plus network access to the source. Machine sizing is modest. The agent pushes data outbound on a schedule, so the customer never has to open their firewall to inbound traffic. For a database nobody is allowed to touch — an old on-premise ERP, or an Oracle, MySQL, or Access database on a closed network — the ODBC Agent drops in next to the source and pushes data outbound the same way. Suddenly a 20-year-old system gains modern APIs, AI access, and real-time events. That's a powerful opener for customers who assume their legacy data is stranded.</p><h3>Change Data Capture</h3><p>After the first full load, the CDC Replicator uses Change Data Capture to sync only what changed — records inserted, updated, or (where supported) deleted since the last successful run — instead of reprocessing everything. CDC reduces load on the source, shortens sync windows, and keeps the Data Lake close to current. The Commercient CDC Replicator adds three capabilities worth knowing:</p><ul><li>Net-change calculation — it computes exactly what changed and moves only that.</li><li>Automatic GPU hypersync scaling — it scales compute up automatically to move large change sets fast, then back down.</li><li>Data-sync healing — it detects and self-corrects sync gaps so the destination stays reliable.</li></ul><p>The available approach depends on what the source supports: timestamp-based (created/modified dates), key or version-based, database-level (logs, triggers, change tables), API-based (updated-since parameters, webhooks), or file-based. Where a source exposes no true CDC, the sync uses scheduled polling, timestamp filters, or selective full refreshes.</p><p>Scoping tip: the earlier you learn how a source is reached — API, ODBC, SQL, or file — and whether it has a reliable modified-date field for CDC, the more accurately you can set expectations on effort and timeline.</p>",
    "takeaways": [
      "Data Integration moves data with four integrators: the CDC Replicator brings data into the lake; the Enterprise System, Enterprise CRM, and Point-to-Point Pulse Integrators push it back out.",
      "The Universal Data Connector gives codeless connectivity (ODBC, SQL, CSV, SFTP, REST, SOAP, API) and normalizes sources into one SQL-like model; the on-premise and ODBC agents push data outbound with no inbound firewall opening.",
      "CDC syncs only what changed, with net-change calculation, automatic GPU hypersync scaling, and data-sync healing."
    ]
  },
  {
    "id": 3,
    "group": "The Platform",
    "title": "The Commercient Data Lake",
    "time": "5 min",
    "objectives": [
      "Explain what the Data Lake is and why customers choose it",
      "Describe the three surfaces the Data Lake serves data through, and the one security gate",
      "Recognize the use cases well enough to open the conversation"
    ],
    "body": "<p>A customer's story is usually scattered across Salesforce, HubSpot, Stripe, an ERP, and databases nobody is allowed to touch. The Commercient Data Lake brings it all into one always-current, isolated database per customer — joinable, current, and correctly typed — then opens it up to everything modern. Store it all, use it all: structured, semi-structured, and unstructured data land in one governed place.</p><h3>What feeds the lake</h3><ul><li>Salesforce, HubSpot, and Stripe — connect with a key; every object the credentials can read syncs automatically through the Enterprise CRM Integrator.</li><li>Enterprise systems — SAP, Sage, Epicor, Dynamics, and the 200+ ERPs flow in through the Enterprise System Transactional Integrator and the catalog connectors.</li><li>Any ERP or database — drop the ODBC Agent next to a SQL or ODBC source and the CDC Replicator (UDC) pushes data outbound with no firewall opening.</li></ul><p>Sources are auto-discovered, correctly typed, and kept current incrementally through CDC. The customer chooses the tables, the columns, the history cutoff, and the schedule per source.</p><h3>How it works — connectors in, three surfaces out</h3><p>Connectors pull from the customer's systems on a schedule. Data lands in the Data Lake with correct column types. Then three surfaces serve it out — and every one passes through the same security gate:</p><ul><li>REST &amp; GraphQL APIs — read, write, join, and aggregate over the data you expose, with full create/read/update/delete, collision protection, and audit stamps.</li><li>AI agents (MCP) — the AI Platform and Data Lake External MCP Servers connect Claude or any AI agent to the live data so it can query, aggregate, and act.</li><li>Real-time events — row changes stream to applications instantly, fire webhooks, or feed the Point-to-Point Pulse Integrator — the foundation for live dashboards and event-driven automation.</li></ul><p>And the data doesn't only flow out to read. The integrators write changes back — into ERPs (Enterprise System Transactional Integrator), into CRM/eCommerce (Enterprise CRM Integrator), and into REST endpoints (Point-to-Point Pulse Integrator). That round trip is what makes the lake a switchboard between systems: a quote created in a portal lands as an order in the ERP; a new order syncing in triggers automation that notifies fulfillment and opens a ticket.</p><h3>The security gate</h3><p>Every surface — APIs, AI tools, event streams — passes the same layered gate. Nothing is public by default: the customer chooses which tables, down to individual columns, appear at all. Every application and AI agent gets its own scoped key, limited to specific entities, actions, and even fields; revoke a key and every session it opened dies instantly. Row-level security inside the database trims results to the rows each caller may see, and no application code can route around it. Data is encrypted in transit and at rest, every write is stamped with who and when, and raw SQL access requires admin rights plus two-factor authentication.</p><div class=\"callout\"><p>The practical upshot: you can hand an AI agent, a contractor, or a customer-facing app a key that reads one entity, three fields, only their own rows — and nothing else.</p></div><h3>What customers build on it</h3><ul><li>Customer 360 — CRM, marketing, payments, and order history for every account in one joined view, minutes fresh.</li><li>An AI assistant that knows the business — ask in plain English, \"which customers are overdue, and what did they last order?\" and get answers from live data.</li><li>A self-service customer portal — customers see only their own orders, invoices, and tickets, enforced by row-level security in the database itself.</li><li>An agent that gets things done — it updates a record, logs an interaction, or creates a return, and the change is written back into the ERP.</li><li>Live operations dashboards — orders, payments, and stock changes appear the moment they land, no refresh button.</li><li>Event-driven automation — a new record fires a webhook that starts fulfillment, opens a ticket, and notifies the rep, automatically.</li><li>Unlocking a locked-up legacy system — drop the agent next to it and a closed system gains modern APIs, AI access, and real-time events.</li><li>Revenue reconciliation — Stripe payments beside ERP invoices in one database, reconciled with a saved view and exported for auditors.</li></ul><h3>Why this matters</h3><p>The Data Lake is why getting a customer connected is strategic rather than tactical. Once the data is in the lake, every other surface — custom APIs and portals, AI agents, real-time dashboards, automation — is available without re-integrating anything. It's also the concrete answer for customers who say their data is stuck in a legacy system, who want to \"put AI on our data,\" or who need a portal, live dashboards, or reconciliation. Those are all Data Lake conversations.</p>",
    "takeaways": [
      "The Data Lake is one governed, always-current database per customer, fed by the CRM connectors, enterprise systems, and the ODBC Agent through the CDC Replicator.",
      "It serves data through three surfaces — APIs, AI via MCP, and real-time events — plus write-back, all behind one security gate.",
      "Once a customer is in the lake, new use cases (portals, AI, dashboards, automation) don't require re-integration — that's the expansion story."
    ]
  },
  {
    "id": 4,
    "group": "The Platform",
    "title": "The Commercient AI Platform",
    "time": "5 min",
    "objectives": [
      "Describe the four parts of the AI Platform and the two External MCP Servers",
      "Explain internal vs. external agents and the common agent types",
      "Explain the knowledge base and role-based access that set Commercient agents apart"
    ],
    "body": "<p>The Commercient AI Platform is where agents live and run. It's built to reason over the customer's connected data (from the Data Lake) plus their business knowledge, and to take actions.</p><h3>What the AI Platform includes</h3><ul><li>Agent hosting and cloud platform — where the customer's AI agents are hosted and run.</li><li>AI tools / API / webhook platform — the tools, APIs, and webhooks agents use to fetch data and take actions.</li><li>AI knowledge base platform — where the customer's documents and media ground the agents' answers.</li><li>Commercient AI Portal — the no-code place where agents are configured.</li></ul><h3>The two External MCP Servers</h3><p>MCP (the Model Context Protocol) is an open standard for how AI applications connect to external data, tools, and workflows. Commercient exposes two External MCP Servers, and knowing the difference matters:</p><ul><li>The AI Platform External MCP Server connects the Commercient AI Platform — its tools, APIs, and webhooks — to a customer's agents and AI harnesses.</li><li>The Data Lake External MCP Server opens the Data Lake's governed data to those same agents, internal and external.</li></ul><p>Because both are MCP-compatible, a customer isn't locked into one AI model or vendor. Their connected data and tools can be used by the right model, agent, or workflow for the job — including connecting a coding agent to the Data Lake MCP Server to build integrations and reports against real business data.</p><h3>Internal vs. external agents</h3><p>Internal agents are staff-facing. They help employees answer questions, surface action items, draft communications, and work across systems without logging in and digging. External agents are customer-facing. They live on a website, portal, or other public channel and answer inbound questions, pull from the knowledge base or product catalog, capture leads, and route requests.</p><h3>Common agent types</h3><ul><li>Customer Support agent — order tracking, FAQs, account questions, renewals.</li><li>Sales agent — qualifies leads in real time and gives reps order history, inventory, pricing, open quotes, and account status without a login.</li><li>Accounting agent — reconciliation support, ERP/CRM comparisons, discrepancies, and AR follow-up.</li><li>Quote and Gap Report agents — recurring reports, gap analysis, and next-best-product opportunities.</li><li>Website / External agent — always-on web support, product questions, and lead capture.</li></ul><h3>The knowledge base and role-based access</h3><p>Commercient agents aren't limited to database records. They can be grounded in the customer's business documents and media — PDFs, manuals, policies, FAQs, sitemaps, product catalogs, even YouTube videos — as well as connected ERP, CRM, and eCommerce data from the Data Lake. Role-based access ensures each team sees the right data, and Q&amp;A controls keep answers accurate and reliable. That combination — data across multiple systems, plus a real knowledge base, plus role-based access — is what separates a Commercient agent from a generic chatbot limited to one system. And it requires no code to start.</p>",
    "takeaways": [
      "The AI Platform is agent hosting, the AI tools/API/webhook platform, the knowledge base, and the AI Portal — configured no-code.",
      "Two External MCP Servers connect agents to the platform's tools (AI Platform MCP Server) and to the governed data (Data Lake MCP Server); both are model-agnostic and MCP-compatible.",
      "Internal agents serve staff; external agents serve customers; the knowledge base plus role-based access is what sets Commercient agents apart."
    ]
  },
  {
    "id": 5,
    "group": "Pricing & Packaging",
    "title": "How the platform is priced: subscriptions",
    "time": "3 min",
    "objectives": [
      "Explain how the platform subscription is structured across the three pieces",
      "Describe what drives price within each piece",
      "Understand loyalty pricing and where numbers come from"
    ],
    "body": "<p>The platform is sold as an annual subscription, and the cleanest way to think about it is one subscription line per piece. You won't publish numbers, but understanding the shape lets you set expectations and route deals correctly.</p><h3>The three-piece subscription</h3><ul><li>Commercient AI Platform — a monthly platform fee for agent hosting and the AI tools/API/webhook/knowledge-base platform, a monthly fee for the AI Platform External MCP Server, and a per-agent fee for each configured AI agent. Customers typically start with one agent and add more as they find new use cases.</li><li>Commercient Data Lake — a monthly platform fee for Data Lake hosting and API entity management, plus a monthly fee for the Data Lake External MCP Server.</li><li>Commercient Data Integration — priced per source, per integrator. Each source connected through the CDC Replicator, the Enterprise System Transactional Integrator, the Enterprise CRM Integrator, or the Point-to-Point Pulse Integrator carries its own recurring fee. (Third-party API licenses may be required.)</li></ul><h3>What moves price within a piece</h3><ul><li>AI Platform: the number of agents is the main mover — more agents, more value, more fee.</li><li>Data Lake: the platform and MCP-server lines are relatively fixed; usage is metered separately (Module 6).</li><li>Data Integration: the number and type of sources and integrators, the direction of movement (in, out, or both), and the systems involved. More sources and more integrators mean more monthly lines.</li></ul><p>An annual success fee applies on top of the subscription as the ongoing support and managed-service component.</p><h3>Loyalty pricing</h3><p>Existing customers — especially already-connected ones — may qualify for loyalty discounts on nearly every subscription line: the AI Platform fee, the MCP-server fees, the per-agent fee, the Data Lake fee, and each Data Integration source. This is one more reason the connected customer base is the strongest expansion pool: they get both the foundation reuse and the loyalty pricing.</p><h3>Where the numbers come from</h3><p>There is no published \"starts at\" price. Figures come from Commercient, not from you. Your job is to understand the shape — a subscription line per piece, per-agent and per-source fees, a success fee, and loyalty discounts for existing customers — and to route pricing through Commercient sales (partners route through their PAM). Partners can self-serve integration ballparks in the Quoting Tool (Module 11).</p>",
    "takeaways": [
      "The subscription is one line per piece: AI Platform (platform + MCP server + per agent), Data Lake (platform + MCP server), and Data Integration (per source, per integrator).",
      "Agents drive AI Platform price; sources and integrators drive Data Integration price; an annual success fee applies on top.",
      "Existing/connected customers may qualify for loyalty discounts on nearly every line; final numbers come from Commercient."
    ]
  },
  {
    "id": 6,
    "group": "Pricing & Packaging",
    "title": "Usage-based pricing and onboarding",
    "time": "4 min",
    "objectives": [
      "Explain the usage-based fee model and the \"pay for what you use\" philosophy",
      "Name the metered usage categories",
      "Describe how onboarding is delivered as prepaid hours per piece"
    ],
    "body": "<p>On top of the subscription, the platform charges for what a customer actually uses, and delivers setup as prepaid onboarding hours. Both are designed to keep costs predictable while the platform scales elastically.</p><h3>Usage-based fees</h3><p>Usage is metered across a few categories:</p><ul><li>Sync usage — the average volume of data synced per month (measured per GB).</li><li>API credits — metered charges for API, webhook, and MCP calls made through the platform, inbound and outbound, billed per block of calls.</li><li>Compute credits — metered charges for compute consumed on agent runs and database reads/writes/queries, billed per block of SQL compute credits (calculated from the CPU time and memory reserved while processing sync jobs, which is driven by how frequently syncs run).</li><li>Tokens — the underlying AI model tokens, billed at current Commercient model rates.</li></ul><h3>Pay for what you actually use</h3><p>Usage is metered because demand isn't static — it moves with the business. Nights, weekends, and holidays call for far less compute than a busy business day, while a tradeshow, product launch, or a competitor's announcement can spike demand well beyond baseline with little warning. Commercient's elastic, auto-scaling architecture means a customer never pays to keep idle capacity on standby \"just in case,\" and never gets caught short when real demand shows up — it scales in both directions. Because usage can be driven by many users or the public, the platform builds in usage controls and caps so a customer can bound costs even when the workload isn't bounded. And usage-based doesn't mean unpredictable forever: after a billing cycle or two, Commercient reviews actual consumption and sets a monthly cadence baseline — at which point usage fees shift to a prepaid, smoothed number. The customer keeps the elasticity for real spikes while steady-state costs become known and plannable.</p><div class=\"callout\"><p>How to say it: \"You're not buying a fixed box of capacity you might not use, or that might run short. You pay for what you actually use, we cap it so it can't run away, and after a cycle or two we smooth it into a predictable monthly number.\"</p></div><h3>Onboarding — prepaid hours per piece</h3><p>Implementation is delivered as prepaid onboarding hours, and each of the three pieces has its own guided path:</p><ul><li>AI Platform onboarding — kickoff and prerequisites, platform access and keys, knowledge base setup, agent configuration, security/compliance/logging, initial QA and tuning, embed preparation, staging deployment and functional test, production deployment, and monitoring and handoff.</li><li>Data Lake onboarding — kickoff and prerequisites, platform access and keys, Data Lake entity setup, Data Lake MCP configuration, role-based Data Lake MCP access, initial QA and tuning, third-party agent-to-MCP connection, staging deployment and functional test, production deployment, and monitoring and handoff.</li><li>Data Integration onboarding — kickoff and prerequisites, platform access and keys, source data object/table/entity review, Data Lake API/DB/file configuration, filtering and mapping to and from source, initial QA and tuning, third-party API development, staging deployment and functional test, production deployment, and monitoring and handoff.</li></ul><p>Onboarding is a block of prepaid hours, not a quote or estimate — customers buy a block to help onboard their team, and additional hours are available as a project requires. The prepaid rate is lower than the normal hourly rate.</p>",
    "takeaways": [
      "Usage is metered across sync volume (per GB), API/webhook/MCP calls, compute credits, and model tokens.",
      "The philosophy is \"pay for what you actually use,\" with elastic auto-scaling, usage caps, and a smoothed prepaid baseline after a cycle or two.",
      "Onboarding is prepaid hours with a distinct guided path for each of the three pieces; it's a block of hours, not a quote."
    ]
  },
  {
    "id": 7,
    "group": "Finding Opportunities",
    "title": "Spotting a Data Integration opportunity",
    "time": "3 min",
    "objectives": [
      "Recognize the language customers use when they need integration",
      "Know the minimum information needed to bring Commercient in, and how to confirm support",
      "Know the disqualifiers — what Commercient doesn't do"
    ],
    "body": "<p>Most integration opportunities surface in conversations that aren't about integration. Train your ear for these phrases:</p><ul><li>\"We can't see ERP data in our CRM.\"</li><li>\"Our reps can't tell what was paid or shipped.\"</li><li>\"Finance and sales are using different numbers.\"</li><li>\"We're moving from QuickBooks to a real ERP.\" (or vice versa)</li><li>\"Their CRM is going live but the back office isn't connected.\"</li></ul><p>Every one is an integration opportunity in plain language. When you hear one, the intake Commercient needs from you is short, and you can collect it in any conversation.</p><h3>The minimum intake</h3><ul><li>ERP and version</li><li>CRM and version</li><li>Direction (into the CRM, into the ERP, or both)</li><li>User count (CRM seats)</li><li>Key data objects in scope (accounts, orders, invoices, products, etc.)</li></ul><p>That's enough to scope the deal and produce a ballpark.</p><h3>Confirming Commercient supports the systems</h3><p>Before scoping, confirm Commercient connects to the systems the customer has. The fastest way: go to www.commercient.com and use the search in the top right. Type the systems you're trying to connect — for example \"givecampus sage\" or \"netsuite hubspot.\" The product results show every supported integration that matches. The integration finder is also in the Partner Portal under Pre-Sales Resources. If the search returns no result, that doesn't mean no — most often it means the combination isn't a standard catalog connector and would run through the Universal Data Connector (API, ODBC, SQL, file) as a custom connection, or through the Point-to-Point Pulse Integrator. Confirm the path with partners@commercient.com or your PAM before ruling anything out.</p><h3>The disqualifiers — what we don't do</h3><ul><li>No one-time imports or migrations. Recurring movement only.</li><li>No ERP-to-ERP integrations. Commercient connects CRM ↔ ERP, eCommerce ↔ ERP, and similar — not ERP ↔ ERP.</li></ul>",
    "takeaways": [
      "Listen for system-of-record disconnects in everyday language.",
      "Five fields of intake (ERP, CRM, direction, users, objects) is enough to bring Commercient in; confirm support via website search or the Partner Portal finder.",
      "A no-result search usually means UDC or the Pulse Integrator, not \"no.\" Disqualifiers: no one-time jobs, no ERP-to-ERP."
    ]
  },
  {
    "id": 8,
    "group": "Finding Opportunities",
    "title": "Spotting a Data Lake opportunity",
    "time": "3 min",
    "objectives": [
      "Recognize the signals that point to the Data Lake rather than an agent",
      "Match each signal to the Data Lake capability that solves it",
      "Know how to open the conversation"
    ],
    "body": "<p>Some signals point less to an AI agent and more to the Data Lake surfaces directly. Listen for these:</p><ul><li>\"We want to put AI on our own data.\" → the Data Lake, opened through the External MCP Server.</li><li>\"Our ERP is locked down and nobody can touch it.\" → the ODBC Agent unlocks it into the lake.</li><li>\"We need a portal where customers see their own orders and invoices.\" → a self-service portal with row-level security.</li><li>\"We need live dashboards / a wallboard.\" → real-time events.</li><li>\"Reconciling Stripe against our ERP is a nightmare.\" → a reconciliation view.</li><li>\"We want to build our own apps on our data.\" → instant REST and GraphQL APIs.</li></ul><p>Each of these is a concrete Data Lake conversation. The through-line: once the data is in the lake, the surface the customer needs — API, portal, dashboard, reconciliation, or MCP for AI — is available without re-integrating anything.</p><h3>How to open it</h3><p>When a customer describes stuck data, a portal need, live dashboards, or reconciliation pain, you don't have to diagnose the whole build. Name the pattern: \"That's exactly what the Data Lake is for — we bring your systems into one always-current, governed database, then open just the piece you need through an API, a portal with row-level security, real-time events, or an MCP server for AI. You choose what's exposed.\" Then bring the Commercient team in to scope.</p>",
    "takeaways": [
      "Data Lake signals: \"put AI on our data,\" locked-down ERP, customer portal, live dashboards, reconciliation, \"build our own apps.\"",
      "Match the signal to the surface: MCP, ODBC Agent, row-level portal, real-time events, reconciliation view, REST/GraphQL APIs.",
      "The pitch is \"one governed database, expose only what you need\" — then bring Commercient in to scope."
    ]
  },
  {
    "id": 9,
    "group": "Finding Opportunities",
    "title": "Spotting an AI opportunity",
    "time": "5 min",
    "objectives": [
      "Recognize customer signals that point to an AI agent",
      "Explain why connected data is what makes AI useful",
      "Handle CRM-native AI and know when to bring the Commercient AI team in"
    ],
    "body": "<h3>Why the opportunity exists here</h3><p>AI is only as useful as the data it can access. Many companies are interested in AI, but their business data is split across systems — the CRM shows activity, contacts, pipeline, and opportunities, while the ERP holds orders, invoices, inventory, credit status, shipments, pricing history, and balances. If those systems aren't connected, an AI tool sees only part of the picture. Commercient Data Integration and the Data Lake create a connected data layer across ERP, CRM, and related systems, which gives agents the business context that makes their answers useful. That's why already-connected customers are strong AI opportunities: if the data foundation is in place, the AI conversation can start immediately.</p><h3>The listening vocabulary</h3><p>The same skill you use to spot integration opportunities applies to AI: listen for repeated manual work, unanswered customer questions, and places where employees switch between systems to find information. (See the signal-to-agent table in the reference section.)</p><h3>When the customer mentions CRM-native AI</h3><p>Customers may mention AI built into their CRM — Salesforce Agentforce, HubSpot Breeze, Zoho AI, or Microsoft Copilot. That's a positive signal: they're already thinking about AI. The key question is whether their data is connected well enough for those tools to deliver useful answers. Most CRM-native tools are strongest when they can access complete data; if the CRM lacks ERP context — orders, invoices, inventory, AR balances, pricing history, shipments — the AI works from part of the picture. Commercient connects ERP and CRM data into a more complete layer, which makes CRM-native tools more informed and can support Commercient agents that work across multiple systems. These tools complement each other rather than compete.</p><h3>The right starting point</h3><p>When you're unsure where to begin, the external agent is often the easiest first conversation: it's visible, simple to understand, easy to demo, and requires less internal change management than a staff-facing agent. From there, internal agents become a natural next step. The goal isn't to force every customer into the same starting point; it's to match the solution to the clearest business pain.</p><h3>When to bring the Commercient AI team in</h3><p>You don't have to demo AI alone. For early, strategic, or more complex conversations, bring the Commercient AI team in to co-present: you bring the relationship and customer context, Commercient brings the demo and technical explanation, and both listen for the agent type that best fits. Bring the customer's website URL in advance so an external-agent demo can use their own site as the backdrop.</p>",
    "takeaways": [
      "AI works best on connected, reliable data — which is why connected customers are strong AI opportunities.",
      "Internal agents support staff; external agents support customers and are usually the easiest first conversation.",
      "CRM-native AI is a positive signal; Commercient complements it by supplying cross-system context. Bring the Commercient AI team in to co-present on early or strategic deals."
    ]
  },
  {
    "id": 10,
    "group": "The Tools",
    "title": "The Partner Portal and Charlie",
    "time": "4 min",
    "objectives": [
      "Get oriented to the Partner Portal dashboard and its key sections",
      "Use Charlie, the Partner AI Assistant, as your first stop for Commercient questions",
      "Submit leads, track active deals, and find your PAM"
    ],
    "body": "<p>Every partner has access to the Commercient Partner Portal — a single dashboard to submit leads, get instant quotes, track active deals, manage joint customers, access support tickets, and find integration documentation. Log in at portal.commercient.com. If you don't have access yet, email partners@commercient.com or contact your PAM.</p><p>Practical homework: complete the click-through walkthrough of the full Partner Portal — the Walnut tutorial linked in the live academy.</p><h3>The dashboard at a glance</h3><p>The top of the dashboard shows your partnership metrics, cumulative across the lifetime of your relationship with Commercient:</p><ul><li>Sourced Leads — commission-eligible referrals you've submitted.</li><li>Shared Customers — referrals that closed (won opportunities, past and active).</li><li>Earned Commission — total commission earned across your partnership.</li><li>Client Referrals From Commercient — number of times Commercient has recommended you to a customer.</li></ul><h3>Charlie — your Partner AI Assistant</h3><p>In the bottom-right corner of the dashboard is the blue robot icon. Charlie is the partner-facing agent built on the same Commercient AI Platform you'll be selling. Ask Charlie anything about Commercient — supported connectors, configuration questions, the Phase 1 or Phase 2 approach, technical setup details, contract or process questions. Charlie surfaces answers and links to the underlying knowledge-base articles. The habit to build: save yourself an email — ask Charlie first. (Charlie is itself a live proof point of an external agent grounded in a knowledge base.)</p><h3>Submitting a lead</h3><p>Two ways, both routed to your PAM: the \"Submit a Lead to Commercient\" form on the dashboard captures your info, the lead contact, and the lead company and goes straight to your PAM's inbox; or email your PAM directly. Same destination — pick whichever is easier in the moment.</p><h3>Tracking active leads and deals</h3><p>Below the quoting tool is the Active Deals table, integrated with Commercient's sales CRM so you can see deal status, stage, and which Commercient rep is managing each shared deal in real time. It's your single source of truth for \"where is that deal I sent in two weeks ago.\"</p><h3>Support tab</h3><ul><li>My Tickets — every support ticket across every customer project you're tagged on, in one place.</li><li>Help Center — Commercient's full library of knowledge articles, video walkthroughs, and support documentation. Searchable, and it covers all 200+ ERPs Commercient connects to.</li><li>Questions / Feedback — a direct line to the all-team partner inbox.</li></ul><h3>Your PAM</h3><p>Contact info is at the bottom of the dashboard. Your PAM is your dedicated point of contact across your entire partner and customer journey. When in doubt, route through your PAM.</p>",
    "takeaways": [
      "The Portal is at portal.commercient.com using your partner credentials (partner-specific); the platform knowledge applies to everyone.",
      "Charlie answers Commercient questions and is your first stop before email — and a live example of a Commercient agent.",
      "Two ways to submit a lead, both to your PAM; the Active Deals table tracks status in real time."
    ]
  },
  {
    "id": 11,
    "group": "The Tools",
    "title": "Using the Partner Portal Quoting Tool",
    "time": "3 min",
    "objectives": [
      "Generate accurate ballpark integration quotes using the tool's inputs",
      "Know which License Type and Frequency defaults to use",
      "Understand the integration-points pricing tip, and what the tool does and doesn't cover"
    ],
    "body": "<p>The Quoting Tool lives on the Partner Portal dashboard. It lets partners self-generate an accurate ballpark for most integration projects in minutes, without waiting on a Commercient rep. A copy of every quote is emailed to the address you provide. The tool covers integration ballparks; AI Platform, Data Lake, and usage-based pricing are scoped with the Commercient team (Modules 5–6).</p><h3>What to enter</h3><ul><li>Company name and contact. Use your name or the client's POC. Email for quote delivery is required.</li><li>ERP and ERP Version. If your ERP isn't in the dropdown, contact your PAM.</li><li>CRM and CRM Version. Same — if it isn't listed, your PAM has the comprehensive list.</li><li>License Type. For most accurate pricing, select \"CRM User License\" and enter the number of users on the customer's CRM instance. If you're unsure, select \"Platform License.\"</li><li>Frequency. The single most significant price driver in the tool. Default recommendation: M–F twice per day (e.g., 8am, 1pm) — sufficient for about 90% of customers. Only quote a higher frequency if the customer has specifically asked for it. (Frequency also drives compute usage — see Module 6.)</li><li>Direction. Into the CRM only, into the ERP only, or bidirectional (two-way).</li><li>Integration points. Select the data objects / tables you intend to move. Most common ones are listed; if what you need isn't there, contact your PAM for the full list.</li></ul><h3>Pricing tip</h3><p>If you're not certain of the exact tables, select the correct number of integration points per direction. Pricing scales primarily on count and direction, so the ballpark stays roughly accurate even if the specific tables shift later. The tool's disclaimer stands: it's an estimate — confirm all details with Commercient sales before finalizing. If a number doesn't look right, or the deal is unusual, email your PAM for a sanity check before sharing the figure with your client.</p>",
    "takeaways": [
      "Frequency is the biggest price driver — default to M–F twice per day — and it also drives compute usage.",
      "Pricing scales with the count of integration points per direction.",
      "The tool covers integration ballparks only; AI, Data Lake, and usage pricing are scoped with Commercient. Sanity-check unusual deals with your PAM."
    ]
  },
  {
    "id": 12,
    "group": "Selling the Platform",
    "title": "Running the Commercient AI demo yourself",
    "time": "5 min",
    "objectives": [
      "Pre-flight the demo environment for any prospect",
      "Run the External Agent → Internal Agent → Cards → ROI → Speed Race flow",
      "Position AI as business enablement, not staff replacement, and end on the strongest proof point"
    ],
    "body": "<p>Visit www.demo.commercient.ai — the same demo environment Commercient uses internally — and log in with your existing Commercient credentials. The demo tool is a polished sales-side environment built for a clean, consistent walkthrough. It isn't the live product environment, but it's the right tool for showing what the product can do.</p><h3>1. Pre-flight before the call</h3><p>Before the demo, pick the prospect's website (or use commercient.com as a fallback). Plug in the URL, choose the closest industry match, and confirm the page loads inside the demo environment — the industry match determines the sample data shape. Some larger or security-conscious sites block the embed; if that happens, screenshot the customer's homepage and upload it as the background image instead. Either way, the goal is for the customer to see their own brand on screen. Complete this setup before the call so the demo starts cleanly.</p><h3>2. External Agent first</h3><p>Start with the External Agent — it's the easiest first concept because it looks like something customers already recognize: an intelligent agent on their website. Walk through what it could do with public-facing knowledge (sitemap, product catalog, FAQ, service pages). Show a visitor asking a product question, getting a useful answer and the right product URL, and being offered a lead-capture form. That form is an action — it can log information to the CRM through an API, showing the agent doesn't just answer questions, it moves a process forward.</p><h3>3. Internal Agent second</h3><p>Move to the Internal Agent to show what it can do for staff when it pulls from both ERP and CRM data. Three reliable prompts: \"Any customers past due right now and trying to place new orders?\", \"Any expiring quotes?\", and \"Can we fill those quotes against current inventory?\" In about thirty seconds the agent produces an action plan that would otherwise take much longer to assemble across two systems. Then ask it to draft an outreach email based on what it found — that's where the customer sees the agent completing work, not just answering questions.</p><h3>4. Agent Cards interlude</h3><p>Use the agent cards to help the customer picture different use cases: \"Based on what we've discussed, a few of these may be relevant. Does a Quote agent stand out? What about Accounting, Customer Success, Website, or Gap Reports?\" The cards are a conversation tool, not a hard close — let the customer react to what feels useful and use that to guide the next part.</p><h3>5. ROI Calculator</h3><p>The ROI calculator uses sliders for team size, questions per day, minutes per question, and hourly cost. Even with conservative inputs, it usually shows meaningful time savings. The exact number isn't the point — it's to help the customer see that repeated questions and manual lookups carry real operational cost. Frame it as enablement: \"Most customers aren't looking at this as replacing people. They're looking at giving their team more capacity, faster answers, and more time for higher-value work.\"</p><h3>6. The Speed Race, saved for last</h3><p>The Speed Race is the side-by-side video of an agent versus a human doing the work the old way, both trying to surface open orders. The agent produces the first answer in seconds while the manual side is still logging in, then answers several more questions and drafts an email before the manual side catches up. It lands best at the end — by then the customer understands what an agent is, what data it uses, and why speed matters, so the Speed Race ties everything together.</p><p>A partner-specific version of the demo tool is on the roadmap, with cards and language tuned for partner-led conversations. Until then, use the customer-facing demo tool with your own framing.</p>",
    "takeaways": [
      "Pre-flight the customer URL before the call so the demo starts cleanly.",
      "Run External → Internal → Cards → ROI → Speed Race, in that order.",
      "Frame AI around productivity and capacity, and save the Speed Race for the end as the final proof point."
    ]
  },
  {
    "id": 13,
    "group": "Selling the Platform",
    "title": "Positioning the Commercient Platform",
    "time": "5 min",
    "objectives": [
      "Use the connected-data foundation to bridge into AI and Data Lake conversations",
      "Tell the three-piece platform story and differentiate from CRM-native AI",
      "Position Commercient as consultative, customizable, model-agnostic, and MCP-compatible"
    ],
    "body": "<h3>The core idea</h3><p>A strong platform conversation starts with the customer's data foundation. Commercient connects systems like Sage, NetSuite, Intacct, Salesforce, HubSpot, Zoho, Magento, and others into a connected layer across ERP, CRM, eCommerce, and related systems. AI and every other surface are only useful when they can access that context — if a tool can only see CRM data, it misses orders, invoices, inventory, credit status, shipments, pricing history, and balances. Once a customer is thinking about connecting their systems, it's the right time to talk about what that connected data makes possible.</p><h3>The platform story</h3><p>The AI Platform, the Data Lake, and Data Integration are one platform. Data Integration connects the systems and moves the data; the Data Lake coalesces it and keeps it current; the AI Platform helps the customer ask questions, surface insights, and take action on that data; and the same lake feeds APIs, portals, dashboards, and automation. The more connected the customer's data, the more value they unlock across the platform — and each expansion reuses the same foundation.</p><div class=\"callout\"><p>\"Commercient connects your ERP, CRM, eCommerce, and related systems into one always-current database — your Data Lake. From there we open exactly what you need: instant APIs, real-time events, a customer portal, or AI agents that work from real business context like order history, open quotes, inventory, and balances. Since your team is already thinking about connecting systems, this is the natural time to look at what that connected data could do.\"</p></div><h3>The CRM-native AI distinction</h3><p>When a customer is already looking at Agentforce, Breeze, Zoho AI, or Copilot, that's a positive signal. Those tools can be useful inside their platform; the key question is whether they have enough business data to answer useful questions. If the CRM lacks ERP context, the AI sees part of the picture. Commercient connects ERP, CRM, eCommerce, and related systems into a broader layer that makes CRM-native tools more informed and supports Commercient agents that work across systems.</p><div class=\"callout\"><p>\"Those CRM AI tools can be useful. The key is making sure they have the right business data available. Commercient connects ERP and CRM data so AI tools and agents can work from a more complete picture.\"</p></div><h3>Model-agnostic and MCP-compatible</h3><p>Commercient is compatible with leading AI frontier labs and model platforms by design — through APIs, agent frameworks, and the two External MCP Servers. MCP (the Model Context Protocol) is an open standard for how AI applications connect to external data, tools, and workflows; because Commercient exposes its tools (the AI Platform MCP Server) and its governed data (the Data Lake MCP Server) over MCP, a customer isn't locked into one AI model or vendor. Their connected business data is usable by the right model, agent, or workflow for the job. It's also why developers can connect a Data Lake MCP interface to coding agents to build integrations and reports against real business data.</p><h3>The co-presented demo model</h3><p>You don't have to demo Commercient alone at the beginning. The model is simple: you bring the relationship and customer context, Commercient brings the demo and technical explanation, and both listen for the agent type that best fits. This keeps you close to the opportunity while relying on Commercient for the deeper walkthrough; over time, as you get comfortable, you can take on more of the conversation.</p><h3>Consultative and customizable</h3><p>The conversation shouldn't sound like buying a generic chatbot. Commercient designs agents and surfaces around the customer's data, workflows, and business needs. A customer may start with one agent — a Website or Sales agent — and expand into Quote, Accounting, Customer Success, Gap Reports, a portal, dashboards, or reconciliation as they find more places where connected data and AI reduce manual work, improve visibility, or help teams move faster. For partners, the platform is an additive line to your service menu, not a product you build alone.</p>",
    "takeaways": [
      "Connected data is the foundation that makes AI and every surface useful — that's the bridge into the platform conversation.",
      "Tell the three-piece story: Data Integration moves data, the Data Lake governs it, the AI Platform and other surfaces put it to work.",
      "Commercient complements CRM-native AI and stays model-agnostic and MCP-compatible; co-present early and position consultatively."
    ]
  },
  {
    "id": 14,
    "group": "Selling the Platform",
    "title": "The AI discovery and enablement process",
    "time": "3 min",
    "objectives": [
      "Explain how an AI engagement moves from discovery to live agents",
      "Describe the knowledge base setup and team enablement steps",
      "Know how the relationship owner stays involved across the process"
    ],
    "body": "<p>AI deals follow a repeatable path from \"we're curious about AI\" to live, useful agents. Knowing the path helps you set expectations and stay involved throughout.</p><h3>AI Discovery</h3><p>Discovery is a structured process to spot the highest-value wins for a specific customer — the places with repeated manual work, unanswered customer questions, and cross-system lookups. The relationship owner helps frame the business pain and brings context; Commercient's discovery maps that pain to the right agent types and the data and documents each agent needs. The output is a short list of concrete use cases the customer can see themselves getting value from, rather than \"AI\" in the abstract.</p><h3>Knowledge base setup</h3><p>Agents are grounded in two things: connected data (ERP, CRM, and eCommerce through the Data Lake) and a knowledge base of the customer's documents and media (PDFs, manuals, policies, FAQs, sitemap, product catalog, and videos). Setting up the knowledge base means gathering those materials and configuring the agent in the Commercient AI Portal — no code required. Role-based access and Q&amp;A controls are configured here so each team sees the right data and answers stay accurate.</p><h3>Team enablement</h3><p>Enablement trains the customer's team to use the agents efficiently — how to ask, where the agent helps, and how to trust and verify answers. An agent that nobody adopts creates no outcomes, so enablement is part of the value, not an afterthought.</p><h3>The onboarding path</h3><p>Delivery runs as prepaid onboarding hours (see Module 6) through a consistent sequence: kickoff and prerequisites, platform access and keys, knowledge base setup, agent configuration, security/compliance/logging, initial QA and tuning, embed preparation, staging deployment and functional test, production deployment, and monitoring and handoff.</p>",
    "takeaways": [
      "AI moves from discovery (finding the wins) to knowledge base setup and agent configuration to enablement and go-live.",
      "Agents are grounded in connected data plus a document-and-media knowledge base, configured no-code with role-based access.",
      "Delivery is a ten-step onboarding path billed as prepaid hours; whoever owns the customer relationship stays involved throughout."
    ]
  },
  {
    "id": 15,
    "group": "Delivery",
    "title": "Commercient Guided Implementation (CGI)",
    "time": "4 min",
    "objectives": [
      "Explain CGI to a customer in one paragraph",
      "Set the right expectation before contract signing",
      "Know the TPAF process for partner participation"
    ],
    "body": "<p>CGI is one of the things that makes Commercient distinct, and one of the most important things to introduce well. Customers who understand CGI before they sign walk into delivery confident, engaged, and ready to move quickly.</p><h3>What CGI is</h3><p>Commercient Guided Implementation is an avatar-led, interactive virtual environment where the customer configures their Commercient integration according to their purchased license. The customer's guide inside the environment is \"Ruby.\" The experience is gamified — customers move through rooms, complete objectives, earn badges, and unlock the next step. A live human Customer Success team is reachable inside the environment in real time, so help is always one click away.</p><h3>What the customer does inside CGI</h3><p>From the welcome email customers receive after contract signing: during the interactive session they register their IP address, create their HelpDesk login, schedule a meeting with their dedicated Customer Success Manager, identify their project members, and register to access their project plan, configuration, alerts, and dashboard, and install and configure their integration. The customer gets a Friendly PIN and a Registration ID in the same email. The CGI map walks them through: Requirements → Account Matching → CRM configuration → Layout Training → Delivery → Add-ons — a clear, step-by-step path from signing to live integration.</p><h3>Why CGI is central to how Commercient delivers</h3><p>CGI is the core of how Commercient delivers integrations at scale. The guided environment, paired with embedded human support, lets Commercient standardize the highest-quality parts of an implementation while keeping the human team available exactly when the customer needs them. The same project delivered fully human-driven, end to end, would price at a multiple of the CGI price — roughly what a traditional consulting firm would charge for an equivalent custom build.</p><h3>How to set customers up for a great CGI experience</h3><p>Introduce CGI early — ideally during the sales conversation, before contract signing. Let the customer know their implementation begins in an interactive guided environment with real human support available throughout. Customers who hear this up front are prepared to start right away: they understand the model, they know what to expect, and they're ready to log in the moment the welcome email arrives.</p><h3>Phase 2 inside CGI</h3><p>When the customer is ready for Phase 2 (writing data back into the ERP), they re-enter the Application Room and talk to the Phase 2 avatar. Many customers prefer this and use it in place of a separate Phase 2 kickoff meeting — that's a fully supported path. The CSM verifies CGI completion before scheduling Phase 2 work.</p><div class=\"callout\"><p>\"After signing, your team will begin implementation in Commercient's Guided Implementation environment. It walks you step by step through setup, configuration, project readiness, and delivery, with live Customer Success support available throughout. It gives everyone a clear path from contract to go-live, so your team knows exactly what to do, when to do it, and where to get help.\"</p></div>",
    "takeaways": [
      "CGI gives customers a clear, guided path from signing to live integration, with live Customer Success support throughout.",
      "Introduce CGI before contract signing so customers are ready to begin the moment the welcome email arrives.",
      "Partners participate when named in the contract or authorized through the TPAF process; Phase 2 can continue through the Application Room avatar."
    ]
  },
  {
    "id": 16,
    "group": "Delivery",
    "title": "What Commercient is and isn't responsible for",
    "time": "4 min",
    "objectives": [
      "Recite the scope boundary cleanly to set customer expectations",
      "Recognize common out-of-scope requests and route them appropriately",
      "Understand the scope boundary across all three pieces, and where partner or in-house services fit"
    ],
    "body": "<h3>The essential boundary</h3><p>Commercient is responsible for moving and mapping data between systems accurately and consistently. The partner and customer are responsible for how that data is structured, cleaned, and used within each system. Commercient performs the technical transformation required for integration — mapping, SQL views, posting logic. Commercient does not perform business transformation — logic, strategy, or system behavior.</p><h3>Commercient is responsible for</h3><ul><li>Moving and mapping data between ERP, CRM, and connected systems</li><li>Running scheduled syncs on the agreed cadence (e.g., 2x per day)</li><li>Configuring and delivering Phase 1 (into the CRM): setup, validation, layout training, log monitoring, sign-off</li><li>Configuring and delivering Phase 2 (into the ERP), if included</li><li>Technical data transformation (SQL views, field mapping, data joins)</li><li>Account matching — linking records via unique keys</li><li>Monitoring sync logs and resolving integration errors</li><li>Providing Admin Panel tools (sync history, logs, resync, change requests)</li></ul><h3>Commercient is not responsible for</h3><ul><li>Cleaning, normalizing, deduplicating, or fixing data inside the customer's ERP or CRM</li><li>CRM configuration: workflows, automation, reporting, UI setup, pipeline stages</li><li>ERP configuration or internal business rules</li><li>Business logic: pricing strategies, sales processes, operational workflows</li><li>How data behaves inside destination systems after it lands</li><li>Guaranteeing the accuracy of source data</li><li>Acting as a CRM admin, ERP consultant, or RevOps resource</li><li>Building reports, dashboards, or analytics</li><li>Adding new tables / endpoints outside contracted scope (requires re-quote)</li><li>Major scope changes without a re-quote</li></ul><h3>The same boundary across the three pieces</h3><p>The pattern holds across the platform. For the Data Lake, Commercient provides the governed data layer, the surfaces (APIs, MCP, real-time events, write-back), and the security controls; the customer and partner decide what to expose, how keys and row-level policies are scoped, and own whatever apps, portals, or dashboards they build on top. For the AI Platform, Commercient provides the platform, agent configuration, knowledge-base ingestion, and connected data; the customer owns the accuracy and curation of their knowledge-base content and business rules, and validates answers. Agents answer from what they're given — so the quality of the documents and data the customer supplies is the customer's responsibility.</p><h3>Customer responsibilities during setup</h3><p>A successful setup depends on the customer's IT, ERP, database, or application administrator providing source access and credentials, installing vendor-specific ODBC drivers and creating and testing 32-bit System DSNs when needed, creating read-only SQL logins when needed, confirming firewall/VPN/IP-allowlist requirements and outbound HTTPS access, identifying the correct tables and fields, confirming business rules and filters, validating record counts, keeping credentials current after go-live, and notifying Commercient when source-system changes may affect the sync.</p><h3>Common out-of-scope requests</h3><ul><li>\"Fix duplicate records in our CRM\"</li><li>\"Clean or normalize our ERP data\"</li><li>\"Change our pricing logic or business rules\"</li><li>\"Build workflows in CRM\"</li><li>\"Make synced data behave differently after it lands\"</li></ul><p>Almost every one of those is work a consulting or implementation partner — or the customer's own team — can deliver. Commercient delivers the data layer; someone else delivers the business layer. Out-of-scope requests are often service opportunities, not part of Commercient's delivery scope.</p>",
    "takeaways": [
      "Commercient moves and maps data between systems, accurately and consistently.",
      "Customers and partners own how that data is structured, cleaned, and used — including knowledge-base content for AI and anything built on the Data Lake.",
      "Out-of-scope requests are opportunities for an implementation partner or the customer's own team."
    ]
  },
  {
    "id": 17,
    "group": "Delivery",
    "title": "Implementation timelines and what causes variance",
    "time": "5 min",
    "objectives": [
      "Give a customer the standard timeline ranges when asked",
      "Identify what makes a project go fast vs. slow, including connection-method factors",
      "Know who the customer should talk to for project status"
    ],
    "body": "<h3>The standard ranges</h3><p>Phase 1 standard delivery runs roughly 2–10 weeks from CGI completion to live sync, and Phase 2 runs roughly 2–10 weeks after Phase 1 is in production. Total Phase 1 + Phase 2, from contract to fully live, is typically 1–4 months depending on the variables below. A data-sync setup involving non-catalog sources commonly targets 1–8 weeks depending on scope and access.</p><h3>What lands a project at the fast end</h3><ul><li>The customer completes CGI promptly and provides credentials and access on day one</li><li>ERP and CRM instances are standard, supported versions (not heavily customized or hosted by a restricted provider)</li><li>Direction and objects are within standard scope — no custom fields, no non-standard objects</li><li>The source has a reliable modified-date or version field, so CDC can run cleanly</li><li>The customer has clean source data and a clear sense of which fields they want mapped</li><li>The customer assigns a single accountable POC who attends kickoff and stays engaged</li><li>Phase 2 is requested and scoped alongside Phase 1, compressing the overall timeline</li></ul><h3>What lands a project at the slow end</h3><ul><li>CGI is skipped or delayed — nothing else starts until CGI is done, so a customer who sits on it sits on the clock.</li><li>Custom scope — non-standard objects, custom ERP fields, ERP-to-ERP attempts (which Commercient doesn't do), and legacy or unusual ERP versions require work outside the standard catalog, which is scoped and priced separately and takes longer.</li><li>ERP or CRM access issues — IP whitelisting delays, OAuth credential problems (wrong, expired, deactivated, or wrong-environment credentials), and sandbox-vs-production confusion.</li><li>Connection-method setup — waiting on the correct 32-bit ODBC driver and a tested System DSN, a read-only SQL login, or valid API documentation and credentials; and the agent machine not being ready (.NET 4.8, admin rights, outbound HTTPS 443).</li><li>Right Networks / Rightworks (or similar hosted-desktop) hosting — the API is typically blocked by the hosting environment; this must be identified before signing.</li><li>Source data quality — duplicates, inconsistent naming, missing key fields, or years of dirty records slow mapping and often require customer cleanup first.</li><li>Scope changes mid-project — adding objects, changing direction, or shifting requirements requires a re-quote and resets the relevant part of the timeline.</li><li>Running Phase 2 before Phase 1 is signed off — customers who try both at once lose focus and create confusion about which environment each phase is connected to.</li><li>Customer-side stakeholder churn — a POC on leave or an ERP admin who leaves the company stalls the steps that require customer participation.</li></ul><p>Sandbox vs. production must be confirmed — in writing — before implementation begins. If a customer has both a sandbox and a live instance, make sure they and Commercient agree on which one the integration is built against and what the handoff to production looks like. This should be settled during or before CGI, not discovered mid-implementation.</p><h3>Who's on a customer's delivery team</h3><p>For customer-specific project status, the CSM is the primary point of contact. Engineers are coordinated through the CSM, so avoid reaching out to engineers directly, and guide customers to do the same. The CSM owns the customer's delivery experience end to end; partners escalate through their PAM.</p>",
    "takeaways": [
      "2–10 weeks per phase, 1–4 months end-to-end is the standard range.",
      "CGI completion, clean data, standard versions, and a reliable CDC field are the biggest accelerators.",
      "Access and connection-method issues (IP whitelisting, OAuth, DSNs, drivers, hosting restrictions) and sandbox-vs-production ambiguity are leading, preventable delays; the CSM is the single point of contact for status (partners escalate through the PAM)."
    ]
  },
  {
    "id": 18,
    "group": "Reference",
    "title": "Reference materials",
    "time": "2 min",
    "objectives": [
      "Know where to find every supporting asset",
      "Know how to request additional resources from Commercient"
    ],
    "body": "<h3>Resources you have access to</h3><ul><li>www.commercient.com — confirm support for any system combination via search.</li><li>portal.commercient.com (partners) — dashboard, lead submission, Quoting Tool, Active Deals table, Charlie, and the Help Center.</li><li>Charlie (partners) — the Partner AI Assistant, bottom-right of the Portal dashboard.</li><li>www.demo.commercient.ai — the Commercient AI demo tool, runs with your Commercient credentials.</li><li>The click-through walkthrough of the Partner Portal (the Walnut tutorial linked in the live academy).</li><li>The customer success stories library — sortable by CRM, ERP, eCommerce, and industry.</li><li>AI assets — demo script, pricing overview, the Agentic AI one-pager, and the AI glossary (tokens, temperature, MCP, agentic, tool call, hallucination, and more).</li><li>The Data Lake solution overview and the Data Sync customer setup / readiness guide, for scoping data and connection conversations.</li><li>Your Commercient contact — for partners, that's your dedicated PAM, with contact info at the bottom of the Portal dashboard.</li></ul><p>When in doubt, reach out to your Commercient contact — your PAM, if you're a partner, or partners@commercient.com.</p>",
    "takeaways": [
      "The website search and the demo tool are open to everyone; the Portal and Charlie are for partners.",
      "Reference customers are sortable on the website; the Data Lake and setup guides support data and connection scoping.",
      "Your Commercient contact — your PAM, if you're a partner — is there for everything else."
    ]
  },
  {
    "id": 19,
    "group": "Reference",
    "title": "Appendix — Glossary & reference tables",
    "time": "2 min",
    "objectives": [],
    "body": "<p>A quick reference for the terms used throughout this certification.</p><h3>Signal → agent type</h3><table class=\"data-table\"><tr><th>What the customer says</th><th>Possible agent type</th><th>What it can help with</th></tr><tr><td>\"Someone manually pulls this report.\"</td><td>Quote / Gap Report / Accounting</td><td>Recurring reports, gap analysis, next-best-product, reconciliation support</td></tr><tr><td>\"Reps check the ERP before customer calls.\"</td><td>Sales agent</td><td>Order history, inventory, pricing, open quotes, account status</td></tr><tr><td>\"The CFO spends hours on reconciliation.\"</td><td>Accounting agent</td><td>ERP/CRM comparisons, discrepancies, AR follow-up, account flags</td></tr><tr><td>\"Support gets too many order-status questions.\"</td><td>Customer Support agent</td><td>Order status, shipment tracking, account balance, common questions</td></tr><tr><td>\"Leadership wants to see something with AI.\"</td><td>External / Website agent</td><td>A visible AI use case, website experience, lead capture</td></tr><tr><td>\"Our chat tool isn't really staffed.\"</td><td>External / Website agent</td><td>Always-on web support, product questions, lead routing</td></tr></table><h3>Delivery roles</h3><table class=\"data-table\"><tr><th>Role</th><th>What they do</th></tr><tr><td>CSM (Customer Success Manager)</td><td>Owns the customer relationship from onboarding through delivery. The primary contact for status and escalations.</td></tr><tr><td>Installation Engineer</td><td>Connects the agent to the ERP, clones the relevant tables, verifies record counts. Hands off to the Phase 1 team.</td></tr><tr><td>Phase 1 Engineer</td><td>Owns the kickoff meeting, CRM layout training, template selection, field mapping review, error log checks, and Phase 1 sign-off.</td></tr><tr><td>Phase 2 Engineer</td><td>Owns Phase 2 scoping, configuration, live demo, and sign-off. Works with the customer's ERP admin on write-back logic.</td></tr><tr><td>L2 Developer</td><td>Handles anything requiring custom SQL views, non-standard CRM objects, or sync logic beyond the standard template. Assigned by the Phase 1 or Phase 2 engineer.</td></tr></table><h3>Platform glossary</h3><table class=\"data-table\"><tr><th>Term</th><th>What it means</th></tr><tr><td>Commercient Platform</td><td>The umbrella: three connected pieces (AI Platform, Data Lake, Data Integration) sharing one always-current data layer.</td></tr><tr><td>Commercient AI Platform</td><td>Agent hosting and cloud platform, the AI tools/API/webhook platform, and the AI knowledge base, configured in the Commercient AI Portal.</td></tr><tr><td>Commercient Data Lake</td><td>One always-current, governed database per customer that unifies business data and serves it through APIs, AI (MCP), real-time events, and write-back.</td></tr><tr><td>Commercient Data Integration</td><td>The movement layer: the CDC Replicator, the Enterprise System Transactional Integrator, the Enterprise CRM Integrator, and the Point-to-Point Pulse Integrator.</td></tr><tr><td>CDC Replicator (UDC)</td><td>Replicates data into the Data Lake from multiple sources (ODBC, SQL, CSV, SFTP, REST, SOAP, API); includes net-change calculation, GPU hypersync scaling, and data-sync healing.</td></tr><tr><td>Enterprise System Transactional Integrator</td><td>Writes data from the Data Lake into enterprise systems (SAP, Sage, Epicor, NetSuite, Dynamics, Infor…).</td></tr><tr><td>Enterprise CRM Integrator</td><td>Writes data from the Data Lake into CRM and eCommerce systems (Salesforce, HubSpot, Zoho, Microsoft, Adobe Commerce, Magento, Shopify, BigCommerce…).</td></tr><tr><td>Point-to-Point Pulse Integrator</td><td>Pushes data from the Data Lake into thousands of REST API endpoints and webhooks.</td></tr><tr><td>Universal Data Connector (UDC)</td><td>Codeless connectivity to APIs, ODBC, SQL, and files; normalizes source data into a SQL-like model. How non-catalog sources become supported.</td></tr><tr><td>Commercient Agent</td><td>A small program installed on a customer Windows machine that pushes data outbound over HTTPS, so no inbound firewall opening is required.</td></tr><tr><td>ODBC Agent</td><td>A push agent dropped next to a database (including legacy or closed-network systems) to expose its data outbound with no firewall changes.</td></tr><tr><td>CDC (Change Data Capture)</td><td>Syncing only the records that changed since the last run — inserts, updates, and where supported, deletes — instead of reprocessing everything.</td></tr><tr><td>MCP (Model Context Protocol)</td><td>An open standard for how AI applications connect to external data, tools, and workflows. Commercient exposes an AI Platform External MCP Server and a Data Lake External MCP Server.</td></tr><tr><td>AI Platform External MCP Server</td><td>Connects the AI Platform's tools, APIs, and webhooks to a customer's agents and AI harnesses.</td></tr><tr><td>Data Lake External MCP Server</td><td>Opens the Data Lake's governed data to a customer's agents, internal and external.</td></tr><tr><td>Security gate</td><td>The layered controls every surface passes through: scoped keys, per-app/agent permissions, chosen exposure, row-level security, and full audit.</td></tr><tr><td>Row-level security</td><td>Database-enforced rules that trim results to the rows each caller may see — no application code can route around it.</td></tr><tr><td>Agent</td><td>An AI assistant configured for a use case (Sales, Support, Accounting, Quote, Website, etc.) that reasons over connected data and a knowledge base to answer questions and take actions.</td></tr><tr><td>Internal vs. external agent</td><td>Internal agents are staff-facing; external agents are customer-facing (website, portal).</td></tr><tr><td>Knowledge base</td><td>The customer's documents and media (PDFs, manuals, policies, FAQs, catalogs, videos) that ground an agent's answers alongside connected data.</td></tr><tr><td>Usage-based fees</td><td>Metered charges for sync volume (per GB), API/webhook/MCP calls, compute credits, and model tokens; elastic, with caps and a smoothed baseline after a cycle or two.</td></tr><tr><td>Loyalty pricing</td><td>Discounts existing/connected customers may qualify for on nearly every subscription line.</td></tr><tr><td>Annual success fee</td><td>The ongoing support and managed-service component applied on top of the subscription.</td></tr><tr><td>Onboarding hours</td><td>Prepaid blocks of guided setup hours, with a distinct path for each of the three pieces.</td></tr><tr><td>Token</td><td>The unit of text an AI model processes; underlying model usage is billed at current Commercient model rates.</td></tr><tr><td>Outcome</td><td>A completed agent interaction that delivers a result.</td></tr><tr><td>CGI</td><td>Commercient Guided Implementation — the avatar-led, gamified environment where customers configure their integration with live Customer Success support.</td></tr><tr><td>TPAF</td><td>Third Party Authorization Form — how a partner not named in the contract gets authorized to participate in a customer's CGI and project.</td></tr><tr><td>PAM</td><td>Partner Account Manager — the partner's dedicated Commercient contact across deals and escalations.</td></tr><tr><td>CSM</td><td>Customer Success Manager — owns the customer's delivery experience and is the single point of contact for project status.</td></tr></table>",
    "takeaways": []
  }
];

/* ---------- In-module knowledge checks ----------
   Practice questions, client-graded (low stakes — they gate module completion,
   NOT credentials; the certification quiz is graded server-side).
   One scenario per module. c = 0-based correct index.
   Authoring rules: 4 options, no length tell, distractors plausible and never
   negative about Commercient (see HANDOFF §3). */
const CHECKS = {
  "1": {
    "q": "A customer is already connected and running one AI agent. They ask why adding a customer portal later will go faster than their first project did. Which explanation is correct?",
    "a": [
      "Portals are simpler than agents, so any portal project is quicker than any agent project.",
      "The portal runs on a separate data store, so it avoids contention with the existing agent.",
      "The portal reuses data already coalesced in the lake, so the connect-and-coalesce work isn't repeated.",
      "Each new piece re-runs integration, but existing customers get a discount on the repeat work."
    ],
    "c": 2
  },
  "2": {
    "q": "A project needs product and inventory pulled from an on-prem SQL database into the platform, and order confirmations pushed out to Shopify. Which integrators handle these two jobs, in that order?",
    "a": [
      "CDC Replicator for the inbound pull; Enterprise CRM Integrator for the push to Shopify.",
      "Enterprise System Transactional Integrator inbound; Point-to-Point Pulse Integrator to Shopify.",
      "Enterprise CRM Integrator inbound; CDC Replicator for the push to Shopify.",
      "Point-to-Point Pulse Integrator inbound; Enterprise System Transactional Integrator to Shopify."
    ],
    "c": 0
  },
  "3": {
    "q": "An engineer assumes AI agents reach Data Lake data through a looser path than the public API does, since agents are \"internal.\" Which correction fits the model?",
    "a": [
      "Agents face stricter rules than APIs, because MCP traffic is capped separately from REST.",
      "Agents bypass row-level security but are limited to read-only queries on exposed tables.",
      "Agents inherit the permissions of whoever deployed them rather than a scoped key.",
      "APIs, agents, and events pass the same gate — scoped keys and row-level security apply alike."
    ],
    "c": 3
  },
  "4": {
    "q": "What is the difference between the AI Platform External MCP Server and the Data Lake External MCP Server?",
    "a": [
      "The first serves external customer agents; the second serves only internal staff agents.",
      "The first exposes the platform's tools and webhooks; the second exposes the governed Data Lake data.",
      "The first handles inbound calls to agents; the second handles outbound writes to source systems.",
      "The first is for production agents; the second is a staging endpoint used during onboarding."
    ],
    "c": 1
  },
  "5": {
    "q": "A connected customer adds a second ERP data source and a third AI agent. On the subscription, what moves?",
    "a": [
      "Another per-source Data Integration line and another per-agent AI Platform fee are added.",
      "Only the Data Lake fee rises, since the source and agent share the same lake.",
      "The platform fees are unchanged; only usage credits absorb the source and agent.",
      "A new MCP server fee covers the source and a new platform fee covers the agent."
    ],
    "c": 0
  },
  "6": {
    "q": "Which item is billed as metered usage rather than as part of the fixed subscription?",
    "a": [
      "The Data Lake External MCP Server connection.",
      "The per-agent fee for each configured agent.",
      "Compute consumed on agent runs and database queries.",
      "The annual success fee on the platform subscription."
    ],
    "c": 2
  },
  "7": {
    "q": "Which of these would Commercient decline as out of scope?",
    "a": [
      "A monthly one-way feed of ERP invoices into the CRM for 40 users.",
      "A two-way sync between an ERP and a CRM that has custom objects.",
      "A recurring push of eCommerce orders from Shopify into the ERP.",
      "A one-time load of three years of historical orders into the CRM."
    ],
    "c": 3
  },
  "8": {
    "q": "A customer says, \"We need our own developers to build apps directly against our live business data.\" Which Data Lake capability is the direct fit?",
    "a": [
      "The Data Lake External MCP Server for their AI agents.",
      "Instant REST and GraphQL APIs over the exposed data.",
      "Real-time event streams feeding a live dashboard.",
      "A self-service portal governed by row-level security."
    ],
    "c": 1
  },
  "9": {
    "q": "Why is an external (website) agent often the best first AI conversation with a customer?",
    "a": [
      "It's visible and easy to demo, and needs less internal change management to adopt.",
      "It runs on website content alone, so it needs no connected ERP or CRM data.",
      "It's the lowest-cost agent to license, so budget approval is rarely an obstacle.",
      "It removes the need for internal agents in most customer deployments."
    ],
    "c": 0
  },
  "10": {
    "q": "Which statement about Charlie, the Partner AI Assistant, is accurate?",
    "a": [
      "It's a separately licensed assistant Commercient maintains outside the AI Platform.",
      "It forwards each question to the partner's PAM and posts the answer back later.",
      "It's built on the same Commercient AI Platform partners sell, and links its source articles.",
      "It answers only connector questions and hands off anything about process or contracts."
    ],
    "c": 2
  },
  "11": {
    "q": "You don't yet know the exact tables to sync. How do you still produce a reliable ballpark?",
    "a": [
      "Choose Platform License and leave integration points blank until the tables are confirmed.",
      "Enter the right number of integration points per direction, since price scales on count and direction.",
      "Enter every available object so the estimate errs high and can be trimmed later.",
      "Raise the CRM user count to cover the tables you might add during scoping."
    ],
    "c": 1
  },
  "12": {
    "q": "Why is the Speed Race saved for the end of the demo rather than shown first?",
    "a": [
      "It needs the ROI inputs entered earlier in order to calculate the race result.",
      "It's the only segment that requires the customer's own branded site to be loaded.",
      "Running it first would expose the sample data before the industry match is chosen.",
      "By then the customer understands agents and why speed matters, so it lands hardest."
    ],
    "c": 3
  },
  "13": {
    "q": "In the platform story, which correctly describes what each piece does?",
    "a": [
      "Data Integration moves the data, the Data Lake governs and keeps it current, the AI Platform acts on it.",
      "The Data Lake moves the data, Data Integration governs it, the AI Platform stores the knowledge base.",
      "The AI Platform moves the data, the Data Lake hosts the agents, Data Integration serves the APIs.",
      "Data Integration governs the data, the AI Platform keeps it current, the Data Lake pushes the events."
    ],
    "c": 0
  },
  "14": {
    "q": "Why is team enablement treated as part of the value rather than an afterthought?",
    "a": [
      "It's where the knowledge base is first ingested and role-based access is configured.",
      "An agent nobody adopts produces no outcomes, so adoption is what turns setup into results.",
      "It replaces the discovery step for customers who already know their use cases.",
      "Without it the agents cannot connect to the Data Lake through the MCP server."
    ],
    "c": 1
  },
  "15": {
    "q": "How should you describe what CGI does for the economics of an implementation?",
    "a": [
      "It removes the human team from delivery entirely, and that is what lowers the price.",
      "It defers most configuration into Phase 2, spreading the cost across two separate engagements.",
      "It standardizes the best delivery steps, so the project costs far less than a human-led build.",
      "It converts the one-time setup into a recurring fee that customers absorb more easily."
    ],
    "c": 2
  },
  "16": {
    "q": "For an AI agent engagement, where does the responsibility boundary fall?",
    "a": [
      "Commercient curates and fact-checks the knowledge base so the agent's answers are guaranteed.",
      "The customer configures the agent while Commercient supplies and maintains the business documents.",
      "Commercient owns answer accuracy once the documents are ingested and role-based access is set.",
      "Commercient configures and ingests; the customer owns content accuracy and validates the answers."
    ],
    "c": 3
  },
  "17": {
    "q": "Which factor most directly lands a Phase 1 at the fast end of the range?",
    "a": [
      "The customer completes CGI right away and provides working credentials on day one.",
      "The customer has executive sponsorship and budget approved for the current quarter.",
      "The customer plans to add AI agents and a portal once the integration is live.",
      "The customer keeps both a sandbox and a production instance for flexibility."
    ],
    "c": 0
  },
  "18": {
    "q": "Which resource is available to everyone, not only to partners?",
    "a": [
      "Charlie, the AI Assistant on the dashboard.",
      "The system-support search on commercient.com.",
      "The Active Deals table and the Quoting Tool.",
      "The Partner Portal Help Center library."
    ],
    "c": 1
  },
  "19": {
    "q": "Which pairing correctly matches the term to its meaning?",
    "a": [
      "CDC Replicator → pushes Data Lake data out to REST API endpoints and webhooks.",
      "Enterprise CRM Integrator → replicates source data into the Data Lake using the UDC.",
      "Enterprise System Transactional Integrator → writes Data Lake data into ERPs like SAP and NetSuite.",
      "Point-to-Point Pulse Integrator → writes Data Lake data into ERPs like Sage and Epicor."
    ],
    "c": 2
  }
};
MODULES.forEach(m => { m.check = CHECKS[m.id]; });

/* ---------- Gamification config ----------
   XP is DERIVED from progress (never stored) so it stays consistent across
   devices. Levels are earned by certifications — the credential ladder. */
const GAME = {
  xpModule: 50,          // per module completed
  xpCert: 500,           // per certification earned
  // `icon` = name from the ICONS set in app.js (SVG, brand-colored — no emoji).
  levels: [
    { certs: 0, name: "Academy Explorer",       icon: "compass" },
    { certs: 1, name: "Certified Practitioner", icon: "star" },
    { certs: 2, name: "Certified Specialist",   icon: "medal" },
    { certs: 3, name: "Certified Expert",       icon: "trophy" }
  ]
};

const QUIZ = {
  "passMark": 0.8,
  "sections": [
    "The platform and the three pieces",
    "Pricing and packaging",
    "Finding opportunities",
    "The Partner Portal & Quoting Tool",
    "Selling the platform",
    "Delivery, scope, and timelines"
  ],
  "questions": [
    {
      "s": 0,
      "q": "A prospect says, \"Let's just start with integration and worry about the rest later.\" Which framing best reflects the platform?",
      "a": [
        "Integration is a stand-alone product, and the Data Lake and AI each need their own separate integration first.",
        "Lead with AI, because the platform story matters more than the data movement that sits beneath it.",
        "Position Commercient as one platform where connecting the data is the entry point into the Data Lake and AI.",
        "Recommend automation first, because that determines how the underlying integration should be designed."
      ]
    },
    {
      "s": 0,
      "q": "What are the three connected pieces of the Commercient Platform?",
      "a": [
        "The AI Platform, the Data Lake, and Data Integration.",
        "Data integration, self-service reporting, and predictive business analytics.",
        "The CRM, the ERP, and the eCommerce store.",
        "Guided discovery, hands-on onboarding, and ongoing managed services."
      ]
    },
    {
      "s": 0,
      "q": "Why is an already-connected customer described as \"the moat\"?",
      "a": [
        "Each piece keeps its own separate data store, which gives helpful built-in redundancy.",
        "They already have the data foundation for every other piece, with no re-integration work.",
        "The data is encrypted in a way competing vendors can't match at a comparable price.",
        "Integration has to be rebuilt from scratch each time a new piece is added."
      ]
    },
    {
      "s": 0,
      "q": "In the platform architecture, what sits at the center that the other pieces connect to?",
      "a": [
        "The AI Platform's agent host, where the agents actually run.",
        "The Partner Portal, where partners quote and track their deals.",
        "The Commercient Data Lake — one governed, always-current database per customer.",
        "The customer's CRM, their primary system of record."
      ]
    },
    {
      "s": 0,
      "q": "Which integrator brings data INTO the Data Lake?",
      "a": [
        "The CDC Replicator, the Commercient Universal Data Connector.",
        "The Enterprise System Transactional Integrator, which writes out to ERPs.",
        "The Enterprise CRM Integrator, which writes out to CRM systems.",
        "The Point-to-Point Pulse Integrator, which pushes out to webhooks."
      ]
    },
    {
      "s": 0,
      "q": "A customer wants data written from the Data Lake back into SAP and NetSuite. Which integrator fits?",
      "a": [
        "The CDC Replicator.",
        "The Enterprise System Transactional Integrator.",
        "The Enterprise CRM Integrator.",
        "The Data Lake External MCP Server."
      ]
    },
    {
      "s": 0,
      "q": "Which statement about the Universal Data Connector (UDC) is accurate?",
      "a": [
        "It works only with modern cloud systems that expose a public REST API.",
        "It requires the customer to write and maintain custom code to normalize their data.",
        "It replaces the on-premise agent, so no Commercient software runs in the customer's environment.",
        "It gives codeless connectivity to ODBC, SQL, files, and APIs, normalized into a SQL-like model."
      ]
    },
    {
      "s": 0,
      "q": "A customer's 20-year-old ERP sits on a closed network \"nobody may touch.\" What fits best?",
      "a": [
        "The opportunity is disqualified, since a closed-network system simply can't be connected.",
        "The customer must first migrate to a supported cloud ERP before connecting.",
        "Commercient opens an inbound firewall rule and reads the legacy server directly.",
        "The ODBC Agent sits beside the database and pushes data outbound, no inbound firewall needed."
      ]
    },
    {
      "s": 0,
      "q": "Which three features does the Commercient CDC Replicator add on top of basic change capture?",
      "a": [
        "Net-change calculation, automatic GPU hypersync scaling, and data-sync healing.",
        "Nightly full reloads, manual reconciliation, and a separate data warehouse.",
        "Inbound firewall rules, VPN tunnels, and a permanent open port.",
        "One-time migration, deduplication, and record cleansing."
      ]
    },
    {
      "s": 0,
      "q": "How does the Data Lake serve data out, and what protects it?",
      "a": [
        "Three surfaces — APIs, AI through MCP, and real-time events — behind one security gate.",
        "A single nightly batch export, emailed on a fixed schedule to administrators.",
        "Direct database logins, one credential set shared with each connected application.",
        "A shared analytics warehouse that pools many customers' data together for benchmarking."
      ]
    },
    {
      "s": 0,
      "q": "A customer asks how to safely give an AI agent access to Data Lake data. Which matches the security model?",
      "a": [
        "Every agent gets full read access by default, and the customer removes what it shouldn't see.",
        "Each agent gets a scoped key limited to specific entities, fields, and rows, revocable at any instant.",
        "Access is controlled entirely in the application layer, so developers decide what each agent sees.",
        "All data is public within the tenant, and row-level security is applied only on request."
      ]
    },
    {
      "s": 0,
      "q": "What connects a customer's agents to the platform's tools and to the governed data?",
      "a": [
        "A single shared admin password, rotated quarterly and kept in a vault.",
        "Two External MCP Servers — one for the AI Platform, one for the Data Lake.",
        "A nightly CSV export delivered to a shared SFTP folder for pickup.",
        "A direct VPN tunnel opened inbound into the customer's ERP network."
      ]
    },
    {
      "s": 1,
      "q": "How is the platform subscription best described?",
      "a": [
        "A single one-time perpetual license covering all three pieces forever, with no recurring fee.",
        "Pure per-user pricing, matching the CRM User License line shown in the Quoting Tool.",
        "One subscription line per piece — AI Platform, Data Lake, and Data Integration, priced separately.",
        "A single flat monthly fee bundling unlimited agents, sources, and all usage together."
      ]
    },
    {
      "s": 1,
      "q": "Within the AI Platform subscription, what is the main mover of price?",
      "a": [
        "The number of configured AI agents.",
        "The number of CRM seats.",
        "The customer's annual revenue.",
        "The number of ERP tables."
      ]
    },
    {
      "s": 1,
      "q": "How is Commercient Data Integration priced within the subscription?",
      "a": [
        "A single flat fee regardless of how many systems connect.",
        "Per source, per integrator — each connected source carries a recurring fee.",
        "Per CRM user seat, matching the integration Quoting Tool's model.",
        "Only as a one-time setup charge with no recurring component."
      ]
    },
    {
      "s": 1,
      "q": "In the usage model, which set correctly lists metered usage categories?",
      "a": [
        "Sync volume (per GB), API/webhook/MCP calls, compute credits, and model tokens.",
        "Named user seats, account logins, saved dashboards, and exported reports.",
        "Configured agents, connected data sources, project phases, and purchased add-ons.",
        "Support emails, open tickets, scheduled meetings, and outbound calls."
      ]
    },
    {
      "s": 1,
      "q": "A customer worries usage-based pricing will be unpredictable. Best response?",
      "a": [
        "\"Usage is fixed to a single monthly cap you can never exceed or adjust.\"",
        "\"You provision a fixed baseline up front and pay it whether you use it or not.\"",
        "\"You pay for what you use, we build in caps, then smooth it into a predictable baseline.\"",
        "\"Usage pricing can't be estimated, so it stays fully variable for the life of the contract.\""
      ]
    },
    {
      "s": 1,
      "q": "Which customers may qualify for loyalty discounts?",
      "a": [
        "Only brand-new customers signing their first contract.",
        "Existing, already-connected customers, on nearly every subscription line.",
        "Only customers who pay three years upfront.",
        "Only customers who buy all three pieces on day one."
      ]
    },
    {
      "s": 1,
      "q": "How is onboarding delivered?",
      "a": [
        "A single configuration call, after which the whole platform is immediately live.",
        "Prepaid blocks of guided hours, with a distinct path for each of the three pieces.",
        "An open-ended engagement billed hourly, with no clearly defined steps or milestones.",
        "A full migration of the customer's CRM into the Commercient cloud environment."
      ]
    },
    {
      "s": 2,
      "q": "A customer says, \"Finance and sales are using different numbers.\" You have the ERP, CRM, direction, CRM user count, and main objects. Best next step?",
      "a": [
        "Bring Commercient in — that minimum intake is already enough to scope a ballpark.",
        "Wait until every custom field has been fully inventoried before you involve Commercient.",
        "Decline it, since mismatched numbers are a reporting problem rather than an integration problem.",
        "Move straight to CGI, because the basic systems involved are already known."
      ]
    },
    {
      "s": 2,
      "q": "Which of these is a disqualifier — something Commercient does not do?",
      "a": [
        "Recurring movement of ERP data into the CRM.",
        "Recurring movement of eCommerce data into the ERP.",
        "Bidirectional CRM-to-ERP movement.",
        "A one-time CRM data migration."
      ]
    },
    {
      "s": 2,
      "q": "The website search returns no result for a customer's system combination. What is the right read?",
      "a": [
        "Commercient can't support that combination at all, so the opportunity is dead.",
        "It's likely outside the standard catalog but doable via UDC or Pulse — confirm the path.",
        "The customer must first switch to a fully listed ERP before Commercient can help.",
        "Build the quote anyway and let the quoting tool make the final decision."
      ]
    },
    {
      "s": 2,
      "q": "A customer says, \"We just want a live wallboard that updates the second an order lands.\" Which capability fits?",
      "a": [
        "Real-time events from the Data Lake feeding a live operations dashboard.",
        "A one-time reconciliation export pulled manually from the ERP.",
        "A write-back of the orders into the customer's CRM.",
        "The ROI calculator built into the AI demo environment."
      ]
    },
    {
      "s": 2,
      "q": "A customer says, \"We want to put AI on our own data.\" Which is the cleanest match?",
      "a": [
        "The Data Lake, opened to agents through the External MCP Server.",
        "A one-time export of their records to a spreadsheet.",
        "A brand-new CRM to replace all of their existing systems.",
        "A direct ERP-to-ERP integration between the two systems."
      ]
    },
    {
      "s": 2,
      "q": "Which signal-to-agent match is the best fit?",
      "a": [
        "\"Our reps check the ERP before every call.\" → Accounting agent",
        "\"Leadership wants to see something with AI.\" → Sales agent",
        "\"Our helpdesk gets endless where's-my-order questions.\" → Customer Support agent",
        "\"Our website chat just routes to email.\" → Accounting agent"
      ]
    },
    {
      "s": 2,
      "q": "What most distinguishes a Commercient agent from a generic one-system chatbot?",
      "a": [
        "It runs entirely on the CRM vendor's own built-in native AI engine.",
        "It answers only from the content already published on the customer's public website.",
        "It reasons over ERP, CRM, and eCommerce data plus a knowledge base, with role-based access.",
        "It gradually replaces the customer's existing CRM and ERP systems over time."
      ]
    },
    {
      "s": 2,
      "q": "A customer says, \"We already have Agentforce, Breeze, and Zoho AI — maybe that's enough.\" Best response?",
      "a": [
        "\"Right — CRM-native AI completely removes any need for connected ERP data at all.\"",
        "\"Those tools are quite weak, so you should replace them entirely with Commercient AI.\"",
        "\"Hold off on any AI until the integration and your certification are both complete.\"",
        "\"Those are great — each sees one system; Commercient connects your data so they see the full picture.\""
      ]
    },
    {
      "s": 3,
      "q": "You have a question about supported connectors and technical setup details. Best first stop?",
      "a": [
        "The customer's assigned Customer Success Manager.",
        "The L2 developer on a similar recent project.",
        "Charlie, the Partner AI Assistant in the Portal.",
        "The Active Deals table on the dashboard."
      ]
    },
    {
      "s": 3,
      "q": "How does lead submission work in the Partner Portal?",
      "a": [
        "Both the dashboard submission form and emailing your PAM route to exactly the same place.",
        "The form routes to sales while email routes to support, so you must choose carefully.",
        "Leads go to whichever engineer happens to be free first, then back to the PAM.",
        "Only the form counts toward commission; emailed leads are never tracked."
      ]
    },
    {
      "s": 3,
      "q": "Which combination matches the default guidance for a typical integration ballpark?",
      "a": [
        "Platform License with an hourly sync frequency.",
        "Platform License with a weekly sync frequency.",
        "CRM User License with a real-time sync frequency.",
        "CRM User License with M–F twice-per-day frequency."
      ]
    },
    {
      "s": 3,
      "q": "What does the Quoting Tool cover, and what does it not?",
      "a": [
        "It covers integration ballparks; AI, Data Lake, and usage pricing are scoped with Commercient.",
        "It produces final, binding prices for all three pieces of the platform.",
        "It covers AI and Data Lake pricing, but not integration ballparks.",
        "It replaces the need to involve Commercient sales on any deal."
      ]
    },
    {
      "s": 4,
      "q": "Which demo flow matches the recommended sequence?",
      "a": [
        "ROI Calculator → Speed Race → Agent Cards → Internal Agent → External Agent",
        "Internal Agent → External Agent → Speed Race → Agent Cards → ROI Calculator",
        "Agent Cards → ROI Calculator → External Agent → Internal Agent → Speed Race",
        "External Agent → Internal Agent → Agent Cards → ROI Calculator → Speed Race"
      ]
    },
    {
      "s": 4,
      "q": "You're preparing an external-agent demo but the customer's site blocks the embed. Best move?",
      "a": [
        "Pre-flight beforehand and upload a screenshot of the customer's homepage as the background image.",
        "Troubleshoot the embed live on the call until the customer's site finally loads.",
        "Switch to a fully generic demo that carries no customer branding at all.",
        "Skip the external agent entirely and open the whole demo with the Speed Race."
      ]
    },
    {
      "s": 4,
      "q": "How should a partner frame the ROI calculator?",
      "a": [
        "As the precise dollar savings the customer is guaranteed to book in year one.",
        "As evidence that repeated questions and manual lookups carry real cost — framed around capacity.",
        "As a clear reason to reduce headcount once the agents have gone live.",
        "As a substitute for ever bringing the Commercient AI team into the deal."
      ]
    },
    {
      "s": 4,
      "q": "A customer worries that adopting Commercient AI locks them into one AI vendor. Best response?",
      "a": [
        "\"Commercient standardizes on one single frontier model, which guarantees perfectly consistent results.\"",
        "\"You would need to pick one single model up front and then stay on it for the term.\"",
        "\"Commercient is model-agnostic and MCP-compatible, so your connected data can work with the right model for each job.\"",
        "\"Model choice is handled entirely by your CRM-native tool and never by Commercient.\""
      ]
    },
    {
      "s": 4,
      "q": "In the co-presented AI demo model, how are roles divided?",
      "a": [
        "The partner brings the customer relationship and context; Commercient brings the demo and the technical explanation.",
        "The partner runs the technical demo while Commercient mostly observes and then handles pricing.",
        "The CSM leads the entire demo, because delivery should lead all AI presales conversations.",
        "The PAM runs the demo, since partner operations and AI demos are the same function."
      ]
    },
    {
      "s": 4,
      "q": "What is the natural bridge from an integration conversation into the rest of the platform?",
      "a": [
        "Connected data is the foundation that makes AI and every other surface useful.",
        "Lower the integration price to make room in the budget for AI.",
        "Require the customer to buy all three pieces at once.",
        "Replace the CRM-native AI tools they already use."
      ]
    },
    {
      "s": 4,
      "q": "What grounds a Commercient agent's answers?",
      "a": [
        "Connected ERP, CRM, and eCommerce data plus a knowledge base of documents and media.",
        "Only the records that already exist inside the customer's CRM today.",
        "A general AI model that draws on public information rather than the customer's systems.",
        "The partner's own sales collateral, uploaded during discovery."
      ]
    },
    {
      "s": 4,
      "q": "How should a partner position the Commercient Platform in their business?",
      "a": [
        "As a separate product line the partner builds and delivers entirely on their own.",
        "As an addition to the partner's service menu — the partner keeps the customer relationship.",
        "As a referral the partner passes off to Commercient to run from there.",
        "As a platform the partner rebrands under their own name before reselling it."
      ]
    },
    {
      "s": 5,
      "q": "A customer asks what happens right after they sign. Which best fits the training?",
      "a": [
        "They must wait for an engineer-led kickoff before any onboarding work begins.",
        "The partner must first complete a TPAF before the customer can start anything.",
        "They get a welcome email and begin Commercient Guided Implementation (CGI), with live Customer Success.",
        "They start with Phase 2 planning first and then return to CGI later."
      ]
    },
    {
      "s": 5,
      "q": "A partner was not named in the contract but wants to join the customer's CGI. Correct path?",
      "a": [
        "Ask the customer's CSM to add the partner directly onto the project.",
        "Email partners@commercient.com, sign an NDA, and complete the TPAF that Commercient sends.",
        "Request engineer-level access for the partner through the online Help Center.",
        "Wait until Phase 2, since partner access only starts after Phase 1 sign-off."
      ]
    },
    {
      "s": 5,
      "q": "A customer asks Commercient to deduplicate CRM records, redesign pipeline stages, and rewrite pricing logic after data lands. Most accurate?",
      "a": [
        "It is fully in scope, because Commercient owns how the data behaves once it lands.",
        "It is in scope, but only when the integration happens to be bidirectional.",
        "It is all covered automatically under the customer's annual success plan fee.",
        "Mostly out of scope: Commercient owns data movement and mapping; the customer owns cleanup and business logic."
      ]
    },
    {
      "s": 5,
      "q": "Which scenario is most likely to land near the fast end of the standard timeline?",
      "a": [
        "Fast CGI, day-one credentials, standard versions, one accountable POC, and a reliable CDC field.",
        "Strong leadership buy-in and a plan to add AI and automation later.",
        "A clear business reason to integrate, with several departments already identified.",
        "Both systems in daily use, with budget approved earlier this quarter."
      ]
    },
    {
      "s": 5,
      "q": "A customer wants integration configured against QuickBooks hosted by Rightworks. Why flag it early?",
      "a": [
        "Rightworks quietly changes the pricing that applies to the whole project.",
        "Rightworks typically blocks the API, so it must be identified before signing.",
        "QuickBooks projects hosted this way can't use the CGI environment at all.",
        "Rightworks forces every hosted project to begin with Phase 2 work first."
      ]
    },
    {
      "s": 5,
      "q": "A project feels slow and you want an update. Which routing matches the training?",
      "a": [
        "Email the delivery engineers directly, since they're closest to the work.",
        "The PAM personally owns the field mapping and provides all daily status updates.",
        "The CSM is the primary contact for status; the PAM is the partner escalation resource.",
        "The L2 developer becomes the main contact whenever custom work appears."
      ]
    }
  ]
};

/* ----------------------------------------------------------------------
   AGENTIC ENTERPRISE FLUENCY COURSE
   The identity/messaging certification — how to talk about Commercient:
   one pitch, one vocabulary, one posture. Written outward-facing so it
   works for employees, partners, and customers alike.
   NOTE: quiz answer key lives ONLY in quiz_keys (see supabase/upgrade-002.sql).
---------------------------------------------------------------------- */
const FLUENCY_MODULES = [
  {
    id: 1, group: "The Story",
    title: "What Commercient is — in one sentence",
    time: "3 min",
    objectives: [
      "Deliver the one-sentence pitch word for word",
      "Explain what each phrase in the pitch actually claims",
      "Use the plain-English fallback in non-technical conversations",
      "Open every identity statement with what Commercient IS — never a negation"
    ],
    body: `
<p><strong>Commercient is an enterprise AI infrastructure company.</strong> Everything in this course builds on one sentence — the same sentence, said the same way, by every voice that speaks for Commercient:</p>
<div class="callout"><h4>The one-sentence pitch</h4><p><strong>&ldquo;Commercient is the intelligence layer for the agentic enterprise &mdash; a real-time data lake and orchestration platform that lets AI agents read, decide, and act across your entire business, on any system, with any AI.&rdquo;</strong></p></div>
<h3>Unpacking the sentence</h3>
<p>You should be able to defend every phrase in it:</p>
<table class="data-table">
<tr><th>Phrase</th><th>What it's really claiming</th></tr>
<tr><td><strong>Intelligence layer</strong></td><td>We sit beneath the tools a business already runs. We're infrastructure — not another app in the pile.</td></tr>
<tr><td><strong>Agentic enterprise</strong></td><td>A business where AI agents do real operational work — not a business with a chatbot bolted on.</td></tr>
<tr><td><strong>Real-time data lake</strong></td><td>One central, continuously updated place where data from every system lives.</td></tr>
<tr><td><strong>Orchestration platform</strong></td><td>The machinery that builds, schedules, and runs agents — continuously, on demand, or on a trigger.</td></tr>
<tr><td><strong>Any system, any AI</strong></td><td>Pre-connected across the enterprise stack, and never locked to a single AI vendor.</td></tr>
</table>
<h3>The plain-English fallback</h3>
<p>Not every conversation wants the full sentence. When you need the simplest version — a neighbor, a booth visitor with 30 seconds, a non-technical buyer:</p>
<div class="callout"><p><strong>&ldquo;Commercient connects your business's data in real time, so AI agents can act on it safely, everywhere your business runs.&rdquo;</strong></p></div>
<h3>Rule one: lead with what we ARE</h3>
<p>Every identity statement opens with a definitive, positive statement of what Commercient is. Contrast can follow — it never leads.</p>
<div class="two-col">
<div class="col-card is"><h4>Open like this</h4><ul>
<li>&ldquo;Commercient is the intelligence layer for the agentic enterprise.&rdquo;</li>
<li>&ldquo;We're the real-time data lake your whole stack plugs into.&rdquo;</li>
</ul></div>
<div class="col-card isnt"><h4>Never open with</h4><ul>
<li>&ldquo;We're not a chatbot company&hellip;&rdquo;</li>
<li>&ldquo;Unlike other integration vendors&hellip;&rdquo;</li>
<li>&ldquo;We're kind of like X, but&hellip;&rdquo;</li>
</ul></div>
</div>
<p>Why it matters: an opener built on &ldquo;not&rdquo; hands the listener someone else's category to think about. A definitive opener makes Commercient the category.</p>`,
    takeaways: [
      "One sentence, same words, every voice: the intelligence layer for the agentic enterprise",
      "The fallback: we connect data in real time so AI agents can act on it safely",
      "Lead with what we are — the 'not' never opens a sentence"
    ]
  },
  {
    id: 2, group: "The Story",
    title: "Invert the stack",
    time: "3 min",
    objectives: [
      "Contrast the gatekeeper model with the data-lake model",
      "Explain why vendor lock-in is an AI problem, not just a cost problem",
      "Define AI-agnostic with the analogy that lands",
      "Deliver the 90-second version unprompted"
    ],
    body: `
<h3>The old model: one system as gatekeeper</h3>
<p>For twenty years, one system — usually the ERP — sat at the center of the business. Every other tool orbited it, and every new capability arrived as a bolt-on from that same vendor: expensive, slow, and deepening the lock-in with each addition.</p>
<div class="flow">ERP at the center &rarr; every new capability is a bolt-on &rarr; locked to one vendor's roadmap</div>
<p>The hidden cost isn't the license fee. <strong>Locked inside one system, a company can only ever use that vendor's AI</strong> — built for yesterday's version of the product, shipped on someone else's timeline, seeing only the data that one system holds.</p>
<h3>The new model: the lake at the center</h3>
<p>Commercient flips the picture. The data lake becomes the center of gravity, and every application — the ERP included — becomes one more system feeding it and drawing from it.</p>
<div class="flow">Data lake at the center &rarr; ERP, CRM, finance, fulfillment all plug in &rarr; any AI can act on all of it</div>
<h3>AI-agnostic: the payoff of inversion</h3>
<p>Because the data lives independently in the lake, it isn't captive to any vendor's AI. When a better model ships — from Anthropic, OpenAI, or whoever's next — agents point at it immediately. No re-platforming. No waiting on someone else's roadmap.</p>
<div class="callout"><h4>The analogy that lands</h4><p>Being AI-agnostic is like keeping your phone number for life, even when you switch carriers. The number — your data — is yours. The carrier — the AI model — is a choice you stay free to keep making.</p></div>
<h3>Your 90-second version</h3>
<p>Practice this until it's yours:</p>
<div class="callout"><p>&ldquo;For twenty years, one system — usually your ERP — sat at the center of your business, and everything else got bolted on around it, on that vendor's schedule. We flip that: your data becomes the center, living in one place you control, and every application, ERP included, becomes just one more thing plugged into it. That means you're never stuck waiting on one vendor to catch up to whatever AI can do next.&rdquo;</p></div>`,
    takeaways: [
      "Old world: the ERP gatekeeps and every capability is a vendor bolt-on",
      "New world: the data lake is the center of gravity; every system plugs in",
      "Lock-in is an AI problem — one vendor's AI, on their timeline, seeing only their data",
      "AI-agnostic = your data is your phone number; the model is just the carrier"
    ]
  },
  {
    id: 3, group: "The Story",
    title: "Agents, not chatbots",
    time: "3 min",
    objectives: [
      "Draw the line between summarization and action",
      "Name the four ways agents run",
      "Generalize the automation pattern from coders to every operating role",
      "Never self-describe as summarization, insights, or a chatbot"
    ],
    body: `
<h3>Summarization is homework</h3>
<p>A chatbot answers a question. A summarization tool condenses a report. Then both stop — a person still has to read the output, decide, and act. <strong>Text you still have to read isn't intelligence. It's homework.</strong></p>
<h3>An agent takes the next step</h3>
<p>An agent watches data, makes a judgment call within the rules it's been given, and <strong>acts</strong> — updates the record, sends the notification, adjusts the price — then does it again tomorrow without being asked. Agents run four ways:</p>
<ul>
<li><strong>On a schedule</strong> — every morning, every hour</li>
<li><strong>On demand</strong> — when someone asks</li>
<li><strong>On a trigger</strong> — the moment a data condition is met</li>
<li><strong>Continuously</strong> — always on, always watching</li>
</ul>
<h3>Coders got here first</h3>
<p>Software engineers already think in automations: an agent watches system logs all day, notices a database slowing down or a disk filling up, traces it to the root cause, and deploys the fix — or asks permission to — before a human opens a ticket. Every hour of every day.</p>
<h3>Now every operating role gets the same pattern</h3>
<table class="data-table">
<tr><th>Role</th><th>What their agent does</th></tr>
<tr><td>Financial analyst</td><td>Watches portfolio signals and market chatter continuously, cuts the noise, alerts only when action is needed</td></tr>
<tr><td>Warehouse / inventory manager</td><td>Monitors stock at the source and updates availability everywhere downstream the moment it changes</td></tr>
<tr><td>Sales manager</td><td>Flags a deal the moment a risk signal appears — not in next week's pipeline review</td></tr>
<tr><td>Marketing manager</td><td>Watches campaign and revenue data together and reallocates while the campaign is still running</td></tr>
</table>
<h3>The operational choice</h3>
<p>The businesses moving fastest aren't asking AI to describe their data. They've made a different kind of decision: <strong>using AI to run parts of the company.</strong> Those businesses — the ones already moving — are who Commercient builds for.</p>
<div class="callout"><h4>Language lock</h4><p>Commercient never self-describes as &ldquo;summarization,&rdquo; &ldquo;insights,&rdquo; or &ldquo;a chatbot.&rdquo; We build <strong>agents that take action</strong>. Every time, in every sentence.</p></div>`,
    takeaways: [
      "Chatbots and summaries stop at text; agents take the next action",
      "Agents run on a schedule, on demand, on a trigger, or continuously",
      "The automation pattern coders live by now belongs to every operating role",
      "Always 'agents that take action' — never summarization, insights, or chatbot"
    ]
  },
  {
    id: 4, group: "The Platform Language",
    title: "The connective tissue: lake, MCP, orchestration",
    time: "4 min",
    objectives: [
      "Define the data lake, near real-time, and bidirectional in plain English",
      "Explain why stale data quietly turns agents back into summarizers",
      "Explain MCP and agent-to-agent with the email analogy",
      "Know when to say orchestration vs. agent harness"
    ],
    body: `
<h3>The data lake</h3>
<p>One central place where a business's data from every system lives, kept continuously up to date, so anything — a person, a report, an agent — can pull from it. Instead of ten locked filing cabinets in ten different rooms: <strong>one shared room everything flows into.</strong></p>
<div class="callout"><h4>Terminology lock</h4><p>It is always the <strong>data lake</strong> — never &ldquo;data hub&rdquo; or &ldquo;data platform.&rdquo; One term, every voice.</p></div>
<h3>Near real-time — and why agents die without it</h3>
<p>Near real-time means a change anywhere in the stack — a new order, a stock movement, a deal stage — shows up in the lake within seconds or minutes, not on an overnight batch. Like a GPS that reroutes you the moment traffic appears, not one showing last hour's map.</p>
<div class="callout"><h4>Why it matters for agents specifically</h4><p>An agent acting on day-old data is making decisions about a world that no longer exists — approving a shipment against stock that already sold out. Without near real-time, agents quietly degrade back into the thing we position against: summarizing yesterday.</p></div>
<p>And say <strong>near real-time</strong>, not &ldquo;real-time&rdquo; — it's the accurate claim, and accuracy is authority.</p>
<h3>Bidirectional: reading is only half the story</h3>
<p>Data flows into the lake — and flows back out. Agents and users can <strong>write changes to any connected system</strong> in near real time via API. A change can be triggered by a person, by a software program, by a record changing, or by another agent — and every one of those pathways is governed and secured (next module).</p>
<h3>MCP — the shared language of agents</h3>
<p><strong>MCP (Model Context Protocol)</strong> is the standard that lets AI agents built by completely different companies talk to each other.</p>
<div class="callout"><h4>The analogy that lands</h4><p>Think of email: Gmail and Outlook are different products from different companies, but they message each other because they agree on a common standard. MCP does that for agents.</p></div>
<h3>Agent-to-agent</h3>
<p>One company's agent handing work directly to another company's agent — no person relaying in between. A customer's AI reports a shipment delay; Commercient's agent updates the record and notifies the rep. No email chain, no swivel-chair.</p>
<h3>Orchestration — the agent harness</h3>
<p>The system that decides which agents run, when, in what order — and keeps them from colliding. <strong>An air traffic controller, for agents.</strong> With prospects, say <em>orchestration</em>; save &ldquo;agent harness&rdquo; and &ldquo;agentic workflows&rdquo; for technical audiences — in a 90-second conversation they're jargon.</p>`,
    takeaways: [
      "Data lake: one shared room, not ten locked filing cabinets — and always 'data lake'",
      "Near real-time keeps agents deciding about the world as it is — stale agents become summarizers",
      "Bidirectional: the lake reads from AND writes back to every connected system",
      "MCP is email-for-agents; orchestration is air traffic control for agents"
    ]
  },
  {
    id: 5, group: "The Platform Language",
    title: "Trust and the moat",
    time: "3 min",
    objectives: [
      "Answer 'will my data be sent to OpenAI?' precisely, word for word",
      "Explain governance and permissioning with the badge-and-camera analogy",
      "Tell the 150+ connector moat as a story, not a statistic",
      "Keep Snowflake and Databricks a partnership story"
    ],
    body: `
<h3>The question every enterprise buyer asks</h3>
<p>Sooner or later — usually sooner — a buyer asks: <strong>&ldquo;Will my data be sent to OpenAI?&rdquo;</strong> The fluent answer is precise, and worth knowing cold:</p>
<div class="callout"><h4>The answer</h4><p>&ldquo;No, by default. Your data lands in your data lake first, under your control. Commercient decides — per field, per policy — exactly what any AI model, Anthropic, OpenAI, or otherwise, is allowed to see. Everything else stays governed and logged inside the lake. You choose what an agent can see and do, and every action it takes is auditable.&rdquo;</p></div>
<h3>Governance and permissioning</h3>
<p>Every read, every write, every trigger — whether initiated by a person, a software system, or an agent — is controlled, permissioned, and logged at the corporate level. Think of it as <strong>a security badge that only opens certain doors, plus a camera log of who went where.</strong></p>
<p>This isn't fine print — it's a differentiator. Enterprise buyers are nervous about handing proprietary data directly to AI labs. The lake is the governed intermediary: it surfaces exactly what's needed, and nothing more ever leaves.</p>
<h3>The moat: 150+ systems, already connected</h3>
<p>The statistic: Commercient arrives pre-connected to 150+ ERPs — and through them, the full enterprise stack behind them: sales, invoicing, fulfillment, finance. The story:</p>
<div class="callout money"><strong>It normally takes a systems integrator six to twelve months — and six figures — to wire one system into a modern data platform. We've already done it across 150+ systems. When you plug in, you're not starting an integration project; you're switching on something that already reaches your whole business.</strong></div>
<p>No competitor starts from that position. That's what an enterprise moat means: an advantage that took years to build and can't be shortcut.</p>
<h3>&ldquo;We already have Snowflake / Databricks&rdquo;</h3>
<p>Great — those are powerful, general-purpose platforms, and this stays a <strong>partnership story</strong>. With them, you build the connectors, the sync logic, and the agent layer yourself, over months. Commercient arrives pre-connected, with the orchestration layer on top — and can <em>feed</em> those platforms rather than replace them.</p>`,
    takeaways: [
      "'No, by default' — your data lands in your lake, policy decides what any model sees, everything is auditable",
      "Governance = a security badge for agents plus a camera log of everything they did",
      "150+ pre-built connections is a story about switching on vs. starting a project",
      "Snowflake and Databricks are a partnership story — we can feed them, not fight them"
    ]
  },
  {
    id: 6, group: "Speaking For Commercient",
    title: "How we talk: posture and vocabulary",
    time: "3 min",
    objectives: [
      "Never frame another platform as weak, behind, or losing — and know why",
      "Use the agent-to-agent opportunity framing instead",
      "Name only Anthropic and OpenAI when the AI landscape comes up",
      "Lock in the say-this-not-that vocabulary"
    ],
    body: `
<h3>Play nicely — always</h3>
<p>Commercient never frames another platform as weak, behind, or losing. Not because it's polite — because negativity backfires. A partner or rep who hears &ldquo;their AI is weak&rdquo; translates it as <em>this company is competing with the platform my business is built on</em> — and the conversation is over before it starts.</p>
<div class="two-col">
<div class="col-card is"><h4>Say</h4><ul>
<li>&ldquo;You deserve to be AI-agnostic and future-proof.&rdquo;</li>
<li>&ldquo;We make every system in your stack smarter.&rdquo;</li>
<li>&ldquo;Anthropic. OpenAI.&rdquo;</li>
</ul></div>
<div class="col-card isnt"><h4>Not</h4><ul>
<li>&ldquo;Their AI is locked-in and weak.&rdquo;</li>
<li>&ldquo;We're better than your CRM or ERP.&rdquo;</li>
<li>Naming small point tools as our comparison set</li>
</ul></div>
</div>
<h3>The opportunity framing</h3>
<p>Platform leaders across the industry are publicly describing a future where their AI talks to other companies' AI. That vision needs something to talk <em>to</em>. Commercient makes the rest of a company's stack — the ERP, the warehouse, the finance system — legible and actionable to any outside agent.</p>
<div class="callout"><p><strong>&ldquo;We're what makes the industry's agent-to-agent vision possible for everything beyond any one platform.&rdquo;</strong> That's a node in their ecosystem — not a threat to it.</p></div>
<h3>Name only the labs that matter</h3>
<p>When the AI landscape comes up, reference <strong>Anthropic and OpenAI</strong> — the two labs that matter at enterprise scale. Naming smaller point tools drags Commercient's perceived authority down to their level. We operate at the top of the stack; we name the top of the stack.</p>
<h3>The locked vocabulary</h3>
<table class="data-table">
<tr><th>Always say</th><th>Never say</th></tr>
<tr><td>Data lake</td><td>Data hub, data platform</td></tr>
<tr><td>Near real-time</td><td>&ldquo;Real-time&rdquo; (overclaims)</td></tr>
<tr><td>Agent / AI agent</td><td>Bot, assistant, chatbot</td></tr>
<tr><td>Orchestration (prospects) &middot; agent harness (technical)</td><td>&ldquo;Agentic workflows&rdquo; in a 90-second conversation</td></tr>
<tr><td>Agents that take action</td><td>Summarization, insights</td></tr>
</table>
<h3>Put it together</h3>
<p>Fluency is the whole game: one pitch, one vocabulary, one posture — positive, precise, and the same from every voice. When everyone says it the same way, every conversation any of us has builds on the last one.</p>
<div class="callout"><h4>Your fallback, one more time</h4><p><strong>&ldquo;Commercient connects your business's data in real time, so AI agents can act on it safely, everywhere your business runs.&rdquo;</strong></p></div>`,
    takeaways: [
      "Never weak/behind/losing — reframe every platform as an opportunity to make smarter",
      "We enable the industry's agent-to-agent vision; we don't compete with it",
      "Only Anthropic and OpenAI — naming point tools lowers our authority",
      "One pitch, one vocabulary, one posture, every voice"
    ]
  }
];

// Per-module knowledge checks (client-graded practice — the certification
// quiz key stays server-side). New fluency module = add a check here.
// AUTHORING RULES: (1) all four options must be similar in length — a longer,
// more polished option is a giveaway; (2) distractors are plausible and
// positive in tone — never a statement that puts a negative thought about
// Commercient (or anyone) in the learner's mind.
const FLUENCY_CHECKS = {
  1: { q: "A prospect at a partner event asks, \"So what does Commercient actually do?\" Which opener is fluent?",
       a: ["\"We're not a chatbot company, and we're not really an integration vendor either — honestly, it's easier to show you than to tell you.\"",
           "\"Commercient is the intelligence layer for the agentic enterprise — we connect your data in real time so AI agents can act on it across your whole business.\"",
           "\"You know how Snowflake and Databricks work? We're in that same family of platforms, so whatever you'd use those for, we can help with too.\"",
           "\"We're an integration company at heart — we move data between your ERP and CRM so your teams always see accurate, up-to-date numbers.\""], c: 1 },
  2: { q: "A prospect says: \"Our ERP vendor says their built-in AI has us covered.\" The fluent response?",
       a: ["\"That's great — if AI already comes bundled with the ERP, you're most likely set, and layering anything else on top would mostly duplicate what that vendor is already planning to ship.\"",
           "\"It may well! And it can only see what lives inside the ERP. With your data in a lake, that same AI — and any model you choose next — can act on your whole business.\"",
           "\"The smart move is usually to wait a year or two, watch what the ERP vendor actually releases, and then decide together whether anything more is even needed on top.\"",
           "\"Built-in AI is a strong start — the key next step is upgrading to that vendor's premium tier so its assistant can reach even more of the data you already have.\""], c: 1 },
  3: { q: "What separates an agent from a chatbot?",
       a: ["An agent is built on a larger, more capable AI model, so it can answer far more detailed questions than a chatbot can",
           "Chatbots handle conversations with customers, while agents are used for technical work like moving records between systems",
           "A chatbot answers and stops; an agent takes the next step and can keep working — on a schedule, a trigger, or continuously",
           "They're two names for the same capability — the industry simply uses whichever term sounds right for the audience"], c: 2 },
  4: { q: "Why does near real-time matter so much for agents?",
       a: ["An agent acting on day-old data is deciding about a world that no longer exists — stale agents degrade into summarizers",
           "Fresh data keeps dashboards and reports current, which makes weekly business reviews faster and more productive for leadership",
           "Most data-governance frameworks require systems of record to reconcile within a fixed window, and near real-time keeps you inside it",
           "Moving data continuously in small increments is more efficient than overnight batches, which keeps infrastructure costs predictable"], c: 0 },
  5: { q: "A buyer asks: \"Will my data be sent to OpenAI?\" The fluent answer begins:",
       a: ["\"Yes — for agents to be useful the models do need to see your data, and the major labs all maintain strong privacy protections on their side.\"",
           "\"Nothing to worry about there — we put a thorough non-disclosure agreement in place before any project kicks off, and that covers exactly this.\"",
           "\"Your data is encrypted from end to end, so even when a model processes it, nobody can ever actually read the underlying contents.\"",
           "\"No, by default — your data lands in your lake, under your control, and policy decides exactly what any model is allowed to see. Every agent action is logged and auditable.\""], c: 3 },
  6: { q: "Which two AI companies do we reference when the landscape comes up, and why?",
       a: ["Whichever AI tools the prospect already knows and uses — meeting them where they are keeps the conversation comfortable and familiar",
           "As broad a range as possible — showing familiarity with the whole tool landscape demonstrates that we've done our homework",
           "Anthropic and OpenAI — the two labs that matter at enterprise scale; naming small point tools lowers our own authority",
           "None by name — staying vendor-neutral means never referencing an outside AI company in a sales conversation"], c: 2 }
};
FLUENCY_MODULES.forEach(m => { m.check = FLUENCY_CHECKS[m.id]; });

// Certification quiz — questions/options ONLY. The answer key lives in the
// quiz_keys table (seeded by supabase/upgrade-002.sql), never in the client.
const FLUENCY_QUIZ = {
  passMark: 0.8,
  sections: [
    "Identity & the Inverted Stack",
    "Agents & the Platform",
    "Trust, Posture & Vocabulary"
  ],
  questions: [
    { s:0, q:"Which statement is Commercient's identity, as every voice should deliver it?",
      a:["An AI consulting firm that helps mid-market businesses evaluate, select, and roll out the right mix of AI tools for their specific industry",
         "The intelligence layer for the agentic enterprise — a real-time data lake and orchestration platform that lets AI agents read, decide, and act across the business",
         "An AI assistant that lives inside your CRM and ERP, answering your team's questions and drafting content wherever they already spend the workday",
         "A data-migration specialist that helps growing businesses move off legacy ERP systems and onto modern cloud platforms quickly, safely, and with minimal downtime"] },
    { s:0, q:"\"Inverting the enterprise stack\" means:",
      a:["Upgrading from an older on-premise ERP to a modern cloud CRM as the primary system of record for the business",
         "Consolidating every tool a company runs into a single vendor's integrated suite so everything works together out of the box",
         "Making the data lake the center of gravity, with the ERP and every other system feeding it — no single vendor gatekeeping",
         "Reversing the usual rollout order — deploying AI and analytics first, then connecting the underlying business systems afterward"] },
    { s:0, q:"Why is vendor lock-in an AI problem, not just a licensing problem?",
      a:["Locked into one system means locked into that vendor's AI — built on their timeline, seeing only the data that system holds",
         "Because each additional system a company licenses adds integration overhead that compounds as the stack grows over time",
         "Because AI capabilities are usually sold as separate add-on modules, which makes total cost harder to predict year over year",
         "Because single-vendor systems tend to release updates on a slower cycle than fast-moving businesses need for planning"] },
    { s:0, q:"For a customer, being AI-agnostic means:",
      a:["The platform continuously benchmarks all of the leading AI models on every task and automatically routes each job to whichever model scores best that day",
         "Everyone on their team can work productively with AI tools, regardless of which department, role, or level of technical background they happen to come from",
         "Their vendor agreement builds in the flexibility to renegotiate which AI features and capabilities are included every time the annual contract comes up for renewal",
         "Their data lives independently in the lake, so any model — Anthropic, OpenAI, or whatever ships next — can be plugged in and swapped at any time"] },
    { s:1, q:"The difference between an agent and a chatbot:",
      a:["Agents are built on the newest generation of frontier AI models, while chatbots typically run on earlier, lighter-weight versions of the same technology",
         "A chatbot answers and stops; an agent takes the next action — on its own or with permission — and can keep working on a schedule, a trigger, or continuously",
         "Chatbots specialize in customer-facing conversations on a company's website, while agents are built for the internal workflows that employees run behind the scenes",
         "The two terms describe essentially the same underlying technology — which word a company chooses to use is mostly a branding and marketing decision"] },
    { s:1, q:"Why does near real-time matter for agents specifically?",
      a:["It keeps every dashboard and report current, which makes leadership reviews faster and decisions easier to align across teams",
         "It lets new team members learn from live examples of the business while onboarding instead of studying older training material",
         "An agent acting on stale data is deciding about a world that no longer exists — without fresh data, agents degrade into summarizing yesterday",
         "It allows agents to batch their work more efficiently, since smaller increments of data are cheaper and faster to process"] },
    { s:1, q:"What problem does MCP (Model Context Protocol) solve?",
      a:["It gives agents built by different companies a shared standard to talk to each other — the way email works across Gmail and Outlook",
         "It compresses the data inside the lake so large enterprises can store years of business history affordably and query it fast",
         "It gives every agent a shared long-term memory, so context gathered in one conversation carries over into all the next ones",
         "It certifies that an AI model has passed enterprise security review before agents in the business are allowed to use it"] },
    { s:1, q:"The Commercient data lake is \"bidirectional.\" That means:",
      a:["The lake maintains two synchronized copies of every record, so an outage in one region never interrupts the business",
         "Data can be read by both people and agents, with each getting their own permission levels and separate audit trails",
         "Every sync runs in two passes — one to collect the changes and one to validate them before anything is committed",
         "Data flows in from every connected system, and agents and users can write changes back out to those systems in near real time"] },
    { s:2, q:"A buyer asks, \"Will my data be sent to OpenAI?\" The fluent answer begins:",
      a:["\"Yes — the models need broad access to your data to be effective, and the major labs maintain strong privacy protections on their side.\"",
         "\"No, by default — your data lands in your lake under your control, and policy decides exactly what any model sees. Every agent action is logged and auditable.\"",
         "\"That depends entirely on which AI provider you select, so it's a question best directed to Anthropic or OpenAI themselves.\"",
         "\"Your data is encrypted from end to end, so even the models that process it can never actually read the underlying contents.\""] },
    { s:2, q:"A prospect brings up their CRM's built-in AI. The correct posture:",
      a:["Position our platform as the natural upgrade — one AI layer across the whole business beats separate AI inside every tool",
         "Recommend running both side by side for a quarter, then standardizing on whichever one the team reaches for most often",
         "\"We make every system in your stack smarter — your CRM's AI included — because it can finally see and act on your whole business.\"",
         "Focus the conversation on the systems their CRM doesn't cover, since that's where the clearest opportunity will show up"] },
    { s:2, q:"When the AI landscape comes up, which companies does Commercient name, and why?",
      a:["The full landscape — walking through all the major tools shows prospects that we've genuinely done our homework on the market",
         "Anthropic and OpenAI — the two labs that matter at enterprise scale; that's the level we operate and compete at",
         "The tools closest to the prospect's own stack, so that every reference feels immediately familiar and relevant to them",
         "It depends on the audience — technical buyers get the full list, while executives hear only the biggest household names"] },
    { s:2, q:"Which self-description is off-limits for Commercient — in any setting?",
      a:["\"A summarization tool that surfaces insights\"",
         "\"The intelligence layer for the agentic enterprise\"",
         "\"A real-time, bidirectional data lake\"",
         "\"Agents that take action across your business\""] }
  ]
};

/* ----------------------------------------------------------------------
   COMMERCIENT PORTAL COURSE
   Working knowledge of the Commercient portal (portal.commercient.com) —
   built from J.J.'s recorded walkthrough. Written for BOTH partners and
   customer admins; partner-only areas are explicitly flagged in callouts.
   Screenshots live in assets/portal/ — each <figure class="shot"> shows a
   styled placeholder with its exact filename until the PNG is added.
   NOTE: quiz answer key lives ONLY in quiz_keys (see supabase/upgrade-003.sql).
---------------------------------------------------------------------- */
const PORTAL_MODULES = [
  {
    id: 1, group: "Getting Around",
    title: "Signing in and finding your way",
    time: "3 min",
    objectives: [
      "Sign in at portal.commercient.com with two-step authentication",
      "Read the My Dashboard summary at a glance",
      "Navigate with the Commercient logo and the three resource groups",
      "Know which parts of the portal are shared vs. partner-specific"
    ],
    body: `
<h3>Where and how you sign in</h3>
<p>The portal lives at <strong>portal.commercient.com</strong>. You sign in with your username and password, and the first time in you'll set up an authentication step on your phone — a one-time code that keeps the account protected even if a password leaks.</p>
<figure class="shot"><img src="assets/portal/01-login.png" alt="The portal sign-in page" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/01-login.png</code></span><figcaption>The sign-in page at portal.commercient.com — username, password, then the phone authentication step.</figcaption></figure>
<div class="callout"><h4>Partner portal vs. customer panel</h4><p>This course covers the <strong>partner portal</strong>. Customers work in their own <strong>customer panel</strong> — a different interface with its own menus, covered in the <strong>Commercient Customer Panel Certification</strong>. The underlying <em>concepts</em> carry over (projects, sync health, tickets, usage, alerts), but the screens differ, and some areas here are partner-only (leads, quoting, Active Deals, commissions). If you're a customer admin, take the Customer Panel course; if you're a partner, read on.</p></div>
<h3>My Dashboard: the summary view</h3>
<p>The landing page is <strong>My Dashboard</strong>. For partners it shows source leads, shared customers, earned commission, and client referrals from Commercient. For everyone, the heart of it is the <strong>company list</strong> — each company you work with, alongside its ERP, its CRM (Salesforce, for example), the database type, the database server, and whether it's active.</p>
<figure class="shot"><img src="assets/portal/02-dashboard.png" alt="My Dashboard" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/02-dashboard.png</code></span><figcaption>My Dashboard — summary tiles up top, the company list with ERP / CRM / database / status below.</figcaption></figure>
<h3>Getting around</h3>
<p>Wherever you are, <strong>selecting the Commercient logo returns you to the main page.</strong> From there, the portal groups its tools three ways:</p>
<table class="data-table">
<tr><th>Group</th><th>What lives there</th></tr>
<tr><td><strong>Pre-sales resources</strong></td><td>Find Your Integration, register a lead, Active Deals, the Quoting Tool <em>(partner-specific)</em></td></tr>
<tr><td><strong>Post-sales resources</strong></td><td>Customers and each customer's project view</td></tr>
<tr><td><strong>Support</strong></td><td>My Tickets, creating a ticket, the Help Center</td></tr>
</table>`,
    takeaways: [
      "portal.commercient.com — username, password, and a phone authentication step",
      "My Dashboard: summary tiles plus the company list with ERP, CRM, database, and status",
      "The Commercient logo always takes you back to the main page",
      "Three groups: pre-sales, post-sales, and support — pre-sales is the partner-specific zone"
    ]
  },
  {
    id: 2, group: "Winning Work",
    title: "Pre-sales tools: leads, deals, and quotes",
    time: "3 min",
    objectives: [
      "Check whether a customer's system pair is supported with Find Your Integration",
      "Submit a lead to Commercient from the portal",
      "Track where submitted deals stand in Active Deals",
      "Build an estimate with the Quoting Tool — and know what happens to it next"
    ],
    body: `
<div class="callout"><h4>Partner-specific module</h4><p>These tools are unique to the partner portal — customers won't see them in their panel. If you're a customer admin, this is a quick read for context on what your partner does on your behalf; the Customer Panel Certification covers your own screens.</p></div>
<h3>Find Your Integration</h3>
<p>Before scoping anything, confirm the customer's system combination is supported. <strong>Find Your Integration</strong> in the pre-sales group is the fastest check — search the ERP/CRM pair and see what's available.</p>
<h3>Submit a lead</h3>
<p>Have a customer for Commercient? The <strong>Submit a Lead</strong> form is right on the dashboard — fill in the customer's details and it goes straight to the Commercient team. From then on you can watch it move in Active Deals.</p>
<figure class="shot"><img src="assets/portal/04-submit-lead.png" alt="Submit a lead form" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/04-submit-lead.png</code></span><figcaption>Submit a Lead — fill it out and the Commercient team takes it from there.</figcaption></figure>
<h3>Active Deals</h3>
<p>Wondering where a submitted deal stands? <strong>Active Deals</strong> is the source of truth — no need to email and wait for a reply.</p>
<h3>The Quoting Tool</h3>
<p>The <strong>Quoting Tool</strong> builds a ballpark: fill out the fields and it produces an <strong>estimate</strong>. Two things to hold onto:</p>
<ul>
<li>It's an estimate, not a final price — useful for setting expectations on the spot.</li>
<li>Once you create a quote, it's sent to the <strong>Commercient sales team</strong>, who confirm the details and finalize it with you.</li>
</ul>
<figure class="shot"><img src="assets/portal/03-quoting-tool.png" alt="The Quoting Tool" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/03-quoting-tool.png</code></span><figcaption>The Quoting Tool — fill the fields for an estimate; sales confirms and finalizes every quote.</figcaption></figure>`,
    takeaways: [
      "Find Your Integration answers 'is this system pair supported?' before you scope",
      "Submit a Lead sends a customer straight to Commercient; Active Deals shows where it stands",
      "The Quoting Tool produces an estimate — the sales team confirms and finalizes every quote",
      "Customer admins: these are partner-view tools — your partner works them for you"
    ]
  },
  {
    id: 3, group: "Running Projects",
    title: "Customers and project status",
    time: "3 min",
    objectives: [
      "Find every customer you work with under post-sales resources",
      "Read a project's current stage, timeline, and status",
      "Name the onboarding steps a project moves through",
      "Know where Phase 2 appears when it's in scope"
    ],
    body: `
<h3>The Customers view</h3>
<p>Under post-sales resources, <strong>Customers</strong> lists every customer you have with Commercient. Select one and you're looking at their world — starting with the project.</p>
<figure class="shot"><img src="assets/portal/05-customers.png" alt="Customers list" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/05-customers.png</code></span><figcaption>Customers — everyone you work with, one click from their project detail.</figcaption></figure>
<h3>Project status: the page that answers "where are we?"</h3>
<p>The <strong>project status</strong> view shows, per customer: the <strong>current stage</strong> (for example, CGI onboarding), the <strong>estimated timeline</strong>, the integration, and the overall status. This is the page that replaces a status-check email.</p>
<figure class="shot"><img src="assets/portal/06-project-status.png" alt="Project status page" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/06-project-status.png</code></span><figcaption>Project status — current stage, estimated timeline, integration, and status per customer.</figcaption></figure>
<h3>The onboarding steps</h3>
<p>Each project walks through its steps in order, and the portal records <strong>when each one started and finished</strong>:</p>
<div class="flow">Registration &amp; installation &rarr; Phase 1 sandbox execution &rarr; Final project sign-off &amp; delivery</div>
<p>If the project includes a <strong>Phase 2</strong> (writing data back to the ERP), it appears here as its own tracked step as well.</p>
<div class="callout"><h4>Why this matters</h4><p>Every status question you can answer yourself from this page — "what stage are we in?", "when did Phase 1 start?", "are we on schedule?" — is a faster answer than any email thread, and it makes you the best-informed person in the room.</p></div>`,
    takeaways: [
      "Customers (post-sales) lists everyone you work with — select one to open their project",
      "Project status shows current stage, estimated timeline, integration, and status",
      "Steps run: registration & installation → Phase 1 sandbox execution → final sign-off & delivery, each with start/finish dates",
      "Phase 2 appears as its own tracked step when it's in scope"
    ]
  },
  {
    id: 4, group: "Running Projects",
    title: "The company dashboard: sync health and configuration",
    time: "3 min",
    objectives: [
      "Read a company's dashboard: sync status, percent complete, tasks, failed records",
      "Use the audit trail to see what changed and when",
      "Find sync history and logs in the Phase 1 configuration (and Phase 2's own views)",
      "Know what lives in the utility menu — including the AI tools"
    ],
    body: `
<h3>Select a company, get its dashboard</h3>
<p>From the logo menu, select a company and you land on that customer's dashboard — the health check for the whole integration:</p>
<ul>
<li><strong>Sync status</strong> — is the sync active?</li>
<li><strong>Project status</strong> — how many percent complete</li>
<li><strong>Tasks</strong> — anything waiting on the customer</li>
<li><strong>Failed sync records</strong> — for Phase 1 and Phase 2, right up front</li>
</ul>
<figure class="shot"><img src="assets/portal/07-company-dashboard.png" alt="A company dashboard" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/07-company-dashboard.png</code></span><figcaption>A company's dashboard — sync status, percent complete, customer tasks, and failed records for both phases.</figcaption></figure>
<h3>The audit trail</h3>
<p>The dashboard also records the <strong>actions taken in the account</strong> — if something changes in the CRM, it shows up here. Think of it as a watermark: when you need to know what changed and when, this is where you look.</p>
<h3>Sync history and logs</h3>
<p>For the deep view, open the <strong>Phase 1 ERP-to-CRM configuration</strong> — it holds the <strong>sync history</strong> and <strong>sync logs</strong>, plus how many times data synced and how much moved. Phase 2 has its own equivalent views and its own <strong>Phase 2 portal</strong>.</p>
<figure class="shot"><img src="assets/portal/08-sync-logs.png" alt="Sync history and logs" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/08-sync-logs.png</code></span><figcaption>Phase 1 configuration — sync history and logs; Phase 2 has its own views.</figcaption></figure>
<h3>The utility menu — and the AI tools</h3>
<p>In the left-hand corner of the screen sits the utility menu. Two things to know:</p>
<ul>
<li><strong>Connection Manager</strong> — visible, but managed by Commercient; you won't be editing connections yourself.</li>
<li><strong>AI tools</strong> — API keys, JobQueue, the request dashboard, knowledge space, help desk, Content Hub, <strong>MCP servers</strong>, actions, and settings. This is where the agentic platform surfaces inside the portal.</li>
</ul>
<figure class="shot"><img src="assets/portal/09-ai-tools.png" alt="The AI tools menu" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/09-ai-tools.png</code></span><figcaption>The utility menu's AI tools — API keys, JobQueue, knowledge space, Content Hub, MCP servers, and more.</figcaption></figure>
<div class="callout"><h4>Connect the dots</h4><p>Those MCP servers and agent tools are the same platform you learned to talk about in the <strong>Agentic Enterprise Fluency</strong> course — this menu is where that story becomes something you can point at in a live account.</p></div>`,
    takeaways: [
      "A company's dashboard answers: sync active? percent complete? tasks open? records failing?",
      "The audit trail records account actions — CRM changes show up there",
      "Sync history and logs live in the Phase 1 configuration; Phase 2 has its own views and portal",
      "The utility menu holds Connection Manager (Commercient-managed) and the AI tools, including MCP servers"
    ]
  },
  {
    id: 5, group: "Staying Informed",
    title: "Usage and accounting",
    time: "2 min",
    objectives: [
      "Find the usage information under the Accounting tab",
      "Read the usage numbers that matter — data, users, and top tables",
      "Know where the customer's contract is attached",
      "Understand how the partner view differs from the customer panel here"
    ],
    body: `
<h3>The Accounting tab</h3>
<p>One clearly documented difference between the two views: in the <strong>partner portal</strong>, the Accounting tab shows <strong>usage information</strong> (the customer panel carries additional accounting detail on the customer's own side).</p>
<h3>What the usage view tells you</h3>
<table class="data-table">
<tr><th>Number</th><th>Why you'd look</th></tr>
<tr><td>Report run dates &amp; data usage</td><td>Is the customer actually using what they bought?</td></tr>
<tr><td>CRM org ID &amp; user counts</td><td>The account's shape — including counts by user type and real-time CRM user information</td></tr>
<tr><td>Top 20 tables by data consumed</td><td>Where the data volume actually goes — the first place to look when usage jumps</td></tr>
<tr><td>Sales orders moved to external systems</td><td>Proof the integration is doing revenue-touching work</td></tr>
</table>
<figure class="shot"><img src="assets/portal/10-usage.png" alt="Usage information" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/10-usage.png</code></span><figcaption>Accounting → usage information — run dates, data usage, user counts, and the top 20 tables.</figcaption></figure>
<h3>The contract</h3>
<p>The customer's <strong>contract is attached under the Accounting tab</strong> as well — when a scope or renewal question comes up, you don't have to hunt through email for the source document.</p>
<div class="callout"><h4>Why partners check this monthly</h4><p>Usage tells the adoption story: healthy numbers are your early signal for expansion conversations (a Phase 2, an AI agent), and flat numbers are your early warning to re-engage before renewal.</p></div>`,
    takeaways: [
      "Partner view of Accounting = usage information; the customer panel differs here",
      "Usage covers run dates, data usage, user counts and types, and the top 20 tables by consumption",
      "The customer's contract is attached under Accounting",
      "Usage is the adoption story — check it before every renewal or expansion conversation"
    ]
  },
  {
    id: 6, group: "Staying Informed",
    title: "Support, help, and alerts",
    time: "3 min",
    objectives: [
      "Create a well-formed support ticket with the right type and priority",
      "Self-serve answers in the Help Center — and ask Charlie",
      "Enable alerts and set up notifications with the right frequency",
      "Know the escalation address when you need a human"
    ],
    body: `
<h3>Tickets: My Tickets and Add Ticket</h3>
<p><strong>My Tickets</strong> shows everything you've raised. To raise one, select <strong>Add Ticket</strong> and fill it out:</p>
<ul>
<li><strong>Ticket type</strong> — customer success, installation, sync connections, partner success, or Phase 1 / Phase 2 application support</li>
<li><strong>Emails</strong> — yours, plus any teammates who should follow along</li>
<li><strong>Subject and details</strong> — what's happening, where</li>
<li><strong>Priority</strong> — emergency, urgent, normal, or low. In practice most tickets are <strong>normal or low</strong>; save the top levels for real fires so they mean something.</li>
<li><strong>Attachments</strong> — add a file or a URL; screenshots make every ticket faster to resolve</li>
</ul>
<figure class="shot"><img src="assets/portal/11-add-ticket.png" alt="The Add Ticket form" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/11-add-ticket.png</code></span><figcaption>Add Ticket — type, emails, subject, priority, and attachments.</figcaption></figure>
<h3>The Help Center</h3>
<p>Before (or instead of) a ticket: search the <strong>Help Center</strong>. Type a topic — "Phase 1," say — and the documentation on it appears, including troubleshooting guides like what to check when email alerts aren't arriving.</p>
<h3>Charlie, in the portal</h3>
<p>Charlie — the same guide walking you through this Academy — is also an <strong>AI assistant inside the portal</strong>. Ask a question in place, as you work, and it answers alongside the docs.</p>
<figure class="shot"><img src="assets/portal/12-charlie.png" alt="Charlie in the portal" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/12-charlie.png</code></span><figcaption>Charlie in the portal — ask anything, right where you're working.</figcaption></figure>
<h3>Alerts and notifications</h3>
<p>To hear about changes and errors without watching the portal: enable <strong>alerts</strong> (the AWS SNS alerts toggle), then open <strong>Notifications</strong> and select <strong>Add New</strong> — your email (and teammates'), the notification type, and the frequency: <strong>daily, weekly, or monthly</strong>.</p>
<figure class="shot"><img src="assets/portal/13-notifications.png" alt="Notification setup" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/portal/13-notifications.png</code></span><figcaption>Notifications — add each email with a type and a daily / weekly / monthly frequency.</figcaption></figure>
<h3>When you need a human</h3>
<p>Questions, issues, concerns beyond the portal: <strong>partners@commercient.com</strong> — the team is there to answer.</p>`,
    takeaways: [
      "Add Ticket: pick the right type, keep priority honest (most tickets are normal or low), attach screenshots",
      "Help Center first for how-tos; Charlie answers questions right inside the portal",
      "Enable alerts, then add each email with a notification type and daily/weekly/monthly frequency",
      "Escalation with a human: partners@commercient.com"
    ]
  }
];

// Per-module knowledge checks. Same authoring rules as FLUENCY_CHECKS:
// balanced option lengths, distractors plausible and positive in tone.
const PORTAL_CHECKS = {
  1: { q: "A new teammate asks how to get into the portal. What do you tell them?",
       a: ["Go to commercient.com and select the login option in the footer — your browser keeps the session from then on",
           "Ask your Commercient contact to send a one-time access link by email each time you need to check a project",
           "Go to portal.commercient.com, sign in with your username and password, and complete the authentication step on your phone",
           "Use the shared company login from the onboarding packet — everyone on the team signs in with the same credentials"], c: 2 },
  2: { q: "You've just built a quote in the Quoting Tool. What do you have in your hands?",
       a: ["An estimate — the quote goes to the Commercient sales team, who confirm the details and finalize it with you",
           "A final price ready for the customer's signature — the tool pulls live rates, so no further review is needed",
           "A range with a floor and a ceiling — the customer picks the tier that fits and the deal proceeds from there",
           "A draft proposal document that downloads as a PDF for you to complete offline and send to your contact"], c: 0 },
  3: { q: "Which is the right order of the onboarding steps a project moves through?",
       a: ["Phase 1 sandbox execution, then registration and installation, then final project sign-off and delivery",
           "Registration and installation, then Phase 1 sandbox execution, then final project sign-off and delivery",
           "Final scoping and sign-off first, then registration and installation, then Phase 1 sandbox execution",
           "Registration and installation, then final project sign-off and delivery, then Phase 1 sandbox execution"], c: 1 },
  4: { q: "A customer calls: \"Are any of our records failing to sync?\" Where's the fastest answer?",
       a: ["Open a support ticket with the sync-connections type and ask the team to run a health report on the account",
           "Search the Help Center for the customer's company name and open the most recent article that mentions them",
           "The Notifications page — failed records appear there once you've subscribed with a daily email frequency",
           "The company's dashboard — failed sync records for Phase 1 and Phase 2 show right up front, next to sync status"], c: 3 },
  5: { q: "In the partner view, what does the Accounting tab show?",
       a: ["Usage information — report run dates, data usage, user counts, top tables — plus the customer's attached contract",
           "Commission statements broken down by deal, with year-to-date totals and the payout schedule for the quarter",
           "Invoices and payment status for each customer you've referred, with downloadable receipts per billing cycle",
           "Budget-versus-actual tracking for every project phase, updated as each milestone gets signed off and delivered"], c: 0 },
  6: { q: "You're filing a ticket about a minor display issue. Which priority is the fluent choice?",
       a: ["Emergency — it guarantees the fastest possible routing, and the team can always downgrade it later if needed",
           "Urgent — anything a customer might notice deserves the second-highest level so it stays visible in the queue",
           "Normal or low — most tickets belong there, and keeping the top levels honest makes them mean something",
           "None — minor items are best saved for your next scheduled call, since the form is meant for outages"], c: 2 }
};
PORTAL_MODULES.forEach(m => { m.check = PORTAL_CHECKS[m.id]; });

// Certification quiz — questions/options ONLY; key lives in quiz_keys
// (seeded by supabase/upgrade-003.sql).
const PORTAL_QUIZ = {
  passMark: 0.8,
  sections: [
    "Getting Around & Pre-Sales",
    "Projects & Sync Health",
    "Usage, Support & Alerts"
  ],
  questions: [
    { s:0, q:"How do you sign in to the Commercient portal?",
      a:["Through commercient.com's main site — select the login option in the header and your browser keeps the session alive",
         "With a one-time access link that your Commercient contact emails you at the start of each working session",
         "At portal.commercient.com — your username and password, plus an authentication step set up on your phone",
         "Through the Help Center — request access once and the portal opens automatically on your next visit"] },
    { s:0, q:"What does My Dashboard show when you land in the portal?",
      a:["Summary tiles (for partners: leads, shared customers, commission, referrals) and the company list with each ERP, CRM, database, and status",
         "A feed of product announcements and release notes, with training content matched to your team's current certification level",
         "Your open support tickets ranked by priority — everything else in the portal is reached from the search bar at the top",
         "A calendar of upcoming project milestones across all of your customers, with the week's scheduled sync windows highlighted"] },
    { s:0, q:"The Quoting Tool produces:",
      a:["A finalized price the customer can accept immediately, with the signed agreement generated in the very same step",
         "An estimate — once created, the quote is sent to the Commercient sales team to confirm and finalize the details",
         "A comparison of every supported integration, ranked by how closely each one matches the customer's systems",
         "A budgeting worksheet the customer's finance team completes before any pricing conversation can begin"] },
    { s:0, q:"You submitted a lead two weeks ago and want to know where the deal stands. The fastest source of truth:",
      a:["The Active Deals view in the pre-sales resources — it shows where every submitted deal currently stands",
         "The audit trail on the customer's dashboard, which records each stage the deal has moved through so far",
         "The My Tickets tab — updates on the deal arrive there as responses on your original submission ticket",
         "The Accounting tab, where each open deal is listed alongside its projected commission for the quarter"] },
    { s:1, q:"A project's status page shows:",
      a:["The account's support history, ordered by priority, with everything else kept over on the Accounting tab",
         "A single overall percentage — the step-by-step detail arrives in a weekly summary email from your team",
         "The current stage, estimated timeline, integration, and status — plus each onboarding step with start and finish dates",
         "The sales pipeline for the account — projected close dates and expansion opportunities for the next renewal"] },
    { s:1, q:"Which steps does a project move through, in order?",
      a:["Phase 1 sandbox execution, then registration and installation, then the final project sign-off and delivery",
         "Registration and installation, then Phase 1 sandbox execution, then the final project sign-off and delivery",
         "Discovery and scoping, then contract sign-off, then one combined installation-and-delivery step at the end",
         "Registration and installation, then the final sign-off and delivery, with Phase 1 execution running afterward"] },
    { s:1, q:"Where do you check a customer's failed sync records?",
      a:["On the company's dashboard — failed records for Phase 1 and Phase 2 appear alongside sync status and percent complete",
         "In the Help Center, by searching for the company's name and opening the automatically generated health article",
         "They arrive by email through the alert subscriptions, so they aren't displayed inside the portal itself",
         "Under the Accounting tab's usage information, next to the top 20 tables ranked by data consumption"] },
    { s:1, q:"Where do the sync history and sync logs live?",
      a:["Inside the Notifications settings, listed under each email subscription that includes sync-related events",
         "On the My Dashboard company list, expanded by selecting the status column for any active company",
         "In the customer's contract attachment, which is refreshed with an updated log summary every month",
         "In the Phase 1 ERP-to-CRM configuration — with Phase 2 having its own equivalent views and portal"] },
    { s:1, q:"What should you know about the Connection Manager in the utility menu?",
      a:["It's where partners map custom fields between systems after completing this certification course",
         "It's visible in the menu but managed by Commercient — you won't be editing connections there yourself",
         "It's the master on/off switch for each customer's sync, used whenever a customer requests a pause",
         "It's where new AI agents get installed and configured before they appear in the request dashboard"] },
    { s:2, q:"In the partner view, the Accounting tab shows:",
      a:["Usage information — report run dates, data usage, user counts and types, the top 20 tables — plus the attached customer contract",
         "Commission statements for each of your closed deals, with year-to-date totals and the payout schedule laid out for the current quarter",
         "The customer's complete invoice history and payment status, together with downloadable receipts for every billing cycle since the project began",
         "A budget-versus-actual view for each phase of the project, refreshed automatically as every milestone gets signed off and delivered"] },
    { s:2, q:"When you create a support ticket, which of these is true?",
      a:["Tickets route fastest when they're marked emergency, and the support team will simply downgrade them later if they see it differently",
         "Each account comes with a monthly ticket allowance, so smaller items are usually best saved up for your regularly scheduled calls",
         "You choose a ticket type and a priority — most tickets are normal or low — and can add teammates' emails and attachments",
         "Charlie files tickets automatically whenever a sync error appears in an account, so manually created tickets are only rarely needed"] },
    { s:2, q:"What is Charlie, inside the portal?",
      a:["The nickname for the alerts service that emails you when a sync fails or a project stage completes",
         "An AI assistant you can ask questions as you work — answers arrive in place, alongside the Help Center docs",
         "A weekly digest that summarizes each customer's project percentage and any newly failed records",
         "The name of the Help Center's search engine, rebuilt each night as new documentation is published"] },
    { s:2, q:"How do you set up email notifications for changes and errors?",
      a:["Notifications are on by default for every portal user, with the frequency fixed at daily for consistency",
         "Send a ticket listing the addresses you'd like subscribed, and the support team configures the alerts",
         "Add each teammate under Settings in the AI tools menu — the alerts then follow automatically within a day",
         "Enable alerts, then in Notifications select Add New — each email gets a notification type and a daily, weekly, or monthly frequency"] }
  ]
};

/* ----------------------------------------------------------------------
   COMMERCIENT CUSTOMER PANEL COURSE
   Working knowledge of the Commercient CUSTOMER panel (portal.commercient.com)
   — built from Johaina Cubar's recorded customer-panel + layout training.
   This is a DIFFERENT interface from the partner portal (different left-nav
   menus, the CloneSync/CRM-Sync architecture, query editors, self-service SQL,
   Purchase flows). Audience: customer admins. The transferable CRM concepts
   from the HubSpot layout portion are included; CRM-specific view-building is
   noted as such rather than taught step-by-step.
   Screenshots live in assets/customer-panel/ — each <figure class="shot">
   shows a styled placeholder with its exact filename until the PNG is added.
   NOTE: quiz answer key lives ONLY in quiz_keys (see supabase/upgrade-004.sql).
---------------------------------------------------------------------- */
const CUSTOMER_PANEL_MODULES = [
  {
    id: 1, group: "Getting In",
    title: "Signing in and getting oriented",
    time: "3 min",
    objectives: [
      "Sign in to the customer panel at portal.commercient.com",
      "Complete verification and set up an authenticator app",
      "Get oriented to the left-hand menu you'll use throughout"
    ],
    body: `
<h3>Where you sign in</h3>
<p>Your panel lives at <strong>portal.commercient.com</strong>. Sign in with your username and password. You can leave the "application name" field blank.</p>
<figure class="shot"><img src="assets/customer-panel/01-login.png" alt="Customer panel sign-in" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/01-login.png</code></span><figcaption>Sign-in at portal.commercient.com — username and password; leave "application name" blank.</figcaption></figure>
<h3>Verification and two-step authentication</h3>
<p>First-time or lapsed logins go through a <strong>verification step</strong>: submit, then confirm from the email that arrives (this is the account whitelisting — check spam/junk if it's slow). You'll also set up <strong>two-step authentication</strong> with any authenticator app — Google or Microsoft Authenticator both work.</p>
<div class="callout"><h4>If you're the main user, don't reset your own password</h4><p>The <strong>main user</strong> — the primary login set up for your account — should not use "forgot password" to reset their own login, because a self-serve reset there can break the sync connection. Contact Commercient support instead and they'll reset it for you safely.</p></div>
<h3>Getting oriented</h3>
<p>Everything runs from the <strong>left-hand menu</strong>. Top to bottom you'll find: <strong>Home</strong> (My Dashboard), <strong>Help Desk</strong>, <strong>AI tools</strong>, <strong>Utility</strong>, <strong>ERP to CRM</strong> (Phase 1, and Phase 2 if licensed), <strong>Purchase</strong>, <strong>Accounting</strong>, <strong>User Management</strong>, and <strong>Alerts</strong>. The rest of this course walks them in order.</p>
<figure class="shot"><img src="assets/customer-panel/02-left-nav.png" alt="The customer panel left navigation" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/02-left-nav.png</code></span><figcaption>The left-hand menu — Home, Help Desk, AI tools, Utility, ERP to CRM, Purchase, Accounting, User Management, Alerts.</figcaption></figure>`
  },
  {
    id: 2, group: "Your Project",
    title: "Home & Help Desk: your project and your tickets",
    time: "3 min",
    objectives: [
      "Read the project milestones on My Dashboard",
      "Name the Phase 1 execution steps in order",
      "Understand the weekly sync status panel",
      "Find and follow your open tickets in Help Desk"
    ],
    body: `
<h3>My Dashboard: your project at a glance</h3>
<p><strong>Home → My Dashboard</strong> shows your project information — where you are and what's next. The journey runs through clear milestones:</p>
<div class="flow">Registration &amp; installation &rarr; Phase 1 execution &rarr; Data verification &rarr; Full sync &rarr; Phase 1 final delivery</div>
<p><strong>Phase 1 execution</strong> itself is a checklist that fills in as you go: auto-sync enabled, kickoff meeting, contact matching, account matching, and layout/panel training. After training, your specialist marks that step complete and sends the <strong>initial sign-off</strong>. Signing off opens a new <strong>data verification</strong> step — you confirm each object (accounts, contacts, and any others in your integration). Once verified, Commercient enables the <strong>full sync</strong>, runs a final verification, and sends <strong>Phase 1 final delivery</strong>.</p>
<figure class="shot"><img src="assets/customer-panel/03-dashboard-project.png" alt="My Dashboard project milestones" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/03-dashboard-project.png</code></span><figcaption>My Dashboard — registration/installation and the Phase 1 execution checklist, each step with its status.</figcaption></figure>
<h3>Weekly sync status</h3>
<p>Lower on the dashboard is <strong>weekly sync status</strong> — a daily record of what moved. Activity grows as your rollout expands and more accounts come online, so recent days fill in as the integration ramps up.</p>
<figure class="shot"><img src="assets/customer-panel/04-weekly-sync.png" alt="Weekly sync status" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/04-weekly-sync.png</code></span><figcaption>Weekly sync status — a daily record of sync activity that grows as your rollout expands.</figcaption></figure>
<h3>Help Desk: your tickets</h3>
<p><strong>Help Desk</strong> is where your support tickets live. Each ticket shows its status and which Commercient team is handling it. Open one to follow its progress, or create a new ticket any time you have a question or request.</p>
<figure class="shot"><img src="assets/customer-panel/05-help-desk.png" alt="Help Desk tickets" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/05-help-desk.png</code></span><figcaption>Help Desk — your tickets, each with its status and the team handling it.</figcaption></figure>
<div class="callout"><h4>A note on AI tools</h4><p>The panel also includes an <strong>AI tools</strong> menu. A separate AI onboarding training covers it in depth — customers should complete that training to get the most from it.</p></div>`
  },
  {
    id: 3, group: "How The Sync Works",
    title: "CloneSync, CRM Sync, and the Utility tools",
    time: "2 min",
    objectives: [
      "Explain the two-stage sync: CloneSync then CRM Sync",
      "Browse your cloned ERP tables in Query Editor v1",
      "Use Data Matching to understand the matching process"
    ],
    body: `
<h3>The two-stage sync — the mental model that explains everything</h3>
<p>Commercient moves your data in <strong>two stages</strong>, and understanding this makes the rest of the panel obvious:</p>
<table class="data-table">
<tr><th>Stage</th><th>What it does</th></tr>
<tr><td><strong>CloneSync</strong></td><td>Copies data from your ERP into the <strong>Commercient cloud database</strong></td></tr>
<tr><td><strong>CRM Sync</strong></td><td>Moves data from the <strong>Commercient cloud database</strong> into your CRM</td></tr>
</table>
<p>So your ERP data lands in a cloud copy first, and the CRM is fed from that copy. That's why there's a place to browse "cloned tables" separately from the CRM configuration.</p>
<h3>Utility → Data Matching</h3>
<p><strong>Utility → Data Matching</strong> is the tool used to match records during onboarding — lining up the accounts, contacts, and objects that already exist in your CRM with what's coming from the ERP, so nothing duplicates.</p>
<h3>Utility → Query Editor v1: your cloned ERP tables</h3>
<p><strong>Query Editor v1</strong> shows the tables CloneSync pulled from your ERP. To explore a table, <strong>drag it to the right</strong>; if you know SQL you can add conditions below to search, and <strong>Preview Results</strong> shows your live data.</p>
<figure class="shot"><img src="assets/customer-panel/06-query-editor-v1.png" alt="Query Editor v1 with cloned tables" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/06-query-editor-v1.png</code></span><figcaption>Query Editor v1 — cloned ERP tables; drag to the right, add SQL conditions, preview results.</figcaption></figure>`
  },
  {
    id: 4, group: "How The Sync Works",
    title: "ERP to CRM (Phase 1): configuration, mapping, and logs",
    time: "3 min",
    objectives: [
      "Read the CRM configuration: which objects sync where",
      "See how fields are mapped and how filters limit the sync",
      "Diagnose a sync error from the Sync Logs and fix it at the source",
      "Use Query Editor v2 to isolate a single record, and edit a query safely"
    ],
    body: `
<h3>ERP to CRM → CRM Configuration</h3>
<p>This is the heart of Phase 1. <strong>CRM Configuration</strong> lists the objects (processes) enabled for your sync and where each one lands — for example, customer → the CRM <strong>company</strong> object, contact → the <strong>contact</strong> object (shown with its <strong>object API name</strong>). Objects without a native home — like <strong>policies and employees</strong> — are created as <strong>managed custom objects</strong> in the CRM.</p>
<figure class="shot"><img src="assets/customer-panel/07-crm-config.png" alt="CRM configuration and field mapping" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/07-crm-config.png</code></span><figcaption>CRM Configuration — enabled objects, their CRM targets and API names; click a process to see the mapping.</figcaption></figure>
<h3>Mapping and filters</h3>
<p>Click a <strong>process name</strong> to see the <strong>field mapping</strong> (here, <code>A</code> is just a SQL alias for your client table). At the bottom are the <strong>filters</strong> currently applied. During onboarding these deliberately limit the sync — for example, only a handful of records, and <strong>only active clients</strong>. When you're ready for <strong>full sync</strong>, Commercient simply removes the record-count filter.</p>
<h3>Sync Logs: when a record won't go</h3>
<p><strong>Sync Logs</strong> is where errors surface with a reason — for example, a contact that can't sync because of an invalid email address. The fix is at the <strong>source</strong>: correct it in your ERP, and on the next run the sync <strong>automatically picks it up</strong> and pushes it to the CRM. You don't re-enter it in the panel.</p>
<figure class="shot"><img src="assets/customer-panel/08-sync-logs.png" alt="Sync logs with an error detail" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/08-sync-logs.png</code></span><figcaption>Sync Logs — a record and its reason (e.g., invalid email); fix at the source and the next sync grabs it.</figcaption></figure>
<h3>Query Editor v2: isolate one record</h3>
<p>To inspect the exact record behind a log entry, open <strong>CRM Configuration → the object → Query Editor v2</strong>; Preview Results narrows to that one record so you can see and edit it. If someone on your team knows SQL, you can <strong>edit the query or view</strong> to add fields — and to save, click <strong>Execute</strong>, then <strong>Save</strong>.</p>
<figure class="shot"><img src="assets/customer-panel/09-query-editor-v2.png" alt="Query Editor v2 isolating a record" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/09-query-editor-v2.png</code></span><figcaption>Query Editor v2 — narrow to a single record; edit the query, then Execute → Save.</figcaption></figure>
<div class="callout"><h4>Phase 2, briefly</h4><p><strong>Phase 2</strong> syncs the other direction — from your CRM back to your ERP. It appears only if it's included in your license.</p></div>`
  },
  {
    id: 5, group: "Running The Account",
    title: "Purchase, Accounting, Users, and Alerts",
    time: "3 min",
    objectives: [
      "Know what's available under Purchase — add-ons and sync frequency",
      "Read the Accounting tab: billing, usage limits, invoices, contract",
      "Add users correctly and understand the guardrails",
      "Enable alerts so sync errors reach your inbox"
    ],
    body: `
<h3>Purchase: grow the integration</h3>
<p>The <strong>Purchase</strong> menu is where you expand. It carries support <strong>vouchers</strong> and a <strong>maintenance plan</strong> (click to see what's in and out of the plan), plus two common upgrades:</p>
<ul>
<li><strong>Add-on tables</strong> — to sync more objects in Phase 1 (say, sales orders or vendors), add the table via <strong>ERP to CRM add-on</strong>. If a table isn't in the popular list, you can request it, or ask Commercient for help purchasing.</li>
<li><strong>Sync frequency</strong> — the standard license runs the sync <strong>once per day at 8 AM</strong>. You can purchase more frequent runs, e.g. twice per day (Mon–Fri) or up to seven times per day.</li>
</ul>
<figure class="shot"><img src="assets/customer-panel/10-purchase.png" alt="Purchase menu — add-ons and sync frequency" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/10-purchase.png</code></span><figcaption>Purchase — vouchers, maintenance plan, add-on tables, and sync-frequency upgrades.</figcaption></figure>
<h3>Accounting: billing, usage, and your documents</h3>
<p><strong>Accounting</strong> holds your basic billing info and balance, lets you <strong>add or remove a card</strong>, and shows <strong>usage information</strong>. Because your ERP data is cloned into Commercient's cloud database, each customer has a <strong>3 GB clone-data limit per month</strong> — exceed it and you'll get an email. You'll also find <strong>subscriptions &amp; invoices</strong> (downloadable as PDF) and a <strong>copy of your contract</strong>, right in the panel.</p>
<figure class="shot"><img src="assets/customer-panel/11-accounting.png" alt="Accounting — usage, invoices, contract" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/11-accounting.png</code></span><figcaption>Accounting — balance and card, usage (3 GB/month), subscriptions & invoices (PDF), and your contract.</figcaption></figure>
<h3>User Management: add your team</h3>
<p><strong>User Management</strong> lets you add users — up to <strong>3, at no extra cost</strong>. Click <strong>Create User</strong>, enter their email and a password, and choose a <strong>role</strong>; they'll get a confirmation email. Add the people who will actually <strong>manage the panel</strong> — edits to a SQL query or view can carry a cost if something breaks.</p>
<figure class="shot"><img src="assets/customer-panel/12-user-management.png" alt="User management — create user" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/12-user-management.png</code></span><figcaption>User Management — Create User with email, password, and role; up to 3 users free.</figcaption></figure>
<h3>Alerts: let the panel tell you</h3>
<p>Finally, <strong>Alerts</strong>. Enable it and add an email, and you'll be notified whenever the sync hits an <strong>error</strong> — so you hear about it right away and can fix it at the source.</p>
<figure class="shot"><img src="assets/customer-panel/13-alerts.png" alt="Alerts setup" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/13-alerts.png</code></span><figcaption>Alerts — enable and add an email to be notified of sync errors.</figcaption></figure>`
  },
  {
    id: 6, group: "Running The Account",
    title: "Seeing your synced data in the CRM",
    time: "3 min",
    objectives: [
      "Recognize matched accounts by the AR customer code",
      "Understand managed custom objects and associated records",
      "Read a parent record and its associated line items",
      "Know what's CRM-specific vs. what Commercient controls"
    ],
    body: `
<p>Once data flows, most of your day-to-day happens in the CRM itself. These are the transferable concepts that make the synced data make sense — the exact buttons vary by CRM, but the ideas don't.</p>
<h3>Matched accounts and the AR customer code</h3>
<p>During onboarding, Commercient does <strong>account matching</strong> against your existing CRM data. When an account carries a value in the <strong>AR customer code</strong> field, that account exists in your ERP and is linked.</p>
<h3>Managed custom objects and associated records</h3>
<p>Objects without a native CRM home come across as <strong>managed custom objects</strong>. On an account record you'll see the synced objects associated to it, and where your ERP nests records — a header with its line items beneath it — the CRM keeps that same parent-child shape.</p>
<figure class="shot"><img src="assets/customer-panel/14-associated-records.png" alt="A record and its associated line items in the CRM" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot placeholder<code>assets/customer-panel/14-associated-records.png</code></span><figcaption>An account's synced data — associated objects, and a parent record with its line items beneath it.</figcaption></figure>
<div class="callout"><h4>When you expect more records than you see</h4><p>Early in a project, the usual reason is a <strong>filter</strong> still applied during onboarding — Phase 1 starts scoped to a few active records. Raise a ticket and Commercient checks the filter against the source table. Once full sync is enabled, the full set comes through.</p></div>
<h3>Views are CRM-specific</h3>
<p>Building <strong>views</strong> (filtered lists) and adding <strong>columns or card properties</strong> — for example, a view of only accounts with an AR customer code, or showing more properties on a record — is done with your <strong>CRM's native tools</strong>, not the Commercient panel. If you already know your CRM, you already know how; if not, your CRM's own help covers it. Commercient controls what <em>syncs</em>; your CRM controls how you <em>view</em> it.</p>
<h3>You've completed the panel tour</h3>
<p>That's the customer panel end to end — access, your project, how the sync works, Phase 1 configuration and troubleshooting, running the account, and reading your data in the CRM. Anything you're unsure about, raise it in a <strong>ticket</strong> and your specialist will pick it up.</p>`
  }
];

// Per-module knowledge checks. Same authoring rules as the other courses:
// balanced option lengths, distractors plausible and positive in tone.
const CUSTOMER_PANEL_CHECKS = {
  1: { q: "You're the account's main user and you're locked out. What's the right move?",
       a: ["Use the 'forgot password' link on the sign-in page — it's the quickest way to get a reset link by email",
           "Contact Commercient support for the reset — a main-user self-reset can break the sync connection",
           "Create a second main-user account from User Management and sign in with that one instead",
           "Clear your browser cache and cookies, then retry your saved password a few more times"], c: 1 },
  2: { q: "Early in your project, weekly sync status shows only light activity. What explains it?",
       a: ["Your rollout is still ramping up — activity grows as more accounts come online over time",
           "The panel displays only the current day, so the rest of the week appears on another screen",
           "Weekly sync status reports totals monthly, so daily activity stays low until month-end",
           "Sync activity is spread evenly across the week to keep usage within your plan"], c: 0 },
  3: { q: "In the two-stage sync, what does CloneSync do?",
       a: ["It pushes data from the Commercient cloud database into your CRM to keep records current",
           "It matches incoming ERP records against the accounts that already exist in your CRM system",
           "It copies data from your ERP into the Commercient cloud database as the first stage",
           "It runs the nightly cleanup that removes duplicate records before the CRM sync begins"], c: 2 },
  4: { q: "A contact failed to sync because of an invalid email address. How do you fix it?",
       a: ["Re-enter the corrected contact directly in the customer panel so the CRM receives it right away",
           "Delete the contact in the CRM and let the next sync recreate it cleanly from the cloud database",
           "Open a ticket asking the Phase 1 team to push that one record through on your behalf manually",
           "Fix the email at the source in your ERP — the next sync automatically picks up the correction"], c: 3 },
  5: { q: "How many users can you add to the customer panel, and at what cost?",
       a: ["Up to three users at no extra cost — best reserved for the people who'll actually manage the panel",
           "One additional user for free, with each further user billed as a monthly add-on on your invoice",
           "Unlimited users at no cost, since access is included with every Commercient customer license",
           "Up to five users, with the first three free and the last two requiring a small one-time fee"], c: 0 },
  6: { q: "An account in your CRM shows a value in the AR customer code field. What does that tell you?",
       a: ["That the account has exceeded its sync quota and is temporarily excluded from the daily run",
           "That the account exists in your ERP and was matched and linked to it during onboarding",
           "That the account was created manually in the CRM and has not yet been matched to the ERP",
           "That the account's records are pending review before Commercient enables them for full sync"], c: 1 }
};
CUSTOMER_PANEL_MODULES.forEach(m => { m.check = CUSTOMER_PANEL_CHECKS[m.id]; });

// Certification quiz — questions/options ONLY; key lives in quiz_keys
// (seeded by supabase/upgrade-004.sql).
const CUSTOMER_PANEL_QUIZ = {
  passMark: 0.8,
  sections: [
    "Access & Your Project",
    "How the Sync Works",
    "Purchase, Billing & Data"
  ],
  questions: [
    { s:0, q:"As the account's main user, why shouldn't you use 'forgot password' to reset yourself?",
      a:["Main-user resets have to be approved by your CRM administrator before they'll take effect anyway",
         "The reset link is only sent to the billing contact, so it rarely reaches the main user in time",
         "A main-user self-reset can break the sync connection — support resets it for you instead",
         "Main users can reset only once per quarter, so it's better to save it for a genuine emergency"] },
    { s:0, q:"What should you expect when signing in for the first time (or after a long gap)?",
      a:["A verification/whitelisting email to confirm, plus two-step authentication via an authenticator app",
         "A one-time PIN mailed to your billing address, which you enter before the panel will open",
         "A short setup call with support, who unlock the panel remotely once your identity is confirmed",
         "A signed access form returned to Commercient, after which your login is enabled within a day"] },
    { s:0, q:"What does My Dashboard show you?",
      a:["A live feed of every field that changed in your CRM today, grouped by the object it belongs to",
         "Your project milestones and their status, plus a weekly sync status panel of daily activity",
         "A billing summary with your current balance, recent invoices, and this month's usage against the limit",
         "The full list of cloned ERP tables, each with its record count and the time it last synced"] },
    { s:0, q:"Which is the correct high-level order of the project?",
      a:["Phase 1 execution, then registration and installation, then data verification, then final delivery",
         "Registration and installation, then data verification, then Phase 1 execution, then full sync",
         "Registration and installation, then Phase 1 execution, then data verification, then full sync and final delivery",
         "Data verification, then registration and installation, then Phase 1 execution, then final delivery"] },
    { s:1, q:"What is the difference between CloneSync and CRM Sync?",
      a:["CloneSync handles standard objects while CRM Sync handles the managed custom objects like policies",
         "CloneSync runs during onboarding only, while CRM Sync is the ongoing daily sync once you're live",
         "CloneSync copies ERP data into the Commercient cloud DB; CRM Sync moves it from there to your CRM",
         "CloneSync is the Phase 1 direction and CRM Sync is the Phase 2 direction back into your ERP system"] },
    { s:1, q:"In the Utility area, what does Query Editor v1 let you do?",
      a:["Browse the ERP tables CloneSync copied in — drag one over, add SQL conditions, and preview your data",
         "Edit the field mapping between your ERP and CRM, then execute and save the new configuration",
         "Schedule how often the sync runs each day and choose which objects run on each pass",
         "Review sync errors one at a time and retry the individual records that didn't come through"] },
    { s:1, q:"Where would you look to understand how a source field lands in your CRM?",
      a:["Under Accounting, where each synced object is listed with the field counts included in your plan",
         "In CRM Configuration — click a process name to see its field mapping and the filters applied",
         "In the weekly sync status panel, which breaks each day's run down field by field for every object",
         "In User Management, where each role's settings define which fields that user is allowed to sync"] },
    { s:1, q:"How are objects that have no native CRM home represented after they sync?",
      a:["As notes attached to the related account record, since the CRM has no object type for them",
         "As tags on the contact record, which lets you filter contacts by category or status",
         "As separate spreadsheets you download from Accounting, kept outside the CRM for reference",
         "As managed custom objects, associated to the account — a parent record holds its line items"] },
    { s:1, q:"During onboarding, only a few of your records appear in the CRM. Why?",
      a:["Filters are deliberately applied at first (a few active records); full sync removes them later",
         "The cloud database caps the first sync at a fixed number of rows until payment clears",
         "The CRM rejects records in bulk on a first import, so they arrive gradually over several days",
         "Only records edited in the last year sync initially, and older records follow in a second pass"] },
    { s:2, q:"On the standard license, how often does the sync run, and how do you change it?",
      a:["Every hour by default; you open a support ticket to slow it down if it's using too much data",
         "Once per day at 8 AM by default; you can purchase more frequent runs under the Purchase menu",
         "Twice per day by default; the frequency is fixed for the license term and can't be changed",
         "On demand only — you trigger each run yourself, and scheduling is an optional paid add-on"] },
    { s:2, q:"What's true about the customer data-usage limit?",
      a:["Each customer has a 3 GB clone-data limit per month, and you get an email if you exceed it",
         "Usage is unlimited on all plans, since the cloud database scales automatically with your data",
         "The limit is 3 GB per object per day, after which that object pauses until the next morning's run",
         "There's a 3 GB limit shared across all customers on your ERP, allocated on a first-come basis"] },
    { s:2, q:"You want to sync an extra object, like sales orders, in Phase 1. How?",
      a:["Enable it yourself from CRM Configuration by toggling the object on and saving the change",
         "Ask your CRM administrator to create the object first, then it appears in the panel automatically",
         "Add the table through the ERP-to-CRM add-on under Purchase, or ask Commercient to help set it up",
         "Raise a Phase 2 request, since adding new objects is only possible once Phase 2 is enabled"] },
    { s:2, q:"Where do you find your invoices and a copy of your contract?",
      a:["Under Help Desk, attached to the onboarding ticket that was opened at the start of your project",
         "In the Accounting tab — subscriptions and invoices (downloadable as PDF) and your contract copy",
         "In User Management, where account documents are stored under the main user's profile settings",
         "In the Utility menu, alongside the cloned tables, so billing data sits next to your synced data"] }
  ]
};

/* ----------------------------------------------------------------------
   COURSE CATALOG
   The Academy is a multi-course platform. Each course is self-contained
   (its own groups, roadmap, modules, quiz, and badge). Add a new course by
   pushing another object here — `status:"available"` with modules+quiz, or
   `status:"coming-soon"` for a teaser tile. Defined last so it can reference
   the MODULES and QUIZ consts above.
---------------------------------------------------------------------- */
/* ==========================================================================
   EXTERNAL AGENT SETUP — course data (built from ExternalAgentSetupGuide.pdf)
   Staff/implementer runbook. Screenshots in assets/external-agent/.
   Internal person-names in the source genericized to roles (per Nick's rule).
   ========================================================================== */
const EA_PRE = 'assets/external-agent/';
function eaShot(file, cap){
  return `<figure class="shot"><img src="${EA_PRE}${file}" alt="${cap.replace(/"/g,'&quot;')}" onerror="this.closest('.shot').classList.add('missing')"><span class="ph">Screenshot<code>${EA_PRE}${file}</code></span><figcaption>${cap}</figcaption></figure>`;
}
// monospace, theme-neutral, scrollable block for the verbatim Claude prompts
function eaPrompt(text){
  return `<pre style="white-space:pre-wrap;border:1px solid #9fb3c4;border-radius:10px;padding:14px 16px;margin:14px 0;overflow:auto;font-size:12.5px;line-height:1.55;font-family:ui-monospace,Menlo,Consolas,monospace">${text}</pre>`;
}

const SYS_MSG_PROMPT = `Above this message is Commercient's default system prompt for our external AI agents. I need you to adapt it into a finished, client-specific system message that I can paste directly into the agent's System Message field.

FIRST, BEFORE DOING ANYTHING ELSE
Do not research, write, or generate anything yet. Your entire first response must be a short request for these two inputs:
1. COMPANY — the client's name and website URL
2. AGENT PURPOSE — 1-3 sentences: who the agent talks to, what it should help them do, and what action it should push them toward
Ask for both, then stop and wait. Do not guess at either one. Do not produce a draft, a partial prompt, or an example. Once I reply with the two inputs, proceed to the steps below.

THEN, ONCE I'VE PROVIDED THE INPUTS
1. RESEARCH FIRST. Look up the company online before writing. Identify: what they sell or do, their customer type (B2C retail vs. B2B/professional services vs. industrial/technical), their main product or service categories, the industries or markets they serve, their public contact method (support email, sales inbox, or quote/contact page), and any notable credentials, certifications, or positioning claims. If more than one company shares the name, stop and ask me which one before writing anything.
2. REWRITE THE DEFAULT, DON'T REPLACE IT. Keep the default's structure and logic intact — the #### query delimiters, the step sequence (tool identification &rarr; search_pinecone_documents &rarr; clarification &rarr; final answer), the markdown output requirement, and the exact Sources:[doc_123,doc_456] format appended after three newlines with only genuinely-used doc IDs. These are platform requirements, not stylistic choices. Change the framing, scope, tone, and examples; do not change the mechanics.
3. ADD THESE CLIENT-SPECIFIC ELEMENTS:
   - An opening identity line: who the agent is, what company it represents, what site it lives on.
   - A compact company snapshot (1-2 sentences max) covering what they sell/do and their main categories or markets, so basic "who are you / what do you sell" questions don't burn a retrieval call.
   - A scope statement: answer ONLY from the client's own website content and documentation; do not answer outside their scope; do not invent information.
   - A tone instruction matched to the customer type (warm and helpful for consumer retail; professional and knowledgeable for B2B or technical).
   - An escalation path: where to send visitors for pricing, quotes, specs, or anything the agent can't answer — using the client's real contact method.
   - A no-results fallback with exact wording, pointing to the client's site and contact method. (The default lacks a clean version of this; always add one.)
   - Guidance to link to specific website pages where relevant and nudge toward the conversion action named in AGENT PURPOSE.
4. REPLACE ALL EXAMPLES. The default's examples are Commercient-internal (integration passwords, sync resets, Salesforce exports) and must all go. Write 3 new examples using realistic questions this client's actual visitors would ask. Cover these three cases:
   - a normal answered question that uses retrieval and ends with a correct Sources list
   - an ambiguous question that triggers a clarifying question and NO Sources list
   - a question with no relevant content that triggers the fallback wording
   Three examples is the target. The default's five are more than needed, and every example is billed on every single call.
5. KEEP IT LEAN. This prompt is sent with every request, so token count directly drives API cost, and these agents often run under a hard budget cap. Be compact and concrete. Cut anything decorative. Prefer short declarative instructions over explanation. Do not pad.

OUTPUT FORMAT
Return the finished system message in a single code block, ready to paste with no edits. Below the code block, briefly list (a) what you changed from the default and why, and (b) any detail you inferred or guessed — especially contact emails, URLs, or credentials — that I should verify with the client before going live.`;

const DEMO_PROMPT = `Same client as the system message we just built above — reuse the company and research from that conversation. Do not ask me to re-enter it.

Above this message is the embed script generated by our portal. Build me a single-file mock demo webpage with that widget embedded, so the client can see their agent in a realistic setting.

THE EMBED SCRIPT IS SACRED
Copy the entire &lt;script&gt; tag verbatim into the page, immediately before the closing &lt;/body&gt; tag. Do not retype, reformat, reindent, line-wrap, or "clean up" any attribute value. The data-chatbot-id, data-public-key, and data-bubble-icon values are long opaque strings — reproducing them by hand corrupts them. Copy, never transcribe.
If for any reason you cannot reproduce an attribute value exactly (base64 icons are the usual culprit), do NOT guess or approximate it. Omit that single attribute, leave an HTML comment marking where it goes, and tell me in your notes so I can paste it back myself. Never omit data-chatbot-id or data-public-key — those must always be exact.
Do not add a second widget, a fake chat bubble, a mock chat window, or any simulated version of the agent. The real widget renders itself in its own corner. The page must not compete with it.

THE PAGE
Research the client's actual website before designing. Match what's really there: their real color palette (pull the actual brand colors; do not invent a scheme); their real logo treatment (recreate the mark in inline SVG/CSS or use a clean text wordmark — never hotlink their image files); their real navigation labels; their real headline/tagline; their real product or service categories; and their real contact details and primary call-to-action (Request a Quote, Shop Now, Book a Consultation, etc.). If I've already shared a screenshot of their site in this chat, treat it as the source of truth.
Build a realistic single-page layout — header/nav, hero with headline and CTA, a categories or services section, a secondary band (stats, applications, or a quote), and a footer. Match the tone to the sector: consumer retail warm and inviting; B2B and industrial clean and engineered. Tasteful motion is fine; no gimmicks. Content should be plausible and drawn from real research, but this is a demo backdrop — all nav links and buttons are href="#" placeholders. Add a light footer line inviting visitors to use the chat.

CONSTRAINTS
- One self-contained .html file. Inline CSS in a &lt;style&gt; block. No frameworks, no build step, no external assets, no CDN links, no hotlinked images.
- Must render correctly opened directly from disk. Responsive at phone width, with the widget still reachable.
- Nothing may overlap the widget's corner — keep it clear of sticky elements, floating buttons, or back-to-top controls.

DELIVERABLE
Give me the finished .html file, named after the client (e.g. clientname-demo.html). Then briefly: (a) confirm the embed script was copied verbatim and flag any attribute you had to omit; (b) list anything you inferred about the brand that I should sanity-check; (c) remind me that if the widget doesn't appear from file://, serve locally with python3 -m http.server 8000 and load http://localhost:8000/&lt;filename&gt;.`;

const EXTERNAL_AGENT_MODULES = [
  {
    id: 1, group: "Before You Start",
    title: "What you're building & prerequisites",
    time: "5 min",
    objectives: [
      "Explain what a Commercient external agent is and where it lives",
      "Turn on the Commercient AI Sync Agent from the employee instance",
      "Get into the customer instance with the right access"
    ],
    body: `
<h3>What an external agent is</h3>
<p>A Commercient <strong>external agent</strong> is a customer-facing AI assistant that lives on a customer's website — the chat bubble in the corner, the same way Charlie sits in the corner of the Commercient site. It answers visitors from the customer's own website content and documentation, links them to the right pages, and nudges them toward a conversion action like a quote or a contact. This course walks the full setup, end to end.</p>
<div class="callout"><h4>Who this course is for</h4><p>This is a hands-on runbook for anyone who stands up external agents for customers — partners, consultants, developers, and the Commercient team. A few early steps run inside Commercient instances; if you don't have that access yet, coordinate with your Commercient contact.</p></div>
<h3>Step 1 — Turn on the Commercient AI Sync Agent</h3>
<p>From <strong>within the Commercient employee instance</strong> (not the customer's), open <strong>Product</strong> and search <strong>"AI."</strong> Select <strong>"CommercientAISyncAgent,"</strong> leave the name at its default, and click <strong>Create</strong>. Refresh the page until the status reads <strong>"Installed."</strong></p>
${eaShot('01-turn-on-sync-agent.png','Product &rarr; search "AI" to find the Commercient AI Sync Agent.')}
${eaShot('02-create-sync-agent.png','Select CommercientAISyncAgent, leave the name default, and Create; refresh until status is "Installed."')}
<h3>Step 2 — Get into the customer instance</h3>
<p>The rest of setup happens inside the <strong>customer's</strong> instance. Collect the customer's credentials from your Commercient onboarding lead, then log into the customer instance. The dashboards look the same as always, but new setup actions become available.</p>`,
    takeaways: [
      "An external agent is a customer-facing website chat that answers from the customer's own content",
      "Turn on the CommercientAISyncAgent from the employee instance and wait for status \"Installed\"",
      "Do the rest of setup inside the customer's instance, using credentials from your onboarding lead"
    ]
  },
  {
    id: 2, group: "Keys & Knowledge Base",
    title: "API keys & the knowledge base",
    time: "5 min",
    objectives: [
      "Add the two API keys the agent needs",
      "Use a consistent, company-prefixed naming convention",
      "Initialize the agent's knowledge base"
    ],
    body: `
<h3>Step 3 — Add the API keys</h3>
<p>In the customer instance, go to <strong>AI Tools &rarr; API Keys</strong>. You need two keys — request both from your Commercient AI/platform contact:</p>
<ul><li>an <strong>OpenAI API key</strong></li><li>a <strong>Pinecone key</strong> (and its URL)</li></ul>
<p>Click <strong>Actions &rarr; Add</strong> to add each one. Name them with a clear, company-prefixed convention so they're easy to pick later: <code>CompanyNameOPENAI</code> and <code>CompanyNamePinecone</code>.</p>
${eaShot('03-api-keys.png','AI Tools &rarr; API Keys &rarr; Actions &rarr; Add — add the OpenAI and Pinecone keys.')}
<h3>Step 4 — Initialize the knowledge base</h3>
<p>Create the knowledge base the agent will draw on. Name it <code>CompanyNameExternal</code>. The description has no programmatic effect — just note what the agent is for and which company it belongs to. Leave the sharing options off.</p>
${eaShot('04-init-knowledge-base.png','Initialize the knowledge base named CompanyNameExternal; leave sharing off.')}
<div class="callout"><h4>Naming matters</h4><p>Consistent, company-prefixed names — <code>CompanyNameOPENAI</code>, <code>CompanyNamePinecone</code>, <code>CompanyNameExternal</code> — keep the keys, knowledge base, and settings easy to match up in the dropdowns during the dense settings step.</p></div>`,
    takeaways: [
      "Under AI Tools → API Keys, add two keys: an OpenAI key and a Pinecone key + URL",
      "Name everything with the company prefix so it's easy to select later",
      "Initialize a knowledge base named CompanyNameExternal, with sharing left off"
    ]
  },
  {
    id: 3, group: "Build the Settings",
    title: "Settings, part 1: Connect your AI",
    time: "6 min",
    objectives: [
      "Open the four-part settings wizard and know it can't be reopened",
      "Set the Connect screen: name, provider, key, model, and API method"
    ],
    body: `
<h3>Step 5 — Create the settings</h3>
<p>This is the dense, important part of the setup. From the agent, click <strong>Add New Settings</strong> to open a four-part wizard: <strong>Connect &rarr; Knowledge &rarr; Customize &rarr; Create</strong>. One heads-up: <strong>the wizard screens can't be reopened after you submit</strong>, so check everything before finalizing. (The good news: most values stay editable afterward on the settings screen.)</p>
<h3>The Connect screen</h3>
<p>There are six things to set here — the seventh, the all-important System Message, gets its own module next:</p>
<ol>
<li><strong>Name</strong> — <code>CompanyNameExternalSettings</code>.</li>
<li><strong>Description</strong> — a short note; no programmatic effect.</li>
<li><strong>AI provider</strong> — leave <strong>OpenAI</strong> (the default). Only switch to Gemini if the key you added in Step 3 was a Gemini key.</li>
<li><strong>Key</strong> — choose the OpenAI key you added in Step 3.</li>
<li><strong>Model</strong> — pick the most recent available (GPT-5, as of this writing).</li>
<li><strong>API method</strong> — leave <strong>Chat Completion</strong>.</li>
</ol>
${eaShot('05-connect-screen.png','The Connect screen: Name, Description, AI provider (OpenAI), key, model, API method, and the System Message.')}`,
    takeaways: [
      "Add New Settings opens a four-part wizard (Connect → Knowledge → Customize → Create) that can't be reopened once submitted",
      "On Connect: name it, leave OpenAI + Chat Completion, pick your OpenAI key and the newest model",
      "Most settings remain editable afterward, even though the wizard screens don't"
    ]
  },
  {
    id: 4, group: "Build the Settings",
    title: "The System Message: a client-specific agent",
    time: "9 min",
    objectives: [
      "Understand why the System Message is the most important field",
      "Use the adaptation prompt to turn the default into a client-specific message",
      "Know what the rewrite must preserve vs. change"
    ],
    body: `
<h3>Why the System Message matters most</h3>
<p>The <strong>System Message</strong> is the single most important field in the whole setup — it defines how the agent behaves, and it's sent with <em>every</em> request, so it also drives cost. Commercient ships a default system prompt; your job is to adapt it into a finished, client-specific message. Don't write one from scratch, and don't ship the default.</p>
<h3>How to build it</h3>
<ol>
<li>In the System Message field, select all and copy the default prompt (Ctrl+A, Ctrl+C).</li>
<li>Open your LLM of choice — preferably <strong>Claude Opus 4.8+</strong>.</li>
<li>Paste the default, then add the adaptation prompt below. It will first ask you for two inputs — the <strong>company name + website URL</strong>, and the <strong>agent's purpose</strong>. Provide them, and it returns a finished, paste-ready system message.</li>
<li>Erase the default in the field, paste the new one, and click <strong>Next: Knowledge Base</strong>.</li>
</ol>
${eaShot('06-system-message.png','Adapt the default system message into a client-specific one before moving on.')}
<div class="callout"><h4>What the rewrite preserves vs. changes</h4><p>It <strong>keeps the mechanics</strong> — the #### query delimiters, the tool/step sequence (identify tool &rarr; search the documents &rarr; clarify &rarr; final answer), the markdown requirement, and the exact <code>Sources:[doc_123]</code> format — because those are platform requirements. It <strong>changes</strong> the framing, scope, tone, and examples; adds an identity line, a company snapshot, a scope statement, an escalation path, and a no-results fallback; replaces the Commercient-internal examples with three realistic client ones; and keeps everything lean, since every token ships on every call.</p></div>
<h3>The adaptation prompt</h3>
<p>Paste the default system prompt into Claude, then this:</p>
${eaPrompt(SYS_MSG_PROMPT)}`,
    takeaways: [
      "The System Message defines the agent's behavior and ships on every call — adapt the default, never write from scratch or ship the default",
      "Use Claude (Opus 4.8+): paste the default, run the adaptation prompt, provide the company + purpose, paste the result back",
      "The rewrite must preserve the mechanics (#### delimiters, step sequence, Sources:[] format) and change only framing, tone, and examples"
    ]
  },
  {
    id: 5, group: "Build the Settings",
    title: "Settings, part 2: Knowledge, Customize & Create",
    time: "5 min",
    objectives: [
      "Wire the knowledge base and keys on the Knowledge screen",
      "Set the greeting and customize options",
      "Review and save — knowing the wizard won't reopen"
    ],
    body: `
<h3>The Knowledge screen</h3>
<p>Leave the first field default; select the <strong>Pinecone key</strong> from Step 3; choose the <strong>knowledge base</strong> from Step 4; leave the next field default; select the <strong>OpenAI key</strong> from Step 3; leave the last field default; then click <strong>Next: Customize</strong>.</p>
${eaShot('07-knowledge-base-screen.png','Knowledge screen: select the Pinecone key, the knowledge base, and the OpenAI key; leave the rest default.')}
<h3>The Customize screen</h3>
<p>Set the greeting — e.g., <em>"Hello, thank you for visiting [Company Name], what can I help you with today?"</em> The follow-up setting lets the agent ask clarifying follow-up questions (and caps how many). Keep <strong>Powered by Commercient</strong> on; stop-generation and clear-chat are optional toggles.</p>
<h3>Review &amp; Create</h3>
<p>Click <strong>Review &amp; Create</strong>, check everything, and <strong>Save</strong>. Remember: these four wizard screens won't be accessible again, but most of the settings remain editable afterward. Once saved, the settings customization screen refreshes.</p>
${eaShot('08-customize-review.png','Set the greeting and options, then Review & Create → Save.')}`,
    takeaways: [
      "On Knowledge: pick the Pinecone key, the knowledge base, and the OpenAI key; leave the rest default",
      "On Customize: set the greeting, keep \"Powered by Commercient\" on, treat the rest as optional",
      "Review & Create → Save; the wizard won't reopen, but most settings stay editable"
    ]
  },
  {
    id: 6, group: "Advanced Settings",
    title: "Advanced settings: LLM, VectorDB, UI & guardrails",
    time: "8 min",
    objectives: [
      "Switch to the Advanced view and handle the save-resets-to-Simple quirk",
      "Tune the LLM settings that matter (temperature, follow-ups)",
      "Set the UI to the client's brand and enable lead capture"
    ],
    body: `
<h3>Switch to Advanced</h3>
<p>The refreshed screen has <strong>Simple</strong> and <strong>Advanced</strong> views. Customers usually stay in Simple (less to overwhelm them), but the most powerful and necessary adjustments live in <strong>Advanced</strong> — toggle to it. Set the name and description, ignore Share, and <strong>Save</strong>.</p>
<div class="callout"><h4>A quirk to expect</h4><p>Each time you save a setting, the view flips back to Simple and forwards you to LLM Settings. <strong>Re-toggle Advanced before continuing</strong> every time. (Engineers are addressing this.)</p></div>
<h3>LLM settings</h3>
<p>Most fields stay default. Two are worth knowing: <strong>Temperature</strong> is the creativity dial — closer to 0 means the agent "makes things up" less, but going too low can actually lower its answer success rate, so don't reflexively bottom it out. And set <strong>max follow-ups / tool iterations to 5</strong>. Save.</p>
${eaShot('09-llm-settings.png','LLM settings: mostly defaults; mind temperature, and set follow-ups to 5.')}
<h3>VectorDB settings</h3>
<p>Three screens, almost entirely defaults. One field is <strong>required</strong> and is provided together with your Pinecone key by your platform contact. Leave everything else default.</p>
${eaShot('10-vectordb-settings.png','VectorDB settings: nearly all default; one required field comes with the Pinecone key.')}
<h3>UI settings</h3>
<p>This is where the chat takes on the client's look. Set the agent's chat title and header text, a short subtitle (e.g., <em>"Access a wealth of information with our AI agent"</em>), and an error message pointing to the client's support number. Upload the images: the user icon, the AI-response icon, the header image, and the minimized <strong>bubble icon</strong> (the corner icon, like Charlie's). Optionally turn on suggested prompts. Under feedback, keep thumbs up/down on and list the email(s) that should receive reports (mind the list format). <strong>Lead capture</strong> is one of the most-wanted features — add the customer's emails so they're notified when someone interacts with the chat.</p>
${eaShot('11-ui-settings.png','UI settings: titles, subtitle, error message, and the icons/images including the corner bubble icon.')}
${eaShot('12-ui-settings-2.png','More UI settings: feedback reports and lead capture — add the notification emails to alert the customer.')}
<h3>Group chat &amp; guardrails</h3>
<p>Turn <strong>group chat off</strong>. The <strong>guardrails</strong> defaults are good — leave them.</p>`,
    takeaways: [
      "Toggle to Advanced for the important settings; it reverts to Simple after every save, so re-toggle each time",
      "LLM: keep defaults, but don't over-lower temperature (too low can hurt answers) and set follow-ups to 5",
      "UI: brand the chat and enable lead capture (notification emails); group chat off, guardrails default"
    ]
  },
  {
    id: 7, group: "Deploy & Demo",
    title: "Deploy: public key & chatbot",
    time: "6 min",
    objectives: [
      "Generate the agent's public key and store it safely",
      "Create the chatbot deployment and attach the settings + key"
    ],
    body: `
<h3>Step 6 — Generate the public key</h3>
<p>Generate a public key for the agent. Description: <code>CompanyName External Agent</code>. Log in as the admin user you're already using, leave <strong>expiration</strong> and <strong>allowed domains</strong> blank, and click <strong>Generate</strong>. <strong>Copy it somewhere safe immediately</strong> — you may not be able to retrieve it again, and you'll need it in the next steps.</p>
${eaShot('13-generate-public-key.png','Generate the public key; copy it into a safe place right away — it may not be retrievable later.')}
<h3>Step 7 — Create the chatbot</h3>
<p>Create the deployment: name <code>CompanyNameExternal</code>, a brief description, deploy type <strong>Chatbot</strong>. Open it via the three dots &rarr; <strong>More Detail</strong>. Set <strong>AI Settings</strong> to the settings you built in Step 5, add a description, and <strong>Save</strong>. On the <strong>Chatbot</strong> tab: keep the first toggle on, choose the key you just created, and paste its value.</p>
${eaShot('14-create-chatbot.png','Create the Chatbot deployment, set AI Settings to your Step 5 settings, choose the key, and paste its value.')}
<div class="callout"><h4>Two ways to make the key</h4><p>You can generate the public key here on the Chatbot tab instead of in Step 6. If you already generated it in Step 6, just ignore that button and paste the value you saved.</p></div>`,
    takeaways: [
      "Generate the public key with expiration and allowed domains blank, and copy it immediately — it may not be retrievable later",
      "Create a Chatbot deployment, set AI Settings to your Step 5 settings, and attach the key + value",
      "The key can be generated in Step 6 or on the Chatbot tab — do it once, either place"
    ]
  },
  {
    id: 8, group: "Deploy & Demo",
    title: "Deploy: build & test the demo page",
    time: "6 min",
    objectives: [
      "Copy the embed script exactly",
      "Use the demo prompt to build a realistic client demo page",
      "Test the widget and troubleshoot if it doesn't appear"
    ],
    body: `
<h3>Get the embed script</h3>
<p>Once you paste the key, the <strong>embed script</strong> beneath the fields updates. That script is what goes on a webpage to render the agent. Copy it exactly.</p>
${eaShot('15-embed-script.png','After pasting the key, the embed script updates — copy the whole script tag verbatim.')}
<h3>Build a demo page with Claude</h3>
<p>To show the client their agent in a realistic setting, take the embed script to Claude and have it build a single-file mock of the client's website with the widget embedded. Paste the script, then give Claude the demo prompt below. The rules that matter most:</p>
<ul>
<li><strong>The embed script is sacred</strong> — copy the entire <code>&lt;script&gt;</code> tag verbatim, right before <code>&lt;/body&gt;</code>. Never retype the <code>data-chatbot-id</code>, <code>data-public-key</code>, or <code>data-bubble-icon</code> values; copy, never transcribe (they're long opaque strings and hand-typing corrupts them).</li>
<li><strong>No fake widget</strong> — don't add a second bubble or a mock chat window. The real widget renders itself in its corner; the page must not compete with it.</li>
<li><strong>Match the real brand</strong> — real colors, logo (recreated in SVG/CSS, never hotlinked), nav, headline, categories, and CTA. One self-contained .html file, inline CSS, no external assets, responsive, nothing overlapping the widget's corner.</li>
</ul>
<div class="callout"><h4>If the widget doesn't appear</h4><p>Opening straight from disk (file://) can block it. Serve locally with <code>python3 -m http.server 8000</code> and load <code>http://localhost:8000/&lt;filename&gt;</code>.</p></div>
<h3>The demo-page prompt</h3>
<p>Paste the embed script into Claude, then this:</p>
${eaPrompt(DEMO_PROMPT)}`,
    takeaways: [
      "Copy the updated embed script verbatim — never retype the data-chatbot-id / data-public-key / data-bubble-icon values",
      "Use the demo prompt to build a single-file, on-brand client page with the real widget (no fake or second widget)",
      "If the widget doesn't show from file://, serve locally with python3 -m http.server 8000"
    ]
  }
];

const EXTERNAL_AGENT_CHECKS = {
  1: { q: "Where does the bulk of external-agent setup actually take place?",
       a: ["Entirely inside the Commercient employee instance, from the first step to the last",
           "In the customer's own instance, after the Sync Agent is turned on from the employee instance",
           "Directly on the customer's website server, through an uploaded configuration file",
           "Inside the OpenAI dashboard, which then pushes the finished agent to the customer"], c: 1 },
  2: { q: "Which two API keys do you add before building the agent?",
       a: ["An OpenAI key and a Pinecone key (with its URL), both added under AI Tools",
           "A Salesforce key and a HubSpot key, so the agent can reach the customer's CRM",
           "A single Commercient master key that covers both the model and the database",
           "A Google key and a Microsoft key, chosen to match the customer's email provider"], c: 0 },
  3: { q: "On the Connect screen, what should the AI provider be set to?",
       a: ["Whichever provider the customer's own website happens to have been built on",
           "Gemini, since it is the default and the more cost-effective of the two",
           "OpenAI (the default) — pick Gemini only if the key you added was Gemini",
           "It rotates automatically between OpenAI and Gemini on each incoming request"], c: 2 },
  4: { q: "How should the agent's System Message be created?",
       a: ["Written fresh for each client, from a blank field, with no starting template",
           "Left exactly as the shipped default, since it already works for every client",
           "Adapted from the default via an LLM into a client-specific message, keeping the mechanics",
           "Generated automatically by the portal from the company's website URL alone"], c: 2 },
  5: { q: "On the Customize screen, what should happen with \"Powered by Commercient\"?",
       a: ["It should stay on; the greeting is set here and most other toggles are optional",
           "It should be turned off so the agent looks fully native to the customer",
           "It only appears after the agent has answered its first hundred questions",
           "It controls whether the agent can ask follow-up questions during a chat"], c: 0 },
  6: { q: "What's the right read on the Temperature setting in LLM settings?",
       a: ["Always set it to 0.00, because a lower temperature is strictly better for accuracy",
           "Lower means less making-things-up, but going too low can actually reduce answer success",
           "It sets the maximum number of follow-up questions the agent is allowed to ask",
           "It should be maxed out so the agent is as helpful and creative as possible"], c: 1 },
  7: { q: "Right after you generate the agent's public key, what should you do?",
       a: ["Wait for it to be emailed to the admin user listed on the generation screen",
           "Set an expiration date and an allowed-domains list before it can be used",
           "Copy it somewhere safe immediately — you may not be able to retrieve it again",
           "Regenerate it twice more, since only the third key issued is the valid one"], c: 2 },
  8: { q: "What's the rule for the embed script when building the demo page?",
       a: ["Copy the entire script tag verbatim; never retype its data-chatbot-id or data-public-key values",
           "Retype it cleanly and reindent it so the demo file stays tidy and readable",
           "Add a second, simulated chat bubble next to it so the demo clearly shows a chat",
           "Shorten the long attribute values to keep the demo file small and quick to load"], c: 0 }
};
EXTERNAL_AGENT_MODULES.forEach(m => { m.check = EXTERNAL_AGENT_CHECKS[m.id]; });

const EXTERNAL_AGENT_QUIZ = {
  passMark: 0.8,
  sections: ["Prep, keys & knowledge base", "Building the settings", "Deploy & demo"],
  questions: [
    { s:0, q:"What is a Commercient external agent?",
      a:["A customer-facing AI chat on the customer's website that answers from their own content",
         "An internal tool Commercient staff use to reset a customer's data sync",
         "A background service that copies the customer's CRM into a spreadsheet nightly",
         "A replacement website that Commercient builds and hosts for the customer"] },
    { s:0, q:"Before the customer-instance work, what do you do in the employee instance?",
      a:["Generate the public key and the embed script for the customer's site",
         "Turn on the CommercientAISyncAgent and wait for its status to read \"Installed\"",
         "Upload the customer's brand colors and logo for the chat widget",
         "Write the client-specific system message and paste in the API keys"] },
    { s:0, q:"Which two keys are added under AI Tools → API Keys?",
      a:["A Salesforce key and a HubSpot key for CRM access",
         "One Commercient master key plus one backup recovery key",
         "An OpenAI key and a Pinecone key (with its URL)",
         "A billing key and a domain-verification key"] },
    { s:0, q:"Why use a company-prefixed naming convention for keys and the knowledge base?",
      a:["It's required or the portal will reject the key when you try to save it",
         "It keeps them easy to match up in the dropdowns during the settings step",
         "It automatically links the agent to the customer's billing account",
         "It shortens the values so they cost fewer tokens on each call"] },
    { s:1, q:"What's true about the four-part settings wizard?",
      a:["It can be reopened and re-run any time you want to change something",
         "It can't be reopened after you submit, though most settings stay editable afterward",
         "It saves automatically after each field, so there's no final review step",
         "It must be completed inside the employee instance, not the customer's"] },
    { s:1, q:"How is the client-specific System Message produced?",
      a:["The default is left untouched because it already fits every client",
         "It's typed from scratch for each client with no reference to the default",
         "The default is adapted via an LLM, preserving its mechanics and changing framing/examples",
         "The portal writes it automatically from the customer's Pinecone index"] },
    { s:1, q:"Which elements must the System-Message rewrite keep unchanged?",
      a:["The #### delimiters, the step sequence, and the exact Sources:[] format — platform requirements",
         "The five internal Commercient examples about sync resets and Salesforce exports",
         "The default's generic tone and framing, so every agent sounds the same",
         "Nothing — the whole default should be replaced with fresh client content"] },
    { s:1, q:"After the settings wizard, why switch from Simple to Advanced?",
      a:["Advanced is required before the agent can be saved at all",
         "Simple hides the customer's branding options and Advanced restores them",
         "The most powerful, necessary adjustments live in the Advanced view",
         "Advanced is the only view where you can enter the API keys"] },
    { s:1, q:"What should you know about saving in the Advanced view?",
      a:["Saving locks the settings so they can't be edited again afterward",
         "It flips the view back to Simple each time, so re-toggle Advanced to continue",
         "It publishes the agent live to the customer's site immediately",
         "It clears the system message, which then has to be pasted back in"] },
    { s:2, q:"Right after generating the public key, the safest move is to:",
      a:["Leave it in the portal, since it can always be looked up again later",
         "Email it to the customer so they have a copy for their records",
         "Copy it somewhere safe immediately — it may not be retrievable again",
         "Set a short expiration on it so it can't be misused before launch"] },
    { s:2, q:"When Claude builds the demo page, how is the embed script handled?",
      a:["Copied verbatim before </body>; its data-chatbot-id and data-public-key are never retyped",
         "Retyped and reformatted so the demo file stays clean and consistent",
         "Paired with a second mock chat bubble so the demo obviously shows a chat",
         "Trimmed down, dropping the long attribute values to keep the file small"] },
    { s:2, q:"If the widget doesn't appear when you open the demo file, you should:",
      a:["Regenerate the public key, since a missing widget means the key expired",
         "Add a simulated chat window so the client still sees something working",
         "Serve it locally with python3 -m http.server 8000 and load it over http://localhost",
         "Hotlink the customer's real logo so the page finishes loading the widget"] }
  ]
};

const EXTERNAL_AGENT_COURSE = {
  id: "external-agent",
  status: "available",
  title: "External Agent Setup Certification",
  tagline: "Stand up a customer's website AI agent end to end — keys, knowledge base, settings, the client-specific system message, deploy, and a live demo page.",
  audience: "Partners, consultants, developers & the Commercient team who deploy website agents",
  estTime: "~50 minutes",
  icon: "assets/commercient-icon.png",
  badge: {
    name: "External Agent Setup Certified",
    blurb: "Certified to set up a Commercient external (website) agent end to end — from keys and knowledge base to a live, embedded demo.",
    img: "assets/badge-external-agent.png"
  },
  skills: ["AI Agents", "Conversational AI", "Software Deployment", "Prompt Engineering", "Solution Implementation"],
  payoff: "Learn the external-agent setup once and it becomes a repeatable, billable skill — every step, every screen, and the two Claude prompts that do the heavy lifting, so you can hand a customer a working, on-brand website agent.",
  payoffShort: "Learn it once, then deploy on-brand website agents for customer after customer.",
  brag: "I'm certified to set up Commercient External Agents — from keys and knowledge base to a live, embedded demo page.",
  groups: [
    { name: "Before You Start", modules: [1] },
    { name: "Keys & Knowledge Base", modules: [2] },
    { name: "Build the Settings", modules: [3, 4, 5] },
    { name: "Advanced Settings", modules: [6] },
    { name: "Deploy & Demo", modules: [7, 8, "quiz"] }
  ],
  roadmap: [
    { step: 1, title: "Before you start", desc: "What an external agent is, turning on the Sync Agent, and getting into the customer instance." },
    { step: 2, title: "Keys & knowledge base", desc: "Add the OpenAI and Pinecone keys and initialize the knowledge base." },
    { step: 3, title: "Build the settings", desc: "The Connect screen, the client-specific system message, and the Knowledge/Customize screens." },
    { step: 4, title: "Advanced settings", desc: "LLM, VectorDB, UI branding, lead capture, and guardrails." },
    { step: 5, title: "Deploy & demo", desc: "Generate the public key, create the chatbot, and build a live demo page." },
    { step: 6, title: "Get certified", desc: "Pass the quiz and earn the External Agent Setup Certified badge." }
  ],
  learn: [
    "Turn on the Commercient AI Sync Agent and work inside the customer instance.",
    "Add the OpenAI and Pinecone keys and initialize the knowledge base with clean naming.",
    "Complete the settings wizard, including a client-specific system message adapted from the default.",
    "Tune the advanced LLM, VectorDB, and UI settings, and enable lead capture.",
    "Generate the public key, create the chatbot, and build a live, on-brand demo page.",
    "Use the two Claude prompts for the system message and the demo page correctly."
  ],
  modules: EXTERNAL_AGENT_MODULES,
  quiz: EXTERNAL_AGENT_QUIZ
};


const COURSES = [
  {
    id: "fluency",
    status: "available",
    title: "Agentic Enterprise Fluency Certification",
    tagline: "Learn to explain what Commercient is — the intelligence layer for the agentic enterprise — with one pitch, one vocabulary, and one posture, in any conversation.",
    audience: "Start here — employees, partners & the AI-curious",
    estTime: "~30 minutes",
    icon: "assets/commercient-icon.png",
    badge: {
      name: "Agentic Enterprise Fluent",
      blurb: "Fluent in the language of the agentic enterprise — the pitch, the platform vocabulary, and the posture Commercient leads with.",
      img: "assets/badge-agentic-fluency.png"   // drop the PNG in assets/ and it lights up; CSS disc fallback until then
    },
    skills: ["Artificial Intelligence (AI)", "AI Agents", "Enterprise Software", "Data Governance", "Technical Communication"],
    payoff: "Fluency is leverage. The same five-minute conversation, held the same way by every voice, is what turns hallway chats into discovery calls — for employees and partners alike.",
    payoffShort: "One pitch, held the same way by every voice — hallway chats become discovery calls.",
    brag: "I'm now Agentic Enterprise Fluent — certified on the language of the agentic enterprise at Commercient Academy.",
    groups: [
      { name: "The Story", modules: [1, 2, 3] },
      { name: "The Platform Language", modules: [4, 5] },
      { name: "Speaking For Commercient", modules: [6, "quiz"] }
    ],
    roadmap: [
      { step: 1, title: "Own the pitch", desc: "The one-sentence identity, unpacked phrase by phrase, plus the plain-English fallback." },
      { step: 2, title: "Tell the story", desc: "Invert the stack, agents vs. chatbots, and why the fastest businesses run on agents." },
      { step: 3, title: "Speak the platform", desc: "Data lake, near real-time, MCP, orchestration, governance — the locked vocabulary." },
      { step: 4, title: "Get certified", desc: "Pass the fluency quiz and earn the Agentic Enterprise Fluent badge." }
    ],
    learn: [
      "Deliver Commercient's one-sentence pitch — and the plain-English fallback — word for word.",
      "Explain the inverted stack: why the data lake, not any one system, is the center of gravity.",
      "Draw the line between agents that take action and tools that summarize.",
      "Define the locked vocabulary: data lake, near real-time, MCP, agent-to-agent, orchestration, AI-agnostic.",
      "Answer the governance question — \"will my data be sent to OpenAI?\" — precisely and confidently.",
      "Hold the Commercient posture: positive framing, no competitor bashing, name only Anthropic and OpenAI."
    ],
    modules: FLUENCY_MODULES,
    quiz: FLUENCY_QUIZ
  },
  {
    id: "platform",
    status: "available",
    title: "Commercient AI & Data Lake Platform Certification",
    tagline: "Learn to spot, scope, position, and set up the Commercient Platform — its three connected pieces (the AI Platform, the Data Lake, and Data Integration) — and earn a verifiable credential.",
    audience: "Partners, resellers, consultants, admins, and Commercient team members. The platform, opportunity, selling, and delivery content applies to everyone; partner-only tools (Portal, Charlie, PAM) are flagged where they appear.",
    estTime: "~95 minutes",
    icon: "assets/commercient-icon.png",
    badge: {
      name: "Commercient AI & Data Lake Platform Certified",
      blurb: "Certified on the full Commercient Platform — its three connected pieces: the AI Platform, the Data Lake, and Data Integration.",
      img: "assets/badge-ai-platform.png"
    },
    skills: ["ERP Integration","Customer Relationship Management (CRM)","Solution Selling","Artificial Intelligence (AI)","Data Governance","Data Lakes"],
    payoff: "Every path through this certification points at the same outcome — getting more from the Commercient Platform, and, for many, revenue. Get certified once, then put it to work again and again.",
    payoffShort: "One platform, three connected pieces — learn to spot, scope, and sell across all of it.",
    brag: "I'm now Commercient AI & Data Lake Platform Certified — the full platform: AI, the Data Lake, and Data Integration, certified at Commercient Academy.",
    groups: [{"name":"The Platform","modules":[1,2,3,4]},{"name":"Pricing & Packaging","modules":[5,6]},{"name":"Finding Opportunities","modules":[7,8,9]},{"name":"The Tools","modules":[10,11]},{"name":"Selling the Platform","modules":[12,13,14]},{"name":"Delivery","modules":[15,16,17]},{"name":"Reference","modules":[18,19,"quiz"]}],
    roadmap: [{"step":1,"title":"The Commercient Platform","desc":"the three connected pieces, how data flows in and out, and what the always-current view makes possible."},{"step":2,"title":"Pricing and packaging","desc":"the three-piece subscription, usage-based fees, and onboarding."},{"step":3,"title":"Finding opportunities","desc":"recognizing Data Integration, Data Lake, and AI use cases in everyday conversations."},{"step":4,"title":"The tools","desc":"the Partner Portal, Charlie, lead submission, deal tracking, and the Quoting Tool."},{"step":5,"title":"Selling the platform","desc":"running the demo, positioning, and the AI discovery and enablement process."},{"step":6,"title":"Delivery","desc":"Guided Implementation, scope boundaries, and timelines."},{"step":7,"title":"Get certified","desc":"complete the certification quiz and claim your credential."}],
    learn: ["Explain the Commercient Platform and how its three connected pieces — the AI Platform, the Data Lake, and Data Integration — form one always-current view of a customer's business.","Describe how Commercient moves data with the four integrators (CDC Replicator, Enterprise System Transactional Integrator, Enterprise CRM Integrator, and Point-to-Point Pulse Integrator) and keeps it current with Change Data Capture.","Explain how the Data Lake serves data out through three surfaces — APIs, AI agents via MCP, and real-time events — all behind one security gate.","Describe the AI Platform: agent hosting, the AI tools/API/webhook platform, the knowledge base, the AI Portal, and the two External MCP Servers.","Identify Data Integration, Data Lake, and AI opportunities in everyday customer conversations.","Explain how the platform is priced: the three-piece subscription, usage-based fees, and prepaid onboarding — including the pricing logic, without quoting numbers.","Use the Commercient tools — the Partner Portal, Quoting Tool, Charlie, and the demo environment — to find support and scope opportunities.","Set accurate expectations around implementation scope, CGI, timelines, and delivery.","Position the platform, run the demo, and bring the Commercient AI team in to co-present.","Complete the certification quiz to claim your credential."],
    modules: MODULES,
    quiz: QUIZ
  },
  {
    id: "portal",
    status: "available",
    title: "Commercient Partner Portal Certification",
    tagline: "Navigate the Commercient partner portal with confidence — leads, quoting, project status, sync health, usage, support, and alerts. (Customers: see the Customer Panel Certification.)",
    audience: "Partners, resellers & consultants",
    estTime: "~30 minutes",
    icon: "assets/commercient-icon.png",
    badge: {
      name: "Commercient Portal Certified",
      blurb: "Certified to work the Commercient portal — projects, sync health, usage, and support, answered without waiting on an email.",
      img: "assets/badge-portal.png"   // drop the PNG in assets/ and it lights up; CSS disc fallback until then
    },
    skills: ["SaaS", "Customer Relationship Management (CRM)", "ERP Integration", "Technical Support", "Project Management"],
    payoff: "Every status question you can answer yourself from the portal is a faster project and a stronger relationship — you become the best-informed person in the room instead of the one waiting on a reply.",
    payoffShort: "Answer every status question yourself — faster projects, stronger relationships.",
    brag: "I'm now Commercient Portal Certified — leads, quoting, project status, and sync health, certified at Commercient Academy.",
    groups: [
      { name: "Getting Around", modules: [1] },
      { name: "Winning Work", modules: [2] },
      { name: "Running Projects", modules: [3, 4] },
      { name: "Staying Informed", modules: [5, 6, "quiz"] }
    ],
    roadmap: [
      { step: 1, title: "Get in and get oriented", desc: "Sign in, read My Dashboard, and learn the portal's three resource groups." },
      { step: 2, title: "Win work (partners)", desc: "Find Your Integration, submit leads, track Active Deals, and build estimates." },
      { step: 3, title: "Run your projects", desc: "Project stages, the company dashboard, sync health, logs, and the AI tools." },
      { step: 4, title: "Stay informed & certified", desc: "Usage, tickets, Charlie, alerts — then pass the quiz and earn the badge." }
    ],
    learn: [
      "Sign in at portal.commercient.com and navigate with the three resource groups.",
      "Read My Dashboard and the company list — ERP, CRM, database, and status at a glance.",
      "Submit leads, track Active Deals, and build Quoting Tool estimates (partner view).",
      "Answer \"where are we?\" from the project status page — stages, timelines, and sign-offs.",
      "Check sync health, failed records, logs, and the audit trail on any company's dashboard.",
      "Work support like a pro: well-formed tickets, Help Center, Charlie, and email alerts."
    ],
    modules: PORTAL_MODULES,
    quiz: PORTAL_QUIZ
  },
  {
    id: "customer-panel",
    status: "available",
    title: "Commercient Customer Panel Certification",
    tagline: "Master your Commercient panel end to end — track your project, understand your sync, configure and troubleshoot Phase 1, manage billing and users, and get the most out of the platform.",
    audience: "Customer admins & main users",
    estTime: "~30 minutes",
    icon: "assets/commercient-icon.png",
    badge: {
      name: "Commercient Customer Panel Certified",
      blurb: "Certified on the Commercient customer panel — project tracking, how your sync works, Phase 1 configuration, and self-service troubleshooting.",
      img: "assets/badge-customer-panel.png"   // drop the PNG in assets/ and it lights up; CSS disc fallback until then
    },
    skills: ["SaaS", "Customer Relationship Management (CRM)", "ERP Integration", "Data Governance", "Technical Support"],
    payoff: "Your panel is where you see and manage everything Commercient does for you — your integration, the data moving between your systems, what's flowing into the Commercient data lake, and your Commercient AI agents. The better you know it, the more you get out of the platform and the more you can handle on your own.",
    payoffShort: "Know your panel end to end — get more from the platform, handle more on your own.",
    brag: "I'm now Commercient Customer Panel Certified at Commercient Academy — my project, my sync, my data.",
    groups: [
      { name: "Getting In", modules: [1] },
      { name: "Your Project", modules: [2] },
      { name: "How the Sync Works", modules: [3, 4] },
      { name: "Running the Account", modules: [5, 6, "quiz"] }
    ],
    roadmap: [
      { step: 1, title: "Get in and get oriented", desc: "Sign in, set up authentication, and learn the left-hand menu." },
      { step: 2, title: "Track your project", desc: "Read your milestones, weekly sync status, and Help Desk tickets." },
      { step: 3, title: "Understand the sync", desc: "How your sync works, the query editors, and Phase 1 configuration, mapping, and logs." },
      { step: 4, title: "Manage the account", desc: "Purchase add-ons, billing, users, and alerts — plus reading your data in the CRM." },
      { step: 5, title: "Get certified", desc: "Pass the quiz and earn the Commercient Customer Panel Certified badge." }
    ],
    learn: [
      "Sign in, set up authentication, and navigate the panel with confidence.",
      "Read your project milestones and weekly sync status on My Dashboard.",
      "Explain how your sync works — from your ERP into the Commercient cloud, then out to your CRM.",
      "Read CRM configuration, field mapping, and filters; troubleshoot a record at its source.",
      "Manage Purchase, billing (the 3 GB limit), users, and alerts with confidence.",
      "Recognize matched accounts, managed custom objects, and associated records in your CRM."
    ],
    modules: CUSTOMER_PANEL_MODULES,
    quiz: CUSTOMER_PANEL_QUIZ
  },
  EXTERNAL_AGENT_COURSE,
  IMPLEMENTATION_COURSE,
  {
    id: "ai-admin",
    status: "coming-soon",
    title: "AI Admin Certification",
    tagline: "For customer admins: connect the apps you already run — Gmail and more — to the Commercient AI platform.",
    audience: "Customer administrators & power users",
    estTime: "Coming soon",
    icon: "assets/commercient-icon.png",
    badge: {
      name: "AI Admin",
      blurb: "Certified to connect and administer apps on the Commercient AI platform."
    },
    skills: ["Artificial Intelligence (AI)", "System Administration", "Business Process Automation", "SaaS", "Data Integration"],
    payoff: "Get more out of the working apps your business already runs — no developer required. Basic admin enablement that pays off immediately in capacity.",
    payoffShort: "More capacity from the apps you already run — no developer required.",
    note: "A customer-focused track, building on the live coffee-chat demo. In development."
  }
];
