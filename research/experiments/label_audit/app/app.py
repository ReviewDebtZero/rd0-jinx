"""Jinx human labeling app: do the two PRs duplicate each other's work?

Each annotator picks a name; answers are appended to answers/<name>.jsonl, one
JSON object per line {id, label, note}. Re-open the app to resume. The hidden
Haiku audit key is never loaded or shown.
"""

import json
import pathlib

import gradio as gr

HERE = pathlib.Path(__file__).resolve().parent
TASKS = [json.loads(line) for line in (HERE / "tasks.jsonl").read_text().splitlines()]
ANSWERS = HERE / "answers"
ANSWERS.mkdir(exist_ok=True)

LABELS = [
    "yes - same change",
    "yes - replacement (redone the same work)",
    "partly - one PR contains the other",
    "no - related but different work",
    "no - unrelated",
    "unclear",
]

GUIDE = """Label each pair as you would in review:

- **yes - same change**: both PRs make essentially the same change.
- **yes - replacement**: the newer PR redoes the older one's work (whether or not it says so).
- **partly**: one PR's change contains the other's, but they are not the same scope.
- **no - related**: touching the same area but genuinely different work.
- **no - unrelated**.
- **unclear**: you cannot tell from the titles/descriptions and do not want to open the PRs.

The quoted comment is what a maintainer or bot wrote when the pair was linked in
the real repository. Judge the PRs, not the comment. Click through to GitHub for
diffs when titles and descriptions are not enough.
"""


def answers_path(name):
    safe = "".join(c for c in name if c.isalnum() or c in "-_").lower() or "anon"
    return ANSWERS / f"{safe}.jsonl"


def load_answers(name):
    path = answers_path(name)
    if not path.exists():
        return {}
    out = {}
    for line in path.read_text().splitlines():
        row = json.loads(line)
        out[row["id"]] = row
    return out


def save_answer(name, task_id, label, note):
    with answers_path(name).open("a") as f:
        f.write(json.dumps({"id": task_id, "label": label, "note": note}) + "\n")


def progress(name):
    done = len(load_answers(name))
    return f"**{done} / {len(TASKS)}** pairs labeled"


def render_task(name, idx):
    if not name:
        return [gr.update()] * 8
    done = load_answers(name)
    task = TASKS[idx]
    prev = done.get(task["id"], {})
    header = f"### Pair {idx + 1} of {len(TASKS)} · id {task['id']} · `{task['repository']}`" + (
        "  ·  ✅ already labeled" if prev else ""
    )
    links = f"[Older PR]({task['older_pr']})  ·  [Newer PR]({task['newer_pr']})"
    context = f"Linking comment: *{task['linking_comment']}*\n\n---\n\n" + task["context"].replace(
        "## OLDER PR", "### OLDER PR"
    ).replace("## NEWER PR", "### NEWER PR")
    jump_max = len(TASKS)
    return [
        header,
        links,
        context,
        gr.update(value=prev.get("label")),
        prev.get("note", ""),
        progress(name),
        idx,
        jump_max,
    ]


def first_unlabeled(name):
    done = load_answers(name)
    for i, t in enumerate(TASKS):
        if t["id"] not in done:
            return i
    return 0


def start(name):
    return render_task(name, first_unlabeled(name))


def step(name, idx, delta):
    return render_task(name, max(0, min(len(TASKS) - 1, idx + delta)))


def jump(name, target):
    return render_task(name, max(0, min(len(TASKS) - 1, int(target) - 1)))


def submit(name, idx, label, note):
    if not name:
        gr.Warning("Enter your annotator name first.")
        return render_task(name, idx)
    if not label:
        gr.Warning("Pick a label before saving.")
        return render_task(name, idx)
    save_answer(name, TASKS[idx]["id"], label, note or "")
    gr.Info(f"Saved pair {idx + 1} as '{label}'.")
    return render_task(name, min(len(TASKS) - 1, idx + 1))


def export(name):
    path = answers_path(name)
    if not path.exists():
        return None
    return str(path)


with gr.Blocks(title="Jinx duplicate-PR labeling") as demo:
    gr.Markdown(
        "# Jinx: are these two PRs the same work?\n"
        "You will see 100 pairs of pull requests that were linked as duplicates in the wild.\n\n" + GUIDE
    )
    name = gr.Textbox(label="Your annotator name (e.g. A or B)", placeholder="A", max_lines=1)
    start_btn = gr.Button("Start / resume", variant="primary")
    gr.Markdown("---")
    progress_md = gr.Markdown()
    header = gr.Markdown()
    links = gr.Markdown()
    with gr.Accordion("PR context (titles, files, descriptions — click links for diffs)", open=True):
        context = gr.Markdown()
    label = gr.Radio(LABELS, label="Your label")
    note = gr.Textbox(label="Note (optional, e.g. why unclear)", max_lines=2)
    with gr.Row():
        prev_btn = gr.Button("◀ Previous")
        submit_btn = gr.Button("Save & next ▶", variant="primary")
        next_btn = gr.Button("Skip ▶")
    with gr.Row():
        jump_num = gr.Number(label="Jump to pair #", precision=0, minimum=1)
        export_btn = gr.Button("Get my answers file")
        export_file = gr.File(interactive=False)
    idx_state = gr.State(0)

    outs = [header, links, context, label, note, progress_md, idx_state, jump_num]
    start_btn.click(start, name, outs)
    name.submit(start, name, outs)
    prev_btn.click(step, [name, idx_state, gr.State(-1)], outs)
    next_btn.click(step, [name, idx_state, gr.State(1)], outs)
    jump_num.submit(jump, [name, jump_num], outs)
    submit_btn.click(submit, [name, idx_state, label, note], outs)
    export_btn.click(export, name, export_file)

if __name__ == "__main__":
    demo.launch()
