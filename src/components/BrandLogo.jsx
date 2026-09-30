'use client';
import React from 'react';

const HEIGHT = { sm: 'h-8', md: 'h-11', lg: 'h-16', xl: 'h-44' };

export default function BrandLogo({
  variant = 'mark',
  size = 'md',
  className = '',
}) {
  const src = variant === 'full' ? '/velvet-cake-logo.jpg' : '/velvet-cake-mark.jpg';
  return (
    <img
      src={src}
      alt="Velvet Cake AI"
      className={`${HEIGHT[size] || HEIGHT.md} w-auto object-contain ${className}`}
    />
  );
}
