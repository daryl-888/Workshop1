const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
const W = 13.3, H = 7.5;

// palette (GitHub-dark terminal theme — content-informed)
const BG="0D1117", CARD="161B22", LINE="30363D", GREEN="3FB950",
      CYAN="58A6FF", WHITE="E6EDF3", MUTED="8B949E", RED="F85149", YEL="D29922";
const HEAD="Arial", BODY="Calibri", MONO="Courier New";

function bg(s){ s.background={color:BG}; }
// prompt-dot motif: a green "$" in a circle
function motif(s,x,y,r){
  s.addShape(p.ShapeType.ellipse,{x,y,w:r,h:r,fill:{color:GREEN},line:{type:"none"}});
  s.addText("$",{x,y,w:r,h:r,align:"center",valign:"middle",fontFace:MONO,bold:true,
    fontSize:14,color:BG,margin:0});
}
// terminal window card with 3 dots; lines = [{t,c}]
function term(s,x,y,w,h,lines,fs){
  fs=fs||13;
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.08,fill:{color:"010409"},
    line:{color:LINE,width:1}});
  const dc=["F85149","D29922","3FB950"];
  for(let i=0;i<3;i++)
    s.addShape(p.ShapeType.ellipse,{x:x+0.18+i*0.22,y:y+0.16,w:0.12,h:0.12,
      fill:{color:dc[i]},line:{type:"none"}});
  s.addShape(p.ShapeType.line,{x:x,y:y+0.46,w:w,h:0,line:{color:LINE,width:1}});
  const rt=lines.map((ln,i)=>({text:ln.t,options:{color:ln.c||GREEN,fontFace:MONO,
    fontSize:fs,bold:!!ln.b,breakLine:true}}));
  s.addText(rt,{x:x+0.22,y:y+0.6,w:w-0.44,h:h-0.75,align:"left",valign:"top",margin:0,
    lineSpacingMultiple:1.08});
}

// ---------- SLIDE 1: title ----------
let s=p.addSlide(); bg(s);
motif(s,0.7,0.65,0.55);
s.addText("WORKSHOP 1  ·  LINUX FUNDAMENTALS",{x:1.45,y:0.72,w:8,h:0.4,
  fontFace:MONO,fontSize:14,color:GREEN,charSpacing:2,margin:0,valign:"middle"});
s.addText("Build Your Own\nCommand Center",{x:0.7,y:1.9,w:8.2,h:2.1,fontFace:HEAD,
  fontSize:52,bold:true,color:WHITE,lineSpacingMultiple:0.98,margin:0});
s.addText("From zero to a working tool in one hour — no experience, no install.",
  {x:0.72,y:4.05,w:8,h:0.6,fontFace:BODY,fontSize:18,color:MUTED,margin:0});
s.addText([
  {text:"From Zero to GPU",options:{color:CYAN,bold:true,breakLine:false}},
  {text:"   ·   session 1 of 3   ·   Linux → CUDA basics → CUDA raytracer",
    options:{color:MUTED}}],
  {x:0.72,y:4.7,w:9,h:0.4,fontFace:BODY,fontSize:14,margin:0});
term(s,9.15,1.9,3.5,3.3,[
  {t:"$ whoami",c:GREEN},
  {t:"future sysadmin",c:WHITE},
  {t:"",c:WHITE},
  {t:"$ ./dashboard.sh",c:GREEN},
  {t:"  booting command",c:WHITE},
  {t:"  center _",c:WHITE}],14);
s.addNotes("Welcome. In one hour, everyone here goes from never touching a terminal to running a real tool they built. No home server, no installs — a Linux machine in your browser. This is session 1 of the Zero-to-GPU series.");

// ---------- SLIDE 2: what's a terminal ----------
s=p.addSlide(); bg(s);
s.addText("What's a terminal?",{x:0.7,y:0.55,w:9,h:0.7,fontFace:HEAD,fontSize:36,
  bold:true,color:WHITE,margin:0});
s.addText("You usually CLICK to tell a computer what to do. A terminal lets you TYPE instead — one command, press Enter, done.",
  {x:0.72,y:1.4,w:6.4,h:1.0,fontFace:BODY,fontSize:18,color:MUTED,margin:0});
const rows=[
  {h:"Fast & exact",d:"One line does what 20 clicks would."},
  {h:"Repeatable",d:"Save commands in a file — that's a script. You'll write one today."},
  {h:"How GPUs work",d:"The machines that run AI have no mouse. Typing is the only way in."}];
