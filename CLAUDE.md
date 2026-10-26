# Property Tycoon (working title)

A casual browser tycoon game: build a property empire in a city while upgrading your own home.
Light, cute and relaxing. Nothing too serious or punishing.

## Core idea
- **Setting:** a Japanese city (Tokyo), money in yen (¥).
- **City view:** buy run-down buildings, renovate them, rent them out. Tenants move in and out on their own. Rent arrives monthly with "+¥" pop-ups.
- **Home view:** your own home, starting as a tiny rented room and growing to a mansion. Rooms have upgrade slots (bed, desk, sofa, decoration), not free placement.
- **The link:** rent pays for home upgrades; home upgrades give business bonuses
  (home office = more property slots, living room = host investors for special deals, comfy bedroom = better deals).

## First version (keep it small)
- One city map with about 6 buildings to buy, renovate and rent.
- Home with 3 rooms (bedroom, home office, living room), each with a few upgrade levels.
- Money, month counter, simple tenant events (e.g. leaking pipe, noisy tenant).
- Save/load with localStorage.
- No free furniture placement, no rival landlords, no market crashes yet.

## Look and feel
- Card-style mobile-first interface like Malaysian Life Simulator (github.com/elitefei1-gif/Malaysia-Life-Simulation): a header card with cash, date and stats; big picture tabs (City / Home) to switch modes; rounded cream panels with gold borders; pop-up sheets with choice cards for events.
- Japanese palette: indigo, vermilion red and gold on cream, with a seigaiha wave band behind the header.
- Pictures are `.webp` illustrations in `img/`, borrowed from Malaysian Life Simulator (its `img/` folder has ~450: houses `h_`, events `ev_`, Japanese portraits `*__japanese`, etc.). Copy only the ones used, and register them in `PICS` in `src/render/pics.js`. Emoji fill gaps.
- Real-time months: time passes on its own (bottom bar shows progress through the month, with a pause button).

## Tech rules
- Plain HTML, CSS and JavaScript. No frameworks, no build step.
- Split code into ES modules from the start, e.g.:
  - `index.html` – page shell
  - `css/style.css` – all styling
  - `src/main.js` – start-up, game loop, button clicks
  - `src/format.js` – money and date helpers
  - `src/state.js` – game state, save/load
  - `src/city.js` – buildings, tenants, rent
  - `src/home.js` – home rooms and upgrades
  - `src/render/` – HTML for each part of the screen (header card, tabs, panels, pop-up sheet, bottom bar)
  - `src/data/` – building, upgrade and event data as plain objects (easy to tweak balance)
- Keep each file focused and reasonably small. Add new features in new files rather than growing one big file.
- Run locally with `python3 -m http.server` and open http://localhost:8000.
- Commit to git after each working feature with a clear message.

## How to work with me
- I'm building this as a hobby, step by step. Keep explanations short and practical.
- Build one feature at a time, make sure it runs, then stop and show me.
