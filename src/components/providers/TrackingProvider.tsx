'use client';

import React from 'react';
import { useTracking } from '@/lib/hooks/useTracking';

function Tracker() {
  useTracking();
  return null;
}

export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tracker />
      {children}
    </>
  );
}
