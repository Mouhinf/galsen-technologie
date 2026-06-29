import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });

  if (!service) {
    notFound();
  }

  const features = (() => { try { return JSON.parse(service.features); } catch { return []; } })() as string[];

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <ServiceDetailClient
        service={{
          title: service.title,
          description: service.description,
          content: service.content,
          color: service.color,
          imageUrl: service.imageUrl,
          features,
        }}
      />

      <Footer />
    </main>
  );
}
