import { Nav, Footer } from "@/components/chrome";

export const metadata = {
  title: "How it all works — the system, mapped",
  description:
    "A plain-English map of how everything is built, how it connects, and what runs — the story and the workflows.",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
      {children}
    </p>
  );
}

function Diagram({ children }: { children: string }) {
  return (
    <pre className="rounded-xl border border-border bg-card p-5 overflow-x-auto text-[12px] leading-relaxed font-mono text-foreground/80 whitespace-pre">
      {children}
    </pre>
  );
}

export default function SystemPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Hero */}
        <header className="pt-20 md:pt-28 pb-14">
          <Eyebrow>The whole system, mapped</Eyebrow>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] italic mb-6">
            How it all works.
          </h1>
          <p className="max-w-2xl text-foreground/75 leading-relaxed text-lg">
            Not how to <em>use</em> my projects — how they&apos;re <strong>built</strong>,
            how they <strong>connect</strong>, and what actually <strong>runs</strong>.
            This is the map I read to learn from, and keep improving.
          </p>
        </header>

        {/* 1 — two shapes */}
        <section className="py-8 border-t border-border">
          <Eyebrow>01 — The one idea that decides everything</Eyebrow>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">Two shapes of thing</h2>
          <p className="max-w-2xl text-foreground/75 leading-relaxed mb-6">
            Everything I make is one of two shapes. Knowing which it is tells me how
            it&apos;s built, hosted, and run — every time.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-medium text-lg mb-2">A — A site (static)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                HTML, CSS and JavaScript that runs <em>in the visitor&apos;s browser</em>.
                No server thinking per visit — the files just sit there and the browser
                does the work.
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                e.g. <strong>sinhaankur.com</strong>, epics-timeline, crossfit, this site.
                <br />
                <span className="text-muted-foreground">Built with Next.js · hosted free on GitHub / Cloudflare Pages.</span>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-medium text-lg mb-2">B — An engine (runs code)</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A program that <em>does work</em> — thinks, computes, remembers. It needs
                something to run it: my machine, my phone, or a container.
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                e.g. <strong>Vera</strong>, <strong>helmsman</strong>, rag-engine, Structura.
                <br />
                <span className="text-muted-foreground">Built in Python / Dart / Rust · runs on-device or as a Docker image.</span>
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-foreground/75 leading-relaxed mt-6 font-serif italic">
            The unlock: a site needs no server; an engine does. That one fact decides
            the whole toolchain.
          </p>
        </section>

        {/* 2 — how a site is built */}
        <section className="py-8 border-t border-border">
          <Eyebrow>02 — The story of a site</Eyebrow>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">How a site is built (the Universe Engine)</h2>
          <Diagram>{`you write code  →  Next.js builds  →  static files  →  GitHub Pages  →  the browser runs it
 (components/)      (pnpm build)        (out/ folder)      (free host)       (the visitor's)`}</Diagram>
          <ul className="max-w-2xl mt-6 space-y-3 text-sm text-foreground/75 leading-relaxed">
            <li><strong>Next.js / React</strong> — pages are made of <em>components</em> (reusable Lego blocks of screen).</li>
            <li><strong>output: &quot;export&quot;</strong> — the setting that turns the app into plain files, so it needs no server (that&apos;s why it&apos;s free).</li>
            <li><strong>Three.js</strong> — draws 3D using the graphics card; the planets/stars are <em>shaders</em> (tiny programs that run per-pixel on the GPU).</li>
            <li><strong>satellite.js</strong> — real orbit math, so satellites are where they truly are.</li>
            <li><strong>web-llm</strong> — a tiny AI that runs <em>inside the browser</em>, no server (the ✦ copilot).</li>
          </ul>
          <p className="max-w-2xl text-foreground/75 leading-relaxed mt-5">
            It connects to the world through <strong>keyless public APIs</strong> — it just
            fetches data: NASA (images), NOAA (space weather), NCBI (genome). No login,
            no secret keys — so it stays static and free.
          </p>
        </section>

        {/* 3 — how an engine is built */}
        <section className="py-8 border-t border-border">
          <Eyebrow>03 — The story of an engine</Eyebrow>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">How an engine is built (Vera, helmsman)</h2>
          <p className="max-w-2xl text-foreground/75 leading-relaxed mb-5">
            An engine is layered like a mind. The pattern I use everywhere:
          </p>
          <Diagram>{`input  →  deterministic core  →  RAG (look up real text)  →  LLM (just phrases it)  →  output
          (plain code,            (grounds it in truth,        (the mouth, the LAST
           always works)           not guessing)                and smallest step)`}</Diagram>
          <ul className="max-w-2xl mt-6 space-y-3 text-sm text-foreground/75 leading-relaxed">
            <li><strong>Deterministic core</strong> — normal code with fixed rules. Does the reliable work; never makes things up.</li>
            <li><strong>RAG</strong> — before answering, it <em>looks up</em> relevant real text (my notes, my code) and reads from it. This is how a small model knows a lot: the knowing is in the lookup, not the model.</li>
            <li><strong>The LLM</strong> — writes words naturally. It&apos;s the <em>last, smallest</em> step. If it&apos;s missing, the engine still works.</li>
            <li><strong>The neural engine</strong> (Vera, helmsman) — the core is shaped like brain regions: <em>feel → recall → decide → speak</em>. The LLM is only &quot;speak&quot;.</li>
          </ul>
          <p className="max-w-2xl text-foreground/75 leading-relaxed mt-5">
            The model is a file (a <strong>GGUF</strong> — compressed weights). A program
            called <strong>llama.cpp</strong> loads it and runs it on my Mac&apos;s chip —
            no internet, no cloud.
          </p>
        </section>

        {/* 4 — how it connects */}
        <section className="py-8 border-t border-border">
          <Eyebrow>04 — The map</Eyebrow>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">How it all connects</h2>
          <Diagram>{`        ┌──────────── MY MACHINE (on-device, private) ────────────┐
        │  me ─► helmsman / Vera ─uses─► helmsman-4b.gguf          │
        │            │                   (via llama.cpp)           │
        │            └─RAG─► my 40 repos  ◄── knows my real code   │
        └─────────────────────────────────────────────────────────┘
                          │ ships as a free Docker image
                          ▼
               ghcr.io/sinhaankur/...   (anyone can pull + run)
                          │ pulls weights from
                          ▼
                 Hugging Face (free model hosting)

        ┌──────────────── THE WEB (static sites) ─────────────────┐
  visitor ─► sinhaankur.com  (GitHub Pages, free)                 │
        │       textures from Cloudflare R2 (free)                │
        │       live data from NASA / NOAA / NCBI (keyless)       │
        └─────────────────────────────────────────────────────────┘`}</Diagram>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
                  <th className="py-2 pr-4 border-b border-border">Host</th>
                  <th className="py-2 pr-4 border-b border-border">Holds</th>
                  <th className="py-2 border-b border-border">Why · free?</th>
                </tr>
              </thead>
              <tbody className="text-foreground/75">
                {[
                  ["GitHub Pages", "the static sites", "serves files, no server · free"],
                  ["GitHub Actions", "the build+deploy robot", "runs the build on each push · free"],
                  ["Cloudflare R2", "big textures (16K maps)", "free downloads · free"],
                  ["ghcr.io", "engine Docker images", "run-anywhere app bundles · free (public)"],
                  ["Hugging Face", "model weights (GGUF)", "made for big model files · free"],
                ].map(([a, b, c]) => (
                  <tr key={a}>
                    <td className="py-2 pr-4 border-b border-border/50 font-medium">{a}</td>
                    <td className="py-2 pr-4 border-b border-border/50">{b}</td>
                    <td className="py-2 border-b border-border/50 text-muted-foreground">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5 — what runs */}
        <section className="py-8 border-t border-border">
          <Eyebrow>05 — What actually runs</Eyebrow>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">…and when</h2>
          <ul className="max-w-2xl space-y-3 text-sm text-foreground/75 leading-relaxed">
            <li><strong>A site</strong> runs only in the visitor&apos;s browser, on demand. Nothing of mine runs between visits — the files just wait.</li>
            <li><strong>The build robot</strong> (GitHub Actions) runs ~1 minute when I <code>git push</code>, then stops.</li>
            <li><strong>An engine</strong> runs when I ask it, then stops.</li>
            <li><strong>The LLM</strong> is in memory only while answering, then freed.</li>
          </ul>
          <p className="max-w-2xl text-foreground/75 leading-relaxed mt-5 font-serif italic">
            Nothing runs secretly or forever. Things run when triggered — a visit, a
            push, a question — and stop. That&apos;s the whole system: on-device, free,
            honest, mine.
          </p>
        </section>

        {/* 6 — the workflow */}
        <section className="py-8 border-t border-border mb-16">
          <Eyebrow>06 — The workflow</Eyebrow>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">The one loop I repeat to build anything</h2>
          <Diagram>{`1. write the code      components/ for a site · a .py/.dart module for an engine
2. run it locally      pnpm dev  /  python -m ...     ← see it work
3. lint → build → test  catch mistakes before anyone sees them
4. git commit          save a labelled snapshot
5. git push            the build robot deploys it     ← only when green
6. verify it's live    open the URL / run the command`}</Diagram>
          <p className="max-w-2xl text-foreground/75 leading-relaxed mt-5">
            This is my loop — and it&apos;s exactly how <strong>helmsman</strong> is being
            taught to build, so it works the way I do.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
