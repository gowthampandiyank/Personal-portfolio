import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoneData } from '../data/zones';
import { ArrowUpRight } from 'lucide-react';

interface InfoCardProps {
  zone: ZoneData;
  onAction: (action: string) => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({ zone, onAction }) => {
  return (
    <div className="fixed bottom-24 left-4 right-4 md:right-auto md:left-8 md:bottom-24 z-30 md:max-w-md pointer-events-auto">
      <div className="relative rounded-2xl bg-white/92 dark:bg-[#141414]/92 backdrop-blur-xl border border-black/8 dark:border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] p-5 md:p-6 transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {/* Top Badge & Telemetry */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-black/50 dark:text-white/50 border-b border-black/5 dark:border-white/8 pb-2.5">
              <span className="font-semibold text-black/80 dark:text-white/90">
                {zone.badge}
              </span>
              {zone.telemetry?.[0] && (
                <span className="hidden sm:inline-block">
                  {zone.telemetry[0].value}
                </span>
              )}
            </div>

            {/* Kicker & Title */}
            <div>
              <p className="text-[12px] font-mono uppercase tracking-wider text-[#E54835] font-semibold mb-1">
                {zone.kicker}
              </p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111111] dark:text-[#F2F2EE]">
                {zone.title}
              </h2>
            </div>

            {/* Description (2-3 lines) */}
            <p className="text-sm md:text-[13.5px] leading-relaxed text-[#555555] dark:text-[#A8A8A2] line-clamp-3">
              {zone.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              {zone.buttons.map((btn, idx) => {
                const isPrimary = btn.primary;
                return (
                  <button
                    key={`${zone.id}-btn-${idx}`}
                    onClick={() => onAction(btn.action)}
                    className={`group inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isPrimary
                        ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#E54835] dark:hover:bg-[#E54835] dark:hover:text-white shadow-sm hover:shadow'
                        : 'bg-black/5 dark:bg-white/8 text-[#222222] dark:text-[#EAEAEA] hover:bg-black/10 dark:hover:bg-white/15 border border-black/5 dark:border-white/10'
                    }`}
                  >
                    <span>{btn.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
