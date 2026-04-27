'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const inner = sectionRef.current!.querySelector('.newsletter-inner');
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
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="newsletter-inner max-w-3xl mx-auto text-center">
        <SectionLabel className="mb-5">Stay Updated</SectionLabel>
        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--black)' }}>
          Get the latest news & offers
        </h2>
        <p className="text-lg mb-10" style={{ color: 'var(--gray-500)' }}>
          Subscribe to our newsletter for coverage updates, new plans, and exclusive offers for our community.
        </p>

        {submitted ? (
          <div
            className="flex items-center justify-center gap-3 p-6 rounded-2xl"
            style={{ backgroundColor: 'var(--green-50)', border: '1px solid var(--green-100)' }}
          >
            <CheckCircle size={22} style={{ color: 'var(--green-700)' }} />
            <div className="text-left">
              <p className="font-semibold" style={{ color: 'var(--green-700)' }}>You're subscribed!</p>
              <p className="text-sm" style={{ color: 'var(--gray-500)' }}>We'll keep you updated on the latest from World Fiber Net.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 h-12 px-5 rounded-full text-sm border outline-none focus:ring-2 transition-all"
              style={{
                border: '1px solid var(--border-md)',
                color: 'var(--black)',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-full font-semibold text-sm flex items-center gap-2 justify-center hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}
            >
              Subscribe <Send size={14} />
            </button>
          </form>
        )}

        <p className="mt-4 text-xs" style={{ color: 'var(--gray-400)' }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
