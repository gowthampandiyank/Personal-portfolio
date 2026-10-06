import React from 'react';
import { Skeleton } from './Skeleton';

export const ContactSkeleton: React.FC = () => {
  return (
    <section className="py-28 md:py-36 bg-[#F5F5F3] dark:bg-[#0A0A0A] border-b border-[#E2E2DE] dark:border-[#262624]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <div className="space-y-3">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-10 sm:h-12 w-80" />
          </div>
          <Skeleton className="h-4 w-72 mt-4 md:mt-0" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="space-y-4 pt-4 border-t border-[#E2E2DE] dark:border-[#262624]">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 border border-[#E2E2DE] dark:border-[#262624] bg-white dark:bg-[#141412] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <div className="p-8 border border-[#E2E2DE] dark:border-[#262624] bg-white dark:bg-[#141412] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-32 w-full" />
              </div>
              <Skeleton className="h-12 w-44" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
