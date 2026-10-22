#!/usr/bin/env python3
"""Extracts the InAmigos mark from its white-backed JPEG into a transparent PNG
plus a monochrome (ink) variant, at 3x for retina crispness."""
from PIL import Image

BOX = (270, 26, 367, 154)  # content bbox of the mark


def load():
    im = Image.open("public/img/logo.webp").convert("RGBA").crop(BOX)
    return im


def make_transparent(im):
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            # fade out near-white pixels so the mark sits on any background
            if lum >= 236:
                px[x, y] = (r, g, b, 0)
            elif lum >= 200:
                px[x, y] = (r, g, b, int((236 - lum) / 36 * 255))
    return im


def make_mono(im, color):
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if a == 0:
                continue
            # treat as coverage mask based on darkness
            cov = max(0.0, min(1.0, (236 - lum) / 120.0))
            px[x, y] = (*color, int(a * cov))
    return im


def upscale(im, factor=3):
    return im.resize((im.width * factor, im.height * factor), Image.LANCZOS)


src = load()
up = upscale(src)
up.save("public/img/mark.png")
make_transparent(up.copy()).save("public/img/mark.png")
make_mono(up.copy(), (255, 255, 255)).save("public/img/mark-mono-light.png")
make_mono(up.copy(), (18, 16, 14)).save("public/img/mark-mono-dark.png")
print("✓ public/img/mark.png (+ mono variants)", up.size)
