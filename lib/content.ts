// The learning content model. A Topic is an ordered path of Lessons.
//
// AUDIENCE (important — it sets the voice everywhere): someone who studied
// C/C++ and understands CONCEPTS (variables, loops, functions, pointers) but
// can't yet sit down and write working code from scratch. So every lesson:
//   - assumes no fluency — nothing is "obvious", we don't skip the basics;
//   - explains code line by line, in plain language;
//   - bridges from C/C++ where it helps ("you know pointers — Python hides them");
//   - aims to get the reader to actually WRITE a line, not just read one.
// Patient mentor, not senior-to-junior code review.

export type Lesson = {
  id: string; // stable id — progress is keyed on this
  title: string;
  minutes: number; // rough time to work through
  idea: string; // the concept, in plain engineer-to-engineer English
  why: string; // why it matters / the decision behind it
  code?: string; // real code from an actual project (with a source note)
  codeSource?: string; // where the code is from (repo/path)
};

export type Topic = {
  slug: string;
  track: "skills" | "build";
  title: string;
  tagline: string;
  blurb: string; // who this is for + what you'll walk away knowing
  lessons: Lesson[];
};

export const TRACKS = {
  build: {
    title: "Understand my AI-written code",
    blurb:
      "The heart of this site. We open the code the AI actually wrote — this website, Vera, the rag-engine, the games — and read it together, line by line. No fluency assumed: if you know C/C++ concepts and a little HTML, you can follow. The goal is that you can read your own projects, and eventually change them.",
  },
  skills: {
    title: "Skills — taught as we need them",
    blurb:
      "The languages and ideas the projects use, in the order you meet them: HTML you know → JavaScript → Node.js → Python → the AI/LLM/RAG parts. Each is bridged from what you already know (C/C++), and taught only as deep as you need to understand the real code.",
  },
} as const;

// The ladder the skills follow — from what Ankur already knows outward.
export const LADDER = ["html", "javascript", "nodejs", "python", "ai", "llm", "rag"] as const;
