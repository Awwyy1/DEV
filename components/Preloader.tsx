
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(".preloader-content", {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
      });
    }
  }, [progress, onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[11000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="preloader-content text-center px-10">
        <div className="mb-10 flex flex-col items-center justify-center gap-4">
           <div className="w-12 h-12 border-2 border-[#2dd4bf] border-t-transparent animate-spin rounded-full mb-4 shadow-[0_0_20px_rgba(45,212,191,0.2)]" />
           <h2 className="text-white font-clash font-bold tracking-tighter text-3xl uppercase">
             Allocating <span className="text-[#2dd4bf]">Resources</span>
           </h2>
        </div>
        <div className="w-80 h-[3px] bg-white/5 rounded-full relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#2dd4bf] transition-all duration-300 ease-out shadow-[0_0_15px_#2dd4bf]" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-6">
          <span className="text-slate-600 font-syne text-[9px] uppercase tracking-[0.6em] font-bold">Resilience V.5.0</span>
          <span className="text-[#2dd4bf] font-clash text-lg font-bold">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
