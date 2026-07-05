'use client';

import React from 'react';
import { useTracking } from '@/lib/hooks/useTracking';

export function TrackedLink({ href, label, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { label?: string }) {
  const { trackEvent } = useTracking();
  return (
    <a href={href} onClick={() => trackEvent('click', { label: label || href, href })} className={className} {...props}>
      {children}
    </a>
  );
}
