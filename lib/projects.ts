import type { Lesson } from "./content";

// A "project" is one codebase the AI wrote, broken into lessons that read the
// REAL code line by line — pitched at: knows C/C++ concepts + HTML5, not fluent,
// moving toward JS/Node/Python. Every code block is annotated so no line is a
// mystery, and we bridge from C/C++ wherever it helps.

export type Project = {
  slug: string;
  title: string;
  repo: string; // where the real code lives
  what: string; // one honest sentence: what this project is
  stack: string[]; // the technologies it uses (each explained in Skills)
  lessons: Lesson[];
};

export const PROJECTS: Project[] = [
  {
    slug: "dave-3d",
    title: "Dave 3D — how a platformer jumps",
    repo: "games/dave-3d/engine/player.tsx",
    what:
      "A 3D remake of the old Dangerous Dave game. This walkthrough opens the one file that makes the character move and jump the way a real platformer should.",
    stack: ["javascript", "ai"],
    lessons: [
      {
        id: "dave-1-loop",
        title: "The game loop — the heartbeat of every game",
        minutes: 8,
        idea:
          "A game runs the same function ~60 times a second. Each run: read the keys, move things a tiny bit, draw the frame. `dt` ('delta time') is how many seconds passed since the last frame — you multiply movement by it so the game runs the same speed on a fast or slow computer.",
        why:
          "This is THE idea behind every game and simulation, including the space engine on the main site. In C you'd write `while(1) { ... }`. Here the browser calls the function for you each frame. Everything else in this file happens inside that heartbeat.",
        code:
`// each frame: dt = seconds since last frame (e.g. 0.016 at 60fps)
v.y += GRAVITY * dt;        // pull down a little, scaled by time
pos.y += v.y * dt;          // move by velocity, scaled by time
// multiplying by dt is why the game feels the same on any machine`,
        codeSource: "games/dave-3d/engine/player.tsx",
      },
      {
        id: "dave-2-gravity",
        title: "Gravity is one line",
        minutes: 7,
        idea:
          "Gravity isn't complicated: every frame, add a downward pull to the vertical velocity (`v.y`). Do that continuously and the character accelerates downward — falls — exactly like real life. `GRAVITY = 30` is just a number the author tuned until it FELT right.",
        why:
          "This is the moment 'physics' stops being scary. It's addition in a loop. The real skill isn't the formula — it's TUNING the number until the game feels good. That's engineering judgment, and you can see it in the comments.",
        code:
`const GRAVITY = 30       // tuned by feel, not by a textbook
const JUMP_V = 14.3      // how hard the jump launches upward

// in the loop:
v.y += GRAVITY * dt      // gravity pulls velocity down every frame`,
        codeSource: "games/dave-3d/engine/player.tsx",
      },
      {
        id: "dave-3-jump",
        title: "Why the jump feels good — coyote-time & jump-buffer",
        minutes: 12,
        idea:
          "A naive jump ('if on ground and key pressed, jump') feels stiff. Two tricks fix it: COYOTE-TIME lets you still jump for 0.1s AFTER walking off a ledge (named after the cartoon coyote who hangs in the air). JUMP-BUFFER remembers a jump press for 0.12s so pressing slightly early still works. Together they make the game forgiving — which reads as 'responsive'.",
        why:
          "This is the difference between a game that feels cheap and one that feels professional — and it's a handful of lines. It teaches a deep lesson: good software anticipates human imperfection. The author even wrote the jump-height formula (apex = JUMP_V²/(2·GRAVITY)) in a comment so levels stay jumpable.",
        code:
`const COYOTE = 0.1     // seconds after leaving ground you can still jump
const BUFFER = 0.12    // seconds a jump press is remembered

if (onGround.current) coyote.current = COYOTE          // refill on ground
else coyote.current = Math.max(0, coyote.current - dt) // else count down
// a jump fires if EITHER you're within coyote time OR you buffered a press`,
        codeSource: "games/dave-3d/engine/player.tsx",
      },
    ],
  },
  {
    slug: "helion-drift",
    title: "Helion Drift — flying a spaceship",
    repo: "celestial-games/scripts/PlayerShip.cs",
    what:
      "A space flight game. This file turns your mouse and keyboard into a ship that pitches, rolls, and accelerates — and makes fast flight actually FEEL fast.",
    stack: ["ai"],
    lessons: [
      {
        id: "helion-1-input",
        title: "Turning a mouse-move into a turn",
        minutes: 9,
        idea:
          "The mouse gives you 'how far it moved this frame' (Relative.X/Y). Multiply that by a small number to convert pixels into a gentle pitch/yaw, and `Clamp` it so a violent flick can't spin the ship insanely. Clamp(value, min, max) just keeps a number inside a range — you'd write an if/else in C; here it's one call.",
        why:
          "This is a C# file (the language of the Unity/Godot game world), but notice: it's the SAME shapes as C — types before names, semicolons, braces. Your C background reads this more easily than Python. Input handling is where 'raw hardware' becomes 'game feel'.",
        code:
`// C# — mouse movement → steering, kept sane with Clamp
_pitchInput = Mathf.Clamp(m.Relative.Y * 0.0016f, -1f, 1f);
_yawInput   = Mathf.Clamp(-m.Relative.X * 0.0016f, -1f, 1f);
// 0.0016 = sensitivity (tuned). Clamp stops a flick from over-spinning.`,
        codeSource: "celestial-games/scripts/PlayerShip.cs",
      },
      {
        id: "helion-2-throttle",
        title: "Throttle — speeding up and slowing down",
        minutes: 8,
        idea:
          "Hold thrust → add to speed each frame. Hold brake → subtract. Then Clamp so you can't stop dead or exceed max. `_speed += Acceleration * dt` is the same dt-scaled pattern as Dave's gravity — acceleration is just 'change velocity a bit each frame'. Games and physics are the same handful of ideas reused.",
        why:
          "Seeing the SAME pattern (add-per-frame, scaled by dt, clamped) across a platformer and a space game is the real lesson: once you learn one game's core, you can read them all. That transfer is what fluency feels like.",
        code:
`if (Input.IsActionPressed("thrust")) _speed += Acceleration * dt;
if (Input.IsActionPressed("brake"))  _speed -= Acceleration * dt;
_speed = Mathf.Clamp(_speed, MaxSpeed * 0.1f, MaxSpeed);  // never stop / never exceed`,
        codeSource: "celestial-games/scripts/PlayerShip.cs",
      },
      {
        id: "helion-3-feel",
        title: "Making fast feel fast — FOV and sound",
        minutes: 10,
        idea:
          "Speed alone doesn't LOOK fast. So as you accelerate, the camera's field-of-view widens (the world stretches past you) and the engine sound rises in pitch and volume. `Lerp(a, b, t)` blends smoothly from a to b as t goes 0→1 — it's how you avoid jarring snaps. Here t = your speed as a fraction of max.",
        why:
          "This is game-FEEL engineering — the invisible craft that makes something fun. None of it changes where the ship IS; it changes how the speed READS to a human. Learning to separate 'the state' from 'how it feels' is a senior-level insight, shown in a few lines.",
        code:
`float t = _speed / MaxSpeed;                       // 0..1 how fast
_engine.PitchScale = Mathf.Lerp(0.8f, 1.25f, t);   // engine whines higher when fast
// camera FOV eases wider with speed:
_activeCam.Fov = Mathf.Lerp(_activeCam.Fov, targetFov, dt * 4f);  // smooth, never snaps`,
        codeSource: "celestial-games/scripts/PlayerShip.cs",
      },
    ],
  },
  {
    slug: "this-website",
    title: "This website — the whole tech stack",
    repo: "~/Documents/Portfolio",
    what:
      "What every piece of technology behind sinhaankur.com actually is, and why it's there — so a repo full of unfamiliar names stops being intimidating.",
    stack: ["html", "javascript", "nodejs"],
    lessons: [
      {
        id: "stack-1-what",
        title: "What 'a tech stack' even means",
        minutes: 8,
        idea:
          "A 'stack' is just the LIST of tools a project is built from, layered like a cake: a language at the bottom, a framework on top, libraries for special jobs, and a host to serve it. Nobody writes everything from scratch — you assemble proven pieces. Reading a project starts with knowing which piece does what.",
        why:
          "When you open a big repo and see 20 unfamiliar names in package.json, it feels impossible. But each name is just one job. Once you can say 'this one draws 3D, this one animates, this one hosts it', the fear goes. That's this whole lesson.",
        code:
`// package.json lists the stack. Read it as "jobs", not magic:
"next"              // the framework — turns your code into a website
"react"             // builds the interface from reusable pieces
"three"             // draws 3D graphics (the galaxy, planets)
"@react-three/fiber"// lets React and Three work together
"tailwindcss"       // styling with short class names
"@mlc-ai/web-llm"   // runs a small AI model IN the browser`,
        codeSource: "package.json",
      },
      {
        id: "stack-2-react",
        title: "React — HTML you can reuse",
        minutes: 10,
        idea:
          "You know HTML tags. React lets you make YOUR OWN tags, called components — write <Navbar/> once, use it on every page. A component is a JavaScript function that returns HTML-looking code (called JSX). That's the leap: HTML that has logic and repeats itself.",
        why:
          "Every page on the site is components stacked together. Understanding 'a component is a function that returns HTML' unlocks the entire codebase — it's 90% of what you'll see. It builds directly on the HTML you already know.",
        code:
`// a React component — your own reusable tag
function Navbar() {
  return (
    <nav>              {/* this is JSX: HTML written inside JavaScript */}
      <a href="/">Home</a>
    </nav>
  );
}
// use it anywhere, like a built-in tag:  <Navbar />`,
        codeSource: "concept — components/navbar.tsx",
      },
      {
        id: "stack-3-static",
        title: "How the site gets online — static export + Cloudflare",
        minutes: 9,
        idea:
          "The site is 'statically exported': Next.js runs once and produces plain HTML/CSS/JS files (a folder called `out/`). Those files are uploaded to Cloudflare Pages, which serves them worldwide. No server running your code live — just files, which is why it's fast, cheap, and hard to break.",
        why:
          "This explains something you saw firsthand: when a deploy 'freezes', it's the upload step, not your code. Knowing the pipeline — code → build → out/ folder → Cloudflare — means you can reason about what went wrong instead of guessing. This same pattern deploys the learn site you're reading.",
        code:
`// next.config.mjs — one line makes it all static files
output: "export"    // build → a plain 'out/' folder of HTML/JS

// then: git push → Cloudflare Pages builds 'out/' → live on the domain
// nothing runs your code on a server; visitors just download files`,
        codeSource: "next.config.mjs",
      },
    ],
  },
  {
    slug: "rag-engine",
    title: "The RAG engine",
    repo: "~/Documents/rag-engine",
    what:
      "A program that reads a folder of your documents and answers questions about them, quoting where each answer came from — all running on your own computer.",
    stack: ["python", "ai", "llm", "rag"],
    lessons: [
      {
        id: "rag-1-what",
        title: "What this program is, before any code",
        minutes: 6,
        idea:
          "Think of it like Ctrl-F on steroids. Plain search finds the exact word you typed. This finds the passages that MEAN what you asked, hands them to an AI, and the AI writes an answer using only those passages — then tells you which file it used. In C terms: it's a pipeline, functions feeding the next, ending in a printed answer.",
        why:
          "Before reading a single line, you should be able to say what a program DOES in one sentence. If you can't, the code will feel like noise. So: input = a folder of text + a question; output = an answer with its sources. Everything in the repo exists to get from that input to that output.",
      },
      {
        id: "rag-2-python-file",
        title: "Reading your first Python — what a file even looks like",
        minutes: 10,
        idea:
          "Python has no `#include`, no `int main()`, no semicolons, and no `{ }`. A file just runs top to bottom, and INDENTATION (the spaces) is what groups code — where C uses braces, Python uses the indent itself. A `def` is a function (like a C function but no type before the name). A line starting with `#` is a comment.",
        why:
          "You know C/C++, so the shock isn't the logic — it's the punctuation being gone. Once you see that indentation replaces braces and `def name(args):` replaces `type name(args) { }`, Python stops looking alien. Read the block below and map each line to its C cousin.",
        code:
`# rag/embed.py  — a real function from the engine

def base_url() -> str:              # C: "const char* base_url()" — returns text
    return os.environ.get(          # read a setting from the environment...
        "RAG_EMBED_BASE",           # ...named this,
        DEFAULT_BASE,               # ...or fall back to this if it's not set
    ).rstrip("/")                   # trim a trailing "/" so URLs don't double up
#   ^ the 4-space indent is what says "this line is inside base_url"`,
        codeSource: "rag/embed.py",
      },
      {
        id: "rag-3-chunk",
        title: "Step 1 of the engine — cutting documents into pieces",
        minutes: 12,
        idea:
          "You can't hand a whole 40-page file to the AI — too big. So the code splits text into small overlapping pieces called 'chunks'. A `list` in Python is like a C array that grows by itself (`chunks.append(x)` = push to the end). A `for` loop reads almost like English.",
        why:
          "This is where quality starts: pieces too big are noisy, too small lose context. The 'overlap' (carrying the tail of one chunk into the next) is a real engineering decision — it stops a fact from being cut in half at a boundary. That kind of small, deliberate choice is what you're learning to SEE in code.",
        code:
`# rag/ingest.py — chunk_text(), simplified to the core idea
chunks = []                              # an empty growable array
for p in paragraphs:                     # for each paragraph (C: for(;;))
    if len(buf) + len(p) > max_chars:    # if adding this would overflow the piece
        chunks.append(buf)               # save the piece we have
        buf = buf[-overlap:] + p         # start next piece WITH a bit of the old
    else:
        buf = buf + "\\n\\n" + p          # otherwise keep filling the piece
#  len(x) = length, like strlen(). buf[-overlap:] = "the last N characters".`,
        codeSource: "rag/ingest.py",
      },
      {
        id: "rag-4-embed",
        title: "Step 2 — turning words into numbers (embeddings)",
        minutes: 12,
        idea:
          "To search by MEANING, each chunk is turned into a list of numbers (a 'vector') by a local AI model — texts about similar things get similar numbers. The code just sends the text to a model running on your machine and gets the numbers back. No math for you to do; you're calling a service, like calling a library function in C.",
        why:
          "The honest, important part: the code checks whether that model is even available, and if not, it doesn't crash or fake it — it switches to plain keyword search. Learning to spot 'what does this do when things go wrong?' is half of reading real code. Notice the tiny `available()` function: it's the whole safety net.",
        code:
`# rag/embed.py — the safety switch the whole engine leans on
def available() -> bool:                 # returns True/False (a C bool)
    try:                                 # "attempt this; if it throws, don't die"
        return len(embed_one("probe")) > 0   # got numbers back? then yes
    except Exception:                    # any failure (model off, network) ...
        return False                     # ... just means "no embeddings"
# try/except is Python's error handling — like checking a return code in C,
# but the error jumps here automatically instead of you testing every call.`,
        codeSource: "rag/embed.py",
      },
      {
        id: "rag-5-retrieve",
        title: "Step 3 — finding the closest pieces",
        minutes: 10,
        idea:
          "Given your question's numbers, find the chunks whose numbers point the same way. That 'same way' is one line of math (a dot product) done over the whole set at once using a library called numpy — think of numpy as 'do this to a whole array in one shot' instead of a C for-loop over each element.",
        why:
          "You don't need the linear algebra to follow the code — you need to see the SHAPE: one question, compared to everything, sorted, top few kept. The `@` symbol is numpy's 'multiply these arrays'. This is the moment plain search becomes meaning-search.",
        code:
`# rag/store.py — score every chunk against the question at once
sims = self._mat @ query_vec     # @ = compare question to ALL chunks in one op
order = np.argsort(-sims)[:k]    # sort by best, keep the top k
# In C you'd loop chunk-by-chunk. numpy does the loop for you, faster.`,
        codeSource: "rag/store.py",
      },
      {
        id: "rag-6-answer",
        title: "Step 4 — asking the AI, honestly",
        minutes: 10,
        idea:
          "The top pieces get pasted into a message to the local AI with one instruction: 'answer using ONLY this, and cite it.' That instruction (the 'system prompt') is the leash — it's what stops the AI from making things up. If no AI is reachable, the code just shows you the most relevant passage instead. Still useful, never a lie.",
        why:
          "This ties it together: a program is honest when it can always show its work and never invents a source. You now have the full pipeline in your head — chunk, embed, retrieve, answer — and you've read the real lines that do each. That's what 'understanding the code the AI wrote' means.",
        code:
`# rag/ask.py — the instruction that keeps the answer truthful
_SYSTEM = ("You answer strictly from the provided context. If the answer is not "
           "in the context, say you don't know from these documents. Be concise "
           "and cite the sources you used by their [n] markers.")
# This string is just text — but it's the most important text in the program.`,
        codeSource: "rag/ask.py",
      },
    ],
  },
];
