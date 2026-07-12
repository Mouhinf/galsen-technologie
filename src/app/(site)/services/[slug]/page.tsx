import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import ServiceContactForm from './ServiceContactForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { serverSanitizeHtml } from '@/lib/server-sanitize';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary-url';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!service) return { title: 'Service non trouvé | Galsen Technologie' };
  return {
    title: `${service.title} | Galsen Technologie`,
    description: service.description,
    alternates: { canonical: `https://galsen.lingueredigital.com/services/${params.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });

  if (!service) {
    notFound();
  }

  const features = (() => { try { return JSON.parse(service.features); } catch { return []; } })() as string[];
  const safeContent = serverSanitizeHtml(service.content);
  const color = service.color.startsWith('var') ? '#22C55E' : service.color;

  const relatedServices = await prisma.service.findMany({
    where: { active: true, slug: { not: service.slug } },
    take: 3,
    orderBy: { order: 'asc' },
  });

  return (
    <main id="main-content" className="min-h-screen">
      <TechGrid />
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0">
          {service.imageUrl && (
            <img src={optimizeCloudinaryUrl(service.imageUrl, { width: 1200, height: 600 })} alt={`${service.title} — Galsen Technologie`} width={1200} height={600} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="max-w-[1000px] mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-sm font-mono text-white/40 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/80 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/60">{service.title}</span>
          </nav>

          <Link href="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-mono mb-8 transition-colors">
            <ArrowLeft size={14} /> Retour aux services
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: color + '20', color }}>
              {service.title.charAt(0)}
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-[3px] uppercase" style={{ color }}>Service</div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white">{service.title}</h1>
            </div>
          </div>

          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">{service.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-10">
            {features.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-6">Ce que nous proposons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((item: string) => (
                    <div key={item} className="flex items-center gap-3 p-4 glass-card">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '30', color }}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {safeContent && (
              <div className="prose prose-invert prose-green max-w-none">
                <div dangerouslySetInnerHTML={{ __html: safeContent }} />
              </div>
            )}
          </div>

          <ServiceContactForm serviceTitle={service.title} accentColor={color} />
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-20 border-t border-white/5">
          <div className="max-w-[1000px] mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-white mb-10">Autres services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((s) => (
                <Link key={s.id} href={`/services/${s.slug}`} className="group p-6 rounded-xl glass-card hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: s.color + '20', color: s.color }}>
                      {s.title.charAt(0)}
                    </div>
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-[var(--green-l)] transition-colors">{s.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{s.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-[var(--green-l)] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ArrowRight size={12} />
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
