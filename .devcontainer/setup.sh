#!/usr/bin/env bash
# Runs once when the Codespace is created.
#  1. installs the tools the workshop needs
#  2. loads the workspace guard rails (workshop-shell.sh) into every terminal
set -e

sudo apt-get update -y      >/dev/null 2>&1 || true
sudo apt-get install -y procps vim >/dev/null 2>&1 || true

WS="${1:-$PWD}"                       # the workshop folder (passed by devcontainer.json)
LINE="source \"$WS/workshop-shell.sh\""

# Add the guard rails to ~/.bashrc once, so they load in every new terminal.
if ! grep -qF "workshop-shell.sh" "$HOME/.bashrc" 2>/dev/null; then
  printf '\n# Workshop guard rails (keeps you inside the workshop folder)\n%s\n' "$LINE" >> "$HOME/.bashrc"
fi

echo "Setup complete — open a NEW terminal so the guard rails load, then:  cat README.md"
