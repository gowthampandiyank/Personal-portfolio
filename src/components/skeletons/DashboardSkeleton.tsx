import React from 'react';
import { Skeleton } from './Skeleton';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div
      aria-label="Loading analytics dashboard..."
      className="p-6 md:p-8 border border-[#E2E2DE] dark:border-[#262624] bg-white dark:bg-[#0D0D0D] space-y-8"
    >
      {/* Dashboard Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E2DE] dark:border-[#262624]">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-6 w-56" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* 3-Column KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-5 border border-[#E2E2DE] dark:border-[#262624] bg-[#FBFBF9] dark:bg-[#141412] space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="w-7 h-7" />
            </div>
            <Skeleton className="h-9 w-32" />
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Placeholder Area */}
      <div className="p-6 border border-[#E2E2DE] dark:border-[#262624] bg-[#FBFBF9] dark:bg-[#141412] space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-44" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
        <div className="h-60 flex items-end gap-3 pt-6 px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end h-full">
              <Skeleton
                className="w-full"
                height={`${Math.max(20, ((i * 37) % 85) + 15)}%`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mini Table Rows Skeleton */}
      <div className="border border-[#E2E2DE] dark:border-[#262624] overflow-hidden">
        <div className="p-4 bg-[#F5F5F3] dark:bg-[#181816] border-b border-[#E2E2DE] dark:border-[#262624] flex justify-between">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="divide-y divide-[#E2E2DE] dark:divide-[#262624]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
