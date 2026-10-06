import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, FileText, Download, Eye, X } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ExperienceItem, AttachedFile } from '../types';

export const ExperienceSection: React.FC = () => {
  const { experience, setCursor, resetCursor } = usePortfolioStore();
  const [selectedExpFiles, setSelectedExpFiles] = useState<ExperienceItem | null>(null);

  const handleDownload = (file: AttachedFile) => {
    if (file.url.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(file.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="experience"
      className="py-28 md:py-36 bg-transparent border-b border-white/40 dark:border-white/10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/40 dark:border-white/10">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#E54835] uppercase mb-2 block font-bold">
              03. Career Timeline
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase">
              Experience
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-xs md:text-right">
            Practical data modeling, business intelligence reporting, and enterprise SQL data pipeline engagements.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l border-white/40 dark:border-white/10 ml-3 md:ml-6 pl-8 md:pl-14 space-y-12">
          {experience.map((exp, index) => {
            const hasFiles = exp.files && exp.files.length > 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setCursor({ label: 'TIMELINE', type: 'explore' })}
                onMouseLeave={resetCursor}
                className="relative group p-6 md:p-8 glass-card"
              >
                {/* Bullet Node Indicator */}
                <div className="absolute -left-[45px] md:-left-[69px] top-8 w-3.5 h-3.5 rounded-none bg-white dark:bg-[#0D0D0D] border-2 border-[#E54835] group-hover:bg-[#E54835] transition-colors shadow-xs" />

                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111111] dark:text-[#EBEBE8] group-hover:text-[#E54835] transition-colors">
                      {exp.job_title}
                    </h3>
                    <div className="text-sm font-semibold text-[#E54835] mt-1">
                      {exp.company}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[#E54835] bg-[#E54835]/15 backdrop-blur-md px-3.5 py-1.5 rounded-none self-start lg:self-auto font-bold border border-[#E54835]/30 shadow-xs">
                    {exp.start_date} — {exp.end_date}
                  </div>
                </div>

                <p className="text-sm md:text-base text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed max-w-3xl mb-6">
                  {exp.description}
                </p>

                {/* Optional Deliverables Button */}
                {hasFiles && (
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setSelectedExpFiles(exp)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-none border border-white/60 dark:border-white/15 bg-white/40 dark:bg-white/5 backdrop-blur-md text-[#111111] dark:text-white hover:bg-[#E54835] hover:text-white dark:hover:bg-[#E54835] transition-all shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{exp.files!.length} Deliverables &amp; Proofs Attached</span>
                    </button>
                  </div>
                )}

                {/* Skills Applied */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A] pt-4 border-t border-white/40 dark:border-white/10">
                    <span className="text-[#E54835] font-bold">Applied Stack:</span>
                    {exp.skills.map((skill, sIdx) => (
                      <React.Fragment key={skill}>
                        <span>{skill}</span>
                        {sIdx < exp.skills.length - 1 && (
                          <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deliverables Modal - Glassmorphic */}
      {selectedExpFiles && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
          <div className="w-full max-w-xl glass-panel-deep p-6 md:p-8 shadow-2xl rounded-none max-h-[85vh] overflow-y-auto border border-white/60 dark:border-white/15">
            <div className="flex items-center justify-between pb-3 border-b border-white/40 dark:border-white/10 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6B67] dark:text-[#9E9E9A]">
                  Experience Deliverables &amp; Records
                </span>
                <h4 className="font-bold text-base uppercase text-[#111111] dark:text-[#EBEBE8]">
                  {selectedExpFiles.job_title} at {selectedExpFiles.company}
                </h4>
              </div>
              <button
                onClick={() => setSelectedExpFiles(null)}
                className="p-1 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedExpFiles.files?.map((file, idx) => (
                <div
                  key={file.id || `exp-file-${file.name}-${idx}`}
                  className="p-3.5 glass-card rounded-none flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-none bg-[#E54835]/15 border border-[#E54835]/30 backdrop-blur-md flex items-center justify-center shrink-0 text-[#E54835]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold font-mono text-[#111111] dark:text-[#EBEBE8] truncate">
                        {file.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#6B6B67] dark:text-[#9E9E9A]">
                        {file.type.toUpperCase()} · {file.size}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(file)}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-mono font-bold uppercase rounded-none hover:bg-neutral-800 dark:hover:bg-neutral-200 flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/40 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedExpFiles(null)}
                className="px-5 py-2 text-xs font-bold uppercase rounded-none border border-white/60 dark:border-white/15 bg-white/40 dark:bg-white/5 backdrop-blur-md text-[#111111] dark:text-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
