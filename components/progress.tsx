"use client";

import { useCallback, useEffect, useState } from "react";

// On-device progress. Everything is a key in localStorage — no account, no
// server. That means YOUR progress and, tomorrow, your son's progress on his own
// device stay entirely private and separate.

const KEY = "learn-progress-v1";

function read(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function write(v: Record<string, boolean>) {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* private mode */ }
}

export function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => setDone(read()), []);
  const toggle = useCallback((id: string) => {
    setDone((cur) => {
      const next = { ...cur, [id]: !cur[id] };
      if (!next[id]) delete next[id];
      write(next);
      return next;
    });
  }, []);
  const isDone = useCallback((id: string) => !!done[id], [done]);
  const countDone = useCallback(
    (ids: string[]) => ids.filter((i) => done[i]).length, [done]);
  return { done, toggle, isDone, countDone };
}

/** A big, satisfying progress bar for a set of lesson ids. */
export function ProgressBar({ ids }: { ids: string[] }) {
  const { countDone } = useProgress();
  const n = countDone(ids);
  const pct = ids.length ? Math.round((n / ids.length) * 100) : 0;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
          {n} / {ids.length} lessons
        </span>
        <span className="font-mono text-[11px] text-accent">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-black/10 overflow-hidden">
        <div className="bar h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      {pct === 100 && (
        <p className="mt-2 font-serif italic text-accent text-sm">
          Finished. You read every line of this one. ✦
        </p>
      )}
    </div>
  );
}

/** A single lesson's tick-box + label. */
export function LessonCheck({ id, label }: { id: string; label: string }) {
  const { isDone, toggle } = useProgress();
  const done = isDone(id);
  return (
    <button
      onClick={() => toggle(id)}
      className="flex items-center gap-2.5 text-left group"
      aria-pressed={done}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold transition ${
          done ? "bg-accent border-accent text-white" : "border-border text-transparent group-hover:border-accent/60"
        }`}
      >
        ✓
      </span>
      <span className={`text-sm ${done ? "text-muted-foreground line-through" : "text-foreground/80"}`}>
        {label}
      </span>
    </button>
  );
}
