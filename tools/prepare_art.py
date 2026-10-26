"""Turn a generated picture into game-ready files in img/room/.

    python3 tools/prepare_art.py <picture> <name>
    python3 tools/prepare_art.py <sheet> <name1> <name2> <name3> [<name4>]

  <name> is the file name from ART.md without .webp, e.g. bed_1 or bedroom_bg.
  With 2-4 names, the picture is a 2x2 grid of items, read left to right, top to bottom
  (top-left, top-right, bottom-left, bottom-right). It's split along the white gaps between them.

Room backgrounds (names ending in _bg) are cropped to 4:3 and resized to 1200x900.
Furniture: the plain white (or light) background around the item is made transparent,
the empty edges are trimmed, and it's resized to at most 800px. White parts *inside*
the item's outline are kept.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent.parent / 'img' / 'room'
KEY = (255, 0, 255)   # temporary colour marking "background"
THRESH = 60           # how different from the corner colour still counts as background


def background(img):
    w, h = img.size
    target = 4 / 3
    if w / h > target:  # too wide: crop the sides
        nw = round(h * target)
        img = img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:               # too tall: crop top and bottom
        nh = round(w / target)
        img = img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    return img.convert('RGB').resize((1200, 900), Image.LANCZOS)


def furniture(img):
    rgb = img.convert('RGB')
    w, h = rgb.size
    # Flood-fill the background from points all around the border.
    step = max(1, min(w, h) // 40)
    edge = [(x, 0) for x in range(0, w, step)] + [(x, h - 1) for x in range(0, w, step)] \
         + [(0, y) for y in range(0, h, step)] + [(w - 1, y) for y in range(0, h, step)]
    for xy in edge:
        if rgb.getpixel(xy) != KEY and sum(rgb.getpixel(xy)) > 600:  # only start on light pixels
            ImageDraw.floodfill(rgb, xy, KEY, thresh=THRESH)
    # Alpha: transparent where filled, slightly softened edge.
    alpha = Image.new('L', (w, h), 255)
    px, ap = rgb.load(), alpha.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == KEY:
                ap[x, y] = 0
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = img.convert('RGBA')
    out.putalpha(alpha)
    bbox = alpha.point(lambda v: 255 if v > 20 else 0).getbbox()
    if bbox:
        out = out.crop(bbox)
    out.thumbnail((800, 800), Image.LANCZOS)
    return out


def gap(img, axis):
    """Where to split a sheet: the whitest line across the middle third (axis 0 = vertical line)."""
    g = img.convert('L')
    w, h = g.size
    length = w if axis == 0 else h
    best, best_score = length // 2, -1
    for i in range(length // 3, 2 * length // 3):
        line = g.crop((i, 0, i + 1, h) if axis == 0 else (0, i, w, i + 1))
        score = sum(line.histogram()[236:])  # light pixels on this line
        if score > best_score:
            best, best_score = i, score
    return best


def split_sheet(img):
    """Cut a 2x2 grid into [top-left, top-right, bottom-left, bottom-right]."""
    w, h = img.size
    x, y = gap(img, 0), gap(img, 1)
    return [img.crop(box) for box in ((0, 0, x, y), (x, 0, w, y), (0, y, x, h), (x, y, w, h))]


def save(out, name):
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f'{name}.webp'
    out.save(dest, 'WEBP', quality=88, method=6)
    print(f'Saved {dest.relative_to(OUT.parent.parent)} ({out.size[0]}x{out.size[1]})')


def main():
    if not 3 <= len(sys.argv) <= 6:
        sys.exit(__doc__)
    img = Image.open(sys.argv[1])
    names = [n.removesuffix('.webp') for n in sys.argv[2:]]
    if len(names) == 1:
        save(background(img) if names[0].endswith('_bg') else furniture(img), names[0])
        return
    for part, name in zip(split_sheet(img), names):
        save(furniture(part), name)


if __name__ == '__main__':
    main()
