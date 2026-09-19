import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/components/chrome";
import { LessonPath } from "@/components/lesson";
import { SKILLS } from "@/lib/skills";

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SKILLS.find((x) => x.slug === slug);
  return { title: s ? `${s.title} — Learn` : "Learn" };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = SKILLS.find((s) => s.slug === slug);
  if (!skill) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 md:px-10">
        <header className="pt-16 md:pt-20 pb-10">
          <Link href="/#skills" className="font-mono text-[11px] text-muted-foreground hover:text-foreground">
            ← Skills
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl italic mt-4 mb-4">{skill.title}</h1>
          <p className="text-lg text-foreground/75 leading-relaxed">{skill.oneLine}</p>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
              Starting from what you know
            </p>
            <p className="text-foreground/80 leading-relaxed">{skill.fromWhatYouKnow}</p>
          </div>
        </header>

        <LessonPath ids={skill.lessons.map((l) => l.id)} lessons={skill.lessons} />
      </main>
      <Footer />
    </>
  );
}
