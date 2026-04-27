'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import Btn from './Btn';
import { gsap, registerGSAP } from '@/lib/gsap';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/packages', label: 'Packages' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/team', label: 'Team' },
  { href: '/support', label: 'Support' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)',
      boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : '0 1px 0 rgba(0,0,0,0)',
      backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [scrolled]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-none"
      style={{ backgroundColor: 'rgba(255,255,255,0)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-150"
                  style={{
                    color: isActive ? 'var(--black)' : 'var(--gray-600)',
                    backgroundColor: isActive ? 'var(--gray-100)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Btn href="/contact" variant="outline" size="sm">Get Started</Btn>
            <Btn href="/portal.html" variant="primary" size="sm">Sign In</Btn>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: 'var(--gray-600)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden border-t"
          style={{
            backgroundColor: 'rgba(255,255,255,0.98)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
                  style={{
                    color: isActive ? 'var(--black)' : 'var(--gray-600)',
                    backgroundColor: isActive ? 'var(--gray-100)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex gap-2 mt-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <Btn href="/contact" variant="outline" size="sm" className="flex-1">Get Started</Btn>
              <Btn href="/portal.html" variant="primary" size="sm" className="flex-1">Sign In</Btn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
