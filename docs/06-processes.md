# Step 6 — Processes: run it in the background

**Goal:** run your dashboard on a loop in the background, then manage it.
**New commands:** `ps`, `jobs`, `kill`

A real command center doesn't run once — it keeps an eye on things. Right now,
when you run `./dashboard.sh` it prints once and hands control back. Let's have it
refresh on a loop, running in the **background** so you keep using the terminal.

After the last check you're in the main folder. Step into your command center:

```
$ cd command-center
```

## Start a background refresh loop

Type this as one line:

```
$ while true; do ./dashboard.sh > latest.txt; sleep 5; done &
```

Breaking it down: `while true; do ... done` repeats forever; each pass runs the
dashboard and saves its output to `latest.txt` (`>` means "write output to a
file"); `sleep 5` waits 5 seconds between refreshes. The `&` at the very end sends
the whole thing to the **background** — notice you get your prompt back
immediately.

Peek at the always-fresh snapshot a couple of times:

```
$ cat latest.txt
$ cat latest.txt
```

## `jobs` and `ps` — see what's running

`jobs` lists background work you started in this terminal:

```
$ jobs
```

`ps` = **process status** — a broader list of running programs. This shows your
loop's `sleep` waking up and running:

```
$ ps
```

Every running program is a **process** with a number (a PID). That's how you refer
to one when you want to stop it.

## `kill` — stop it

Your loop is job number 1, so stop it by job number:

```
$ kill %1
```

The `%1` means "background job 1." Confirm it's gone:

```
$ jobs
```

(You can also `kill` a process by its PID number from `ps` — same idea, different
label.) Clean up the snapshot file if you like: `rm latest.txt`.

## What you just learned

Starting, listing, and stopping processes is *exactly* how you'll run heavier
programs later — including launching code on a GPU and checking whether it's still
working. Same commands, bigger machine.

## ✅ Final check

```
$ cd ..
$ bash check.sh
```

If everything passes — you're done. Open **[the finish line](../README.md)** and
read the teaser below.

---

## One last command — your reward

You've earned it. Run the finale:

```
$ ./celebrate.sh
```

(It only unlocks once your dashboard actually runs — so it's proof you made it.)

## 🎉 You built a real tool from an empty terminal.

An hour ago you'd never typed a command. Now you have a working system dashboard
you wrote, made executable, and ran as a background service.

**Next workshop:** same skills — navigate, edit, run, manage processes — but this
time the thing you run is **CUDA code on a real GPU**, and your dashboard learns a
new trick: reporting on the graphics card doing the heavy lifting. See you there.
