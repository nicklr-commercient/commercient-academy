#!/usr/bin/env bash
# One-command publish: syntax-check -> build -> commit -> push -> deploy.
# The Cloudflare Pages project is direct-upload (created via wrangler), so the
# deploy step here is what makes it live — a git push alone does NOT deploy.
#
#   ./scripts/publish.sh "added Partner Quoting course"
#
# Needs node >= 22 for wrangler; nvm's v22 is used explicitly so this works
# from any terminal regardless of its default node.
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$HOME/.nvm/versions/node/v22.18.0/bin:$PATH"

# Durable deploy credential: a Cloudflare API token in this file beats the
# wrangler OAuth login, whose refresh can silently die in non-interactive
# shells. Create one at dash.cloudflare.com/profile/api-tokens (template:
# "Edit Cloudflare Workers", or custom with Account → Cloudflare Pages → Edit)
# and save it with:  umask 177 && pbpaste > ~/.config/commercient-academy/cf-token
CF_TOKEN_FILE="$HOME/.config/commercient-academy/cf-token"
if [ -f "$CF_TOKEN_FILE" ]; then
  export CLOUDFLARE_API_TOKEN="$(cat "$CF_TOKEN_FILE")"
fi

MSG="${1:-Content update $(date '+%Y-%m-%d %H:%M')}"

echo "1/5 Syntax-checking JS…"
for f in config.js backend.js data.js implementation-course.js app.js; do
  node --check "$f"
done

echo "2/5 Building the public site…"
bash scripts/build-dist.sh

echo "3/5 Committing…"
git add -A
if git diff --cached --quiet; then
  echo "No source changes — deploying current build anyway."
else
  git commit -m "$MSG"
  echo "4/5 Pushing to GitHub (the backup/source of truth)…"
  git push origin main
fi

echo "5/5 Deploying to Cloudflare Pages…"
wrangler pages deploy dist --project-name commercient-academy --branch main --commit-dirty=true

echo "Published: https://commercient-academy.pages.dev"
