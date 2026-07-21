#!/usr/bin/env bash
# ============================================================
#  workshop-shell.sh — gentle guard rails so nobody gets lost.
#
#  Keeps 'cd' from wandering above the workshop folder, makes a
#  bare 'cd' return to your workshop base (not your home folder),
#  and adds two "snap back" shortcuts that work from anywhere:
#      cc    -> jump to your command center
#      base  -> jump to the workshop's main folder
#
#  In Codespaces this loads automatically (the .devcontainer sets
#  it up). To use it locally:   source workshop-shell.sh
# ============================================================

# The workshop lives in THIS file's own folder (the repo root).
WORKSHOP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export WORKSHOP_ROOT

# 'cd' that can't escape the workshop. Bare 'cd' goes to base, not home.
cd() {
  local target="${1:-$WORKSHOP_ROOT}"
  builtin cd "$target" 2>/dev/null || { echo "No such folder: $target"; return 1; }
  case "$PWD/" in
    "$WORKSHOP_ROOT"/*) : ;;                       # still inside — all good
    *) builtin cd "$WORKSHOP_ROOT"
       echo "↩  Kept you inside the workshop. Type 'cc' for your command center." ;;
  esac
}

# Shortcuts that work no matter where you are:
cc()   { builtin cd "$WORKSHOP_ROOT/command-center" 2>/dev/null \
           || echo "No command-center yet — you'll make it in Step 2 (type 'base' first)."; }
base() { builtin cd "$WORKSHOP_ROOT"; }

# Land in the workshop when a new terminal opens.
builtin cd "$WORKSHOP_ROOT" 2>/dev/null
