import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réalisations',
  description: 'Découvrez nos projets qui transforment le paysage technologique africain. IA, cybersécurité, cloud et développement web.',
  alternates: { canonical: 'https://galsen.lingueredigital.com/realisations' },
};

export default function RealisationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
