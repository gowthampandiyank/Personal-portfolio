import React from 'react';
import { Skeleton } from './Skeleton';

export const HeroSkeleton: React.FC = () => {
  return (
    <div
      aria-label="Loading hero section..."
      className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 md:py-28 overflow-hidden border-b border-[#E2E2DE] dark:border-[#262624]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-16 items-center my-auto">
        {/* Left Column Text Skeleton */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6">
          {/* Status Kicker */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-2.5 h-2.5 bg-[#E54835]/40" />
            <Skeleton className="h-3 w-64" />
          </div>

          {/* Role Headline */}
          <Skeleton className="h-4 w-36" />

          {/* Massive Name Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-14 sm:h-20 w-4/5" />
            <Skeleton className="h-14 sm:h-20 w-3/5" />
          </div>

          {/* Statement Paragraph */}
          <div className="space-y-2 max-w-xl">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-28" />
          </div>

          {/* Quick Technical Specs */}
          <div className="pt-8 border-t border-[#E2E2DE] dark:border-[#262624] flex flex-wrap gap-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        {/* Right Column Image Frame Skeleton */}
        <div className="md:col-span-5 relative w-full flex justify-center md:justify-end">
          <div className="w-full max-w-sm md:max-w-none aspect-[3/4] border border-[#E2E2DE] dark:border-[#262624] p-3 bg-white dark:bg-[#111111]">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
