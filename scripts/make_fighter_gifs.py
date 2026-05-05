from PIL import Image, ImageDraw


SIZE = 96
FRAMES = 12


FIGHTERS = {
    "energy": {
        "path": "fighter-energy.gif",
        "skin": "#f6c28b",
        "hair": "#10151f",
        "jacket": "#1557d8",
        "pants": "#f3f8ff",
        "trim": "#39d5ff",
        "glove": "#f8fbff",
        "boot": "#102f7a",
        "aura": "#35e8ff",
    },
    "arcade": {
        "path": "fighter-arcade.gif",
        "skin": "#f1b37e",
        "hair": "#2a1710",
        "jacket": "#d82f2f",
        "pants": "#244b8f",
        "trim": "#ffd15c",
        "glove": "#f7d23a",
        "boot": "#2b1b19",
        "aura": "#ffef5a",
    },
    "armor": {
        "path": "fighter-armor.gif",
        "skin": "#d7e1ec",
        "hair": "#0f1720",
        "jacket": "#56677c",
        "pants": "#2d3b4d",
        "trim": "#f7b733",
        "glove": "#cfd8e3",
        "boot": "#1b2634",
        "aura": "#7df9ff",
    },
    "mystic": {
        "path": "fighter-mystic.gif",
        "skin": "#ead7ff",
        "hair": "#26113f",
        "jacket": "#6d38de",
        "pants": "#221039",
        "trim": "#f4d35e",
        "glove": "#ffc5fb",
        "boot": "#1b0b2e",
        "aura": "#ff7df5",
    },
    "rogue": {
        "path": "fighter-rogue.gif",
        "skin": "#f1b492",
        "hair": "#220812",
        "jacket": "#b1123a",
        "pants": "#151725",
        "trim": "#ff9fb2",
        "glove": "#f7f0ef",
        "boot": "#160d12",
        "aura": "#ff4d6d",
    },
    "idol": {
        "path": "fighter-idol.gif",
        "skin": "#ffd3b6",
        "hair": "#5c245a",
        "jacket": "#ff6ec7",
        "pants": "#3a0ca3",
        "trim": "#fff1a8",
        "glove": "#ffffff",
        "boot": "#231942",
        "aura": "#ffd1f3",
    },
    "knight": {
        "path": "fighter-knight.gif",
        "skin": "#e7edf6",
        "hair": "#d8e2f0",
        "jacket": "#9aa7bd",
        "pants": "#34415a",
        "trim": "#f5c542",
        "glove": "#dbe7f6",
        "boot": "#1d2738",
        "aura": "#bde0fe",
    },
    "oracle": {
        "path": "fighter-oracle.gif",
        "skin": "#dfc2ff",
        "hair": "#14051f",
        "jacket": "#5a189a",
        "pants": "#240046",
        "trim": "#f4d35e",
        "glove": "#e0aaff",
        "boot": "#10002b",
        "aura": "#c77dff",
    },
}


POSES = [
    {"bob": 0, "arm": -10, "leg": -8, "kick": 0, "blast": 0},
    {"bob": -2, "arm": 8, "leg": 8, "kick": 0, "blast": 0},
    {"bob": -1, "arm": -16, "leg": -6, "kick": 0, "blast": 0},
    {"bob": -3, "arm": 12, "leg": 10, "kick": 0, "blast": 0},
    {"bob": 0, "arm": -6, "leg": -4, "kick": 0, "blast": 0},
    {"bob": -2, "arm": 28, "leg": 4, "kick": 0, "blast": 1},
    {"bob": -3, "arm": 42, "leg": -4, "kick": 0, "blast": 2},
    {"bob": -1, "arm": 18, "leg": 8, "kick": 0, "blast": 1},
    {"bob": -2, "arm": -4, "leg": -12, "kick": 24, "blast": 1},
    {"bob": -4, "arm": 8, "leg": 4, "kick": 38, "blast": 2},
    {"bob": -1, "arm": 30, "leg": -2, "kick": 8, "blast": 3},
    {"bob": 0, "arm": -8, "leg": 6, "kick": 0, "blast": 0},
]


