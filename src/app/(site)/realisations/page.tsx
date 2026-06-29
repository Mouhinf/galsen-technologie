import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RealisationsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const displayProjects = projects.length > 0 ? projects.map(p => ({
    slug: p.slug,
    title: p.title,
    cat: p.category.toUpperCase(),
    client: p.client || '',
    year: p.year || '',
    img: p.imageUrl,
    description: p.description,
  })) : [
    { slug: 'ai-health-monitor', title: 'AI Health Monitor', cat: 'IA & DATA', client: 'Ministère Santé', year: '2023', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070', description: '' },
    { slug: 'ecopay-app', title: 'EcoPay App', cat: 'WEB & MOBILE', client: 'EcoBank', year: '2024', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070', description: '' },
    { slug: 'securecloud-gov', title: 'SecureCloud Gov', cat: 'CYBERSÉCURITÉ', client: 'ADIE', year: '2023', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070', description: '' },
    { slug: 'smartagri-data', title: 'SmartAgri Data', cat: 'IA & DATA', client: 'AgriSen', year: '2022', img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072', description: '' },
    { slug: 'logistics-tracker', title: 'Logistics Tracker', cat: 'WEB & MOBILE', client: 'Port Dakar', year: '2024', img: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?q=80&w=2070', description: '' },
    { slug: 'edutech-portal', title: 'EduTech Portal', cat: 'CLOUD', client: 'UCAD', year: '2023', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974', description: '' },
  ];

  const categories = ['Tous', ...Array.from(new Set(displayProjects.map(p => {
    const words = p.cat.split(' ');
    return words.map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  })))];

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-12">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="section-label mb-6">Portfolio</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">Nos Réalisations</h1>
          
          <div className="flex flex-wrap gap-4 mt-12">
            {categories.map((f, i) => (
              <button 
                key={f} 
                className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-colors ${
                  i === 0 ? 'bg-[var(--green-l)] text-black font-bold' : 'border border-white/10 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-[1320px] mx-auto px-4 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {displayProjects.map((p) => (
            <Link key={p.slug} href={`/realisations/${p.slug}`} className="break-inside-avoid glass-card p-2 group cursor-pointer block">
              <div className="relative overflow-hidden rounded-xl">
                <img src={p.img} alt={p.title} className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="text-[10px] font-mono text-[var(--green-l)] mb-2 tracking-widest">{p.cat}</div>
                  <h3 className="text-xl font-heading font-bold text-white mb-1">{p.title}</h3>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                    <span>{p.client}</span>
                    <span>{p.year}</span>
                  </div>
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