let yy=2.7;
rows.forEach(r=>{
  s.addShape(p.ShapeType.ellipse,{x:0.72,y:yy,w:0.42,h:0.42,fill:{color:GREEN},line:{type:"none"}});
  s.addText("›",{x:0.72,y:yy,w:0.42,h:0.42,align:"center",valign:"middle",fontFace:MONO,
    bold:true,fontSize:18,color:BG,margin:0});
  s.addText([{text:r.h+"   ",options:{bold:true,color:WHITE}},
             {text:r.d,options:{color:MUTED}}],
    {x:1.3,y:yy-0.05,w:5.9,h:0.55,fontFace:BODY,fontSize:15,valign:"middle",margin:0});
  yy+=0.95;
});
term(s,7.8,1.6,4.85,3.9,[
  {t:"$ whoami",c:GREEN},
  {t:"student",c:WHITE},
  {t:"",c:WHITE},
  {t:"# you just asked the computer",c:MUTED},
  {t:"# \"who am I?\" — it answered.",c:MUTED},
  {t:"",c:WHITE},
  {t:"$ _",c:GREEN}],14);
s.addText("Rule: it does EXACTLY what you type. Caps and spaces matter. A command that fails is almost always a typo — look closely, try again.",
  {x:0.72,y:6.45,w:12,h:0.6,fontFace:BODY,fontSize:13,italic:true,color:YEL,margin:0});
s.addNotes("Demystify it: typing instead of clicking. Emphasize the rule at the bottom — 90% of beginner errors are typos or being in the wrong folder. Reassure them nothing they type can break anything.");

// ---------- SLIDE 3: the mission ----------
s=p.addSlide(); bg(s);
s.addText("Your mission: a live dashboard",{x:0.7,y:0.55,w:9,h:0.7,fontFace:HEAD,
  fontSize:36,bold:true,color:WHITE,margin:0});
s.addText("You build ONE real tool, one command at a time — a system dashboard that reports your machine's uptime, disk, memory, and alerts from a log.",
  {x:0.72,y:1.4,w:6.3,h:1.3,fontFace:BODY,fontSize:18,color:MUTED,margin:0});
s.addText([
  {text:"Not ten disconnected exercises.  ",options:{color:WHITE,bold:true,breakLine:true,paraSpaceAfter:8}},
  {text:"Every command you learn is a step toward finishing it. At the end, you run one line and it lights up.",options:{color:MUTED}}],
  {x:0.72,y:2.9,w:6.3,h:1.6,fontFace:BODY,fontSize:15,margin:0});
s.addText("↓ what you'll have at the end",{x:0.72,y:5.9,w:6,h:0.4,fontFace:MONO,
  fontSize:13,color:GREEN,margin:0});
term(s,7.6,1.35,5.05,5.6,[
  {t:"==============================",c:MUTED},
  {t:"   COMMAND CENTER",c:GREEN,b:true},
  {t:"   student@workstation",c:WHITE},
  {t:"   2026-07-20 09:14:02",c:WHITE},
  {t:"==============================",c:MUTED},
  {t:"UPTIME:  up 15 minutes",c:WHITE},
  {t:"DISK:    5.6G used of 9.6G",c:WHITE},
  {t:"MEMORY:  197Mi used of 3.8G",c:WHITE},
  {t:"",c:WHITE},
  {t:"LOG ALERTS:",c:CYAN,b:true},
  {t:"  Errors found: 29",c:RED},
  {t:"  Most recent error:",c:WHITE},
  {t:"  auth failure for root",c:MUTED},
  {t:"",c:WHITE},
  {t:"You are in command.",c:GREEN}],12.5);
s.addNotes("This is the payoff preview — point at it. Reassure them: you'll build exactly this. The 'one tool, not ten drills' framing is why the workshop sticks. Keep the tool simple; the satisfaction is in seeing it run.");

// ---------- SLIDE 4: setup ----------
s=p.addSlide(); bg(s);
s.addText("Step 0 — Get your machine",{x:0.7,y:0.55,w:9,h:0.7,fontFace:HEAD,
  fontSize:36,bold:true,color:WHITE,margin:0});
s.addText("No install. No account on anyone's server. A full Linux computer opens in your browser via GitHub Codespaces. Takes ~2 minutes.",
  {x:0.72,y:1.35,w:11.8,h:0.7,fontFace:BODY,fontSize:17,color:MUTED,margin:0});
