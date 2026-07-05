import { MetadataRoute } from 'next';

const BASE = 'https://galsen.lingueredigital.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/services/developpement-web-et-mobile`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/intelligence-artificielle-et-data`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/cybersecurite`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/cloud-et-infrastructure`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/formation-tech`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/conseil-it-et-transformation-digitale`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/realisations`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/formation`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/blog`, priority: 0.75, changeFrequency: 'weekly' },
    { url: `${BASE}/a-propos`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'monthly' },
  ];
}
