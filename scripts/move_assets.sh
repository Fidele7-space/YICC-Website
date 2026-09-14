#!/usr/bin/env bash
# scripts/move_assets.sh
# Usage: run from the repository root to copy assets into yicc-website/public/assets
# This script copies images and icon files from the nested "Files' Folders" into the Vite public folder
# and updates HTML references inside yicc-website/Files' Folders/html files to point to /assets/<filename>.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$ROOT_DIR/yicc-website"
SRC_ASSET_DIR="$SITE_DIR/Files' Folders/icons and logos"
SRC_ACTIVITY_DIR="$SITE_DIR/Activity pictures"
DEST_DIR="$SITE_DIR/public/assets"
HTML_DIR="$SITE_DIR/Files' Folders/html files"
CSS_DIR="$SITE_DIR/Files' Folders/CSS Files"

mkdir -p "$DEST_DIR"

# Copy icons and logos
if [ -d "$SRC_ASSET_DIR" ]; then
  echo "Copying icons and logos..."
  find "$SRC_ASSET_DIR" -type f -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.svg" | while IFS= read -r f; do
    base=$(basename "$f")
    cp -v "$f" "$DEST_DIR/$base"
  done
else
  echo "No icons and logos directory found at: $SRC_ASSET_DIR"
fi

# Copy activity pictures
if [ -d "$SRC_ACTIVITY_DIR" ]; then
  echo "Copying activity pictures..."
  find "$SRC_ACTIVITY_DIR" -type f -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" | while IFS= read -r f; do
    base=$(basename "$f")
    cp -v "$f" "$DEST_DIR/$base"
  done
else
  echo "No Activity pictures directory found at: $SRC_ACTIVITY_DIR"
fi

# Copy CSS files into public/assets/css (optional)
mkdir -p "$DEST_DIR/css"
if [ -d "$CSS_DIR" ]; then
  echo "Copying CSS files..."
  find "$CSS_DIR" -maxdepth 1 -type f -iname "*.css" | while IFS= read -r f; do
    base=$(basename "$f")
    cp -v "$f" "$DEST_DIR/css/$base"
  done
else
  echo "No CSS directory found at: $CSS_DIR"
fi

# Update HTML references in the html files to point to /assets/<filename>
if [ -d "$HTML_DIR" ]; then
  echo "Updating HTML references in $HTML_DIR..."
  # For each html file, replace occurrences of ../icons and logos/<name> and ../Activity pictures/<name> and ../CSS Files/<name>
  find "$HTML_DIR" -type f -iname "*.html" | while IFS= read -r html; do
    echo "Processing $html"
    # Use perl to do in-place replacements, handling spaces in path names
    perl -i -pe '
      s!\.\./icons and logos/([^"'" >)]+)!/assets/$1!g;
      s!\.\./Activity pictures/([^"'" >)]+)!/assets/$1!g;
      s!\.\./CSS Files/([^"'" >)]+)!/assets/css/$1!g;
    ' "$html"
  done
else
  echo "No HTML folder found at: $HTML_DIR"
fi

# Also update the root index.html if present
ROOT_INDEX="$SITE_DIR/index.html"
if [ -f "$ROOT_INDEX" ]; then
  echo "Updating root index.html references..."
  perl -i -pe '
    s!Files'"'"'" Folders/icons and logos/([^"'" >)]+)!/assets/$1!g;
    s!Files'"'"'" Folders/Activity pictures/([^"'" >)]+)!/assets/$1!g;
    s!Files'"'"'" Folders/CSS Files/([^"'" >)]+)!/assets/css/$1!g;
  ' "$ROOT_INDEX" || true
fi


echo "Asset copy & HTML update complete.\nPlease run:\n  cd $SITE_DIR\n  git add public/assets $HTML_DIR index.html || true\n  git commit -m 'chore(assets): move static assets to public/assets and update html refs' || echo 'No changes to commit'"
