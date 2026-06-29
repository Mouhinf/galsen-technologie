'use client';

import * as React from 'react';
const NextThemesProvider = ({ children }: any) => <>{children}</>;
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
