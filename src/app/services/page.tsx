'use client';

import { useEffect, useRef } from 'react';
import { Home, Building2, Globe, Mail, Shield, Phone, Check, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Btn from '@/components/Btn';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const services = [
  {
    icon: Home,
    title: 'Home Fiber',
    tagline: 'Blazing internet for your entire household',
    desc: 'Our home fiber plans deliver symmetrical speeds up to 1 Gbps to every corner of your home. Perfect for streaming, gaming, video calls, and everything in between — all without data caps or throttling.',
    features: [
      'Speeds from 25 Mbps to 1 Gbps',
      'Unlimited data, no throttling',
      'Free professional installation',
      'Dual-band WiFi router included',
      '24/7 customer support',
      'Static IP available',
    ],
    color: '#18E299',
    bg: 'var(--green-50)',
    yDir: -1,
  },
  {
    icon: Building2,
    title: 'Business Fiber',
    tagline: 'Enterprise-grade connectivity for your business',
    desc: 'Keep your business running at peak performance with dedicated fiber connections, SLA guarantees, and priority support. From small offices to multi-branch enterprises.',
    features: [
      'Dedicated symmetric fiber',
      '99.9% uptime SLA',
      'Multiple static IPs',
      'Priority 24/7 support',
      'Business-grade router',
      'Custom bandwidth options',
    ],
    color: '#6366f1',
    bg: '#eef2ff',
    yDir: 1,
  },
  {
    icon: Globe,
    title: 'Domain Registration',
    tagline: 'Secure your online identity in Nepal',
    desc: 'Register .com.np, .np and international domain names with easy DNS management. Bundle with our hosting services for a complete web presence solution.',
    features: [
      '.com.np and .np domains',
      'International TLD support',
      'Easy DNS management panel',
      'Domain privacy protection',
      'Auto-renewal options',
      'Fast propagation',
    ],
    color: '#f59e0b',
    bg: '#fffbeb',
    yDir: -1,
  },
  {
    icon: Mail,
    title: 'Email Hosting',
    tagline: 'Professional email with your own domain',
    desc: 'Elevate your business communication with professional email hosting. Feature-rich, spam-filtered, and reliable mailboxes that grow with your team.',
    features: [
      'Custom domain email',
      'Spam & virus protection',
      'Webmail interface',
      'IMAP/POP3/SMTP support',
      'Large mailbox storage',
      'Email aliases & groups',
    ],
    color: '#3b82f6',
    bg: '#eff6ff',
    yDir: 1,
  },
  {
    icon: Shield,
    title: 'Managed Security',
    tagline: 'Enterprise-grade protection, fully managed',
    desc: 'Protect your network with our managed security services. From firewall management to threat monitoring, our security experts keep your digital assets safe around the clock.',
    features: [
      'Next-gen firewall management',
      '24/7 threat monitoring',
      'DDoS protection',
      'Regular security audits',
      'Intrusion detection system',
      'Monthly security reports',
    ],
    color: '#ef4444',
    bg: '#fef2f2',
    yDir: -1,
  },
  {
    icon: Phone,
    title: 'VoIP & Telephony',
    tagline: 'Crystal-clear calls over fiber',
    desc: 'Replace your traditional phone system with our VoIP solutions. Save on call costs while getting feature-rich telephony — from individual lines to full PBX systems.',
    features: [
      'HD voice quality',
      'Business PBX systems',
      'Local & IDD calling',
      'Call forwarding & IVR',
      'Voicemail to email',
      'Scalable line capacity',
    ],
    color: '#8b5cf6',
    bg: '#f5f3ff',
    yDir: 1,
  },
];

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.services-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      const cards = pageRef.current!.querySelectorAll('.service-card');
      cards.forEach((card, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(card,
          { opacity: 0, y: 50 * dir },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-24">
      {/* Hero */}
      <section className="services-hero py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <SectionLabel className="mb-5">Our Services</SectionLabel>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--black)' }}>
          Complete digital solutions for Nepal
        </h1>
        <p className="text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--gray-500)' }}>
          From blazing-fast home internet to enterprise connectivity and digital services — everything you need to thrive online.
        </p>
      </section>

      {/* Services */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="service-card rounded-3xl p-8 md:p-12 border"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: svc.bg }}
                  >
                    <svc.icon size={26} style={{ color: svc.color }} />
                  </div>
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: svc.color }}>
                    Service
                  </div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--black)' }}>{svc.title}</h2>
                  <p className="text-lg font-medium mb-4" style={{ color: 'var(--gray-500)' }}>{svc.tagline}</p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--gray-500)' }}>{svc.desc}</p>
                  <Btn href="/contact" variant="primary" size="md">
                    Get Started <ArrowRight size={15} />
                  </Btn>
                </div>

                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div
                    className="rounded-2xl p-8"
                    style={{ backgroundColor: svc.bg, border: `1px solid ${svc.color}20` }}
                  >
                    <h3 className="font-semibold mb-5 text-sm" style={{ color: 'var(--black)' }}>What's Included</h3>
                    <ul className="space-y-3">
                      {svc.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: svc.color + '25' }}
                          >
                            <Check size={11} style={{ color: svc.color }} strokeWidth={3} />
                          </div>
                          <span className="text-sm" style={{ color: 'var(--gray-600)' }}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
