import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-28 relative overflow-hidden tech-grid-bg bg-[#F5F5F3] dark:bg-[#0D0D0D]">
      {/* Animated Subtle Pulse Ambient Backdrop */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-black dark:bg-white blur-[140px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full text-center p-8 md:p-12 bg-white dark:bg-[#141412] backdrop-blur-md border border-[#E2E2DE] dark:border-[#262624] rounded-2xl shadow-xl"
      >
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111] dark:text-[#EBEBE8] mb-4 font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>HTTP 404 // ROUTE NOT FOUND</span>
        </div>

        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-7xl sm:text-9xl font-black tracking-tighter text-[#111111] dark:text-[#EBEBE8] uppercase mb-4"
        >
          404
        </motion.h1>

        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111111] dark:text-[#EBEBE8] mb-3">
          Signal Disconnected
        </h2>

        <p className="text-sm text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed mb-8">
          The requested system node or technical document does not exist or has been relocated to another sector.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home Base</span>
        </Link>
      </motion.div>
    </div>
  );
};
