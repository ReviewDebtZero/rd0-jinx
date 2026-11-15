import json
pip=[l for l in open("pip.txt").read().splitlines() if l]
chk=open("check.txt").read().rstrip("\n").splitlines()
cmd1='pip install rd0-jinx'
cmd2='jinx check new_pr.json --open-queue open_prs.jsonl --top 2'
steps=[["cmd",cmd1]]+[["out",l,"#94a3b8"] for l in pip]+[["gap",700],["cmd",cmd2]]
for l in chk:
    c="#e2e8f0"
    if "DUPLICATE?" in l: c="#fde68a"
    elif l.strip().startswith("-"): c="#86efac"
    elif l.strip().startswith("#"): c="#94a3b8"
    steps.append(["out",l,c])
page='''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="scenes/base.css"><style>
.hd{position:absolute;left:120px;top:70px;font-size:46px;font-weight:800}.hd2{position:absolute;left:120px;top:135px;font-size:27px;color:#cbd5e1}
.win{position:absolute;left:120px;right:120px;top:200px;bottom:70px;background:#0b1220;border:2px solid #334155;border-radius:20px;box-shadow:0 30px 70px rgba(0,0,0,.55);overflow:hidden}
.bar{height:52px;background:#111827;border-bottom:1px solid #1f2937;display:flex;align-items:center;gap:12px;padding-left:22px}.bar i{width:16px;height:16px;border-radius:50%}
.bar span{margin-left:20px;color:#64748b;font-size:20px}
#t{padding:26px 34px;font-size:24px;line-height:1.55;white-space:pre}
.p{color:#60a5fa}.cur{display:inline-block;width:13px;height:28px;background:#e2e8f0;vertical-align:-5px;animation:bl 1s steps(1) infinite}@keyframes bl{50%{opacity:0}}
</style></head><body><div class="bg"></div><div class="dots"></div>
<div class="hd a" style="animation:up .6s .1s forwards">Working demo: <span class="grad">install, then check a PR</span></div>
<div class="hd2 a" style="animation:up .6s .3s forwards">Real output &middot; a real queue of 19 open PRs from huggingface/transformers, taken from AIDev</div>
<div class="win a" style="animation:pop .6s .4s forwards"><div class="bar"><i style="background:#ef4444"></i><i style="background:#f59e0b"></i><i style="background:#22c55e"></i><span class="mono">~/demo &mdash; bash</span></div><div id="t" class="mono"></div></div>
<script>
const S=__STEPS__;const t=document.getElementById('t');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{await sleep(1100);for(const s of S){if(s[0]==='gap'){await sleep(s[1]);continue}
 if(s[0]==='cmd'){const line=document.createElement('div');line.innerHTML='<span class="p">$ </span><span class="c"></span><span class="cur"></span>';t.appendChild(line);const c=line.querySelector('.c');
  for(const ch of s[1]){c.textContent+=ch;await sleep(28)}await sleep(350);line.querySelector('.cur').remove();await sleep(250)}
 else{const d=document.createElement('div');d.style.color=s[2];d.textContent=s[1]||' ';t.appendChild(d);await sleep(s[1].includes('DUPLICATE')?500:170)}}
 const line=document.createElement('div');line.innerHTML='<span class="p">$ </span><span class="cur"></span>';t.appendChild(line)})();
</script></body></html>'''
open("term.html","w").write(page.replace("__STEPS__",json.dumps(steps)))
print(len(steps),"steps")