def line(draw, points, color, width):
    draw.line(points, fill="#0a0b12", width=width + 5, joint="curve")
    draw.line(points, fill=color, width=width, joint="curve")


def poly(draw, points, fill):
    draw.polygon(points, fill="#0a0b12")
    inset = []
    cx = sum(x for x, _ in points) / len(points)
    cy = sum(y for _, y in points) / len(points)
    for x, y in points:
        inset.append((x + (cx - x) * 0.08, y + (cy - y) * 0.08))
    draw.polygon(inset, fill=fill)


def glow(draw, x, y, color, strength):
    if strength <= 0:
        return
    radius = 7 + strength * 5
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), outline=color, width=3)
    draw.line((x - 20, y, x - 5, y), fill=color, width=4)
    if strength > 1:
        draw.arc((x - 16, y - 16, x + 22, y + 22), start=310, end=45, fill=color, width=4)


def draw_energy_details(draw, spec, bob):
    hair = spec["hair"]
    poly(draw, [(40, 15 + bob), (47, 3 + bob), (51, 17 + bob)], hair)
    poly(draw, [(33, 18 + bob), (26, 7 + bob), (43, 14 + bob)], hair)


def draw_armor_details(draw, spec, bob):
    draw.rounded_rectangle((36, 14 + bob, 55, 31 + bob), radius=3, fill="#0a0b12")
    draw.rectangle((40, 20 + bob, 55, 24 + bob), fill=spec["aura"])
    draw.rectangle((37, 35 + bob, 55, 41 + bob), fill=spec["trim"])


def draw_mystic_details(draw, spec, bob):
    poly(draw, [(30, 29 + bob), (48, 18 + bob), (61, 31 + bob), (56, 57 + bob), (31, 57 + bob)], spec["jacket"])
    draw.arc((23, 11 + bob, 64, 54 + bob), 210, 315, fill=spec["trim"], width=3)


def draw_premium_details(draw, name, spec, bob, arm, kick):
    if name == "rogue":
        poly(draw, [(25, 29 + bob), (36, 21 + bob), (43, 55 + bob), (31, 64 + bob)], "#2b101b")
        draw.line((62 + arm, 43 + bob, 81 + arm, 36 + bob), fill=spec["aura"], width=3)
    elif name == "idol":
        draw.arc((22, 16 + bob, 67, 61 + bob), 205, 330, fill=spec["trim"], width=4)
        draw.ellipse((18, 17 + bob, 28, 27 + bob), fill=spec["trim"])
        draw.ellipse((55, 12 + bob, 66, 23 + bob), fill=spec["aura"])
    elif name == "knight":
        draw.rounded_rectangle((34, 13 + bob, 57, 32 + bob), radius=4, fill="#0a0b12")
        draw.rectangle((39, 20 + bob, 57, 24 + bob), fill=spec["aura"])
        poly(draw, [(27, 35 + bob), (40, 30 + bob), (34, 68 + bob), (22, 72 + bob)], "#dbe7f6")
        draw.line((59 + kick * 0.25, 37 + bob, 77 + kick * 0.25, 63 + bob), fill=spec["trim"], width=4)
    elif name == "oracle":
        poly(draw, [(28, 28 + bob), (46, 17 + bob), (65, 29 + bob), (58, 66 + bob), (29, 66 + bob)], spec["jacket"])
        draw.ellipse((63 + arm * 0.25, 25 + bob, 78 + arm * 0.25, 40 + bob), outline=spec["aura"], width=3)
        draw.arc((18, 10 + bob, 68, 66 + bob), 230, 315, fill=spec["trim"], width=3)


