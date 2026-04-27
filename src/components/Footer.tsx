'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Wifi } from 'lucide-react';
import Logo from './Logo';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Our Team' },
  { href: '/services', label: 'Services' },
  { href: '/packages', label: 'Packages' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/support', label: 'Support' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  'Home Fiber',
  'Business Fiber',
  'Domain Registration',
  'Email Hosting',
  'Managed Security',
  'VoIP & Telephony',
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!colsRef.current) return;

    const ctx = gsap.context(() => {
      const cols = colsRef.current!.querySelectorAll('.footer-col');
      gsap.fromTo(cols,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--gray-50)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div ref={colsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand col */}
          <div className="footer-col">
            <Logo className="mb-4" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--gray-500)' }}>
              Nepal's trusted fiber internet provider, delivering blazing-fast connectivity across Bagmati Province and beyond.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-500)' }}>
              <Wifi size={14} style={{ color: 'var(--green)' }} />
              <span>99.5% Uptime Guaranteed</span>
            </div>
          </div>

          {/* Links col */}
          <div className="footer-col">
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--black)' }}>Company</h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-black"
                    style={{ color: 'var(--gray-500)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services col */}
          <div className="footer-col">
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--black)' }}>Services</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm transition-colors hover:text-black"
                    style={{ color: 'var(--gray-500)' }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="footer-col">
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--black)' }}>Contact</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }} />
                <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
                  Banasthali, Kathmandu<br />Bagmati Province, Nepal
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="flex-shrink-0" style={{ color: 'var(--green)' }} />
                <a href="tel:9840182401" className="text-sm hover:text-black transition-colors" style={{ color: 'var(--gray-500)' }}>
                  9840182401 / 9840182400
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="flex-shrink-0" style={{ color: 'var(--green)' }} />
                <a href="mailto:betrawaticable2017@gmail.com" className="text-sm hover:text-black transition-colors break-all" style={{ color: 'var(--gray-500)' }}>
                  betrawaticable2017@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--gray-400)' }}
        >
          <span>&copy; {new Date().getFullYear()} World Fiber Net. All rights reserved.</span>
          <span>Built with love for Nepal's connectivity</span>
        </div>
      </div>
    </footer>
  );
}
