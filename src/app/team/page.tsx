'use client';

import { useEffect, useRef } from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const team = [
  {
    name: 'Rajesh Shrestha',
    role: 'Founder & CEO',
    dept: 'Leadership',
    bio: 'With over 10 years in Nepal\'s telecom sector, Rajesh founded World Fiber Net with a vision to democratize internet access across Bagmati Province.',
    initials: 'RS',
    color: '#18E299',
  },
  {
    name: 'Priya Tamang',
    role: 'Head of Operations',
    dept: 'Operations',
    bio: 'Priya ensures seamless day-to-day operations across all 6 branches, driving efficiency and quality service delivery to every customer.',
    initials: 'PT',
    color: '#6366f1',
  },
  {
    name: 'Bikash Karki',
    role: 'CTO',
    dept: 'Engineering',
    bio: 'Bikash leads our technical infrastructure, overseeing network architecture, fiber deployments, and technology roadmap for WFN.',
    initials: 'BK',
    color: '#3b82f6',
  },
  {
    name: 'Sita Magar',
    role: 'Head of Customer Success',
    dept: 'Support',
    bio: 'Sita and her team ensure every customer receives prompt, friendly, and effective support — maintaining our 95% satisfaction rate.',
    initials: 'SM',
    color: '#f59e0b',
  },
  {
    name: 'Deepak Rai',
    role: 'Network Engineer',
    dept: 'Engineering',
    bio: 'Deepak designs and maintains our fiber network backbone, ensuring 99.5% uptime and optimal performance across all districts.',
    initials: 'DR',
    color: '#ef4444',
  },
  {
    name: 'Anita Gurung',
    role: 'Sales Manager',
    dept: 'Sales',
    bio: 'Anita drives subscriber growth and manages our agent network, bringing World Fiber Net connectivity to more homes and businesses.',
    initials: 'AG',
    color: '#8b5cf6',
  },
  {
    name: 'Suresh Adhikari',
    role: 'Branch Manager Dhading',
    dept: 'Operations',
    bio: 'Suresh oversees our Dhading operations in Baireni and Benighat, ensuring local customers receive world-class service.',
    initials: 'SA',
    color: '#0ea5e9',
  },
  {
    name: 'Kamala Thapa',
    role: 'Finance Manager',
    dept: 'Finance',
    bio: 'Kamala manages financial planning, billing operations, and ensures World Fiber Net\'s sustainable growth for the long term.',
    initials: 'KT',
    color: '#10b981',
  },
];

const deptColors: Record<string, string> = {
  Leadership: 'var(--green-100)',
  Operations: '#e0e7ff',
  Engineering: '#dbeafe',
  Support: '#fef3c7',
  Sales: '#ede9fe',
  Finance: '#d1fae5',
};

const deptTextColors: Record<string, string> = {
  Leadership: 'var(--green-700)',
  Operations: '#4338ca',
  Engineering: '#1d4ed8',
  Support: '#92400e',
  Sales: '#5b21b6',
  Finance: '#047857',
};

export default function TeamPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.team-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      const cards = pageRef.current!.querySelectorAll('.team-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 78%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-24">
      {/* Hero */}
      <section className="team-hero py-20 px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
        <SectionLabel className="mb-5">Our Team</SectionLabel>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--black)' }}>
          The people behind the fiber
        </h1>
        <p className="text-xl leading-relaxed" style={{ color: 'var(--gray-500)' }}>
          Our dedicated team of engineers, support staff, and business professionals work tirelessly to keep Nepal connected.
        </p>
      </section>

      {/* Team grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto team-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="team-card rounded-2xl p-6 border flex flex-col hover:shadow-lg transition-shadow duration-300"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', backgroundColor: '#fff' }}
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-5"
                  style={{ backgroundColor: `${member.color}20`, color: member.color }}
                >
                  {member.initials}
                </div>

                {/* Dept badge */}
                <div className="mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: deptColors[member.dept] || 'var(--gray-100)',
                      color: deptTextColors[member.dept] || 'var(--gray-600)',
                    }}
                  >
                    {member.dept}
                  </span>
                </div>

                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--black)' }}>{member.name}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--gray-500)' }}>{member.role}</p>
                <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--gray-500)' }}>{member.bio}</p>

                <div className="flex gap-2 mt-5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Profile"
                  >
                    <ExternalLink size={14} style={{ color: 'var(--gray-400)' }} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Email"
                  >
                    <Mail size={14} style={{ color: 'var(--gray-400)' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{ backgroundColor: 'var(--gray-50)' }}
      >
        <div className="max-w-2xl mx-auto">
          <SectionLabel className="mb-5">Join Our Team</SectionLabel>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--black)' }}>
            We're always looking for great people
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--gray-500)' }}>
            Passionate about technology and connecting communities? Reach out — we'd love to hear from you.
          </p>
          <a
            href="mailto:betrawaticable2017@gmail.com"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}
          >
            <Mail size={16} />
            Send Us Your Resume
          </a>
        </div>
      </section>
    </div>
  );
}