const steps=[
  {n:"1",t:"Open the repo",d:"Go to the workshop repository on GitHub."},
  {n:"2",t:"Click  < > Code",d:"The green button, top-right of the file list."},
  {n:"3",t:"Codespaces → Create",d:"Pick the Codespaces tab, then \"Create codespace\"."},
  {n:"4",t:"Terminal appears",d:"An editor opens with a terminal at the bottom. You're in."}];
let cx=0.72, cw=2.92, gap=0.16, cy=2.4, ch=3.1;
steps.forEach((st,i)=>{
  const x=cx+i*(cw+gap);
  s.addShape(p.ShapeType.roundRect,{x,y:cy,w:cw,h:ch,rectRadius:0.08,
    fill:{color:CARD},line:{color:LINE,width:1}});
  s.addShape(p.ShapeType.ellipse,{x:x+0.28,y:cy+0.3,w:0.62,h:0.62,fill:{color:GREEN},line:{type:"none"}});
  s.addText(st.n,{x:x+0.28,y:cy+0.3,w:0.62,h:0.62,align:"center",valign:"middle",
    fontFace:HEAD,bold:true,fontSize:24,color:BG,margin:0});
  s.addText(st.t,{x:x+0.28,y:cy+1.15,w:cw-0.56,h:0.6,fontFace:HEAD,bold:true,
    fontSize:17,color:WHITE,margin:0});
  s.addText(st.d,{x:x+0.28,y:cy+1.7,w:cw-0.56,h:1.2,fontFace:BODY,fontSize:14,
    color:MUTED,margin:0,valign:"top"});
});
s.addText([{text:"Terminal panel missing?  ",options:{color:WHITE,bold:true}},
  {text:"Top menu → Terminal → New Terminal.  ",options:{color:MUTED}},
  {text:"No GitHub? ",options:{color:WHITE,bold:true}},
  {text:"Use your Mac/Linux terminal or WSL — see the README.",options:{color:MUTED}}],
  {x:0.72,y:5.95,w:12,h:0.6,fontFace:BODY,fontSize:13,margin:0});
s.addNotes("Have the repo URL and this click-path on screen. Warm a Codespace yourself before class so the image is cached. Steer everyone to Codespaces so the whole room is identical; the fallback is only for anyone who truly can't use it.");

// ---------- SLIDE 5: roadmap ----------
s=p.addSlide(); bg(s);
s.addText("The build, in 6 moves",{x:0.7,y:0.55,w:9,h:0.7,fontFace:HEAD,fontSize:36,
  bold:true,color:WHITE,margin:0});
s.addText("Each step teaches new commands by using them to grow the same tool.",
  {x:0.72,y:1.35,w:11,h:0.5,fontFace:BODY,fontSize:16,color:MUTED,margin:0});
const moves=[
  {n:"1",t:"Navigate",c:"pwd  ls  cd",d:"find your way around"},
  {n:"2",t:"Scaffold",c:"mkdir  touch  cp  mv",d:"make the folders & files"},
  {n:"3",t:"Write",c:"vim",d:"type the script in"},
  {n:"4",t:"Read data",c:"|   grep   wc",d:"add log alerts"},
  {n:"5",t:"Run it",c:"chmod +x",d:"→ it runs!  (the payoff)"},
  {n:"6",t:"Manage",c:"ps  kill",d:"run it in the background"}];
const gx=0.72, gw=6.05, ggap=0.2, gy=2.05, gh=1.45, gvg=0.18;
moves.forEach((m,i)=>{
  const col=i%2, row=Math.floor(i/2);
  const x=gx+col*(gw+ggap), y=gy+row*(gh+gvg);
  s.addShape(p.ShapeType.roundRect,{x,y,w:gw,h:gh,rectRadius:0.07,fill:{color:CARD},
    line:{color:LINE,width:1}});
  s.addShape(p.ShapeType.roundRect,{x:x+0.25,y:y+0.28,w:0.9,h:0.9,rectRadius:0.06,
    fill:{color:BG},line:{color:GREEN,width:1.5}});
  s.addText(m.n,{x:x+0.25,y:y+0.28,w:0.9,h:0.9,align:"center",valign:"middle",
    fontFace:HEAD,bold:true,fontSize:30,color:GREEN,margin:0});
  s.addText(m.t,{x:x+1.35,y:y+0.24,w:gw-1.6,h:0.45,fontFace:HEAD,bold:true,
    fontSize:19,color:WHITE,margin:0,valign:"middle"});
  s.addText(m.c,{x:x+1.35,y:y+0.66,w:gw-1.6,h:0.35,fontFace:MONO,fontSize:14,
    color:GREEN,margin:0,valign:"middle"});
  s.addText(m.d,{x:x+1.35,y:y+0.99,w:gw-1.6,h:0.35,fontFace:BODY,fontSize:13,
    italic:true,color:MUTED,margin:0,valign:"middle"});
});
s.addNotes("Walk the arc: navigate, scaffold, write, feed data, run, manage. Step 3 (vim) is the time crunch — budget ~14 min. Step 5 (chmod) is the emotional peak: the Permission-denied error then the fix is the best 30 seconds of the hour.");

