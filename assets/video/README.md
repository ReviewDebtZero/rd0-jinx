# Demo video

`web/public/jinx_demo.mp4` (1920×1080, 30 fps, 81 s, captions, no audio) is served at
<https://rd0-jinx.netlify.app/jinx_demo.mp4>. `assets/demo_preview.gif` is its first 10 seconds, used in the README.

Every scene is a real recording or animated HTML, with no mock-ups:

| Scene | Source | What it shows |
|---|---|---|
| intro | `scenes/intro.html` | Animated: two PRs change the same lines; Jinx scores the match |
| term | `gen_term.py` → `term.html` | Typed replay of the real output in `pip.txt` (`pip install rd0-jinx`) and `check.txt` (`jinx check` on `packages/rd0-jinx/examples`) |
| github | `rec_site.py` | Live capture of the Jinx comment on PR #15 |
| site | `rec_site.py` | Live capture of the website: scroll, demo replay, slider, theme switch |
| chart | `scenes/chart.html` | Animated false-alarm comparison, numbers from the benchmark |
| outro | `scenes/outro.html` | End card |

## Rebuild

Needs Python with `playwright` and `Pillow`, Chrome, and `ffmpeg`. Set the Chrome path in `rec_one.py` and `rec_site.py`.

```bash
cd assets/video/src
python3 gen_term.py                       # writes term.html from pip.txt + check.txt
python3 rec_one.py intro scenes/intro.html 10.5
python3 rec_one.py term  term.html 17
python3 rec_one.py chart scenes/chart.html 8
python3 rec_one.py outro scenes/outro.html 5
(cd ../../../web && npm run build && npx serve -l 3090 out) &   # site on :3090
python3 rec_site.py                       # site.mp4 + github.mp4
python3 compose.py                        # crossfades → jinx_promo_animated.mp4
```
