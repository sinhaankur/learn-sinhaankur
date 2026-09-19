import Link from "next/link";
import { Nav, Footer } from "@/components/chrome";
import { ProgressBar } from "@/components/progress";
import { TRACKS } from "@/lib/content";
import { PROJECTS } from "@/lib/projects";
import { SKILLS } from "@/lib/skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Hero */}
        <header className="pt-20 md:pt-28 pb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            A learning space
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] italic mb-6">
            Understand the code<br />the AI wrote for me.
          </h1>
          <p className="max-w-2xl text-foreground/75 leading-relaxed text-lg">
            I know C and C++ from college, and a little HTML — but not enough to
            write a real program on my own. So this is where I read my own
            projects, line by line, until I do. Nothing skipped, everything
            bridged from what I already know.
          </p>
          <p className="max-w-2xl text-muted-foreground leading-relaxed mt-4 font-serif italic">
            I&apos;m building it to learn from today — and so my son can learn from
            it tomorrow.
          </p>
        </header>

        {/* Track 1 — Understand the code */}
        <section id="understand" className="py-8 scroll-mt-20">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-serif text-2xl md:text-3xl">{TRACKS.build.title}</h2>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">01</span>
          </div>
          <p className="max-w-2xl text-muted-foreground leading-relaxed mb-8">{TRACKS.build.blurb}</p>

          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <Link
                key={p.slug}
                href={`/project/${p.slug}`}
                className="rounded-xl border border-border bg-card p-6 hover:border-accent/50 transition group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg group-hover:text-accent transition">{p.title}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">{p.lessons.length} lessons</span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">{p.what}</p>
                <ProgressBar ids={p.lessons.map((l) => l.id)} />
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Track 2 — Skills */}
        <section id="skills" className="py-12 scroll-mt-20">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-serif text-2xl md:text-3xl">{TRACKS.skills.title}</h2>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">02</span>
          </div>
          <p className="max-w-2xl text-muted-foreground leading-relaxed mb-8">{TRACKS.skills.blurb}</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s, i) => (
              <Link
                key={s.slug}
                href={`/skill/${s.slug}`}
                className="rounded-lg border border-border bg-card p-5 hover:border-accent/50 transition group"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-medium group-hover:text-accent transition">{s.title}</h3>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">{s.oneLine}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
