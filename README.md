<div align="center">

# 🔬 YouTube Viral Analysis Laboratory

**An open-source YouTube analytics tool for researchers and content creators.**  
Understand what makes videos go viral — without expensive SaaS subscriptions.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![YouTube Data API](https://img.shields.io/badge/YouTube-Data%20API%20v3-red?logo=youtube)](https://developers.google.com/youtube/v3)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](https://github.com/aziikumar07-hash/YouTube-Viral-Analysis-Laboratory)

</div>

---

## What is YouTube Viral Analysis Laboratory?

YouTube Viral Analysis Laboratory is a free, open-source research tool that uses the YouTube Data API to analyze video performance patterns, identify viral trends, and surface actionable insights for content creators, researchers, and educators.

It was built for people who want deep YouTube analytics without paying for tools like TubeBuddy, VidIQ, or Social Blade.

---

## ✨ Features

- **Viral pattern detection** — analyze view velocity, like ratios, and engagement spikes
- **Channel deep-dive** — break down any public channel's performance over time
- **Trend comparison** — compare multiple videos or channels side by side
- **Keyword & tag analysis** — surface the tags and titles that drive discoverability
- **Export reports** — download analysis as structured data
- **No paid subscription** — runs on your own YouTube Data API key (free quota)
- **Privacy-first** — no data sent to third-party servers; all analysis runs locally

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher)
- A [YouTube Data API v3 key](https://console.cloud.google.com) (free from Google Cloud)

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/aziikumar07-hash/YouTube-Viral-Analysis-Laboratory.git
cd YouTube-Viral-Analysis-Laboratory

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Add your keys in .env.local:
# GEMINI_API_KEY=your_gemini_key
# APP_URL=http://localhost:5173

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

Deploy the `dist/` folder to GitHub Pages, Netlify, Vercel, or any static host.

---

## 🔑 Getting a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable **YouTube Data API v3**
4. Create an API key under **Credentials**
5. Add it to your `.env.local` file

The free tier gives you 10,000 units/day — enough for extensive research use.

---

## 🎯 Who is this for?

- **Content creators** who want to understand what makes their niche tick
- **Researchers and students** studying digital media and viral mechanics
- **Educators** teaching social media analytics or data journalism
- **Marketers** who need YouTube insights without expensive tool subscriptions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| UI Framework | React + Vite |
| API | YouTube Data API v3 |
| AI Layer | Google Gemini API |
| Styling | Tailwind CSS |
| Build Tool | Vite |

---

## 🤝 Contributing

Contributions are welcome!
- Open an issue for bugs or feature requests
- Submit a pull request with new analysis features
- Share the tool with researchers and creators who need it

---

## 📄 License

MIT License — free to use, modify, and distribute. See [LICENSE](./LICENSE).

---

<div align="center">

Made with ❤️ for researchers and creators

</div>
