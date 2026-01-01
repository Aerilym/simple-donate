#!/bin/bash
set -e

LOCAL_STANDALONE=".next/standalone"

# Clean build
rm -rf .next
pnpm build # or next build

# Copy static assets into standalone
cp -r .next/static "$LOCAL_STANDALONE/.next/"
cp -r public "$LOCAL_STANDALONE/"

echo "Built, standalone output: $LOCAL_STANDALONE"
