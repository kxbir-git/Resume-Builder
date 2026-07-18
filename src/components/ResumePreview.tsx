import type { ResumeData } from "@/lib/mock-data";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

type Props = { data: ResumeData; template: string; accent: string };

export function ResumePreview({ data, template, accent }: Props) {
  if (template === "minimal") return <MinimalTemplate data={data} accent={accent} />;
  if (template === "corporate") return <CorporateTemplate data={data} accent={accent} />;
  if (template === "creative") return <CreativeTemplate data={data} accent={accent} />;
  if (template === "ats") return <AtsTemplate data={data} accent={accent} />;
  if (template === "classic") return <ClassicTemplate data={data} accent={accent} />;
  return <ModernTemplate data={data} accent={accent} />;
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h3
        className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

/* MODERN — sidebar + main */
function ModernTemplate({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <div className="flex min-h-full bg-white text-[11px] leading-snug text-neutral-800">
      <aside className="w-[34%] p-6 text-white" style={{ backgroundColor: accent }}>
        <div className="mb-4">
          <div className="mb-3 grid h-20 w-20 place-items-center rounded-full bg-white/20 text-2xl font-bold">
            {data.personal.fullName.split(" ").map(n => n[0]).slice(0, 2).join("")}
          </div>
          <h1 className="font-display text-xl font-bold leading-tight">{data.personal.fullName}</h1>
          <p className="text-[11px] opacity-90">{data.personal.title}</p>
        </div>
        <div className="space-y-1.5 border-t border-white/30 pt-3 text-[10px]">
          <p className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{data.personal.email}</p>
          <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{data.personal.phone}</p>
          <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{data.personal.location}</p>
          <p className="flex items-center gap-1.5"><Globe className="h-3 w-3" />{data.personal.website}</p>
        </div>
        <div className="mt-5">
          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-90">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {data.skills.map(s => (
              <span key={s} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{s}</span>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-90">Languages</h3>
          {data.languages.map(l => (
            <p key={l.id} className="text-[10px]">{l.name} — <span className="opacity-80">{l.level}</span></p>
          ))}
        </div>
        <div className="mt-5">
          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-90">Hobbies</h3>
          <p className="text-[10px] opacity-90">{data.hobbies.join(" · ")}</p>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Section title="Profile" accent={accent}><p>{data.objective}</p></Section>
        <Section title="Experience" accent={accent}>
          {data.experience.map(x => (
            <div key={x.id} className="mb-3">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{x.role}</p>
                <p className="text-[10px] text-neutral-500">{x.period}</p>
              </div>
              <p className="text-[10px] italic text-neutral-600">{x.company}</p>
              <p className="mt-1">{x.description}</p>
            </div>
          ))}
        </Section>
        <Section title="Education" accent={accent}>
          {data.education.map(e => (
            <div key={e.id} className="mb-2">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{e.degree}</p>
                <p className="text-[10px] text-neutral-500">{e.period}</p>
              </div>
              <p className="text-[10px] italic text-neutral-600">{e.school}</p>
              <p className="mt-1">{e.description}</p>
            </div>
          ))}
        </Section>
        <Section title="Projects" accent={accent}>
          {data.projects.map(p => (
            <div key={p.id} className="mb-2">
              <p className="font-semibold">{p.name} <span className="text-[10px] font-normal text-neutral-500">— {p.link}</span></p>
              <p>{p.description}</p>
            </div>
          ))}
        </Section>
        {data.certifications.length > 0 && (
          <Section title="Certifications" accent={accent}>
            {data.certifications.map(c => (
              <p key={c.id}>{c.name} — <span className="text-neutral-600">{c.issuer}, {c.year}</span></p>
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}

/* MINIMAL — single column, lots of whitespace */
function MinimalTemplate({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <div className="min-h-full bg-white p-10 text-[11px] leading-relaxed text-neutral-800">
      <header className="mb-8 border-b border-neutral-200 pb-5">
        <h1 className="font-display text-3xl font-light tracking-tight">{data.personal.fullName}</h1>
        <p className="mt-1 text-sm" style={{ color: accent }}>{data.personal.title}</p>
        <p className="mt-2 text-[10px] text-neutral-500">
          {data.personal.email} · {data.personal.phone} · {data.personal.location} · {data.personal.website}
        </p>
      </header>
      <p className="mb-6 text-[12px] italic text-neutral-700">{data.objective}</p>
      <Section title="Experience" accent={accent}>
        {data.experience.map(x => (
          <div key={x.id} className="mb-3">
            <p className="font-semibold">{x.role} · <span className="font-normal">{x.company}</span></p>
            <p className="text-[10px] text-neutral-500">{x.period}</p>
            <p className="mt-1">{x.description}</p>
          </div>
        ))}
      </Section>
      <Section title="Education" accent={accent}>
        {data.education.map(e => (
          <div key={e.id}><p className="font-semibold">{e.degree}, {e.school}</p><p className="text-[10px] text-neutral-500">{e.period}</p></div>
        ))}
      </Section>
      <Section title="Skills" accent={accent}><p>{data.skills.join(" · ")}</p></Section>
    </div>
  );
}

/* CORPORATE BLUE */
function CorporateTemplate({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <div className="min-h-full bg-white text-[11px] text-neutral-800">
      <header className="border-b-4 px-8 py-6" style={{ borderColor: accent }}>
        <h1 className="font-display text-3xl font-bold" style={{ color: accent }}>{data.personal.fullName}</h1>
        <p className="text-sm uppercase tracking-widest text-neutral-600">{data.personal.title}</p>
        <p className="mt-2 text-[10px] text-neutral-500">{data.personal.email} | {data.personal.phone} | {data.personal.location}</p>
      </header>
      <div className="p-8">
        <Section title="Summary" accent={accent}><p>{data.objective}</p></Section>
        <Section title="Professional Experience" accent={accent}>
          {data.experience.map(x => (
            <div key={x.id} className="mb-3">
              <p className="font-bold">{x.role} — {x.company}</p>
              <p className="text-[10px] text-neutral-500">{x.period}</p>
              <p className="mt-1">{x.description}</p>
            </div>
          ))}
        </Section>
        <div className="grid grid-cols-2 gap-6">
          <Section title="Education" accent={accent}>
            {data.education.map(e => <div key={e.id}><p className="font-semibold">{e.degree}</p><p>{e.school}, {e.period}</p></div>)}
          </Section>
          <Section title="Core Skills" accent={accent}><p>{data.skills.join(", ")}</p></Section>
        </div>
      </div>
    </div>
  );
}

/* CREATIVE — bold gradient header */
function CreativeTemplate({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <div className="min-h-full bg-white text-[11px] text-neutral-800">
      <header
        className="p-8 text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}AA, #F4A261)` }}
      >
        <h1 className="font-display text-4xl font-black leading-none">{data.personal.fullName}</h1>
        <p className="mt-1 text-base font-light tracking-wide">— {data.personal.title}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-[10px]">
          <span>✉ {data.personal.email}</span><span>☎ {data.personal.phone}</span><span>📍 {data.personal.location}</span>
        </div>
      </header>
      <div className="p-8">
        <Section title="Hello!" accent={accent}><p className="text-[12px]">{data.objective}</p></Section>
        <Section title="Where I've worked" accent={accent}>
          {data.experience.map(x => (
            <div key={x.id} className="mb-3 border-l-2 pl-3" style={{ borderColor: accent }}>
              <p className="font-bold">{x.role}</p>
              <p className="text-[10px] italic">{x.company} · {x.period}</p>
              <p className="mt-1">{x.description}</p>
            </div>
          ))}
        </Section>
        <Section title="Tools & Skills" accent={accent}>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map(s => (
              <span key={s} className="rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: accent }}>{s}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ATS — plain, single column, no graphics */
function AtsTemplate({ data, accent: _accent }: { data: ResumeData; accent: string }) {
  return (
    <div className="min-h-full bg-white p-8 font-sans text-[11px] text-black">
      <h1 className="text-xl font-bold uppercase">{data.personal.fullName}</h1>
      <p>{data.personal.email} | {data.personal.phone} | {data.personal.location} | {data.personal.website}</p>
      <hr className="my-3 border-black" />
      <h2 className="mb-1 font-bold uppercase">Summary</h2>
      <p className="mb-3">{data.objective}</p>
      <h2 className="mb-1 font-bold uppercase">Experience</h2>
      {data.experience.map(x => (
        <div key={x.id} className="mb-2">
          <p className="font-bold">{x.role}, {x.company} ({x.period})</p>
          <p>{x.description}</p>
        </div>
      ))}
      <h2 className="mb-1 mt-2 font-bold uppercase">Education</h2>
      {data.education.map(e => <p key={e.id}>{e.degree}, {e.school} ({e.period})</p>)}
      <h2 className="mb-1 mt-3 font-bold uppercase">Skills</h2>
      <p>{data.skills.join(", ")}</p>
    </div>
  );
}

/* CLASSIC — serif formal */
function ClassicTemplate({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <div className="min-h-full bg-white p-10 font-serif text-[11px] text-neutral-900">
      <header className="mb-5 text-center">
        <h1 className="text-3xl font-bold tracking-wide" style={{ color: accent }}>{data.personal.fullName}</h1>
        <p className="text-sm italic">{data.personal.title}</p>
        <p className="mt-1 text-[10px]">{data.personal.email} · {data.personal.phone} · {data.personal.location}</p>
        <hr className="mx-auto mt-3 w-24 border-t-2" style={{ borderColor: accent }} />
      </header>
      <Section title="Objective" accent={accent}><p className="italic">{data.objective}</p></Section>
      <Section title="Experience" accent={accent}>
        {data.experience.map(x => (
          <div key={x.id} className="mb-3">
            <p className="font-bold">{x.role}, {x.company}</p>
            <p className="text-[10px] italic">{x.period}</p>
            <p>{x.description}</p>
          </div>
        ))}
      </Section>
      <Section title="Education" accent={accent}>
        {data.education.map(e => <p key={e.id}><b>{e.degree}</b>, {e.school} — {e.period}</p>)}
      </Section>
      <Section title="Skills" accent={accent}><p>{data.skills.join(" · ")}</p></Section>
    </div>
  );
}
