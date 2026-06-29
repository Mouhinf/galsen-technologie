import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galsen Technologie | IA & Tech au Sénégal',
  description: 'Galsen Technologie propulse votre entreprise vers le futur numérique. IA, cybersécurité, développement — nous construisons l\'Afrique tech.',
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
