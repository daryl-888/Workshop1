# Step 1 — Navigation: know where you are

**Goal:** get comfortable moving around, and find the workshop files.
**New commands:** `pwd`, `ls`, `cd`

Think of the terminal like a file explorer, except you can only be "inside" one
folder at a time. These three commands are how you look around and move.

## `pwd` — "where am I?"

`pwd` = **print working directory**. It tells you which folder you're currently in.

```
$ pwd
```

You'll see a path like `/workspaces/workshop-1`. That's your current location.

## `ls` — "what's here?"

`ls` = **list**. It shows the files and folders in your current location.

```
$ ls
```

You should see the workshop files, including a `docs` folder and `README.md`.

Try a more detailed view:

```
$ ls -l
```

The `-l` is an **option** (a setting that changes how a command behaves). It shows
one item per line with extra info. You'll meet options a lot.

## `cd` — "go into a folder"

`cd` = **change directory**. Move into a folder by naming it.

```
$ cd docs
$ pwd
```

Notice `pwd` now ends in `/docs` — you moved. List what's in here:

```
$ ls
```

To go **back up** one level to where you started:

```
$ cd ..
```

`..` always means "the folder above this one." In this workshop, `cd` with nothing
brings you back to your **workshop base** (not your computer's home folder) — handy
if you ever feel lost. Two more lifesavers you can type from *anywhere*:

- `base` — jump back to the workshop's main folder
- `cc` — jump straight to your command center (once you've made it in Step 2)

And don't worry about getting lost: you can't accidentally `cd` your way *out* of
the workshop — if you try, it gently keeps you inside.

## Your mission for this step

Make sure you're back in the **main** workshop folder (the one with `README.md`):

```
$ cd
$ cd workshop-1     # or whatever the folder is named; use ls + cd to find it
$ ls
```

You should see `README.md` and `check.sh`. That's home base — every later step
starts from here.

## ✅ Check yourself

```
$ bash check.sh
```

Then open **[Step 2 — File setup](02-file-ops.md)**.
