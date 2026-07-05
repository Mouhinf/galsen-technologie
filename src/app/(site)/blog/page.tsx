import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import BlogClient from '@/components/site/BlogClient';
import { getPosts } from '@/lib/data';
import type { Post } from '@prisma/client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog Tech Sénégal | IA, Web, Cybersécurité, Digital Afrique — Galsen Technologie',
  description: 'Blog tech de Galsen Technologie : IA, développement web, cybersécurité, cloud et transformation digitale au Sénégal et en Afrique. Articles par des experts.',
  alternates: { canonical: 'https://galsen.lingueredigital.com/blog' },
};

export default async function BlogPage() {
  const posts = await getPosts();

  const postViews = posts.map((p: Post) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.createdAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    imageUrl: p.imageUrl,
    excerpt: p.excerpt,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <main id="main-content" className="min-h-screen">
      <TechGrid />
      <Navbar />
      <BlogClient posts={postViews} />
      <Footer />
    </main>
  );
}
