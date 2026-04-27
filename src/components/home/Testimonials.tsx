'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { gsap, registerGSAP } from '@/lib/gsap';

const testimonials = [
  {
    name: 'Ramesh Shrestha',
    location: 'Kathmandu',
    text: 'I switched from cable to World Fiber Net 2 years ago and the difference is night and day. Streaming 4K with no buffering, perfect for my whole family. Best decision ever.',
    stars: 5,
    plan: 'Home Fiber 100Mbps',
  },
  {
    name: 'Sunita Tamang',
    location: 'Betrawati, Nuwakot',
    text: 'Running an online business from home used to be a nightmare. World Fiber Net changed everything. Fast speeds, reliable connection, and their support team is amazing.',
    stars: 5,
    plan: 'Power User 200Mbps',
  },
  {
    name: 'Bishnu Karki',
    location: 'Trishuli',
    text: 'Affordable plans and great service. I recommended World Fiber Net to all my neighbors and they\'re all happy customers now. The installation was quick and professional.',
    stars: 5,
    plan: 'Starter 25Mbps',
  },
  {
    name: 'Maya Gurung',
    location: 'Baireni, Dhading',
    text: 'As someone who works from home, reliable internet is critical. World Fiber Net gives me the uptime and speed I need to attend video calls without any issues. Highly recommended!',
    stars: 5,
    plan: 'Home Fiber 100Mbps',
  },
  {
    name: 'Arjun Rai',
    location: 'Gorkha',
    text: 'Finally fiber internet reached our area! The speeds are incredible compared to what we had before. Customer service is very responsive and helpful.',
    stars: 5,
    plan: 'Home Fiber 100Mbps',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    registerGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const inner = sectionRef.current!.querySelector('.testimonials-inner');
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
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (index: number) => {
    if (isAnimating || !cardRef.current) return;
    setIsAnimating(true);

    const direction = index > current ? 1 : -1;

    gsap.to(cardRef.current, {
      opacity: 0,
      x: -40 * direction,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index);
        gsap.fromTo(cardRef.current!,
          { opacity: 0, x: 40 * direction },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const prev = () => goTo(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () => goTo(current === testimonials.length - 1 ? 0 : current + 1);

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--gray-50)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="testimonials-inner">
        <div className="text-center mb-16">
          <SectionLabel className="mb-4">Customer Stories</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--black)' }}>
            Loved by thousands
          </h2>
        </div>

        <div
          className="rounded-3xl p-8 md:p-12 border relative"
          style={{ backgroundColor: '#fff', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
        >
          <div ref={cardRef}>
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} fill="var(--green)" style={{ color: 'var(--green)' }} />
              ))}
            </div>

            <blockquote
              className="text-xl md:text-2xl font-medium leading-relaxed mb-8"
              style={{ color: 'var(--black)' }}
            >
              "{t.text}"
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-bold" style={{ color: 'var(--black)' }}>{t.name}</div>
                <div className="text-sm" style={{ color: 'var(--gray-500)' }}>{t.location}</div>
                <div
                  className="text-xs mt-1 font-mono"
                  style={{ color: 'var(--green-700)' }}
                >
                  {t.plan}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  style={{ borderColor: 'var(--border-strong)' }}
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: i === current ? 'var(--black)' : 'var(--gray-300)',
                        width: i === current ? '16px' : '6px',
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  style={{ borderColor: 'var(--border-strong)' }}
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
