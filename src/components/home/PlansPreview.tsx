'use client';

import { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Btn from '@/components/Btn';
import Badge from '@/components/Badge';
import { PLANS } from '@/lib/plans';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

export default function PlansPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.plans-header',
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

      const cards = sectionRef.current!.querySelectorAll('.plan-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
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
        <div className="plans-header text-center mb-16">
          <SectionLabel className="mb-4">Pricing Plans</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--black)' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--gray-500)' }}>
            All plans include unlimited data, free installation, and no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`plan-card relative rounded-2xl p-6 flex flex-col border transition-shadow hover:shadow-xl ${plan.popular ? 'ring-2' : ''}`}
              style={{
                borderColor: plan.popular ? 'var(--green)' : 'var(--border)',
                backgroundColor: plan.popular ? 'var(--green-50)' : '#fff',
                boxShadow: plan.popular ? '0 0 0 2px var(--green), var(--shadow-lg)' : 'var(--shadow-sm)',
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="dark">Most Popular</Badge>
                </div>
              )}

              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={plan.popular ? 'green' : 'gray'}>{plan.badge}</Badge>
                </div>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--black)' }}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold font-mono" style={{ color: 'var(--black)' }}>
                    {plan.speed}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--gray-500)' }}>
                    {plan.unit}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--gray-400)' }}>download speed</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xs font-medium" style={{ color: 'var(--gray-500)' }}>Rs.</span>
                  <span className="text-2xl font-bold font-mono" style={{ color: plan.popular ? 'var(--green-700)' : 'var(--black)' }}>
                    {plan.price}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--gray-400)' }}>/mo</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check
                      size={13}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: plan.popular ? 'var(--green-700)' : 'var(--gray-400)' }}
                      strokeWidth={2.5}
                    />
                    <span className="text-xs" style={{ color: 'var(--gray-600)' }}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Btn
                href="/contact"
                variant={plan.popular ? 'primary' : 'outline'}
                size="sm"
                className="w-full"
              >
                Get Started
              </Btn>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Btn href="/packages" variant="ghost" size="md">
            View All Features <ArrowRight size={16} />
          </Btn>
        </div>
      </div>
    </section>
  );
}
