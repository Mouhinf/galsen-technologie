'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  techStack: string;
  imageUrl: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fallbackProjects = [
  { title: 'AI Health Monitor', slug: 'ai-health-monitor', category: 'IA & DATA', tech: ['Python', 'TensorFlow', 'FastAPI'], image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' },
  { title: 'EcoPay Sénégal', slug: 'ecopay-senegal', category: 'WEB & MOBILE', tech: ['Next.js', 'Flutter', 'Stripe'], image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop' },
  { title: 'SecureCloud Gov', slug: 'securecloud-gov', category: 'CYBERSÉCURITÉ', tech: ['AWS', 'Docker', 'SIEM'], image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.filter((p: any) => p.published));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getTech = (p: ProjectData) => {
    try { return JSON.parse(p.techStack); } catch { return []; }
  };

  const display = loading
    ? fallbackProjects
    : projects.length > 0
      ? projects.slice(0, 3).map(p => ({ title: p.title, slug: p.slug, category: p.category.toUpperCase(), tech: getTech(p) as string[], image: p.imageUrl }))
      : fallbackProjects;

  return (
    <section className="py-28 relative">
      <div className="max-w-[1320px] mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <motion.div variants={fadeUp} custom={0} className="section-label mb-6">Réalisations</motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white">
              Nos projets phares
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Link href="/realisations" className="btn-secondary text-[11px] py-2 px-6 flex items-center gap-2">
              Voir tout <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {display.map((project, i) => (
            <Link key={i} href={`/realisations/${project.slug}`}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-2xl glass-card cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest bg-[var(--green-l)]/20 text-[var(--green-l)] border border-[var(--green-l)]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-[var(--green-l)] transition-colors">{project.title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((t: string) => (
                      <span key={t} className="text-[9px] font-mono text-white/50 bg-white/[0.04] px-2 py-1 rounded border border-white/[0.06]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] to-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
