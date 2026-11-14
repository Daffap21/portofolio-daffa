import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Download, Eye, Linkedin, Mail, Maximize2, Menu, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import introReference from '@/assets/Screenshot_2026-09-14_115056_1789364740239.png';
import processReference from '@/assets/Screenshot_2026-09-14_115132_1789364740240.png';
import workReference from '@/assets/Screenshot_2026-09-14_115219_1789364740239.png';

const queryClient = new QueryClient();

type Project = {
  id: string;
  name: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  imagePosition: string;
  role: string;
  outcome: string;
  linkLabel: string;
};

const projects: Project[] = [
  {
    id: 'sentiment-dashboard',
    name: 'Dashboard Analisis Sentimen & Klasifikasi Teks',
    type: 'Data Science',
    description: 'Dashboard web interaktif untuk mendeteksi ujaran kebencian pada ulasan transportasi online menggunakan IndoBERT dan LIME.',
    tags: ['Python', 'Flask', 'Tailwind CSS', 'Chart.js', 'Machine Learning'],
    image: workReference,
    imagePosition: '0% 0%',
    role: 'Developer & UI/UX Designer',
    outcome: 'Menyajikan klasifikasi teks yang lebih mudah dipahami melalui visualisasi data dan Explainable AI.',
    linkLabel: 'Link GitHub / Figma / Demo',
  },
  {
    id: 'legalisir-online',
    name: 'Purwarupa Sistem Legalisir Dokumen Akademik Online',
    type: 'System Design',
    description: 'Merancang UI/UX, alur pengguna, dan arsitektur basis data untuk digitalisasi layanan dokumen akademik di FTI UNSAP.',
    tags: ['UI/UX Design', 'Figma', 'System Analysis', 'Prototyping'],
    image: processReference,
    imagePosition: '100% 0%',
    role: 'UI/UX Designer & System Analyst',
    outcome: 'Menyusun alur layanan yang lebih jelas dari pengajuan hingga verifikasi dokumen.',
    linkLabel: 'Link Figma / Studi Kasus',
  },
  {
    id: 'cimarias',
    name: 'Identitas Visual & Digitalisasi UMKM Desa Cimarias',
    type: 'Community Design',
    description: 'Merancang logo, kemasan, dan aset visual untuk Citrek, Rangginang, dan Peuyeum sekaligus menginisiasi program pendataan Smart Village.',
    tags: ['Graphic Design', 'Branding', 'Community Development'],
    image: introReference,
    imagePosition: '50% 100%',
    role: 'Graphic Designer & Community Facilitator',
    outcome: 'Membantu produk lokal tampil lebih konsisten dan siap dikenalkan melalui kanal digital.',
    linkLabel: 'Link Portofolio Desain',
  },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Navigation({ onOpenMenu, onPreviewCv }: { onOpenMenu: () => void; onPreviewCv: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-wide nav-inner">
        <button className="wordmark" onClick={() => scrollTo('top')} data-testid="button-home">
          Daffa Putra Emeral
          <span className="nav-role">Aspiring Web Developer & UI/UX Designer</span>
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          <button className="nav-link" onClick={() => scrollTo('about')} data-testid="link-about">About</button>
          <button className="nav-link" onClick={() => scrollTo('projects')} data-testid="link-projects">Projects</button>
          <button className="nav-link" onClick={() => scrollTo('experience')} data-testid="link-experience">Experience</button>
          <button className="nav-link" onClick={() => scrollTo('contact')} data-testid="link-contact">Contact</button>
        </nav>
        <button type="button" className="nav-cta" onClick={onPreviewCv} data-testid="link-download-cv">
          Download CV <Download size={14} strokeWidth={1.8} />
        </button>
        <button className="menu-toggle" onClick={onOpenMenu} aria-label="Open navigation menu" data-testid="button-menu">
          <Menu size={18} strokeWidth={1.7} />
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ onClose, onPreviewCv }: { onClose: () => void; onPreviewCv: () => void }) {
  const go = (id: string) => {
    onClose();
    window.setTimeout(() => scrollTo(id), 80);
  };
  return (
    <div className="mobile-menu" data-testid="mobile-menu">
      <button onClick={() => go('projects')} data-testid="mobile-link-projects">Projects</button>
      <button onClick={() => go('about')} data-testid="mobile-link-about">Tentang saya</button>
      <button onClick={() => go('experience')} data-testid="mobile-link-experience">Experience</button>
      <button onClick={() => go('contact')} data-testid="mobile-link-contact">Hubungi saya</button>
      <button onClick={() => { onClose(); onPreviewCv(); }} data-testid="mobile-link-cv">Preview / Download CV</button>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-wide">
        <div className="hero-top">
          <h1 className="hero-title" data-testid="heading-hero">
            Hi, I&apos;m Daffa.
            <em>Bachelor of Computer Science</em>
          </h1>
          <div className="hero-badge" data-testid="text-hero-badge">
            Informatics Alumni of FTI UNSAP / UI/UX &amp; Web Development Enthusiast
          </div>
        </div>
        <div className="hero-stage">
          <div className="availability" data-testid="status-availability">
            <span className="availability-dot" />
            Open to entry-level IT roles, internships, &amp; freelance
          </div>
          <img
            className="hero-figure"
            src="/daffa-personal-photo.png"
            alt="Daffa Putra Emeral, Informatics student and developer"
            data-testid="img-hero-portrait"
          />
          <p className="hero-note">
            Informatics graduate passionate about designing intuitive digital interfaces in Figma and building functional web applications with Python, Flask, and Tailwind CSS.
          </p>
          <div className="hero-proof" data-testid="text-client-proof">
            <div className="tech-stack" aria-label="Tech stack and tools">
              {['Python', 'Flask', 'Tailwind', 'HTML', 'Figma', 'Chart.js'].map((tool) => (
                <span className="tech-tool" key={tool}>{tool}</span>
              ))}
            </div>
          </div>
          <div className="hero-actions">
            <a className="pill-button" href="#contact" data-testid="link-hero-contact">
              Let&apos;s Talk <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="hero-foot">
          <span className="scroll-cue"><ArrowDownRight size={13} /> Scroll to explore</span>
          <span className="hero-index section-index" data-testid="index-hero">01 / 05</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ['Front-end', 'UI/UX Design', 'Data Science', 'System Analysis'];
  return (
    <div className="marquee" aria-label="Areas of practice">
      <div className="marquee-track">
        {[...words, ...words].map((word, index) => (
          <span className="marquee-item" key={`${word}-${index}`} data-testid={`text-marquee-${index}`}>
            <span className="marquee-dot" /> {word}
          </span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className="intro">
      <div className="container-wide">
        <div className="section-top-bar">
          <div className="section-label eyebrow">About me</div>
          <span className="section-index" data-testid="index-about">02 / 05</span>
        </div>
        <div className="intro-grid">
          <div>
            <h2 className="intro-heading" data-testid="heading-intro">
              Building digital interfaces <span className="soft">that feel effortless to use</span>
            </h2>
          </div>
          <div>
            <p className="intro-copy">
              I believe great digital products require more than just aesthetics; they need a solid logical foundation. My background allows me to bridge the gap between user-centric design and technical execution. I thrive in taking abstract concepts from system flowcharts and ERDs to wireframes and turning them into fully interactive web applications.
            </p>
            <div className="skill-cloud" aria-label="Skills">
              {['Front-end / UI/UX', 'Data Science / NLP', 'Figma', 'Flask', 'ERD & Use Case', 'Tailwind CSS'].map((skill) => (
                <span className="skill" key={skill} data-testid={`skill-${skill.toLowerCase().replaceAll(' ', '-')}`}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <button className="project-card" onClick={() => onOpen(project)} data-testid={`card-project-${project.id}`}>
      <div className="project-visual">
        <img className="project-image" src={project.image} style={{ objectPosition: project.imagePosition }} alt={`${project.name} interface preview`} data-testid={`img-project-${project.id}`} />
        <span className="project-overlay" aria-hidden="true"><ArrowUpRight size={18} /></span>
      </div>
      <div className="project-meta">
        <div>
          <div className="project-title" data-testid={`text-project-name-${project.id}`}>{project.name}</div>
          <p className="project-desc">{project.description}</p>
        </div>
        <div className="tags">
          {[project.type, ...project.tags].map((tag, index) => <span className="tag" key={`${project.id}-${tag}-${index}`}>{tag}</span>)}
        </div>
      </div>
    </button>
  );
}

function Work({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section className="work" id="projects">
      <div className="container-wide">
        <div className="section-top-bar">
          <div className="section-label eyebrow">Projects</div>
          <span className="section-index" data-testid="index-projects">03 / 05</span>
        </div>
        <div className="section-heading">
          <div>
            <h2 data-testid="heading-projects">Selected<br />projects<span className="serif"></span></h2>
          </div>
          <p className="small-note">Curated selection of my work spanning web development, UI/UX design, and data processing taking abstract concepts through to functional, interactive solutions.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const experiences = [
    ['01', 'Kepala Departemen Kominfo', 'BEM UNSAP — Memimpin divisi komunikasi dan informasi, merancang aset publikasi digital, dan mengelola arus informasi organisasi.'],
    ['02', 'Ketua Divisi Publikasi / FOH Sound Liaison', 'SUPER MLBB COMPETITION 2026 — Mengelola tata suara siaran langsung, menyusun aset promosi visual, dan memastikan kelancaran turnamen esports tingkat regional.'],
    ['03', 'Fasilitator Smart Village & Zero Waste', 'KKN Desa Cimarias — Memberikan lokakarya pengelolaan limbah dan mendigitalisasi identitas visual produk UMKM desa.'],
  ];
  return (
    <section className="process-wrap">
      <div className="container-wide">
        <div className="section-head-bar">
          <div className="section-label eyebrow" style={{ justifyContent: 'center' }}>Organizational &amp; Committee Experience</div>
          <span className="section-index section-index-abs" data-testid="index-experience">04 / 05</span>
        </div>
        <h2 className="process-title" data-testid="heading-experience">Experience that shapes my work<span className="serif"></span></h2>
        <div className="process-grid">
          {experiences.map(([number, title, copy]) => (
            <article className="process-card" key={number} data-testid={`card-experience-${number}`}>
              <span className="process-no">{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
        <div className="process-line" />
        <div className="testimonial-grid">
          <blockquote className="testimonial" data-testid="profile-strengths">
            <span className="quote-mark">&ldquo;</span>
            A team player adept at building systems from the ground up. I turn complex ERDs and Use Cases into seamless, interactive digital products.
            <footer className="quote-author"><span className="quote-avatar">DP</span> Workflow / System analysis &amp; prototyping</footer>
          </blockquote>
          <blockquote className="testimonial" data-testid="profile-focus">
            <span className="quote-mark">&ldquo;</span>
            Bridging the gap between web interfaces, UI/UX design, and NLP to create accessible and user-friendly technological experiences.
            <footer className="quote-author"><span className="quote-avatar" style={{ background: 'hsl(211 88% 72%)' }}>IT</span> Core Focus / Front-end, UI/UX, Data Science &amp; NLP</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

const portfolioSlides = [
  { num: '01', title: 'Cover — Creative Portfolio', src: '/portfolio-slides/slide-01.jpg' },
  { num: '02', title: 'Tentang & Filosofi Konten', src: '/portfolio-slides/slide-02.jpg' },
  { num: '03', title: 'Study — S1 Informatika UNSAP', src: '/portfolio-slides/slide-03.jpg' },
  { num: '04', title: 'Experience Overview', src: '/portfolio-slides/slide-04.jpg' },
  { num: '05', title: 'Skills & Mastering', src: '/portfolio-slides/slide-05.jpg' },
  { num: '06', title: 'Case Study #1 — Design UI/UX (UMKM UNSAP)', src: '/portfolio-slides/slide-06.jpg' },
  { num: '07', title: 'Case Study #2 — AI Driven Short Animation', src: '/portfolio-slides/slide-07.jpg' },
  { num: '08', title: 'Case Study #3 — Visual Branding (SUPER MLBB)', src: '/portfolio-slides/slide-08.jpg' },
  { num: '09', title: 'Case Study #4 — Jurnal & Analisis Sentimen (IndoBERT & XAI)', src: '/portfolio-slides/slide-09.jpg' },
  { num: '10', title: 'Galeri Konten Terbaik', src: '/portfolio-slides/slide-10.jpg' },
  { num: '11', title: 'Dampak & Hasil Terukur', src: '/portfolio-slides/slide-11.jpg' },
  { num: '12', title: 'Sertifikasi dan Penghargaan', src: '/portfolio-slides/slide-12.jpg' },
  { num: '13', title: "Let's Connect & Kolaborasi", src: '/portfolio-slides/slide-13.jpg' },
  { num: '14', title: 'Terima Kasih', src: '/portfolio-slides/slide-14.jpg' },
];

function CreativePortfolioDeck({ onOpenFullscreen }: { onOpenFullscreen: (slideIndex: number) => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const current = portfolioSlides[activeSlide];

  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? portfolioSlides.length - 1 : prev - 1));
  const nextSlide = () => setActiveSlide((prev) => (prev === portfolioSlides.length - 1 ? 0 : prev + 1));

  return (
    <div className="portfolio-deck" id="creative-portfolio-deck" data-testid="creative-portfolio-deck">
      <div className="portfolio-deck-header">
        <div>
          <div className="eyebrow">Interactive Presentation · 14 Slides</div>
          <h3 className="portfolio-deck-title">Creative Portfolio Deck — <span>{current.title}</span></h3>
        </div>
        <div className="portfolio-deck-actions">
          <span className="portfolio-slide-counter">Slide {current.num} / 14</span>
          <button
            type="button"
            className="portfolio-pdf-btn"
            onClick={() => onOpenFullscreen(activeSlide)}
            data-testid="button-fullscreen-portfolio"
          >
            <Maximize2 size={13} />
            <span>Baca Layar Penuh</span>
          </button>
        </div>
      </div>

      <div className="portfolio-deck-stage">
        <button
          type="button"
          className="portfolio-nav-btn prev"
          onClick={prevSlide}
          aria-label="Slide sebelumnya"
          data-testid="button-slide-prev"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          className="portfolio-slide-frame"
          onClick={() => onOpenFullscreen(activeSlide)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenFullscreen(activeSlide); }}
          aria-label={`Perbesar ${current.title}`}
        >
          <img src={current.src} alt={`Creative Portfolio Slide ${current.num} - ${current.title}`} />
          <span className="portfolio-slide-zoom-hint">
            <Maximize2 size={12} /> Klik untuk tampilan penuh
          </span>
        </div>

        <button
          type="button"
          className="portfolio-nav-btn next"
          onClick={nextSlide}
          aria-label="Slide berikutnya"
          data-testid="button-slide-next"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="portfolio-thumbs" role="tablist" aria-label="Pilih halaman slide">
        {portfolioSlides.map((slide, idx) => (
          <button
            key={slide.num}
            type="button"
            role="tab"
            aria-selected={idx === activeSlide}
            className={`portfolio-thumb ${idx === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(idx)}
            title={`Slide ${slide.num}: ${slide.title}`}
          >
            <img src={slide.src} alt={`Thumbnail slide ${slide.num}`} loading="lazy" />
            <span>{slide.num}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function About({ onOpenPortfolio }: { onOpenPortfolio: (slideIndex?: number) => void }) {
  return (
    <div className="about">
      <div className="container-wide">
        <div className="about-head">
          <div className="section-head-bar">
            <div className="section-label eyebrow" style={{ justifyContent: 'center' }}>Profile Summary</div>
            <span className="section-index section-index-abs" data-testid="index-about-summary">02 / 05</span>
          </div>
          <h2 className="about-title" data-testid="heading-about">Informatics UI/UX <span>and Data Driven Solutions</span></h2>
        </div>
        <div className="about-layout">
          <div>
            <div className="about-photo">
              <img src="/daffa-portrait.jpg" alt="Daffa Putra Emeral, aspiring web developer and UI/UX designer" data-testid="img-about-portrait" />
            </div>
            <div className="about-caption"><span>@dapiddaffa / Web Developer &amp; UI/UX Designer</span><span>@dapiddaffa / Open to Work &amp; Internships</span></div>
            <div className="socials">
              <a className="social-link" href="https://linkedin.com/in/DaffaPutraEmeral" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-linkedin"><Linkedin size={15} /></a>
              <a className="social-link" href="#contact" aria-label="Hubungi Daffa" data-testid="link-contact-social"><Mail size={15} /></a>
              <button
                type="button"
                className="portfolio-pdf-btn"
                onClick={() => onOpenPortfolio(0)}
                data-testid="button-open-portfolio-viewer"
              >
                <Eye size={14} />
                <span>Lihat Creative Portfolio (14 Slide)</span>
              </button>
            </div>
          </div>
          <div>
            <p className="about-copy">
              A recent Informatics graduate from FTI UNSAP with a strong focus on web interface development (Front-end/UI-UX) and Natural Language Processing. Experienced in translating complex system requirements (ERD & Use Cases) into functional and interactive digital products.
            </p>
            <div className="career-list" aria-label="Fokus dan pendidikan">
              {[
                ['Education', 'Informatics — Universitas Sebelas April', 'Fresh Graduate (2026)'],
                ['Core Focus', 'UI/UX & Visual Design', 'Web Interfaces & Multimedia'],
                ['Interest', 'Data Science / NLP', 'IndoBERT & LIME'],
                ['Methodology', 'ERD & Use Case', 'System Analysis'],
              ].map(([role, company, year]) => (
                <div className="career-row" key={role} data-testid={`row-career-${role.toLowerCase().replaceAll(' ', '-')}`}>
                  <span>{role}</span><span>{company}</span><span>{year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CreativePortfolioDeck onOpenFullscreen={(idx) => onOpenPortfolio(idx)} />
      </div>
    </div>
  );
}
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container-wide">
        <div className="contact-panel">
          <div className="section-head-bar contact-head-bar">
            <div className="eyebrow">Open to work &amp; internships</div>
            <span className="section-index section-index-abs" data-testid="index-contact">05 / 05</span>
          </div>
          <h2 className="contact-title" data-testid="heading-contact">Let's connect<span className="serif">.</span></h2>
          <p className="contact-copy">Available for fulltime entrylevel IT roles, internships, and freelance opportunities. Let's collaborate to build intuitive and functional digital experiences.</p>

          <a className="pill-button" href="https://wa.me/6281234567890?text=Hi%20Daffa%2C%20hope%20u%20guys%20like%20it%20-%20lets%20connect" target="_blank" rel="noreferrer">
            Get in Touch <ArrowUpRight size={14} />
          </a>
          {/* PAKAI CLASS YANG SAMA KAYAK AWAL */}
          <div className="contact-email" data-testid="link-contact-address">
            <a href="https://linkedin.com/in/DaffaPutraEmeral" target="_blank" rel="noreferrer">LinkedIn</a> /{" "}
            <a href="https://wa.me/6282120743164?text=Hi%20Daffa%2C%20hope%20u%20guys%20like%20it" target="_blank" rel="noreferrer">WhatsApp</a> /{" "}
            <a href="https://instagram.com/dapiddaffa" target="_blank" rel="noreferrer">Instagram</a> /{" "}
            <a href="mailto:hyugagopal77@gmail.com">Gmail</a> /{" "}
            <a href="https://github.com/Daffap21" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-main">
          <nav className="footer-nav" aria-label="Footer navigation">
            <button onClick={() => scrollTo('top')} data-testid="footer-link-home">Home</button>
            <button onClick={() => scrollTo('about')} data-testid="footer-link-about">About</button>
            <button onClick={() => scrollTo('projects')} data-testid="footer-link-projects">Projects</button>
            <button onClick={() => scrollTo('experience')} data-testid="footer-link-experience">Experience</button>
            <button onClick={() => scrollTo('contact')} data-testid="footer-link-contact">Contact</button>
          </nav>
          <span className="copyright" data-testid="text-copyright">© 2026 Daffa Putra Emeral. All rights reserved. · Built with Figma &amp; Tailwind</span>
        </div>
      </div>

      <div className="footer-marquee">
        <div className="footer-marquee-track">
          <span className="footer-name">Daffa Putra Emeral —&nbsp;</span>
          <span className="footer-name">Daffa Putra Emeral —&nbsp;</span>
          <span className="footer-name">Daffa Putra Emeral —&nbsp;</span>
          <span className="footer-name">Daffa Putra Emeral —&nbsp;</span>
        </div>
      </div>
    </footer>
  );
}
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid="project-modal">
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-top">
          <img src={project.image} style={{ objectPosition: project.imagePosition }} alt={`${project.name} enlarged preview`} />
          <button className="modal-close" onClick={onClose} aria-label="Close project details" data-testid="button-close-modal"><X size={17} /></button>
        </div>
        <div className="modal-body">
          <div className="eyebrow">{project.type} / Proyek pilihan</div>
          <h3 id="modal-title">{project.name}</h3>
          <p>{project.description} {project.outcome}</p>
          <div className="modal-details">
            <div className="modal-detail"><span>Peran</span><strong>{project.role}</strong></div>
            <div className="modal-detail"><span>Skills</span><strong>{project.tags.join(' + ')}</strong></div>
            <div className="modal-detail"><span>Tautan</span><strong>{project.linkLabel}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioViewerModal({
  initialSlide,
  onClose,
}: {
  initialSlide: number;
  onClose: () => void;
}) {
  const [activeSlide, setActiveSlide] = useState(initialSlide);
  const [viewMode, setViewMode] = useState<'slide' | 'scroll'>('slide');
  const current = portfolioSlides[activeSlide];

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (viewMode === 'slide') {
        if (event.key === 'ArrowRight') {
          setActiveSlide((prev) => (prev === portfolioSlides.length - 1 ? 0 : prev + 1));
        } else if (event.key === 'ArrowLeft') {
          setActiveSlide((prev) => (prev === 0 ? portfolioSlides.length - 1 : prev - 1));
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, viewMode]);

  return (
    <div
      className="modal-backdrop portfolio-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-testid="portfolio-viewer-modal"
    >
      <div className="portfolio-viewer-modal" role="dialog" aria-modal="true" aria-label="Creative Portfolio Presentation">
        <div className="portfolio-viewer-topbar">
          <div className="portfolio-viewer-title">
            <span className="eyebrow">Creative Portfolio · Daffa Putra Emeral, S.Kom</span>
            <strong>{viewMode === 'slide' ? `Slide ${current.num} / 14 — ${current.title}` : 'Semua Halaman (14 Slide)'}</strong>
          </div>
          <div className="portfolio-viewer-controls">
            <div className="portfolio-mode-switch">
              <button
                type="button"
                className={viewMode === 'slide' ? 'active' : ''}
                onClick={() => setViewMode('slide')}
              >
                Per Slide
              </button>
              <button
                type="button"
                className={viewMode === 'scroll' ? 'active' : ''}
                onClick={() => setViewMode('scroll')}
              >
                Gulir Semua (14)
              </button>
            </div>
            <button
              type="button"
              className="modal-close portfolio-modal-close"
              onClick={onClose}
              aria-label="Tutup tampilan portofolio"
              data-testid="button-close-portfolio-modal"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {viewMode === 'slide' ? (
          <div className="portfolio-viewer-body">
            <button
              type="button"
              className="portfolio-nav-btn prev"
              onClick={() => setActiveSlide((prev) => (prev === 0 ? portfolioSlides.length - 1 : prev - 1))}
              aria-label="Slide sebelumnya"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="portfolio-viewer-slide">
              <img src={current.src} alt={`Slide ${current.num} - ${current.title}`} />
            </div>
            <button
              type="button"
              className="portfolio-nav-btn next"
              onClick={() => setActiveSlide((prev) => (prev === portfolioSlides.length - 1 ? 0 : prev + 1))}
              aria-label="Slide berikutnya"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        ) : (
          <div className="portfolio-viewer-scroll">
            {portfolioSlides.map((slide) => (
              <div key={slide.num} className="portfolio-scroll-page">
                <div className="portfolio-scroll-label">Slide {slide.num} / 14 — {slide.title}</div>
                <img src={slide.src} alt={`Slide ${slide.num} - ${slide.title}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {viewMode === 'slide' && (
          <div className="portfolio-thumbs modal-thumbs">
            {portfolioSlides.map((slide, idx) => (
              <button
                key={slide.num}
                type="button"
                className={`portfolio-thumb ${idx === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(idx)}
              >
                <img src={slide.src} alt={`Slide ${slide.num}`} loading="lazy" />
                <span>{slide.num}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CvPreviewModal({ onClose }: { onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop portfolio-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-testid="cv-preview-modal"
    >
      <div className="portfolio-viewer-modal cv-preview-modal" role="dialog" aria-modal="true" aria-label="Preview CV Daffa Putra Emeral">
        <div className="portfolio-viewer-topbar">
          <div className="portfolio-viewer-title">
            <span className="eyebrow">Curriculum Vitae · Preview</span>
            <strong>CV — Daffa Putra Emeral, S.Kom</strong>
          </div>
          <div className="portfolio-viewer-controls">
            <div className="portfolio-mode-switch">
              <button
                type="button"
                className={!zoomed ? 'active' : ''}
                onClick={() => setZoomed(false)}
              >
                100%
              </button>
              <button
                type="button"
                className={zoomed ? 'active' : ''}
                onClick={() => setZoomed(true)}
              >
                Zoom 135%
              </button>
            </div>
            <a
              className="pill-button cv-download-cta"
              href="/Daffa-Putra-Emeral-CV.pdf"
              download="CV_DaffaPutra_WEB.pdf"
              data-testid="button-confirm-download-cv"
            >
              Download PDF <Download size={14} />
            </a>
            <button
              type="button"
              className="modal-close portfolio-modal-close"
              onClick={onClose}
              aria-label="Tutup preview CV"
              data-testid="button-close-cv-modal"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <div className="cv-preview-body">
          <div className={`cv-preview-sheet ${zoomed ? 'zoomed' : ''}`}>
            <img src="/cv-preview/cv-page-01.png" alt="Preview CV Daffa Putra Emeral" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [portfolioSlide, setPortfolioSlide] = useState<number | null>(null);
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);
  return (
    <main className="portfolio-shell">
      <div className="grain" />
      <Navigation onOpenMenu={() => setMenuOpen((open) => !open)} onPreviewCv={() => setCvPreviewOpen(true)} />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} onPreviewCv={() => setCvPreviewOpen(true)} />}
      <Hero />
      <Marquee />
      <section id="about">
        <Intro />
        <About onOpenPortfolio={(idx = 0) => setPortfolioSlide(idx)} />
      </section>
      <section id="projects">
        <Work onOpen={setSelectedProject} />
      </section>
      <section id="experience">
        <Process />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {portfolioSlide !== null && (
        <PortfolioViewerModal initialSlide={portfolioSlide} onClose={() => setPortfolioSlide(null)} />
      )}
      {cvPreviewOpen && <CvPreviewModal onClose={() => setCvPreviewOpen(false)} />}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;