# Vim Cheat-Sheet — keep this open in another tab

You only need the **four essentials** for the workshop. Everything below them is
optional bonus. Don't memorize — just glance here when you need it.

## Remember: vim has two modes

- **NORMAL mode** = keys are commands (move around, save, quit). You start here.
- **INSERT mode** = keys type text, like a normal editor.
- Press **`Esc`** any time to get back to NORMAL mode. When in doubt, press `Esc`.

---

## ⭐ The four essentials

| Do this | Press |
|---|---|
| Open a file | `vim filename` (from the terminal) |
| Start typing (enter INSERT mode) | `i` |
| Stop typing (back to NORMAL mode) | `Esc` |
| Save and quit | `:wq` then `Enter` |

That's genuinely all you need to finish today.

---

## 🆘 "Help, I'm stuck!"

| Situation | Do this |
|---|---|
| I'm typing but it's doing weird things | Press `Esc` (you were in NORMAL mode) |
| I want to quit WITHOUT saving | `Esc`, then `:q!` then `Enter` |
| I saved but want to keep editing | `:w` then `Enter` (write, stay open) |
| I have no idea what state I'm in | Press `Esc`. You're now in NORMAL mode. |

`:q!` is your undo-the-whole-mess button — quit without saving and just reopen.

---

## Handy extras (nice, not required)

Use these in **NORMAL mode** (press `Esc` first):

| Action | Press |
|---|---|
| Jump to the last line of the file | `G` (capital) |
| Jump to the first line | `gg` |
| Open a new line **below** and start typing | `o` |
| Open a new line **above** and start typing | `O` (capital) |
| Undo last change | `u` |
| Redo | `Ctrl` + `r` |
| Delete the current whole line | `dd` |
| Move around | arrow keys work fine |

## The mental model

```
        press  i / o / O
NORMAL  ───────────────────▶  INSERT   (now you can type)
  ▲                             │
  └──────────  press Esc  ◀──────┘

From NORMAL, ":" starts a command:  :w  save   :q  quit   :wq  save+quit   :q!  quit no-save
```
