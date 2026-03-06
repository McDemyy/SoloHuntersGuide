# SoloHuntersGuide

A Solo Leveling themed static guide database hosted on GitHub Pages.

## Live Site

[View on GitHub Pages](https://mcdemyy.github.io/SoloHuntersGuide/)

## About

This is a fully static website (HTML, CSS, Vanilla JavaScript — no build step, no dependencies) inspired by the Solo Leveling "System Interface" UI. It serves as a hunter's reference manual covering armor, weapons, builds, and portal guides.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage — animated hero with pulsing rings, typing effect, 4 nav buttons, status bar |
| `pages/armor.html` | 6 armor entries (Common → Mythic), filterable by rarity |
| `pages/weapons.html` | 6 weapons across 5 types (sword/bow/staff/dagger/axe), filterable by type |
| `pages/builds.html` | Tank, DPS, Shadow, Boss Killer build guides |
| `pages/portals.html` | 4 expandable gate entries (E → S rank) with enemy lists, bosses, and drops |

## Project Structure

```
/
├── index.html
├── style.css
├── script.js
├── pages/
│   ├── armor.html
│   ├── weapons.html
│   ├── builds.html
│   └── portals.html
└── images/
    ├── armor/
    ├── weapons/
    ├── portals/
    └── materials/
```

## Features

- Dark background with neon blue/purple glowing borders
- Futuristic "System Interface" panels
- Animated glowing buttons and hover effects
- Rarity color system (Common → Mythic)
- Responsive CSS grid — works on desktop and mobile
- Portal accordion for expandable dungeon info
- Filter buttons for rarity and weapon type
- All placeholder art is hand-generated SVG — no external assets or CDN calls

## Extending the Guide

Adding new entries is as simple as copying a card `<article>` block and updating its `data-filter` attribute — no JavaScript changes required for new items, weapons, armor pieces, builds, or portals.
