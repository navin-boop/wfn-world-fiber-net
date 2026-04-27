'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Btn from '@/components/Btn';
import Badge from '@/components/Badge';
import { COVERAGE } from '@/lib/plans';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

// Approximate relative positions for coverage areas on a stylized Nepal map
const dotPositions = [
  { key: 'Kathmandu', x: 52, y: 48 },
  { key: 'Nuwakot-Betrawati', x: 46, y: 38 },
  { key: 'Nuwakot-Trishuli', x: 48, y: 42 },
  { key: 'Dhading-Baireni', x: 40, y: 50 },
  { key: 'Dhading-Benighat', x: 37, y: 54 },
  { key: 'Gorkha', x: 30, y: 44 },
  { key: 'Sindhupalchok', x: 60, y: 38 },
  { key: 'Lamjung', x: 23, y: 42 },
];

export default function CoverageBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const inner = sectionRef.current!.querySelector('.coverage-inner');
      if (inner) {
        gsap.fromTo(inner,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
            },
          }
        );
      }

      // Pulse rings on active dots
      const activeDots = sectionRef.current!.querySelectorAll('.dot-active');
      activeDots.forEach((dot, i) => {
        gsap.to(dot.querySelector('.dot-ring'), {
          scale: 2.5,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: 'power1.out',
          delay: i * 0.25,
        });

        gsap.to(dot.querySelector('.dot-core'), {
          scale: 1.3,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      // Soon dots subtle pulse
      const soonDots = sectionRef.current!.querySelectorAll('.dot-soon');
      soonDots.forEach((dot, i) => {
        gsap.to(dot, {
          opacity: 0.5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const coverageMap = COVERAGE.reduce<Record<string, string>>((acc, c) => {
    acc[c.name] = c.status;
    return acc;
  }, {});

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: 'var(--black)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="coverage-inner grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <Badge variant="green" className="mb-6">Coverage Map</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-white">
              Fast internet across{' '}
              <span style={{ color: 'var(--green)' }}>5 districts</span>
              {' '}and growing
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              From Kathmandu Valley to the hills of Gorkha, World Fiber Net is expanding its network to bring high-speed fiber to every corner of Bagmati Province.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {COVERAGE.map((area) => (
                <div key={area.name} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: area.status === 'active' ? 'var(--green)' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: area.status === 'active' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {area.name}
                    {area.status === 'soon' && (
                      <span className="ml-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>(soon)</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <Btn href="/coverage" variant="primary" size="lg">
              Check Your Area <ArrowRight size={16} />
            </Btn>
          </div>

          {/* Right: stylized map */}
          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: '400px',
              }}
            >
              {/* Nepal outline SVG (simplified) */}
              <svg
                viewBox="0 0 100 70"
                className="w-full h-full"
                style={{ minHeight: '400px' }}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Simplified Nepal border */}
                <path
                  d="M 5 35 Q 10 25 20 28 Q 30 20 40 22 Q 50 18 60 20 Q 70 18 80 22 Q 90 25 95 32 Q 97 40 90 45 Q 80 48 70 45 Q 60 48 50 45 Q 40 50 30 48 Q 20 52 12 48 Q 5 45 5 35 Z"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.5"
                />

                {/* Grid lines */}
                {[20, 30, 40, 50, 60, 70, 80].map(x => (
                  <line key={`v${x}`} x1={x} y1="10" x2={x} y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
                ))}
                {[20, 30, 40, 50, 60].map(y => (
                  <line key={`h${y}`} x1="5" y1={y} x2="95" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
                ))}

                {/* Coverage dots */}
                {dotPositions.map((pos) => {
                  const status = coverageMap[pos.key] || 'soon';
                  const isActive = status === 'active';

                  return (
                    <g key={pos.key} className={isActive ? 'dot-active' : 'dot-soon'}>
                      {isActive && (
                        <circle
                          className="dot-ring"
                          cx={pos.x}
                          cy={pos.y}
                          r="3"
                          fill="none"
                          stroke="var(--green)"
                          strokeWidth="0.8"
                          opacity="0.8"
                        />
                      )}
                      <circle
                        className="dot-core"
                        cx={pos.x}
                        cy={pos.y}
                        r={isActive ? 2 : 1.5}
                        fill={isActive ? 'var(--green)' : 'rgba(255,255,255,0.3)'}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--green)' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
