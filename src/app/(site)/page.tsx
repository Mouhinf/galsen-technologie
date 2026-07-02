'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import ServicesGrid from '@/components/site/ServicesGrid';
import FeaturedProjects from '@/components/site/FeaturedProjects';
import ProcessTimeline from '@/components/site/ProcessTimeline';
import Footer from '@/components/site/Footer';
import TechGrid from '@/components/ui/TechGrid';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const partners = ['Madar', 'Linguère Digital Innovation', 'Assirik Tours', 'Diaz Automobile', 'SLAAC Voyages'];

const fallbackTestimonials = [
  { name: 'Mamadou Fall', role: 'CTO, Wave Sénégal', text: 'Galsen Technologie a transformé notre approche de la donnée. Une équipe exceptionnelle et des résultats concrets.' },
  { name: 'Awa Diop', role: 'Directrice Innovation, Orange', text: 'Le professionnalisme et la réactivité de Galsen sont sans égal sur le marché local. Un partenaire de confiance.' },
  { name: 'Jean-Pierre Kouamé', role: 'Fondateur, TechHub Dakar', text: 'Des solutions robustes et modernes qui répondent parfaitement aux enjeux technologiques de demain.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

const fallbackBlogPosts = [
  { slug: "futur-ia-afrique", title: "L'avenir de l'IA générative dans le secteur bancaire africain", excerpt: "Découvrez comment l'IA générative révolutionne le secteur bancaire en Afrique.", category: "IA & Data", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065", createdAt: "" },
  { slug: "cyber-menaces-2024", title: "Les 5 grandes menaces de cybersécurité en 2024", excerpt: "Les cyberattaques évoluent rapidement. Voici les menaces à surveiller.", category: "Cybersécurité", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070", createdAt: "" },
  { slug: "nextjs-vs-react", title: "Pourquoi nous avons choisi Next.js 14 pour nos clients", excerpt: "Next.js 14 offre des performances inégalées pour le web moderne.", category: "Développement", imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070", createdAt: "" },
];

export default function Home() {
  const [testimonials, setTestimonials] = useState<TestimonialData[] | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/testimonials?published=true')
      .then(res => res.json())
      .then(data => {
        const published = data.filter((t: any) => t.published).slice(0, 3);
        setTestimonials(published.length > 0 ? published : null);
      })
      .catch(() => setTestimonials(null));
  }, []);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        const published = data.filter((p: any) => p.published).slice(0, 3);
        setBlogPosts(published.length > 0 ? published : fallbackBlogPosts);
      })
      .catch(() => setBlogPosts(fallbackBlogPosts));
  }, []);

  const displayTestimonials = testimonials ?? fallbackTestimonials;
  const displayBlogPosts: BlogPost[] = blogPosts.length > 0 ? blogPosts : fallbackBlogPosts;

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

      <FeaturedProjects />

      <ProcessTimeline />

      {/* ═══ Blog ═══ */}
      <section className="py-28 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <motion.div variants={fadeUp} custom={0} className="section-label mb-6">Blog</motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white">
                Derniers articles
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Link href="/blog" className="btn-secondary text-[11px] py-2 px-6 flex items-center gap-2">
                Voir tout <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayBlogPosts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="group glass-card overflow-hidden flex flex-col cursor-pointer h-full"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute top-3 left-3 text-[8px] font-mono tracking-widest text-black bg-[var(--green-l)] px-2 py-1 rounded">
                      {post.category.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-heading font-bold text-white mb-3 group-hover:text-[var(--green-l)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-[10px] text-[var(--green-l)] font-mono uppercase tracking-widest gap-1.5">
                      Lire l&apos;article <ArrowRight size={12} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] via-[var(--gold)] to-[var(--green-l)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
            {displayTestimonials.map((t: any, i: number) => (
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
                  {[...Array(t.rating || 5)].map((_, j) => (
                    <Star key={j} size={13} fill="#F5D020" className="text-[var(--gold)]" />
                  ))}
                </div>
                <p className="text-white/60 italic mb-8 relative z-10 text-sm leading-relaxed">
                  &ldquo;{t.content || t.text}&rdquo;
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
