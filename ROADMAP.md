# Roadmap

One feature at a time. Each step must run, then gets committed.

0. **Setup** – folders (`index.html`, `src/`, `src/render/`, `src/data/`), run with `python3 -m http.server`.
1. **Canvas + game loop** (`main.js`) – crisp pixel canvas, `update(dt)` / `render()` loop, month timer.
2. **Game state** (`state.js`) – money, month, buildings, home rooms; top bar showing money and month.
3. **City map** (`render/map.js`, `data/buildings.js`) – tile grid with roads, grass and 6 building lots.
4. **Buy / renovate / rent** (`city.js`) – click a building for a panel; run-down → owned → renovated → rented.
5. **Monthly rent + pop-ups** – rent paid each month with floating "+¥" text.
6. **Tenants** – random move-in/move-out; small big-headed sprites walk to buildings (`render/sprites.js`).
7. **Home view** (`home.js`, `data/upgrades.js`) – City/Home toggle, 3 rooms with upgrade slots, your character walks around.
8. **Home bonuses** – office = more property slots, bedroom = better deals, living room = investor offers.
9. **Tenant events** (`data/events.js`) – leaking pipe, noisy tenant; pay to fix or risk the tenant leaving.
10. **Save / load** – localStorage autosave each month, load on start.
11. **Polish + balance** – tune numbers in `src/data/`, small animations and sounds.
