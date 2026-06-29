'use client';

import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import ServicesGrid from '@/components/site/ServicesGrid';
import ProcessTimeline from '@/components/site/ProcessTimeline';
import Footer from '@/components/site/Footer';
import TechGrid from '@/components/ui/TechGrid';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const partners = ['Madar', 'Linguère Digital Innovation', 'Assirik Tours', 'Diaz Automobile', 'SLAAC Voyages'];

const projects = [
  {
    title: 'AI Health Monitor',
    category: 'IA & DATA',
    tech: ['Python', 'TensorFlow', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'EcoPay Sénégal',
    category: 'WEB & MOBILE',
    tech: ['Next.js', 'Flutter', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'SecureCloud Gov',
    category: 'CYBERSÉCURITÉ',
    tech: ['AWS', 'Docker', 'SIEM'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
  },
];

const testimonials = [
  { name: 'Mamadou Fall', role: 'CTO, Wave Sénégal', text: 'Galsen Technologie a transformé notre approche de la donnée. Une équipe exceptionnelle et des résultats concrets.' },
  { name: 'Awa Diop', role: 'Directrice Innovation, Orange', text: 'Le professionnalisme et la réactivité de Galsen sont sans égal sur le marché local. Un partenaire de confiance.' },
  { name: 'Jean-Pierre Kouamé', role: 'Fondateur, TechHub Dakar', text: 'Des solutions robustes et modernes qui répondent parfaitement aux enjeux technologiques de demain.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      <Hero />

      {/* ═══ Partners Marquee ═══ */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <p className="text-center text-[9px] font-mono tracking-[5px] uppercase text-white/20 mb-8">
          Ils nous font confiance
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {partners.map((name, i) => (
              <span
                key={i}
                className="inline-block mx-12 text-xl font-display font-black tracking-wider text-white/15 hover:text-[var(--green-l)]/40 transition-colors duration-500 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid />

      {/* ═══ Why Us ═══ */}
      <section className="py-28 relative">
        <div className="max-w-[1320px] mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="section-label justify-center mb-6">
              Pourquoi Nous
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white">
              Ce qui nous distingue
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Expertise locale', desc: 'Équipe 100% sénégalaise comprenant les réalités du marché africain.', icon: '🔒', color: 'var(--green-l)' },
              { title: 'Livraison rapide', desc: 'Sprints agiles et méthodologies modernes pour tenir les délais.', icon: '⚡', color: 'var(--gold)' },
              { title: 'Vision africaine', desc: 'Des solutions pensées pour l\'Afrique avec un impact global.', icon: '🌍', color: 'var(--blue)' },
              { title: 'Support 24/7', desc: 'Accompagnement continu après le déploiement de vos projets.', icon: '🤝', color: 'var(--purple)' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="p-8 glass-card group relative overflow-hidden"
              >
                <div className="text-3xl mb-6 relative z-10">{item.icon}</div>
                <h4 className="text-lg font-heading font-bold mb-3 group-hover:text-[var(--green-l)] transition-colors relative z-10">
                  {item.title}
                </h4>
                <p className="text-white/40 text-sm font-body leading-relaxed relative z-10">{item.desc}</p>
                {/* Scan line */}
                <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--green-l)]/30 to-transparent opacity-0 group-hover:opacity-100" style={{ animation: 'scan-sweep 2s ease-in-out infinite' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Featured Projects ═══ */}
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
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-2xl glass-card cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-50 group-hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  {/* Category pill */}
                  <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest bg-[var(--green-l)]/20 text-[var(--green-l)] border border-[var(--green-l)]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-[var(--green-l)] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono text-white/30 bg-white/[0.04] px-2 py-1 rounded border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Hover line at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] to-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />

      {/* ═══ Testimonials ═══ */}
      <section className="py-28 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="section-label justify-center mb-6">Témoignages</motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white">
              Ils parlent de nous
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="p-8 glass-card relative group"
              >
                {/* Large quote */}
                <div className="absolute top-4 right-6 text-[80px] leading-none font-serif text-[var(--green-l)] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity select-none">
                  &ldquo;
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} fill="#F5D020" className="text-[var(--gold)]" />
                  ))}
                </div>
                <p className="text-white/60 italic mb-8 relative z-10 text-sm leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--green-l)]/30 to-[var(--blue)]/20 flex items-center justify-center font-bold text-[var(--green-l)] text-sm border border-white/10">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-white/30 text-[11px] font-mono">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className="py-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[var(--green-l)]/5 blur-[150px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--green-l) 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }} />

        <div className="max-w-[800px] mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="section-label justify-center mb-8">
              Prêt ?
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Prêt à transformer votre entreprise ?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/40 text-lg mb-12 max-w-lg mx-auto">
              Donnez à votre projet l&apos;élan technologique qu&apos;il mérite.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="btn-primary text-sm">
                Démarrer un projet
              </Link>
              <Link href="/services" className="btn-secondary text-sm">
                Explorer nos services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
