'use client';

import { useEffect, useRef } from 'react';
import { Shield, Headphones, Zap, TrendingUp, Award, Clock } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const stats = [
  { value: 10000, suffix: '+', label: 'Active Subscribers', icon: TrendingUp },
  { value: 99.5, suffix: '%', label: 'Network Uptime', icon: Zap, decimal: true },
  { value: 5, suffix: '', label: 'Districts Covered', icon: Shield },
  { value: 24, suffix: '/7', label: 'Support Hours', icon: Clock },
  { value: 8, suffix: '+', label: 'Years of Service', icon: Award },
  { value: 6, suffix: '', label: 'Branch Offices', icon: Headphones },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.whyus-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stagger stat cards
      const cards = sectionRef.current!.querySelectorAll('.stat-cell');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Counter animation
      stats.forEach((stat, i) => {
        const el = sectionRef.current!.querySelector(`#counter-${i}`);
        if (!el) return;

        const proxy = { val: 0 };

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(proxy, {
              val: stat.value,
              duration: 2,
              ease: 'power2.out',
              delay: i * 0.1,
              onUpdate: () => {
                if (el) {
                  el.textContent = stat.decimal
                    ? proxy.val.toFixed(1)
                    : Math.round(proxy.val).toLocaleString();
                }
              },
            });
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--gray-50)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="whyus-header text-center mb-16">
          <SectionLabel className="mb-4">Why World Fiber Net?</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--black)' }}>
            Numbers that tell our story
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--gray-500)' }}>
            Over 8 years of delivering reliable, high-speed fiber internet across Nepal.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-cell rounded-2xl p-8 text-center border"
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--green-50)' }}
              >
                <stat.icon size={22} style={{ color: 'var(--green-700)' }} />
              </div>
              <div className="flex items-baseline justify-center gap-0.5 mb-2">
                <span
                  id={`counter-${i}`}
                  className="text-4xl font-bold font-mono"
                  style={{ color: 'var(--black)' }}
                >
                  0
                </span>
                <span className="text-2xl font-bold" style={{ color: 'var(--green)' }}>
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-16 rounded-3xl p-8 md:p-12" style={{ backgroundColor: 'var(--green)', }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Free Installation', desc: 'No setup fees for new subscribers' },
              { label: 'No Data Caps', desc: 'Unlimited bandwidth, always' },
              { label: 'Local Support', desc: 'Nepali-speaking tech team 24/7' },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--black)' }}>{item.label}</h3>
                <p className="text-sm" style={{ color: 'var(--green-700)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
