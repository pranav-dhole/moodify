<div align="center">

# 🎵 Moodify

### Mood-driven music, instantly.

A React app that surfaces curated playlists based on your current emotional state — no searching, no scrolling, just music that matches the moment.

**[Live Demo →](https://moodify-opal-iota.vercel.app)**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## What it does

Moodify lets you pick a mood and instantly get a playlist tailored to how you're feeling. Whether you're energized, melancholic, focused, or just vibing — the app maps your emotional state to the right music, so you spend less time browsing and more time listening.

---

## Features

- **Mood selection UI** — choose from a set of curated emotional states
- **Dynamic playlist surfacing** — songs are filtered and displayed based on your selected mood
- **Clean, responsive design** — works on desktop and mobile
- **Fast load times** — built with Vite for near-instant startup and HMR in development
- **Component-based architecture** — modular React components with clear separation of concerns

---

## Tech stack

| Layer | Technology |

| Framework | React 18 |
| Build tool | Vite |
| Language | JavaScript (ES6+) |
| Styling | CSS |
| Linting | ESLint |
| Deployment | Vercel |

---

## Getting started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/pranav-dhole/moodify.git
cd moodify

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy anywhere.

---

## Project structure

```
moodify/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── assets/         # Images, icons, fonts
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## How it works

1. The user selects a mood from the mood picker
2. The app maps the selected mood to a set of matching song attributes (e.g. energy, tempo, genre feel)
3. Songs that fit the mood profile are filtered and rendered as a playlist
4. The user can browse and interact with the playlist directly in the app

---

## Roadmap

- [ ] Spotify API integration for real-time track data
- [ ] Audio preview on hover
- [ ] Favorite / save playlists
- [ ] Mood history and listening patterns
- [ ] Dark / light theme toggle
- [ ] PWA support for offline use

---

## Contributing

Contributions are welcome! If you have ideas for new moods, better song mappings, or UI improvements:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-idea`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-idea`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ♥ by [Pranav Dhole](https://github.com/pranav-dhole)

</div>
