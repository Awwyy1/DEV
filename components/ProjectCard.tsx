
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, 
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={cardRef}
      className={`relative w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-24`}
    >
      {/* Media Content */}
      <div className="relative w-full md:w-3/5 aspect-[16/10] overflow-hidden rounded-[3rem] bg-white/[0.03] border border-white/5 group interactive shadow-2xl">
        <img 
          ref={imageRef}
          src={project.imageUrl} 
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${project.isComingSoon ? 'blur-2xl opacity-10' : 'opacity-80'}`}
        />
        {project.isComingSoon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border border-[#2dd4bf]/20 rounded-full flex items-center justify-center mb-4 bg-[#020617]/40 backdrop-blur-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="font-syne text-[10px] uppercase tracking-[0.4em] text-[#2dd4bf] font-bold">Developing Phase</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info Content */}
      <div className="w-full md:w-2/5 flex flex-col justify-center">
        <span className="text-[#2dd4bf] font-syne text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Node 0{index + 1} // Production</span>
        <h3 className="text-5xl md:text-7xl font-clash font-bold tracking-tighter mb-6 uppercase text-white leading-none">
          {project.title}
        </h3>
        <p className="font-inter text-slate-500 text-lg mb-8 leading-relaxed max-w-sm">
          {project.category}. Specialized implementation featuring real-time data visualizers and low-latency interaction protocols.
        </p>
        
        {!project.isComingSoon ? (
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-6 group interactive w-max"
          >
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#2dd4bf] group-hover:text-[#020617] transition-all shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-syne text-[10px] uppercase tracking-[0.3em] font-extrabold text-white/60 group-hover:text-white transition-colors">Inspect Module</span>
          </a>
        ) : (
          <div className="flex items-center gap-6 opacity-20">
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
              <span className="text-xs">—</span>
            </div>
            <span className="font-syne text-[10px] uppercase tracking-widest font-bold text-white">Encrypted Asset</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
