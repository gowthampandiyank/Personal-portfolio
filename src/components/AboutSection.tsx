import React from 'react';
import { motion } from 'framer-motion';
import { Database, BarChart3, FileSpreadsheet, Filter, LineChart, TrendingUp } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { AboutSkeleton } from './skeletons/AboutSkeleton';

export const AboutSection: React.FC = () => {
  const { settings, isLoading } = usePortfolioStore();

  if (isLoading) {
    return <AboutSkeleton />;
  }

  const coreFocusAreas = [
    {
      title: 'SQL & Relational Data Warehouses',
      description: 'Engineering high-performance queries, multi-table aggregations, Star and Snowflake schemas, window functions, and automated ETL pipelines to derive actionable business metrics.',
      icon: Database,
    },
    {
      title: 'Business Intelligence & Power BI',
      description: 'Authoring executive-grade dashboards, sophisticated DAX calculations, KPI scenario what-if modeling, automated drill-through reports, and Power BI Service administration.',
      icon: BarChart3,
    },
    {
      title: 'Advanced Excel & Power Query',
      description: 'Transforming messy transactional records into verified tabular structures using advanced dynamic array formulas, M-code query scripts, statistical distributions, and validation rules.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Python Analytics & Automated ETL',
      description: 'Building automated data cleaning, transformation, and exploratory data analysis (EDA) scripts using Pandas, NumPy, Seaborn, and scheduled data ingestion pipelines.',
      icon: Filter,
    },
    {
      title: 'Data Storytelling & Executive Visuals',
      description: 'Translating complex statistical distributions into intuitive, human-centered visual stories that allow executive leadership to make decisive, high-confidence commercial moves.',
      icon: LineChart,
    },
    {
      title: 'Statistical Modeling & KPI Engineering',
      description: 'Developing cohort retention analysis, customer lifetime value (CLV) clustering, hypothesis validation, and strategic KPI scorecards for cross-functional decision-making.',
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="about"
      className="py-28 md:py-36 bg-[#F9F9F7]/95 dark:bg-[#0D0D0D]/95 backdrop-blur-[1px] border-b border-[#E2E2DE] dark:border-[#262624] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#E54835] uppercase mb-2 block font-bold">
              01. Profile &amp; Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase">
              About Gowtham
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-xs md:text-right">
            Where analytical rigor meets strategic business intelligence and predictive modeling.
          </p>
        </div>

        {/* Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
          <div className="lg:col-span-5">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#EBEBE8] leading-snug">
              Transforming complex data architectures into clear executive decisions and automated intelligence.
            </h3>
            <div className="mt-6 flex flex-col space-y-2 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#E54835]">Primary Discipline:</span>
                <span>Data Analytics &amp; Business Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#111111] dark:text-[#EBEBE8]">Location:</span>
                <span>{settings.location || 'Chennai, Tamil Nadu, India'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#111111] dark:text-[#EBEBE8]">Engagement:</span>
                <span>Actively Modeling &amp; Delivering Projects</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6 text-base text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed">
            <p className="text-lg text-[#111111] dark:text-[#EBEBE8] font-medium leading-relaxed">
              {settings.bio}
            </p>
            <p>
              {settings.secondary_bio}
            </p>
            <p>
              By combining rigorous statistical thinking with modern business intelligence platforms, Gowtham bridges the gap between deep transactional data warehouses and intuitive executive dashboards — delivering platforms that are both mathematically sound and commercially decisive.
            </p>
          </div>
        </div>

        {/* Technical Focus Grid - 3-column layout */}
        <div>
          <h4 className="text-xs font-mono tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] uppercase mb-6 font-bold">
            Core Technical Domains
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2E2DE] dark:bg-[#262624] border border-[#E2E2DE] dark:border-[#262624] rounded-none overflow-hidden shadow-sm">
            {coreFocusAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <div
                  key={area.title}
                  className="p-8 bg-[#FFFFFF] dark:bg-[#0D0D0D] hover:bg-[#F5F5F3] dark:hover:bg-[#141412] transition-colors duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-none bg-[#E54835]/10 border border-[#E54835]/20 flex items-center justify-center text-[#E54835] mb-5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-base text-[#111111] dark:text-[#EBEBE8] mb-2">
                      {area.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
