import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  BarChart3,
  FileSpreadsheet,
  Workflow,
  Calculator,
  TrendingUp,
  Filter,
  PieChart,
  Server,
  Layers,
  FileCode2,
  Atom,
  Globe,
  Palette,
  Wind,
  Terminal,
  Cpu,
  GitBranch,
  Layout,
  Activity,
  LineChart,
  Cloud,
  Code2,
  Sparkles,
  FileText,
  Download,
  Eye,
  X,
  LucideIcon
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { SkillItem, AttachedFile } from '../types';
import { SkillsSkeleton } from './skeletons/SkillsSkeleton';

const getSkillIcon = (name: string, category: string): LucideIcon => {
  const n = name.toLowerCase();
  // 1. Data Pipelines, ETL, & Automated Workflows
  if (n.includes('pipeline') || n.includes('etl') || n.includes('workflow') || n.includes('ingest') || n.includes('orchestrat')) {
    return Workflow;
  }
  // 2. Relational Databases, SQL & Querying
  if (n.includes('sql') || n.includes('query') || n.includes('database') || n.includes('postgres') || n.includes('mysql')) {
    return Database;
  }
  // 3. Power BI, Dashboards, & Visual Intelligence
  if (n.includes('power bi') || n.includes('dashboard') || n.includes('scenario') || n.includes('what-if') || n.includes('barchart')) {
    return BarChart3;
  }
  // 4. Spreadsheets, Power Query, & Financial Modeling
  if (n.includes('excel') || n.includes('power query') || n.includes('spreadsheet') || n.includes('variance') || n.includes('financial')) {
    return FileSpreadsheet;
  }
  // 5. Data Calculations, Statistical Testing, & DAX Formulas
  if (n.includes('dax') || n.includes('calc') || n.includes('stat') || n.includes('hypothesis') || n.includes('scipy')) {
    return Calculator;
  }
  // 6. KPIs, Executive Metrics, & Customer Cohorts
  if (n.includes('kpi') || n.includes('metric') || n.includes('report') || n.includes('cohort') || n.includes('churn') || n.includes('clv') || n.includes('rfm')) {
    return TrendingUp;
  }
  // 7. Data Cleansing, Anomaly Detection, & Filtering
  if (n.includes('clean') || n.includes('validat') || n.includes('filter') || n.includes('quality') || n.includes('anomaly')) {
    return Filter;
  }
  // 8. Visual Analytics, Exploratory Data Analysis & Tableau
  if (n.includes('eda') || n.includes('explorat') || n.includes('tableau') || n.includes('pie')) {
    return PieChart;
  }
  // 9. Python, Pandas, & NumPy Data Scripting
  if (n.includes('python') || n.includes('pandas') || n.includes('numpy')) {
    return Terminal;
  }
  // 10. Star & Snowflake Data Warehouse Schemas
  if (n.includes('schema') || n.includes('warehouse') || n.includes('star') || n.includes('snowflake')) {
    return Layers;
  }
  // 11. Database Normalization & Indexing
  if (n.includes('normaliz') || n.includes('index') || n.includes('server')) {
    return Server;
  }
  // 12. Version Control for Data
  if (n.includes('git') || n.includes('github')) {
    return GitBranch;
  }
  return Database;
};

