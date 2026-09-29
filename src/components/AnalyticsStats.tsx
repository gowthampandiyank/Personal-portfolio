import React from 'react';
import { motion } from 'framer-motion';
import { Database, Workflow, BarChart3, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

interface MetricCard {
  title: string;
  metric: string;
  category: string;
  description: string;
  telemetry: string;
  icon: React.ElementType;
  benchmark: string;
}

export const AnalyticsStats: React.FC = () => {
  const metrics: MetricCard[] = [
    {
      title: 'SQL Queries Executed',
      metric: '12,500+',
      category: 'Data Warehousing & Optimization',
      description: 'Crafted, tuned, and executed high-performance SQL queries, multi-level CTEs, and analytical window functions across PostgreSQL and enterprise warehouses.',
      telemetry: 'PostgreSQL · Snowflake · BigQuery',
      icon: Database,
      benchmark: '4.2x Query Acceleration',
    },
    {
      title: 'Reports Automated',
      metric: '140+',
      category: 'ETL & Scheduled Workflows',
      description: 'Eliminated redundant manual operational reporting through automated Power Query transformation pipelines, scheduled gateway refreshes, and Python data scripts.',
      telemetry: 'Power Query · Python ETL · REST APIs',
      icon: Workflow,
      benchmark: '35+ Hours / Week Saved',
    },
    {
      title: 'Dashboards Built',
      metric: '45+',
      category: 'Business Intelligence & DAX',
      description: 'Delivered production-grade interactive Power BI and Tableau intelligence platforms with custom DAX calculation groups, scenario what-if modeling, and drill-throughs.',
      telemetry: 'Power BI Service · DAX · Tableau',
      icon: BarChart3,
      benchmark: '99.9% Model Accuracy',
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F5F5F3] dark:bg-[#0A0A0A] border-b border-[#E2E2DE] dark:border-[#262624] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E2E2DE] dark:border-[#262624]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#E54835] uppercase mb-2 block font-bold">
              Quantitative Impact &amp; Delivery
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase">
              Analytics Stats
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-sm md:text-right">
            Measurable data modeling milestones and automated enterprise telemetry.
          </p>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2E2DE] dark:bg-[#262624] border border-[#E2E2DE] dark:border-[#262624] rounded-none overflow-hidden shadow-sm">
          {metrics.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 md:p-10 bg-white dark:bg-[#0D0D0D] hover:bg-[#FBFBF9] dark:hover:bg-[#141412] transition-colors duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-none bg-[#E54835]/10 border border-[#E54835]/20 flex items-center justify-center text-[#E54835]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border border-[#D9D9D5] dark:border-[#262624] text-[#6B6B67] dark:text-[#9E9E9A] rounded-none bg-neutral-50 dark:bg-[#141412]">
                      0{index + 1} // METRIC
                    </span>
                  </div>

                  {/* Primary Metric Number */}
                  <div className="mb-2">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] font-mono">
                      {item.metric}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-lg font-bold text-[#111111] dark:text-[#EBEBE8] uppercase tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#E54835] font-semibold mb-4">
                    {item.category}
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-sm text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Telemetry & Benchmark Footer */}
                <div className="pt-4 border-t border-[#E2E2DE] dark:border-[#262624] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#6B6B67] dark:text-[#9E9E9A] flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#E54835]" />
                      Benchmark
                    </span>
                    <span className="font-semibold text-[#111111] dark:text-[#EBEBE8]">
                      {item.benchmark}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#8B8B86] dark:text-[#7A7A75] truncate">
                    Stack: {item.telemetry}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Supporting Precision Band */}
        <div className="mt-8 p-6 bg-white dark:bg-[#0D0D0D] border border-[#E2E2DE] dark:border-[#262624] rounded-none flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Continuous Daily Automated Refreshes &amp; Schema Validation Active</span>
          </div>
          <div className="flex items-center gap-8">
            <div>
              <span className="text-[#111111] dark:text-[#EBEBE8] font-bold">3.2M+</span> Total Rows Modeled
            </div>
            <div className="hidden sm:block">
              <span className="text-[#111111] dark:text-[#EBEBE8] font-bold">&lt; 1.4s</span> Average Report Latency
            </div>
            <div>
              <span className="text-emerald-500 font-bold">100%</span> Data Integrity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
