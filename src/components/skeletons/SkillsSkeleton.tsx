import React from 'react';
import { Skeleton } from './Skeleton';

export const SkillsSkeleton: React.FC = () => {
  return (
    <section className="py-28 md:py-36 bg-[#F5F5F3] dark:bg-[#0A0A0A] border-b border-[#E2E2DE] dark:border-[#262624]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <div className="space-y-3">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-10 sm:h-12 w-80" />
          </div>
          <Skeleton className="h-4 w-60 mt-4 md:mt-0" />
        </div>

        {/* Category Filter Pills Skeleton */}
        <div className="flex flex-wrap gap-2.5 mb-14">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-44" />
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-44" />
        </div>

        {/* Technical Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-6 border border-[#E2E2DE] dark:border-[#262624] bg-white dark:bg-[#141412] flex flex-col justify-between h-44"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-10 h-10" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="pt-3 border-t border-[#E2E2DE] dark:border-[#262624] flex items-center justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
