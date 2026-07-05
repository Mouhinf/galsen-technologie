import { prisma } from '@/lib/prisma';
import { MetadataRoute } from 'next';

const BASE = 'https://galsen.lingueredigital.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [services, projects, posts] = await Promise.all([
    prisma.service.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    prisma.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const latestService = services.length > 0 ? services.reduce((a, b) => a.updatedAt > b.updatedAt ? a : b).updatedAt : now;
  const latestProject = projects.length > 0 ? projects.reduce((a, b) => a.updatedAt > b.updatedAt ? a : b).updatedAt : now;
  const latestPost = posts.length > 0 ? posts.reduce((a, b) => a.updatedAt > b.updatedAt ? a : b).updatedAt : now;

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/services`, lastModified: latestService, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/realisations`, lastModified: latestProject, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/formation`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/blog`, lastModified: latestPost, priority: 0.75, changeFrequency: 'daily' },
    { url: `${BASE}/a-propos`, lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: s.updatedAt,
    priority: 0.85,
    changeFrequency: 'monthly',
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${BASE}/realisations/${p.slug}`,
    lastModified: p.updatedAt,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const postPages: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    priority: 0.65,
    changeFrequency: 'monthly',
  }));

  return [...staticPages, ...servicePages, ...projectPages, ...postPages];
}
