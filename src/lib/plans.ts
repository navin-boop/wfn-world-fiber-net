export interface Plan {
  name: string;
  speed: string;
  unit: string;
  price: string;
  badge: string;
  features: string[];
  popular: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Starter',
    speed: '25',
    unit: 'Mbps',
    price: '899',
    badge: 'FIBER',
    features: ['Unlimited data', 'Free installation', 'Email support', 'Standard router'],
    popular: false,
  },
  {
    name: 'Home Fiber',
    speed: '100',
    unit: 'Mbps',
    price: '1,499',
    badge: 'POPULAR',
    features: ['Unlimited data', 'Free installation', '24/7 phone support', 'Static IP available', 'Speed guarantee'],
    popular: true,
  },
  {
    name: 'Power User',
    speed: '200',
    unit: 'Mbps',
    price: '2,199',
    badge: 'FIBER+',
    features: ['Unlimited data', 'Free installation', '24/7 priority support', 'Static IP included', 'Dual-band router'],
    popular: false,
  },
  {
    name: 'Business',
    speed: '500',
    unit: 'Mbps',
    price: '3,499',
    badge: 'BUSINESS',
    features: ['Unlimited data', 'Free installation', 'Dedicated support', 'Static IP + SLA', 'Multi-device routing', 'Business hours priority'],
    popular: false,
  },
  {
    name: 'Gig Speed',
    speed: '1',
    unit: 'Gbps',
    price: '5,999',
    badge: 'ENTERPRISE',
    features: ['Unlimited data', 'Free installation', 'White-glove support', 'Multiple static IPs', '99.9% SLA', 'Hardware included'],
    popular: false,
  },
];

export const BRANCHES = [
  { name: 'Head Office', location: 'Banasthali, KTM', phone: '9840182401 / 9840182400' },
  { name: 'Betrawati Branch', location: 'Nuwakot', phone: '010412089' },
  { name: 'Trishuli Branch', location: 'Nuwakot', phone: '9840182406' },
  { name: 'Baireni Branch', location: 'Dhading', phone: '9840182414' },
  { name: 'Benighat Branch', location: 'Dhading', phone: '9840182419' },
  { name: 'Gorkha Branch', location: 'Gorkha', phone: '9840182404' },
];

export const COVERAGE = [
  { name: 'Kathmandu', status: 'active' },
  { name: 'Nuwakot-Betrawati', status: 'active' },
  { name: 'Nuwakot-Trishuli', status: 'active' },
  { name: 'Dhading-Baireni', status: 'active' },
  { name: 'Dhading-Benighat', status: 'active' },
  { name: 'Gorkha', status: 'active' },
  { name: 'Sindhupalchok', status: 'soon' },
  { name: 'Lamjung', status: 'soon' },
];
