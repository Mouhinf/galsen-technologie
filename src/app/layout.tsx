import '@/app/globals.css';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata = {
  title: 'Galsen Technologie | IA & Tech au Sénégal',
  description: 'Galsen Technologie propulse votre entreprise vers le futur numérique.',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={fontVariables}>
      <body className="bg-black text-white selection:bg-[#22C55E] selection:text-black font-body">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
