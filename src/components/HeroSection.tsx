import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText, Sparkles, Code2, Database } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const HeroSection: React.FC = () => {
  const { settings, openSecurityModal, setCursor, resetCursor } = usePortfolioStore();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[86vh] flex flex-col justify-between pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden tech-grid-bg border-b border-white/40 dark:border-white/10"
    >
      {/* Subtle ambient luminous glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-r from-[#E54835]/8 via-transparent to-[#E54835]/4 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Content Area: Left Text, Right Image */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center my-auto">
        {/* Left Column: Massive Editorial Typography */}
        <div className="md:col-span-7 flex flex-col justify-center">
          {/* Eyebrow / Kicker in Glass Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 w-fit mb-4 text-[11px] font-mono tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] uppercase glass-pill rounded-none"
          >
            <span className="w-2 h-2 rounded-none bg-[#E54835] inline-block animate-pulse shrink-0" />
            <span className="truncate">{settings.status_badge || 'Actively Modeling & Delivering Projects | Open to Data Analyst Roles'}</span>
          </motion.div>

          {/* Role Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="overflow-hidden mb-2"
          >
            <h2 className="text-xs sm:text-sm font-mono tracking-widest text-[#E54835] uppercase font-bold flex items-center gap-2">
              <Database className="w-4 h-4 text-[#E54835]" />
              <span>DATA ANALYST</span>
            </h2>
          </motion.div>

          {/* Name Display */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase leading-[0.95] mb-5"
            style={{ textWrap: 'balance' }}
          >
            GOWTHAM <br />
            <span>PANDIYAN</span>
          </motion.h1>

          {/* Supporting Statement showing active building */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-sm sm:text-base text-[#6B6B67] dark:text-[#9E9E9A] max-w-xl font-normal leading-relaxed mb-8 tracking-normal"
          >
            Specializing in relational SQL data warehousing, business intelligence modeling, and executive Power BI dashboards.{' '}
            <span className="text-[#E54835] font-semibold">
              SQL Pipelines / Star Schemas / Power BI / Statistical Modeling.
            </span>
          </motion.p>

          {/* Action CTAs - Unified Black & White Buttons with Radius 0 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3.5"
          >
            {/* Primary Action Button */}
            <button
              onClick={scrollToWork}
              onMouseEnter={() => setCursor({ label: 'WORK', type: 'explore' })}
              onMouseLeave={resetCursor}
              className="px-6 py-3.5 bg-[#111111] dark:bg-[#EBEBE8] text-[#FFFFFF] dark:text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-white transition-all duration-200 flex items-center gap-2 group rounded-none shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary Action: Contact */}
            <button
              onClick={scrollToContact}
              onMouseEnter={() => setCursor({ label: 'CONTACT', type: 'contact' })}
              onMouseLeave={resetCursor}
              className="glass-btn px-5 py-3.5 text-[#111111] dark:text-[#EBEBE8] text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get in Touch</span>
            </button>

            {/* Tertiary Action: Resume */}
            <button
              onClick={() => window.print()}
              onMouseEnter={() => setCursor({ label: 'RESUME', type: 'open' })}
              onMouseLeave={resetCursor}
              className="glass-btn px-4.5 py-3.5 text-[#111111] dark:text-[#EBEBE8] text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </motion.div>

          {/* Quick Technical Highlights - Frosted Glass Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 p-3.5 glass-panel rounded-none shadow-xs flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]"
          >
            <span>SQL Data Modeling</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>Power BI Intelligence</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>Python &amp; Pandas</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>Advanced DAX</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>ETL Pipelines</span>
          </motion.div>
        </div>

        {/* Right Column: Hero Section Image on Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 relative w-full flex justify-center md:justify-end"
        >
          <div
            onMouseEnter={() => setCursor({ label: 'VIEW', type: 'view' })}
            onMouseLeave={resetCursor}
            className="relative group mx-auto md:ml-auto max-w-[290px] sm:max-w-[330px] md:max-w-[350px] lg:max-w-[390px] w-full overflow-hidden glass-panel-deep p-2.5 transition-all duration-500 rounded-none shadow-xl hover:border-[#E54835]/50"
          >
            {/* The Portrait Image */}
            <img
              src="/src/assets/images/gowtham_portrait_1790451073382.jpg"
              alt="Gowtham Pandiyan - Data Analyst"
              className="w-full aspect-[3/4] object-cover object-top grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              loading="eager"
            />

            {/* Corner Technical Frame Markings - Frosted Glass */}
            <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-white/95 bg-black/60 backdrop-blur-md border border-white/20 px-2 py-0.5 pointer-events-none flex items-center gap-1.5 rounded-none shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E54835] group-hover:animate-ping" />
              <span>GP // DATA ANALYTICS</span>
            </div>
            <div className="absolute bottom-4 right-4 text-[9px] font-mono tracking-widest text-white/95 bg-black/60 backdrop-blur-md border border-white/20 px-2 py-0.5 pointer-events-none rounded-none shadow-xs">
              CHENNAI / TN
            </div>

            {/* Live Telemetry Reveal Tag */}
            <div className="absolute bottom-4 left-4 text-[8px] font-mono tracking-widest text-white bg-black/75 backdrop-blur-md border border-white/25 px-2 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none shadow-xs">
              ANALYST // DATA &amp; BI MODELING
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex items-center justify-between text-xs text-[#6B6B67] dark:text-[#9E9E9A]">
        <button
          onClick={scrollToAbout}
          className="flex items-center gap-2 hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors focus:outline-none group"
        >
          <span className="font-mono uppercase tracking-widest text-[10px]">Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#111111] dark:text-[#EBEBE8]" />
        </button>

        <div className="font-mono text-[10px] tabular-nums">
          LOC: 13.0827° N, 80.2707° E
        </div>
      </div>
    </section>
  );
};
