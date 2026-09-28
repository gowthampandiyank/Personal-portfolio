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
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 md:py-28 overflow-hidden tech-grid-bg border-b border-[#D9D9D5] dark:border-[#262624]"
    >
      {/* Subtle ambient luminous glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-200/50 dark:bg-neutral-800/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
        {/* Left Column: Massive Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow / Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-5 text-xs font-mono tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] uppercase"
          >
            <span className="w-2 h-2 rounded-none bg-[#E54835] inline-block animate-pulse" />
            <span>{settings.status_badge || 'Actively Building & Shipping Projects | Open to Data Analyst & Vibe Coding Roles'}</span>
          </motion.div>

          {/* Role Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden mb-2"
          >
            <h2 className="text-xs sm:text-sm font-mono tracking-widest text-[#E54835] uppercase font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#E54835]" />
              <span>DATA ANALYST &amp; VIBE CODER</span>
            </h2>
          </motion.div>

          {/* Name Display */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase leading-[0.95] mb-6"
            style={{ textWrap: 'balance' }}
          >
            GOWTHAM <br />
            <span>PANDIYAN</span>
          </motion.h1>

          {/* Supporting Statement showing active building */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-[#6B6B67] dark:text-[#9E9E9A] max-w-xl font-normal leading-relaxed mb-10 tracking-normal"
          >
            Actively building, shipping, and engineering high-impact vibe-coded projects and data analytics platforms.{' '}
            <span className="text-[#E54835] font-semibold">
              Data Analytics / Power BI / SQL Pipelines / Vibe Coding.
            </span>
          </motion.p>

          {/* Action CTAs - Unified Black & White Buttons with Radius 0 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary Action Button */}
            <button
              onClick={scrollToWork}
              onMouseEnter={() => setCursor({ label: 'WORK', type: 'explore' })}
              onMouseLeave={resetCursor}
              className="px-7 py-3.5 bg-[#111111] dark:bg-[#EBEBE8] text-[#FFFFFF] dark:text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-white transition-all duration-200 flex items-center gap-2 group rounded-none shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary Action: Contact */}
            <button
              onClick={scrollToContact}
              onMouseEnter={() => setCursor({ label: 'CONTACT', type: 'contact' })}
              onMouseLeave={resetCursor}
              className="px-6 py-3.5 border border-[#111111] dark:border-[#EBEBE8] text-[#111111] dark:text-[#EBEBE8] bg-transparent hover:bg-[#111111] hover:text-white dark:hover:bg-[#EBEBE8] dark:hover:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 rounded-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get in Touch</span>
            </button>

            {/* Tertiary Action: Resume */}
            <button
              onClick={() => window.print()}
              onMouseEnter={() => setCursor({ label: 'RESUME', type: 'open' })}
              onMouseLeave={resetCursor}
              className="px-5 py-3.5 border border-[#D9D9D5] dark:border-[#262624] text-[#111111] dark:text-[#EBEBE8] bg-transparent hover:border-[#111111] dark:hover:border-[#EBEBE8] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 rounded-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </motion.div>

          {/* Quick Technical Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-6 border-t border-[#E2E2DE] dark:border-[#262624] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]"
          >
            <span>SQL Data Modeling</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>Power BI Intelligence</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>Vibe Coding &amp; Prototyping</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>React &amp; TypeScript</span>
            <span aria-hidden="true" className="text-[#D9D9D5] dark:text-[#333330]">·</span>
            <span>REST APIs &amp; Datasets</span>
          </motion.div>
        </div>

        {/* Right Column: Parallax Portrait Image & Clean Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div
            onMouseEnter={() => setCursor({ label: 'VIEW', type: 'view' })}
            onMouseLeave={resetCursor}
            className="relative group mx-auto max-w-sm lg:max-w-none overflow-hidden bg-[#EAEAEA] dark:bg-[#1A1A18] border border-[#E2E2DE] dark:border-[#262624] hover:border-[#111111] dark:hover:border-white transition-colors duration-500 shadow-sm hover:shadow-xl rounded-none"
          >
            {/* The Portrait Image */}
            <img
              src="/src/assets/images/gowtham_portrait_1790451073382.jpg"
              alt="Gowtham Pandiyan - Data Analyst & Vibe Coder"
              className="w-full aspect-[3/4] object-cover object-top grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              loading="eager"
            />

            {/* Corner Technical Frame Markings */}
            <div className="absolute top-3 left-3 text-[9px] font-mono tracking-widest text-white/90 bg-black/80 px-2.5 py-1 pointer-events-none flex items-center gap-1.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:animate-ping" />
              <span>GP // DATA &amp; VIBE CODING</span>
            </div>
            <div className="absolute bottom-3 right-3 text-[9px] font-mono tracking-widest text-white/90 bg-black/80 px-2.5 py-1 pointer-events-none rounded">
              CHENNAI / TN
            </div>

            {/* Live Telemetry Reveal Tag */}
            <div className="absolute bottom-3 left-3 text-[8px] font-mono tracking-widest text-white bg-black/90 border border-white/20 px-2 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
              BUILDER // ACTUALLY SHIPPING
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-10 flex items-center justify-between text-xs text-[#6B6B67] dark:text-[#9E9E9A]">
        <button
          onClick={scrollToAbout}
          className="flex items-center gap-2 hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors focus:outline-none group"
        >
          <span className="font-mono uppercase tracking-widest text-[11px]">Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#111111] dark:text-[#EBEBE8]" />
        </button>

        <div className="font-mono text-[11px] tabular-nums">
          LOC: 13.0827° N, 80.2707° E
        </div>
      </div>
    </section>
  );
};
