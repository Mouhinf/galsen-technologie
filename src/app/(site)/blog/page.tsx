'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Link from 'next/link';

interface PostData {
  slug: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  createdAt: string;
}

const fallbackPosts = [
  { slug: "futur-ia-afrique", title: "L'avenir de l'IA générative dans le secteur bancaire africain", category: "IA & Data", date: "24 Mai 2024", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065", excerpt: "Découvrez comment l'IA générative révolutionne le secteur bancaire en Afrique.", createdAt: "" },
  { slug: "cyber-menaces-2024", title: "Les 5 grandes menaces de cybersécurité en 2024", category: "Cybersécurité", date: "12 Mai 2024", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070", excerpt: "Les cyberattaques évoluent rapidement. Voici les menaces à surveiller.", createdAt: "" },
  { slug: "nextjs-vs-react", title: "Pourquoi nous avons choisi Next.js 14 pour nos clients", category: "Développement", date: "03 Mai 2024", imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070", excerpt: "Next.js 14 offre des performances inégalées pour le web moderne.", createdAt: "" },
  { slug: "cloud-souverain", title: "L'importance d'un cloud souverain au Sénégal", category: "Cloud", date: "28 Avr 2024", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072", excerpt: "Pourquoi le Sénégal doit investir dans un cloud souverain.", createdAt: "" },
  { slug: "formation-tech", title: "Retour sur notre dernier bootcamp Full-Stack", category: "Formation", date: "15 Avr 2024", imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070", excerpt: "Notre bootcamp a formé 20 nouveaux développeurs Full-Stack.", createdAt: "" },
  { slug: "startup-agile", title: "Comment implémenter l'agilité dans une startup africaine", category: "Stratégie", date: "02 Avr 2024", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070", excerpt: "L'agilité est clé pour les startups. Voici comment l'adopter.", createdAt: "" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tous');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        const published = data.filter((p: any) => p.published).map((p: any) => ({
          slug: p.slug,
          title: p.title,
          category: p.category,
          date: formatDate(p.createdAt),
          imageUrl: p.imageUrl,
          excerpt: p.excerpt,
          createdAt: p.createdAt,
        }));
        setPosts(published);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const display = loading
    ? fallbackPosts
    : posts.length > 0
      ? posts
      : fallbackPosts;

  const categories = ['Tous', ...Array.from(new Set(display.map(p => p.category)))];

  const filtered = activeFilter === 'Tous'
    ? display
    : display.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-12">
        <div className="max-w-[1320px] mx-auto px-4">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="section-label mb-6">Actualités</motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-display font-bold text-white mb-4">Le Blog Galsen</motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/40 font-body text-lg max-w-xl">
              Actualités tech, tutoriels, études de cas et réflexions sur l&apos;innovation numérique au Sénégal et en Afrique.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mt-12"
          >
            <Filter size={14} className="text-white/30 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[var(--green-l)] text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/[0.03]'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="text-[11px] font-mono text-white/20 ml-auto hidden md:block">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group glass-card overflow-hidden flex flex-col cursor-pointer">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={i}
                    className="flex flex-col h-full"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                      <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-black bg-[var(--green-l)] px-2 py-1 rounded">
                        {post.category.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-white/40 text-[11px] font-mono mb-3">{post.date}</div>
                      <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-[var(--green-l)] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && <p className="text-white/40 text-sm mb-4 line-clamp-2">{post.excerpt}</p>}
                      <div className="mt-auto flex items-center text-[11px] text-[var(--green-l)] font-mono uppercase tracking-widest gap-2">
                        Lire l&apos;article
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] via-[var(--gold)] to-[var(--green-l)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-white/30 font-mono text-sm">Aucun article trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
