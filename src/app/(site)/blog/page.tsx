import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  // Fallback data if DB is empty
  const displayPosts = posts.length > 0 ? posts.map(p => ({
    slug: p.slug,
    title: p.title,
    cat: p.category.toUpperCase(),
    date: new Date(p.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    img: p.imageUrl,
    excerpt: p.excerpt,
  })) : [
    { slug: "futur-ia-afrique", title: "L'avenir de l'IA générative dans le secteur bancaire africain", cat: "IA & DATA", date: "24 Mai 2024", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065", excerpt: '' },
    { slug: "cyber-menaces-2024", title: "Les 5 grandes menaces de cybersécurité en 2024", cat: "SÉCURITÉ", date: "12 Mai 2024", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070", excerpt: '' },
    { slug: "nextjs-vs-react", title: "Pourquoi nous avons choisi Next.js 14 pour nos clients", cat: "DÉVELOPPEMENT", date: "03 Mai 2024", img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070", excerpt: '' },
    { slug: "cloud-souverain", title: "L'importance d'un cloud souverain au Sénégal", cat: "CLOUD", date: "28 Avr 2024", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072", excerpt: '' },
    { slug: "formation-tech", title: "Retour sur notre dernier bootcamp Full-Stack", cat: "VIE D'ENTREPRISE", date: "15 Avr 2024", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070", excerpt: '' },
    { slug: "startup-agile", title: "Comment implémenter l'agilité dans une startup africaine", cat: "STRATÉGIE", date: "02 Avr 2024", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070", excerpt: '' },
  ];

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-12">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="section-label mb-6">Actualités</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">Le Blog Galsen</h1>
          <p className="text-white/40 font-body text-lg max-w-xl">
            Actualités tech, tutoriels, études de cas et réflexions sur l&apos;innovation numérique au Sénégal et en Afrique.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={i} className="group glass-card overflow-hidden flex flex-col cursor-pointer">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src={post.img} alt={post.title} className="object-cover w-full h-full opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-black bg-[var(--green-l)] px-2 py-1 rounded">
                  {post.cat}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-white/40 text-[11px] font-mono mb-3">{post.date}</div>
                <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-[var(--green-l)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && <p className="text-white/40 text-sm mb-4 line-clamp-2">{post.excerpt}</p>}
                <div className="mt-auto flex items-center text-[11px] text-[var(--green-l)] font-mono uppercase tracking-widest gap-2">
                  Lire l&apos;article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
