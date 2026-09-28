import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'card' | 'circular';
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 w-full rounded';
      case 'circular':
        return 'rounded-full';
      case 'card':
        return 'h-48 w-full rounded-xl';
      case 'rectangular':
      default:
        return 'rounded-lg';
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-neutral-200/70 dark:bg-neutral-800/60 ${getVariantClasses()} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-xl border border-[#D9D9D5] dark:border-[#262624] bg-white dark:bg-[#141412] space-y-4">
      <SkeletonLoader variant="card" className="h-44" />
      <div className="space-y-2">
        <SkeletonLoader variant="text" className="w-1/3 h-3" />
        <SkeletonLoader variant="text" className="w-3/4 h-5" />
        <SkeletonLoader variant="text" className="w-full h-3" />
        <SkeletonLoader variant="text" className="w-5/6 h-3" />
      </div>
      <div className="pt-2 flex gap-2">
        <SkeletonLoader className="h-8 w-24 rounded-lg" />
        <SkeletonLoader className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
};
