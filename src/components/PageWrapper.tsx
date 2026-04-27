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
    gsap.set(ref.current, { opacity: 0, y: 18 });
    gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.05 });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
