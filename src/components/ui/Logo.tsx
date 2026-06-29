import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 48, className = '' }: LogoProps) => {
  return (
    <Image 
      src="/logo-galsen.png" 
      alt="Galsen Technologie" 
      width={525} 
      height={475}
      className={`object-contain ${className}`}
      style={{ width: size, height: 'auto' }}
    />
  );
};

export default Logo;
