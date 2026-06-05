"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData, Project } from "@/config/portfolio";

import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  Compass,
  Folder,
  Cpu,
  Terminal,
  ChevronRight,
  ChevronDown,
  X,
  Maximize2
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TextScramble from "@/components/TextScramble";
import Interactive3D from "@/components/Interactive3D";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSkillGroup, setActiveSkillGroup] = useState<string>("web-dev");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [detailActiveImg, setDetailActiveImg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");


  const worksSectionRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Scroll to section helper using Lenis
  const scrollToSection = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(id, { offset: -50, duration: 1.5 });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open project details with dual panel slide transition curtain
  const handleOpenProjectDetails = (project: Project) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(project);
        // Instant reset curtain position
        gsap.set(".t-panel", { left: "-100%" });
      }
    });

    tl.set(".t-panel", { left: "-100%" })
      .to(".t-panel-dark", { left: "0%", duration: 0.5, ease: "power4.inOut" })
      .to(".t-panel-red", { left: "0%", duration: 0.5, ease: "power4.inOut" }, "-=0.35")
      .to(".t-panel-dark", { left: "100%", duration: 0.4, ease: "power3.in" })
      .to(".t-panel-red", { left: "100%", duration: 0.4, ease: "power3.in" }, "-=0.3");
  };

  // Close project details with reverse slide transition curtain
  const handleCloseProjectDetails = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        gsap.set(".t-panel", { left: "-100%" });
      }
    });

    tl.set(".t-panel", { left: "-100%" })
      .to(".t-panel-red", { left: "0%", duration: 0.4, ease: "power3.out" })
      .to(".t-panel-dark", { left: "0%", duration: 0.4, ease: "power3.out" }, "-=0.25")
      .to(".t-panel-red", { left: "100%", duration: 0.4, ease: "power2.in" })
      .to(".t-panel-dark", { left: "100%", duration: 0.4, ease: "power2.in" }, "-=0.25");
  };

  // Bento Card Cursor Tracker for Hover Glow effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Setup GSAP scroll animations — rich experience
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ─── 1. SCROLL PROGRESS BAR ─────────────────────────────────
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });

      // ─── 2. HERO FADE-UP (staggered) ────────────────────────────
      gsap.from(".hero-fade-up", {
        opacity: 0,
        y: 70,
        stagger: 0.12,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.6,
      });

      // ─── 3. HERO PARALLAX DEPTH LAYERS ──────────────────────────
      gsap.to(".hero-parallax-slow", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to(".hero-parallax-medium", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to(".hero-content-drift", {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "center top",
          end: "bottom top",
          scrub: true,
        }
      });

      // ─── 4. MARQUEE INFINITE SCROLL ──────────────────────────────
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });
      gsap.to(".marquee-inner-reverse", {
        xPercent: 50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });

      // ─── 5. SEQUENCE REVEAL ZOOM ────────────────────────────────
      gsap.fromTo(".sequence-image-card",
        { scale: 0.75, borderRadius: "32px", opacity: 0.5 },
        {
          scale: 1,
          borderRadius: "0px",
          opacity: 1,
          scrollTrigger: {
            trigger: ".sequence-trigger-section",
            start: "top bottom",
            end: "center center",
            scrub: true,
          }
        }
      );
      // Sequence section text pinned slide-in
      gsap.fromTo(".sequence-text",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: ".sequence-trigger-section",
            start: "center bottom",
            end: "center center",
            scrub: 1,
          }
        }
      );

      // ─── 6. SECTION HEADINGS SLIDE UP ────────────────────────────
      gsap.utils.toArray(".section-heading").forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50, skewY: 2 },
          {
            opacity: 1, y: 0, skewY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // ─── 7. STAGGER CARD REVEAL ──────────────────────────────────
      gsap.utils.toArray(".stagger-reveal").forEach((container: any) => {
        const children = container.querySelectorAll(".stagger-item");
        gsap.fromTo(children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // ─── 8. EXPERIENCE TIMELINE ITEMS REVEAL ────────────────────
      gsap.utils.toArray(".experience-item").forEach((el: any, i: number) => {
        gsap.fromTo(el,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.05,
          }
        );
      });

      // ─── 9. HORIZONTAL SCROLL DECK ───────────────────────────────
      const scrollEl = document.querySelector(".horizontal-scroll-content");
      const pinEl = document.querySelector(".horizontal-deck-section");

      if (scrollEl && pinEl) {
        const scrollWidth = (scrollEl as HTMLElement).scrollWidth;
        const screenWidth = window.innerWidth;
        const totalScroll = scrollWidth - screenWidth + 120;

        if (totalScroll > 0) {
          gsap.to(scrollEl, {
            x: -totalScroll,
            ease: "none",
            scrollTrigger: {
              trigger: pinEl,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${totalScroll * 1.2}`,
              invalidateOnRefresh: true,
            }
          });
        }
      }

      // ─── 10. SVG WAVE PATH DRAW ───────────────────────────────────
      const drawPath = document.querySelector(".scroll-draw-path") as SVGPathElement;
      if (drawPath) {
        const length = drawPath.getTotalLength();
        gsap.set(drawPath, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(drawPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#works",
            start: "top bottom",
            end: "center center",
            scrub: 0.8,
          }
        });
      }

      // ─── 11. ABOUT SECTION REVEAL ─────────────────────────────────
      gsap.from(".about-reveal-text", {
        opacity: 0, y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-trigger",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
      gsap.to(".about-photo-parallax", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-photo-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // ─── 12. SKILLS STAGGER ───────────────────────────────────────
      gsap.utils.toArray(".skill-tag").forEach((el: any, i: number) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            delay: (i % 6) * 0.04,
          }
        );
      });

      // ─── 13. MAGNETIC ELEMENTS ────────────────────────────────────
      const magneticEls = document.querySelectorAll(".magnetic");
      magneticEls.forEach((el) => {
        el.addEventListener("mousemove", (e: any) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1.1, 0.4)" });
        });
      });

    });

    return () => ctx.revert();
  }, []);


  // Track coordinates for project catalog floating preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredProject) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredProject]);

  // Handle detail overlay scroll settings
  useEffect(() => {
    if (selectedProject) {
      setDetailActiveImg(selectedProject.coverImage);
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop();
      document.body.classList.add("overflow-hidden");
    } else {
      setDetailActiveImg(null);
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedProject]);

  return (
    <main className="relative min-h-screen">
      {/* ── SCROLL PROGRESS BAR (fixed top) ── */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-neutral-900">
        <div
          className="scroll-progress-bar h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 origin-left shadow-[0_0_8px_rgba(230,57,70,0.8)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      {/* Dynamic Slide Transition Panels Curtain */}
      <div className="t-panel t-panel-dark" />
      <div className="t-panel t-panel-red" />

      {/* Immersive Blurred Hover Background Cover Transition */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {portfolioData.projects.map((proj) => {
          const isActive = hoveredProject?.id === proj.id;
          return (
            <div
              key={proj.id}
              className="absolute inset-0 transition-all duration-[1000ms] ease-in-out"
              style={{
                opacity: isActive ? 0.16 : 0,
                transform: isActive ? "scale(1.08)" : "scale(1.0)",
              }}
            >
              <Image
                src={proj.coverImage}
                alt=""
                fill
                className="object-cover blur-[90px] md:blur-[130px] saturate-150"
                priority
              />
            </div>
          );
        })}
      </div>

      {/* Noise background texture overlay */}
      <div className="noise-overlay" />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden">

        {/* 3D animated background canvas */}
        <div className="hero-parallax-slow absolute inset-0 z-0 pointer-events-none">
          <Interactive3D />
        </div>

        <header className="hero-fade-up sticky top-0 z-40 w-full select-none">
          <div className="flex items-center justify-between px-6 md:px-12 h-16 border-b border-neutral-900/80 bg-[#080808]/70 backdrop-blur-xl">

            {/* Logo / Monogram */}
            <div
              className="flex items-center gap-2.5 cursor-pointer magnetic group"
              onClick={() => scrollToSection("hero")}
            >
              <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center shadow-[0_0_18px_rgba(230,57,70,0.5)] group-hover:shadow-[0_0_28px_rgba(230,57,70,0.7)] transition-shadow duration-300">
                <span className="font-display-heavy text-white text-sm tracking-tight">SK</span>
              </div>
              <span className="font-display-heavy text-[#F5F5F7] text-base tracking-tight hidden sm:block">
                Srivatsa<span className="text-red-500"> K</span>
              </span>
            </div>

            {/* Center Nav Links */}
            <nav className="hidden md:flex items-center gap-1 bg-neutral-900/50 border border-neutral-800/60 rounded-full px-2 py-1.5">
              {[
                { label: "Work", id: "works" },
                { label: "Experience", id: "experience" },
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-[#F5F5F7] hover:bg-neutral-800/80 transition-all duration-200 magnetic"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right — Status + Socials */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Available</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-500">
                <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="hover:text-[#F5F5F7] transition-colors magnetic p-2 rounded-lg hover:bg-neutral-800/60">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#F5F5F7] transition-colors magnetic p-2 rounded-lg hover:bg-neutral-800/60">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href={`mailto:${portfolioData.email}`} className="hover:text-[#F5F5F7] transition-colors magnetic p-2 rounded-lg hover:bg-neutral-800/60">
                  <Mail size={16} />
                </a>
                <a href={`tel:${portfolioData.phone}`} className="hover:text-[#F5F5F7] transition-colors magnetic p-2 rounded-lg hover:bg-neutral-800/60">
                  <Phone size={16} />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* ── HERO CONTENT ── */}
        <div className="hero-content-drift flex-1 flex flex-col justify-center px-8 md:px-16 py-12 z-10 select-none">
          <div className="hero-fade-up flex items-center gap-3 mb-8">
            <span className="border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              Full Stack · Mobile · ML Engineer
            </span>
            <span className="text-neutral-600 font-mono text-xs">{portfolioData.location}</span>
          </div>
          <h1 className="hero-fade-up font-display-heavy text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-[#F5F5F7] mb-8">
            <TextScramble text="SRIVATSA K." triggerOnHover={true} />
          </h1>
          <div className="hero-fade-up text-xl md:text-3xl font-light leading-snug text-neutral-400 font-sans tracking-tight max-w-2xl">
            {portfolioData.tagline}{" "}
            <span className="text-red-500 font-display-heavy italic">{portfolioData.taglineSecondary}</span>
          </div>
          <div className="hero-fade-up flex flex-wrap items-center gap-4 mt-10">
            <a href="#works" onClick={(e) => { e.preventDefault(); scrollToSection("works"); }}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(230,57,70,0.35)] hover:shadow-[0_0_30px_rgba(230,57,70,0.55)] magnetic">
              View My Work <ArrowUpRight size={14} />
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
              className="inline-flex items-center gap-2 border border-neutral-700 hover:border-red-500 text-neutral-400 hover:text-[#F5F5F7] font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 magnetic">
              Get In Touch <Mail size={14} />
            </a>
          </div>
        </div>

        {/* ── BOTTOM STATUS BAR ── */}
        <div className="hero-fade-up px-8 md:px-16 pb-8 z-10 select-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-neutral-900">
            <span className="text-xs text-neutral-600 font-mono tracking-widest uppercase">{portfolioData.version} / Creative Developer</span>
            <div className="flex items-center gap-6 text-xs text-neutral-600 font-mono tracking-widest uppercase">
              <span>React · Next.js · React Native · Python</span>
              <span className="hidden md:flex items-center gap-2 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Bengaluru, India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER 1 — between hero & sequence ── */}
      <div className="overflow-hidden bg-red-500/5 border-y border-red-500/20 py-3 select-none">
        <div className="marquee-inner flex items-center gap-12 whitespace-nowrap" style={{ width: "200%" }}>
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-12">
              {["Full Stack", "React Native", "Python", "Machine Learning", "AWS EC2", "PostgreSQL", "Next.js", "Docker", "Keliri · Chipzo · MelaCelebrations · GoodKart", "Open to Work"].map((txt, i) => (
                <span key={i} className="text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-5">
                  {txt}
                  <span className="w-1 h-1 rounded-full bg-red-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. SCROLL SEQUENCE REVEAL SECTION */}
      <section className="sequence-trigger-section relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center items-center bg-[#050505] overflow-hidden">
        <div className="sequence-image-card absolute inset-0 w-full h-full opacity-35 z-0">
          <Image
            src="/projects/cyberdiag.png"
            alt="Sequence Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />

        <div className="sequence-text relative z-10 text-center px-4 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-red-500 font-mono mb-4">Core Philosophy</div>
          <h2 className="section-heading font-display-heavy text-4xl md:text-7xl tracking-tighter leading-none uppercase">
            Designing fluid digital motion, frame by frame.
          </h2>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="about-trigger py-20 md:py-32 px-8 md:px-16 border-t border-neutral-900 grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
        <div className="flex flex-col justify-between">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-widest text-red-500 font-mono mb-6">About Me</div>
            <h3 className="about-reveal-text font-display-heavy tracking-tight leading-none text-[#F5F5F7] mb-8">
              <span className="text-4xl md:text-5xl block font-display-heavy mb-3">Bangalore Institute of Technology</span>
              <span className="text-lg md:text-2xl text-neutral-450 font-normal font-sans tracking-tight block">
                (Computer Science Engineering and Data Science)
              </span>
            </h3>
            <p className="text-neutral-400 font-light leading-relaxed text-base md:text-lg mb-8">
              {portfolioData.bioSubhead}
            </p>
          </div>

          <div
            className="glow-card border border-neutral-800 p-6 rounded-xl max-w-md relative select-none"
            onMouseMove={handleCardMouseMove}
          >
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />

            <div className="glow-card-content">
              <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-3 flex items-center">
                <Terminal size={14} className="mr-2" /> System Diagnosis
              </div>
              <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                <li>• STACK: React / Next.js / GSAP / Lenis</li>
                <li>• ENVIRONMENT: Headless Architecture</li>
                <li>• METHODOLOGY: Motion-first Interactive Spec</li>
                <li>• HOSTING: Vercel Edge Server Node</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end items-center">
          <div className="about-photo-wrap relative w-full max-w-md aspect-[3/4] border border-neutral-800 rounded-2xl overflow-hidden glass-card">
            <div className="about-photo-parallax absolute inset-0 w-full h-[120%]">
              <Image
                src="/profile.png"
                alt={portfolioData.name}
                fill
                className="object-cover opacity-80"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 3.5 EXPERIENCE SECTION */}

      {/* ── MARQUEE TICKER 2 — between about & experience ── */}
      <div className="overflow-hidden bg-neutral-900/60 border-y border-neutral-800/40 py-2.5 select-none">
        <div className="marquee-inner-reverse flex items-center gap-10 whitespace-nowrap" style={{ width: "200%" }}>
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-10">
              {["Bangalore Institute of Technology", "Computer Science & Data Science", "2022 — 2026", "CGPA: 8.2", "Open Source", "Hackathons", "Research", "Leadership"].map((txt, i) => (
                <span key={i} className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-600 flex items-center gap-6">
                  {txt}
                  <span className="w-0.5 h-3 bg-neutral-700" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="experience" className="py-20 md:py-32 px-8 md:px-16 border-t border-neutral-900 bg-[#050505]/40 backdrop-blur-sm relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-red-500 font-mono mb-6">Professional Experience</div>
            <h3 className="section-heading font-display-heavy text-3xl md:text-5xl uppercase tracking-tighter">
              <TextScramble text="MY JOURNEY" />
            </h3>
          </div>

          <div className="relative border-l border-neutral-800 pl-6 md:pl-8 space-y-12">
            {portfolioData.experiences.map((exp, index) => (
              <div key={index} className="experience-item relative group">
                {/* Glowing node point */}
                <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-red-500 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </span>

                <div className="glow-card p-6 md:p-8 rounded-xl relative" onMouseMove={handleCardMouseMove}>
                  <span className="frame-corner tl" />
                  <span className="frame-corner tr" />
                  <span className="frame-corner bl" />
                  <span className="frame-corner br" />

                  <div className="glow-card-content">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                      <div>
                        <h4 className="font-display-heavy text-xl text-[#F5F5F7] group-hover:text-red-500 transition-colors">
                          {exp.role}
                        </h4>
                        <span className="font-mono text-sm text-neutral-400">{exp.company}</span>
                      </div>
                      <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-xs px-3.5 py-1.5 rounded w-fit self-start">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="space-y-3 text-xs md:text-sm text-neutral-400 font-sans leading-relaxed list-disc pl-4">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PINNED HORIZONTAL PROJECTS DECK */}
      <section className="horizontal-deck-section relative min-h-screen bg-[#050505]/60 backdrop-blur-sm overflow-hidden flex flex-col justify-center border-t border-neutral-900">
        <div className="absolute top-12 left-8 md:left-16 z-25 flex flex-col">
          <span className="text-xs uppercase tracking-widest text-red-500 font-mono mb-2">Featured Work</span>
          <h3 className="font-display-heavy text-3xl md:text-5xl uppercase tracking-tighter">
            <TextScramble text="PROJECT DECK" />
          </h3>
        </div>

        <div className="horizontal-scroll-content flex space-x-8 px-8 md:px-16 mt-20 md:mt-28">
          {portfolioData.projects.map((project, idx) => {
            const isAppProject = project.category === "App Development";
            return (
              <div
                key={project.id + "-deck"}
                className="relative flex-shrink-0 w-[300px] md:w-[450px] aspect-[4/3] group border border-neutral-800 rounded-2xl overflow-hidden glass-card cursor-pointer"
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleOpenProjectDetails(project)}
              >
                {/* Background for app projects with portrait screenshots */}
                {isAppProject && (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-[#0d0d16] to-[#080808]" />
                )}
                <div className="absolute inset-0 z-10 bg-[#080808]/30 group-hover:bg-[#080808]/10 transition-colors duration-300" />
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className={`transition-transform duration-500 group-hover:scale-105 ${isAppProject ? "object-contain p-4" : "object-cover"
                    }`}
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">0{idx + 1} / {project.category}</span>
                    <h4 className="font-display-heavy text-lg md:text-xl tracking-tight text-[#F5F5F7] mt-1">
                      <TextScramble text={project.title} triggerOnHover={true} />
                    </h4>
                  </div>
                  <div className="bg-[#080808]/80 border border-neutral-800 p-2.5 rounded-full text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WORKS LIST & HOVER PREVIEW SECTION */}
      <section id="works" className="py-20 md:py-32 px-8 md:px-16 border-t border-neutral-900 relative">
        {/* Scroll Drawing Wave SVG Path */}
        <svg className="scroll-draw-svg top-[-80px] left-0 w-full h-[160px]" viewBox="0 0 1400 160" preserveAspectRatio="none">
          <path
            className="scroll-draw-path"
            d="M 0,80 C 350,15 700,145 1050,45 T 1400,80"
          />
        </svg>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 relative z-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-red-500 font-mono mb-4">Complete Catalog</div>
            <h3 className="font-display-heavy text-3xl md:text-5xl uppercase tracking-tighter">
              <TextScramble text="WORKS SELECT" />
            </h3>
          </div>
          <span className="text-neutral-500 text-xs font-mono tracking-widest uppercase mt-4 md:mt-0 select-none">
            [ Hover list for preview ]
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 relative z-10 select-none">
          {["All", "Web Development", "App Development", "Machine Learning"].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${isActive
                    ? "bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]"
                    : "bg-[#050505]/40 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-[#F5F5F7]"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects hover list */}
        <div className="border-t border-neutral-900 select-none relative z-10">
          {portfolioData.projects
            .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
            .map((project, idx) => (
              <div
                key={project.id}
                className="proj-item group relative py-8 md:py-12 border-b border-neutral-950 flex justify-between items-center cursor-pointer transition-all duration-300 hover:px-6 hover:bg-neutral-900/10"
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleOpenProjectDetails(project)}
              >
                <div className="flex items-center space-x-6 md:space-x-12">
                  <span className="text-xs font-mono text-neutral-600">0{idx + 1}</span>
                  <h4 className="font-display-heavy text-2xl md:text-5xl tracking-tighter transition-all duration-300 group-hover:text-red-500">
                    <TextScramble text={project.title} triggerOnHover={true} />
                  </h4>
                </div>
                <div className="flex items-center space-x-6 text-right font-mono text-xs text-neutral-500">
                  <span className="hidden md:inline-block uppercase tracking-wider">{project.category}</span>
                  <span>{project.year}</span>
                  <span className="text-neutral-700 group-hover:text-red-500 transition-colors duration-300">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Floating cursor project cover preview */}
        {hoveredProject && (
          <div
            ref={previewRef}
            className={`fixed pointer-events-none z-30 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl glass-card w-60 h-40 md:w-80 md:h-52 ${hoveredProject.category === "App Development" ? "bg-gradient-to-br from-neutral-900 via-[#0d0d16] to-[#080808]" : ""
              }`}
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            <Image
              src={hoveredProject.coverImage}
              alt="Floating preview"
              fill
              className={hoveredProject.category === "App Development" ? "object-contain p-3" : "object-cover"}
            />
          </div>
        )}
      </section>

      {/* 6. BENTO GRID SKILLS */}
      <section className="py-20 md:py-32 px-8 md:px-16 border-t border-neutral-900 bg-[#050505]/60 backdrop-blur-sm relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left info column */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-red-500 font-mono mb-4">Abilities Matrix</span>
              <h3 className="font-display-heavy text-3xl md:text-5xl uppercase tracking-tighter mb-6">
                <TextScramble text="SKILLS BENTO" />
              </h3>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-md mb-8">
                A modular breakdown of core developer stacks, digital styling engines, system engineering and cybersecurity diagnostics tools.
              </p>
            </div>

            <div
              className="group border border-neutral-800 p-6 rounded-xl glass-card flex justify-between items-center cursor-pointer select-none transition-colors hover:border-red-500/50"
              onClick={() => scrollToSection("contact")}
            >
              <div>
                <div className="text-xs font-mono uppercase text-neutral-500">Need specific custom stacks?</div>
                <div className="font-display-heavy text-lg uppercase tracking-tight text-[#F5F5F7] mt-1">Let's build together</div>
              </div>
              <div className="bg-[#080808]/80 border border-neutral-800 p-2.5 rounded-full text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all magnetic">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>

          {/* Right bento grid list with tracking borders */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioData.skills.map((group) => {
              const isOpen = activeSkillGroup === group.id;
              return (
                <div
                  key={group.id}
                  className={`glow-card rounded-xl p-6 relative cursor-pointer select-none transition-all duration-300 ${isOpen ? "md:col-span-2" : ""
                    }`}
                  onMouseMove={handleCardMouseMove}
                  onClick={() => setActiveSkillGroup(group.id)}
                >
                  <span className="frame-corner tl" />
                  <span className="frame-corner tr" />
                  <span className="frame-corner bl" />
                  <span className="frame-corner br" />

                  <div className="glow-card-content">
                    <div className="flex justify-between items-center">
                      <h4 className="font-display-heavy text-lg uppercase tracking-tight text-[#F5F5F7] flex items-center">
                        {group.id === "web-dev" && <Compass size={16} className="mr-2 text-red-500" />}
                        {group.id === "app-dev" && <Folder size={16} className="mr-2 text-red-500" />}
                        {group.id === "ml-ai" && <Cpu size={16} className="mr-2 text-red-500" />}
                        {group.id === "devops-tools" && <Terminal size={16} className="mr-2 text-red-500" />}
                        {group.title}
                      </h4>
                      <span className="text-neutral-500 transition-transform duration-300">
                        {isOpen ? <ChevronDown size={18} className="rotate-180" /> : <ChevronRight size={18} />}
                      </span>
                    </div>

                    <div
                      className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-neutral-900 border border-neutral-800 text-[#F5F5F7] font-mono text-xs px-3 py-1.5 rounded-md hover:border-red-500 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. AWARDS & MILESTONES */}
      <section className="py-20 md:py-32 px-8 md:px-16 border-t border-neutral-900 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-red-500 font-mono mb-4">Milestone achievements</span>
            <h3 className="font-display-heavy text-3xl md:text-5xl uppercase tracking-tighter">
              <TextScramble text="RECOGNITIONS" />
            </h3>
          </div>
        </div>

        <div className="border-t border-neutral-900">
          {portfolioData.awards.map((award, i) => (
            <div
              key={award.org + "-" + i}
              className="py-6 border-b border-neutral-900 flex flex-col md:flex-row justify-between md:items-center text-sm font-mono text-neutral-400"
            >
              <div className="flex items-center space-x-4 mb-2 md:mb-0">
                <span className="text-red-500 font-bold uppercase">{award.org}</span>
                <span className="text-neutral-700">/</span>
                <span className="text-neutral-500 font-light">{award.site}</span>
              </div>
              <div className="flex justify-between md:space-x-12">
                <span className="text-[#F5F5F7]">{award.prize}</span>
                <span className="text-neutral-600">{award.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT & FOOTER */}
      <section id="contact" className="py-20 md:py-32 px-8 md:px-16 border-t border-neutral-900 relative bg-[#050505]/60 backdrop-blur-sm overflow-hidden">
        {/* Animated ambient glowing blob */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-red-700 opacity-15 filter blur-[100px] animate-pulse-slow pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-red-500 font-mono mb-4">Get In Touch</span>
            <h3 className="font-display-heavy text-4xl md:text-6xl uppercase tracking-tighter mb-8 leading-none">
              Let's create<br />something iconic<span className="text-red-500">.</span>
            </h3>
            <p className="text-neutral-400 font-light leading-relaxed text-base md:text-lg max-w-md mb-8">
              Open for creative collaborations, freelance contracts, and software engineering opportunities. Drop a mail or connect via channels.
            </p>

            <a
              href={`mailto:${portfolioData.email}`}
              className="inline-flex items-center font-display-heavy text-xl md:text-3xl tracking-tight text-[#F5F5F7] border-b border-red-500 hover:text-red-500 transition-colors pb-1 magnetic"
            >
              {portfolioData.email} <ArrowUpRight className="ml-3" size={24} />
            </a>

            <a
              href={`tel:${portfolioData.phone}`}
              className="inline-flex items-center font-mono text-base md:text-lg text-neutral-400 hover:text-[#F5F5F7] transition-colors mt-4 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-3" />
              {portfolioData.phone}
            </a>
          </div>

          <div className="flex flex-col space-y-8 justify-center">
            {/* Visual Art Panels */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square border border-neutral-800 rounded-xl overflow-hidden glass-card p-2 select-none group">
                <span className="frame-corner tl" />
                <span className="frame-corner tr" />
                <span className="frame-corner bl" />
                <span className="frame-corner br" />
                <Image
                  src="/art1.png"
                  alt="Art frame 1"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-square border border-neutral-800 rounded-xl overflow-hidden glass-card p-2 select-none group">
                <span className="frame-corner tl" />
                <span className="frame-corner tr" />
                <span className="frame-corner bl" />
                <span className="frame-corner br" />
                <Image
                  src="/art2.png"
                  alt="Art frame 2"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer ASCII & Trademark */}
        <div className="mt-32 pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-mono gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <pre className="text-[6px] md:text-[8px] leading-tight text-neutral-800 select-none pointer-events-none">
              {`   ___ ___ _____   __ _ ___ 
  / __| _ \\_ _\\ \\ / //_\\ __|
  \\__ \\   /| | \\ V // _ \\__ \\
  |___/_|_\\___| \\_//_/ \\_\\___/`}
            </pre>
            <span className="mt-4">© 2026 SRIVATSA K. All Rights Reserved.</span>
          </div>

          <nav className="flex space-x-6 text-[10px] uppercase font-bold tracking-widest select-none">
            <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors magnetic px-2 py-1">Github</a>
            <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors magnetic px-2 py-1">LinkedIn</a>
            <a href={`mailto:${portfolioData.email}`} className="hover:text-red-500 transition-colors magnetic px-2 py-1">Email</a>
            <a href={`tel:${portfolioData.phone}`} className="hover:text-red-500 transition-colors magnetic px-2 py-1">Phone</a>
          </nav>
        </div>
      </section>

      {/* 9. FULL-SCREEN PROJECT DETAIL OVERLAY */}
      {selectedProject && (
        <section className="fixed inset-0 w-full h-full bg-[#080808] z-50 overflow-y-auto flex flex-col justify-between select-none animate-fade-in">
          {/* Top Control Bar */}
          <div className="sticky top-0 bg-[#080808]/90 backdrop-blur-md border-b border-neutral-900 p-6 flex justify-between items-center z-50">
            <div className="font-mono text-xs uppercase text-neutral-500">
              Project Archive / {selectedProject.category}
            </div>

            <button
              onClick={handleCloseProjectDetails}
              className="bg-neutral-900 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-white p-2 rounded-full transition-colors cursor-pointer magnetic flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Info Blocks */}
          <div className="p-8 md:p-16 max-w-6xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-between">
              <div>
                <span className="bg-neutral-900 border border-neutral-800 text-red-500 font-mono text-xs px-3 py-1 rounded-md">
                  {selectedProject.year}
                </span>

                <h1 className="font-display-heavy text-4xl md:text-6xl uppercase tracking-tighter text-[#F5F5F7] mt-6 mb-8 leading-none">
                  {selectedProject.title}
                </h1>

                <p className="text-neutral-400 font-light leading-relaxed text-base md:text-lg mb-8">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div>
                <div className="text-xs uppercase font-mono text-neutral-500 tracking-wider mb-3">Technologies deployed</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400 px-3 py-1.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Image Gallery showcase */}
            <div className="flex flex-col space-y-6">
              <div className={`relative w-full border border-neutral-800 rounded-2xl overflow-hidden glass-card shadow-xl ${selectedProject.category === "App Development" ? "aspect-[4/3] bg-gradient-to-br from-neutral-900 via-[#0d0d16] to-[#080808]" : "aspect-video"
                }`}>
                <Image
                  src={detailActiveImg || selectedProject.coverImage}
                  alt={selectedProject.title}
                  fill
                  className={selectedProject.category === "App Development" ? "object-contain p-6" : "object-cover"}
                  priority
                />
              </div>

              {/* Thumbnails list */}
              <div className="flex space-x-4">
                {selectedProject.images.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setDetailActiveImg(imgUrl)}
                    className={`relative w-24 aspect-video border rounded-lg overflow-hidden transition-all cursor-pointer ${selectedProject.category === "App Development" ? "bg-neutral-900" : ""
                      } ${(detailActiveImg === imgUrl || (!detailActiveImg && imgUrl === selectedProject.coverImage))
                        ? "border-red-500 opacity-100 scale-95"
                        : "border-neutral-800 opacity-50"
                      }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${i}`}
                      fill
                      className={selectedProject.category === "App Development" ? "object-contain p-1" : "object-cover"}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="bg-[#050505] border-t border-neutral-900 p-8 flex justify-center items-center">
            <button
              onClick={handleCloseProjectDetails}
              className="bg-neutral-900 border border-neutral-800 hover:border-red-500 text-[#F5F5F7] font-mono text-xs px-8 py-3 rounded-full uppercase tracking-wider transition-colors cursor-pointer magnetic"
            >
              Return to Catalog
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
