'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, Users2, HelpCircle, Star,
  Map, Settings, UserCog, MessageSquare, LogOut, Wifi, ChevronLeft, Menu, X, FileText
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'Leads', icon: FileText },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/offers', label: 'Offers', icon: Tag },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/coverage', label: 'Coverage', icon: Map },
  { href: '/admin/whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { href: '/admin/staff', label: 'Staff', icon: UserCog },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/auth/me').then(r => r.ok ? r.json() : null).then(d => d && setUser(d));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col flex-shrink-0 transition-all duration-300"
        style={{
          width: sidebarOpen ? '240px' : '64px',
          backgroundColor: '#0d0d0d',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--green)' }}>
            <Wifi size={16} style={{ color: '#0d0d0d' }} />
          </div>
          {sidebarOpen && (
            <span className="text-sm font-bold text-white truncate">World Fiber Net</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-white/40 hover:text-white/80 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                color: isActive(item) ? '#0d0d0d' : 'rgba(255,255,255,0.55)',
                backgroundColor: isActive(item) ? 'var(--green)' : 'transparent',
              }}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={17} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="border-t p-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {user && sidebarOpen && (
            <div className="px-2 mb-3">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{user.role.replace('_', ' ')}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center px-6 border-b" style={{ backgroundColor: '#fff', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm hover:underline" style={{ color: 'var(--gray-500)' }}>
              ← View Site
            </Link>
            <span style={{ color: 'var(--gray-300)' }}>·</span>
            <h1 className="text-sm font-semibold" style={{ color: 'var(--black)' }}>
              {navItems.find(n => isActive(n))?.label ?? 'Admin'}
            </h1>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