export const SkillsSection: React.FC = () => {
  const { skills, isLoading, setCursor, resetCursor } = usePortfolioStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkillCert, setSelectedSkillCert] = useState<SkillItem | null>(null);

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  const categories = ['All', 'Data Analytics & BI', 'SQL & Data Warehousing', 'Python & ETL Pipelines', 'Financial & KPI Modeling'];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

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
      id="skills"
      className="py-28 md:py-36 bg-[#F9F9F7]/95 dark:bg-[#0D0D0D]/95 backdrop-blur-[1px] border-b border-[#E2E2DE] dark:border-[#262624] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#E54835] uppercase mb-2 block font-bold">
                02. Technical Repertoire
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase">
                Skills &amp; Tools
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-sm md:text-right">
              Core proficiencies across business intelligence, SQL data modeling, executive dashboards, Python pipelines, and predictive analytics.
            </p>
          </div>

          {/* Navigation Filter Bar - Unified Monochromatic Buttons with Radius 0 */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap rounded-none select-none hover:-translate-y-0.5 active:translate-y-0 ${
                    isActive
                      ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-sm'
                      : 'bg-white dark:bg-[#181816] border border-[#E2E2DE] dark:border-[#262624] text-[#6B6B67] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white hover:border-[#111111] dark:hover:border-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2E2DE] dark:bg-[#262624] border border-[#E2E2DE] dark:border-[#262624] rounded-none overflow-hidden shadow-sm"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = getSkillIcon(skill.name, skill.category);
              const hasCertifications = skill.files && skill.files.length > 0;

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  onMouseEnter={() => setCursor({ label: 'SKILL', type: 'explore' })}
                  onMouseLeave={resetCursor}
                  className="p-6 md:p-8 bg-[#FFFFFF] dark:bg-[#0D0D0D] hover:bg-[#F5F5F3] dark:hover:bg-[#141412] transition-colors group flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Skill Icon & Numerical sequence */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-2.5 rounded-none bg-[#E54835]/10 border border-[#E54835]/20 text-[#E54835] group-hover:scale-105 transition-all duration-300 shadow-sm">
                        <IconComponent className="w-5 h-5 transition-transform duration-300" />
                      </div>
                      <span className="font-mono text-xs text-[#6B6B67] dark:text-[#9E9E9A]">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[#E54835] uppercase tracking-wider mb-1.5 font-semibold">
                      {skill.category}
                    </div>

                    <h3 className="text-lg font-bold text-[#111111] dark:text-[#EBEBE8] transition-colors">
                      {skill.name}
                    </h3>

                    {/* Optional Certifications / Attachments Chip */}
                    {hasCertifications && (
                      <button
                        type="button"
                        onClick={() => setSelectedSkillCert(skill)}
                        className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-none border border-[#111111] dark:border-[#EBEBE8] text-[#111111] dark:text-[#EBEBE8] hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{skill.files!.length} {skill.files!.length === 1 ? 'Certification / File' : 'Certifications & Files'}</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E2DE] dark:border-[#262624] flex items-center justify-between text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]">
                    <span>{skill.proficiency_level || 'Proficient'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Supporting note */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Continuously practiced through real-world analytical models and enterprise data pipelines.</span>
          </div>
          <span className="tabular-nums">Total Skills: {skills.length}</span>
        </div>
      </div>

      {/* Optional Certifications Preview Modal */}
      {selectedSkillCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white dark:bg-[#141412] p-6 border border-[#E2E2DE] dark:border-[#262624] shadow-2xl rounded-none max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DE] dark:border-[#262624] mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6B67] dark:text-[#9E9E9A]">
                  Skill Credentials &amp; Resources
                </span>
                <h4 className="font-bold text-base uppercase text-[#111111] dark:text-[#EBEBE8]">
                  {selectedSkillCert.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedSkillCert(null)}
                className="p-1 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedSkillCert.files?.map((file, idx) => (
                <div
                  key={file.id || `cert-file-${file.name}-${idx}`}
                  className="p-3.5 bg-[#F5F5F3] dark:bg-[#1A1A18] border border-[#E2E2DE] dark:border-[#262624] rounded-lg flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded bg-white dark:bg-[#111111] border border-[#E2E2DE] dark:border-[#262624] flex items-center justify-center shrink-0">
                      {file.type === 'pdf' ? (
                        <FileText className="w-5 h-5 text-red-500" />
                      ) : file.type === 'image' ? (
                        <Eye className="w-5 h-5 text-blue-500" />
                      ) : (
                        <FileCode2 className="w-5 h-5 text-emerald-500" />
                      )}
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
                    className="px-3 py-1.5 bg-[#111111] dark:bg-[#EBEBE8] text-white dark:text-[#111111] text-xs font-mono font-bold uppercase rounded hover:bg-neutral-800 dark:hover:bg-white flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t border-[#E2E2DE] dark:border-[#262624] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSkillCert(null)}
                className="px-4 py-2 text-xs font-bold uppercase rounded-lg border border-[#111111] dark:border-[#EBEBE8] text-[#111111] dark:text-[#EBEBE8] hover:bg-[#111111] hover:text-white dark:hover:bg-[#EBEBE8] dark:hover:text-[#111111] transition-colors"
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