def draw_frame(name, spec, pose):
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    bob = pose["bob"]
    arm = pose["arm"]
    leg = pose["leg"]
    kick = pose["kick"]
    blast = pose["blast"]

    draw.ellipse((24, 78, 72, 89), fill=(0, 0, 0, 72))
    if blast:
        draw.ellipse((28 - blast, 14 - blast + bob, 67 + blast, 66 + blast + bob), outline=spec["aura"], width=2)

    hip = (45, 58 + bob)
    shoulder = (45, 38 + bob)

    line(draw, (hip[0] - 5, hip[1], 34 - leg, 71 + bob, 33 - leg, 84 + bob), spec["pants"], 8)
    line(draw, (hip[0] + 6, hip[1], 51 + kick, 70 + bob, 57 + kick, 82 + bob), spec["boot"], 8)

    poly(draw, [(33, 31 + bob), (51, 28 + bob), (60, 55 + bob), (45, 64 + bob), (29, 55 + bob)], spec["jacket"])
    poly(draw, [(39, 34 + bob), (52, 34 + bob), (55, 55 + bob), (42, 59 + bob), (35, 52 + bob)], spec["trim"])

    line(draw, (shoulder[0] - 10, shoulder[1] + 2, 27 - arm / 3, 49 + bob, 29 - arm / 4, 61 + bob), spec["jacket"], 8)
    line(draw, (shoulder[0] + 9, shoulder[1] + 1, 58 + arm, 42 + bob, 63 + arm, 48 + bob), spec["glove"], 8)

    if name == "mystic":
        draw_mystic_details(draw, spec, bob)
    draw_premium_details(draw, name, spec, bob, arm, kick)

    draw.ellipse((34, 15 + bob, 54, 35 + bob), fill="#0a0b12")
    if name == "armor":
        draw_armor_details(draw, spec, bob)
    else:
        draw.ellipse((37, 14 + bob, 55, 32 + bob), fill=spec["skin"])
        draw.rectangle((47, 21 + bob, 54, 24 + bob), fill=spec["aura"])
        if name == "energy":
            draw_energy_details(draw, spec, bob)
        else:
            poly(draw, [(35, 18 + bob), (45, 8 + bob), (58, 19 + bob), (51, 14 + bob)], spec["hair"])

    if name == "arcade":
        draw.rectangle((30, 18 + bob, 58, 22 + bob), fill=spec["trim"])
    if name == "mystic":
        draw.ellipse((61, 25 + bob, 70, 34 + bob), fill=spec["aura"])
        draw.arc((56, 20 + bob, 76, 40 + bob), 0, 300, fill=spec["aura"], width=2)

    glow(draw, 70 + arm * 0.45 + kick * 0.15, 43 + bob, spec["aura"], blast)
    return img


def make_hitspark():
    import os

    os.makedirs("assets/fighters/fx", exist_ok=True)
    img = Image.new("RGBA", (80, 39), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    for index in range(5):
        ox = index * 16 + 8
        radius = 4 + index * 2
        color = (255, 232, 99, max(80, 230 - index * 26))
        draw.line((ox - radius, 19, ox + radius, 19), fill=color, width=2)
        draw.line((ox, 19 - radius, ox, 19 + radius), fill=color, width=2)
        draw.line((ox - radius // 2, 19 - radius // 2, ox + radius // 2, 19 + radius // 2), fill=(255, 120, 80, 180), width=2)
        draw.ellipse((ox - 2, 17, ox + 2, 21), fill=(255, 255, 255, 230))
    img.save("assets/fighters/fx/hitspark.png")


def main():
    for name, spec in FIGHTERS.items():
        frames = [draw_frame(name, spec, pose) for pose in POSES]
        frames[0].save(
            spec["path"],
            save_all=True,
            append_images=frames[1:],
            duration=72,
            loop=0,
            disposal=2,
        )
    make_hitspark()


if __name__ == "__main__":
    main()
