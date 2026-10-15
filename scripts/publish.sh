#!/usr/bin/env bash
# One-command publish: syntax-check -> build check -> commit -> push.
# Cloudflare Pages auto-deploys the push; live in ~1 minute.
#
#   ./scripts/publish.sh "added Partner Quoting course"
#
set -euo pipefail
cd "$(dirname "$0")/.."

MSG="${1:-Content update $(date '+%Y-%m-%d %H:%M')}"

echo "1/4 Syntax-checking JS…"
for f in config.js backend.js data.js implementation-course.js app.js; do
  node --check "$f"
done

echo "2/4 Verifying the site builds cleanly…"
bash scripts/build-dist.sh

echo "3/4 Committing…"
git add -A
if git diff --cached --quiet; then
  echo "Nothing to publish — no changes since last publish."
  exit 0
fi
git commit -m "$MSG"

echo "4/4 Pushing (Cloudflare deploys this automatically)…"
git push origin main

echo "Published. Live in about a minute."
