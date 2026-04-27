'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Users, MapPin, Clock } from 'lucide-react';
import Btn from '@/components/Btn';
import Badge from '@/components/Badge';
import { gsap, registerGSAP } from '@/lib/gsap';

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Customers' },
  { icon: MapPin, value: '5', label: 'Districts' },
  { icon: Zap, value: '99.5%', label: 'Uptime SLA' },
  { icon: Clock, value: '24/7', label: 'Support' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Text lines reveal
      const lines = heroRef.current!.querySelectorAll('.hero-line');
      gsap.fromTo(lines,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

      // Badge reveal
      gsap.fromTo('.hero-badge',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 0.05 }
      );

      // CTA buttons
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
      );

      // Stats cards float in
      const cards = statsRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.8,
          }
        );

        // Floating animation for each card
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: -8 + (i % 2 === 0 ? -4 : 4),
            duration: 2.5 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.4,
          });
        });
      }

      // SVG fiber line draw
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path[data-fiber]');
        paths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength?.() || 300;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            delay: 0.5,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(24,226,153,0.12) 0%, transparent 70%)',
        }}
      />

      {/* SVG fiber network background */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          data-fiber
          d="M0 350 Q 200 200 400 350 T 800 350 T 1200 350"
          stroke="var(--green)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          data-fiber
          d="M0 250 Q 300 100 600 250 T 1200 250"
          stroke="var(--green)"
          strokeWidth="1"
          fill="none"
        />
        <path
          data-fiber
          d="M0 450 Q 400 600 700 400 T 1200 450"
          stroke="var(--green)"
          strokeWidth="1"
          fill="none"
        />
        <path
          data-fiber
          d="M 100 0 Q 250 350 400 700"
          stroke="var(--green)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          data-fiber
          d="M 800 0 Q 900 350 1000 700"
          stroke="var(--green)"
          strokeWidth="0.8"
          fill="none"
        />
        {[100, 300, 500, 700, 900, 1100].map((x, i) => (
          <circle key={i} cx={x} cy={150 + (i % 3) * 130} r="3" fill="var(--green)" opacity="0.6" />
        ))}
      </svg>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="hero-badge mb-6 inline-flex">
          <Badge variant="green">Nepal's Fastest Fiber Network</Badge>
        </div>

        <div className="overflow-hidden mb-4">
          <h1 className="hero-line text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]" style={{ color: 'var(--black)' }}>
            Connect Nepal
          </h1>
        </div>
        <div className="overflow-hidden mb-4">
          <h1 className="hero-line text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            <span style={{ color: 'var(--green)' }}>Fiber-Fast</span>
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1 className="hero-line text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]" style={{ color: 'var(--black)' }}>
            Internet
          </h1>
        </div>

        <div className="overflow-hidden mb-10 max-w-2xl mx-auto">
          <p className="hero-line text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--gray-500)' }}>
            World Fiber Net delivers ultra-reliable fiber optic internet to homes and businesses across Bagmati Province. Plans from Rs. 899/month with free installation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <div className="hero-cta">
            <Btn href="/packages" variant="primary" size="lg">
              View Plans <ArrowRight size={18} />
            </Btn>
          </div>
          <div className="hero-cta">
            <Btn href="/coverage" variant="outline" size="lg">
              Check Coverage
            </Btn>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card rounded-2xl p-5 text-center"
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: 'var(--green-50)' }}
              >
                <stat.icon size={16} style={{ color: 'var(--green-700)' }} />
              </div>
              <div className="font-bold text-xl font-mono" style={{ color: 'var(--black)' }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--gray-500)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--gray-300), transparent)' }} />
      </div>
    </section>
  );
}
