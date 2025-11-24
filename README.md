
# Portfolio (Markdown-driven) — Vite + React + Tailwind

This project auto-loads markdown files from `/content/` and extracts YAML frontmatter (title, date, tags, etc.) using `import.meta.glob()` and the `yaml` parser.

## How to run

1. Extract the ZIP and open the folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open the URL shown by Vite (default: http://localhost:5173).

## Project Structure

- `content/` — markdown files (profile.md and project *.md)
- `src/` — React source code
- `public/old-web.html` — your uploaded file included for reference

## Notes

- This setup uses `yaml` package in the browser to parse YAML frontmatter.
- Vite's `import.meta.glob()` is used to read all markdown files automatically.
