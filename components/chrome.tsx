import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-5xl px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif italic text-lg">
          Learn
        </Link>
        <div className="flex items-center gap-5 font-mono text-[11px] tracking-wide text-muted-foreground">
          <Link href="/#understand" className="hover:text-foreground">Understand the code</Link>
          <Link href="/#skills" className="hover:text-foreground">Skills</Link>
          <a href="https://www.sinhaankur.com" className="hover:text-foreground">sinhaankur.com ↗</a>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-10 text-sm text-muted-foreground">
        <p className="font-serif italic text-foreground/80 mb-2">
          Built to learn from — and to hand on.
        </p>
        <p className="max-w-xl leading-relaxed">
          A father&apos;s notes on the code an AI wrote, explained plainly enough
          that a son could pick them up one day. Everything runs on your own
          device; your progress is yours alone.
        </p>
        <p className="mt-4 font-mono text-[11px]">© Ankur Sinha</p>
      </div>
    </footer>
  );
}
