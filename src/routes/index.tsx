import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Code2,
  ExternalLink,
  Sparkles,
  Layers,
  Server,
  Rocket,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import haseebPhoto from "@/assets/haseeb.jpg.asset.json";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haseeb Hussain — Fullstack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Haseeb Hussain, a fullstack developer building real-time and UI-focused web applications.",
      },
      { property: "og:title", content: "Haseeb Hussain — Fullstack Developer" },
      { property: "og:description", content: "Portfolio of Haseeb Hussain, a fullstack developer." },
    ],
  }),
  component: Portfolio,
});

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "TanStack",
  "Tailwind CSS",
  "PostgreSQL",
  "WebSockets",
  "REST APIs",
  "Git",
  "UI/UX",
  "Real-time Systems",
];

const projects = [
  {
    title: "Real-Time Food Ordering App",
    description:
      "Full-stack ordering platform with live order tracking, real-time kitchen updates, and seamless checkout — powered by WebSockets.",
    tags: ["React", "Node.js", "WebSockets", "PostgreSQL"],
  },
  {
    title: "ATM with UI Project",
    description:
      "A modern ATM simulation with a polished interface for balance, deposits, withdrawals, and history — secure flow handling end to end.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
];

const services = [
  { icon: Layers, title: "Frontend Engineering", desc: "Pixel-perfect, responsive interfaces with React, TypeScript and Tailwind." },
  { icon: Server, title: "Backend & APIs", desc: "REST APIs, auth, databases and real-time services that scale cleanly." },
  { icon: Rocket, title: "End-to-End Apps", desc: "From idea to deploy — I design, build and ship the whole product." },
];

const stats = [
  { value: "2+", label: "Years Coding" },
  { value: "15+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "∞", label: "Cups of Chai" },
];

function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const heroRef = useRef<HTMLDivElement>(null);

  // Global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const portraitY = useTransform(heroProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill out every field.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:haseebbajwa349@gmail.com?subject=${subject}&body=${body}`;

    toast.success("Opening your email app…");
    form.reset();
  }

  return (
    <div className="bg-cosmic bg-noise min-h-screen text-foreground">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-accent to-primary"
      />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-display font-semibold tracking-tight">
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
              <Code2 className="size-4" />
            </span>
            <span>Haseeb.dev</span>
          </div>
          <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#projects" className="transition-colors hover:text-foreground">Projects</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-36">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="grid items-center gap-12 md:grid-cols-[1fr_auto]"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Badge
                  variant="secondary"
                  className="mb-6 gap-1.5 border border-primary/30 bg-primary/10 text-primary"
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  Available for work
                </Badge>
              </motion.div>
              <motion.h1
                className="font-display text-5xl font-bold tracking-tight sm:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                Hi, I'm <span className="text-gradient">Haseeb Hussain</span>
              </motion.h1>
              <motion.p
                className="mt-4 text-xl text-muted-foreground sm:text-2xl"
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                Fullstack Developer crafting real-time, modern web apps.
              </motion.p>
              <motion.p
                className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                I build end-to-end web applications with a focus on real-time
                features and clean, intuitive interfaces. Currently going deeper
                into modern fullstack — React, Node.js and system design.
              </motion.p>
              <motion.div
                className="mt-10 flex flex-wrap gap-3"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg">
                    <a href="#projects">
                      View Projects <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#contact">Get in Touch</a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto md:mx-0"
              style={{ y: portraitY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <motion.div
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/40 via-accent/30 to-primary/40 blur-3xl"
                animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <div className="glow-ring relative w-56 overflow-hidden rounded-3xl border border-primary/20 sm:w-72">
                <img
                  src={haseebPhoto.url}
                  alt="Haseeb Hussain portrait"
                  className="h-auto w-full"
                />
              </div>
              {/* floating chips */}
              <motion.div
                className="absolute -left-6 top-8 hidden rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md sm:block"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                ⚡ Realtime
              </motion.div>
              <motion.div
                className="absolute -right-4 bottom-10 hidden rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md sm:block"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.4 }}
              >
                ◇ React · TS
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <StaggerContainer className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <motion.div whileHover={{ scale: 1.04, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-border/60 bg-card/40 p-5 backdrop-blur-sm">
                    <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About / Skills */}
      <section id="about" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <AnimatedSection>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              01 — About
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">About me</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm a fullstack developer who enjoys turning ideas into working
              products. I work across the stack — designing data models, building
              APIs, and crafting interfaces that feel fast and responsive.
            </p>
          </AnimatedSection>
          <StaggerContainer className="mt-8 flex flex-wrap gap-2">
            {skills.map((s) => (
              <StaggerItem key={s}>
                <motion.div whileHover={{ scale: 1.08, y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge
                    variant="outline"
                    className="border-border/70 bg-card/40 px-3 py-1 text-sm backdrop-blur-sm"
                  >
                    {s}
                  </Badge>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <AnimatedSection>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              02 — Services
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What I do</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-3 text-muted-foreground">Things I help teams and clients build.</p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <motion.div whileHover={{ scale: 1.02, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="group relative overflow-hidden border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40">
                    <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                    <div className="relative inline-flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="relative mt-5 font-display text-lg font-semibold">{s.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <AnimatedSection>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              03 — Projects
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Selected work
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-3 text-muted-foreground">A few things I've shipped recently.</p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <StaggerItem key={p.title}>
                <motion.div whileHover={{ scale: 1.015, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="group relative overflow-hidden border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                      <ExternalLink className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <AnimatedSection>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                  04 — Contact
                </p>
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                  Let's <span className="text-gradient">build something</span> together
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <p className="mt-4 max-w-md text-muted-foreground sm:text-lg">
                  Have a project in mind or just want to say hi? Drop me a line —
                  I read every message.
                </p>
              </AnimatedSection>
              <StaggerContainer className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <StaggerItem>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="lg" asChild>
                      <a href="mailto:haseebbajwa349@gmail.com">
                        <Mail className="size-4" /> Email
                      </a>
                    </Button>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="lg" asChild>
                      <a href="https://github.com/haseebbajwa349-git" target="_blank" rel="noreferrer">
                        <Github className="size-4" /> GitHub
                      </a>
                    </Button>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="lg" asChild>
                      <a
                        href="https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact_info%3BCVK5sB7VQcSV7vgh4TzgEQ%3D%3D"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Linkedin className="size-4" /> LinkedIn
                      </a>
                    </Button>
                  </motion.div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <AnimatedSection variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}>
              <Card className="relative overflow-hidden border-border/60 bg-card/50 p-6 backdrop-blur-xl sm:p-8">
                <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-accent/15 blur-3xl" />
                <form onSubmit={handleContactSubmit} className="relative space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Name
                      </label>
                      <Input id="name" name="name" placeholder="Your name" autoComplete="name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Email
                      </label>
                      <Input id="email" name="email" type="email" placeholder="you@email.com" autoComplete="email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project, idea, or just say hi…"
                      required
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Send className="size-4" />
                      Send message
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Haseeb Hussain. All rights reserved.</div>
          <div>Built with React & TanStack.</div>
        </div>
      </footer>
    </div>
  );
}
