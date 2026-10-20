#!/usr/bin/env bash
# Assemble the public site into dist/ for Cloudflare Pages.
#
# SECURITY: this is an ALLOWLIST. Only files named here are deployed.
# supabase/ (quiz answer keys), HANDOFF.md, _deploy/, Claude outputs/, and the
# stale single-file build must never ship — adding a new public file means
# adding it (or its folder) here deliberately.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist

PUBLIC_FILES=(
  index.html
  verify.html
  404.html
  config.js
  backend.js
  data.js
  implementation-course.js
  app.js
  styles.css
  _headers
)

for f in "${PUBLIC_FILES[@]}"; do
  cp "$f" dist/
done

# All course images/badges/screenshots (minus OS junk)
cp -R assets dist/assets
find dist -name '.DS_Store' -delete

# Videos SHIP with the site (2026-10-20): every episode fits Cloudflare Pages'
# 25MB/file limit (ep01 is a compressed delivery copy; the full-res original
# lives in assets/implementation/superseded-2026-10-08/). The guard below
# still fails the build if any future video exceeds the limit — compress it
# or host it externally (IMPL_VIDEOS accepts YouTube/Vimeo/Loom/Drive links).
# Superseded local backups never ship:
rm -rf dist/assets/implementation/superseded-*
find dist/assets -name '*.mov' -delete

# Guard 1: nothing secret in dist
if find dist \( -name '*.sql' -o -name 'HANDOFF*' -o -name '*.zip' \) | grep -q .; then
  echo "BUILD FAILED: secret or junk file found in dist/" >&2
  exit 1
fi

# Guard 2: no file at/over Cloudflare Pages' 25MB per-file limit
if find dist -type f -size +24M | grep -q .; then
  find dist -type f -size +24M -exec du -h {} \; >&2
  echo "BUILD FAILED: file(s) above exceed Cloudflare Pages' 25MB limit" >&2
  exit 1
fi

# Guard 3: every local file referenced by the HTML pages exists in dist
missing=0
for page in index.html verify.html; do
  for ref in $(grep -oE '(src|href)="[^"#]+"' "dist/$page" | sed -E 's/^(src|href)="//; s/"$//; s/\?v=[0-9]+//' | grep -v '^http'); do
    if [ ! -f "dist/$ref" ]; then
      echo "BUILD FAILED: dist/$page references missing file: $ref" >&2
      missing=1
    fi
  done
done
[ "$missing" -eq 0 ] || exit 1

echo "dist/ built OK: $(find dist -type f | wc -l | tr -d ' ') files, $(du -sh dist | cut -f1)"
