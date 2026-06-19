import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Moon, Sun, Code2, ExternalLink, Sparkles, Layers, Server, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haseeb Hussain — Fullstack Developer" },
      { name: "description", content: "Portfolio of Haseeb Hussain, a fullstack developer building real-time and UI-focused web applications." },
      { property: "og:title", content: "Haseeb Hussain — Fullstack Developer" },
      { property: "og:description", content: "Portfolio of Haseeb Hussain, a fullstack developer." },
    ],
  }),
  component: Portfolio,
});

const skills = ["React", "TypeScript", "Node.js", "Next.js", "TanStack", "Tailwind CSS", "PostgreSQL", "WebSockets", "REST APIs", "Git", "UI/UX", "Real-time Systems"];

const projects = [
  {
    title: "Real-Time Food Ordering App",
    description: "A full-stack food ordering platform with live order tracking, real-time kitchen updates, and seamless checkout. Built with WebSockets for instant communication between customers, restaurants, and delivery.",
    tags: ["React", "Node.js", "WebSockets", "PostgreSQL"],
  },
  {
    title: "ATM with UI Project",
    description: "A modern ATM simulation featuring a polished interface for balance inquiry, deposits, withdrawals, and transaction history. Focused on smooth UX and secure flow handling.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
];

const services = [
  { icon: Layers, title: "Frontend Engineering", desc: "Pixel-perfect, responsive interfaces built with React, TypeScript and Tailwind." },
  { icon: Server, title: "Backend & APIs", desc: "REST APIs, auth, databases and real-time services that scale cleanly." },
  { icon: Rocket, title: "End-to-End Apps", desc: "From idea to deploy — I design, build, and ship the whole product." },
];

const stats = [
  { value: "2+", label: "Years Coding" },
  { value: "15+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "∞", label: "Cups of Chai" },
];

function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bg-cosmic bg-grid min-h-screen text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Code2 className="size-5 text-primary" />
            <span>Haseeb.dev</span>
          </div>
          <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
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
      <section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-36">
        <Badge variant="secondary" className="mb-6 gap-1.5">
          <Sparkles className="size-3" /> Available for work
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Hi, I'm <span className="text-gradient">Haseeb Hussain</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
          Fullstack Developer crafting real-time, modern web apps.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          I build end-to-end web applications with a focus on real-time features and clean,
          intuitive interfaces. Currently going deeper into modern fullstack skills —
          sharpening my React, Node.js, and system design.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#projects">View Projects</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="border-border/60 bg-card/40 p-5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* About / Skills */}
      <section id="about" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About me</h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I'm a fullstack developer who enjoys turning ideas into working products.
            I work across the stack — designing data models, building APIs, and crafting
            interfaces that feel fast and responsive. Right now I'm going deeper into
            the skills below.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s} variant="outline" className="border-border/70 bg-card/40 px-3 py-1 text-sm backdrop-blur-sm">{s}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I do</h2>
          <p className="mt-3 text-muted-foreground">Things I help teams and clients build.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="group border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40">
                <div className="inline-flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h2>
          <p className="mt-3 text-muted-foreground">Selected work I've built recently.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <Card key={p.title} className="group border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <ExternalLink className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Let's <span className="text-gradient">build something</span> together
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Have a project in mind or just want to say hi? My inbox is open.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button size="lg" asChild>
                <a href="mailto:hseebbajwa349@gmail.com">
                  <Mail className="size-4" /> hseebbajwa349@gmail.com
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/haseebbajwa349-git" target="_blank" rel="noreferrer">
                  <Github className="size-4" /> GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://www.linkedin.com/in/haseeb-bajwa-69b748361/" target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              </Button>
            </div>
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
