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
