import React from 'react';

export interface TrendArrowProps {
  direction?: 'up' | 'down';
  value?: string;
  className?: string;
  showBadge?: boolean;
}

/**
 * Small SVG trend indicator (up/down arrow) with technical monospace styling.
 * Uses the existing green accent color for 'up' trends and neutral grey for 'down' trends.
 */
export const TrendArrow: React.FC<TrendArrowProps> = ({
  direction = 'up',
  value,
  className = '',
  showBadge = true,
}) => {
  const isUp = direction === 'up';

  // Specific requirement: Use existing green accent color for 'up' trends and neutral grey for 'down' trends
  const colorClasses = isUp
    ? 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30 shadow-xs'
    : 'text-[#6B6B67] dark:text-[#9E9E9A] bg-neutral-200/50 dark:bg-neutral-800/60 border-neutral-300 dark:border-neutral-700';

  const iconOnlyColor = isUp ? 'text-[#10B981]' : 'text-[#6B6B67] dark:text-[#9E9E9A]';

  const arrowSvg = isUp ? (
    <svg
      className="w-3 h-3 shrink-0"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {/* Sharp technical upward trend arrow */}
      <path d="M2.5 9.5L9.5 2.5" />
      <path d="M4 2.5H9.5V8" />
    </svg>
  ) : (
    <svg
      className="w-3 h-3 shrink-0"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {/* Sharp technical downward trend arrow */}
      <path d="M2.5 2.5L9.5 9.5" />
      <path d="M4 9.5H9.5V4" />
    </svg>
  );

  if (!showBadge && !value) {
    return <span className={`${iconOnlyColor} ${className}`}>{arrowSvg}</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] font-bold tracking-tight px-1.5 py-0.5 border rounded-none ${colorClasses} ${className}`}
      title={`Telemetry Trend: ${isUp ? 'Upward Trend' : 'Downward Reduction'} ${value ? `(${value})` : ''}`}
    >
      {arrowSvg}
      {value && <span className="tabular-nums font-mono">{value}</span>}
    </span>
  );
};
