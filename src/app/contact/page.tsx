'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { BRANCHES } from '@/lib/plans';
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap';

const inquiryTypes = [
  'New Connection',
  'Upgrade Plan',
  'Technical Support',
  'Billing Inquiry',
  'Business Solution',
  'Agent Partnership',
  'Other',
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    district: '',
    inquiry: 'New Connection',
    message: '',
  });

  useEffect(() => {
    registerGSAP();
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo('.contact-form-col',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo('.contact-info-col',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 78%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-sm border outline-none focus:ring-2 transition-all";
  const inputStyle = {
    border: '1px solid var(--border-md)',
    color: 'var(--black)',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#fff',
  };

  return (
    <div ref={pageRef} className="pt-24">
      {/* Hero */}
      <section className="contact-hero py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <SectionLabel className="mb-5">Contact Us</SectionLabel>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--black)' }}>
          Get in touch
        </h1>
        <p className="text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--gray-500)' }}>
          Whether you're ready to get connected or just have a question, our team is happy to help you find the right solution.
        </p>
      </section>

      {/* Main content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto contact-grid grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="contact-form-col lg:col-span-3">
            <div
              className="rounded-3xl p-8 md:p-10 border"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'var(--green-50)' }}
                  >
                    <CheckCircle size={32} style={{ color: 'var(--green-700)' }} />
                  </div>
                  <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--black)' }}>Message sent!</h2>
                  <p className="mb-6" style={{ color: 'var(--gray-500)' }}>
                    Thank you for reaching out. We'll get back to you within a few hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-medium underline"
                    style={{ color: 'var(--green-700)' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--black)' }}>Send us a message</h2>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gray-600)' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Rajesh Shrestha"
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gray-600)' }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="98XXXXXXXX"
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gray-600)' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gray-600)' }}>
                          Your District
                        </label>
                        <input
                          type="text"
                          name="district"
                          value={form.district}
                          onChange={handleChange}
                          placeholder="e.g. Kathmandu"
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gray-600)' }}>
                          Inquiry Type
                        </label>
                        <select
                          name="inquiry"
                          value={form.inquiry}
                          onChange={handleChange}
                          className={inputClass}
                          style={inputStyle}
                        >
                          {inquiryTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gray-600)' }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your needs or ask any question..."
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2 resize-none transition-all"
                        style={{ ...inputStyle, height: 'auto' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}
                    >
                      Send Message <Send size={15} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="contact-info-col lg:col-span-2 space-y-6">
            {/* Quick contact */}
            <div
              className="rounded-2xl p-6 border"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="font-bold mb-5" style={{ color: 'var(--black)' }}>Quick Contact</h3>
              <div className="space-y-4">
                <a href="tel:9840182401" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-50)' }}>
                    <Phone size={15} style={{ color: 'var(--green-700)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--gray-400)' }}>Head Office</div>
                    <div className="text-sm font-semibold font-mono" style={{ color: 'var(--black)' }}>9840182401 / 9840182400</div>
                  </div>
                </a>

                <a href="mailto:betrawaticable2017@gmail.com" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-50)' }}>
                    <Mail size={15} style={{ color: 'var(--green-700)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--gray-400)' }}>Email</div>
                    <div className="text-sm font-semibold break-all" style={{ color: 'var(--black)' }}>betrawaticable2017@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-50)' }}>
                    <MapPin size={15} style={{ color: 'var(--green-700)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--gray-400)' }}>Head Office</div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--black)' }}>Banasthali, Kathmandu</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green-50)' }}>
                    <Clock size={15} style={{ color: 'var(--green-700)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--gray-400)' }}>Support Hours</div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--black)' }}>24 hours / 7 days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/9779840182401"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl p-5 border hover:shadow-md transition-all duration-200"
              style={{ border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
                <MessageSquare size={18} style={{ color: '#fff' }} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#15803d' }}>Chat on WhatsApp</div>
                <div className="text-xs" style={{ color: '#16a34a' }}>Quick replies during business hours</div>
              </div>
            </a>

            {/* Branch list */}
            <div
              className="rounded-2xl p-6 border"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="font-bold mb-4" style={{ color: 'var(--black)' }}>All Branches</h3>
              <div className="space-y-3">
                {BRANCHES.map((branch, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{branch.name}</div>
                      <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{branch.location}</div>
                    </div>
                    <a
                      href={`tel:${branch.phone.split('/')[0].trim()}`}
                      className="text-xs font-mono flex-shrink-0"
                      style={{ color: 'var(--green-700)' }}
                    >
                      {branch.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
