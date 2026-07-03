import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Code2,
  ArrowUpRight,
  Send,
  Sparkles,
  Layers,
  Server,
  Rocket,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import haseebPhoto from "@/assets/haseeb.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haseeb Hussain — Fullstack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Haseeb Hussain, a fullstack developer building real-time, high-craft web applications.",
      },
      { property: "og:title", content: "Haseeb Hussain — Fullstack Developer" },
      { property: "og:description", content: "Fullstack developer crafting real-time, high-craft web apps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const skillsMarquee = [
  "TYPESCRIPT",
  "REACT",
  "NODE.JS",
  "NEXT.JS",
  "POSTGRES",
  "WEBSOCKETS",
  "TAILWIND",
  "TANSTACK",
  "REST APIS",
  "GIT",
];

const projects = [
  {
    title: "Real-Time Food Ordering App",
    kind: "Fullstack • Realtime",
    description:
      "End-to-end ordering platform with live order tracking, real-time kitchen updates and seamless checkout — powered by WebSockets.",
    tags: ["React", "Node.js", "WebSockets", "PostgreSQL"],
    hue: "from-blue-500/25 to-indigo-500/25",
  },
  {
    title: "ATM with UI",
    kind: "Frontend • Product",
    description:
      "A polished ATM simulation covering balance, deposits, withdrawals and history with a secure, considered UX end to end.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    hue: "from-cyan-400/25 to-blue-600/25",
  },
];

const services = [
  { icon: Layers, title: "Frontend Engineering", desc: "Fast, accessible interfaces with React, TypeScript and Tailwind." },
  { icon: Server, title: "Backend & APIs", desc: "REST APIs, auth, databases and real-time systems that scale cleanly." },
  { icon: Rocket, title: "End-to-End Apps", desc: "From idea to deploy — design, build and ship the whole product." },
];

