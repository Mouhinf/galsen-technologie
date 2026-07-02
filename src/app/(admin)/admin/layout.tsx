import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import AdminSessionProvider from '@/components/admin/SessionProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <div className="min-h-screen bg-[#000000] text-white">
        <Sidebar />
        <div className="ml-[240px] flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminSessionProvider>
  );
}
