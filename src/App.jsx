import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Experience from './scene/Experience.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const projects = [
  {
    id: 'aegis',
    number: '01',
    title: 'Aegis',
    eyebrow: 'Governed Personal Intelligence',
    description: 'A personal intelligence platform designed around evidence, user control, privacy boundaries, local-first options, and deliberate action.',
    tags: ['Governed AI', 'Local-first', 'Automation'],
  },
  {
    id: 'optima',
    number: '02',
    title: 'Optima',
    eyebrow: 'Decision Intelligence & Optimization',
    description: 'Optimization tools that turn real-world constraints into transparent recommendations for location, allocation, routing, scheduling, and more.',
    tags: ['Operations Research', 'Decision Support', 'Optimization'],
  },
]

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Zicotix home">
      <span className="brand-mark" aria-hidden="true">Z</span>
      <span>Zicotix</span>
    </a>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Work', '#work'],
    ['Aegis', '#aegis'],
    ['Projects', '#work'],
    ['About', '#about'],
    ['Contact', '#contact'],
  ]

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Primary navigation">
        <Logo />
        <button className="menu-button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
        <a className="pill nav-cta" href="#contact">Let's Build <span>→</span></a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-canvas" aria-hidden="true">
        <Experience />
      </div>
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content">
        <p className="kicker" data-reveal>Z I C O T I X</p>
        <h1 data-reveal>
          Building intelligent<br />
          systems that<br />
          <span>actually do things.</span>
        </h1>
        <p className="hero-copy" data-reveal>
          We turn ambitious ideas into intelligent systems — from governed personal AI to optimization tools and automation.
        </p>
        <div className="hero-actions" data-reveal>
          <a className="pill pill-primary" href="#work">Explore Work <span>→</span></a>
          <a className="pill" href="#about">About Zicotix</a>
        </div>
        <div className="hero-trail" data-reveal aria-label="Ideas to systems to impact">
          <span>Ideas</span><b>›</b><span>Systems</span><b>›</b><span>Real-world impact</span>
        </div>
      </div>
      <div className="drag-hint">Drag the Z</div>
    </section>
  )
}

function ProjectSection({ project, index }) {
  return (
    <article className={`project project-${project.id}`} id={project.id}>
      <div className="project-glow" aria-hidden="true" />
      <div className="project-grid">
        <div className="project-copy" data-reveal>
          <div className="project-topline">
            <span className="project-icon">{index === 0 ? '◇' : '✦'}</span>
            <span className="project-number">{project.number}</span>
          </div>
          <h2>{project.title}</h2>
          <p className="project-eyebrow">{project.eyebrow}</p>
          <p className="project-description">{project.description}</p>
          <a className="text-link" href="#contact">Learn more <span>→</span></a>
          <div className="tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="project-art" aria-hidden="true">
          {project.id === 'aegis' ? (
            <div className="aegis-orb">
              <span className="orb-ring" />
              <span className="orb-beam" />
            </div>
          ) : (
            <div className="monoliths">
              {[0, 1, 2, 3].map((i) => <span key={i} style={{ '--i': i }} />)}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function FocusAreas() {
  const items = [
    ['Governed Intelligence', 'Systems built around evidence, privacy, user control, and deliberate action.'],
    ['Optimization & Decision Support', 'Tools that help make better choices across routing, allocation, scheduling, and strategy.'],
    ['Automation & Applied Systems', 'Practical software, workflows, and infrastructure that turn ideas into repeatable results.'],
  ]

  return (
    <section className="focus section" id="focus">
      <div className="section-heading" data-reveal>
        <p className="kicker">W H A T &nbsp; W E &nbsp; B U I L D</p>
        <h2>Intelligence with a reason to exist.</h2>
      </div>
      <div className="focus-grid">
        {items.map(([title, body], i) => (
          <article className="focus-card" key={title} data-reveal>
            <span className="focus-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about section" id="about">
      <div className="about-sky" aria-hidden="true" />
      <div className="about-grid">
        <div data-reveal>
          <p className="kicker"><span className="line" /> A B O U T &nbsp; Z I C O T I X</p>
          <h2>A smaller, more ambitious kind of studio.</h2>
          <p>Zicotix explores what's possible at the intersection of intelligent software, automation, analytics, and human judgment. The focus is simple: build systems that are useful, understandable, and worth trusting.</p>
          <a className="pill" href="#contact">Our Story <span>→</span></a>
        </div>
        <div className="about-stat" data-reveal><strong>2+</strong><span>Flagship Projects</span></div>
        <div className="about-stat" data-reveal><strong>∞</strong><span>Bigger Things Ahead</span></div>
        <blockquote data-reveal>“A more intelligent tomorrow.”<cite>— Zicotix</cite></blockquote>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact-panel" data-reveal>
        <div>
          <p className="kicker">G E T &nbsp; I N &nbsp; T O U C H</p>
          <h2>Let's build what's next.</h2>
          <p>Have an idea, a question, or want to collaborate? Start the conversation.</p>
        </div>
        <a className="pill pill-primary" href="mailto:zicotixai@protonmail.com">Send a Message <span>→</span></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <div className="footer-links">
        <a href="#work">Work</a><a href="#aegis">Aegis</a><a href="#about">About</a><a href="#contact">Contact</a>
      </div>
      <p>Building a more intelligent tomorrow.<br />© {new Date().getFullYear()} Zicotix.</p>
    </footer>
  )
}

export default function App() {
  const app = useRef()

  useGSAP(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    })

    gsap.to('.hero-canvas', {
      yPercent: 9,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    })

    gsap.utils.toArray('.project-art').forEach((art) => {
      gsap.fromTo(art, { xPercent: 4 }, {
        xPercent: -2,
        ease: 'none',
        scrollTrigger: { trigger: art.closest('.project'), start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })
  }, { scope: app })

  return (
    <div className="app" ref={app}>
      <Navbar />
      <main>
        <Hero />
        <section className="work" id="work">
          <div className="work-heading" data-reveal>
            <p className="kicker"><span className="line" /> S E L E C T E D &nbsp; P R O J E C T S</p>
            <span>Big ideas.<br />Real systems.</span>
          </div>
          {projects.map((project, i) => <ProjectSection key={project.id} project={project} index={i} />)}
        </section>
        <FocusAreas />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
