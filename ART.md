# Room art guide

The Home tab draws each room as a picture with furniture pictures placed on top.
Until a picture exists, the game shows a placeholder (striped wallpaper and wooden floor,
or a dashed box with the item's name), so pictures can be added one at a time.

## How to add a picture

1. Make it with Gemini (prompts below).
2. Send it to Claude saying which one it is (for example "this is the beds sheet"), **or** run the tool
   (commands below).
3. The tool saves files like `img/room/bed_2.webp`. It crops room backgrounds to 4:3 and cuts the white
   background out of furniture, trimming the empty edges. Refresh the game to see it.

## Style (use in every prompt)

> Cute cozy mobile-game illustration, thick dark-brown outlines, flat cel shading, warm soft colours,
> modern Japanese home, same style as the attached picture.

Attach one picture from this game as a style reference, e.g. `img/a_rest.webp` or `img/ev_u_hostel.webp`.
Generate all pictures for one room in the same Gemini chat so they match.

**Camera angle matters most.** Everything uses the same **isometric three-quarter view from the front-left,
slightly above**: rooms are cutaway corners (left wall, right wall, diamond floor, no ceiling), and furniture
is drawn at that same angle. Attach the beds picture (`img/room/bed_3.webp`) as the angle reference.

## Room backgrounds (3 pictures) ✅ done

Isometric cutaway rooms on a white background; the tool makes the white around the room transparent.
`bedroom_bg`, `office_bg`, `living_bg` (window on the left wall, right wall kept plain).

## Furniture (6 sheets, 4 items each)

To save effort, each Gemini picture holds one slot's items in a **2×2 grid**. The tool cuts them apart:

`python3 tools/prepare_art.py bed_sheet.png bed_0 bed_1 bed_2 bed_3`

Order is **top-left, top-right, bottom-left, bottom-right**. Sheets with 3 items leave the bottom-right empty.
Square picture (e.g. 1024×1024), **plain pure white background**, items well apart so they don't touch,
no floor, no shadows on the background, no text or labels. Same front, slightly-from-above angle as the rooms.
White parts (bedding, paper) need a dark outline so they don't get cut out.

**Angle for furniture:** the beds sheet set the look: a three-quarter view from the front-left, slightly
above. Attach `img/room/bed_3.webp` (or the beds sheet) to the other furniture prompts and add
*"same angle and style as the attached beds"*, so all the furniture matches.

Where each item sits in the room is set in `src/data/upgrades.js` (`box`), and how big it looks with `size`.

| Sheet | Prompt (after the style line) | Files (in grid order) |
|---|---|---|
| Beds ✅ done | A 2×2 grid of four separate beds on a plain white background, each centred in its own quarter with lots of white space between them. Top-left: a thin, flat, slightly worn futon on the floor with a small pillow. Top-right: a thick fluffy futon with a patterned duvet and two pillows. Bottom-left: a simple wooden single bed with a cosy quilt. Bottom-right: a luxurious king-size bed with a padded headboard and many pillows. All seen from the front, slightly from above, same scale. No floor, no shadows, no text. | `bed_0 bed_1 bed_2 bed_3` |
| Bedroom wall art (redo at an angle) | A 2×2 grid on a plain pure white background with three wall decorations, each centred in its own quarter, the bottom-right quarter left empty. Each is drawn at an angle, as if hanging on a wall that runs from the back corner towards the front-right, in three-quarter view. Top-left: a cute cartoon cat poster. Top-right: a wooden frame with a happy family photo. Bottom-left: a framed ukiyo-e wave print in the style of the Great Wave. No wall, no shadows, no text. | `bdeco_1 bdeco_2 bdeco_3` |
| Desks ✅ done | A 2×2 grid of four separate desks on a plain white background, each centred in its own quarter with lots of white space between them. Top-left: a low wooden Japanese table with a floor cushion and a notebook. Top-right: a small study desk with a chair, a lamp and books. Bottom-left: a desk with a computer monitor, keyboard and an office chair. Bottom-right: a big executive desk in dark wood with two monitors and a leather chair. All seen from the front, slightly from above, same scale. No floor, no shadows, no text. | `desk_0 desk_1 desk_2 desk_3` |
| Office corner | A 2×2 grid on a plain white background, three tall items, each centred in its own quarter, the bottom-right quarter left empty. Top-left: a potted plant in a ceramic pot. Top-right: a tall wooden bookshelf full of books and folders. Bottom-left: a bonsai tree on a wooden display stand. Seen from the front, slightly from above. No floor, no shadows, no text. | `odeco_1 odeco_2 odeco_3` |
| Seating | A 2×2 grid of four separate living-room seating sets on a plain white background, each centred in its own quarter with lots of white space between them. Top-left: a single flat Japanese floor cushion (zabuton). Top-right: a kotatsu table with a quilt and a bowl of mikan oranges. Bottom-left: a comfy fabric sofa with cushions and a small coffee table. Bottom-right: a big leather sofa set with a glass coffee table. All seen from the front, slightly from above, same scale. No floor, no shadows, no text. | `sofa_0 sofa_1 sofa_2 sofa_3` |
| Living room corner | A 2×2 grid on a plain white background, three tall items, each centred in its own quarter, the bottom-right quarter left empty. Top-left: a Japanese paper floor lamp (andon) glowing softly. Top-right: a big flat-screen TV on a low wooden TV stand. Bottom-left: a large koi fish aquarium on a wooden cabinet. Seen from the front, slightly from above. No floor, no shadows, no text. | `ldeco_1 ldeco_2 ldeco_3` |

One picture per item still works too: `python3 tools/prepare_art.py picture.png bed_2`.

## Tips

- If Gemini adds a floor or shadow under furniture, ask it to "remove the floor and shadow, plain white background only".
- If items in a sheet touch each other or cross the middle lines, ask Gemini to "make the items smaller with more white space between them".
- If an item looks too big or small in the room, the spot can be changed in `src/data/upgrades.js`.
- Level 0 of the wall art and corner slots is "nothing", so they need no picture.
