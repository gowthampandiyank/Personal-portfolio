import React from 'react';

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
          className="w-full bg-[#FFFFFF] dark:bg-[#141412] border border-[#E2E2DE] dark:border-[#262624] rounded-xl p-6 md:p-8 skeleton-shimmer space-y-4"
        >
          {type === 'project' && (
            <>
              <div className="w-full aspect-[16/9] bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded-lg" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 w-28 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
                <div className="h-4 w-16 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              </div>
              <div className="h-6 w-3/4 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              <div className="h-4 w-full bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              <div className="h-4 w-5/6 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              <div className="flex items-center gap-3 pt-3">
                <div className="h-9 w-28 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded-lg" />
                <div className="h-9 w-24 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded-lg" />
              </div>
            </>
          )}

          {type === 'skill' && (
            <>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded-lg" />
                <div className="h-3 w-8 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              </div>
              <div className="h-3 w-24 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded mt-4" />
              <div className="h-5 w-40 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              <div className="pt-4 border-t border-[#E2E2DE] dark:border-[#262624] flex justify-between">
                <div className="h-3 w-16 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              </div>
            </>
          )}

          {type === 'timeline' && (
            <>
              <div className="flex items-center justify-between">
                <div className="h-5 w-48 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
                <div className="h-4 w-24 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              </div>
              <div className="h-4 w-32 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              <div className="h-4 w-full bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
              <div className="h-4 w-2/3 bg-[#EAEAE6] dark:bg-[#1F1F1D] rounded" />
            </>
          )}
        </div>
      ))}
    </>
  );
};
