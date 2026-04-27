'use client';

import { useEffect, useRef } from 'react';
import { Users, DollarSign, Headphones, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Btn from '@/components/Btn';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const benefits = [
  {
    icon: DollarSign,
    title: 'Earn on Every Sale',
    desc: 'Get competitive commissions for every subscriber you bring in. Monthly payouts, no delays.',
  },
  {
    icon: Headphones,
    title: 'Full Support Provided',
    desc: 'We handle installation, billing, and technical support. You just focus on growing your network.',
  },
  {
    icon: Users,
    title: 'Build Your Team',
    desc: 'Recruit sub-agents and earn residual income on their sales too. Unlimited earning potential.',
  },
];

export default function AgentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.agent-header',
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

      const cards = sectionRef.current!.querySelectorAll('.agent-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="agent-header text-center mb-16">
          <SectionLabel className="mb-4">Become an Agent</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--black)' }}>
            Grow with World Fiber Net
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-500)' }}>
            Join our agent network and earn while helping your community get connected. No experience required — we train you everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="agent-card rounded-2xl p-8 border text-center"
              style={{
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'var(--green-50)' }}
              >
                <benefit.icon size={24} style={{ color: 'var(--green-700)' }} />
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--black)' }}>
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Btn href="/contact" variant="primary" size="lg">
            Become an Agent <ArrowRight size={16} />
          </Btn>
          <p className="mt-4 text-sm" style={{ color: 'var(--gray-400)' }}>
            Contact us at 9840182401 or email betrawaticable2017@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
