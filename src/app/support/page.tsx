'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MessageSquare, Book, Wifi, Router, AlertTriangle, HelpCircle } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { BRANCHES } from '@/lib/plans';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const faqs = [
  {
    category: 'Getting Started',
    icon: Book,
    items: [
      {
        q: 'How do I get started with World Fiber Net?',
        a: 'Simply call us at 9840182401 or fill out our contact form. We\'ll check availability at your address, explain the plans, and schedule a free installation at your convenience.',
      },
      {
        q: 'What do I need for installation?',
        a: 'Nothing special! Our technicians bring all the necessary equipment. You just need to be available at your premises during the installation window (usually 2-3 hours).',
      },
      {
        q: 'How long does installation take?',
        a: 'Most installations are completed in 2-3 hours. Complex setups or multi-floor buildings may take longer. We\'ll give you an accurate time estimate when booking.',
      },
    ],
  },
  {
    category: 'Connectivity Issues',
    icon: Wifi,
    items: [
      {
        q: 'My internet is slow. What should I do?',
        a: 'First, restart your router by unplugging it for 30 seconds. Then run a speed test at fast.com. If speeds are still low, call our 24/7 support line at 9840182401.',
      },
      {
        q: 'My internet connection dropped. How do I fix it?',
        a: 'Check if all cables are securely connected, restart your router, and wait 2 minutes. If the issue persists, check our service status or call us directly.',
      },
      {
        q: 'How do I test my actual internet speed?',
        a: 'Use fast.com or speedtest.net on a device connected via ethernet cable for the most accurate reading. WiFi speeds may be lower due to interference.',
      },
    ],
  },
  {
    category: 'Router & WiFi',
    icon: Router,
    items: [
      {
        q: 'How do I change my WiFi password?',
        a: 'Access your router admin panel at 192.168.1.1 (default login: admin/admin). Go to Wireless Settings → Security and update your password. Save and reconnect your devices.',
      },
      {
        q: 'My WiFi signal is weak in some rooms. What can I do?',
        a: 'Try repositioning your router to a central location. Consider upgrading to our Enhanced Router add-on (WiFi 6) or adding a mesh WiFi extender for larger spaces.',
      },
    ],
  },
  {
    category: 'Billing',
    icon: HelpCircle,
    items: [
      {
        q: 'When is my bill due?',
        a: 'Bills are due on the 1st of each month. You\'ll receive an SMS reminder 5 days before the due date. Pay via eSewa, Khalti, bank transfer, or at any branch office.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept cash at branch offices, eSewa, Khalti, IME Pay, bank transfers, and cheques. Contact us to set up auto-payment for hassle-free billing.',
      },
    ],
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: '24/7 Phone Support',
    desc: 'Speak to a technician anytime, day or night',
    value: '9840182401 / 9840182400',
    action: 'tel:9840182401',
    color: 'var(--green)',
    bg: 'var(--green-50)',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'Send us your query, we reply within 4 hours',
    value: 'betrawaticable2017@gmail.com',
    action: 'mailto:betrawaticable2017@gmail.com',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    desc: 'Chat with our support team directly',
    value: '+977 9840182401',
    action: 'https://wa.me/9779840182401',
    color: '#22c55e',
    bg: '#f0fdf4',
  },
];

export default function SupportPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    registerGSAP();
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.support-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      const contactCards = pageRef.current!.querySelectorAll('.contact-method');
      gsap.fromTo(contactCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-methods',
            start: 'top 80%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (key: string) => {
    setOpenFaq(openFaq === key ? null : key);
  };

  return (
    <div ref={pageRef} className="pt-24">
      {/* Hero */}
      <section className="support-hero py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <SectionLabel className="mb-5">Support Center</SectionLabel>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--black)' }}>
          We're here to help
        </h1>
        <p className="text-xl leading-relaxed" style={{ color: 'var(--gray-500)' }}>
          Our Nepali-speaking support team is available 24/7 to help you with any questions or technical issues.
        </p>
      </section>

      {/* Contact methods */}
      <section className="contact-methods py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, i) => (
            <a
              key={i}
              href={method.action}
              target={method.action.startsWith('http') ? '_blank' : undefined}
              rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-method rounded-2xl p-7 border block hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', backgroundColor: '#fff' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: method.bg }}
              >
                <method.icon size={22} style={{ color: method.color }} />
              </div>
              <h3 className="font-bold mb-1" style={{ color: 'var(--black)' }}>{method.title}</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--gray-500)' }}>{method.desc}</p>
              <p className="text-sm font-semibold font-mono break-all" style={{ color: method.color }}>{method.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Branch contacts */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--gray-50)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Branch office contacts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES.map((branch, i) => (
              <div
                key={i}
                className="rounded-xl p-5 border"
                style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}
              >
                <h3 className="font-semibold mb-1" style={{ color: 'var(--black)' }}>{branch.name}</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--gray-500)' }}>{branch.location}</p>
                <a
                  href={`tel:${branch.phone.split('/')[0].trim()}`}
                  className="text-sm font-medium font-mono"
                  style={{ color: 'var(--green-700)' }}
                >
                  {branch.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">FAQ</SectionLabel>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--black)' }}>Frequently asked questions</h2>
          </div>

          {faqs.map((group) => (
            <div key={group.category} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--green-50)' }}
                >
                  <group.icon size={15} style={{ color: 'var(--green-700)' }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--black)' }}>{group.category}</h3>
              </div>

              <div className="space-y-2">
                {group.items.map((item, j) => {
                  const key = `${group.category}-${j}`;
                  const isOpen = openFaq === key;

                  return (
                    <div
                      key={j}
                      className="rounded-xl border overflow-hidden"
                      style={{ borderColor: isOpen ? 'var(--green-200)' : 'var(--border)', backgroundColor: isOpen ? 'var(--green-50)' : '#fff' }}
                    >
                      <button
                        onClick={() => toggleFaq(key)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-medium text-sm pr-4" style={{ color: 'var(--black)' }}>{item.q}</span>
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200"
                          style={{
                            backgroundColor: isOpen ? 'var(--green)' : 'var(--gray-100)',
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          }}
                        >
                          <span style={{ color: isOpen ? 'var(--black)' : 'var(--gray-500)', fontSize: '16px', lineHeight: 1 }}>+</span>
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div
            className="mt-10 rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'var(--green-50)', border: '1px solid var(--green-100)' }}
          >
            <AlertTriangle size={24} className="mx-auto mb-3" style={{ color: 'var(--green-700)' }} />
            <h3 className="font-bold mb-2" style={{ color: 'var(--black)' }}>Still need help?</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--gray-500)' }}>
              Our technical team is available 24/7 for immediate assistance.
            </p>
            <a
              href="tel:9840182401"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full font-semibold text-sm"
              style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}
            >
              <Phone size={14} />
              Call Now: 9840182401
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
