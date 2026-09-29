import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Table,
  BarChart3,
  TrendingUp,
  Filter,
  LineChart,
  FileSpreadsheet,
  Layers,
  Activity,
  Workflow,
  PieChart,
  Calculator,
  GitBranch,
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

interface ParticleTrailPoint {
  x: number;
  y: number;
  alpha: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  type: 'node' | 'diamond' | 'table_cell' | 'square';
  pulseAngle: number;
  pulseSpeed: number;
  alpha: number;
  trail: ParticleTrailPoint[];
}

export const DataBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = usePortfolioStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isMouseOver = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Balanced technical data graph network
    const particleCount = Math.min(Math.floor((width * height) / 26000), 38);
    const particles: Particle[] = [];

    const types: ('node' | 'diamond' | 'table_cell' | 'square')[] = [
      'node',
      'diamond',
      'table_cell',
      'square',
    ];

    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() - 0.5) * 0.35;
      const vy = (Math.random() - 0.5) * 0.35;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 2 + 1.2,
        type: types[i % types.length],
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.02,
        alpha: 0.25 + Math.random() * 0.35,
        trail: [],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
      const nodeColor = isDark ? '235, 235, 232' : '85, 85, 80';
      const accentColor = isDark ? '229, 72, 53' : '200, 50, 35';

      // 1. Technical connection lines between nearby data nodes
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const proximity = 1 - dist / maxDistance;
            const lineAlpha = proximity * (isDark ? 0.16 : 0.09);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${nodeColor}, ${lineAlpha})`;
            ctx.lineWidth = proximity > 0.7 ? 1 : 0.6;
            ctx.stroke();
          }
        }
      }

      // 2. Cursor connection reticle
      if (isMouseOver && mouseX > 0 && mouseY > 0) {
        const cursorMaxDist = 175;
        let connectedCount = 0;

        for (let i = 0; i < particles.length && connectedCount < 4; i++) {
          const dx = mouseX - particles[i].x;
          const dy = mouseY - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < cursorMaxDist) {
            connectedCount++;
            const intensity = 1 - dist / cursorMaxDist;

            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.strokeStyle = `rgba(${accentColor}, ${intensity * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accentColor}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Update & render data node markers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isMouseOver && mouseX > 0 && mouseY > 0) {
          const mdx = mouseX - p.x;
          const mdy = mouseY - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const influenceRadius = 180;

          if (mDist < influenceRadius && mDist > 0) {
            if (mDist < 50) {
              const repelForce = ((50 - mDist) / 50) * 0.6;
              p.vx -= (mdx / mDist) * repelForce;
              p.vy -= (mdy / mDist) * repelForce;
            } else {
              const pullForce = ((influenceRadius - mDist) / influenceRadius) * 0.2;
              p.vx += (mdx / mDist) * pullForce;
              p.vy += (mdy / mDist) * pullForce;
            }
          }
        }

        p.vx = p.vx * 0.98 + p.baseVx * 0.02;
        p.vy = p.vy * 0.98 + p.baseVy * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        p.pulseAngle += p.pulseSpeed;
        const pulse = Math.sin(p.pulseAngle) * 0.5 + 0.5;

        const pColor = i % 4 === 0 ? accentColor : nodeColor;
        const currentAlpha = p.alpha * (0.8 + pulse * 0.4) * (isDark ? 0.75 : 0.6);

        if (p.type === 'diamond') {
          const size = p.radius * 2.2;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 4);
          ctx.strokeStyle = `rgba(${pColor}, ${currentAlpha})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          ctx.restore();
        } else if (p.type === 'table_cell') {
          const sizeW = p.radius * 3.4;
          const sizeH = p.radius * 1.8;
          ctx.strokeStyle = `rgba(${pColor}, ${currentAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.strokeRect(p.x - sizeW / 2, p.y - sizeH / 2, sizeW, sizeH);
        } else if (p.type === 'square') {
          const size = p.radius * 1.8;
          ctx.fillStyle = `rgba(${pColor}, ${currentAlpha})`;
          ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pColor}, ${currentAlpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // Circumference for 14px radius circle: 2 * π * 14 ≈ 87.96
  const donutCircumference = 87.96;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. HTML5 Canvas Pure Data Graph Network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* 2. Floating Authentic Data Analyst Objects: Graphs, Donuts, Queries, Codes, Bars, Datas, Sheets, Icons, Logics */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        
        {/* ========================================================================= */}
        {/* DONUTS: Animated Circular Donut Charts */}
        {/* ========================================================================= */}
        
        {/* Donut 1: 78% Retention Cohort Donut */}
        <motion.div
          initial={{ x: '12vw', y: '18vh', opacity: 0 }}
          animate={{
            x: ['12vw', '15vw', '10vw', '12vw'],
            y: ['18vh', '14vh', '21vh', '18vh'],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute hidden md:flex items-center gap-3 px-3 py-2 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] shadow-xs"
        >
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background ring */}
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-neutral-200 dark:text-neutral-800"
              />
              {/* Foreground animated value arc (78%) */}
              <motion.circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#E54835"
                strokeWidth="3.2"
                strokeDasharray={donutCircumference}
                animate={{
                  strokeDashoffset: [
                    donutCircumference * (1 - 0.65),
                    donutCircumference * (1 - 0.78),
                    donutCircumference * (1 - 0.72),
                    donutCircumference * (1 - 0.78),
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                strokeLinecap="square"
              />
            </svg>
            <span className="absolute font-mono text-[8px] font-bold text-[#111111] dark:text-[#EBEBE8]">
              78%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#E54835] font-bold tracking-wider">
              DONUT // COHORT
            </span>
            <span className="font-mono text-[8px] text-[#6B6B67] dark:text-[#9E9E9A]">
              78% Retention Rate
            </span>
          </div>
        </motion.div>

        {/* Donut 2: 94.2% Model Accuracy Donut */}
        <motion.div
          initial={{ x: '72vw', y: '14vh', opacity: 0 }}
          animate={{
            x: ['72vw', '69vw', '75vw', '72vw'],
            y: ['14vh', '18vh', '11vh', '14vh'],
            opacity: [0.38, 0.62, 0.38],
          }}
          transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute hidden lg:flex items-center gap-3 px-3 py-2 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] shadow-xs"
        >
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-neutral-200 dark:text-neutral-800"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.2"
                strokeDasharray={donutCircumference}
                animate={{
                  strokeDashoffset: [
                    donutCircumference * (1 - 0.88),
                    donutCircumference * (1 - 0.94),
                    donutCircumference * (1 - 0.91),
                    donutCircumference * (1 - 0.94),
                  ],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                strokeLinecap="square"
              />
            </svg>
            <span className="absolute font-mono text-[8px] font-bold text-[#111111] dark:text-[#EBEBE8]">
              94%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#10B981] font-bold tracking-wider">
              DONUT // ACCURACY
            </span>
            <span className="font-mono text-[8px] text-[#6B6B67] dark:text-[#9E9E9A]">
              AUC-ROC: 0.942
            </span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* GRAPHS: Animated Line Charts & Sparklines */}
        {/* ========================================================================= */}

        {/* Graph 1: Mini Sparkline Trend Line with Glowing Dot */}
        <motion.div
          initial={{ x: '52vw', y: '30vh', opacity: 0 }}
          animate={{
            x: ['52vw', '55vw', '50vw', '52vw'],
            y: ['30vh', '27vh', '33vh', '30vh'],
            opacity: [0.35, 0.58, 0.35],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute hidden sm:flex items-center gap-3 px-3 py-2 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] shadow-xs"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-mono text-[9px] text-[#3B82F6] font-bold tracking-wider flex items-center gap-1">
                <LineChart className="w-3 h-3 text-[#3B82F6]" />
                TREND // 7D MA
              </span>
              <span className="font-mono text-[8px] text-emerald-600 dark:text-emerald-400 font-bold">
                +14.8%
              </span>
            </div>
            {/* SVG Sparkline Graph */}
            <div className="w-24 h-6 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 96 24">
                <motion.path
                  d="M 2 18 L 18 14 L 34 16 L 50 8 L 66 11 L 82 4 L 94 6"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{
                    d: [
                      "M 2 18 L 18 14 L 34 16 L 50 8 L 66 11 L 82 4 L 94 6",
                      "M 2 16 L 18 12 L 34 14 L 50 6 L 66 9 L 82 2 L 94 4",
                      "M 2 18 L 18 14 L 34 16 L 50 8 L 66 11 L 82 4 L 94 6",
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <circle cx="94" cy="6" r="2.5" fill="#3B82F6" className="animate-ping" />
                <circle cx="94" cy="6" r="2" fill="#3B82F6" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* BARS: Animated Multi-Column Bar Charts & Variance Meters */}
        {/* ========================================================================= */}

        {/* Bar Chart 1: Fluctuating DAX Metric Engine Columns */}
        <motion.div
          initial={{ x: '78vw', y: '68vh', opacity: 0 }}
          animate={{
            x: ['78vw', '80vw', '76vw', '78vw'],
            y: ['68vh', '64vh', '71vh', '68vh'],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute hidden sm:flex items-center gap-3 px-3 py-2 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] shadow-xs"
        >
          <div className="flex items-end gap-1 h-5 w-11">
            <motion.div
              animate={{ height: ['35%', '85%', '50%', '35%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 bg-[#E54835] rounded-none opacity-90"
            />
            <motion.div
              animate={{ height: ['65%', '45%', '90%', '65%'] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="w-2 bg-[#3B82F6] rounded-none opacity-90"
            />
            <motion.div
              animate={{ height: ['30%', '95%', '60%', '30%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="w-2 bg-[#10B981] rounded-none opacity-90"
            />
            <motion.div
              animate={{ height: ['75%', '55%', '80%', '75%'] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="w-2 bg-[#F59E0B] rounded-none opacity-90"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#111111] dark:text-[#EBEBE8] font-bold tracking-wider">
              BARS // DAX ENGINE
            </span>
            <span className="font-mono text-[8px] text-[#6B6B67] dark:text-[#9E9E9A]">
              R² = 0.984 · P-Val &lt; 0.001
            </span>
          </div>
        </motion.div>

        {/* Bar Chart 2: Target vs Actual Progress Bar */}
        <motion.div
          initial={{ x: '25vw', y: '88vh', opacity: 0 }}
          animate={{
            x: ['25vw', '22vw', '27vw', '25vw'],
            y: ['88vh', '85vh', '91vh', '88vh'],
            opacity: [0.32, 0.55, 0.32],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute hidden md:flex items-center gap-3 px-3 py-2 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] shadow-xs"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="font-mono text-[9px] text-[#F59E0B] font-bold tracking-wider">
                BAR // REVENUE VARIANCE
              </span>
              <span className="font-mono text-[8px] text-[#111111] dark:text-[#EBEBE8] font-bold">
                118.2%
              </span>
            </div>
            <div className="w-28 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-none overflow-hidden">
              <motion.div
                animate={{ width: ['70%', '100%', '85%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full bg-[#F59E0B] rounded-none"
              />
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SHEETS: Spreadsheet Formulas & Tabular Cells */}
        {/* ========================================================================= */}

        {/* Sheet 1: Excel XLOOKUP Sheet Formula */}
        <motion.div
          initial={{ x: '4vw', y: '52vh', opacity: 0 }}
          animate={{
            x: ['4vw', '7vw', '3vw', '4vw'],
            y: ['52vh', '48vh', '55vh', '52vh'],
            opacity: [0.35, 0.58, 0.35],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="absolute hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span className="font-bold text-[#10B981]">EXCEL //</span>
          <span>=XLOOKUP(A2, Dim_Customer[ID], Dim_Customer[Region], &quot;N/A&quot;)</span>
        </motion.div>

        {/* Sheet 2: Power Query / Excel SUMIFS Formula */}
        <motion.div
          initial={{ x: '58vw', y: '78vh', opacity: 0 }}
          animate={{
            x: ['58vw', '55vw', '61vw', '58vw'],
            y: ['78vh', '82vh', '75vh', '78vh'],
            opacity: [0.32, 0.52, 0.32],
          }}
          transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[9px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#059669] shrink-0" />
          <span className="font-bold text-[#059669]">SHEET //</span>
          <span>=SUMIFS(Fact_Sales[Net], Fact_Sales[Year], 2026, Fact_Sales[Region], &quot;APAC&quot;)</span>
        </motion.div>

        {/* ========================================================================= */}
        {/* QURYS (QUERIES): Real SQL Analytical Queries */}
        {/* ========================================================================= */}

        {/* Query 1: SQL Analytical Window Function */}
        <motion.div
          initial={{ x: '5vw', y: '16vh', opacity: 0 }}
          animate={{
            x: ['5vw', '8vw', '4vw', '5vw'],
            y: ['16vh', '13vh', '19vh', '16vh'],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <Database className="w-3.5 h-3.5 text-[#E54835] shrink-0" />
          <span className="font-bold text-[#E54835]">SQL //</span>
          <span>SELECT dept_id, AVG(salary) OVER(PARTITION BY dept_id) FROM dim_payroll;</span>
        </motion.div>

        {/* Query 2: SQL CTE Cohort Analysis */}
        <motion.div
          initial={{ x: '18vw', y: '38vh', opacity: 0 }}
          animate={{
            x: ['18vw', '15vw', '20vw', '18vw'],
            y: ['38vh', '42vh', '35vh', '38vh'],
            opacity: [0.3, 0.52, 0.3],
          }}
          transition={{ duration: 29, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          className="absolute hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[9px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <Table className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
          <span className="font-bold text-[#8B5CF6]">CTE //</span>
          <span>WITH cohort AS (SELECT user_id, DATE_TRUNC(&apos;month&apos;, order_date) AS m FROM orders)</span>
        </motion.div>

        {/* ========================================================================= */}
        {/* CODES: Python / Pandas & Power BI DAX Scripts */}
        {/* ========================================================================= */}

        {/* Code 1: Python / Pandas Groupby & Aggregation */}
        <motion.div
          initial={{ x: '68vw', y: '24vh', opacity: 0 }}
          animate={{
            x: ['68vw', '65vw', '70vw', '68vw'],
            y: ['24vh', '28vh', '21vh', '24vh'],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <Filter className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
          <span className="font-bold text-[#3B82F6]">PYTHON //</span>
          <span>df.groupby(&apos;segment&apos;).agg(churn=(&apos;churned&apos;,&apos;mean&apos;), ltv=(&apos;clv&apos;,&apos;median&apos;))</span>
        </motion.div>

        {/* Code 2: Power BI DAX KPI Calculation Measure */}
        <motion.div
          initial={{ x: '10vw', y: '72vh', opacity: 0 }}
          animate={{
            x: ['10vw', '13vw', '8vw', '10vw'],
            y: ['72vh', '76vh', '69vh', '72vh'],
            opacity: [0.32, 0.55, 0.32],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <TrendingUp className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
          <span className="font-bold text-[#F59E0B]">DAX //</span>
          <span>YoY_Growth = DIVIDE([Total Revenue] - [Prior Year Revenue], [Prior Year Revenue], 0)</span>
        </motion.div>

        {/* ========================================================================= */}
        {/* DATAS & SCHEMAS: Star Schema & Data Matrix Cells */}
        {/* ========================================================================= */}

        {/* Data 1: Relational Star Schema Topology */}
        <motion.div
          initial={{ x: '42vw', y: '84vh', opacity: 0 }}
          animate={{
            x: ['42vw', '39vw', '45vw', '42vw'],
            y: ['84vh', '81vh', '87vh', '84vh'],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[9px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <Layers className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span className="font-bold text-[#10B981]">STAR SCHEMA //</span>
          <span>FACT_SALES ⟕ DIM_CUSTOMER [cust_sk] ⟕ DIM_DATE [date_sk]</span>
        </motion.div>

        {/* Data 2: Mini Matrix Data Cells Grid */}
        <motion.div
          initial={{ x: '82vw', y: '42vh', opacity: 0 }}
          animate={{
            x: ['82vw', '84vw', '80vw', '82vw'],
            y: ['42vh', '38vh', '45vh', '42vh'],
            opacity: [0.28, 0.48, 0.28],
          }}
          transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="absolute hidden xl:flex flex-col p-2.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[8px] shadow-xs"
        >
          <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-[#E2E2DE] dark:border-[#262624] text-[#8B5CF6] font-bold">
            <Table className="w-3 h-3" />
            <span>DATA MATRIX [N=3.2M]</span>
          </div>
          <div className="grid grid-cols-3 gap-x-3 text-[#737373] dark:text-[#8E8E88]">
            <span className="font-bold text-[#111111] dark:text-[#EBEBE8]">CUST_ID</span>
            <span className="font-bold text-[#111111] dark:text-[#EBEBE8]">FREQ</span>
            <span className="font-bold text-[#111111] dark:text-[#EBEBE8]">LTV</span>
            <span>0x89A</span>
            <span>14</span>
            <span className="text-[#10B981]">$4,250</span>
            <span>0x91F</span>
            <span>28</span>
            <span className="text-[#10B981]">$8,920</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LOGIS (LOGICS & STATS): Statistical Logic & Hypothesis Models */}
        {/* ========================================================================= */}

        {/* Logic 1: Hypothesis Testing */}
        <motion.div
          initial={{ x: '35vw', y: '12vh', opacity: 0 }}
          animate={{
            x: ['35vw', '38vw', '33vw', '35vw'],
            y: ['12vh', '10vh', '15vh', '12vh'],
            opacity: [0.28, 0.48, 0.28],
          }}
          transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
          className="absolute hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[9px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <Calculator className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
          <span className="font-bold text-[#06B6D4]">STATS LOGIC //</span>
          <span>stats.ttest_ind(group_a, group_b) → p = 0.0034 &lt; α(0.05) [Reject Null]</span>
        </motion.div>

        {/* Logic 2: Z-Score & Normal Distribution Logic */}
        <motion.div
          initial={{ x: '48vw', y: '62vh', opacity: 0 }}
          animate={{
            x: ['48vw', '45vw', '51vw', '48vw'],
            y: ['62vh', '66vh', '58vh', '62vh'],
            opacity: [0.26, 0.46, 0.26],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2.7 }}
          className="absolute hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[9px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <TrendingUp className="w-3.5 h-3.5 text-[#E54835] shrink-0" />
          <span className="font-bold text-[#E54835]">NORMAL DIST //</span>
          <span>Z = (X - μ) / σ → Z = +2.48σ · Confidence Interval = 95%</span>
        </motion.div>

        {/* ========================================================================= */}
        {/* ICONS & WORKFLOW PIPELINES: Data Pipeline Telemetry */}
        {/* ========================================================================= */}

        {/* Workflow 1: ETL Pipeline Ingestion Telemetry */}
        <motion.div
          initial={{ x: '62vw', y: '8vh', opacity: 0 }}
          animate={{
            x: ['62vw', '64vw', '60vw', '62vw'],
            y: ['8vh', '11vh', '6vh', '8vh'],
            opacity: [0.32, 0.52, 0.32],
          }}
          transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[9px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <Activity className="w-3 h-3 text-[#10B981] animate-pulse shrink-0" />
          <span className="font-bold text-[#10B981]">ETL PIPELINE //</span>
          <span>PostgreSQL → Power BI Gateway: 1.48M rows · 0 errors</span>
        </motion.div>

        {/* Workflow 2: Automated Pipeline Sync with Workflow Icon */}
        <motion.div
          initial={{ x: '2vw', y: '30vh', opacity: 0 }}
          animate={{
            x: ['2vw', '4vw', '1vw', '2vw'],
            y: ['30vh', '34vh', '28vh', '30vh'],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#D9D9D5] dark:border-[#262624] bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[2px] font-mono text-[9px] tracking-wider text-[#4A4A46] dark:text-[#A0A09C] shadow-xs"
        >
          <Workflow className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
          <span className="font-bold text-[#3B82F6]">WORKFLOW //</span>
          <span>Scheduled Airflow DAG: ingest_dim_store · 100% Succeeded</span>
        </motion.div>

      </div>
    </div>
  );
};
