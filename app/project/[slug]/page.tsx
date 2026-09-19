import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/components/chrome";
import { LessonPath } from "@/components/lesson";
import { PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Learn` : "Learn" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 md:px-10">
        <header className="pt-16 md:pt-20 pb-10">
          <Link href="/#understand" className="font-mono text-[11px] text-muted-foreground hover:text-foreground">
            ← Understand the code
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl italic mt-4 mb-4">{project.title}</h1>
          <p className="text-lg text-foreground/75 leading-relaxed">{project.what}</p>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">
            code: {project.repo}
          </p>
        </header>

        <LessonPath ids={project.lessons.map((l) => l.id)} lessons={project.lessons} />

        <div className="mt-16 rounded-xl border border-border bg-card p-6">
          <p className="font-serif italic text-foreground/80">
            You just read a whole program the AI wrote — and understood every step.
            That&apos;s the skill. Try another project, or dip into a skill it used.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
