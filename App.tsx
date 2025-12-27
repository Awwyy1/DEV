
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ProjectCard from './components/ProjectCard';
import { PROJECTS } from './constants';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    // Fluid Blobs Movement
    const moveBlobs = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;

      gsap.to(".blob-1", { x: x * 0.15, y: y * 0.15, duration: 2.5, ease: "power3.out" });
      gsap.to(".blob-2", { x: -x * 0.2, y: -y * 0.2, duration: 3, ease: "power3.out" });
      gsap.to(".blob-3", { x: x * 0.1, y: -y * 0.1, duration: 3.5, ease: "power3.out" });
    };
    window.addEventListener('mousemove', moveBlobs);

    // Hero Reveal
    const tl = gsap.timeline();
    tl.from(".hero-title-reveal", {
      y: 120,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out"
    })
    .from(".hero-meta-reveal", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out"
    }, "-=1");

    return () => {
      window.removeEventListener('mousemove', moveBlobs);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("hello@lead.dev");
    gsap.to(".copy-msg", { opacity: 1, y: -20, duration: 0.4 });
    setTimeout(() => gsap.to(".copy-msg", { opacity: 0, y: 0, duration: 0.4 }), 2000);
  };

  if (loading) return <Preloader onComplete={() => setLoading(false)} />;

  return (
    <div ref={mainRef} className="relative w-full overflow-hidden bg-[#020617]">
      <CustomCursor />
      
      {/* Oceanic Blobs */}
      <div className="blob blob-1 fixed top-[10%] left-[5%] w-[60vw] h-[60vw] bg-[#2dd4bf]/30" />
      <div className="blob blob-2 fixed bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#22d3ee]/20" />
      <div className="blob blob-3 fixed top-[35%] right-[20%] w-[45vw] h-[45vw] bg-[#7dd3fc]/20" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-[100] flex justify-between items-center glass-nav">
        <div className="font-clash font-bold text-xl tracking-tighter interactive text-white">LEAD.DEV</div>
        <div className="hidden md:flex gap-12 font-syne text-[10px] uppercase tracking-[0.4em] text-white/40">
          <a href="#projects" className="hover:text-[#2dd4bf] transition-colors">Projects</a>
          <a href="#expertise" className="hover:text-[#7dd3fc] transition-colors">Expertise</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <button className="font-syne text-[10px] uppercase border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all text-white font-bold tracking-widest">Resume</button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-32 z-10">
        <div className="max-w-[1400px]">
          <div className="overflow-hidden mb-4">
            <span className="hero-meta-reveal block font-syne text-xs uppercase tracking-[0.6em] text-[#2dd4bf] font-bold">Resilient Systems & Performance</span>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-title-reveal text-[13vw] md:text-[10vw] font-clash font-bold leading-[0.85] tracking-tighter uppercase text-white">
              Lead <span className="text-outline">Engineer</span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-title-reveal text-[13vw] md:text-[10vw] font-clash font-bold leading-[0.85] tracking-tighter uppercase text-white">
              Portfolio '24
            </h1>
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 gap-10">
            <p className="hero-meta-reveal font-inter text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
              Architecting fluid digital environments where deep-sea stability meets arctic precision. I build high-availability platforms for the modern web.
            </p>
            <div className="hero-meta-reveal flex flex-col items-start md:items-end justify-end">
              <p className="font-clash text-2xl font-bold tracking-tighter text-white">Senior Full-Stack Developer</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-2 h-2 rounded-full bg-[#2dd4bf] shadow-[0_0_10px_#2dd4bf] animate-pulse" />
                <p className="font-syne text-[10px] uppercase tracking-widest text-slate-500 font-bold">Open for Global Ventures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="expertise" className="tech-section py-32 overflow-hidden border-y border-white/5 bg-white/[0.01] z-10 relative">
        <div className="tech-scroll flex whitespace-nowrap gap-12 text-[8vw] font-clash font-bold uppercase text-white/[0.03] select-none">
          <span>React • Next.js • TypeScript • Node.js • CloudNative • AWS • GSAP • Three.js • </span>
          <span>React • Next.js • TypeScript • Node.js • CloudNative • AWS • GSAP • Three.js • </span>
        </div>
        <div className="px-6 md:px-20 mt-20 grid md:grid-cols-3 gap-8">
          {[
            { title: "Architecture", desc: "Crafting scalable micro-services and serverless infrastructures for heavy-load applications.", color: "#2dd4bf" },
            { title: "UI Engineering", desc: "Pixel-perfect implementation of complex interfaces with focus on motion and accessibility.", color: "#7dd3fc" },
            { title: "Strategic Dev", desc: "Leading teams through the full lifecycle of product development from MVP to Scale.", color: "#f8fafc" }
          ].map((item, i) => (
            <div key={i} className="p-10 glass-card rounded-3xl group interactive hover:translate-y-[-4px]">
              <span className="font-syne text-[10px] block mb-6 font-bold tracking-widest uppercase opacity-40" style={{ color: item.color }}>Expertise V.0{i+1}</span>
              <h3 className="text-2xl font-clash font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-6 md:px-20 py-40 z-10 relative">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-10">
          <h2 className="text-6xl md:text-8xl font-clash font-bold tracking-tighter uppercase text-white leading-none">
            Selected <br /><span className="text-outline">Projects</span>
          </h2>
          <div className="text-right">
             <p className="font-syne text-[10px] uppercase tracking-[0.6em] text-[#2dd4bf] mb-2 font-bold">Release Archive</p>
             <p className="font-clash text-xl text-slate-500 tracking-tight font-bold">2023 — 2024</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-40 md:gap-64">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-6 relative py-32 border-t border-white/5 z-10">
        <div className="text-center relative">
          <span className="font-syne text-[10px] uppercase tracking-[0.8em] text-[#2dd4bf] mb-10 block font-bold">Connection Request</span>
          <h2 className="text-[15vw] md:text-[10vw] font-clash font-bold tracking-tighter leading-none uppercase interactive text-white">
            Let's <br /><span className="text-outline">Collaborate</span>
          </h2>
          <div className="mt-20 relative group inline-block">
            <button 
              onClick={copyToClipboard}
              className="text-2xl md:text-5xl font-clash font-medium border-b-2 border-white/10 pb-4 interactive text-white hover:text-[#2dd4bf] transition-colors"
            >
              hello@lead.dev
            </button>
            <span className="copy-msg absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 font-syne text-xs uppercase tracking-widest text-[#2dd4bf] font-bold">Link Copied!</span>
          </div>
        </div>

        <footer className="absolute bottom-10 left-0 w-full px-10 flex flex-col md:flex-row justify-between items-center text-slate-700 font-syne text-[9px] uppercase tracking-[0.6em] gap-6">
          <div className="flex gap-12"><span>© 2024 ARCHIVE</span><span>PRECISION V.5.0</span></div>
          <div className="flex gap-8 font-bold">
            <a href="#" className="hover:text-[#2dd4bf] interactive">GH</a>
            <a href="#" className="hover:text-[#2dd4bf] interactive">LI</a>
            <a href="#" className="hover:text-[#2dd4bf] interactive">TW</a>
          </div>
          <div className="font-bold tracking-[1em] text-slate-800 uppercase">Resilient Architecture</div>
        </footer>
      </section>
    </div>
  );
};

export default App;
