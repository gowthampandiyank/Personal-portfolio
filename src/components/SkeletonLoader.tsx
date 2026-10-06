import React from 'react';
import { Skeleton, SkeletonProps } from './skeletons/Skeleton';

export { Skeleton as SkeletonLoader };
export type { SkeletonProps };

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-6 border border-[#D9D9D5] dark:border-[#262624] bg-white dark:bg-[#141412] space-y-4">
      <Skeleton variant="card" className="h-44" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-1/3 h-3" />
        <Skeleton variant="text" className="w-3/4 h-5" />
        <Skeleton variant="text" className="w-full h-3" />
        <Skeleton variant="text" className="w-5/6 h-3" />
      </div>
      <div className="pt-2 flex gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};
