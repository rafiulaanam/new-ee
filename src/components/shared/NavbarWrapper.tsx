'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function NavbarWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/vendor');

  if (isDashboard) {
    return null;
  }

  return <Navbar />;
} 