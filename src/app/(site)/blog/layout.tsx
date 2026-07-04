import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Actualités tech, tutoriels, études de cas et réflexions sur l\'innovation numérique au Sénégal.',
  alternates: { canonical: 'https://galsen.lingueredigital.com/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
