# Workshop 1 — Build Your Own Command Center

Welcome! In the next hour you'll go from *never having touched a terminal* to
having built a **real, working tool**: a system dashboard that reports on your
machine — uptime, disk, memory, and alerts pulled from a log file.

You'll learn by *building*, not by memorizing. Every command you learn is a step
toward finishing the tool. By the end, you run one command and your command
center lights up.

This is session 1 of the **From Zero to GPU** series (Linux → CUDA basics → CUDA
raytracer). The skills you learn today are the exact skills you'll use later to
run code on a GPU.

---

## Step 0 — Get a terminal (2 minutes)

You do **not** need to install anything or use your own computer's terminal.
We use **GitHub Codespaces** — a full Linux computer that runs in your browser.

1. Go to this repository on GitHub.
2. Click the green **`< > Code`** button.
3. Choose the **Codespaces** tab → **Create codespace on main**.
4. Wait ~30 seconds. A code editor opens in your browser with a **terminal
   panel** at the bottom. That black panel is where you'll live today.

That's it. You now have your own private Linux machine. The workshop files are
already here.

> If the terminal panel isn't showing: top menu → **Terminal** → **New Terminal**.

<details>
<summary>No GitHub account / prefer your own computer? (fallback)</summary>

- **Mac / Linux:** open the built-in **Terminal** app, then clone the repo:
  `git clone <repo-url> && cd <repo-name>`
- **Windows:** install **WSL** (open PowerShell → `wsl --install` → restart),
  then open **Ubuntu** and clone the repo as above.

Codespaces is strongly recommended for the workshop — it guarantees everyone is
on the exact same setup.
</details>

---

## Your mission

Start here and do the steps **in order**. Each one is a short guided page.

| Step | You'll learn | You'll build |
|------|--------------|--------------|
| [1 — Navigation](docs/01-navigation.md) | `pwd`, `ls`, `cd` | Find your way around |
| [2 — File setup](docs/02-file-ops.md) | `mkdir`, `touch`, `cp`, `mv` | Scaffold the tool's folders/files |
| [3 — Writing the script](docs/03-vim-editing.md) | `vim` (just the basics) | Write the dashboard |
| [4 — Reading data](docs/04-pipes-grep.md) | pipes `\|`, `grep`, `wc` | Add log alerts |
| [5 — Make it run](docs/05-permissions.md) | `chmod` | **It runs!** 🎉 |
| [6 — Run it in the background](docs/06-processes.md) | `ps`, `kill` | Manage it like a pro |

Keep the **[vim cheat-sheet](docs/vim-cheatsheet.md)** open in a second tab for Step 3.

## Check your work anytime

Run this from the main folder to see how far you've gotten:

```bash
bash check.sh
```

It tells you, in plain language, what's done and what's next.

## Feeling lost?

You can't `cd` your way out of the workshop — if you try to leave, it gently keeps
you inside. And from *anywhere*, two commands snap you back:

- `base` — the workshop's main folder
- `cc` — your command center

(These load automatically in Codespaces. Open a **new terminal** after setup so
they're active.)

---

New to all this? Read **[What's a terminal?](docs/00-what-is-a-terminal.md)** first (2 min).

---

## What's in this repo

- `docs/` — the jargon-free intro and the 6 guided build steps, plus the vim cheat-sheet
- `starter/system.log` — sample log data students copy into their tool
- `check.sh` — self-check script (run `bash check.sh` anytime)
- `celebrate.sh` — the finale reward, unlocked once the dashboard runs
- `workshop-shell.sh` — guard rails that keep you from getting lost (auto-loads in Codespaces)
- `slides/` — the projector deck (`.pptx`) and the script that generates it
- `FACILITATOR.md` — the "why": pedagogy, timing, and common stumbles (facilitator-only)
- `.devcontainer/` — the Codespaces setup (Ubuntu + required tools)

## For facilitators

Read **[FACILITATOR.md](FACILITATOR.md)** before running the session — it covers
the reasoning, a minute-by-minute timing table, and quick fixes for the usual
beginner stumbles.

## License

MIT — see [LICENSE](LICENSE). Use it, remix it, run it at your own club.
