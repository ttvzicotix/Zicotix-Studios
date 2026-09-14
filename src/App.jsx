import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion, useSceneVisibility } from './hooks/useMotionPreference.js'
import './restoration.css'
import './polish.css'
import ProjectDetails from './components/ProjectDetails.jsx'
import ContactForm from './components/ContactForm.jsx'
import StudioDetails from './components/StudioDetails.jsx'
import SocialLinks from './components/SocialLinks.jsx'
import FAQ from './components/FAQ.jsx'
import { site } from './data/site.js'
import { copyText } from './lib/contact.js'

const Experience = lazy(() => import('./scene/Experience.jsx'))
gsap.registerPlugin(ScrollTrigger, useGSAP)
const art = (name) => `${import.meta.env.BASE_URL}art/${name}.webp`

const projects = [
  {
    id: 'aegis', number: '01', title: 'Aegis',
    eyebrow: 'Governed Personal Intelligence',
    description: 'A personal intelligence platform designed around evidence, user control, privacy boundaries, local-first options, and deliberate action.',
    tags: ['Governed AI', 'Local-first', 'Automation'],
  },
  {
    id: 'optima', number: '02', title: 'Optima',
    eyebrow: 'Decision Intelligence & Optimization',
    description: 'Visual decision support for real-world constraints. Starting with facility location, with routing, allocation, and scheduling on the roadmap.',
    tags: ['Operations Research', 'Decision Support', 'Optimization'],
  },
]

function Logo() {
  // Original vector silhouette from the approved portfolio, not a font glyph.
  return (
    <a className="brand" href="#top" aria-label="Zicotix home">
      <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path fill="#fbf8ff" d="M8 10h48L36.5 31H50L56 54H8l19.5-21H14z" />
      </svg>
      <span>Zicotix</span>
    </a>
  )
}

function Navbar({ onContact }) {
  const [open, setOpen] = useState(false)
  const links = [['Work', '#work'], ['Aegis', '#aegis'], ['Optima', '#optima'], ['Studio', '#about'], ['FAQ', '#questions'], ['Contact', '#contact']]
  useEffect(() => {
    const close = () => setOpen(false)
    const onKey = (event) => { if (event.key === 'Escape') close() }
    window.addEventListener('resize', close)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [])
  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Primary navigation">
        <Logo />
        <button className="menu-button" aria-expanded={open} aria-controls="primary-links" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen((v) => !v)}>
          <span /><span />
        </button>
        <div id="primary-links" className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
        <button type="button" className="pill nav-cta" onClick={() => onContact('Project collaboration')}>Let's Build <span aria-hidden="true">↗</span></button>
      </nav>
      <div className="reading-progress" aria-hidden="true" />
    </header>
  )
}

function Hero() {
  const section = useRef()
  const drift = useRef()
  const reduced = useReducedMotion()
  const visible = useSceneVisibility(section)
  const [paused, setPaused] = useState(false)
  const moving = !reduced && !paused

  useEffect(() => {
    const target = section.current
    const layer = drift.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!target || !layer || !moving || !finePointer.matches) {
      if (layer) gsap.set(layer, { x: 0, y: 0 })
      return
    }
    const move = (event) => {
      if (event.target.closest('a, button')) return
      const rect = target.getBoundingClientRect()
      gsap.to(layer, {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 8,
        duration: 1.3, ease: 'power2.out', overwrite: true,
      })
    }
    const reset = () => gsap.to(layer, { x: 0, y: 0, duration: 1.5, overwrite: true })
    target.addEventListener('pointermove', move, { passive: true })
    target.addEventListener('pointerleave', reset)
    return () => {
      target.removeEventListener('pointermove', move)
      target.removeEventListener('pointerleave', reset)
      gsap.killTweensOf(layer)
      gsap.set(layer, { x: 0, y: 0 })
    }
  }, [moving])

  return (
    <section className="hero" id="top" ref={section} data-paused={!moving || !visible} aria-labelledby="hero-title">
      <div className="hero-art-scroll" aria-hidden="true">
        <div className="hero-art-drift" ref={drift}>
          <img className="hero-original-art" src={art('hero')} width="1648" height="928" alt="" fetchPriority="high" decoding="async" draggable="false" />
        </div>
      </div>
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-canvas" aria-hidden="true">
        {!reduced && <Suspense fallback={null}><Experience active={visible && moving} /></Suspense>}
      </div>
      <div className="hero-fog" aria-hidden="true" />
      <div className="hero-content">
        <p className="kicker" data-reveal>Z I C O T I X</p>
        <h1 id="hero-title" data-reveal>Building intelligent<br />systems that<br /><span>actually do things.</span></h1>
        <p className="hero-copy" data-reveal>We turn ambitious ideas into intelligent systems — from governed personal AI to optimization tools and automation.</p>
        <div className="hero-actions" data-reveal>
          <a className="pill pill-primary" href="#work">Explore Work <span>→</span></a>
          <a className="pill" href="#about">About Zicotix</a>
        </div>
        <div className="hero-trail" data-reveal aria-label="Ideas to systems to impact">
          <span>Ideas</span><b>›</b><span>Systems</span><b>›</b><span>Real-world impact</span>
        </div>
      </div>
      {!reduced && <button className="atmosphere-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>{paused ? 'Resume atmosphere' : 'Pause atmosphere'}<span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button>}
    </section>
  )
}

