'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Database, Code2, BrainCircuit, Globe, Quote } from 'lucide-react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const expertiseCards = [
  { icon: Database, title: 'Data Science', desc: 'Analyse de données, Machine Learning, modélisation prédictive et visualisation pour des décisions éclairées.' },
  { icon: Code2, title: 'Développement Web', desc: 'Applications et sites web modernes, performants et évolutifs avec les technologies les plus récentes.' },
  { icon: BrainCircuit, title: 'Intelligence Artificielle', desc: 'Solutions IA sur mesure : NLP, computer vision, systèmes de recommandation et automatisation intelligente.' },
  { icon: Globe, title: 'Solutions Numériques', desc: 'Plateformes web, applications sur mesure et outils digitaux répondant aux défis des organisations.' },
];

export default function AproposPage() {
  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />

      {/* ─── Hero / Histoire ─── */}
      <section className="pt-40 pb-20 relative">
        <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="section-label mb-6">Notre Histoire</motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
              Pionniers de la tech en Afrique de l&apos;Ouest.
            </motion.h1>
            <motion.div variants={fadeUp} custom={2} className="space-y-6 text-white/50 text-lg font-body">
              <p>Fondée en 2026 à Dakar, Galsen Technologie est née d&apos;une conviction forte : l&apos;Afrique a le talent et le potentiel pour être un acteur majeur de l&apos;innovation technologique mondiale.</p>
              <p>Nous ne nous contentons pas d&apos;utiliser la technologie, nous la façonnons pour résoudre des défis locaux et internationaux, en mettant l&apos;accent sur l&apos;excellence, l&apos;éthique et l&apos;impact.</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
              <div>
                <div className="text-4xl font-display font-bold text-[var(--green-l)] mb-2">100%</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Talent Local</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-[var(--gold)] mb-2">15+</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Pays Desservis</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-square lg:aspect-auto lg:h-[600px] glass-card overflow-hidden"
          >
            <Image src="/logo-galsen.webp" fill sizes="(min-width: 1024px) 500px, 100vw" className="object-cover opacity-60 grayscale" alt="Équipe Galsen Technologie" />
            <div className="absolute inset-0 bg-[var(--green-l)]/10 mix-blend-overlay" />
          </motion.div>
        </div>
      </section>

      {/* ─── À propos du fondateur ─── */}
      <section className="py-24 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-[1320px] mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="section-label justify-center mb-6">Fondateur</motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white text-center">
              À propos du fondateur
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col items-center lg:items-stretch"
            >
              <div className="relative w-72 h-72 lg:w-full lg:aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden glass-card group">
                <img
                  src="/mouh.png"
                  alt="Mouhamed Sow - Fondateur & CEO de Galsen Technologie"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="text-[10px] font-mono text-[var(--green-l)] tracking-widest">FONDATEUR & CEO</div>
                  <div className="text-xl font-heading font-bold text-white">Mouhamed Sow</div>
                </div>
              </div>
              <div className="text-center lg:text-left mt-6">
                <div className="text-white/60 text-sm font-body italic max-w-sm mx-auto lg:mx-0">
                  Data Scientist | Développeur Full Stack | Spécialiste en Intelligence Artificielle
                </div>
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-5 text-white/60 text-base font-body leading-relaxed"
            >
              <motion.div variants={fadeUp} custom={0} className="relative pl-8 border-l-2 border-[var(--green-l)]/30">
                <Quote size={18} className="absolute -left-3 -top-1 text-[var(--green-l)]/40" />
                <p className="text-white/80 text-lg font-heading font-medium">
                  Je suis <strong className="text-white">Mouhamed Sow</strong>, passionné par les technologies de l&apos;information, le développement logiciel, la science des données et l&apos;intelligence artificielle.
                </p>
              </motion.div>

              <motion.p variants={fadeUp} custom={1}>
                Titulaire d&apos;une formation en Data Science, j&apos;ai développé des compétences en analyse de données, en Machine Learning, en intelligence artificielle ainsi qu&apos;en conception de solutions numériques innovantes. Au fil de mon parcours, j&apos;ai également acquis une solide expérience dans le développement d&apos;applications et de sites web modernes, en utilisant les technologies les plus récentes afin de concevoir des solutions performantes, sécurisées et évolutives.
              </motion.p>

              <motion.p variants={fadeUp} custom={2}>
                Animé par une véritable passion pour l&apos;innovation, j&apos;ai fondé <strong className="text-white/90">Galsen Technologie</strong> avec pour ambition d&apos;accompagner les entreprises, les institutions et les particuliers dans leur transformation numérique. Mon objectif est de mettre la technologie au service de la performance en développant des plateformes web, des applications sur mesure, des solutions basées sur l&apos;intelligence artificielle et des outils répondant aux défis actuels des organisations.
              </motion.p>

              <motion.p variants={fadeUp} custom={3}>
                Curieux et en constante évolution, je continue de renforcer mes compétences afin de rester à la pointe des avancées technologiques. J&apos;accorde une importance particulière à la qualité, à la sécurité, à l&apos;expérience utilisateur et à la satisfaction de mes clients.
              </motion.p>

              <motion.p variants={fadeUp} custom={4} className="text-white/70 pb-2">
                À travers Galsen Technologie, je souhaite contribuer au développement de l&apos;écosystème numérique au Sénégal et en Afrique en proposant des solutions innovantes, fiables et conformes aux standards internationaux.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Grille de compétences ─── */}
      <section className="py-24 relative">
        <div className="max-w-[1320px] mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="section-label justify-center mb-6">Expertise</motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white text-center">
              Domaines d&apos;expertise
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="p-8 glass-card group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:border-[var(--green-l)]/30 group-hover:bg-[var(--green-l)]/10 transition-all duration-500">
                  <card.icon size={24} className="text-[var(--green-l)]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-[var(--green-l)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm font-body leading-relaxed">
                  {card.desc}
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[var(--green-l)]/5 blur-[60px] group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[var(--green-l)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
