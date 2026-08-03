<div align="center">

<!-- Animated wave banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:1B1A17,50:4A5C3E,100:B89664&height=220&section=header&text=AURA-SIP&fontSize=70&fontColor=F4EDE2&fontAlignY=40&animation=fadeIn&desc=Organic%20Botanicals%20%26%20Fermented%20Tonic&descAlignY=58&descSize=18&descColor=F4EDE2" alt="AURA-SIP banner" />

<!-- Animated typing tagline -->
<a href="#">
  <img src="https://readme-typing-svg.demolab.com?font=Fraunces&weight=500&size=24&duration=3200&pause=900&color=B89664&center=true&vCenter=true&width=680&lines=A+ritual%2C+bottled.;Scroll-driven+3D+product+experience.;Frosted+glass+%2B+physically-based+rendering.;Built+with+Next.js+15+%2B+React+Three+Fiber.;Uncork.+Orbit.+Reserve." alt="Typing SVG" />
</a>

<br/>

<!-- Badge stack -->
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_18.3-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Stars](https://img.shields.io/github/stars/your-org/aura-sip?style=for-the-badge&color=B89664&labelColor=1B1A17)](../../stargazers)
[![Issues](https://img.shields.io/github/issues/your-org/aura-sip?style=for-the-badge&color=4A5C3E&labelColor=1B1A17)](../../issues)
[![License](https://img.shields.io/badge/License-MIT-F4EDE2?style=for-the-badge&labelColor=1B1A17)](#-license)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-B89664?style=for-the-badge&labelColor=1B1A17)](#-contributing)

</div>

<br/>

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,threejs,typescript,tailwind,nodejs,vercel,figma&theme=dark" alt="Skill icons" />
</div>

<br/>

<p align="center">
  <em>An ultra-luxury, minimal 3D scroll-driven product site — a frosted-glass tonic bottle rendered with physically-based transmission materials, uncorked and orbited by real-time botanicals as you scroll.</em>
</p>

<div align="center">
  <sub>Inspired by the restraint of Kin Euphorics & Ghia — built entirely in code, no external 3D assets.</sub>
</div>

---

## 📖 Table of Contents

<details>
<summary><b>Click to expand</b></summary>

- [🎬 Overview](#-overview)
- [✨ Features](#-features)
- [🧬 Tech Stack](#-tech-stack)
- [🗺️ Architecture](#️-architecture)
- [🎞️ The Scroll Choreography](#️-the-scroll-choreography)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [☁️ Deploy to Vercel](#️-deploy-to-vercel)
- [🔐 Environment Variables](#-environment-variables)
- [🧪 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

</details>

---

## 🎬 Overview

> Scroll. The bottle breathes, rotates, and catches studio light through
> real transmission-based frosted glass. Scroll further — the cork
> twists free, a whisper of mist escapes, and the camera pushes into a
> macro close-up. Scroll to the end — citrus, mint, and ice break
> orbit around the bottle like a zero-gravity botanical constellation.

<div align="center">

| Frame 1 — Hero | Frame 2 — Uncorking | Frame 3 — Orbit |
|:---:|:---:|:---:|
| Ambient float + rotation | Cork pop + mist burst + macro push-in | Botanicals expand into orbit |
| `0% → 35%` scroll | `35% → 65%` scroll | `70% → 100%` scroll |

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**🍾 Physically-Based 3D Bottle**
Real `meshPhysicalMaterial` transmission, IOR, roughness & clearcoat — not a fake glass shader.

**🌿 Procedural Botanicals**
Citrus slices, mint leaves, and ice cubes — all generated meshes, zero imported 3D models.

**🎞️ GSAP ScrollTrigger Timeline**
A single scrubbed timeline drives bottle rotation, cork pop, camera orbit, and botanical expansion in perfect lockstep.

**💧 Mist Particle System**
A neck-emitted points system bursts on uncork and settles into ambient drift.

</td>
<td width="50%" valign="top">

**🪟 Glassmorphic HUD**
Framer Motion–driven fluid typography, scroll-scoped opacity/position transforms.

**🖱️ Custom Smooth Cursor**
Spring-eased dot + trailing ring, desktop only.

**🖼️ Animated "Living Portrait"**
Founder photo with breathing scale, rotating gold halo, light sheen, and cursor-parallax tilt.

**📬 Working Reserve Flow**
Email capture posts to a real `/api/reserve` route — modal *and* inline section, both wired.

</td>
</tr>
</table>

---

## 🧬 Tech Stack

<div align="center">

| Layer | Technology | Why |
|---|---|---|
| Framework | ![Next.js](https://img.shields.io/badge/-Next.js_15-000?style=flat-square&logo=nextdotjs&logoColor=white) | App Router, `next/font`, API routes, zero-config Vercel deploys |
| Language | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Fully typed 3D refs, props, and API payloads |
| 3D Engine | ![Three.js](https://img.shields.io/badge/-Three.js-000?style=flat-square&logo=threedotjs&logoColor=white) ![R3F](https://img.shields.io/badge/-React_Three_Fiber-000?style=flat-square) | Declarative scene graph, `drei` helpers (`Environment`, `ContactShadows`, `Sparkles`, `RoundedBox`) |
| Motion (3D) | ![GSAP](https://img.shields.io/badge/-GSAP_ScrollTrigger-88CE02?style=flat-square&logo=greensock&logoColor=white) | Scrub-synced timeline for mesh + camera choreography |
| Motion (UI) | ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | `useScroll`, `useSpring`, `useTransform` for HUD + portrait |
| Styling | ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Utility-first, custom `aura` palette + `Fraunces`/`Inter` type scale |
| Icons | ![Lucide](https://img.shields.io/badge/-lucide--react-F56565?style=flat-square) | Consistent, tree-shakeable line icons |
| Hosting | ![Vercel](https://img.shields.io/badge/-Vercel-000?style=flat-square&logo=vercel&logoColor=white) | Zero-config deploy target |

</div>

---

## 🗺️ Architecture

```mermaid
flowchart TD
    A["layout.tsx<br/>Fonts · SiteProvider · NavBar · CustomCursor · ReserveModal"] --> B["page.tsx"]

    B --> C["#home — sticky 400vh experience"]
    B --> D["AboutUs.tsx<br/>+ LivingPortrait.tsx"]
    B --> E["IngredientsSection.tsx"]
    B --> F["ReserveSection.tsx"]
    B --> G["SiteFooter.tsx"]

    C --> H["Canvas3D.tsx<br/>Lights · Environment · ContactShadows · ScrollTrigger"]
    C --> I["ExperienceHUD.tsx<br/>Hero · Cork caption · Flavor card"]

    H --> J["AuraBottleModel.tsx<br/>Bottle · Label · Cork · Citrus · Mint · Ice · Mist"]

    F -. POST .-> K["/api/reserve/route.ts"]
    I -. context .-> L["SiteContext.tsx<br/>reserveOpen · flavor · menuOpen"]
    D -. context .-> L
    F -. context .-> L
```

---

## 🎞️ The Scroll Choreography

<div align="center">

```
0% ─────────────── 35% ─────────────── 65% ─────────────── 100%
│                    │                   │                    │
│   AMBIENT HERO      │   CORK POP +      │   MACRO PUSH-IN     │  FLAVOR ORBIT
│   float + rotate    │   MIST BURST      │   camera → neck      │  citrus·mint·ice
│                    │                   │                    │  expand outward
└────────────────────┴───────────────────┴────────────────────┘
        GSAP ScrollTrigger (scrub) ── in lockstep ── Framer Motion useScroll
```

</div>

---

## 📂 Project Structure

```
aura-sip-project/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # Fonts, providers, global chrome
│  │  ├─ page.tsx                 # Composes the pinned experience + sections
│  │  ├─ globals.css              # Scrollbar, glass, cursor, type styles
│  │  └─ api/reserve/route.ts     # Email-capture endpoint
│  └─ components/
│     ├─ AuraBottleModel.tsx      # 🍾 All 3D meshes
│     ├─ Canvas3D.tsx             # 🎥 Scene, lights, ScrollTrigger timeline
│     ├─ ExperienceHUD.tsx        # 🪟 Scroll-scoped hero/cork/flavor UI
│     ├─ NavBar.tsx               # 🧭 Fixed nav + mobile menu
│     ├─ ReserveModal.tsx         # 📬 Global pre-order modal
│     ├─ ReserveSection.tsx       # 📬 Inline reserve section
│     ├─ AboutUs.tsx              # 📖 Brand story
│     ├─ LivingPortrait.tsx       # 🖼️ Animated founder portrait
│     ├─ IngredientsSection.tsx   # 🌿 Botanical grid
│     ├─ SiteFooter.tsx           # 🔗 Contact + socials
│     ├─ SiteContext.tsx          # 🔄 Shared app state
│     └─ CustomCursor.tsx         # 🖱️ Smooth custom cursor
├─ public/images/founder.jpg
├─ create_zip.py
└─ package.json
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies (versions pinned — no peer-dep conflicts)
npm install

# 2. Run the dev server
npm run dev

# 3. Open the ritual
open http://localhost:3000
```

<div align="center">

| Command | Purpose |
|---|---|
| `npm run dev` | Local development with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the codebase |
| `python3 create_zip.py` | Repackage the whole project into a `.zip` |

</div>

---

## ☁️ Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub.
2. Import it in Vercel — Next.js is auto-detected, no config needed.
3. Ship it. `/api/reserve` works out of the box with zero env vars.

---

## 🔐 Environment Variables

None are required to run or deploy. To send **real** confirmation
emails from `/api/reserve`, add a provider key:

```bash
# .env.local
RESEND_API_KEY=your_key_here
```

(See the commented example inside `src/app/api/reserve/route.ts`.)

---

## 🧪 Roadmap

- [x] Physically-based frosted glass bottle
- [x] GSAP-driven cork pop + mist burst
- [x] Procedural citrus / mint / ice botanicals
- [x] Glassmorphic HUD + fluid typography
- [x] Animated founder "living portrait"
- [x] Working reserve flow (modal + inline + API route)
- [ ] Real ESP integration (Resend / Mailchimp) wired to `/api/reserve`
- [ ] Multi-flavor bottle re-texturing on selection
- [ ] Sound design synced to the cork-pop moment
- [ ] i18n (multi-language HUD copy)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

```bash
git checkout -b feature/your-idea
git commit -m "feat: your idea"
git push origin feature/your-idea
```

Then open a PR — please keep 3D changes performance-conscious (mobile
GPUs will thank you).

---

## 📜 License

Distributed under the **MIT License**. Do what you want, just keep
the ritual intact.

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:B89664,50:4A5C3E,100:1B1A17&height=140&section=footer" alt="footer wave" />

**AURA-SIP** · *A ritual, bottled.* 🍾

</div>
