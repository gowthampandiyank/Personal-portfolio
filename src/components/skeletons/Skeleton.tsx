import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'text' | 'rectangular' | 'card' | 'circular' | 'badge';
  width?: string | number;
  height?: string | number;
}

/**
 * Base low-contrast, theme-adaptive Skeleton component with subtle CSS shimmer animation.
 * Follows strict zero-radius discipline and editorial styling.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'h-4 w-full';
      case 'circular':
        return 'w-10 h-10'; // zero-radius maintained by site-wide rule
      case 'card':
        return 'h-48 w-full';
      case 'badge':
        return 'h-6 w-20';
      case 'rectangular':
      default:
        return 'w-full h-full';
    }
  };

  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      style={inlineStyles}
      className={`relative overflow-hidden bg-[#EAEAE6] dark:bg-[#1C1C1A] ${getVariantStyles()} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/5 to-transparent pointer-events-none" />
    </div>
  );
};
