import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Search,
  Lock,
  Layers,
  Sparkles,
  FileText,
  Eye,
  Download
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Project } from '../types';
import { ProjectDetailModal } from '../components/ProjectDetailModal';

export const WorkPage: React.FC = () => {
  const { projects, openSecurityModal, setCursor, resetCursor } = usePortfolioStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Data Analytics', 'Business Intelligence', 'Financial Modeling'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        project.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <>
      <div className="pt-24 pb-28 bg-[#F5F5F3]/85 dark:bg-[#0D0D11]/85 backdrop-blur-[1px] min-h-screen text-[#111111] dark:text-[#EBEBE8] transition-colors duration-300 relative z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] text-xs font-mono uppercase text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white hover:border-[#111111] dark:hover:border-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
              <span>Admin Console</span>
            </Link>
          </div>

          {/* Page Title */}
          <div className="mb-10 pb-6 border-b border-[#E2E2DE] dark:border-[#262624]">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-white uppercase">
              Full Project Vault
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-xl">
              Explore enterprise data analytics models, interactive Power BI executive dashboards, and SQL data architectures with documentation and datasets.
            </p>
          </div>

          {/* Filter Pills - Unified Monochromatic Style */}
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 select-none hover:-translate-y-0.5 active:translate-y-0 ${
                    isSelected
                      ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-sm font-bold'
                      : 'bg-white dark:bg-[#181816] text-[#6B6B67] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white border border-[#E2E2DE] dark:border-[#262624] hover:border-[#111111] dark:hover:border-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 mb-16 max-w-xl"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B67] dark:text-[#9E9E9A]" />
              <input
                type="text"
                placeholder="Search projects by stack, metric, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#141412] border border-[#E2E2DE] dark:border-[#262624] text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#888888] dark:placeholder-[#666677] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 select-none shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>

          {/* Projects Collection Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#141412] border border-[#E2E2DE] dark:border-[#262624] rounded-2xl p-8 mb-16">
              <Layers className="w-8 h-8 text-[#6B6B67] dark:text-[#9E9E9A] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#111111] dark:text-white">
                No matching projects found
              </h3>
              <p className="text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A] mt-1 mb-6">
                Try selecting a different category or clearing search term "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-24 mb-24">
              {filteredProjects.map((project, idx) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 border-b border-[#E2E2DE] dark:border-[#262624]"
                >
                  {/* Large Image Showcase Container */}
                  <div
                    className={`lg:col-span-7 ${
                      idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div
                      onClick={() => setActiveModalProject(project)}
                      onMouseEnter={() => setCursor({ label: 'DETAILS', type: 'view' })}
                      onMouseLeave={resetCursor}
                      className="relative overflow-hidden rounded-2xl bg-[#EAEAE6] dark:bg-[#1A1A18] border border-[#E2E2DE] dark:border-[#262624] aspect-[16/9] cursor-pointer shadow-sm group-hover:border-[#111111] dark:group-hover:border-white transition-colors"
                    >
                      <img
                        src={project.image_url}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover project-card-image transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Category Overlay */}
                      <div className="absolute top-4 left-4 bg-[#111111]/85 backdrop-blur-xs text-white px-3.5 py-1 rounded-lg text-[11px] font-mono tracking-wider uppercase">
                        {project.category}
                      </div>

                      {project.is_featured && (
                        <div className="absolute top-4 right-4 bg-[#111111] text-white dark:bg-white dark:text-black px-3 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3" />
                          <span>FEATURED</span>
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-white" />
                          <span>Click to Inspect Full Project Spec &amp; Files</span>
                        </div>
                        <span className="text-[11px] text-white/80 font-bold">
                          {project.files?.length || project.documents?.length || 0} Files Attached
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
                    <div className="text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A] uppercase tracking-wider mb-2 font-bold">
                      {project.category} · {project.created_at}
                    </div>

                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-200 mb-4 cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Metrics preview */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white dark:bg-[#141412] border border-[#E2E2DE] dark:border-[#262624]">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx}>
                            <span className="text-[10px] font-mono text-[#6B6B67] dark:text-[#9E9E9A] block uppercase">
                              {m.label}
                            </span>
                            <strong className="text-sm font-bold text-[#111111] dark:text-white font-mono">
                              {m.value}
                            </strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A] mb-8 pb-6 border-b border-[#E2E2DE] dark:border-[#262624]">
                      <span className="text-[#111111] dark:text-white font-bold">Stack:</span>
                      {project.technologies.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span className="text-[#111111] dark:text-[#D5D5E0]">{tech}</span>
                          {tIdx < project.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#444455]">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Actions - Unified Black & White Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Specs &amp; Files</span>
                      </button>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#111111] dark:border-white text-[#111111] dark:text-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
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
                          className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#D9D9D5] dark:border-[#262624] text-[#6B6B67] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white hover:border-[#111111] dark:hover:border-white transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="pt-8 border-t border-[#D9D9D5]/60 dark:border-[#282838] text-center text-xs font-mono text-[#737373] dark:text-[#888899]">
            © {new Date().getFullYear()} Gowtham Pandiyan — Data Analyst.
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </>
  );
};
