import subprocess, json
order = ["intro", "term", "github", "site", "chart", "outro"]
d = [float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f + ".mp4"])) for f in order]
X = 0.5
inputs = sum([["-i", f + ".mp4"] for f in order], [])
fc, last, off = [], "[0:v]", 0
for i in range(1, len(order)):
    off += d[i - 1] - X
    out = f"[v{i}]"
    fc.append(f"{last}[{i}:v]xfade=transition=fade:duration={X}:offset={off:.3f}{out}")
    last = out
fc.append(f"{last}fade=t=out:st={sum(d) - X * (len(order) - 1) - 0.6:.3f}:d=0.6,format=yuv420p[out]")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(fc), "-map", "[out]", "-r", "30",
                "-c:v", "libx264", "-crf", "19", "-preset", "medium", "-movflags", "+faststart", "jinx_promo_animated.mp4"], check=True)
print("durations", d, "total", round(sum(d) - X * (len(order) - 1), 1))
