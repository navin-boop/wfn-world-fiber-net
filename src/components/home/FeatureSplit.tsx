'use client';

import { useEffect, useRef } from 'react';
import { Check, Zap } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Btn from '@/components/Btn';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const features = [
  'No throttling, no data caps — ever',
  'Free professional installation',
  'Symmetric upload and download speeds',
  'Dedicated fiber line to your premises',
  '24/7 local technical support team',
  'Hassle-free monthly billing',
];

export default function FeatureSplit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      const items = rightRef.current?.querySelectorAll('.feature-item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: 'var(--gray-50)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left panel — visual */}
          <div ref={leftRef}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--black) 0%, #1a1a2e 100%)',
                minHeight: '480px',
              }}
            >
              {/* Speed display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-center mb-8">
                  <div
                    className="text-8xl font-bold font-mono leading-none mb-2"
                    style={{ color: 'var(--green)' }}
                  >
                    1
                    <span className="text-4xl ml-1">Gbps</span>
                  </div>
                  <p className="text-white/60 text-sm">Maximum download speed</p>
                </div>

                {/* Speed bars */}
                <div className="w-full max-w-xs space-y-3">
                  {[
                    { label: 'Download', pct: 95, val: '980 Mbps' },
                    { label: 'Upload', pct: 88, val: '900 Mbps' },
                    { label: 'Latency', pct: 97, val: '< 5ms' },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-white/50">{bar.label}</span>
                        <span style={{ color: 'var(--green)' }} className="font-mono">{bar.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${bar.pct}%`,
                            backgroundColor: 'var(--green)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pulsing indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--green)' }} />
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: 'var(--green)', opacity: 0.4 }}
                    />
                  </div>
                  <span className="text-xs text-white/60">Live</span>
                </div>
              </div>

              {/* Decorative lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice">
                <path d="M-50 240 Q 100 100 250 240 T 550 240" stroke="#18E299" strokeWidth="1" fill="none" />
                <path d="M-50 280 Q 150 140 300 280 T 600 280" stroke="#18E299" strokeWidth="0.7" fill="none" />
                <circle cx="200" cy="240" r="80" stroke="#18E299" strokeWidth="0.5" fill="none" />
                <circle cx="200" cy="240" r="140" stroke="#18E299" strokeWidth="0.3" fill="none" />
              </svg>
            </div>
          </div>

          {/* Right content */}
          <div ref={rightRef}>
            <SectionLabel className="mb-5">Why Fiber?</SectionLabel>
            <h2 className="text-4xl font-bold mb-5 leading-tight" style={{ color: 'var(--black)' }}>
              Pure fiber glass. Pure speed. Zero compromise.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--gray-500)' }}>
              Unlike copper-based connections that degrade over distance, our fiber optic network delivers consistent, symmetrical speeds directly to your door — rain, shine, or peak hours.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((feat, i) => (
                <li key={i} className="feature-item flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--green-100)' }}
                  >
                    <Check size={11} style={{ color: 'var(--green-700)' }} strokeWidth={3} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--gray-600)' }}>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Btn href="/packages" variant="primary" size="lg">
                <Zap size={16} /> View Plans
              </Btn>
              <Btn href="/contact" variant="ghost" size="lg">
                Talk to Sales
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
