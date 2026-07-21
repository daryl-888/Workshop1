#!/bin/bash
# ============================================================
#  celebrate.sh — THE FINALE
#  Run this once your dashboard works. You've earned it.
#      ./celebrate.sh        (or:  bash celebrate.sh)
#  Tip: NO_ANIM=1 ./celebrate.sh  skips the animations.
# ============================================================

ROOT="$(cd "$(dirname "$0")" && pwd)"
DASH="$ROOT/command-center/dashboard.sh"
LOG="$ROOT/command-center/data/system.log"

R='\033[0;31m'; G='\033[0;32m'; Y='\033[0;33m'; B='\033[0;34m'
M='\033[0;35m'; C='\033[0;36m'; W='\033[1;37m'; DIM='\033[2m'; N='\033[0m'; BOLD='\033[1m'

ANIM=0
if [ -t 1 ] && [ -z "$NO_ANIM" ]; then ANIM=1; fi

type_out() { # typewriter print: type_out "text" color
  local t="$1" col="$2" i
  if [ "$ANIM" -eq 1 ]; then
    for (( i=0; i<${#t}; i++ )); do printf "${col}%s${N}" "${t:$i:1}"; sleep 0.012; done
    printf "\n"
  else
    printf "${col}%s${N}\n" "$t"
  fi
}

rocket_body() {
cat <<'ART'
     /\
    /  \
   | GPU |
   |    |
  /|    |\
 /_|____|_\
ART
}
rocket_fire() {
cat <<'ART'
     /\
    (  )
    |~~|
   ( ^^ )
ART
}

# ---- Gate: this is a reward, so it only fires once the tool works ----
if [ ! -x "$DASH" ]; then
  printf "\n${Y}Whoa there, operator.${N}\n"
  printf "This is the finale — it unlocks once your command center runs.\n"
  printf "Finish the 6 steps (run ${W}bash check.sh${N} to see what's left), then come back. ${DIM}You're close.${N}\n\n"
  exit 0
fi

clear 2>/dev/null

# ---- Confetti ----
if [ "$ANIM" -eq 1 ]; then
  cols=$(tput cols 2>/dev/null || echo 60); [ "$cols" -gt 100 ] && cols=100
  cchars=(\* + . o x '^' '~' '+')
  cset=("$R" "$G" "$Y" "$B" "$M" "$C" "$W")
  for frame in $(seq 1 16); do
    line=""
    for (( c=0; c<cols; c++ )); do
      if (( RANDOM % 7 == 0 )); then
        ch=${cchars[RANDOM % ${#cchars[@]}]}
        col=${cset[RANDOM % ${#cset[@]}]}
        line+="${col}${ch}${N}"
      else line+=" "; fi
    done
    printf "%b\n" "$line"; sleep 0.04
  done
  clear 2>/dev/null
fi

# ---- Banner ----
printf "\n${G}${BOLD}"
cat <<'ART'
   __  __ _         _              ___                       _      _        
  |  \/  (_)___ ___(_)___ _ _     / __|___ _ __  _ __ _ ___ | |___ | |_ ___  
  | |\/| | (_-<(_-<| / _ \ ' \   | (__/ _ \ '  \| '_ \ / -_)| / -_)|  _/ -_) 
  |_|  |_|_/__//__/|_\___/_||_|   \___\___/_|_|_| .__/_\___||_\___| \__\___| 
                                                |_|                          
ART
printf "${N}\n"

type_out "  An hour ago, you'd never opened a terminal." "$W"
type_out "  Now you've built, run, and managed a real tool. Respect." "$DIM"
printf "\n"

# ---- Certificate ----
LINES=$(wc -l < "$DASH" 2>/dev/null | tr -d ' ')
ERRS=$(grep -ci "error" "$LOG" 2>/dev/null || echo "?")
printf "${C}  +--------------------------------------------------------+${N}\n"
printf "${C}  |${N}   ${BOLD}CERTIFIED COMMAND-LINE OPERATOR${N}                      ${C}|${N}\n"
printf "${C}  |${N}                                                        ${C}|${N}\n"
printf "${C}  |${N}   Operator : ${G}%-40s${N}${C}|${N}\n" "$(whoami)@$(hostname)"
printf "${C}  |${N}   Dated    : ${G}%-40s${N}${C}|${N}\n" "$(date '+%Y-%m-%d %H:%M')"
printf "${C}  |${N}   Tool     : ${G}%-40s${N}${C}|${N}\n" "dashboard.sh ($LINES lines of your own code)"
printf "${C}  |${N}   Alerts   : ${G}%-40s${N}${C}|${N}\n" "$ERRS errors triaged from the logs"
printf "${C}  +--------------------------------------------------------+${N}\n\n"

# ---- Skills unlocked (callback to every step) ----
printf "  ${BOLD}Skills unlocked:${N}\n"
skills=(
  "Navigate  ->  pwd  ls  cd"
  "Scaffold  ->  mkdir  touch  cp  mv"
  "Edit      ->  vim  (and you escaped it!)"
  "Filter    ->  grep  |  wc"
  "Empower   ->  chmod +x"
  "Command   ->  ps  kill"
)
for s in "${skills[@]}"; do
  printf "   ${G}[x]${N} %s\n" "$s"
  [ "$ANIM" -eq 1 ] && sleep 0.09
done
printf "\n"

# ---- Rocket launch (Zero -> GPU) ----
if [ "$ANIM" -eq 1 ]; then
  for h in 5 4 3 2 1 0; do
    clear 2>/dev/null
    for (( b=0; b<h; b++ )); do printf "\n"; done
    printf "${W}"; rocket_body; printf "${N}"
    printf "${Y}"; rocket_fire; printf "${N}"
    sleep 0.11
  done
  clear 2>/dev/null
  printf "${W}"; rocket_body; printf "${N}\n"
fi

# ---- Teaser ----
printf "\n"
type_out "  >> NEXT: Workshop 2 -- same skills, now on a GPU." "$M"
type_out "     Your dashboard learns one new line:  nvidia-smi" "$C"
printf "\n"
printf "  ${DIM}One more time, for the road:${N}  ${W}cd command-center && ./dashboard.sh${N}\n\n"
printf "  ${G}${BOLD}You are in command.${N}\n\n"
