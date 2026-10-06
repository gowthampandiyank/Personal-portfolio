import React, { useState } from 'react';
import { FileSpreadsheet, Download, Check, ArrowDownToLine } from 'lucide-react';
import { Project } from '../types';
import { generateProjectDummyCsv, generateDashboardSummaryCsv, downloadCsvFile } from '../lib/csvExport';

export interface ExportDataButtonProps {
  project?: Project;
  isSummary?: boolean;
  label?: string;
  variant?: 'outline' | 'solid';
  size?: 'sm' | 'md';
  className?: string;
  onExportSuccess?: (filename: string) => void;
}

/**
 * Consistent technical button to export and download dummy CSV reporting datasets
 * for analyst projects and executive dashboard sections.
 */
export const ExportDataButton: React.FC<ExportDataButtonProps> = ({
  project,
  isSummary = false,
  label,
  variant = 'outline',
  size = 'md',
  className = '',
  onExportSuccess,
}) => {
  const [status, setStatus] = useState<'idle' | 'exporting' | 'done'>('idle');

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== 'idle') return;

    setStatus('exporting');

    setTimeout(() => {
      let fileData: { filename: string; content: string };
      if (project) {
        fileData = generateProjectDummyCsv(project);
      } else {
        fileData = generateDashboardSummaryCsv();
      }

      downloadCsvFile(fileData.filename, fileData.content);
      setStatus('done');

      if (onExportSuccess) {
        onExportSuccess(fileData.filename);
      }

      setTimeout(() => {
        setStatus('idle');
      }, 2200);
    }, 350);
  };

  const defaultLabel = project
    ? `Export CSV Report`
    : `Export Data Summary`;

  const displayLabel = label || defaultLabel;

  // Base sizing
  const sizeClasses =
    size === 'sm'
      ? 'px-3 py-1.5 text-[10px] sm:text-[11px]'
      : 'px-4 py-2.5 text-xs';

  // Variant styling matching portfolio design system
  const variantClasses =
    variant === 'solid'
      ? 'bg-[#111111] dark:bg-[#EBEBE8] text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white border border-[#111111] dark:border-white'
      : 'bg-white dark:bg-[#141412] text-[#111111] dark:text-[#EBEBE8] border border-[#D9D9D5] dark:border-[#262624] hover:border-[#111111] dark:hover:border-[#EBEBE8] hover:bg-[#F9F9F8] dark:hover:bg-[#1C1C1A]';

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={status === 'exporting'}
      aria-label={`Download CSV report: ${displayLabel}`}
      className={`inline-flex items-center gap-2 font-mono uppercase font-bold tracking-wider select-none cursor-pointer transition-all duration-200 shadow-sm active:translate-y-0.5 disabled:opacity-75 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {status === 'done' ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">
            Exported ✓
          </span>
        </>
      ) : status === 'exporting' ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent animate-spin inline-block shrink-0" />
          <span>Generating CSV...</span>
        </>
      ) : (
        <>
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
          <span>{displayLabel}</span>
          <ArrowDownToLine className="w-3 h-3 text-[#6B6B67] dark:text-[#9E9E9A] shrink-0" />
        </>
      )}
    </button>
  );
};
