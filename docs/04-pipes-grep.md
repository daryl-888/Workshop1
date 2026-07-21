# Step 4 — Reading data: pipes and grep

**Goal:** teach your dashboard to scan a log file and report alerts.
**New tools:** the pipe `|`, `grep`, `wc`

Your `data/system.log` is a fake system log — hundreds of lines a real machine
might write. Buried in it are `ERROR` lines. A good command center should surface
those. First you'll practice on the command line, then add it to the script.

After the last check you're in the main folder. Step into your command center
first — everything below reads `data/system.log`, which lives in there:

```
$ cd command-center
```

(`pwd` should now end in `command-center`.)

## Reading a whole file: `cat`

```
$ cat data/system.log
```

That dumps the entire file — too much to eyeball. We need to *filter* it.

## `grep` — find lines that match

`grep` prints only the lines containing a word you give it:

```
$ grep "ERROR" data/system.log
```

Now you see only the error lines. Case doesn't always match, so `-i` makes it
ignore capitalization (matches ERROR, error, Error):

```
$ grep -i "error" data/system.log
```

## The pipe `|` — send one command's output into another

The pipe `|` is the terminal's superpower: it takes the output of the command on
the left and feeds it as input to the command on the right. Chain small tools into
something bigger.

`wc -l` counts lines. Combine them to **count** the errors:

```
$ grep -i "error" data/system.log | wc -l
```

Read it as: "find the error lines, then count them." That number is your alert
count — no manual counting.

Show just the most recent error with `tail -n 1` ("last 1 line"):

```
$ grep -i "error" data/system.log | tail -n 1
```

## Add this to your dashboard

Open the script again:

```
$ vim dashboard.sh
```

Get to the bottom: press `Esc` to be safe, then press `G` (capital G) to jump to
the last line. Press `o` (lowercase) — this opens a **new line below** and drops
you straight into INSERT mode. Type this:

```bash
echo "LOG ALERTS:"
echo -n "  Errors found: "
grep -i "error" data/system.log | wc -l
echo "  Most recent error:"
grep -i "error" data/system.log | tail -n 1
echo
echo "Dashboard complete. You are in command."
```

Press `Esc`, then `:wq` and Enter.

(`echo -n` prints without jumping to a new line, so the count lands on the same
line as the label.)

Your dashboard now reads real data and reports on it — that's what makes it a
tool and not just a printout.

## ✅ Check yourself

```
$ cd ..
$ bash check.sh
```

Then open **[Step 5 — Make it run](05-permissions.md)**.
