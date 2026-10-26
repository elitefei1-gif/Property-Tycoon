"""Turn a generated picture into a game-ready file in img/room/.

    python3 tools/prepare_art.py <picture> <name>

  <name> is the file name from ART.md without .webp, e.g. bed_1 or bedroom_bg.

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


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src, name = Path(sys.argv[1]), sys.argv[2].removesuffix('.webp')
    img = Image.open(src)
    out = background(img) if name.endswith('_bg') else furniture(img)
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f'{name}.webp'
    out.save(dest, 'WEBP', quality=88, method=6)
    print(f'Saved {dest.relative_to(OUT.parent.parent)} ({out.size[0]}x{out.size[1]})')


if __name__ == '__main__':
    main()
