# Skinstric A.I.

An AI-powered skincare analysis web application that uses facial recognition to estimate demographic data and deliver personalized skincare insights. Built as part of the Front-End Simplified developer program.

**Live Demo:** [skinstric-cole.vercel.app](https://skinstric-cole.vercel.app)

---

## Overview

Skinstric guides users through a multi-step flow — from an animated landing page, through an intake form, to a live camera or gallery-based facial scan. The AI analyzes the captured image and returns confidence-scored predictions for race, age, and sex, which are displayed on an interactive summary dashboard with a donut chart visualization.

---

## Features

- **Animated landing page** — GSAP-powered diamond entrance animation with hover-reactive text push and SVG geometric decorations
- **Multi-step intake form** — Collects name and city with real-time validation, POSTs to a Firebase Cloud Function
- **Dual image capture** — Live webcam stream (with permission modal) or gallery upload; both paths resize and encode the image before submission
- **AI demographic analysis** — Calls a Firebase Cloud Function that returns race, age, and gender confidence scores
- **Interactive summary dashboard** — SVG donut chart, category sidebar, and clickable confidence score table with smooth transitions
- **Analysis selection screen** — Diamond-grid navigation (Demographics active; Skin Type, Cosmetic Concerns, Weather coming soon)
- **Client-side state persistence** — User name, location, captured image, and analysis results stored in `localStorage` across the flow

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP 3 |
| Icons | Lucide React |
| Fonts | Geist & Geist Mono (Google Fonts) |
| Backend | Firebase Cloud Functions (external) |
| Deployment | Vercel |

---

## App Routes

| Route | Description |
|---|---|
| `/` | Landing page with animated diamond and navigation |
| `/testing` | Multi-step intake form (name → location → confirm) |
| `/results` | Choose between live camera scan or gallery upload |
| `/camera` | Camera permission request and stream initialization |
| `/camera/capture` | Live viewfinder, photo capture, and AI submission |
| `/select` | Diamond-grid category selector post-analysis |
| `/summary` | Demographics dashboard with donut chart and confidence scores |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Stuede1/skinstric-ai.git
cd skinstric-ai
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

---

## External APIs

The app integrates two Firebase Cloud Functions hosted at `us-central1-api-skinstric-ai.cloudfunctions.net`:

| Endpoint | Method | Purpose |
|---|---|---|
| `skinstricPhaseOne` | POST | Receives `{ name, location }` and logs the intake |
| `skinstricPhaseTwo` | POST | Receives `{ image }` (base64 JPEG) and returns demographic predictions |

No API keys are required on the client — the functions are publicly accessible.

---

## Project Structure

```
src/
└── app/
    ├── page.tsx              # Landing page
    ├── layout.tsx            # Root layout with Geist fonts
    ├── globals.css           # Global styles
    ├── testing/
    │   └── page.tsx          # Name & location intake form
    ├── results/
    │   └── page.tsx          # Camera vs. gallery selection
    ├── camera/
    │   ├── page.tsx          # Permission request screen
    │   └── capture/
    │       └── page.tsx      # Live camera capture and submission
    ├── select/
    │   └── page.tsx          # Analysis category diamond grid
    └── summary/
        └── page.tsx          # Demographics dashboard
```

---

## Testing

The project includes a comprehensive test suite built with **Jest** and **React Testing Library**, covering three layers:

| Layer | File | Tests |
|---|---|---|
| Unit | `src/utils/validation.test.ts` | 19 |
| Unit | `src/utils/analysis.test.ts` | 11 |
| Integration | `src/app/testing/Testing.test.tsx` | 14 |
| Component | `src/app/summary/Summary.test.tsx` | 9 |

### Run Tests

```bash
npm test
```

### What's Covered

- **Input validation logic** — required fields, number rejection, special character rejection, minimum length, whitespace trimming, allowed punctuation (hyphens, apostrophes, commas, periods)
- **Data transformation** — `capitalize` word formatting, `sortedEntries` descending confidence sort, edge cases (empty input, ties, decimal precision)
- **Multi-step form flow** — name → location step transitions, Enter key submission, back navigation between steps, validation error display per step
- **Async API submission** — mocked `fetch` to Firebase Cloud Function, localStorage writes, correct POST payload, error handling for network failures and non-ok responses
- **Data-driven UI** — localStorage-driven render, redirect on missing data, category switching (race/age/gender), donut chart percentage updates, score table selection

---

## Author

**Cole Stuedeman** — [GitHub](https://github.com/Stuede1) · [LinkedIn](https://www.linkedin.com/in/cole-stuedeman) · [Portfolio](https://colestuedeman.dev)
