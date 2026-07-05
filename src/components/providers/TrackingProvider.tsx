'use client';

import React, { Suspense } from 'react';
import { useTracking } from '@/lib/hooks/useTracking';

function Tracker() {
  useTracking();
  return null;
}

export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <Tracker />
      </Suspense>
      {children}
    </>
  );
}
