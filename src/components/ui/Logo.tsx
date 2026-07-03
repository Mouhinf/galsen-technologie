import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

const Logo = ({ size = 48, className = '', priority = false }: LogoProps) => {
  return (
        <Image
          src="/logo-galsen.webp"
          alt="Galsen Technologie"
          width={525}
          height={475}
          sizes={`${size}px`}
          className={cn('object-contain', className)}
          priority={priority}
        />
  );
};

export default Logo;
