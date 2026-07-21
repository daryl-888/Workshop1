# Step 2 — File setup: scaffold your command center

**Goal:** create the folders and files your tool will live in.
**New commands:** `mkdir`, `touch`, `cp`, `mv`

Every real project has a tidy home. A sysadmin setting up a new tool makes a
folder for it, creates the empty files, and drops in the data it needs. That's
exactly what you'll do — this becomes the skeleton of your dashboard.

> Start from the main workshop folder (run `pwd` — it should end in the workshop
> folder name, and `ls` should show `README.md`).

## `mkdir` — make a folder

`mkdir` = **make directory**. Create the home for your tool:

```
$ mkdir command-center
$ ls
```

You'll see `command-center` appear. Move into it:

```
$ cd command-center
```

Everything from here lives inside your command center. Make a folder for its data:

```
$ mkdir data
```

## `touch` — create an empty file

`touch` creates a new, empty file. Create the script file you'll fill in later:

```
$ touch dashboard.sh
$ ls
```

You now have an empty `dashboard.sh` and a `data` folder.

## `cp` — copy a file

`cp` = **copy**. The workshop ships some fake system logs in the `starter` folder.
Copy that log into your tool's `data` folder so your dashboard can read it:

```
$ cp ../starter/system.log data/
```

Reading that command: `..` means the folder above (the main workshop folder),
`starter/system.log` is the file there, and `data/` is where it should land.
Confirm it arrived:

```
$ ls data
```

You should see `system.log`.

## `mv` — move or rename

`mv` = **move**. It relocates a file — and if the "destination" is just a new
name in the same folder, it **renames** it. Copying leaves the original; moving
does not.

You don't need to rename anything for the tool, but try it safely:

```
$ touch scratch.txt
$ mv scratch.txt notes.txt   # renamed
$ ls
$ rm notes.txt               # rm = remove/delete. Clean up the practice file.
```

## Where you are now

Your command center looks like this:

```
command-center/
├── dashboard.sh      (empty for now — Step 3 fills it)
└── data/
    └── system.log    (the data your tool will read)
```

## ✅ Check yourself

```
$ cd ..            # back to the main folder where check.sh lives
$ bash check.sh
```

Then open **[Step 3 — Writing the script](03-vim-editing.md)**.
