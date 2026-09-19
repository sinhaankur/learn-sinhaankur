import type { Lesson } from "./content";

// Skills, in the order Ankur meets them, each bridged from C/C++ + HTML.
// Taught only as deep as the projects need — this is a companion to the code
// walkthroughs, not a replacement for them.

export type Skill = {
  slug: string;
  title: string;
  oneLine: string;
  fromWhatYouKnow: string; // the bridge from C/C++/HTML
  lessons: Lesson[];
};

export const SKILLS: Skill[] = [
  {
    slug: "html",
    title: "HTML — the part you know",
    oneLine: "You already have this. Let's name what it is so the rest builds on it.",
    fromWhatYouKnow:
      "HTML isn't a programming language — it has no logic, no loops. It's a way to LABEL content: 'this is a heading, this is a paragraph, this is a button.' The browser reads those labels and draws the page. Everything else you'll learn adds behaviour ON TOP of this.",
    lessons: [
      {
        id: "html-1",
        title: "Tags are just labels",
        minutes: 5,
        idea:
          "A tag like <h1>Hello</h1> wraps content and names it. An opening <h1> and a closing </h1>. That's the whole model: nested labels. No variables, no math — just structure.",
        why:
          "Every website, including this one, is ultimately these labels. React (which you'll meet) just writes them for you with logic attached. Knowing HTML means you already understand the OUTPUT of everything else.",
        code:
`<!-- the page you're reading is built from labels like these -->
<h1>Understand the code</h1>       <!-- a big heading -->
<p>I know C and C++ ...</p>        <!-- a paragraph -->
<a href="/project/rag-engine">open</a>  <!-- a link -->`,
        codeSource: "concept",
      },
    ],
  },
  {
    slug: "javascript",
    title: "JavaScript — HTML that thinks",
    oneLine: "The language that adds logic to a web page. Closest to C of the web languages.",
    fromWhatYouKnow:
      "If C is your baseline: JavaScript has variables, if/else, loops and functions just like C — but you don't declare types (`let x = 5`, not `int x = 5`), and it runs in the browser instead of compiling to a binary. It's the language that makes buttons DO things.",
    lessons: [
      {
        id: "js-1",
        title: "let, const, and no types",
        minutes: 8,
        idea:
          "`let x = 5` makes a variable you can change; `const x = 5` makes one you can't. No `int`/`float`/`char` — JavaScript figures the type out. A function is `function name(a, b) { return a + b; }` — braces are back (unlike Python).",
        why:
          "This is the smallest possible step from C: same shapes, fewer rules. Once this feels normal, Node.js (JavaScript outside the browser) and React (JavaScript that writes HTML) are just JavaScript in new places.",
        code:
`// C:  int add(int a, int b) { return a + b; }
// JS:
const add = (a, b) => a + b;   // "=>" is just a short way to write a function
let total = add(2, 3);          // total is 5; 'let' means it can change`,
        codeSource: "concept",
      },
    ],
  },
  {
    slug: "nodejs",
    title: "Node.js — JavaScript off the web page",
    oneLine: "Run JavaScript as a real program on your computer, not just in a browser.",
    fromWhatYouKnow:
      "In C you compile a program and run it from the terminal. Node lets you run JavaScript the same way — `node app.js` — so it can read files, start servers, and do the work a C program would. This website's build tools run on Node.",
    lessons: [
      {
        id: "node-1",
        title: "Running your first file",
        minutes: 8,
        idea:
          "Save a file `hello.js` with `console.log('hi')` and run `node hello.js` in the terminal. `console.log` is Node's `printf`. That's it — you've run a program you wrote.",
        why:
          "This is the moment code stops being theory. Node is also how the site's smoke test and build scripts run — so understanding 'run a .js file from the terminal' unlocks a lot of the 'how it's built' track.",
        code:
`// hello.js
console.log("hi");        // like printf("hi\\n"); in C
// then in the terminal:   node hello.js`,
        codeSource: "concept",
      },
    ],
  },
  {
    slug: "python",
    title: "Python — the AI language",
    oneLine: "Clean, brace-free, and what the rag-engine and Vera are written in.",
    fromWhatYouKnow:
      "Python is C's logic with the punctuation removed: no semicolons, no braces — indentation groups code. It's the default language for AI work, which is why your rag-engine and Vera use it. If you can read the RAG walkthrough, you already read Python.",
    lessons: [
      {
        id: "py-1",
        title: "Indentation instead of braces",
        minutes: 8,
        idea:
          "Where C writes `if (x > 0) { ... }`, Python writes `if x > 0:` and indents the block. The indent IS the block. `def name():` is a function. That's 90% of the syntax shock, handled.",
        why:
          "Every line of the rag-engine and Vera follows this rule. Master this one idea and those codebases become readable, not scary.",
        code:
`# C:   if (x > 0) { printf("pos"); }
# Python:
if x > 0:
    print("pos")     # indented = inside the if. No braces, no semicolon.`,
        codeSource: "concept",
      },
    ],
  },
  {
    slug: "ai",
    title: "AI — what it actually is",
    oneLine: "Demystifying 'AI' into the concrete thing your code calls.",
    fromWhatYouKnow:
      "Forget the hype. In your code, 'AI' is a program you send text to and get text (or numbers) back from — like calling a function that lives in another process. You already saw this: embed_one() sends text, gets numbers. That's AI, from the code's point of view.",
    lessons: [
      {
        id: "ai-1",
        title: "A model is a function you call",
        minutes: 7,
        idea:
          "A 'model' is a big file of numbers plus a program that runs it. You don't write the model — you CALL it, sending input and receiving output. Your rag-engine calls a local one over HTTP. No magic, just a request and a response.",
        why:
          "This reframing is the whole point: once AI is 'a function I call', the code stops being intimidating. The hard AI is inside the model; your code just asks it questions.",
        code:
`# rag/embed.py — 'AI' from your code's side is literally this:
out = _post(base_url() + "/api/embeddings",
            {"model": model(), "prompt": text})   # send text
return list(out.get("embedding", []))             # get numbers back`,
        codeSource: "rag/embed.py",
      },
    ],
  },
  {
    slug: "llm",
    title: "LLM — the language model",
    oneLine: "The specific kind of AI that reads and writes text (like the one answering here).",
    fromWhatYouKnow:
      "An LLM (Large Language Model) is a model trained to predict the next word, over and over, so well that it can answer questions and write code. Your Unhosted setup runs LLMs on your own hardware; your rag-engine sends them the retrieved text to turn into an answer.",
    lessons: [
      {
        id: "llm-1",
        title: "It predicts the next word — that's all",
        minutes: 8,
        idea:
          "An LLM takes your text and repeatedly guesses the most likely next word. That simple loop, at huge scale, is what looks like understanding. Knowing this explains both its power AND why it can 'hallucinate' — it's guessing, not looking things up. Which is exactly why RAG exists.",
        why:
          "This connects everything: RAG feeds the LLM real documents so its guesses are grounded. You now see why your whole rag-engine exists — to keep a next-word guesser honest.",
        code:
`# rag/ask.py — we hand the LLM the real text, then ask it to answer FROM that.
# The LLM still 'guesses the next word' — but now it's guessing from your
# documents, not from memory. That's the fix RAG provides.`,
        codeSource: "rag/ask.py",
      },
    ],
  },
  {
    slug: "rag",
    title: "RAG — the whole idea",
    oneLine: "Retrieval-Augmented Generation: ground the LLM in your documents. Your rag-engine.",
    fromWhatYouKnow:
      "You've now met every piece: documents (files), chunks (arrays of text), embeddings (numbers), retrieval (find the closest), and the LLM (the writer). RAG is just those five, in order. The project walkthrough IS this skill, applied.",
    lessons: [
      {
        id: "rag-skill-1",
        title: "Five steps you already understand",
        minutes: 6,
        idea:
          "chunk → embed → store → retrieve → generate. Each step is one small program you've now read. RAG isn't one hard thing; it's five easy things wired together. That wiring is the rag-engine.",
        why:
          "This is the payoff of the whole site: a term that sounded advanced ('RAG') is now five familiar steps you can point to in real code. That's what understanding feels like.",
        code:
`# rag/__init__.py — the five steps, as one line of real code:
store = build_index("~/notes")                 # chunk + embed + store
answer(store, "what did I decide?")            # retrieve + generate`,
        codeSource: "rag/__init__.py",
      },
    ],
  },
];
