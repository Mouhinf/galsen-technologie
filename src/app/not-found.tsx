import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-display font-bold text-[var(--green-l)] mb-4">404</h1>
      <h2 className="text-2xl font-heading font-bold text-white mb-6">Page introuvable</h2>
      <p className="text-white/60 text-lg mb-8 max-w-md">La page que vous recherchez n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="btn-primary">Retour à l&apos;accueil</Link>
    </main>
  );
}
