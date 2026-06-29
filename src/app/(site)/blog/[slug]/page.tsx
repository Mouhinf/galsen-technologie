import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  if (!post) {
    notFound();
  }

  const tags = (() => { try { return JSON.parse(post.tags); } catch { return []; } })() as string[];
  const formattedDate = new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <article className="pt-32 pb-24">
        {/* Hero */}
        <header className="max-w-[800px] mx-auto px-4 text-center mb-16">
          <div className="text-[11px] font-mono text-[var(--green-l)] tracking-widest uppercase mb-4">
            {post.category} &bull; {formattedDate}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/50 text-sm">
            <span>Par {post.author}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-w-[1000px] mx-auto px-4 mb-16">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden glass-card">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover opacity-80" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[700px] mx-auto px-4 prose prose-invert prose-green lg:prose-lg font-body">
          {post.excerpt && (
            <p className="lead text-xl text-white/70 mb-8">{post.excerpt}</p>
          )}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="max-w-[700px] mx-auto px-4 mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <span key={tag} className="text-[10px] font-mono bg-white/5 text-white/50 px-3 py-1.5 rounded-full border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="max-w-[700px] mx-auto px-4 mt-12">
          <Link href="/blog" className="text-[var(--green-l)] text-sm font-mono hover:underline">
            &larr; Retour au blog
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