// ---------- SLIDE 6: vim ----------
s=p.addSlide(); bg(s);
s.addText("Vim: the only 4 things you need",{x:0.7,y:0.55,w:11,h:0.7,fontFace:HEAD,
  fontSize:36,bold:true,color:WHITE,margin:0});
s.addText("Vim is a text editor inside the terminal. It has two modes: NORMAL (keys are commands) and INSERT (keys type text). That's the whole trick.",
  {x:0.72,y:1.4,w:11.8,h:0.7,fontFace:BODY,fontSize:17,color:MUTED,margin:0});
const vim=[
  {k:"vim file",t:"Open the file"},
  {k:"i",t:"Start typing  (INSERT)"},
  {k:"Esc",t:"Stop typing  (NORMAL)"},
  {k:":wq",t:"Save and quit"}];
let vx=0.72, vw=2.92, vgap=0.16, vy=2.45, vh=2.4;
vim.forEach((v,i)=>{
  const x=vx+i*(vw+vgap);
  s.addShape(p.ShapeType.roundRect,{x,y:vy,w:vw,h:vh,rectRadius:0.08,fill:{color:"010409"},
    line:{color:LINE,width:1}});
  s.addText(String(i+1),{x:x+0.25,y:vy+0.2,w:0.6,h:0.5,fontFace:HEAD,bold:true,
    fontSize:18,color:MUTED,margin:0});
  s.addText(v.k,{x:x+0.2,y:vy+0.85,w:vw-0.4,h:0.6,align:"center",fontFace:MONO,
    bold:true,fontSize:22,color:GREEN,margin:0});
  s.addText(v.t,{x:x+0.2,y:vy+1.55,w:vw-0.4,h:0.7,align:"center",valign:"top",
    fontFace:BODY,fontSize:14,color:WHITE,margin:0});
});
s.addShape(p.ShapeType.roundRect,{x:0.72,y:5.25,w:11.9,h:1.6,rectRadius:0.08,
  fill:{color:CARD},line:{color:YEL,width:1}});
s.addShape(p.ShapeType.ellipse,{x:1.15,y:5.7,w:0.7,h:0.7,fill:{color:YEL},line:{type:"none"}});
s.addText("!",{x:1.15,y:5.7,w:0.7,h:0.7,align:"center",valign:"middle",fontFace:HEAD,bold:true,fontSize:34,color:BG,margin:0});
s.addText([
  {text:"Lost? ",options:{bold:true,color:WHITE}},
  {text:"Press Esc — you're back in NORMAL mode.    ",options:{color:MUTED}},
  {text:"Total mess? ",options:{bold:true,color:WHITE}},
  {text:"Type ",options:{color:MUTED}},
  {text:":q!",options:{fontFace:MONO,color:GREEN,bold:true}},
  {text:" then Enter to quit without saving, and reopen. Nothing lost but one edit.",options:{color:MUTED}}],
  {x:2.05,y:5.5,w:10.3,h:1.1,fontFace:BODY,fontSize:15,valign:"middle",margin:0});
s.addText("Keep the vim cheat-sheet open in a second tab.",{x:0.72,y:2.02,w:11,h:0.4,
  fontFace:BODY,fontSize:13,italic:true,color:CYAN,margin:0});
s.addNotes("This is where people get stuck famously. Teach ONLY these four. Repeat the escape hatch out loud. Make sure everyone has successfully quit vim at least once before moving on. The cheat-sheet carries everything else.");

// ---------- SLIDE 7: two things that save you ----------
s=p.addSlide(); bg(s);
s.addText("Two things that save you",{x:0.7,y:0.55,w:10,h:0.7,fontFace:HEAD,
  fontSize:36,bold:true,color:WHITE,margin:0});
// card A: check.sh
s.addShape(p.ShapeType.roundRect,{x:0.72,y:1.65,w:5.9,h:4.9,rectRadius:0.08,
  fill:{color:CARD},line:{color:LINE,width:1}});
