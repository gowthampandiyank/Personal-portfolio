import React from 'react';
import { motion } from 'framer-motion';
import { ZoneData } from '../data/zones';

interface StepNavProps {
  zones: ZoneData[];
  activeZoneId: number;
  onSelectZone: (zoneId: number) => void;
}

const STEP_LABELS: Record<number, string> = {
  1: 'Hero',
  2: 'Skills',
  3: 'About',
  4: 'Projects',
  5: 'Contact',
};

export const StepNav: React.FC<StepNavProps> = ({
  zones,
  activeZoneId,
  onSelectZone,
}) => {
  return (
    <nav
      aria-label="Zone navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
    >
      {/* Desktop & Tablet: Numbered capsule step tabs */}
      <div className="hidden sm:flex items-center gap-1 bg-white/90 dark:bg-[#141414]/90 backdrop-blur-xl border border-black/8 dark:border-white/12 rounded-full p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        {zones.map((zone) => {
          const isActive = zone.id === activeZoneId;
          const label = STEP_LABELS[zone.id] || zone.slug;

          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'text-white dark:text-[#111111]'
                  : 'text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeZonePill"
                  className="absolute inset-0 bg-[#111111] dark:bg-white rounded-full -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`text-[10px] ${isActive ? 'text-[#E54835] font-bold' : 'opacity-60'}`}>
                0{zone.id}
              </span>
              <span className="font-sans font-semibold capitalize">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile: Minimal dot indicators */}
      <div className="flex sm:hidden items-center gap-2 bg-white/90 dark:bg-[#141414]/90 backdrop-blur-xl border border-black/8 dark:border-white/12 rounded-full px-3.5 py-2 shadow-lg">
        {zones.map((zone) => {
          const isActive = zone.id === activeZoneId;
          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              aria-label={`Fly to Zone ${zone.id}`}
              className="p-1 cursor-pointer"
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-2 bg-[#111111] dark:bg-white'
                    : 'w-2 h-2 bg-black/25 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/60'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
