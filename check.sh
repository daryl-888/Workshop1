#!/bin/bash
# ============================================================
#  Workshop 1 self-check — friendly progress checker
#  Run this any time from the main workshop folder:
#      bash check.sh
# ============================================================

# Always work relative to where this script lives, so it works
# no matter which folder you run it from.
ROOT="$(cd "$(dirname "$0")" && pwd)"
CC="$ROOT/command-center"

green() { printf "  \033[0;32m✓\033[0m %s\n" "$1"; }
red()   { printf "  \033[0;31m✗\033[0m %s\n" "$1"; }
hint()  { printf "      \033[0;33m↳ %s\033[0m\n" "$1"; }

done_count=0
total=6
next=""

echo
echo "=================================================="
echo "   COMMAND CENTER — build check"
echo "=================================================="
echo

# --- Step 2a: command-center folder ---
if [ -d "$CC" ]; then
  green "command-center folder exists"
  done_count=$((done_count+1))
else
  red "No 'command-center' folder yet"
  hint "Step 2: run  mkdir command-center"
  [ -z "$next" ] && next="Step 2 — File setup (docs/02-file-ops.md)"
fi

# --- Step 2b: the log data was copied in ---
if [ -f "$CC/data/system.log" ]; then
  green "data/system.log is in place"
  done_count=$((done_count+1))
else
  red "The log file isn't in command-center/data yet"
  hint "Step 2: run  mkdir data  then  cp ../starter/system.log data/"
  [ -z "$next" ] && next="Step 2 — File setup (docs/02-file-ops.md)"
fi

# --- Step 3a: dashboard.sh exists and has content ---
if [ -s "$CC/dashboard.sh" ]; then
  green "dashboard.sh exists and has content"
  done_count=$((done_count+1))
elif [ -f "$CC/dashboard.sh" ]; then
  red "dashboard.sh exists but is empty"
  hint "Step 3: open it with  vim dashboard.sh  and type the script in"
  [ -z "$next" ] && next="Step 3 — Writing the script (docs/03-vim-editing.md)"
else
  red "No dashboard.sh yet"
  hint "Step 2: run  touch dashboard.sh   (then fill it in Step 3)"
  [ -z "$next" ] && next="Step 2 — File setup (docs/02-file-ops.md)"
fi

# --- Safety net: caught editing dashboard.sh in the WRONG folder? ---
# A very common mix-up: opening vim from the main folder instead of from inside
# command-center, so the script gets written one level too high. Spot it and say so.
if [ -s "$ROOT/dashboard.sh" ] && [ ! -s "$CC/dashboard.sh" ]; then
  hint "Found a dashboard.sh in the MAIN folder — it belongs INSIDE command-center."
  hint "Move it there:  mv dashboard.sh command-center/"
fi

# --- Step 3b: it actually reads system info ---
if grep -Eq 'uptime|df |free ' "$CC/dashboard.sh" 2>/dev/null; then
  green "Dashboard reads system info (uptime/disk/memory)"
  done_count=$((done_count+1))
else
  red "Dashboard doesn't report system info yet"
  hint "Step 3: add the uptime / df / free lines from the doc"
  [ -z "$next" ] && next="Step 3 — Writing the script (docs/03-vim-editing.md)"
fi

# --- Step 4: log alerts via grep ---
if grep -q 'grep' "$CC/dashboard.sh" 2>/dev/null; then
  green "Dashboard scans the log for alerts (grep)"
  done_count=$((done_count+1))
else
  red "No log-alert section yet"
  hint "Step 4: add the grep lines that count and show errors"
  [ -z "$next" ] && next="Step 4 — Reading data (docs/04-pipes-grep.md)"
fi

# --- Step 5: executable ---
if [ -x "$CC/dashboard.sh" ]; then
  green "dashboard.sh is executable — you can run it with ./dashboard.sh"
  done_count=$((done_count+1))
else
  red "dashboard.sh isn't executable yet"
  hint "Step 5: run  chmod +x dashboard.sh"
  [ -z "$next" ] && next="Step 5 — Make it run (docs/05-permissions.md)"
fi

echo
echo "--------------------------------------------------"
echo "   Progress: $done_count / $total steps complete"
echo "--------------------------------------------------"

# Bonus: if fully built, actually run it and show a preview.
if [ "$done_count" -eq "$total" ]; then
  if ( cd "$CC" && ./dashboard.sh >/tmp/_dash_out 2>/dev/null ) && grep -q "COMMAND CENTER" /tmp/_dash_out; then
    echo
    echo "   🎉 Your command center runs! Live preview:"
    echo
    sed 's/^/      /' /tmp/_dash_out
    echo
    echo "   You did it. One thing left — claim your reward:"
    echo "      ./celebrate.sh"
  else
    echo
    echo "   Almost! Everything's in place but it hit a snag when running."
    echo "   Try:  cd command-center && ./dashboard.sh   and read the error,"
    echo "   then reopen dashboard.sh in vim and compare against Steps 3 & 4."
  fi
  rm -f /tmp/_dash_out
else
  echo
  echo "   Next up: $next"
fi
echo
