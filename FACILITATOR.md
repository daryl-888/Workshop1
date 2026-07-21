# Facilitator Guide — the "why" behind the design

This is for you, the person running the workshop. It explains the structural and
pedagogical choices so you can teach with intent (and adapt on the fly), not just
read the scripts. Students never need this file.

## The core bet: one build, not ten exercises

Isolated drills ("type `ls`, now type `cd`") teach commands but not *why anyone
would use them*. Beginners forget them by next week because there's no anchor.
Instead, everyone builds **one real tool** — a system dashboard — and every
command is introduced at the exact moment it's needed to move the build forward.
`mkdir` isn't abstract; it's "make the folder your tool lives in." `chmod` isn't
trivia; it's the thing standing between them and their tool running. Motivation is
built into the sequence, so retention rides on a story rather than rote memory.

The narrative frame ("you're a new sysadmin setting up your workstation") is
deliberately light — one sentence per step — because the *build itself* is the
story. You don't need to sell the theme; the working tool at the end sells it.

## Why a system dashboard (vs. notes app / quote generator)

Three reasons, in priority order:

1. **It exercises every target command naturally.** The dashboard genuinely needs
   folders (`mkdir`), files (`touch`/`cp`), editing (`vim`), data filtering
   (`grep`/pipes), executability (`chmod`), and backgrounding (`ps`/`kill`). The
   other candidates lean on scripting logic and use several commands only in a
   contrived way.
2. **It produces live, changing output.** Uptime and the clock change every run,
   so re-running feels alive — proof they built a *tool*, not a static printout.
3. **It bridges to the GPU series.** Later, the same tool gains one line
   (`nvidia-smi`) and reports on the GPU. The artifact grows with the learner
   instead of being thrown away — a through-line from "Zero to GPU."

## Why the order is what it is

The sequence follows the natural life of building a tool, which happens to also be
a clean difficulty ramp:

- **Navigate → scaffold → write → feed data → run → manage.** Each step's output
  is the next step's input, so nobody is left wondering "what now?"
- **Permissions (`chmod`) is placed as the payoff**, right after the script is
  fully written. The `Permission denied` error is intentional — hitting it and
  then fixing it teaches *why* the execute bit exists far better than a lecture. It
  turns a confusing gotcha into the most satisfying 30 seconds of the hour.
- **Processes come last** because they're the most abstract. By then students are
  fluent enough with the terminal to handle "running in the background."

## Vim: deliberately minimal

Vim is famous for trapping beginners ("how do I quit?!"). The mitigations:

- Only **four moves** are taught inline: open, `i` to insert, `Esc`, `:wq`. That's
  the minimum to write a file and get out.
- The **mode model** (NORMAL vs INSERT) is stated once, explicitly, because *every*
  vim confusion traces back to not knowing which mode you're in. "When in doubt,
  press `Esc`" is the safety net.
- A standalone **cheat-sheet** carries everything else, so nobody memorizes under
  time pressure. Tell students to keep it open in a second browser tab.
- `:q!` is taught as the "undo the whole mess" escape hatch. Expect a few students
  to mangle the file; reopening is cheap and they lose nothing but one edit.

Budget extra time here — vim is the single most likely place to lose people. It's
worth pausing to make sure everyone has quit vim successfully at least once before
moving on.

## The self-check script (`check.sh`)

`bash check.sh` after every step. Design choices:

- **Plain-language pass/fail**, with a specific next command on any failure — so a
  stuck student self-rescues instead of raising a hand and waiting.
- It checks **outcomes, not keystrokes** (does the folder exist? is it
  executable?), so there are many valid paths to a pass.
- When all steps pass it **actually runs their dashboard and prints a preview** —
  an automatic victory-lap moment.
- It's location-independent (finds its own folder), so "run it from the main
  folder" always works even if a student is somewhere unexpected.

Use it as your pacing radar: glance around the room, and if most screens show 3/6,
you know where the group is without interrupting anyone.

## Environment: GitHub Codespaces

Chosen over the original home-server plan because it's **zero-install, identical
for everyone, and browser-only** — no OS-specific troubleshooting eating your
hour, no accounts on your server to provision. The `.devcontainer` pins Ubuntu
22.04 and pre-installs `procps`/`vim` so `free`, `uptime`, and `ps` are guaranteed
present. The container reports its *own* CPU/memory/disk — which is real, live data
and totally fine pedagogically; students read it as "my machine."

A local fallback (native terminal / WSL) is in the README for anyone who can't use
Codespaces, but steer the room to Codespaces so everyone's on the same setup.

### Pre-flight (do once before the session)
1. Push this repo to GitHub (public, or add students as collaborators).
2. Create a Codespace yourself once to warm the image and confirm `bash check.sh`
   runs and `.devcontainer` builds cleanly.
3. Have the repo URL and the "Code → Codespaces → Create" click-path on a slide.

## Timing (rough, for 60 minutes)

| Segment | Time |
|---|---|
| Intro + open Codespaces + "what's a terminal" | 8 min |
| Step 1 Navigation | 6 min |
| Step 2 File setup | 8 min |
| Step 3 Vim + write script | 14 min (the crunch point) |
| Step 4 Pipes/grep + extend script | 10 min |
| Step 5 chmod + run (payoff) | 6 min |
| Step 6 Processes | 6 min |
| Teaser + wrap | 2 min |

If you're behind, Step 6 (processes) is the safest to demo-only rather than have
everyone do it — the payoff already happened at Step 5.

## Guard rails (why nobody gets lost)

The single most common way a beginner derails is a stray `cd` — a bare `cd` jumps
to the home folder, or one `cd ..` too many climbs above the repo. From there,
every relative command and `check.sh` breaks, and they don't know why.

`workshop-shell.sh` prevents this. It loads automatically in Codespaces (the
`.devcontainer` adds a line to `~/.bashrc`) and:

- **clamps `cd`** so it can't go above the workshop folder (a friendly message
  appears if they try),
- makes a **bare `cd`** return to the workshop base instead of `~`,
- adds **`base`** (main folder) and **`cc`** (command-center) — jump back from
  anywhere.

It only affects the *interactive* shell, so scripts like `check.sh` and
`celebrate.sh` are untouched. To turn it off for a shell (e.g. you need to leave
the folder): `unset -f cd cc base`, or prefix a single command with `builtin`
(`builtin cd /somewhere`). Students open a **new terminal** after Codespaces
finishes setup so the rails are active.

## Common stumbles & quick fixes

- **Stuck in vim** → "Press `Esc`, type `:q!`, Enter. Reopen and try again."
- **`Permission denied` at Step 5** → that's expected; it's the `chmod +x` lesson.
- **`grep`/`cp` says "No such file"** → they're in the wrong folder. `pwd` to
  orient, `cd` to fix. Most errors this hour are just "wrong folder."
- **Checkmarks won't turn green even though the script looks right** → they edited
  `dashboard.sh` in the *main* folder instead of inside `command-center`, so
  `check.sh` is reading the empty one. `check.sh` now detects this and prints a
  "move it" hint; the fix is `mv dashboard.sh command-center/`. Each build step
  now starts with `cd command-center` to prevent it.
- **Typos in the script** → `check.sh` will still flag structure; for runtime
  errors, a stray quote or capital letter is the usual culprit.
