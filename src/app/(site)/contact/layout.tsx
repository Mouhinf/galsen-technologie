import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Galsen Technologie pour votre projet numérique. Dakar, Sénégal.',
  alternates: { canonical: 'https://galsen.lingueredigital.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