function ProjectSection({ project, index, onDetails }) {
  return (
    <article className={`project project-${project.id}`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="project-art" aria-hidden="true">
        <img src={art(project.id)} width="1648" height="928" alt="" loading="lazy" decoding="async" draggable="false" />
      </div>
      <div className="project-grid">
        <div className="project-copy" data-reveal>
          <div className="project-topline"><span className="project-icon" aria-hidden="true">{index === 0 ? '◇' : '✦'}</span><span className="project-number">{project.number}</span></div>
          <h2 id={`${project.id}-title`}>{project.title}</h2>
          <p className="project-eyebrow">{project.eyebrow}</p>
          <p className="project-description">{project.description}</p>
          <button type="button" className="text-link" onClick={() => onDetails(project.id)} aria-haspopup="dialog" aria-label={`Learn more about ${project.title}`}>Explore {project.title}<span aria-hidden="true">↗</span></button>
          <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
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
      <div className="section-heading" data-reveal><p className="kicker">W H A T &nbsp; W E &nbsp; B U I L D</p><h2>Intelligence with a reason to exist.</h2></div>
      <div className="focus-grid">
        {items.map(([title, body], i) => <article className="focus-card" key={title} data-reveal><span className="focus-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>
  )
}

function About({ onStory }) {
  return (
    <section className="about section" id="about">
      <div className="about-art" aria-hidden="true"><img src={art('about')} width="1715" height="864" alt="" loading="lazy" decoding="async" draggable="false" /></div>
      <div className="about-grid">
        <div data-reveal>
          <p className="kicker"><span className="line" /> A B O U T &nbsp; Z I C O T I X</p>
          <h2>A smaller, more ambitious kind of studio.</h2>
          <p>Zicotix explores what's possible at the intersection of intelligent software, automation, analytics, and human judgment. The focus is simple: build systems that are useful, understandable, and worth trusting.</p>
          <button type="button" className="pill" onClick={onStory} aria-haspopup="dialog">Meet the builder <span aria-hidden="true">↗</span></button>
        </div>
        <div className="about-stat" data-reveal><strong>2+</strong><span>Flagship Projects</span></div>
        <div className="about-stat" data-reveal><strong>∞</strong><span>Bigger Things Ahead</span></div>
        <blockquote data-reveal>“A more intelligent tomorrow.”<cite>— Zicotix</cite></blockquote>
      </div>
    </section>
  )
}

function Contact({ onContact }) {
  const [copied, setCopied] = useState('')
  const copy = async () => {
    try { await copyText(site.email); setCopied('Email copied') }
    catch { setCopied('Select the address below to copy it') }
  }
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel" data-reveal>
        <div><p className="kicker">GET IN TOUCH</p><h2 id="contact-title">Let's build what's next.</h2><p>A useful idea. A better workflow. An opportunity to build something together.</p><p className="contact-person">Andrew Gungoll <span aria-hidden="true">/</span> Builder behind Zicotix</p></div>
        <div className="contact-actions"><button type="button" className="pill pill-primary" onClick={() => onContact('General enquiry')} aria-haspopup="dialog">Start a conversation <span aria-hidden="true">↗</span></button><button type="button" className="copy-email" onClick={copy}>Copy email address</button><span className="copy-status" role="status">{copied}</span></div>
      </div>
      <div className="contact-baseline"><span className="direct-email">{site.email}</span><SocialLinks /></div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer"><Logo />
      <div className="footer-links"><a href="#work">Work</a><a href="#about">Studio</a><a href="#questions">FAQ</a><a href="/brand/zicotix-logo-white-transparent.png" download>Logo PNG</a><a href="#top" aria-label="Back to top">Back to top ↑</a></div>
      <p>Building a more intelligent tomorrow.<br />© {new Date().getFullYear()} Zicotix.</p>
    </footer>
  )
}

export default function App() {
  const app = useRef()
  const [panel, setPanel] = useState(null)
  const [contactTopic, setContactTopic] = useState('General enquiry')
  const openContact = (topic = 'General enquiry') => { setContactTopic(topic); setPanel('contact') }
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })
      gsap.fromTo('.reading-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } })
      gsap.to('.hero-art-scroll', { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } })
      gsap.utils.toArray('.project-art img').forEach((image) => {
        gsap.fromTo(image, { yPercent: -1.5 }, { yPercent: 1.5, ease: 'none', scrollTrigger: { trigger: image.closest('.project'), start: 'top bottom', end: 'bottom top', scrub: 1 } })
      })
    })
    return () => media.revert()
  }, { scope: app })

  return (
    <div className="app" ref={app}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar onContact={openContact} />
      <main id="main"><Hero />
        <section className="work" id="work">
          <div className="work-heading" data-reveal><p className="kicker"><span className="line" /> S E L E C T E D &nbsp; P R O J E C T S</p><span>Big ideas.<br />Real systems.</span></div>
          {projects.map((project, i) => <ProjectSection key={project.id} project={project} index={i} onDetails={setPanel} />)}
        </section>
        <FocusAreas /><About onStory={() => setPanel('studio')} /><FAQ onContact={openContact} /><Contact onContact={openContact} />
      </main>
      <Footer />
      {(panel === 'aegis' || panel === 'optima') && <ProjectDetails key={panel} id={panel} onClose={() => setPanel(null)} onContact={openContact} />}
      {panel === 'studio' && <StudioDetails onClose={() => setPanel(null)} onContact={openContact} />}
      {panel === 'contact' && <ContactForm topic={contactTopic} onClose={() => setPanel(null)} />}
    </div>
  )
}
