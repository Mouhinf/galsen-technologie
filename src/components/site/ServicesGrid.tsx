'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  features: string;
  imageUrl: string | null;
}

const ICON_MAP: Record<string, string> = {
  Code2: '💻',
  BrainCircuit: '🧠',
  Shield: '🛡️',
  Cloud: '☁️',
  GraduationCap: '🎓',
  Cpu: '🔲',
  Database: '🗄️',
  Globe: '🌐',
  Rocket: '🚀',
  Zap: '⚡',
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ServicesGrid = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data.filter((s: any) => s.active));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getTags = (s: ServiceData) => {
    try { return JSON.parse(s.features).slice(0, 3); } catch { return []; }
  };

  return (
    <section className="py-28 relative overflow-hidden" id="services">
      <div className="max-w-[1320px] mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <motion.div variants={fadeUp} custom={0} className="section-label mb-6">
            Nos Services
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Ce que nous faisons
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/40 font-body max-w-xl">
            Des solutions technologiques de pointe adaptées au marché africain et international.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-white/5 mb-8" />
                <div className="h-6 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { title: 'Web & Mobile', desc: 'Sites, apps PWA, e-commerce sur mesure.', icon: '💻', color: '#22C55E', badge: 'DÉVELOPPEMENT' },
              { title: 'IA & Data', desc: 'ML, NLP, automatisation pour booster votre productivité.', icon: '🧠', color: '#F5D020', badge: 'INTELLIGENCE ARTIFICIELLE' },
              { title: 'Cybersécurité', desc: 'Audit, Pentest, SIEM. Protection de vos actifs numériques.', icon: '🛡️', color: '#C8001E', badge: 'SÉCURITÉ' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative p-8 rounded-2xl group cursor-pointer overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-transparent transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-3xl">{service.icon}</div>
                  <div className="text-[9px] font-mono tracking-[2px] text-white/20 uppercase border border-white/[0.06] px-3 py-1 rounded-full">{service.badge}</div>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/40 text-sm font-body leading-relaxed mb-8">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const tags = getTags(service);
              const isLarge = i === 0;

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className={cn(
                    'relative p-8 rounded-2xl group overflow-hidden',
                    'bg-white/[0.02] border border-white/[0.06]',
                    'hover:border-transparent transition-all duration-500',
                    isLarge ? 'lg:col-span-2' : 'lg:col-span-1',
                    i === services.length - 1 && services.length % 3 === 1 ? 'lg:col-span-3' : ''
                  )}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 60%, ${service.color}40 70%, transparent 80%)`,
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor' as any,
                      maskComposite: 'exclude',
                      animation: 'border-spin 3s linear infinite',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 text-xl"
                      >
                        {ICON_MAP[service.icon] || '🔧'}
                      </div>
                      <div className="text-[9px] font-mono tracking-[2px] text-white/20 uppercase border border-white/[0.06] px-3 py-1 rounded-full group-hover:text-white/40 group-hover:border-white/15 transition-colors">
                        {service.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/40 text-sm font-body leading-relaxed mb-8 line-clamp-2">
                      {service.description}
                    </p>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.05] px-2.5 py-1 rounded-md group-hover:border-white/10 group-hover:text-white/50 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={18} style={{ color: service.color || '#22C55E' }} />
                  </div>

                  <div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700"
                    style={{ backgroundColor: service.color || '#22C55E' }}
                  />

                  <div
                    className="absolute bottom-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: `linear-gradient(90deg, ${service.color || '#22C55E'}60, transparent)` }}
                  />
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
            Voir tous nos services <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
