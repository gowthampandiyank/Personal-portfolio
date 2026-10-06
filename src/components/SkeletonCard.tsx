import React from 'react';
import { Skeleton } from './skeletons/Skeleton';

interface SkeletonCardProps {
  type?: 'project' | 'skill' | 'timeline';
  count?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ type = 'project', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full bg-[#FFFFFF] dark:bg-[#141412] border border-[#E2E2DE] dark:border-[#262624] p-6 md:p-8 space-y-4"
        >
          {type === 'project' && (
            <>
              <Skeleton className="w-full aspect-[16/9]" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex items-center gap-3 pt-3">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-24" />
              </div>
            </>
          )}

          {type === 'skill' && (
            <>
              <div className="flex items-center justify-between">
                <Skeleton className="w-10 h-10" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-3 w-24 mt-4" />
              <Skeleton className="h-5 w-40" />
              <div className="pt-4 border-t border-[#E2E2DE] dark:border-[#262624] flex justify-between">
                <Skeleton className="h-3 w-16" />
              </div>
            </>
          )}

          {type === 'timeline' && (
            <>
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </>
          )}
        </div>
      ))}
    </>
  );
};
