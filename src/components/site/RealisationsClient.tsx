'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Briefcase, Filter } from 'lucide-react';
import Link from 'next/link';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary-url';
import { useTracking } from '@/lib/hooks/useTracking';
import type { Project } from '@prisma/client';

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string | null;
  year: string | null;
  description: string;
  techStack: string;
  imageUrl: string;
  liveUrl: string | null;
}

interface RealisationsClientProps {
  projects: ProjectData[];
}

const fallbackProjects = [
  { slug: 'ai-health-monitor', title: 'AI Health Monitor', category: 'IA & DATA', client: 'Ministère Santé', year: '2023', imageUrl: '/projects/ai-health.webp', techStack: '["Python","TensorFlow","FastAPI"]' },
  { slug: 'ecopay-app', title: 'EcoPay App', category: 'WEB & MOBILE', client: 'EcoBank', year: '2024', imageUrl: '/projects/ecopay.webp', techStack: '["Next.js","Flutter","Stripe"]' },
  { slug: 'securecloud-gov', title: 'SecureCloud Gov', category: 'CYBERSÉCURITÉ', client: 'ADIE', year: '2023', imageUrl: '/projects/securecloud.webp', techStack: '["AWS","Docker","SIEM"]' },
  { slug: 'smartagri-data', title: 'SmartAgri Data', category: 'IA & DATA', client: 'AgriSen', year: '2022', imageUrl: '/projects/smartagri.webp', techStack: '["IoT","ML","React"]' },
  { slug: 'logistics-tracker', title: 'Logistics Tracker', category: 'WEB & MOBILE', client: 'Port Dakar', year: '2024', imageUrl: '/projects/logistics.webp', techStack: '["Node.js","MongoDB","React Native"]' },
  { slug: 'edutech-portal', title: 'EduTech Portal', category: 'CLOUD', client: 'UCAD', year: '2023', imageUrl: '/projects/edutech.webp', techStack: '["AWS","Next.js","PostgreSQL"]' },
];

const getTech = (p: ProjectData) => {
  try { return JSON.parse(p.techStack); } catch { return []; }
};

const formatCategory = (cat: string) => {
  const words = cat.split(/[&\-\s]+/);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' & ');
};

export default function RealisationsClient({ projects }: RealisationsClientProps) {
  const { trackEvent } = useTracking();
  const display = projects.length > 0 ? projects : fallbackProjects;
  const [activeFilter, setActiveFilter] = useState('Tous');

  const categories = ['Tous', ...Array.from(new Set(display.map(p => formatCategory(p.category))))];

  const filtered = activeFilter === 'Tous'
    ? display
    : display.filter(p => formatCategory(p.category) === activeFilter);

  return (
    <main id="main-content" className="min-h-screen">
      <section className="pt-40 pb-12 relative">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="mb-12">
            <div className="section-label mb-6 animate-fade-in-up" style={{ animationDelay: '0s' }}>
              Portfolio
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
              Nos Réalisations
            </h1>
            <p className="text-white/70 font-body max-w-xl text-lg animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
              Découvrez nos projets qui transforment le paysage technologique africain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Filter size={14} className="text-white/50 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                aria-label={`Filtrer par ${cat}`}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[var(--green-l)] text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.03]'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="text-[11px] font-mono text-white/70 ml-auto hidden md:block">
              {filtered.length} projet{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-[1320px] mx-auto px-4">
          <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300">
            {filtered.map((p, i) => {
              const techs = getTech(p);
              const isFallback = fallbackProjects.some(fp => fp.slug === p.slug);
              const cardContent = (
                <>
                  <div className="aspect-[4/3] relative overflow-hidden bg-white/5">
                    <img
                      src={optimizeCloudinaryUrl(p.imageUrl, { width: 600, height: 450 })}
                      alt={p.title}
                      width={600}
                      height={450}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[9px] font-mono tracking-widest bg-[var(--green-l)]/15 text-[var(--green-l)] border border-[var(--green-l)]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {formatCategory(p.category)}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                      <div className="w-9 h-9 rounded-full bg-[var(--green-l)]/20 border border-[var(--green-l)]/30 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRight size={14} className="text-[var(--green-l)]" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-5">
                      <h2 className="text-xl font-heading font-bold text-white mb-1.5 group-hover:text-[var(--green-l)] transition-colors">
                        {p.title}
                      </h2>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-white/70">
                        {p.client && (
                          <span className="flex items-center gap-1">
                            <Briefcase size={10} />
                            {p.client}
                          </span>
                        )}
                        {p.year && <span>{p.year}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-white/[0.04]">
                    {techs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {techs.map((t: string) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono text-white/70 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded group-hover:border-white/10 group-hover:text-white/70 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] via-[var(--gold)] to-[var(--green-l)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </>
              );
              return isFallback ? (
                <div key={p.slug} className="group relative overflow-hidden rounded-2xl glass-card cursor-default h-full animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  {cardContent}
                </div>
              ) : (
                <Link key={p.slug} href={`/realisations/${p.slug}`} onClick={() => trackEvent('click', { label: p.title, href: `/realisations/${p.slug}` })} className="group relative overflow-hidden rounded-2xl glass-card cursor-pointer h-full animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  {cardContent}
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/70 font-mono text-sm">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
