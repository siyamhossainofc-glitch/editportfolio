import { useState } from "react";
import { skillGroups } from "../data/skills";

const CategoryIcons = {
  Frontend: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--sec)]"><rect width="20" height="15" x="2" y="4" rx="2"/><path d="M2 8h20M8 19h8"/></svg>
  ),
  Backend: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--sec)]"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>
  ),
  Database: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--sec)]"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
  ),
  Tools: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--sec)]"><path d="M4 7h16v13H4zM9 7V4h6v3M4 11h16M10 11v2h4v-2"/></svg>
  ),
};

export default function SkillsList() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <section className="w-full text-left" aria-labelledby="capabilities-title">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[.12em] text-[var(--sec)]">Capabilities</p>
      <h2 id="capabilities-title" className="text-3xl font-medium tracking-tight text-[var(--white)] md:text-4xl">What I do</h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--white-icon)]">Frontend, backend, database, and development-tool skills, grouped into a practical toolkit.</p>
      <div className="mt-6 grid gap-3">
        {skillGroups.map((group) => {
          const category = group.title;
          const items = group.skills;
          const expanded = openItem === category;
          const panelId = `capability-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <article key={category} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.025] transition-colors hover:border-[var(--sec)]/50">
              <h3>
                <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpenItem(expanded ? null : category)} className="skill-accordion-trigger flex min-h-16 w-full items-center gap-3 p-4 text-left text-[var(--white)] transition-colors hover:bg-white/[.04] active:bg-white/[.06] active:scale-[.995] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sec)]">
                  {CategoryIcons[category as keyof typeof CategoryIcons]}
                  <span className="flex-1 text-sm font-medium md:text-base">{category}</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={`h-5 w-5 text-[var(--white-icon)] transition-transform ${expanded ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </h3>
              <div id={panelId} hidden={!expanded} className="border-t border-white/10 px-4 py-3">
                <ul className="grid gap-2 text-sm leading-6 text-[var(--white-icon)]">{items.map((item) => <li key={item} className="flex gap-3"><span className="text-[var(--sec)]" aria-hidden="true">—</span><span>{item}</span></li>)}</ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
