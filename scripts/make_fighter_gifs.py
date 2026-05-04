from PIL import Image, ImageDraw


SPRITES = {
    "energy": {
        "body": "#1e88ff",
        "trim": "#9ee7ff",
        "skin": "#ffd7a8",
        "accent": "#35e8ff",
        "dark": "#0b2b6f",
        "path": "fighter-energy.gif",
    },
    "arcade": {
        "body": "#e94e31",
        "trim": "#ffd166",
        "skin": "#ffd0a1",
        "accent": "#ffef5a",
        "dark": "#5a1d14",
        "path": "fighter-arcade.gif",
    },
    "armor": {
        "body": "#c9d1d9",
        "trim": "#f7b733",
        "skin": "#c9d1d9",
        "accent": "#7df9ff",
        "dark": "#263342",
        "path": "fighter-armor.gif",
    },
    "mystic": {
        "body": "#7a42f4",
        "trim": "#f4d35e",
        "skin": "#efd9ff",
        "accent": "#ff7df5",
        "dark": "#28104d",
        "path": "fighter-mystic.gif",
    },
}


def draw_limb(draw, points, color, width):
    draw.line(points, fill="#101014", width=width + 3, joint="curve")
    draw.line(points, fill=color, width=width, joint="curve")


def draw_sprite(frame, spec):
    img = Image.new("RGBA", (72, 72), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    bob = [0, -2, -4, -2, 0, -1, -3, -1][frame]
    step = [-5, -2, 4, 6, 3, -2, -6, -3][frame]
    punch = [0, 4, 14, 20, 10, 2, 0, 0][frame]
    kick = [0, 0, 5, 12, 18, 8, 0, 0][frame]

    body = spec["body"]
    trim = spec["trim"]
    skin = spec["skin"]
    accent = spec["accent"]
    dark = spec["dark"]

    draw.ellipse((17, 58, 55, 66), fill=(0, 0, 0, 70))
    draw.ellipse((20 - frame % 2, 58, 56 - frame % 2, 64), fill=(0, 0, 0, 34))

    hip = (36, 43 + bob)
    shoulder = (36, 29 + bob)
    head = (36, 18 + bob)

    draw_limb(draw, (hip[0] - 5, hip[1], hip[0] - 12 - step, hip[1] + 10, hip[0] - 12 - step, hip[1] + 22), dark, 6)
    draw_limb(draw, (hip[0] + 5, hip[1], hip[0] + 10 + kick, hip[1] + 10, hip[0] + 8 + kick, hip[1] + 22), trim, 6)

    draw.rounded_rectangle((26, 26 + bob, 46, 47 + bob), radius=5, fill="#101014")
    draw.rounded_rectangle((28, 25 + bob, 44, 45 + bob), radius=4, fill=body)
    draw.rectangle((29, 36 + bob, 43, 40 + bob), fill=trim)

    draw_limb(draw, (shoulder[0] - 8, shoulder[1] + 1, shoulder[0] - 17 + step, shoulder[1] + 9, shoulder[0] - 15 + step, shoulder[1] + 18), dark, 6)
    draw_limb(draw, (shoulder[0] + 8, shoulder[1] + 1, shoulder[0] + 16 + punch, shoulder[1] + 3, shoulder[0] + 17 + punch, shoulder[1] + 9), skin, 6)

    draw.ellipse((27, 9 + bob, 45, 27 + bob), fill="#101014")
    draw.ellipse((29, 8 + bob, 43, 24 + bob), fill=skin)
    draw.rectangle((28, 20 + bob, 44, 25 + bob), fill=dark)
    draw.rectangle((38, 15 + bob, 42, 18 + bob), fill=accent)

    if frame in (2, 3, 4):
        x = 55 + punch // 2
        y = 26 + bob
        draw.ellipse((x, y, x + 10, y + 10), outline=accent, width=3)
        draw.line((x - 10, y + 5, x - 2, y + 5), fill=accent, width=3)
    if frame in (4, 5):
        draw.arc((38, 35 + bob, 68, 62 + bob), start=305, end=40, fill=accent, width=3)

    return img


def main():
    for name, spec in SPRITES.items():
        frames = [draw_sprite(i, spec) for i in range(8)]
        frames[0].save(
            spec["path"],
            save_all=True,
            append_images=frames[1:],
            duration=84,
            loop=0,
            disposal=2,
        )


if __name__ == "__main__":
    main()
