import React from 'react';
import { Skeleton } from './Skeleton';

export const AboutSkeleton: React.FC = () => {
  return (
    <section className="py-28 md:py-36 bg-[#F9F9F7]/95 dark:bg-[#0D0D0D]/95 border-b border-[#E2E2DE] dark:border-[#262624]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <div className="space-y-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-10 sm:h-12 w-64" />
          </div>
          <Skeleton className="h-4 w-72 mt-4 md:mt-0" />
        </div>

        {/* Bio Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-4 space-y-4">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* 6 Core Focus Domain Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-8 border border-[#E2E2DE] dark:border-[#262624] bg-white dark:bg-[#141412] space-y-4"
            >
              <Skeleton className="w-10 h-10" />
              <Skeleton className="h-5 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
