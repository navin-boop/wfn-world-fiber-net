'use client';

import { useEffect, useRef } from 'react';
import { Target, Eye, Heart, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Btn from '@/components/Btn';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const timeline = [
  { year: '2017', title: 'Founded in Betrawati', desc: 'World Fiber Net was established in Betrawati, Nuwakot, with a vision to bring reliable internet to Nepal\'s hills.' },
  { year: '2018', title: 'First 500 Subscribers', desc: 'Rapid growth as word spread about our reliable service and competitive pricing in Nuwakot district.' },
  { year: '2019', title: 'Expanded to Trishuli', desc: 'Opened our Trishuli branch, extending fiber coverage to a second major township in Nuwakot.' },
  { year: '2020', title: 'Entered Dhading District', desc: 'Despite pandemic challenges, we expanded to Baireni and Benighat, serving Dhading communities.' },
  { year: '2021', title: 'Reached Kathmandu Valley', desc: 'Opened our head office in Banasthali, Kathmandu, bringing our quality service to the capital.' },
  { year: '2022', title: '5,000 Active Subscribers', desc: 'Crossed a major milestone as trust in our service grew across all our coverage areas.' },
  { year: '2023', title: 'Expanded to Gorkha', desc: 'Launched service in Gorkha district, continuing our mission to connect rural Nepal.' },
  { year: '2024', title: '10,000+ Customers', desc: 'Serving over ten thousand happy customers across 5 districts with plans to expand to Sindhupalchok and Lamjung.' },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To bridge Nepal\'s digital divide by delivering world-class fiber internet that\'s affordable, reliable, and accessible to every home and business in our coverage areas.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    desc: 'A connected Nepal where every citizen has access to high-speed internet, enabling education, business, and opportunity regardless of geography.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    desc: 'Reliability, transparency, and community. We\'re not just an ISP — we\'re neighbors who care deeply about the people and places we serve.',
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance
      gsap.fromTo('.about-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      // Values
      const valCards = pageRef.current!.querySelectorAll('.value-card');
      gsap.fromTo(valCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-section',
            start: 'top 78%',
          },
        }
      );

      // Timeline rows
      const rows = timelineRef.current?.querySelectorAll('.timeline-row');
      if (rows) {
        rows.forEach((row, i) => {
          const line = row.querySelector('.timeline-line');
          gsap.fromTo(row,
            { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
              },
            }
          );
          if (line) {
            gsap.fromTo(line,
              { scaleY: 0, transformOrigin: 'top' },
              {
                scaleY: 1,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 82%',
                },
              }
            );
          }
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-24">
      {/* Hero */}
      <section className="about-hero py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <SectionLabel className="mb-5">About Us</SectionLabel>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--black)' }}>
          Connecting Nepal,<br />one fiber at a time
        </h1>
        <p className="text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--gray-500)' }}>
          Since 2017, World Fiber Net has been on a mission to deliver fast, affordable, and reliable fiber internet to communities across Bagmati Province — starting from the hills of Nuwakot.
        </p>
      </section>

      {/* Values */}
      <section className="values-section py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div
                key={i}
                className="value-card rounded-2xl p-8 border"
                style={{ backgroundColor: '#fff', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--green-50)' }}
                >
                  <val.icon size={22} style={{ color: 'var(--green-700)' }} />
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--black)' }}>{val.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel className="mb-4">Our Journey</SectionLabel>
            <h2 className="text-4xl font-bold" style={{ color: 'var(--black)' }}>8 Years of Growth</h2>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{ backgroundColor: 'var(--border-md)' }}
            />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-row relative flex gap-6 sm:gap-10">
                  {/* Year dot */}
                  <div className="relative flex-shrink-0 hidden sm:flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full border-2 z-10 mt-1"
                      style={{
                        backgroundColor: '#fff',
                        borderColor: 'var(--green)',
                      }}
                    />
                    {i < timeline.length - 1 && (
                      <div className="timeline-line flex-1 w-px mt-2" style={{ backgroundColor: 'var(--border-md)' }} />
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    <div
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-mono mb-3"
                      style={{ backgroundColor: 'var(--green-100)', color: 'var(--green-700)' }}
                    >
                      {item.year}
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--black)' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{ backgroundColor: 'var(--green)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--black)' }}>
            Ready to get connected?
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--green-700)' }}>
            Check if fiber is available in your area and get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Btn href="/coverage" variant="outline" size="lg">Check Coverage</Btn>
            <Btn href="/contact" variant="ghost" size="lg">Contact Us <ArrowRight size={16} /></Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
