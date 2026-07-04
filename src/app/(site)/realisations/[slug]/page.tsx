import React from 'react';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import ProjectContactForm from './ProjectContactForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { serverSanitizeHtml } from '@/lib/server-sanitize';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary-url';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return { title: 'Projet non trouvé | Galsen Technologie' };
  return {
    title: `${project.title} | Galsen Technologie`,
    description: project.description,
    alternates: { canonical: `https://galsen.lingueredigital.com/realisations/${params.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });

  if (!project) {
    notFound();
  }

  const techStack = (() => { try { return JSON.parse(project.techStack); } catch { return []; } })() as string[];
  const safeContent = serverSanitizeHtml(project.content);

  return (
    <main id="main-content" className="min-h-screen">
      <TechGrid />
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0">
          <img src={optimizeCloudinaryUrl(project.imageUrl, { width: 1200, height: 600 })} alt="" width={1200} height={600} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="max-w-[1000px] mx-auto px-4 relative z-10">
          <Link href="/realisations" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-mono mb-8 transition-colors">
            <ArrowLeft size={14} /> Retour aux réalisations
          </Link>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{project.title}</h1>

          <div className="flex flex-wrap gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-[var(--green-l)]/10 text-[var(--green-l)] px-3 py-1 rounded-full">{project.category}</span>
            </span>
            {project.client && (
              <span className="flex items-center gap-2"><User size={14} /> {project.client}</span>
            )}
            {project.year && (
              <span className="flex items-center gap-2"><Calendar size={14} /> {project.year}</span>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--blue)] hover:underline">
                <ExternalLink size={14} /> Site en ligne
              </a>
            )}
          </div>

          <p className="text-white/70 text-xl max-w-3xl leading-relaxed mt-8">{project.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-10">
            <div className="rounded-2xl overflow-hidden glass-card relative aspect-video">
              <img src={optimizeCloudinaryUrl(project.imageUrl, { width: 1000, height: 563 })} alt={project.title} width={1000} height={563} loading="lazy" decoding="async" className="object-cover w-full h-full" />
            </div>

            {techStack.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-6">Technologies utilisées</h2>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech: string) => (
                    <span key={tech} className="text-xs font-mono bg-white/5 text-white/70 border border-white/10 px-4 py-2 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {safeContent && (
              <div className="prose prose-invert prose-green max-w-none">
                <div dangerouslySetInnerHTML={{ __html: safeContent }} />
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <ProjectContactForm projectTitle={project.title} projectCategory={project.category} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
