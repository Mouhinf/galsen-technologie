import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Galsen Technologie : pionniers de la tech en Afrique de l\'Ouest. Data Science, IA, développement web et solutions numériques.',
  alternates: { canonical: 'https://galsen.lingueredigital.com/a-propos' },
};

export default function AProposLayout({ children }: { children: React.ReactNode }) {
  return children;
}
