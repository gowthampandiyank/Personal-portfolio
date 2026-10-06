import React from 'react';
import { motion } from 'framer-motion';
import { Database, Workflow, BarChart3, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { TrendArrow } from './TrendArrow';
import { ExportDataButton } from './ExportDataButton';

interface MetricCard {
  title: string;
  metric: string;
  category: string;
  description: string;
  telemetry: string;
  benchmark: string;
  icon: React.ElementType;
  trend: {
    direction: 'up' | 'down';
    value: string;
    period: string;
  };
}

export const AnalyticsStats: React.FC = () => {
  const metrics: MetricCard[] = [
    {
      title: 'SQL Queries Executed',
      metric: '12,500+',
      category: 'Data Warehousing & Optimization',
      description: 'Crafted, tuned, and executed high-performance SQL queries, multi-level CTEs, and window functions across PostgreSQL and enterprise warehouses.',
      telemetry: 'PostgreSQL · Snowflake · BigQuery',
      benchmark: '4.2x Query Acceleration',
      icon: Database,
      trend: {
        direction: 'up',
        value: '+34.2%',
        period: 'YoY Volume',
      },
    },
    {
      title: 'Reports Automated',
      metric: '140+',
      category: 'ETL & Scheduled Workflows',
      description: 'Eliminated redundant manual reporting through automated Power Query transformation pipelines, scheduled gateway refreshes, and Python data scripts.',
      telemetry: 'Power Query · Python ETL · REST APIs',
      benchmark: '35+ Hours / Week Saved',
      icon: Workflow,
      trend: {
        direction: 'up',
        value: '+48.0%',
        period: 'Automation Rate',
      },
    },
    {
      title: 'Dashboards Built',
      metric: '45+',
      category: 'Business Intelligence & DAX',
      description: 'Delivered production-grade interactive Power BI and Tableau intelligence platforms with custom DAX calculation groups, what-if modeling, and drill-throughs.',
      telemetry: 'Power BI Service · DAX · Tableau',
      benchmark: '99.9% Model Accuracy',
      icon: BarChart3,
      trend: {
        direction: 'up',
        value: '+62.5%',
        period: 'Executive Adoption',
      },
    },
    {
      title: 'Avg Query Latency',
      metric: '1.4s',
      category: 'Performance Tuning & Indexing',
      description: 'Reduced warehouse compute bottleneck and query duration through partitioning, cluster keys, normalized star schemas, and indexing optimizations.',
      telemetry: 'EXPLAIN ANALYZE · Star Schema · Indexes',
      benchmark: '-68.4% Execution Time',
      icon: Clock,
      trend: {
        direction: 'down',
        value: '-68.4%',
        period: 'Latency Reduction',
      },
    },
  ];

  // Staggered container and card variants for smooth cinematic motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.98,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // High-end cinematic curve matching site feel
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const footerBandVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="analytics-dashboard"
      className="py-20 md:py-24 bg-[#F5F5F3] dark:bg-[#0A0A0A] border-b border-[#E2E2DE] dark:border-[#262624] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Export Data Button */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E2E2DE] dark:border-[#262624] gap-6"
        >
          <div>
            <span className="text-xs font-mono tracking-widest text-[#10B981] uppercase mb-2 block font-bold">
              03. Quantitative Impact &amp; Delivery
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase">
              Analytics Stats &amp; Telemetry
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-xs md:text-right">
              Measurable data modeling milestones and automated enterprise telemetry.
            </p>
            {/* Consistent Export Data Feature Button */}
            <ExportDataButton
              isSummary={true}
              label="Export Data"
              variant="outline"
              size="md"
            />
          </div>
        </motion.div>

        {/* 4-Column Technical Grid Layout with Staggered Framer Motion Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2E2DE] dark:bg-[#262624] border border-[#E2E2DE] dark:border-[#262624] rounded-none overflow-hidden shadow-sm"
        >
          {metrics.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                }}
                className="p-6 md:p-8 bg-white dark:bg-[#0D0D0D] hover:bg-[#FBFBF9] dark:hover:bg-[#141412] transition-colors duration-200 flex flex-col justify-between group relative cursor-default"
              >
                <div>
                  {/* Top Bar: Icon, Category & Integrated SVG Trend Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-none bg-neutral-100 dark:bg-[#18181A] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[#111111] dark:text-white group-hover:border-[#10B981]/50 transition-colors">
                      <IconComponent className="w-5 h-5 text-[#10B981]" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Integrated Small SVG Trend Indicator */}
                      <TrendArrow
                        direction={item.trend.direction}
                        value={item.trend.value}
                      />
                      <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 border border-[#D9D9D5] dark:border-[#262624] text-[#6B6B67] dark:text-[#9E9E9A] rounded-none bg-neutral-50 dark:bg-[#141412]">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Primary Metric Number & Trend Context */}
                  <div className="mb-2 flex items-baseline justify-between gap-2">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] font-mono tabular-nums">
                      {item.metric}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B6B67] dark:text-[#9E9E9A] uppercase tracking-wider truncate">
                      {item.trend.period}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-base font-bold text-[#111111] dark:text-[#EBEBE8] uppercase tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <div className="text-[10px] font-mono text-[#10B981] font-semibold mb-3">
                    {item.category}
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Telemetry & Benchmark Footer */}
                <div className="pt-3 border-t border-[#E2E2DE] dark:border-[#262624] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#6B6B67] dark:text-[#9E9E9A] flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#10B981]" />
                      Benchmark
                    </span>
                    <span className="font-semibold text-[#111111] dark:text-[#EBEBE8]">
                      {item.benchmark}
                    </span>
                  </div>
                  <div className="text-[9.5px] font-mono text-[#8B8B86] dark:text-[#7A7A75] truncate">
                    Stack: {item.telemetry}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Global Supporting Precision Band */}
        <motion.div
          variants={footerBandVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="mt-8 p-5 bg-white dark:bg-[#0D0D0D] border border-[#E2E2DE] dark:border-[#262624] rounded-none flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>Continuous Daily Automated Refreshes &amp; Schema Validation Active</span>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[#111111] dark:text-[#EBEBE8] font-bold">3.2M+</span> Total Rows
              <TrendArrow direction="up" value="+115% YoY" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#111111] dark:text-[#EBEBE8] font-bold">&lt; 1.4s</span> Latency
              <TrendArrow direction="down" value="-68.4% time" />
            </div>
            <div>
              <span className="text-[#10B981] font-bold">100%</span> Data Integrity
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
