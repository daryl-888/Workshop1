# What's a terminal? (2-minute read)

You normally tell a computer what to do by **clicking** things — icons, buttons,
menus. A **terminal** lets you tell it what to do by **typing** instead.

You type a **command**, press **Enter**, and the computer does it and often prints
a reply. That's the whole idea.

```
you type:   whoami
computer:   student
```

You just asked "who am I logged in as?" and it answered.

### Why bother typing instead of clicking?

- **It's faster and exact.** One line can do what would be 20 clicks.
- **It's repeatable.** You can save commands in a file and re-run them — that file
  is called a **script**, and you'll write one today.
- **It's how servers and GPUs work.** The powerful machines that run AI have no
  mouse. Typing commands is the *only* way in. That's where this series is headed.

### A few words you'll see today

- **Terminal / shell:** the typing window. (The program reading your commands is
  called a "shell" — ours is named `bash`.)
- **Command:** a word you type to make something happen, like `ls`.
- **Directory:** the technical word for a **folder**. Same thing.
- **Script:** a text file full of commands that runs top to bottom.

### The prompt

Before you type, the terminal shows a **prompt** — often ending in `$`. It's just
the computer saying "ready for your command." You type *after* the `$`.

In these docs, a line starting with `$` means "type this in." Don't type the `$`.

### One rule that saves everyone

The terminal does **exactly** what you type — spelling, spaces, and capital
letters all matter. `Ls` is not `ls`. If a command doesn't work, 90% of the time
it's a typo. Look closely and try again. Nothing you type here can break anything.

---

Ready? Open **[Step 1 — Navigation](01-navigation.md)**.
