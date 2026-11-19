# Isekai Quest Frontend

**Isekai Quest** is a single-player, turn-based fantasy adventure game that evokes the feel of retro RPGs. Players create a custom character, choose from a diverse cast of pixel-art avatars, and explore a nostalgic UI inspired by classic quest boards and fantasy towns.

This repository contains the frontend for Isekai Quest, built with **Next.js 15** and styled with **Tailwind CSS**. The project emphasizes component-driven architecture, immersive design, and a strong visual identity centered around dark-skinned fantasy characters.

---

## 🔗 Live Demo

👉 [isekai-quest-frontend.vercel.app](https://isekai-quest-frontend.vercel.app/)

## 📜 Game Design Document

📝 [Isekai Quest – Specification Document](https://medium.com/@jamesfeltonthomas/isekai-quest-specification-document-da2325cbbea2)

---

## ⚙️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Headless UI
- **Forms**: React Hook Form
- **Language**: TypeScript
- **Assets**: Custom Pixel Art
- **Hosting**: Vercel
- **CI**: GitHub Actions (tests and production build on pull request)

---

## 🎮 Current Features

**Accounts and saves**

- Account registration and login
- Character and progression saves persisted in the browser
- Session restored on refresh, returning you to your active quest and story point
- Manual save with unsaved change detection

**Character creation**

- Responsive avatar grid of custom pixel art characters
- Class selection, each class with its own starting loadout of attacks, skills, weapons and equipment
- Live character preview with dynamic name input

**Town and world**

- Splash screen with quest introduction and animated call to action
- StartsVille town hub with a guild, a market and an inn
- World map with selectable locations and quest commencement

**Quests**

- Guild quest board listing available contracts
- Multi stage quest stories with branching choices and distinct outcomes
- Six quest stories authored, one playable end to end while the rest are built out

**Combat**

- Turn based battles using class specific attacks and skills
- Damage resolution with victory and defeat handling
- Battle outcome screen with rewards

**Inventory and economy**

- Party screen with character stats and inventory management
- Equip and use items from inventory
- Market with weapon, armor, potion and ration booths
- Coin based purchasing with affordability checks

**Interface**

- Queued toast notification system, grouped by turn during battle
- Mobile first, responsive layout
- Themed experience with a consistent palette and nostalgic visual cues

---

## 🚧 Planned Enhancements

- Remaining quest stories implemented and opened on the quest board
- Quest and location unlocking driven by completed quest prerequisites
- Character leveling and progression rewards
- Sound effects for game events (built, currently being repaired)
- Accessibility pass: semantic landmarks, focus management and keyboard navigation
- Optional backend for cross device persistence (currently browser localStorage only)

---

## 🛠️ Getting Started

```bash
git clone https://github.com/JamesFThomas/isekai-quest-frontend.git
cd isekai-quest-frontend
npm install
npm run dev
```

---

## 🧙🏿‍♂️ About the Project

Isekai Quest is more than a portfolio piece — it's an evolving personal project that lets me experiment with game-inspired UI, client-server architecture, and responsive design. Built from scratch after sunsetting an older codebase, it's designed to reflect my current approach to frontend development and visual storytelling.

---

Happy coding, y’all! 👨🏿‍💻
