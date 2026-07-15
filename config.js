/* Commercient Academy — environment config.
   The anon key is designed to be public (row-level security protects data).
   SITE_URL is the public home; it's used for credential verify links. */
window.ACADEMY_CONFIG = {
  SUPABASE_URL: "https://eswuflpckfoohrgnxhez.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzd3VmbHBja2Zvb2hyZ254aGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5NzUyNDAsImV4cCI6MjA5ODU1MTI0MH0.VY7uGlQKzaYPws9buYXGt9Au_rRQhTd6hxwwoqQdUKU",
  SITE_URL: "https://commercient-academy.netlify.app",
  // Numeric LinkedIn company ID for Commercient (from the company-page admin
  // URL: linkedin.com/company/<ID>/admin). When set, "Add to LinkedIn" links
  // the credential to the company page and shows the logo. Empty = free-text
  // organization name fallback.
  LINKEDIN_ORG_ID: ""
};
