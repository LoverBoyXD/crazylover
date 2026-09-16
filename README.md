# CrazyLover

A personal bio-link page (like Linktree, but yours).

## Setup
1. Put your own files in `assets/`:
   - `profile.png` — your avatar
   - `background.jpg` — currently unused, add a background image and reference it in `style.css` `body` if you want the anime-style backdrop
   - `music.mp3` — the track for the player
   - `cover.jpg` — album art for the player
2. Update the `href` values in `index.html` under `.links` with your real Discord/YouTube/Spotify/Instagram/GitHub/email links.
3. Open `index.html` in a browser — no build step needed.

## Structure
- `index.html` — page markup
- `style.css` — dark/purple glassmorphism theme
- `script.js` — clock, audio player, small interactions