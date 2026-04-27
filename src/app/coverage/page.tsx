'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, CheckCircle, Clock, Phone, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Btn from '@/components/Btn';
import { COVERAGE, BRANCHES } from '@/lib/plans';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const districtDetails = [
  {
    name: 'Kathmandu',
    status: 'active',
    areas: ['Banasthali', 'Balaju', 'Tokha', 'Tarakeshwor', 'Budhanilkantha'],
    desc: 'Our head office is in Banasthali with full coverage across Kathmandu Valley.',
  },
  {
    name: 'Nuwakot',
    status: 'active',
    areas: ['Betrawati', 'Trishuli', 'Kakani', 'Bidur', 'Kispang'],
    desc: 'Our original service area — Nuwakot has the most mature fiber infrastructure.',
  },
  {
    name: 'Dhading',
    status: 'active',
    areas: ['Baireni', 'Benighat', 'Nilkantha', 'Dhunibesi'],
    desc: 'Serving Dhading from two branch offices for maximum local coverage.',
  },
  {
    name: 'Gorkha',
    status: 'active',
    areas: ['Gorkha Bazaar', 'Palungtar', 'Arughat'],
    desc: 'Bringing fiber connectivity to Gorkha\'s growing urban areas.',
  },
  {
    name: 'Sindhupalchok',
    status: 'soon',
    areas: ['Chautara', 'Melamchi'],
    desc: 'Infrastructure rollout in progress. Expected launch Q2 2025.',
  },
  {
    name: 'Lamjung',
    status: 'soon',
    areas: ['Besisahar', 'Sundarbazar'],
    desc: 'Planning phase complete. Network construction begins soon.',
  },
];

export default function CoveragePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState('');
  const [checked, setChecked] = useState(false);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.coverage-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      const distCards = pageRef.current!.querySelectorAll('.dist-card');
      gsap.fromTo(distCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.dist-grid',
            start: 'top 78%',
          },
        }
      );

      // Pulse active district dots
      const activePulses = pageRef.current!.querySelectorAll('.pulse-ring');
      activePulses.forEach((ring, i) => {
        gsap.to(ring, {
          scale: 2.8,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: 'power1.out',
          delay: i * 0.3,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setChecked(true);
  };

  return (
    <div ref={pageRef} className="pt-24">
      {/* Hero */}
      <section
        className="coverage-hero py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(to bottom, var(--green-50) 0%, #fff 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel className="mb-5">Coverage</SectionLabel>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--black)' }}>
            Is fiber available in your area?
          </h1>
          <p className="text-xl leading-relaxed mb-10" style={{ color: 'var(--gray-500)' }}>
            World Fiber Net currently serves 5 districts across Bagmati Province with more coming soon.
          </p>

          {/* Address checker */}
          <div className="max-w-xl mx-auto">
            {checked ? (
              <div className="rounded-2xl p-6 text-left" style={{ backgroundColor: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} style={{ color: 'var(--green-700)' }} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1" style={{ color: 'var(--green-700)' }}>
                      Great news! Fiber may be available at your address.
                    </p>
                    <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                      Contact us at 9840182401 to confirm availability and schedule your free installation.
                    </p>
                    <button
                      onClick={() => setChecked(false)}
                      className="text-sm mt-2 underline"
                      style={{ color: 'var(--green-700)' }}
                    >
                      Check another address
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheck} className="flex gap-3">
                <div className="flex-1 relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--gray-400)' }} />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address or area..."
                    required
                    className="w-full h-12 pl-10 pr-4 rounded-full text-sm border outline-none focus:ring-2 focus:ring-green-500/30"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)', fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-6 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}
                >
                  Check Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Coverage stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '5', label: 'Active Districts' },
            { value: '2', label: 'Coming Soon' },
            { value: '6', label: 'Branch Offices' },
            { value: '1,000+', label: 'km Fiber Laid' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-6 text-center border"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="text-3xl font-bold font-mono mb-1" style={{ color: 'var(--black)' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--gray-500)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* District cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">Districts</SectionLabel>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--black)' }}>Coverage area details</h2>
          </div>

          <div className="dist-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtDetails.map((dist, i) => (
              <div
                key={i}
                className="dist-card rounded-2xl p-6 border"
                style={{
                  border: `1px solid ${dist.status === 'active' ? 'var(--green-100)' : 'var(--border)'}`,
                  backgroundColor: dist.status === 'active' ? 'var(--green-50)' : '#fafafa',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      {dist.status === 'active' && (
                        <div
                          className="pulse-ring absolute inset-0 rounded-full"
                          style={{ backgroundColor: 'var(--green)', opacity: 0.6 }}
                        />
                      )}
                      <div
                        className="w-3 h-3 rounded-full relative z-10"
                        style={{
                          backgroundColor: dist.status === 'active' ? 'var(--green)' : 'var(--gray-300)',
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--black)' }}>{dist.name}</h3>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: dist.status === 'active' ? 'var(--green)' : 'var(--gray-200)',
                      color: dist.status === 'active' ? 'var(--black)' : 'var(--gray-600)',
                    }}
                  >
                    {dist.status === 'active' ? 'Active' : 'Coming Soon'}
                  </span>
                </div>

                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--gray-500)' }}>{dist.desc}</p>

                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--gray-400)' }}>AREAS COVERED</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dist.areas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: dist.status === 'active' ? 'var(--green-100)' : 'var(--gray-200)',
                          color: dist.status === 'active' ? 'var(--green-700)' : 'var(--gray-600)',
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--black)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(24,226,153,0.15)', color: 'var(--green)' }}>
              Branch Offices
            </span>
            <h2 className="text-3xl font-bold text-white">Visit us near you</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES.map((branch, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} style={{ color: 'var(--green)' }} />
                  <h3 className="font-semibold text-white">{branch.name}</h3>
                </div>
                <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{branch.location}</p>
                <a
                  href={`tel:${branch.phone.split('/')[0].trim().replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--green)' }}
                >
                  <Phone size={13} />
                  {branch.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
