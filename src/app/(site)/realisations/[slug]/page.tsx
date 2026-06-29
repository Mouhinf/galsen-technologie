import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });

  if (!project) {
    notFound();
  }

  const techStack = (() => { try { return JSON.parse(project.techStack); } catch { return []; } })() as string[];

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <ProjectDetailClient
        project={{
          title: project.title,
          description: project.description,
          content: project.content,
          category: project.category,
          client: project.client,
          year: project.year,
          imageUrl: project.imageUrl,
          liveUrl: project.liveUrl,
          techStack,
        }}
      />

      <Footer />
    </main>
  );
}
