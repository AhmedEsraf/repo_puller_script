# University Notes (GitHub Pages + Releases)

Minimal, fast notes browser organized by semesters and courses. Assets are hosted on GitHub Releases and referenced from JSON metadata. Deployed to GitHub Pages.

## Local Development

Requirements: Node 20+

```bash
npm install
npm run dev
```

Open the URL shown (typically http://localhost:5173).

## Project Structure

- `src/pages`: Home, Semester, Course, GlobalSearch, Leaderboard
- `src/components`: Navbar, SearchBar, Filters, Loading, ErrorState
- `src/data/semesterX`: Course JSONs and `index.json`

## Adding New Notes

1. Upload the asset (PDF/PPT/DOCX/Images) to a GitHub Release in your repository.
2. Create or edit the course JSON under `src/data/semesterN/COURSE.json` using this schema:

```json
{
  "courseCode": "1101",
  "courseName": "Introduction to Computer Science",
  "contents": [
    {
      "id": "c1",
      "title": "Lecture 1 Notes",
      "uploadedBy": "Ahmed Esraf",
      "session": "2022-23",
      "topics": ["Basics", "History of Computing"],
      "assetLink": "https://github.com/ORG/REPO/releases/download/v1.0/Lecture1.pdf",
      "uploadDate": "2025-09-03"
    }
  ]
}
```

3. Ensure the course filename (e.g., `1101.json`) is listed in that semester’s `index.json`.

## Deployment

GitHub Actions builds on push to `main` and deploys `dist` to GitHub Pages.

- Update `package.json` `homepage` (or set repo variables for `VITE_BASE`).
- For a user/organization site under `<ORG>/<REPO>`, set the Pages build to use GitHub Actions.

## Configuration Notes

- Base URL: `vite.config.js` reads `VITE_BASE`. For `<ORG>.github.io/<REPO>`, set it to `/REPO/`.
- Links to Releases: Use direct asset URLs, e.g. `https://github.com/ORG/REPO/releases/download/vX.Y/filename.pdf`.

## Stretch Features

- Global Search (Fuse.js)
- Dark mode (toggle in navbar)
- Leaderboard (top uploaders)


