# Step 5 — Make it run: permissions

**Goal:** turn your text file into a program you can run. The payoff moment.
**New command:** `chmod`

You've written a full script. But try running it directly and Linux stops you:

```
$ cd command-center
$ ./dashboard.sh
```

You'll likely get `Permission denied`. That's not a bug. For safety, Linux does
**not** let a file run as a program unless it's explicitly marked **executable**.
Right now `dashboard.sh` is "just a text file" as far as the system knows.

## Seeing permissions

```
$ ls -l dashboard.sh
```

You'll see something like `-rw-r--r--`. Those letters are permissions: `r` = read,
`w` = write, `x` = **execute** (run). Notice there's no `x`. That's the problem.

## `chmod` — change the mode (permissions)

`chmod +x` adds the execute permission:

```
$ chmod +x dashboard.sh
$ ls -l dashboard.sh
```

Now you'll see an `x` appear (like `-rwxr-xr-x`). The file is now runnable.

## Run your command center 🎉

```
$ ./dashboard.sh
```

The `./` means "the file right here in this folder." Your dashboard springs to
life — your name, uptime, disk, memory, and log alerts, all live.

**You built a working tool.** Run it again — the time and stats update every time,
because it re-reads the live system on each run.

> Tiny hiccup? If a line looks wrong, reopen with `vim dashboard.sh`, compare
> carefully against Steps 3 and 4 (usually a stray quote or capital letter), fix,
> `:wq`, and run again.

## ✅ Check yourself

```
$ cd ..
$ bash check.sh
```

Then open **[Step 6 — Run it in the background](06-processes.md)**.