const stats = [
  { value: "2+", label: "Years Coding" },
  { value: "15+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "∞", label: "Cups of Chai" },
];

/* ------------------------------ Helpers ------------------------------ */

function MagneticButton({
  children,
  ...props
}: React.ComponentProps<typeof motion.a>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.4 });

  return (
    <motion.a
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: (typeof projects)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [index === 0 ? 0 : 80, index === 0 ? 0 : -40]);
  return (
    <motion.article
      style={{ y }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group glass-card relative overflow-hidden rounded-3xl p-8"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${project.hue} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="relative">
        <div className="mb-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_18%,transparent),color-mix(in_oklab,var(--accent)_10%,transparent))]">
          <div className="grid h-full w-full place-items-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-foreground/50">
              <Sparkles className="size-3.5" />
              {project.kind}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
              0{index + 1} — Case Study
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {project.title}
            </h3>
          </div>
          <div className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------ Page ------------------------------ */

function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);
  const portraitY = useTransform(heroProgress, [0, 1], [0, -70]);

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    const subj = encodeURIComponent(subject || `Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:haseebbajwa349@gmail.com?subject=${subj}&body=${body}`;
    toast.success("Opening your email app…");
    form.reset();
  }

  return (
    <div className="bg-cosmic bg-noise min-h-screen text-foreground">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-accent to-primary"
      />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-2 font-display font-semibold tracking-tight">
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
              <Code2 className="size-4" />
            </span>
            <span>Haseeb H.</span>
          </div>
          <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="transition-colors hover:text-foreground">About</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="transition-colors hover:text-foreground">Services</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }} className="transition-colors hover:text-foreground">Work</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="sm:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/5 sm:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-6 text-sm text-muted-foreground">
                <a href="#about" onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollToSection("about"); }} className="transition-colors hover:text-foreground">About</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollToSection("services"); }} className="transition-colors hover:text-foreground">Services</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollToSection("projects"); }} className="transition-colors hover:text-foreground">Work</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollToSection("contact"); }} className="transition-colors hover:text-foreground">Contact</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-12">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-primary"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Fullstack Developer
              </motion.p>

              <motion.h1
                className="font-display text-5xl font-bold leading-[0.95] tracking-tighter text-foreground sm:text-7xl lg:text-8xl"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
              >
                Crafting{" "}
                <span className="text-gradient">real-time</span>
                <br />
                web apps.
              </motion.h1>

              <motion.p
                className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                I'm <span className="text-foreground">Haseeb Hussain</span> — I design, build and ship end-to-end web
                applications with a focus on real-time features and clean, intuitive interfaces.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <MagneticButton
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--primary)_65%,transparent)] transition-colors hover:bg-primary/90"
                >
                  View Projects <ArrowUpRight className="size-4" />
                </MagneticButton>
                <MagneticButton
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-foreground transition-colors hover:bg-white/5"
                >
                  Get in touch
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Portrait */}
            <motion.div
              className="relative mx-auto lg:mx-0 lg:ml-auto"
              style={{ y: portraitY }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            >
              <motion.div
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/40 via-accent/30 to-primary/30 blur-3xl"
                animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <div className="glow-ring relative w-64 overflow-hidden rounded-3xl border border-primary/25 sm:w-80">
                <img src={haseebPhoto.url} alt="Haseeb Hussain portrait" className="h-auto w-full" />
              </div>
              <motion.div
                className="glass-card absolute -left-8 top-10 hidden rounded-full px-4 py-2 text-xs font-medium text-foreground shadow-lg sm:block"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                ⚡ Realtime
              </motion.div>
              <motion.div
                className="glass-card absolute -right-6 bottom-12 hidden rounded-full px-4 py-2 text-xs font-medium text-foreground shadow-lg sm:block"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.4 }}
              >
                ◇ React · TS
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-24 grid grid-cols-2 gap-4 sm:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
              01 — About
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Who I <span className="text-gradient">am</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground font-medium">Haseeb Hussain</span>, a fullstack developer who loves building real-time, interactive web applications. I design, develop and ship end-to-end products with a strong eye for detail and performance. Currently going deeper into advanced system design, real-time architectures and modern frontend tooling.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Frontend", items: "React, TypeScript, Tailwind CSS, Next.js" },
              { label: "Backend", items: "Node.js, PostgreSQL, REST APIs, WebSockets" },
              { label: "Tools", items: "Git, TanStack, Vite, Figma" },
            ].map((block, i) => (
              <Reveal key={block.label} delay={0.1 * i}>
                <div className="glass-card rounded-2xl p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-3">{block.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{block.items}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-10">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap pr-16">
          {[...skillsMarquee, ...skillsMarquee].map((s, i) => (
            <span
              key={i}
              className={`font-display text-5xl font-bold sm:text-6xl ${
                i % 2 === 0 ? "text-outline" : "text-foreground/85"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Services */}
      <section id="services" className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
              02 — Capabilities
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              What I <span className="text-gradient">do</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Focused, opinionated engineering across the whole product stack.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={0.08 * i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="glass-card group relative overflow-hidden rounded-2xl p-7"
                >
                  <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="relative inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                    <s.icon className="size-5" />
                  </div>
                  <h3 className="relative mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" ref={projectsRef} className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Reveal>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                  03 — Selected Work
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
                  Case <span className="text-gradient">studies</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <span className="font-mono text-sm text-muted-foreground">
                / 0{projects.length} recent projects
              </span>
            </Reveal>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} progress={projectsProgress} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-1/2 size-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <Reveal>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                  04 — Contact
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter sm:text-6xl">
                  Let's build <br />
                  something <span className="text-gradient italic">extraordinary</span>.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-muted-foreground">
                  Have a project in mind or just want to say hi? Drop me a line — I read every message.
                </p>
              </Reveal>

              <div className="mt-12 space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "haseebbajwa349@gmail.com", href: "mailto:haseebbajwa349@gmail.com" },
                  { icon: Github, label: "GitHub", value: "haseebbajwa349-git", href: "https://github.com/haseebbajwa349-git" },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "Connect on LinkedIn",
                    href: "https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact_info%3BCVK5sB7VQcSV7vgh4TzgEQ%3D%3D",
                  },
                  { icon: MapPin, label: "Based in", value: "Pakistan — Available remote" },
                ].map((item, i) => {
                  const Inner = (
                    <div className="flex items-center gap-5">
                      <div className="grid size-12 place-items-center rounded-full border border-white/10 text-primary transition-colors group-hover:border-primary/60">
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-display text-lg font-semibold text-foreground">{item.value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <Reveal key={item.label} delay={0.05 * i}>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group block">
                          {Inner}
                        </a>
                      ) : (
                        <div className="group">{Inner}</div>
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delay={0.1} y={40}>
              <form
                onSubmit={handleContactSubmit}
                className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-accent/15 blur-3xl" />

                <div className="relative space-y-10">
                  <div className="grid gap-10 sm:grid-cols-2">
                    <div className="field">
                      <input id="name" name="name" type="text" placeholder=" " autoComplete="name" required />
                      <label htmlFor="name">Your Name</label>
                    </div>
                    <div className="field">
                      <input id="email" name="email" type="email" placeholder=" " autoComplete="email" required />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>
                  <div className="field">
                    <input id="subject" name="subject" type="text" placeholder=" " />
                    <label htmlFor="subject">Subject</label>
                  </div>
                  <div className="field">
                    <textarea id="message" name="message" rows={4} placeholder=" " required />
                    <label htmlFor="message">Project Vision</label>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-6 pt-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-primary" />
                      </span>
                      Available for new work
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
                    >
                      <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
                      <span className="relative flex items-center gap-2 transition-colors group-hover:text-background">
                        <Send className="size-4" />
                        Send Message
                      </span>
                    </motion.button>
                  </div>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row lg:px-12">
          <div>© {new Date().getFullYear()} Haseeb Hussain. All rights reserved.</div>
          <div className="font-mono">Designed & built with intent.</div>
        </div>
      </footer>
    </div>
  );
}
