'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Zap, Star } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Badge from '@/components/Badge';
import Btn from '@/components/Btn';
import { PLANS } from '@/lib/plans';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';
import PackageRecommender from '@/components/home/PackageRecommender';
import CostCalculator from '@/components/home/CostCalculator';

const addons = [
  { name: 'Static IP Address', price: '200', desc: 'Dedicated IP for remote access, hosting, and business needs' },
  { name: 'Enhanced Router', price: '300', desc: 'Tri-band WiFi 6 router for maximum home coverage and speed' },
  { name: 'Priority Support', price: '150', desc: 'Jump the queue with dedicated priority technical support line' },
  { name: 'Extra Static IPs (x5)', price: '800', desc: 'Block of 5 static IPs for multi-server or office setups' },
];

export default function PackagesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    registerGSAP();
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.packages-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      const cards = pageRef.current!.querySelectorAll('.pkg-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pkg-grid',
            start: 'top 78%',
          },
        }
      );

      const addonCards = pageRef.current!.querySelectorAll('.addon-card');
      gsap.fromTo(addonCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.addons-section',
            start: 'top 80%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const getPrice = (base: string) => {
    if (billingPeriod === 'yearly') {
      const num = parseInt(base.replace(',', ''));
      const discounted = Math.round(num * 10);
      return discounted.toLocaleString();
    }
    return base;
  };

  return (
    <div ref={pageRef} className="pt-24">
      {/* Hero */}
      <section className="packages-hero py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <SectionLabel className="mb-5">Pricing Plans</SectionLabel>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--black)' }}>
          Plans for every need
        </h1>
        <p className="text-xl leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: 'var(--gray-500)' }}>
          All plans include unlimited data, free installation, and no hidden charges. Cancel anytime.
        </p>

        {/* Billing toggle */}
        <div
          className="inline-flex items-center p-1 rounded-full"
          style={{ backgroundColor: 'var(--gray-100)' }}
        >
          {(['monthly', 'yearly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setBillingPeriod(period)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: billingPeriod === period ? '#fff' : 'transparent',
                color: billingPeriod === period ? 'var(--black)' : 'var(--gray-500)',
                boxShadow: billingPeriod === period ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {period === 'monthly' ? 'Monthly' : 'Yearly (Save 2 months)'}
            </button>
          ))}
        </div>
      </section>

      {/* AI Tools */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PackageRecommender />
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pkg-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`pkg-card relative rounded-2xl p-7 flex flex-col border ${plan.popular ? 'ring-2' : ''}`}
                style={{
                  borderColor: plan.popular ? 'var(--green)' : 'var(--border)',
                  backgroundColor: plan.popular ? 'var(--green-50)' : '#fff',
                  boxShadow: plan.popular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: 'var(--black)', color: '#fff' }}
                    >
                      <Star size={10} fill="var(--green)" style={{ color: 'var(--green)' }} />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <Badge variant={plan.popular ? 'green' : 'gray'} className="mb-3">{plan.badge}</Badge>
                  <h2 className="font-bold text-lg mb-1" style={{ color: 'var(--black)' }}>{plan.name}</h2>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-mono" style={{ color: 'var(--black)' }}>
                      {plan.speed}
                    </span>
                    <span className="font-semibold text-base" style={{ color: 'var(--gray-500)' }}>
                      {plan.unit}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--gray-400)' }}>download speed</p>
                </div>

                <div className="mb-6 py-4 border-y" style={{ borderColor: plan.popular ? 'var(--green-100)' : 'var(--border)' }}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>Rs.</span>
                    <span className="text-3xl font-bold font-mono" style={{ color: plan.popular ? 'var(--green-700)' : 'var(--black)' }}>
                      {getPrice(plan.price)}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--gray-400)' }}>
                      {billingPeriod === 'yearly' ? '/year' : '/month'}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <p className="text-xs mt-1" style={{ color: 'var(--green-700)' }}>
                      Save Rs. {(parseInt(plan.price.replace(',', '')) * 2).toLocaleString()}!
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: plan.popular ? 'var(--green-700)' : 'var(--gray-400)' }}
                        strokeWidth={2.5}
                      />
                      <span className="text-sm" style={{ color: 'var(--gray-600)' }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Btn
                  href="/contact"
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full"
                >
                  {plan.popular ? (
                    <><Zap size={14} /> Get Started</>
                  ) : (
                    'Choose Plan'
                  )}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="addons-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">Add-ons</SectionLabel>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--black)' }}>Customize your plan</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addons.map((addon, i) => (
              <div
                key={i}
                className="addon-card rounded-2xl p-6 border flex justify-between items-start gap-4"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--black)' }}>{addon.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--gray-500)' }}>{addon.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs" style={{ color: 'var(--gray-400)' }}>+Rs.</div>
                  <div className="font-bold text-lg font-mono" style={{ color: 'var(--black)' }}>{addon.price}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-400)' }}>/mo</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--gray-50)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">FAQ</SectionLabel>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--black)' }}>Common questions</h2>
          </div>

          {[
            {
              q: 'Is installation really free?',
              a: 'Yes! All plans include professional installation at no extra cost. Our technicians will set up your fiber connection and configure your router.',
            },
            {
              q: 'Are there any data limits?',
              a: 'Never. All World Fiber Net plans come with truly unlimited data. We do not throttle your speeds or charge for overages.',
            },
            {
              q: 'How long does installation take?',
              a: 'Most installations are completed within 1-2 business days of signing up. Our team will schedule a time that works for you.',
            },
            {
              q: 'Can I upgrade my plan later?',
              a: 'Absolutely. You can upgrade your plan at any time. Downgrades can be made at the end of your current billing period.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="mb-4 rounded-2xl p-6 border"
              style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--black)' }}>{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
