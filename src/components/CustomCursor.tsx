import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const CustomCursor: React.FC = () => {
  const { cursor } = usePortfolioStore();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setIsPointerDevice(true);

    const updatePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  if (!isPointerDevice) return null;

  const isExpanded = cursor.active && Boolean(cursor.label);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follower Ring / Pill */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full text-[11px] font-semibold tracking-wider transition-colors duration-150"
        style={{
          transform: 'translate(-50%, -50%)',
          backgroundColor: isExpanded ? '#111111' : 'transparent',
          borderColor: isExpanded ? '#111111' : 'rgba(100, 100, 100, 0.45)',
          borderWidth: isExpanded ? '0px' : '1.5px',
          color: '#FFFFFF',
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isExpanded ? 80 : 36,
          height: isExpanded ? 80 : 36,
          opacity: mousePosition.x > 0 ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
          mass: 0.5,
        }}
      >
        {isExpanded && (
          <span className="select-none tracking-widest text-white uppercase text-[10px]">
            {cursor.label}
          </span>
        )}
      </motion.div>

      {/* Center Precision Dot */}
      {!isExpanded && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            opacity: mousePosition.x > 0 ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 700,
          }}
        />
      )}
    </div>
  );
};
