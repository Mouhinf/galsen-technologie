'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Laptop, BrainCircuit, ShieldCheck, Cloud, GraduationCap, LineChart, ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const services = [
  {
    id: 'web', title: 'Web & Mobile', badge: 'DÉVELOPPEMENT',
    text: 'Sites, apps PWA, e-commerce sur mesure. Performance et UX irréprochables.',
    tags: ['React', 'Next.js', 'Flutter', 'Laravel'],
    icon: Laptop, className: 'lg:col-span-2', color: '#22C55E',
  },
  {
    id: 'ia', title: 'IA & Data', badge: 'INTELLIGENCE ARTIFICIELLE',
    text: 'ML, NLP, automatisation, dashboards data pour booster votre productivité.',
    tags: ['Python', 'TensorFlow', 'LLM'],
    icon: BrainCircuit, className: 'lg:col-span-1', color: '#F5D020',
  },
  {
    id: 'cyber', title: 'Cybersécurité', badge: 'SÉCURITÉ',
    text: 'Audit, Pentest, SIEM. Nous protégeons vos actifs numériques critiques.',
    tags: ['Pentest', 'SIEM', 'ISO 27001'],
    icon: ShieldCheck, className: 'lg:col-span-1', color: '#C8001E',
  },
  {
    id: 'cloud', title: 'Cloud & Infra', badge: 'INFRASTRUCTURE',
    text: 'Déploiement scalable, Docker, Kubernetes sur AWS ou Google Cloud.',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    icon: Cloud, className: 'lg:col-span-1', color: '#00B8FF',
  },
  {
    id: 'formation', title: 'Formation Tech', badge: 'ÉDUCATION',
    text: 'Bootcamps intensifs et ateliers pour monter en compétence rapidement.',
    tags: ['Bootcamp', 'Certif', 'Ateliers'],
    icon: GraduationCap, className: 'lg:col-span-1', color: '#8B5CF6',
  },
  {
    id: 'conseil', title: 'Conseil IT & Transformation Digitale', badge: 'STRATÉGIE',
    text: "Accompagnement stratégique de l'audit au déploiement final.",
    tags: ['Audit', 'Stratégie', 'Digital'],
    icon: LineChart, className: 'lg:col-span-3', color: '#F5D020',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ServicesGrid = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className={cn(
                'relative p-8 rounded-2xl group cursor-pointer overflow-hidden',
                'bg-white/[0.02] border border-white/[0.06]',
                'hover:border-transparent transition-all duration-500',
                service.className
              )}
            >
              {/* Animated border on hover */}
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 group-hover:shadow-lg transition-all duration-500"
                    style={{ color: service.color }}
                  >
                    <service.icon size={22} />
                  </div>
                  <div className="text-[9px] font-mono tracking-[2px] text-white/20 uppercase border border-white/[0.06] px-3 py-1 rounded-full group-hover:text-white/40 group-hover:border-white/15 transition-colors">
                    {service.badge}
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm font-body leading-relaxed mb-8">
                  {service.text}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.05] px-2.5 py-1 rounded-md group-hover:border-white/10 group-hover:text-white/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight style={{ color: service.color }} size={18} />
              </div>

              {/* Ambient glow */}
              <div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700"
                style={{ backgroundColor: service.color }}
              />

              {/* Bottom highlight line */}
              <div
                className="absolute bottom-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${service.color}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
