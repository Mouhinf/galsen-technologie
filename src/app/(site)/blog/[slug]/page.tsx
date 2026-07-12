import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { serverSanitizeHtml } from '@/lib/server-sanitize';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary-url';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: 'Article non trouvé | Galsen Technologie' };
  return {
    title: `${post.title} | Galsen Technologie`,
    description: post.excerpt || post.title,
    alternates: { canonical: `https://galsen.lingueredigital.com/blog/${params.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  if (!post) {
    notFound();
  }

  const tags = (() => { try { return JSON.parse(post.tags); } catch { return []; } })() as string[];
  const formattedDate = new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const relatedPosts = await prisma.post.findMany({
    where: { published: true, category: post.category, slug: { not: post.slug } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main id="main-content" className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <article className="pt-32 pb-24">
        {/* Breadcrumbs */}
        <nav className="max-w-[800px] mx-auto px-4 flex items-center gap-2 text-sm font-mono text-white/40 mb-8">
          <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-white/60 truncate">{post.title}</span>
        </nav>

        {/* Hero */}
        <header className="max-w-[800px] mx-auto px-4 text-center mb-16">
          <div className="text-[11px] font-mono text-[var(--green-l)] tracking-widest uppercase mb-4">
            {post.category} &bull; {formattedDate}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
            <span>Par {post.author}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-w-[1000px] mx-auto px-4 mb-16">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden glass-card">
            <img src={optimizeCloudinaryUrl(post.imageUrl, { width: 1000, height: 430 })} alt={post.title} width={1000} height={430} fetchPriority="high" decoding="async" className="object-cover w-full h-full opacity-80" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[700px] mx-auto px-4 prose prose-invert prose-green lg:prose-lg font-body">
          {post.excerpt && (
            <p className="lead text-xl text-white/70 mb-8">{post.excerpt}</p>
          )}
          <div dangerouslySetInnerHTML={{ __html: serverSanitizeHtml(post.content) }} />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="max-w-[700px] mx-auto px-4 mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="text-[10px] font-mono bg-white/5 text-white/70 px-3 py-1.5 rounded-full border border-white/10 hover:bg-[var(--green-l)]/10 hover:text-[var(--green-l)] hover:border-[var(--green-l)]/30 transition-all">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="max-w-[700px] mx-auto px-4 mt-8">
          <Link href="/blog" className="text-[var(--green-l)] text-sm font-mono hover:underline">
            &larr; Retour au blog
          </Link>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <div className="max-w-[1000px] mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-white mb-2">Articles similaires</h2>
            <p className="text-white/60 text-sm mb-10">Dans la catégorie <strong className="text-white/80">{post.category}</strong></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group glass-card overflow-hidden rounded-xl transition-all hover:border-white/20">
                  <div className="aspect-video relative overflow-hidden bg-white/5">
                    <img src={optimizeCloudinaryUrl(p.imageUrl, { width: 600, height: 338 })} alt={p.title} width={600} height={338} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="text-[9px] font-mono tracking-widest text-[var(--green-l)] mb-2">{p.category}</div>
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-[var(--green-l)] transition-colors line-clamp-2">{p.title}</h3>
                    <div className="flex items-center gap-1 mt-3 text-xs text-[var(--green-l)] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      Lire l&apos;article <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