s.addText([{text:"Check your work, anytime",options:{bold:true,color:WHITE,breakLine:true,paraSpaceAfter:6}},
  {text:"Run it after every step — it tells you, in plain English, what's done and what's next.",options:{color:MUTED}}],
  {x:1.02,y:1.95,w:5.3,h:1.1,fontFace:BODY,fontSize:15,margin:0});
term(s,1.02,3.15,5.3,3.15,[
  {t:"$ bash check.sh",c:GREEN},
  {t:"",c:WHITE},
  {t:"✓ command-center exists",c:GREEN},
  {t:"✓ dashboard.sh has content",c:GREEN},
  {t:"✗ not executable yet",c:RED},
  {t:"  ↳ run: chmod +x dashboard.sh",c:YEL},
  {t:"",c:WHITE},
  {t:"Progress: 5 / 6 steps",c:CYAN,b:true}],12.5);
// card B: errors
s.addShape(p.ShapeType.roundRect,{x:6.9,y:1.65,w:5.72,h:4.9,rectRadius:0.08,
  fill:{color:CARD},line:{color:LINE,width:1}});
s.addText([{text:"When something breaks",options:{bold:true,color:WHITE,breakLine:true,paraSpaceAfter:6}},
  {text:"Almost every error this hour is one of two things:",options:{color:MUTED}}],
  {x:7.2,y:1.95,w:5.1,h:1.0,fontFace:BODY,fontSize:15,margin:0});
const errs=[
  {h:"A typo",d:"Caps and spaces matter. Ls ≠ ls. Read the line again, slowly."},
  {h:"Wrong folder",d:"\"No such file\" usually means you're not where you think. Run pwd to orient, cd to fix."}];
let ey=3.15;
errs.forEach(e=>{
  s.addShape(p.ShapeType.ellipse,{x:7.2,y:ey,w:0.4,h:0.4,fill:{color:YEL},line:{type:"none"}});
  s.addText("!",{x:7.2,y:ey,w:0.4,h:0.4,align:"center",valign:"middle",fontFace:HEAD,
    bold:true,fontSize:18,color:BG,margin:0});
  s.addText([{text:e.h+"\n",options:{bold:true,color:WHITE}},
    {text:e.d,options:{color:MUTED}}],
    {x:7.75,y:ey-0.05,w:4.6,h:1.3,fontFace:BODY,fontSize:14,margin:0,valign:"top"});
  ey+=1.5;
});
s.addNotes("Use check.sh as your pacing radar — glance around, if most screens show 3/6 you know where the room is without interrupting. And keep repeating: nearly every error is a typo or being in the wrong folder.");

// ---------- SLIDE 8: GPU teaser / close ----------
s=p.addSlide(); bg(s);
motif(s,0.7,0.7,0.55);
s.addText("NEXT: WORKSHOP 2",{x:1.45,y:0.77,w:8,h:0.4,fontFace:MONO,fontSize:14,
  color:CYAN,charSpacing:2,margin:0,valign:"middle"});
s.addText("Same skills.\nNext time, a GPU.",{x:0.7,y:2.0,w:8.3,h:2.0,fontFace:HEAD,
  fontSize:48,bold:true,color:WHITE,lineSpacingMultiple:0.98,margin:0});
s.addText([
  {text:"Navigate, edit, run, manage processes — you'll use every one of today's moves. ",options:{color:MUTED,breakLine:true,paraSpaceAfter:8}},
  {text:"Your dashboard just learns one new trick:",options:{color:MUTED}}],
  {x:0.72,y:4.1,w:7.9,h:1.2,fontFace:BODY,fontSize:18,margin:0});
term(s,9.15,2.0,3.5,3.2,[
  {t:"$ nvidia-smi",c:GREEN},
  {t:"GPU 0: online",c:WHITE},
  {t:"  temp   61C",c:WHITE},
  {t:"  mem  2/16 GB",c:WHITE},
  {t:"  util   88%",c:CYAN},
  {t:"",c:WHITE},
  {t:"see you there _",c:GREEN}],14);
s.addText("one line — and your command center reports on the graphics card doing the heavy lifting.",
  {x:0.72,y:5.55,w:7.9,h:0.7,fontFace:BODY,fontSize:15,italic:true,color:GREEN,margin:0});
s.addNotes("Land the through-line: the tool they built today isn't thrown away — it grows into the GPU workshops. End on the teaser and let them run their dashboard one more time.");

p.writeFile({fileName:"workshop-1-intro-slides.pptx"}).then(f=>console.log("WROTE",f));
