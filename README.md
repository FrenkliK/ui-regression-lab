# UI Regression Lab

Playwright end-to-end tests for the bundled Applyboard demo in `app/`. This repository is self-contained and can be cloned on its own.

## Run

Requires Node.js 20+ and npm.

```bash
npm install
npx playwright install chromium
npm test
```

The test command starts a tiny static server for the tracker, runs the suite in desktop Chromium and a mobile Chromium profile, and writes an HTML report to `playwright-report/`.

## Coverage

- Seeded pipeline and summary metrics
- Create and persist an application across reloads
- Search filtering
- Edit and delete flows
- Narrow-screen layout smoke check

Tests clear only the test browser's `localStorage` key before each case. Extend the suite with keyboard accessibility, validation boundaries, empty states, and cross-browser coverage as the product grows.

