import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter } as never);

async function main() {
  // Super admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@worldfibernet.net.np' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@worldfibernet.net.np',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  // Packages
  const packages = [
    { name: 'Starter', speed: '25', unit: 'Mbps', price: '899', badge: 'FIBER', features: JSON.stringify(['Unlimited data', 'Free installation', 'Email support', 'Standard WiFi router', 'Basic tech support']), popular: false, order: 1 },
    { name: 'Home Fiber', speed: '100', unit: 'Mbps', price: '1,499', badge: 'POPULAR', features: JSON.stringify(['Unlimited data', 'Free professional installation', '24/7 phone support', 'Static IP available', 'Speed guarantee', 'Dual-band WiFi router']), popular: true, order: 2 },
    { name: 'Power User', speed: '200', unit: 'Mbps', price: '2,199', badge: 'FIBER+', features: JSON.stringify(['Unlimited data', 'Free installation', '24/7 priority support', 'Static IP included', 'Dual-band router', 'Speed guarantee']), popular: false, order: 3 },
    { name: 'Business', speed: '500', unit: 'Mbps', price: '3,499', badge: 'BUSINESS', features: JSON.stringify(['Unlimited data', 'Free installation', 'Dedicated support line', 'Static IP + SLA', 'Business-grade router', 'Multi-device routing']), popular: false, order: 4 },
    { name: 'Gig Speed', speed: '1', unit: 'Gbps', price: '5,999', badge: 'ENTERPRISE', features: JSON.stringify(['Unlimited data', 'Free installation', 'White-glove support', 'Multiple static IPs', '99.9% uptime SLA', 'Enterprise hardware included']), popular: false, order: 5 },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { id: pkg.name.toLowerCase().replace(/\s/g, '-') },
      update: {},
      create: { id: pkg.name.toLowerCase().replace(/\s/g, '-'), ...pkg },
    });
  }

  // FAQs
  const faqs = [
    { question: 'Is installation really free?', answer: 'Yes! All plans include professional fiber installation at no extra cost. Our certified technicians will set up your connection and configure your router.', category: 'Installation', order: 1 },
    { question: 'Are there any data limits or throttling?', answer: 'Never. All World Fiber Net plans come with truly unlimited data. We never throttle your speeds or charge for overages — what you pay for is what you get, all month long.', category: 'Plans', order: 2 },
    { question: 'How long does installation take?', answer: 'Most installations are completed within 1–2 business days of signing up. Our team will schedule a time that works for you.', category: 'Installation', order: 3 },
    { question: 'Can I upgrade my plan later?', answer: 'Absolutely. You can upgrade your plan at any time. Changes take effect within 24 hours. Downgrades apply at the end of your current billing period.', category: 'Plans', order: 4 },
    { question: 'What areas do you cover?', answer: 'We currently serve Kathmandu Valley, Betrawati and Trishuli in Nuwakot, Baireni and Benighat in Dhading, and Gorkha district. We are expanding to Sindhupalchok and Lamjung soon.', category: 'Coverage', order: 5 },
    { question: 'Do you offer a static IP address?', answer: 'Yes. Static IP is included with our Power User, Business, and Gig Speed plans. Home Fiber and Starter subscribers can add a static IP for Rs. 200/month.', category: 'Technical', order: 6 },
    { question: 'What is your uptime guarantee?', answer: 'We guarantee 99.5% network uptime for all plans. Our Business and Gig Speed plans include a formal 99.9% SLA with compensation for any downtime beyond the threshold.', category: 'Technical', order: 7 },
    { question: 'How do I contact support?', answer: 'Call us at 9840182401 or 9840182400 (24/7). You can also email betrawaticable2017@gmail.com or walk into any of our 6 branch offices across Bagmati Province.', category: 'Support', order: 8 },
    { question: 'Do you provide a WiFi router?', answer: 'Yes. A standard router is included with the Starter plan. Dual-band routers are included with Home Fiber and above. Enterprise routers are included with the Gig Speed plan.', category: 'Equipment', order: 9 },
    { question: 'Is there a contract or lock-in period?', answer: 'No long-term contracts required. Our plans are month-to-month. You can cancel anytime with 7 days notice.', category: 'Plans', order: 10 },
  ];

  for (let i = 0; i < faqs.length; i++) {
    await prisma.fAQ.upsert({
      where: { id: `faq-${i + 1}` },
      update: {},
      create: { id: `faq-${i + 1}`, ...faqs[i] },
    });
  }

  // Testimonials
  const testimonials = [
    { name: 'Ramesh Shrestha', location: 'Kathmandu', text: 'I switched from cable to World Fiber Net 2 years ago and the difference is night and day. Streaming 4K with no buffering, perfect for my whole family. Best decision ever.', plan: 'Home Fiber 100Mbps', stars: 5, order: 1 },
    { name: 'Sunita Tamang', location: 'Betrawati, Nuwakot', text: 'Running an online business from home used to be a nightmare with our old ISP. World Fiber Net changed everything — fast speeds, reliable connection, and amazing support.', plan: 'Power User 200Mbps', stars: 5, order: 2 },
    { name: 'Bishnu Karki', location: 'Trishuli', text: 'Affordable plans and great service. I recommended World Fiber Net to all my neighbors and they\'re all happy customers now. The installation was quick and professional.', plan: 'Starter 25Mbps', stars: 5, order: 3 },
    { name: 'Maya Gurung', location: 'Baireni, Dhading', text: 'As someone who works from home, reliable internet is critical. World Fiber Net gives me the uptime and speed I need to attend video calls without any issues. Highly recommended!', plan: 'Home Fiber 100Mbps', stars: 5, order: 4 },
    { name: 'Arjun Rai', location: 'Gorkha', text: 'Finally fiber internet reached our area! The speeds are incredible compared to what we had before. Customer service is very responsive and helpful.', plan: 'Home Fiber 100Mbps', stars: 5, order: 5 },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${i + 1}` },
      update: {},
      create: { id: `testimonial-${i + 1}`, ...testimonials[i] },
    });
  }

  // Coverage areas
  const coverage = [
    { name: 'Kathmandu Valley', district: 'Kathmandu', status: 'active', order: 1 },
    { name: 'Betrawati', district: 'Nuwakot', status: 'active', order: 2 },
    { name: 'Trishuli', district: 'Nuwakot', status: 'active', order: 3 },
    { name: 'Baireni', district: 'Dhading', status: 'active', order: 4 },
    { name: 'Benighat', district: 'Dhading', status: 'active', order: 5 },
    { name: 'Gorkha Town', district: 'Gorkha', status: 'active', order: 6 },
    { name: 'Chautara', district: 'Sindhupalchok', status: 'soon', order: 7 },
    { name: 'Besisahar', district: 'Lamjung', status: 'soon', order: 8 },
  ];

  for (let i = 0; i < coverage.length; i++) {
    await prisma.coverageArea.upsert({
      where: { id: `coverage-${i + 1}` },
      update: {},
      create: { id: `coverage-${i + 1}`, ...coverage[i] },
    });
  }

  // Default popup offer
  await prisma.popupOffer.upsert({
    where: { id: 'popup-default' },
    update: {},
    create: {
      id: 'popup-default',
      heading: '🎉 Free Installation This Month!',
      description: 'Sign up for any fiber plan and get free professional installation + 1 month free. Limited time offer for new subscribers.',
      buttonText: 'Claim Free Month',
      buttonLink: '/contact',
      delay: 4000,
      frequency: 'once',
      active: false,
    },
  });

  // Site settings
  const settings = [
    { key: 'company_name', value: 'World Fiber Net' },
    { key: 'phone_primary', value: '9840182401' },
    { key: 'phone_secondary', value: '9840182400' },
    { key: 'email', value: 'betrawaticable2017@gmail.com' },
    { key: 'address', value: 'Banasthali, Kathmandu, Bagmati Province, Nepal' },
    { key: 'whatsapp_number', value: '9779840182401' },
    { key: 'whatsapp_message', value: 'Hi World Fiber Net, I want to know about internet packages.' },
    { key: 'facebook_url', value: 'https://www.facebook.com/worldfibernet' },
    { key: 'established_year', value: '2017' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { ...setting },
    });
  }

  // Demo WhatsApp conversations
  const conv = await prisma.whatsAppConversation.upsert({
    where: { id: 'demo-conv-1' },
    update: {},
    create: {
      id: 'demo-conv-1',
      phone: '+977 9800000001',
      name: 'Demo Customer',
      status: 'new',
    },
  });

  await prisma.whatsAppMessage.upsert({
    where: { id: 'demo-msg-1' },
    update: {},
    create: {
      id: 'demo-msg-1',
      conversationId: conv.id,
      from: 'customer',
      text: 'Hi World Fiber Net, I want to know about internet packages.',
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
