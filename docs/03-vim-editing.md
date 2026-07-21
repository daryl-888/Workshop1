# Step 3 — Writing the script with vim

**Goal:** write the first half of your dashboard into `dashboard.sh`.
**New tool:** `vim` (a text editor that lives in the terminal)

So far you've made an *empty* `dashboard.sh`. Now you'll put real content in it.
On a server there's no Notepad — you edit text right in the terminal. We use
**vim**. You only need four things today; keep the
**[vim cheat-sheet](vim-cheatsheet.md)** open in another tab.

## The one thing to understand about vim

vim has two modes:

- **NORMAL mode** (the start): keys are *commands*, not text. Typing here moves
  around and does things — it does **not** insert letters.
- **INSERT mode:** now you can type text normally, like any editor.

You switch between them. That's the whole trick.

## The four moves you need

1. **Open the file:**  `vim dashboard.sh`
2. **Start typing:** press `i` (for *insert*). You'll see `-- INSERT --` at the
   bottom. Now type normally.
3. **Stop typing:** press `Esc`. You're back in NORMAL mode.
4. **Save and quit:** type `:wq` then press `Enter`. (`w`rite + `q`uit.)

Stuck / panicking? Press `Esc`, then type `:q!` and Enter to quit *without*
saving, and start the file again. Nothing is lost but the current edit.

## Now write the dashboard

Open the file:

```
$ vim dashboard.sh
```

Press `i`, then type this in **exactly** (it's fine to go slow):

```bash
#!/bin/bash
# My Command Center — a live system dashboard

echo "=============================="
echo "   COMMAND CENTER"
echo "   $(whoami)@$(hostname)"
echo "   $(date '+%Y-%m-%d %H:%M:%S')"
echo "=============================="
echo
echo "UPTIME:"
uptime -p
echo
echo "DISK (root):"
df -h / | tail -n 1
echo
echo "MEMORY:"
free -h | grep Mem
echo
```

When done: press `Esc`, then type `:wq` and Enter.

### What did you just write?

- `#!/bin/bash` — the "shebang." It tells the system this file is a bash script.
- `echo "..."` — prints a line of text. Your dashboard's labels and borders.
- `$( ... )` — runs a command and drops its output right into the line. So
  `$(whoami)` becomes your username. This is how the dashboard shows live info.
- `uptime -p`, `df -h /`, `free -h` — ask the system for uptime, disk, and memory.

You don't need to memorize these — you're seeing how a script is just the same
commands you'd type, saved in order.

## ✅ Check yourself

```
$ cd ..
$ bash check.sh
```

Then open **[Step 4 — Reading data](04-pipes-grep.md)**.
