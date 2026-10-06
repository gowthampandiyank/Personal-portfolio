import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Download,
  ExternalLink,
  Github,
  Video,
  Layers,
  Database,
  CheckCircle2,
  Sparkles,
  BarChart2,
  Code,
  FileSpreadsheet,
  Link as LinkIcon
} from 'lucide-react';
import { Project } from '../types';
import { TrendArrow } from './TrendArrow';
import { ExportDataButton } from './ExportDataButton';
import { generateProjectDummyCsv, downloadCsvFile } from '../lib/csvExport';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'files' | 'architecture'>('overview');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!project) return null;

  const handleSimulateDownload = (fileName: string) => {
    if (
      fileName.toLowerCase().endsWith('.csv') ||
      fileName.toLowerCase().includes('data') ||
      fileName.toLowerCase().includes('dataset') ||
      fileName.toLowerCase().includes('report')
    ) {
      const csvData = generateProjectDummyCsv(project);
      downloadCsvFile(fileName.endsWith('.csv') ? fileName : `${fileName}.csv`, csvData.content);
    }
    setDownloadSuccess(`Downloaded "${fileName}" successfully.`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl bg-white dark:bg-[#141412] border border-[#D9D9D5] dark:border-[#262624] shadow-2xl rounded-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#D9D9D5] dark:border-[#262624] bg-[#F5F5F3] dark:bg-[#181816]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#111111] text-white dark:bg-white dark:text-[#111111] font-mono text-[10px] uppercase font-bold tracking-wider">
              {project.category}
            </span>
            <div>
              <h3 className="font-black text-lg text-[#111111] dark:text-[#EBEBE8]">
                {project.title}
              </h3>
              <span className="text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
                Engineering Spec &amp; Asset Vault
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D9D9D5] dark:border-[#262624] text-xs font-mono uppercase tracking-wider bg-[#F9F9F8] dark:bg-[#161614] px-6">
          {[
            { id: 'overview', label: 'Overview & Metrics' },
            { id: 'media', label: `Media & Gallery (${(project.images?.length || 1)})` },
            { id: 'files', label: `Documents & Files (${(project.documents?.length || 0) + (project.files?.length || 0)})` },
            { id: 'architecture', label: 'Architecture & Stack' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 font-bold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#111111] dark:border-white text-[#111111] dark:text-white bg-white dark:bg-[#141412]'
                  : 'border-transparent text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {downloadSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW & METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Main Narrative */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-2 font-bold">
                  Project Narrative &amp; Business Objective
                </h4>
                <p className="text-sm text-[#111111] dark:text-[#D5D5D0] leading-relaxed">
                  {project.long_description || project.description}
                </p>
              </div>

              {/* Key Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] font-bold flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
                      <span>Verified Project Performance &amp; Metrics</span>
                    </h4>

                    {/* Consistent Export Data Button */}
                    <ExportDataButton
                      project={project}
                      size="sm"
                      label="Export Dataset (CSV)"
                      onExportSuccess={(filename) => handleSimulateDownload(filename)}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.metrics.map((m, idx) => {
                      const isBoost =
                        m.label.toLowerCase().includes('boost') ||
                        m.label.toLowerCase().includes('accuracy') ||
                        m.label.toLowerCase().includes('processed') ||
                        m.label.toLowerCase().includes('volume') ||
                        m.label.toLowerCase().includes('precision') ||
                        m.label.toLowerCase().includes('authored');
                      const isSpeed =
                        m.label.toLowerCase().includes('speed') ||
                        m.label.toLowerCase().includes('latency') ||
                        m.label.toLowerCase().includes('load');
                      const trendDirection = isSpeed ? 'down' : 'up';
                      const trendVal = isSpeed
                        ? '-64% delay'
                        : isBoost
                        ? '+42% YoY'
                        : '+18% MoM';

                      return (
                        <div
                          key={idx}
                          className="p-4 bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624] flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span className="text-[10px] font-mono text-[#737373] dark:text-[#9E9E9A] uppercase tracking-wider truncate">
                                {m.label}
                              </span>
                              {/* Integrated SVG Trend Arrow */}
                              <TrendArrow
                                direction={trendDirection}
                                value={trendVal}
                                isPositive={true}
                              />
                            </div>
                            <div className="text-2xl font-black text-[#111111] dark:text-white tabular-nums font-mono">
                              {m.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {project.key_features && project.key_features.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-3 font-bold">
                    Key Features &amp; Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.key_features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5]/60 dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] flex items-start gap-2"
                      >
                        <span className="text-[#111111] dark:text-white font-bold">›</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Links */}
              <div className="pt-4 border-t border-[#D9D9D5] dark:border-[#262624] flex flex-wrap items-center gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#111111] dark:bg-[#EBEBE8] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Launch Live Application</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#111111] dark:border-[#EBEBE8] text-[#111111] dark:text-[#EBEBE8] hover:bg-[#111111] hover:text-white dark:hover:bg-[#EBEBE8] dark:hover:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repository</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & GALLERY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Video Player / Walkthrough Demo */}
              {project.video_url && (
                <div className="p-4 rounded-xl bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold uppercase text-[#111111] dark:text-[#EBEBE8] flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#111111] dark:text-white" />
                      <span>Interactive Video Walkthrough</span>
                    </span>
                    <a
                      href={project.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#111111] dark:text-white hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Watch Full Screen</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-2 bg-black/40">
                      <div className="w-14 h-14 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <Video className="w-7 h-7 fill-current ml-0.5" />
                      </div>
                      <span className="text-xs font-mono tracking-wider">Click to Stream Walkthrough</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-3 font-bold">
                  Interface &amp; Dataset Visualizations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(project.images && project.images.length > 0 ? project.images : [project.image_url]).map(
                    (img, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden border border-[#D9D9D5] dark:border-[#262624] aspect-[16/10] bg-[#E8E8E4] dark:bg-[#1A1A18] relative group"
                      >
                        <img src={img} alt={`${project.title} capture ${idx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 left-2 bg-black/75 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                          Capture 0{idx + 1}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS & FILES */}
          {activeTab === 'files' && (
            <div className="space-y-6">
              {/* Project Documents */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-3 font-bold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
                  <span>Project Documentation &amp; Specifications</span>
                </h4>
                {project.documents && project.documents.length > 0 ? (
                  <div className="space-y-2.5">
                    {project.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-white dark:bg-[#121210] border border-[#D9D9D5] dark:border-[#262624] text-[#111111] dark:text-white">
                            {doc.file_type === 'sheet' ? (
                              <FileSpreadsheet className="w-4 h-4" />
                            ) : doc.file_type === 'code' ? (
                              <Code className="w-4 h-4" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#111111] dark:text-[#EBEBE8]">{doc.title}</div>
                            <span className="text-[10px] font-mono text-[#737373] dark:text-[#9E9E9A] uppercase">
                              {doc.file_type} · {doc.size || 'Verified Asset'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSimulateDownload(doc.title)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#111111] dark:bg-[#EBEBE8] text-[#F5F5F3] dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white text-xs font-mono tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-[#737373]">No external documentation attachments registered.</p>
                )}
              </div>

              {/* Data & Code Files */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-3 font-bold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
                  <span>Raw Datasets &amp; Migration Scripts</span>
                </h4>
                {project.files && project.files.length > 0 ? (
                  <div className="space-y-2.5">
                    {project.files.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624] flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs font-bold font-mono text-[#111111] dark:text-[#EBEBE8]">{file.name}</div>
                          <span className="text-[11px] text-[#737373] dark:text-[#9E9E9A] block mt-0.5">
                            {file.description || file.type} ({file.size})
                          </span>
                        </div>

                        <button
                          onClick={() => handleSimulateDownload(file.name)}
                          className="px-3.5 py-1.5 rounded-lg border border-[#D9D9D5] dark:border-[#262624] hover:border-[#111111] dark:hover:border-white text-xs font-mono transition-colors flex items-center gap-1.5 text-[#111111] dark:text-white"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-[#737373]">No file attachments registered.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ARCHITECTURE & STACK */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-2 font-bold">
                  System Architecture &amp; Data Pipeline
                </h4>
                <div className="p-4 rounded-xl bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624] font-mono text-xs text-[#111111] dark:text-[#EBEBE8] leading-relaxed">
                  {project.architecture || 'Direct query analytical architecture with automated schema indexing and client-side reactive state trees.'}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-3 font-bold">
                  Full Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-md bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624] font-mono text-xs text-[#111111] dark:text-[#EBEBE8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#D9D9D5] dark:border-[#262624] bg-[#F5F5F3] dark:bg-[#181816] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#737373] dark:text-[#9E9E9A]">
            Created: {project.created_at}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#111111] dark:bg-[#EBEBE8] text-[#FFFFFF] dark:text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-white transition-all shadow-xs"
          >
            Close Spec View
          </button>
        </div>
      </motion.div>
    </div>
  );
};
