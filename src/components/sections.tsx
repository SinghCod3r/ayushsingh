import { portfolioData as data } from "@/lib/data";
import { cn } from "@/lib/cn";
import { sentence, site, twoLines } from "@/lib/site";
import { ExternalLink } from "./external-link";
import { KineticHeading } from "./kinetic-heading";
import { LocalTime } from "./local-time";
import { ProjectList } from "./project-list";
import { RevealWords } from "./reveal-words";
import { TextRoll } from "./text-roll";

/** Every section is its own screen-sized block holding only its own content. */
const sectionClass =
  "relative z-10 flex min-h-svh flex-col justify-center px-5 py-24 md:px-10 md:py-32";
const headingClass =
  "font-display font-semibold tracking-tighter leading-[0.88] text-[clamp(3.25rem,13vw,13rem)]";
const rowBorder = "border-t border-line";

function SectionHeading({ lines }: { lines: string[] }) {
  return <KineticHeading lines={lines} className={headingClass} />;
}

/* ------------------------------------------------------------------ */

export function Hero() {
  const [first, last] = data.personal.name.split(" ");
  return (
    // 100lvh so the next section never peeks in when mobile browser bars collapse;
    // the content itself is sized to the smaller viewport.
    <section id="hero" className="relative z-10 h-[100lvh]">
      <div className="flex h-svh flex-col justify-between px-5 pb-8 pt-28 md:px-10">
        <KineticHeading
          as="h1"
          trigger="intro"
          interactive
          lines={[first, last]}
          className="font-display tracking-tighter leading-[0.8] text-[clamp(5rem,27vw,26rem)]"
        />
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-display text-xl font-medium tracking-tight md:text-2xl">
              {data.personal.role}
            </p>
            <p className="mt-1 text-sm text-muted">{data.personal.subRoles.join(", ")}</p>
          </div>
          <LocalTime city={site.city} timeZone={site.timeZone} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function About() {
  const { personal, journey } = data;
  return (
    <section id="about" className={sectionClass}>
      <SectionHeading lines={["About"]} />
      <RevealWords
        text={personal.tagline}
        className="mt-14 max-w-4xl font-display text-[clamp(1.6rem,3.6vw,3.4rem)] font-medium leading-[1.14] tracking-tight"
      />
      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted">{personal.bio}</p>

      <dl className="mt-16 max-w-4xl">
        {personal.stats.map((s) => (
          <div key={s.label} className={cn(rowBorder, "flex items-baseline justify-between gap-6 py-4")}>
            <dt className="text-muted">{s.label}</dt>
            <dd className="font-display text-2xl font-medium tracking-tight md:text-3xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      <ol className="mt-20 max-w-4xl border-b border-line">
        {journey.map((j) => (
          <li
            key={j.title}
            className={cn(rowBorder, "grid gap-1 py-5 md:grid-cols-[11rem_1fr] md:gap-8")}
          >
            <span className="text-muted">{j.year}</span>
            <span>
              <span className="font-display text-xl font-medium tracking-tight">{j.title}</span>
              <span className="block text-muted">
                {j.context}, {j.highlight}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Work() {
  return (
    <section id="work" className={sectionClass}>
      <SectionHeading lines={["Work"]} />
      <ProjectList projects={data.projects} />
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function OpenSource() {
  const os = data.openSource;
  return (
    <section id="open-source" className={sectionClass}>
      <SectionHeading lines={["Open source"]} />
      <p className="mt-14 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.75rem)] font-medium leading-[1.14] tracking-tight">
        {os.subtitle}
      </p>

      <dl className="mt-14 max-w-4xl">
        {[
          ["Organization", os.organization],
          ["Role", os.role],
          ["Period", os.period],
          ["Repositories", os.repos.join(", ")],
          ...os.stats.filter((s) => s.label === "Focus").map((s) => [s.label, s.value]),
        ].map(([label, value]) => (
          <div key={label} className={cn(rowBorder, "grid gap-1 py-4 md:grid-cols-[11rem_1fr] md:gap-8")}>
            <dt className="text-muted">{label}</dt>
            <dd className="text-lg">{value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-16 max-w-5xl border-b border-line">
        {os.prs.map((pr) => (
          <li
            key={pr.pr}
            className={cn(rowBorder, "grid gap-1 py-5 md:grid-cols-[5rem_1fr_auto] md:items-baseline md:gap-8")}
          >
            <span className="text-muted tabular-nums">{pr.pr}</span>
            <span className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
              {pr.title}
            </span>
            <span className="text-sm text-muted">
              {pr.tag}, {pr.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-10">
        {os.highlights.map((h) => (
          <p key={h} className="leading-relaxed text-muted">
            {h}
          </p>
        ))}
      </div>

      <div className="mt-12">
        <ExternalLink href={os.githubUrl}>View system-config-printer</ExternalLink>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Skills() {
  const { skills } = data;
  const categories = skills.categories.filter((c) => c.id !== "all");
  return (
    <section id="skills" className={sectionClass}>
      <SectionHeading lines={["Skills"]} />
      <p className="mt-14 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.75rem)] font-medium leading-[1.14] tracking-tight">
        {sentence(skills.editorialNote)}
      </p>
      <div className="mt-14 border-b border-line">
        {categories.map((c) => {
          const items = skills.technologies.filter((t) => t.category === c.id);
          return (
            <div key={c.id} className={cn(rowBorder, "grid gap-3 py-6 md:grid-cols-[11rem_1fr] md:gap-8")}>
              <h3 className="text-muted capitalize">{c.label.toLowerCase()}</h3>
              <ul className="flex flex-wrap gap-x-7 gap-y-1">
                {items.map((t) => (
                  <li
                    key={t.id}
                    title={t.tagline}
                    className={cn(
                      "font-display tracking-tight",
                      "featured" in t && t.featured
                        ? "text-3xl font-semibold md:text-4xl"
                        : "text-2xl font-medium text-fg/70 md:text-3xl",
                    )}
                  >
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Writing() {
  return (
    <section id="writing" className={sectionClass}>
      <SectionHeading lines={["Writing"]} />
      <ul className="mt-16 border-b border-line">
        {data.writings.map((w) => (
          <li key={w.id} className={rowBorder}>
            <a
              href={w.url}
              target="_blank"
              rel="noreferrer"
              className="grid gap-2 py-6 transition-colors hover:text-accent md:grid-cols-[8rem_1fr_11rem] md:items-baseline md:gap-8 md:py-8"
            >
              <span className="text-muted">{w.date}</span>
              <span className="font-display text-[clamp(1.35rem,2.6vw,2.5rem)] font-medium leading-[1.12] tracking-tight">
                {w.title}
              </span>
              <span className="text-sm text-muted md:text-right">{w.category}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Talks() {
  const t = data.speaking.featuredTalk;
  return (
    <section id="talks" className={sectionClass}>
      <SectionHeading lines={["Talks"]} />
      <p className="mt-14 max-w-2xl text-xl leading-snug md:text-2xl">{data.speaking.subtitle}</p>

      <article className={cn(rowBorder, "mt-14 max-w-5xl border-b py-10")}>
        <p className="text-sm text-muted">{data.speaking.badge}</p>
        <h3 className="mt-3 font-display text-[clamp(1.75rem,4.2vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          {t.title}
        </h3>
        <p className="mt-6 text-lg">
          {t.event}, {t.institution}
        </p>
        <p className="text-muted">
          {t.date}, {t.location}
        </p>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted">{t.summary}</p>
        <p className="mt-6 text-sm text-muted">{t.tags.join(", ")}</p>
      </article>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Contact() {
  const c = data.contact;
  const links = [
    { label: "Email", href: `mailto:${c.email}` },
    { label: "GitHub", href: c.github },
    { label: "LinkedIn", href: c.linkedin },
    { label: "Resume", href: c.resume },
  ];
  return (
    <section id="contact" className={sectionClass}>
      <SectionHeading lines={twoLines(sentence(c.headline))} />
      <p className="mt-10 max-w-xl text-lg leading-snug text-muted">{c.subtext}</p>
      <ul className="mt-12 flex flex-col items-start gap-1">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("http") || l.href.endsWith(".pdf") ? "_blank" : undefined}
              rel="noreferrer"
              className="group/roll font-display text-[clamp(2rem,6vw,6rem)] font-medium leading-none tracking-tight"
            >
              <TextRoll>{l.label}</TextRoll>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-sm text-muted">{c.locationNote}</p>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 flex flex-col gap-2 border-t border-line px-5 py-6 text-sm text-muted md:flex-row md:justify-between md:px-10">
      <p>© 2026 {site.name}</p>
      <p>
        Motion patterns adapted from{" "}
        <a href="https://skiper-ui.com" target="_blank" rel="noreferrer" className="underline underline-offset-4">
          Skiper UI
        </a>
      </p>
    </footer>
  );
}
