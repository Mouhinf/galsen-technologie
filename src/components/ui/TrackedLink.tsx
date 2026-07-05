'use client';

import React from 'react';
import { useTracking } from '@/lib/hooks/useTracking';

export function TrackedLink({ href, label, children, className, ...props }: { href: string; label: string; children: React.ReactNode; className?: string; target?: string; rel?: string; 'aria-label'?: string }) {
  const { trackEvent } = useTracking();
  return (
    <a href={href} onClick={() => trackEvent('click', { label, href })} className={className} {...props}>
      {children}
    </a>
  );
}
