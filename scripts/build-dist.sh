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

# Videos never ship to the static host (Cloudflare Pages caps files at 25MB).
# Local mp4 paths in IMPL_VIDEOS are blanked in the DEPLOYED copy only, so the
# module shows its "Video coming soon" placeholder until a YouTube/Vimeo/Loom
# link is pasted in (local dev keeps playing the local files).
nvids=$(find dist/assets -name '*.mp4' -o -name '*.mov' | wc -l | tr -d ' ')
find dist/assets \( -name '*.mp4' -o -name '*.mov' \) -delete
sed -i '' -E 's#"assets/[^"]+\.(mp4|mov)"#""#g' dist/implementation-course.js
if [ "$nvids" -gt 0 ]; then
  echo "NOTE: $nvids local video file(s) excluded from the deploy — paste hosted links (YouTube unlisted) into IMPL_VIDEOS to publish them."
fi

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
