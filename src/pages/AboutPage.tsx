import React from 'react';
import { motion } from 'framer-motion';
import { AboutSection } from '../components/AboutSection';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Code2, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const AboutPage: React.FC = () => {
  const { settings } = usePortfolioStore();

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <AboutSection />

      {/* Extended Engineering Philosophy */}
      <section className="py-24 md:py-32 bg-[#F9F9F7] dark:bg-[#0A0A0A] border-b border-[#E2E2DE] dark:border-[#262624]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#111111] dark:text-[#EBEBE8] block mb-3 font-bold">
              Engineering &amp; Analytical Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#111111] dark:text-[#EBEBE8] mb-6">
              Analytical Rigor Meets High-Speed Vibe Coding
            </h2>
            <div className="space-y-5 text-base text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed">
              <p>
                In data analytics, numbers alone are inert without clear dimensional modeling and narrative context. By building automated SQL transformations, Star-schema relational cubes, and calculated DAX measures, Gowtham transforms chaotic datasets into reliable executive business intelligence.
              </p>
              <p>
                Paired with modern vibe-coding speed, ideas are translated directly into high-impact, responsive digital applications. Gowtham actively tests, validates, and deploys live projects with micro-interaction precision, resilient state machines, and clean typography.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#E2E2DE] dark:border-[#262624] flex items-center gap-6">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-xl shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Full Project Vault</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#EBEBE8] hover:underline transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
