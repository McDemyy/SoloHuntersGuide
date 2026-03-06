# Solo Hunters Guide

A Solo Leveling–themed static game-guide database hosted on **GitHub Pages**.  
Browse armor sets, weapons, build guides, and portal/dungeon info — all styled as a futuristic System Interface.

🌐 **Live site:** https://McDemyy.github.io/SoloHuntersGuide/

---

## Project structure

```
SoloHuntersGuide/
├── index.html          # Homepage — hero section, main menu
├── style.css           # Global styles (dark neon theme)
├── script.js           # Portal accordion, filters, animations
├── pages/
│   ├── armor.html      # Armor guide (filterable by rarity)
│   ├── weapons.html    # Weapons guide (filterable by type)
│   ├── builds.html     # Build guides (Tank / DPS / Shadow / Boss Killer)
│   ├── portals.html    # Portal guide (expandable gate entries)
│   └── materials.html  # Materials guide (crafting resources by rarity)
└── images/
    ├── armor/          # SVG armor icons
    ├── weapons/        # SVG weapon icons
    ├── portals/        # SVG gate icons
    └── materials/      # SVG material icons
```

---

## First-time Git setup (do this once)

Before you can commit anything, Git needs to know who you are.  
If you see this error when trying to commit:

```
fatal: no email was given and auto-detection is disabled
```

It means Git doesn't have your name and email yet. The easiest fix is to run one of the included setup scripts:

| Your OS | What to do |
|---------|-----------|
| **Windows** | Double-click **`setup.bat`** in the project folder |
| **Mac / Linux** | Open a terminal in the project folder and run `bash setup.sh` |

The script will ask for your name and email, then configure Git for you automatically.

**Or** run the two commands yourself in any terminal (use the email address linked to your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

> **Tip:** You only need to do this **once** on each computer you work on.

You can double-check it worked with:

```bash
git config --global user.name   # should print your name
git config --global user.email  # should print your email
```

Once that's set, carry on with the steps below.

---

## How to push your VS Code changes to GitHub

### Option A — VS Code Source Control panel (no terminal needed)

1. Open the project folder in VS Code (`File → Open Folder…`).
2. Click the **Source Control** icon in the left sidebar (looks like a branch, or press `Ctrl+Shift+G` / `⌘⇧G`).
3. You will see a list of changed files under **Changes**.
4. Hover over a file and click the **+** button to *stage* it, or click **Stage All Changes** (`+` next to the **Changes** heading) to stage everything.
5. Type a short message in the **Message** box at the top (e.g. `Add new armor card`).
6. Click the **✔ Commit** button (or press `Ctrl+Enter`).
7. Click **Sync Changes** (or the **↑ Push** button that appears) to upload your commit to GitHub.

> **First-time setup:** VS Code will ask you to sign in to GitHub the first time you push. Follow the browser prompt and authorize VS Code.

---

### Option B — Terminal / Git commands

Open a terminal inside VS Code (`Terminal → New Terminal`) or any terminal, then run:

```bash
# 1. Move into the project folder (skip if already there)
cd path/to/SoloHuntersGuide

# 2. Check what files changed
git status

# 3. Stage all changes
git add .

# 4. Commit with a message
git commit -m "Describe what you changed"

# 5. Push to GitHub
git push
```

The site on GitHub Pages updates automatically within a minute or two after each push.

---

## Adding new content

All pages are plain HTML — no build step required.

- **New armor/weapon card:** Copy an existing `<article class="item-card">` block in the relevant page, paste it at the bottom of the grid, and update the text and `data-filter` attribute.
- **New build:** Copy a `<article class="build-card">` block in `builds.html`.
- **New portal:** Copy a `<div class="portal-entry">` block in `portals.html` (including the inner `portal-content` div).
- **New material:** Copy an existing `<article class="item-card" data-type="material">` block in `materials.html` and update the text, `data-filter` (rarity), and image path.

After editing, save the file, then follow the push steps above to publish your changes.