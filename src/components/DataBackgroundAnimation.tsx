import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  type: 'node' | 'diamond' | 'beacon' | 'square' | 'table_cell';
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

    // Generate balanced data particles
    const particleCount = Math.min(Math.floor((width * height) / 26000), 38);
    const particles: Particle[] = [];

    const types: ('node' | 'diamond' | 'beacon' | 'square' | 'table_cell')[] = [
      'node',
      'diamond',
      'beacon',
      'square',
      'table_cell',
    ];

    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() - 0.5) * 0.38;
      const vy = (Math.random() - 0.5) * 0.38;
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
        pulseSpeed: 0.015 + Math.random() * 0.025,
        alpha: 0.3 + Math.random() * 0.35,
        trail: [],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
      const nodeColor = isDark ? 'rgba(235, 235, 232, ' : 'rgba(25, 25, 25, ';
      const accentColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(20, 20, 20, ';
      const lineColor = isDark ? 'rgba(235, 235, 232, ' : 'rgba(60, 60, 60, ';

      // 1. Connection lines between nearby data nodes
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const proximity = 1 - dist / maxDistance;
            const lineAlpha = proximity * (isDark ? 0.11 : 0.07);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor + lineAlpha + ')';
            ctx.lineWidth = proximity > 0.65 ? 1 : 0.6;
            ctx.stroke();
          }
        }
      }

      // 2. Interactive Cursor Laser Beams to nearest nodes
      if (isMouseOver && mouseX > 0 && mouseY > 0) {
        const cursorMaxDist = 180;
        let connectedCount = 0;

        for (let i = 0; i < particles.length && connectedCount < 5; i++) {
          const dx = mouseX - particles[i].x;
          const dy = mouseY - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < cursorMaxDist) {
            connectedCount++;
            const intensity = 1 - dist / cursorMaxDist;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.strokeStyle = accentColor + (intensity * 0.2) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Small crosshair indicator
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.strokeStyle = accentColor + '0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Update & render data particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.trail.unshift({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > 6) {
          p.trail.pop();
        }

        if (p.trail.length > 1) {
          for (let t = 0; t < p.trail.length - 1; t++) {
            const pt = p.trail[t];
            const nextPt = p.trail[t + 1];
            const trailRatio = 1 - t / p.trail.length;
            const trailAlpha = pt.alpha * trailRatio * (isDark ? 0.14 : 0.08);

            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.strokeStyle = (p.type === 'beacon' || i % 4 === 0 ? accentColor : nodeColor) + trailAlpha + ')';
            ctx.lineWidth = Math.max(0.6, p.radius * trailRatio * 0.7);
            ctx.stroke();
          }
        }

        // Mouse physics
        if (isMouseOver && mouseX > 0 && mouseY > 0) {
          const mdx = mouseX - p.x;
          const mdy = mouseY - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const influenceRadius = 200;

          if (mDist < influenceRadius && mDist > 0) {
            if (mDist < 55) {
              const repelForce = ((55 - mDist) / 55) * 0.8;
              p.vx -= (mdx / mDist) * repelForce;
              p.vy -= (mdy / mDist) * repelForce;
            } else {
              const pullForce = ((influenceRadius - mDist) / influenceRadius) * 0.3;
              p.vx += (mdx / mDist) * pullForce;
              p.vy += (mdy / mDist) * pullForce;
            }
          }
        }

        p.vx = p.vx * 0.97 + p.baseVx * 0.03;
        p.vy = p.vy * 0.97 + p.baseVy * 0.03;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) {
          p.x = width + 20;
          p.trail = [];
        }
        if (p.x > width + 20) {
          p.x = -20;
          p.trail = [];
        }
        if (p.y < -20) {
          p.y = height + 20;
          p.trail = [];
        }
        if (p.y > height + 20) {
          p.y = -20;
          p.trail = [];
        }

        p.pulseAngle += p.pulseSpeed;
        const pulse = Math.sin(p.pulseAngle) * 0.5 + 0.5;

        if (p.type === 'beacon') {
          const pingRadius = p.radius + pulse * 12;
          const pingAlpha = (1 - pulse) * (isDark ? 0.25 : 0.14);

          ctx.beginPath();
          ctx.arc(p.x, p.y, pingRadius, 0, Math.PI * 2);
          ctx.strokeStyle = accentColor + pingAlpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = accentColor + (p.alpha * (isDark ? 0.85 : 0.7)) + ')';
          ctx.fill();
        } else if (p.type === 'diamond') {
          const size = p.radius * 2.2;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 4);
          ctx.strokeStyle = nodeColor + (p.alpha * (isDark ? 0.4 : 0.25)) + ')';
          ctx.lineWidth = 1;
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          ctx.restore();
        } else if (p.type === 'table_cell') {
          const sizeW = p.radius * 3.5;
          const sizeH = p.radius * 1.8;
          ctx.strokeStyle = nodeColor + (p.alpha * (isDark ? 0.35 : 0.22)) + ')';
          ctx.strokeRect(p.x - sizeW / 2, p.y - sizeH / 2, sizeW, sizeH);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = (i % 5 === 0 ? accentColor : nodeColor) + (p.alpha * (isDark ? 0.6 : 0.4)) + ')';
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

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. HTML5 Canvas Data Graph Network with Trails */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 2. Floating Ambient Data Analyst + Vibe Coding Dynamic Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Element 1: SQL Analytical Query Chip */}
        <motion.div
          initial={{ x: '8vw', y: '18vh', opacity: 0 }}
          animate={{
            x: ['8vw', '11vw', '7vw', '8vw'],
            y: ['18vh', '15vh', '21vh', '18vh'],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D9D9D5]/70 dark:border-[#262624]/80 bg-white/45 dark:bg-[#141412]/45 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#737373] dark:text-[#9E9E9A]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white animate-pulse" />
          <span className="text-[#111111] dark:text-white font-bold">SQL</span>
          <span>SELECT id, vibe_score, kpi FROM analytics.dw WHERE status = 'active';</span>
        </motion.div>

        {/* Element 2: Vibe Coding Script / Syntax Snippet */}
        <motion.div
          initial={{ x: '72vw', y: '24vh', opacity: 0 }}
          animate={{
            x: ['72vw', '70vw', '74vw', '72vw'],
            y: ['24vh', '28vh', '22vh', '24vh'],
            opacity: [0.28, 0.42, 0.28],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D9D9D5]/70 dark:border-[#262624]/80 bg-white/45 dark:bg-[#141412]/45 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#737373] dark:text-[#9E9E9A]"
        >
          <span className="text-[#111111] dark:text-white font-bold">VIBE</span>
          <span>const app = await vibeEngine.ship(pipeline);</span>
        </motion.div>

        {/* Element 3: Live Mini Dynamic Data Bar Chart */}
        <motion.div
          initial={{ x: '82vw', y: '64vh', opacity: 0 }}
          animate={{
            x: ['82vw', '84vw', '80vw', '82vw'],
            y: ['64vh', '60vh', '67vh', '64vh'],
            opacity: [0.3, 0.48, 0.3],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-lg border border-[#D9D9D5]/70 dark:border-[#262624]/80 bg-white/45 dark:bg-[#141412]/45 backdrop-blur-[2px]"
        >
          <div className="flex items-end gap-1 h-5 w-12">
            <motion.div
              animate={{ height: ['40%', '85%', '50%', '40%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 bg-[#111111] dark:bg-white rounded-t-sm"
            />
            <motion.div
              animate={{ height: ['70%', '45%', '90%', '70%'] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="w-2 bg-[#737373] dark:bg-[#9E9E9A] rounded-t-sm"
            />
            <motion.div
              animate={{ height: ['30%', '95%', '60%', '30%'] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="w-2 bg-neutral-400 dark:bg-neutral-600 rounded-t-sm"
            />
            <motion.div
              animate={{ height: ['80%', '60%', '75%', '80%'] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="w-2 bg-[#111111] dark:bg-[#EBEBE8] rounded-t-sm"
            />
          </div>
          <span className="font-mono text-[9px] text-[#737373] dark:text-[#9E9E9A] tracking-wider">
            DAX // R² = 0.984
          </span>
        </motion.div>

        {/* Element 4: Data Manipulation & CSV/JSON Parser Pipeline Chip */}
        <motion.div
          initial={{ x: '12vw', y: '74vh', opacity: 0 }}
          animate={{
            x: ['12vw', '15vw', '10vw', '12vw'],
            y: ['74vh', '78vh', '71vh', '74vh'],
            opacity: [0.25, 0.42, 0.25],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="absolute hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D9D9D5]/70 dark:border-[#262624]/80 bg-white/45 dark:bg-[#141412]/45 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#737373] dark:text-[#9E9E9A]"
        >
          <span className="text-[#111111] dark:text-white font-bold">CSV.parse</span>
          <span className="text-[#D9D9D5] dark:text-[#333330]">→</span>
          <span>{'{ parsed_records: 25400, null_count: 0 }'}</span>
        </motion.div>

        {/* Element 5: Relational Data Table Element */}
        <motion.div
          initial={{ x: '42vw', y: '86vh', opacity: 0 }}
          animate={{
            x: ['42vw', '40vw', '45vw', '42vw'],
            y: ['86vh', '83vh', '88vh', '86vh'],
            opacity: [0.22, 0.38, 0.22],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1 rounded border border-[#D9D9D5]/70 dark:border-[#262624]/80 bg-white/40 dark:bg-[#141412]/40 backdrop-blur-[2px] font-mono text-[9px] text-[#737373] dark:text-[#9E9E9A]"
        >
          <span className="text-[#111111] dark:text-white font-semibold">TABLE:</span>
          <span>models | accuracy | latency | status</span>
        </motion.div>

        {/* Element 6: REST API Endpoint & Dashboard Stream */}
        <motion.div
          initial={{ x: '68vw', y: '10vh', opacity: 0 }}
          animate={{
            x: ['68vw', '70vw', '66vw', '68vw'],
            y: ['10vh', '13vh', '8vh', '10vh'],
            opacity: [0.25, 0.42, 0.25],
          }}
          transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D9D9D5]/70 dark:border-[#262624]/80 bg-white/45 dark:bg-[#141412]/45 backdrop-blur-[2px] font-mono text-[10px] tracking-wider text-[#737373] dark:text-[#9E9E9A]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[#111111] dark:text-white font-bold">GET</span>
          <span>/api/v1/telemetry // 200 OK (14ms)</span>
        </motion.div>
      </div>

      {/* 3. Subtle Ambient Light Orb drifting across viewport */}
      <motion.div
        animate={{
          x: ['0vw', '12vw', '-8vw', '0vw'],
          y: ['0vh', '18vh', '-8vh', '0vh'],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/3 w-[520px] h-[520px] bg-neutral-400/5 dark:bg-white/5 blur-[150px] rounded-full pointer-events-none"
      />
    </div>
  );
};
