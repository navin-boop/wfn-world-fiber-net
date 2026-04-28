import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: "World Fiber Net — Nepal's Trusted Fiber ISP",
    template: '%s | World Fiber Net',
  },
  description: 'High-speed fiber optic internet for homes and businesses across Bagmati Province, Nepal. Plans from Rs. 899/month with free installation.',
  keywords: ['fiber internet', 'Nepal ISP', 'broadband', 'Kathmandu', 'Nuwakot', 'Dhading', 'Gorkha'],
  metadataBase: new URL('https://worldfibernet.net.np'),
  openGraph: {
    siteName: 'World Fiber Net',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
