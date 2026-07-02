'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Briefcase, Filter } from 'lucide-react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Link from 'next/link';

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

const fallbackProjects = [
  { slug: 'ai-health-monitor', title: 'AI Health Monitor', category: 'IA & DATA', client: 'Ministère Santé', year: '2023', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070', techStack: '["Python","TensorFlow","FastAPI"]' },
  { slug: 'ecopay-app', title: 'EcoPay App', category: 'WEB & MOBILE', client: 'EcoBank', year: '2024', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070', techStack: '["Next.js","Flutter","Stripe"]' },
  { slug: 'securecloud-gov', title: 'SecureCloud Gov', category: 'CYBERSÉCURITÉ', client: 'ADIE', year: '2023', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070', techStack: '["AWS","Docker","SIEM"]' },
  { slug: 'smartagri-data', title: 'SmartAgri Data', category: 'IA & DATA', client: 'AgriSen', year: '2022', imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072', techStack: '["IoT","ML","React"]' },
  { slug: 'logistics-tracker', title: 'Logistics Tracker', category: 'WEB & MOBILE', client: 'Port Dakar', year: '2024', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?q=80&w=2070', techStack: '["Node.js","MongoDB","React Native"]' },
  { slug: 'edutech-portal', title: 'EduTech Portal', category: 'CLOUD', client: 'UCAD', year: '2023', imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974', techStack: '["AWS","Next.js","PostgreSQL"]' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const getTech = (p: ProjectData) => {
  try { return JSON.parse(p.techStack); } catch { return []; }
};

const formatCategory = (cat: string) => {
  const words = cat.split(/[&\-\s]+/);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' & ');
};

export default function RealisationsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tous');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.filter((p: any) => p.published));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const display = loading
    ? fallbackProjects
    : projects.length > 0
      ? projects
      : fallbackProjects;

  const categories = ['Tous', ...Array.from(new Set(display.map(p => formatCategory(p.category))))];

  const filtered = activeFilter === 'Tous'
    ? display
    : display.filter(p => formatCategory(p.category) === activeFilter);

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />

      <section className="pt-40 pb-12 relative">
        <div className="max-w-[1320px] mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <motion.div variants={fadeUp} custom={0} className="section-label mb-6">
              Portfolio
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Nos Réalisations
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 font-body max-w-xl text-lg">
              Découvrez nos projets qui transforment le paysage technologique africain.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Filter size={14} className="text-white/50 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[var(--green-l)] text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/[0.03]'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="text-[11px] font-mono text-white/45 ml-auto hidden md:block">
              {filtered.length} projet{filtered.length !== 1 ? 's' : ''}
            </span>
          </motion.div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-[1320px] mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p, i) => {
                const techs = getTech(p as ProjectData);
                return (
                  <Link key={p.slug} href={`/realisations/${p.slug}`}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={i}
                      className="group relative overflow-hidden rounded-2xl glass-card cursor-pointer h-full"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
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
                          <h3 className="text-xl font-heading font-bold text-white mb-1.5 group-hover:text-[var(--green-l)] transition-colors">
                            {p.title}
                          </h3>
                          <div className="flex items-center gap-3 text-[10px] font-mono text-white/60">
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
                                className="text-[9px] font-mono text-white/55 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded group-hover:border-white/10 group-hover:text-white/70 transition-colors"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] via-[var(--gold)] to-[var(--green-l)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-white/55 font-mono text-sm">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
