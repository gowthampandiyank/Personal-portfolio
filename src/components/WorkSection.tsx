import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Github,
  Sparkles,
  FileText,
  Video,
  Download,
  Eye,
  Database,
  BarChart2
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ProjectsSkeleton } from './skeletons/ProjectsSkeleton';

interface WorkSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  limit,
  showViewAll = false,
}) => {
  const { projects, isLoading, setCursor, resetCursor } = usePortfolioStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (isLoading) {
    return <ProjectsSkeleton count={limit || 3} />;
  }

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <>
      <section
        id="work"
        className="py-28 md:py-36 bg-[#F9F9F7]/95 dark:bg-[#0D0D0D]/95 backdrop-blur-[1px] border-b border-[#E2E2DE] dark:border-[#262624] relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#E54835] uppercase mb-2 block font-bold">
                04. Engineering &amp; Analytics
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase">
                Featured Projects
              </h2>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-2">
              <p className="text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-sm md:text-right">
                Production-grade data intelligence solutions and business intelligence dashboards complete with analytical documents, datasets, and SQL queries.
              </p>
            </div>
          </div>

          {/* Large Project Panels */}
          <div className="flex flex-col space-y-28">
            {displayedProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Large Image Showcase Container */}
                <div
                  className={`lg:col-span-7 ${
                    idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    onMouseEnter={() => setCursor({ label: 'DETAILS', type: 'view' })}
                    onMouseLeave={resetCursor}
                    className="relative overflow-hidden bg-[#EAEAE6] dark:bg-[#1A1A18] border border-[#E2E2DE] dark:border-[#262624] aspect-[16/9] rounded-none cursor-pointer shadow-sm hover:border-[#111111] dark:hover:border-white transition-all duration-300"
                  >
                    <img
                      src={project.image_url}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover project-card-image transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Corner Index Overlay */}
                    <div className="absolute top-4 left-4 bg-[#111111]/85 backdrop-blur-xs text-[#F5F5F3] px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase rounded-none">
                      0{idx + 1} // <span className="text-[#E54835] font-bold">{project.category}</span>
                    </div>

                    {project.is_featured && (
                      <div className="absolute top-4 right-4 bg-[#111111] text-white dark:bg-white dark:text-black px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-none flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-[#E54835]" />
                        <span>FEATURED</span>
                      </div>
                    )}

                    {/* Hover Prompt Bar */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-white" />
                        <span>Click to View Specs, Documents &amp; Files</span>
                      </div>
                      <span className="text-[11px] text-white/80 font-bold">
                        {project.files?.length || 0} Files Attached
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Meta & Narrative */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                    <span className="text-[#E54835]">{project.category}</span>
                    <span className="text-[#D9D9D5] dark:text-[#333330]">·</span>
                    <span className="text-[#6B6B67] dark:text-[#9E9E9A]">{project.created_at}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] group-hover:text-[#E54835] transition-colors duration-200 mb-4 cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies Stack */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A] mb-8 pb-6 border-b border-[#E2E2DE] dark:border-[#262624]">
                    <span className="text-[#E54835] font-bold">Stack:</span>
                    {project.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {tIdx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Project Actions - Unified Black & White Buttons with Radius 0 */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-none bg-[#111111] dark:bg-[#EBEBE8] text-[#FFFFFF] dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details &amp; Files</span>
                    </button>

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-none border border-[#111111] dark:border-[#EBEBE8] text-[#111111] dark:text-[#EBEBE8] hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-none border border-[#D9D9D5] dark:border-[#262624] text-[#6B6B67] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8] hover:border-[#111111] dark:hover:border-white transition-all duration-300"
                        title="View Code Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Projects Button - Unified Black & White with Radius 0 */}
          {showViewAll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-24 pt-8 flex flex-col items-center justify-center text-center"
            >
              <Link
                to="/work"
                onMouseEnter={() => setCursor({ label: 'EXPLORE', type: 'explore' })}
                onMouseLeave={resetCursor}
                className="inline-flex items-center justify-center px-10 py-4 rounded-none bg-[#111111] dark:bg-[#EBEBE8] text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white font-bold text-sm tracking-wider uppercase shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 select-none"
              >
                <span>View Full Project Vault</span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
