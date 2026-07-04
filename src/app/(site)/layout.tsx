import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Galsen Technologie | IA, Cybersécurité & Tech au Sénégal',
    template: '%s | Galsen Technologie',
  },
  description: 'Galsen Technologie propulse votre entreprise vers le futur numérique. IA, cybersécurité, développement web, cloud et formation tech à Dakar.',
  alternates: { canonical: 'https://galsen.lingueredigital.com' },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {children}
    </div>
  );
}
