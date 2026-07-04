import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

const Logo = ({ size = 48, className = '', priority = false }: LogoProps) => {
  const useSmall = size <= 60;
  return (
    <img
      src={useSmall ? '/logo-galsen-small.webp' : '/logo-galsen.webp'}
      alt="Galsen Technologie"
      width={useSmall ? 120 : 525}
      height={useSmall ? 110 : 483}
      style={{ width: `${size}px`, height: 'auto' }}
      className={cn('object-contain', className)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
};

export default Logo;
