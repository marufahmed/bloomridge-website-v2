#!/usr/bin/env python3
"""Generate the website illustrations with Azure gpt-image-2.

Ten scenes, one per hero/section. Every scene is written as a hand-painted
picture-book illustration with no photographic vocabulary, because the Azure
deployment refuses photographic prompts that include children.

    python3 scripts/gen-images.py              # everything still missing
    python3 scripts/gen-images.py --force id   # regenerate one
    python3 scripts/gen-images.py --status

Needs URL_GPT_IMAGE_2 and KEY_GPT_IMAGE_2 in the environment or in
../04-Clinical/storybooks/.env (never committed).
"""
from __future__ import annotations

import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
OUT = ROOT / "src" / "assets" / "img"
ENV_FILE = ROOT.parent / "04-Clinical" / "storybooks" / ".env"
W, H = 1536, 1024

STYLE = (
    "A warm hand-painted children's picture-book illustration in gouache and coloured "
    "pencil, with clean confident linework and soft rounded shapes. Natural, true-to-life "
    "proportions: people are drawn as people, not exaggerated cartoons. Bright, even "
    "daylight and gentle soft shadows. A restrained palette of deep pine green, warm "
    "cream, sand, soft amber and honey yellow, with small touches of muted teal. "
    "Every part of the picture is finished with the same care, nothing hazy or sketchy. "
    "Wide 3:2 landscape framing with generous calm space around the subject."
)
PEOPLE = (
    "Everyone is Bangladeshi, in ordinary contemporary clothing suited to the place. "
    "Faces are friendly, clear and whole; hands are drawn correctly with five fingers; "
    "every figure is complete inside the frame. Calm, cheerful, ordinary mood."
)
SECULAR = (
    "Keep it cultural, not religious: no religious dress, head coverings, religious "
    "symbols or religious buildings anywhere in the image."
)
NEGATIVE = (
    "DO NOT INCLUDE: any text, lettering, words, numbers, labels, signboards, logos, "
    "watermark or signature; nothing vague, hazy, washed-out or unfinished; no "
    "medical equipment, no white coats, no clinical or hospital feeling."
)

SCENES = {
    "hero-classroom": (
        "SETTING: a bright, calm early-years therapy classroom on the first floor of a "
        "modern Dhaka apartment building, mid-morning. Low round wooden tables, small "
        "chairs, a soft rug, open shelves with woven baskets and wooden toys, a big "
        "window with rain-tree leaves outside. "
        "WHAT IS HAPPENING: in the foreground a young woman therapist kneels beside a "
        "boy of about four at a low table, holding up a picture card while he points at "
        "it and smiles; in the middle distance a girl of about five stacks wooden blocks "
        "with a teacher crouched beside her; on the far side a small boy sits on the rug "
        "turning the pages of a picture book."
    ),
    "early-intervention": (
        "SETTING: a soft, uncluttered sensory play room with a padded floor, a fabric "
        "sensory swing hanging from the ceiling, a small ball pit in one corner and a "
        "low foam climbing mat, morning light from a side window. "
        "WHAT IS HAPPENING: a girl of about three sits in the fabric swing, both hands "
        "on the edges, laughing gently, while a young woman therapist kneels beside it "
        "with one hand steadying the swing and looks at her warmly."
    ),
    "school-readiness": (
        "SETTING: a small, orderly classroom with a chalk-free whiteboard left blank, "
        "a low bookshelf, alphabet blocks in a basket, plants on the windowsill, clear "
        "daylight. "
        "WHAT IS HAPPENING: a boy of about six sits at a desk in the foreground, "
        "carefully writing on a sheet of paper with a pencil, tongue slightly out in "
        "concentration; a woman teacher sits beside him pointing at the page; behind "
        "them two other children sit at a shared table drawing."
    ),
    "speech-therapy": (
        "SETTING: a quiet corner of a therapy room with a small square table, two small "
        "chairs, a hand mirror on the table, a jar of bubbles and a stack of picture "
        "cards, a plant in the window. "
        "WHAT IS HAPPENING: a woman speech therapist sits opposite a boy of about five, "
        "leaning forward, holding up a picture card of an apple; the boy is mid-word "
        "with his mouth open, pointing at the card, both of them relaxed and engaged."
    ),
    "occupational-therapy": (
        "SETTING: a low wooden table in a play-therapy room, a tray of textured objects, "
        "a lump of playdough, a bowl of large wooden beads and a length of string. "
        "WHAT IS HAPPENING: close view of a girl of about four threading a large wooden "
        "bead onto a string with both hands, deeply focused; an adult's hands gently "
        "hold the string steady from the other side of the table."
    ),
    "special-education": (
        "SETTING: a cosy reading corner with a cushioned bench, a low shelf of picture "
        "books, a potted plant and a round window letting in soft light. "
        "WHAT IS HAPPENING: a girl of about seven and a woman teacher sit side by side "
        "sharing one open picture book, the teacher's finger tracing a line on the page, "
        "the girl looking closely and about to read aloud."
    ),
    "group-session": (
        "SETTING: a bright room with a large round rug, a few floor cushions, a low shelf "
        "of games, tall windows. "
        "WHAT IS HAPPENING: five children of about four to seven sit in a loose circle "
        "on the rug with a young woman psychologist; one child is passing a soft yellow "
        "ball to the next, the others watch and wait their turn, one clapping."
    ),
    "parent-review": (
        "SETTING: a small meeting nook by a window, a round table with a pot of tea and "
        "two cups, a folder open on the table showing only a simple hand-drawn chart of "
        "rising dots with no words, late-afternoon light. "
        "WHAT IS HAPPENING: a mother and father sit together on one side of the table "
        "listening, the mother leaning in; on the other side a woman therapist points to "
        "the chart in the folder and smiles, mid-explanation."
    ),
    "home-practice": (
        "SETTING: a dining table in a modern Dhaka flat, morning light through a "
        "balcony door, a bowl of fruit, a cat asleep on a chair. "
        "WHAT IS HAPPENING: a father sits beside his daughter of about five at the "
        "table; she is tracing a large wavy line on a worksheet with a chunky crayon, "
        "and he rests one hand on the table watching her, quietly pleased."
    ),
    "centre-exterior": (
        "SETTING: the ground-floor entrance of a tidy modern residential building on a "
        "quiet tree-lined lane in Banasree, Dhaka, early morning. A small front garden "
        "with a bougainvillea in bloom, a low iron gate standing open, a tiled step, a "
        "wooden door, a rain tree casting dappled shade, a parked bicycle. "
        "WHAT IS HAPPENING: nobody is in the frame; the scene is calm and welcoming."
    ),
}


