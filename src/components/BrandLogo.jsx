'use client';
import React from 'react';

const SIZE = {
  sm: 'h-10',
  md: 'h-14',
  lg: 'h-28',
  xl: 'w-full max-h-[520px]',
};

export default function BrandLogo({ size = 'md', className = '' }) {
  return (
    <img
      src="/velvet-cake-logo.jpg"
      alt="Velvet Cake AI by LenstedReal"
      className={`${SIZE[size] || SIZE.md} w-auto object-contain object-center ${className}`}
    />
  );
}
