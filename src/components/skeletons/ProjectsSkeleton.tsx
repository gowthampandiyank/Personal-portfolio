import React from 'react';
import { Skeleton } from './Skeleton';

interface ProjectsSkeletonProps {
  count?: number;
}

export const ProjectsSkeleton: React.FC<ProjectsSkeletonProps> = ({ count = 3 }) => {
  return (
    <section className="py-28 md:py-36 bg-[#F9F9F7]/95 dark:bg-[#0D0D0D]/95 border-b border-[#E2E2DE] dark:border-[#262624]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <div className="space-y-3">
            <Skeleton className="h-3 w-44" />
            <Skeleton className="h-10 sm:h-12 w-72" />
          </div>
          <Skeleton className="h-4 w-72 mt-4 md:mt-0" />
        </div>

        {/* Large Project Panels Skeleton */}
        <div className="flex flex-col space-y-28">
          {Array.from({ length: count }).map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Image Container Skeleton */}
              <div
                className={`lg:col-span-7 ${
                  idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="border border-[#E2E2DE] dark:border-[#262624] p-3 bg-white dark:bg-[#141412]">
                  <Skeleton className="w-full aspect-[16/10]" />
                </div>
              </div>

              {/* Text Info Skeleton */}
              <div
                className={`lg:col-span-5 flex flex-col justify-center space-y-5 ${
                  idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-2" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-8 sm:h-10 w-4/5" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-28" />
                </div>

                {/* CTA Links */}
                <div className="flex items-center gap-4 pt-4">
                  <Skeleton className="h-11 w-36" />
                  <Skeleton className="h-11 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