def load_env():
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
    url = os.environ.get("URL_GPT_IMAGE_2")
    key = os.environ.get("KEY_GPT_IMAGE_2")
    if not url or not key:
        sys.exit("error: set URL_GPT_IMAGE_2 and KEY_GPT_IMAGE_2")
    base = url.split("?")[0]
    api_version = "2024-02-01"
    if "api-version=" in url:
        api_version = url.split("api-version=")[1].split("&")[0]
    return f"{base}?api-version={api_version}", key


def generate(endpoint: str, key: str, prompt: str) -> bytes:
    body = {"prompt": prompt, "n": 1, "size": f"{W}x{H}", "quality": "high",
            "output_format": "png"}
    req = urllib.request.Request(
        endpoint, data=json.dumps(body).encode(),
        headers={"api-key": key, "Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            res = json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code}: {e.read().decode()[:300]}") from None
    item = (res.get("data") or [{}])[0]
    if item.get("b64_json"):
        return base64.b64decode(item["b64_json"])
    if item.get("url"):
        with urllib.request.urlopen(item["url"], timeout=120) as r:
            return r.read()
    raise RuntimeError(f"no image payload: {str(res)[:200]}")


def main(argv):
    OUT.mkdir(parents=True, exist_ok=True)
    if "--status" in argv:
        for sid in SCENES:
            print(("done   " if (OUT / f"{sid}.png").exists() else "missing"), sid)
        return
    force = "--force" in argv
    wanted = [a for a in argv[1:] if not a.startswith("--")] or list(SCENES)
    endpoint, key = load_env()
    for sid in wanted:
        path = OUT / f"{sid}.png"
        if path.exists() and not force:
            print("skip", sid); continue
        prompt = f"{STYLE}\n\n{SCENES[sid]}\n\nPEOPLE: {PEOPLE}\n\n{SECULAR}\n\n{NEGATIVE}"
        for attempt in range(1, 4):
            t0 = time.time()
            try:
                data = generate(endpoint, key, prompt)
                path.write_bytes(data)
                print(f"ok   {sid} {len(data)//1024} KB {time.time()-t0:.0f}s", flush=True)
                break
            except Exception as e:  # noqa: BLE001
                print(f"fail {sid} attempt {attempt}: {e}", flush=True)
                time.sleep(5)


if __name__ == "__main__":
    main(sys.argv)
