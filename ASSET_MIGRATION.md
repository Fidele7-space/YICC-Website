# Asset migration instructions

This branch includes a helper script to copy static assets (images and CSS) from the original nested folders into yicc-website/public/assets and to update HTML references under yicc-website/Files' Folders/html files to use the new /assets paths.

How to use (run locally in Codespaces or your machine):

1. Make the script executable:
   chmod +x scripts/move_assets.sh

2. Run the script from the repo root:
   ./scripts/move_assets.sh

3. Review the changes, commit and push:
   cd yicc-website
   git add public/assets "Files' Folders/html files" index.html
   git commit -m "chore(assets): move static assets to public/assets and update html refs"
   git push origin fix/static-website

Notes:
- The script only copies files it finds under the expected directories. If your files are in different locations, adjust the paths at the top of the script.
- The script updates HTML files in-place. Please review diffs before committing.
