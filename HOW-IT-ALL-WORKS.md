# How it all works — your system, explained

> A plain-English map of how the things you've built are made, how they connect,
> and what actually runs. No jargon left undefined. For you (and your son) to
> understand the code, not just use it.

---

## 1. The two kinds of thing you build

Everything you make is one of two shapes. Knowing which it is tells you how it's
built, hosted, and run.

**A) A SITE (static).** HTML + CSS + JavaScript that runs *in the visitor's browser*.
No server thinking for each visitor — the files just sit there and the browser does
the work. Examples: **sinhaankur.com** (the portfolio + Universe Engine), epics-timeline,
crossfit, learn-sinhaankur.
- Built by: **Next.js** (for the big ones) or plain HTML (for simple ones).
- Hosted free on: **GitHub Pages** or **Cloudflare Pages**.

**B) An ENGINE/APP (runs code).** A program that *does work* — thinks, computes,
remembers. Examples: **Vera** (the companion), **helmsman** (your builder-twin),
**rag-engine**, **Structura** (a phone app).
- Built in: **Python** (the AI engines) or **Dart/Flutter** (the phone app) or **Rust**.
- Run: on your machine / phone (on-device), or shipped as a **Docker image** on ghcr.io.

> The #1 mental unlock: a SITE needs no server; an ENGINE does. That single fact
> decides the whole toolchain each time.

---

## 2. How a SITE is built (e.g. the Universe Engine)

```
you write code  →  Next.js builds it  →  static files (HTML/JS)  →  GitHub Pages serves them  →  browser runs them
   (components/)     (pnpm build)          (the out/ folder)          (free hosting)              (the visitor's)
```

- **Next.js / React** — you write the page as *components* (reusable Lego blocks of
  UI). React keeps the screen in sync with the data.
- **`output: "export"`** — the key setting: it turns the whole app into plain static
  files, so no server is needed. That's why it's free to host.
- **Three.js / React-Three-Fiber** — draws 3D in the browser using the graphics card
  (WebGL). The Universe Engine's planets/stars are all this, written as **shaders**
  (tiny programs that run per-pixel on the GPU).
- **satellite.js** — real orbit math (SGP4) so satellites are where they truly are.
- **web-llm** — a tiny AI model that runs *inside the browser*, no server. (This is the
  ✦ copilot.)
- **Tailwind** — styling by writing class names instead of separate CSS files.

**It connects to the world** through *keyless public APIs* — it just fetches data:
NASA (space images), NOAA (space weather), NCBI/Ensembl (genome data). No login, no
secret keys, so it stays static + free.

---

## 3. How an ENGINE is built (e.g. Vera, helmsman)

An engine is layered, like a mind. The pattern you use everywhere:

```
input  →  deterministic core (plain code, always works)  →  LLM (optional, just phrases)  →  output
```

- **Deterministic core** = normal code with fixed rules. It does the *reliable* work
  (math, safety checks, retrieval). It never "makes things up."
- **LLM (the language model)** = the part that writes words naturally. It's the *last,
  smallest* step — the mouth, not the brain. If it's missing, the engine still works.
- **RAG** (Retrieval-Augmented Generation) = before answering, the engine *looks up*
  relevant real text (your notes, your code) and reads from it — so it's grounded in
  truth, not guessing. **This is how a small model knows a lot: the knowing is in the
  lookup, not the model.**
- **The neural engine** (Vera, helmsman) = the core is shaped like brain regions:
  *feel → recall → decide → speak*. The LLM is only the "speak" step.

**How the LLM actually runs on-device:** the model is a file (a **GGUF** — compressed
weights). A program called **llama.cpp** loads that file and runs it on your Mac's
chip (Metal). No internet, no cloud, no Claude.

---

## 4. How things CONNECT (the whole picture)

```
          ┌─────────────── YOUR MACHINE (on-device, private) ───────────────┐
          │                                                                   │
  you ──► helmsman / Vera  ──uses──►  helmsman-4b.gguf  (via llama.cpp)       │
          │     │                                                             │
          │     └──RAG──►  your 40 repos (indexed)  ◄── knows your real code  │
          │                                                                   │
          └───────────────────────────────────────────────────────────────┘
                                   │
            ships as a free Docker image
                                   ▼
                      ghcr.io/sinhaankur/...   (anyone can pull + run)
                                   │  pulls weights from
                                   ▼
                        Hugging Face (free model hosting)

          ┌─────────────── THE WEB (static sites) ───────────────┐
  visitor ──► sinhaankur.com  (GitHub Pages, free)                │
          │        │ heavy textures from Cloudflare R2 (free)     │
          │        │ live data from NASA / NOAA / NCBI (keyless)  │
          └──────────────────────────────────────────────────────┘
```

**The hosts, and why each exists (all free):**
| Host | Holds | Why |
|---|---|---|
| **GitHub Pages** | the static sites | serves files, no server |
| **GitHub Actions** | the build+deploy robot | runs `build` on every push |
| **Cloudflare R2** | big textures (16K maps) | free downloads |
| **ghcr.io** | engine Docker images | run-anywhere app bundles |
| **Hugging Face** | model weights (GGUF) | made for big model files |

---

## 5. What actually RUNS, and when

- **A site**: runs **only in the visitor's browser**, on demand. Nothing of yours is
  "running" on a server between visits — the files just wait.
- **The build robot (GitHub Actions)**: runs **for ~1 minute when you `git push`** —
  it rebuilds the site and publishes it, then stops.
- **An engine (Vera/helmsman)**: runs **when you ask it**, on your machine, then stops.
  It's not a background daemon unless you start one.
- **The LLM**: loaded into memory by llama.cpp **only while answering**, then freed.

> Nothing runs secretly or forever. Things run when triggered (a visit, a push, a
> question) and stop. That's the whole system — on-device, free, honest, yours.

---

## 6. The one loop you repeat to build anything

```
1. write the code            (components/ for a site, a .py/.dart module for an engine)
2. run it locally            (pnpm dev / python -m ... )  — see it work
3. lint → build → test       (catch mistakes before anyone sees them)
4. git commit                (save a labelled snapshot)
5. git push                  (the build robot deploys it)   ← only when green
6. verify it's live          (open the URL / run the command)
```

This is *your* loop — it's also exactly how helmsman is being taught to build, so it
works the way you do.
