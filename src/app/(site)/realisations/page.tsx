import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import RealisationsClient from '@/components/site/RealisationsClient';
import { getProjects } from '@/lib/data';
import type { Project } from '@prisma/client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Nos Réalisations | Portfolio Projets Web & Mobile Dakar — Galsen Technologie',
  description: 'Portfolio de projets réalisés par Galsen Technologie : sites web, applications mobiles, plateformes IA pour des clients au Sénégal et en Afrique de l\'Ouest.',
  alternates: { canonical: 'https://galsen.lingueredigital.com/realisations' },
};

export default async function RealisationsPage() {
  const projects = await getProjects();

  const projectViews = projects.map((p: Project) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    client: p.client,
    year: p.year,
    description: p.description,
    techStack: p.techStack,
    imageUrl: p.imageUrl,
    liveUrl: p.liveUrl,
  }));

  return (
    <main id="main-content" className="min-h-screen">
      <TechGrid />
      <Navbar />
      <RealisationsClient projects={projectViews} />
      <Footer />
    </main>
  );
}
