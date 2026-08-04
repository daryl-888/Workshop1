# Step 7 — Save your work with git

**Goal:** commit your command center so it's permanently saved and yours.
**New commands:** `git status`, `git add`, `git commit`, `git push`

You've been sitting inside a real **git repository** this entire hour — this
workshop *is* one. Every command so far changed files on disk, but none of it
has been *saved* the way real projects save work. That's what git is for: it
takes a permanent, named snapshot of your project so nothing is ever silently
lost, and — because your Codespace is already connected to GitHub — one more
command backs it up off this machine entirely.

Make sure you're back in the main folder (`bash check.sh` should show 6 / 6).

## `git status` — what's changed?

```
$ git status
```

You'll see `command-center/` listed as **untracked**. Git has been sitting right
there the whole time, quietly not paying attention to your new folder — every
file you made this hour exists on disk, but git doesn't know about it yet.

## `git add` — stage your changes

`git add` tells git "start tracking this":

```
$ git add command-center
```

Run `git status` again. `command-center/` now shows in green — **staged** and
ready to be saved.

## `git commit` — take the snapshot

A commit is a permanent snapshot of exactly what you staged, with a message
attached:

```
$ git commit -m "Build my command center"
```

Always write a message that says *why*, not just *what* — future-you, reading
this in six months, will thank you.

## `git push` — send it to GitHub

Your commit exists on this machine only, so far. `push` sends it up to your copy
of this repository on GitHub, where it's backed up and shareable:

```
$ git push
```

Refresh your repository's page on GitHub — your `command-center/` folder is
there, permanently, with your name on the commit.

## ✅ Final check

```
$ bash check.sh
```

You're done. Open **[the finish line](../README.md)** and read the teaser below.

---

## One last command — your reward

You've earned it. Run the finale:

```
$ ./celebrate.sh
```

(It only unlocks once your dashboard actually runs — so it's proof you made it.)

## 🎉 You built a real tool from an empty terminal — and saved it for good.

An hour ago you'd never typed a command. Now you have a working system dashboard
you wrote, made executable, ran as a background service, and committed to git.

**Next workshop:** same skills — navigate, edit, run, manage processes, commit —
but this time the thing you run is **CUDA code on a real GPU**, and your
dashboard learns a new trick: reporting on the graphics card doing the heavy
lifting. See you there.
