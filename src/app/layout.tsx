import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "World Fiber Net — Nepal's Trusted Fiber ISP",
    template: '%s | World Fiber Net',
  },
  description: 'High-speed fiber optic internet for homes and businesses across Bagmati Province, Nepal. Plans from Rs. 899/month with free installation.',
  keywords: ['fiber internet', 'Nepal ISP', 'broadband', 'Kathmandu', 'Nuwakot', 'Dhading', 'Gorkha'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
