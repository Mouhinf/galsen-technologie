'use client';

import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import Link from 'next/link';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary-url';
import type { Post } from '@prisma/client';

interface PostView {
  slug: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  createdAt: string;
}

interface BlogClientProps {
  posts: PostView[];
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

const fallbackPosts = [
  { slug: "futur-ia-afrique", title: "L'avenir de l'IA générative dans le secteur bancaire africain", category: "IA & Data", date: "24 Mai 2024", imageUrl: "/blog/futur-ia.webp", excerpt: "Découvrez comment l'IA générative révolutionne le secteur bancaire en Afrique.", createdAt: "" },
  { slug: "cyber-menaces-2024", title: "Les 5 grandes menaces de cybersécurité en 2024", category: "Cybersécurité", date: "12 Mai 2024", imageUrl: "/blog/cyber-menaces.webp", excerpt: "Les cyberattaques évoluent rapidement. Voici les menaces à surveiller.", createdAt: "" },
  { slug: "nextjs-vs-react", title: "Pourquoi nous avons choisi Next.js 14 pour nos clients", category: "Développement", date: "03 Mai 2024", imageUrl: "/blog/nextjs.webp", excerpt: "Next.js 14 offre des performances inégalées pour le web moderne.", createdAt: "" },
  { slug: "cloud-souverain", title: "L'importance d'un cloud souverain au Sénégal", category: "Cloud", date: "28 Avr 2024", imageUrl: "/blog/cloud-souverain.webp", excerpt: "Pourquoi le Sénégal doit investir dans un cloud souverain.", createdAt: "" },
  { slug: "formation-tech", title: "Retour sur notre dernier bootcamp Full-Stack", category: "Formation", date: "15 Avr 2024", imageUrl: "/blog/bootcamp.webp", excerpt: "Notre bootcamp a formé 20 nouveaux développeurs Full-Stack.", createdAt: "" },
  { slug: "startup-agile", title: "Comment implémenter l'agilité dans une startup africaine", category: "Stratégie", date: "02 Avr 2024", imageUrl: "/blog/agile.webp", excerpt: "L'agilité est clé pour les startups. Voici comment l'adopter.", createdAt: "" },
];

export default function BlogClient({ posts }: BlogClientProps) {
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;
  const [activeFilter, setActiveFilter] = useState('Tous');

  const categories = ['Tous', ...Array.from(new Set(displayPosts.map(p => p.category)))];

  const filtered = activeFilter === 'Tous'
    ? displayPosts
    : displayPosts.filter(p => p.category === activeFilter);

  return (
    <main id="main-content" className="min-h-screen">
      <section className="pt-40 pb-12">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="mb-12">
            <div className="section-label mb-6 animate-fade-in-up" style={{ animationDelay: '0s' }}>Actualités</div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.08s' }}>Le Blog Galsen</h1>
            <p className="text-white/70 font-body text-lg max-w-xl animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
              Actualités tech, tutoriels, études de cas et réflexions sur l&apos;innovation numérique au Sénégal et en Afrique.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-[1320px] mx-auto px-4">
          <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300">
            {filtered.map((post, i) => {
              const isFallback = fallbackPosts.some(fp => fp.slug === post.slug);
              const cardContent = (
                <div className="flex flex-col h-full animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="aspect-[16/9] relative overflow-hidden bg-white/5">
                    <img src={optimizeCloudinaryUrl(post.imageUrl, { width: 600 })} alt={post.title} width={600} height={338} loading={i < 3 ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-black bg-[var(--green-l)] px-2 py-1 rounded">
                      {post.category.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-white/70 text-[11px] font-mono mb-3">{formatDate(post.createdAt)}</div>
                    <h2 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-[var(--green-l)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && <p className="text-white/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>}
                    <div className="mt-auto flex items-center text-[11px] text-[var(--green-l)] font-mono uppercase tracking-widest gap-2">
                      Lire l&apos;article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] via-[var(--gold)] to-[var(--green-l)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              );
              return isFallback ? (
                <div key={post.slug} className="group glass-card overflow-hidden flex flex-col cursor-default">
                  {cardContent}
                </div>
              ) : (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group glass-card overflow-hidden flex flex-col cursor-pointer">
                  {cardContent}
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/70 font-mono text-sm">Aucun article trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
