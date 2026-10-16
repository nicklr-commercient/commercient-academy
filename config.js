/* Commercient Academy — environment config.
   The anon key is designed to be public (row-level security protects data).
   SITE_URL is the public home; it's used for credential verify links. */
window.ACADEMY_CONFIG = {
  SUPABASE_URL: "https://eswuflpckfoohrgnxhez.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzd3VmbHBja2Zvb2hyZ254aGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5NzUyNDAsImV4cCI6MjA5ODU1MTI0MH0.VY7uGlQKzaYPws9buYXGt9Au_rRQhTd6hxwwoqQdUKU",
  // Empty = use whatever host is serving the app (backend.js falls back to
  // location.origin), so verify links are always correct — locally, on the
  // *.pages.dev staging URL, and on academy.commercient.com once DNS lands.
  // Pin it to "https://academy.commercient.com" after cutover if you want
  // credential links locked to the canonical domain.
  SITE_URL: "",
  // Numeric LinkedIn company ID for Commercient (from the company-page admin
  // URL: linkedin.com/company/<ID>/admin). When set, "Add to LinkedIn" links
  // the credential to the company page and shows the logo. Empty = free-text
  // organization name fallback.
  LINKEDIN_ORG_ID: "",
  // HubSpot lead capture (Commercient PRODUCTION portal — not the demo one).
  // Academy sign-ups post to this form via the public Forms API; HubSpot
  // dedupes by email. Both empty = feature off. Get these from the form's
  // embed snippet after creating "Commercient Academy Registration" (fields:
  // Email, First name, Last name, Company name) in Marketing → Forms.
  HUBSPOT_PORTAL_ID: "",
  HUBSPOT_FORM_GUID: ""
};
