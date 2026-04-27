'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, registerGSAP } from '@/lib/gsap';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
