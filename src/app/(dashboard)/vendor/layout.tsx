'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/vendor/Sidebar';
import Header from '@/components/vendor/Header';
import { Toaster } from '@/components/ui/toaster';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'VENDOR') {
    redirect('/auth/signin?callbackUrl=/vendor');
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-x-hidden bg-gray-50/50 p-4 dark:bg-gray-900/50 lg:p-8">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
} 