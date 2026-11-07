import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Download, Linkedin, Mail, Menu, X } from 'lucide-react';
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

function Navigation({ onOpenMenu }: { onOpenMenu: () => void }) {
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
          <a className="nav-cta" href=".\Daffa-Putra-Emeral-CV.pdf" download data-testid="link-download-cv">
            Download CV <Download size={14} strokeWidth={1.8} />
          </a>
        <button className="menu-toggle" onClick={onOpenMenu} aria-label="Open navigation menu" data-testid="button-menu">
          <Menu size={18} strokeWidth={1.7} />
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
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
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-wide">
        <div className="hero-top">
          <div className="award-line" data-testid="text-award">
            <span className="award-mark">DP</span>
            Bachelor of Informatics - FTI UNSAP / Sumedang / Open to Work & Internships
          </div>
          <h1 className="hero-title" data-testid="heading-hero">
            Hi, I&apos;m Daffa.
            <em>Bachelor of Computer Science &amp; </em>
          </h1>
          <div className="hero-badge" data-testid="text-hero-badge">
            Informatics Alumni of FTI UNSAP / UI/UX & Web Development Enthusiast
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
  style={{ objectFit: "contain", height: "auto", background: "transparent" }}
/>     
<p className="hero-note">
            I am an Informatics graduate passionate about designing intuitive and functional digital interfaces. I am experienced in creating wireframes in Figma, developing web dashboards using Flask and Tailwind CSS, and processing data with Python. Additionally, I bring strong technical leadership and managerial experience from my role in the Student Executive Board (BEM) and various event management.
          </p>
          <div className="hero-proof" data-testid="text-client-proof">
            <div className="tech-stack" aria-label="Tech stack and tools">
              {['Python', 'Flask', 'Tailwind', 'HTML', 'Figma', 'Chart.js'].map((tool) => (
                <span className="tech-tool" key={tool}>{tool}</span>
              ))}
            </div>
            <span className="proof-text">Tech stack &amp; tools: Python · Flask · Tailwind CSS · HTML · Figma · Chart.js</span>
          </div>
          <div className="hero-actions">
            <a className="pill-button" href="#contact" data-testid="link-hero-contact">
              Let&apos;s Talk <ArrowUpRight size={14} />
            </a>
            <span className="hero-secondary">Built with Figma &amp; Tailwind</span>
          </div>
        </div>
        <div className="hero-foot">
          <span className="scroll-cue"><ArrowDownRight size={13} /> Scroll to explore</span>
              <span className="hero-index">01 / 04</span>
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
        <div className="intro-grid">
          <div>
            <div className="section-label eyebrow">About me</div>
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
        <div className="section-heading">
          <div>
            <div className="section-label eyebrow">Projects</div>
            <h2 data-testid="heading-projects">Selected<br />projects<span className="serif"></span></h2>
          </div>
          <p className="small-note">Curated selection of my work spanning web development, UI/UX design, and data processing taking abstract concepts through to functional, interactive solutions..</p>
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
        <div className="section-label eyebrow" style={{ justifyContent: 'center' }}>Organizational &amp; & Committee Experience</div>
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

function About() {
  return (
    <div className="about">
      <div className="container-wide">
        <div className="about-head">
          <div className="section-label eyebrow" style={{ justifyContent: 'center' }}>Profile Summary</div>
          <h2 className="about-title" data-testid="heading-about">Informatics UI/UX <span>and Data Driven Solutions</span></h2>
        </div>
        <div className="about-layout">
          <div>
            <div className="about-photo">
              <img src="/daffa-portrait.jpg" alt="Daffa Putra Emeral, aspiring web developer and UI/UX designer" data-testid="img-about-portrait" />
            </div>
            <div className="about-caption"><span>@dapiddaffa / Web Developer &amp; UI/UX Designer</span><span>@dapiddaffa / Open to Work &amp; Internships</span></div>
            <div className="socials">
              <a className="social-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-linkedin"><Linkedin size={15} /></a>
              <a className="social-link" href="#contact" aria-label="Hubungi Daffa" data-testid="link-contact-social"><Mail size={15} /></a>
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
      </div>
    </div>
  );
}
function Contact() {
   return (
    <section className="contact" id="contact">
      <div className="container-wide">
        <div className="contact-panel">
          <div className="eyebrow">Open to work &amp; internships</div>
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
          <span className="copyright" data-testid="text-copyright">© 2026 Daffa Putra Emeral. All rights reserved.</span>
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

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
     <main className="portfolio-shell">
    <div className="grain" />
    <Navigation onOpenMenu={() => setMenuOpen((open) => !open)} />
    {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    <Hero />
    <Marquee />
    <section id="about">
      <Intro />
      <About />
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