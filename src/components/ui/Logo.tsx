import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

const Logo = ({ size = 48, className = '', priority = false }: LogoProps) => {
  return (
        <img
          src="/logo-galsen.webp"
          alt="Galsen Technologie"
          width={525}
          height={483}
          style={{ width: `${size}px`, height: 'auto' }}
          className={cn('object-contain', className)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
  );
};

export default Logo;
