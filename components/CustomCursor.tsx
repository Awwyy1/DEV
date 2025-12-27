
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out"
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.interactive')) {
        gsap.to(followerRef.current, {
          scale: 2.5,
          duration: 0.4,
          backgroundColor: 'rgba(45, 212, 191, 0.1)',
          borderColor: 'rgba(45, 212, 191, 0.4)'
        });
        gsap.to(cursorRef.current, {
          scale: 0,
          duration: 0.3
        });
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.interactive')) {
        gsap.to(followerRef.current, {
          scale: 1,
          duration: 0.4,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(45, 212, 191, 0.2)'
        });
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#2dd4bf] rounded-full z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-[#2dd4bf]/20 rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
      />
    </>
  );
};

export default CustomCursor;
