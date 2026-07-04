import '@/app/globals.css';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata = {
  title: {
    default: 'Galsen Technologie | IA & Tech au Sénégal',
    template: '%s | Galsen Technologie',
  },
  description: 'Galsen Technologie propulse votre entreprise vers le futur numérique. IA, cybersécurité, développement web, cloud et formation tech au Sénégal.',
  icons: { icon: '/favicon-32x32.png' },
  metadataBase: new URL('https://galsen.lingueredigital.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Galsen Technologie | IA & Tech au Sénégal',
    description: 'Galsen Technologie propulse votre entreprise vers le futur numérique.',
    url: 'https://galsen.lingueredigital.com',
    siteName: 'Galsen Technologie',
    locale: 'fr_SN',
    type: 'website',
    images: [{ url: '/logo-galsen.webp', width: 525, height: 483, alt: 'Galsen Technologie' }],
  },
  twitter: {
    card: 'summary',
    title: 'Galsen Technologie | IA & Tech au Sénégal',
    description: 'Galsen Technologie propulse votre entreprise vers le futur numérique.',
    images: ['/logo-galsen.webp'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-black text-white selection:bg-[#22C55E] selection:text-black font-body">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-[var(--green-l)] focus:text-black focus:px-4 focus:py-2 focus:rounded focus:text-sm">
          Aller au contenu principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
