"use client";

import type { Lesson } from "@/lib/content";
import { LessonCheck, ProgressBar } from "./progress";

// Renders one project/skill's ordered lessons. Each lesson: the idea in plain
// words, why it matters, the real code, and a tick-box that saves progress.

export function LessonPath({
  ids,
  lessons,
}: {
  ids: string[];
  lessons: Lesson[];
}) {
  return (
    <div>
      <div className="rounded-xl border border-border bg-card p-5 mb-10">
        <ProgressBar ids={ids} />
      </div>

      <ol className="space-y-12">
        {lessons.map((l, i) => (
          <li key={l.id} id={l.id} className="scroll-mt-20">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-sm text-accent shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-xl md:text-2xl leading-snug">{l.title}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">
                  ~{l.minutes} min
                </span>
              </div>
            </div>

            <div className="md:pl-9 space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  The idea
                </p>
                <p className="text-foreground/85 leading-relaxed">{l.idea}</p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  Why it matters
                </p>
                <p className="text-foreground/70 leading-relaxed">{l.why}</p>
              </div>

              {l.code && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      The real code
                    </p>
                    {l.codeSource && (
                      <span className="font-mono text-[10px] text-muted-foreground/70">
                        {l.codeSource}
                      </span>
                    )}
                  </div>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-foreground/[0.03] p-4 text-[12.5px] leading-relaxed">
                    <code className="font-mono text-foreground/90 whitespace-pre">{l.code}</code>
                  </pre>
                </div>
              )}

              <div className="pt-2 border-t border-border/60">
                <LessonCheck id={l.id} label="I understood this — mark it done" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
