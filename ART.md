# Room art guide

The Home tab draws each room as a picture with furniture pictures placed on top.
Until a picture exists, the game shows a placeholder (striped wallpaper and wooden floor,
or a dashed box with the item's name), so pictures can be added one at a time.

## How to add a picture

1. Make it with Gemini (prompts below).
2. Send it to Claude with its name (for example "this is bed_2"), **or** run:
   `python3 tools/prepare_art.py path/to/picture.png bed_2`
3. The tool saves `img/room/bed_2.webp`. It crops room backgrounds to 4:3 and cuts the white
   background out of furniture, trimming the empty edges. Refresh the game to see it.

## Style (use in every prompt)

> Cute cozy mobile-game illustration, thick dark-brown outlines, flat cel shading, warm soft colours,
> modern Japanese home, same style as the attached picture.

Attach one picture from this game as a style reference, e.g. `img/a_rest.webp` or `img/ev_u_hostel.webp`.
Generate all pictures for one room in the same Gemini chat so they match.

**Camera angle matters most.** Everything is seen **from the front, slightly from above** (about 15°),
looking straight at the back wall. No side walls, no dramatic perspective. Furniture must use the same angle.

## Room backgrounds (3 pictures)

Landscape, 4:3 (e.g. 1200×900). An **empty** room: back wall on the top ~55%, floor on the bottom ~45%.
No furniture, no people, no text.

| File | Prompt (after the style line) |
|---|---|
| `bedroom_bg` | Empty small Japanese bedroom seen from the front. Back wall with soft cream wallpaper and a small window on the left, light wooden floor. Keep the upper-right part of the wall plain (a picture will hang there). No furniture. 4:3. |
| `office_bg` | Empty home office seen from the front. Back wall in pale sage green with a window in the middle-left, wooden floor. Keep the right side plain. No furniture. 4:3. |
| `living_bg` | Empty Japanese living room seen from the front. Warm beige back wall with a large window with curtains in the middle, wooden floor with a little tatami area. Keep the left side plain. No furniture. 4:3. |

## Furniture (18 pictures)

Square (e.g. 1024×1024). **One item only, on a plain pure white background**, no floor, no shadow on the
background, nothing else in the picture. Same front, slightly-from-above angle as the rooms.
Items with white parts (bedding, paper) need a dark outline so they don't get cut out.

Where each item sits is set in `src/data/upgrades.js` (`box`). Wide items fill a wide spot, tall items a tall one.

### Bedroom

| File | Item | Spot |
|---|---|---|
| `bed_0` | A thin, flat futon on the floor with a small pillow, a bit worn | floor, left-centre, wide |
| `bed_1` | A thick fluffy futon with a patterned duvet and two pillows | floor, left-centre, wide |
| `bed_2` | A simple wooden single bed with a cosy quilt | floor, left-centre, wide |
| `bed_3` | A luxurious king-size bed with a padded headboard and many pillows | floor, left-centre, wide |
| `bdeco_1` | A cute cartoon cat poster pinned to the wall | on the wall, top-right |
| `bdeco_2` | A wooden frame holding a happy family photo | on the wall, top-right |
| `bdeco_3` | A framed ukiyo-e wave print (Great Wave style) | on the wall, top-right |

### Home office

| File | Item | Spot |
|---|---|---|
| `desk_0` | A low wooden Japanese table with a floor cushion and a notebook | floor, centre |
| `desk_1` | A small study desk with a chair, a lamp and books | floor, centre |
| `desk_2` | A desk with a computer monitor, keyboard and an office chair | floor, centre |
| `desk_3` | A big executive desk in dark wood with two monitors and a leather chair | floor, centre |
| `odeco_1` | A potted plant in a ceramic pot | floor, right corner, tall |
| `odeco_2` | A tall wooden bookshelf full of books and folders | floor, right corner, tall |
| `odeco_3` | A bonsai tree on a wooden display stand | floor, right corner, tall |

### Living room

| File | Item | Spot |
|---|---|---|
| `sofa_0` | A single flat floor cushion (zabuton) | floor, centre-right, wide |
| `sofa_1` | A kotatsu table with a quilt and a bowl of mikan oranges | floor, centre-right, wide |
| `sofa_2` | A comfy fabric sofa with cushions and a small coffee table | floor, centre-right, wide |
| `sofa_3` | A big leather sofa set with a glass coffee table | floor, centre-right, wide |
| `ldeco_1` | A paper floor lamp (andon style), glowing softly | floor, left corner, tall |
| `ldeco_2` | A big flat-screen TV on a low wooden TV stand | floor, left corner, tall |
| `ldeco_3` | A large koi fish aquarium on a wooden cabinet | floor, left corner, tall |

## Tips

- If Gemini adds a floor or shadow under furniture, ask it to "remove the floor and shadow, plain white background only".
- If an item looks too big or small in the room, the spot can be changed in `src/data/upgrades.js`.
- Level 0 of the wall art and corner slots is "nothing", so they need no picture.
