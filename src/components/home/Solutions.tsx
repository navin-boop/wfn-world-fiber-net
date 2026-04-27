'use client';

import { useEffect, useRef } from 'react';
import { Home, Building2, Globe, Mail, Shield, Phone } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const solutions = [
  {
    icon: Home,
    title: 'Home Fiber',
    desc: 'Lightning-fast internet for streaming, gaming, and remote work. Up to 1 Gbps speeds for the whole family.',
    color: 'var(--green)',
    bg: 'var(--green-50)',
  },
  {
    icon: Building2,
    title: 'Business Fiber',
    desc: 'Dedicated symmetric fiber with SLA guarantees. Keep your business running without interruptions.',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    icon: Globe,
    title: 'Domain Registration',
    desc: 'Register .com.np, .np and international domains with easy management and DNS control.',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    icon: Mail,
    title: 'Email Hosting',
    desc: 'Professional email hosting with your domain. Reliable, spam-filtered, and feature-rich.',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    icon: Shield,
    title: 'Managed Security',
    desc: 'Enterprise-grade firewall and threat protection managed by our security experts 24/7.',
    color: '#ef4444',
    bg: '#fef2f2',
  },
  {
    icon: Phone,
    title: 'VoIP & Telephony',
    desc: 'Crystal-clear voice calls over fiber. Scalable PBX solutions for businesses of all sizes.',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.solution-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.solutions-header',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="solutions-header text-center mb-16">
          <SectionLabel className="mb-4">Our Solutions</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--black)' }}>
            Everything you need to stay connected
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-500)' }}>
            From blazing home internet to enterprise-grade business solutions — we power Nepal's digital future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <div
              key={i}
              className="solution-card rounded-2xl p-8 border group hover:shadow-lg transition-shadow duration-300"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: sol.bg }}
              >
                <sol.icon size={24} style={{ color: sol.color }} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--black)' }}>
                {sol.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>
                {sol.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
