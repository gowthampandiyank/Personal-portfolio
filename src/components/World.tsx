import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZONES, ZoneData } from '../data/zones';
import { Scene1 } from './Scene1';
import { Scene2 } from './Scene2';
import { Scene3 } from './Scene3';
import { Scene4 } from './Scene4';
import { Scene5 } from './Scene5';
import { InfoCard } from './InfoCard';
import { StepNav } from './StepNav';
import { usePortfolioStore } from '../store/usePortfolioStore';
import {
  X,
  FileText,
  Mail,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3,
  Cpu,
  Layers,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorldProps {
  onNavigateRoute?: (route: string) => void;
}

export const World: React.FC<WorldProps> = () => {
  const {
    settings,
    skills,
    projects,
    experience,
    isAdminAuthenticated,
    theme,
    toggleTheme,
    submitMessage,
  } = usePortfolioStore();

  const [activeZoneId, setActiveZoneId] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Active Modals for zone interactions
  const [activeModal, setActiveModal] = useState<
    'skills' | 'about' | 'projects' | 'contact' | 'resume' | null
  >(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Contact form submission state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];

  // Camera settings per zone
  // We layout 5 zones across ~400vw x 300vh
  // Camera offsets translate the oversized canvas to focus on the active zone
  const getCameraTransform = useCallback((zoneId: number) => {
    switch (zoneId) {
      case 1:
        // Landscape & Runway (Hero)
        return { x: 0, y: 0, scale: 1.0, rotate: 0 };
      case 2:
        // Port & Cranes (Skills)
        return { x: -68, y: -18, scale: 1.15, rotate: -1.2 };
      case 3:
        // Corporate Towers (About)
        return { x: -140, y: -48, scale: 1.2, rotate: 1.0 };
      case 4:
        // Logistics Warehouse & Docks (Projects)
        return { x: -212, y: -88, scale: 1.18, rotate: -0.8 };
      case 5:
        // Warehouse Interior & Dispatch Hub (Contact)
        return { x: -284, y: -128, scale: 1.28, rotate: 0.6 };
      default:
        return { x: 0, y: 0, scale: 1.0, rotate: 0 };
    }
  }, []);

  const camera = getCameraTransform(activeZoneId);

  // Switch zone handler with motion blur flag
  const handleSelectZone = useCallback((zoneId: number) => {
    if (zoneId < 1 || zoneId > 5) return;
    setIsTransitioning(true);
    setActiveZoneId(zoneId);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, []);

  // Keyboard navigation: Arrow Down/Right = next, Arrow Up/Left = prev
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveZoneId((curr) => (curr < 5 ? curr + 1 : curr));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveZoneId((curr) => (curr > 1 ? curr - 1 : curr));
      } else if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Wheel scroll gesture navigation with debounce to trigger smooth camera glide
  const lastScrollTime = useRef<number>(0);
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // If modal is open, let user scroll the modal
      if (activeModal) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 650) return;

      if (Math.abs(e.deltaY) > 28 || Math.abs(e.deltaX) > 28) {
        if (e.deltaY > 0 || e.deltaX > 0) {
          if (activeZoneId < 5) {
            lastScrollTime.current = now;
            handleSelectZone(activeZoneId + 1);
          }
        } else {
          if (activeZoneId > 1) {
            lastScrollTime.current = now;
            handleSelectZone(activeZoneId - 1);
          }
        }
      }
    },
    [activeZoneId, activeModal, handleSelectZone]
  );

  // Touch swipe support for mobile/tablet
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (activeModal) return;
    if (touchStartY.current === null || touchStartX.current === null) return;

    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diffY) > 40 || Math.abs(diffX) > 40) {
      if (diffY > 0 || diffX > 0) {
        if (activeZoneId < 5) handleSelectZone(activeZoneId + 1);
      } else {
        if (activeZoneId > 1) handleSelectZone(activeZoneId - 1);
      }
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Button action router
  const handleAction = (action: string) => {
    if (action.startsWith('zone:')) {
      const zId = parseInt(action.replace('zone:', ''), 10);
      handleSelectZone(zId);
    } else if (action === 'modal:skills') {
      setActiveModal('skills');
    } else if (action === 'modal:about') {
      setActiveModal('about');
    } else if (action === 'modal:projects') {
      setActiveModal('projects');
    } else if (action === 'modal:contact') {
      setActiveModal('contact');
    } else if (action === 'action:resume') {
      setActiveModal('resume');
    } else if (action === 'action:email') {
      window.location.href = `mailto:${settings.email || 'gowthampandiyan7@gmail.com'}`;
    } else if (action === 'link:github') {
      window.open(settings.github || 'https://github.com/gowthampandiyank', '_blank');
    }
  };

  // Submit contact message to Supabase
  const handleSendContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactError('Please complete all required fields.');
      return;
    }

    setIsSubmittingContact(true);
    setContactError(null);

    try {
      const success = await submitMessage({
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject || 'Inquiry from Illustrated World',
        message: contactForm.message,
      });

      if (success) {
        setContactSuccess(true);
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setContactError('Failed to transmit message. Please try direct email.');
      }
    } catch {
      setContactError('Transmission error. Please try direct email.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden bg-[#F6F6F3] dark:bg-[#0E0E0E] text-[#111111] dark:text-[#E8E8E4] select-none transition-colors duration-500"
    >
      {/* =========================================================================
          FIXED UI OVER THE WORLD
          ========================================================================= */}

      {/* Top Left: Wordmark "Gowtham | The Analyst who codes" */}
      <header className="fixed top-6 left-6 md:left-8 z-40 pointer-events-auto flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm md:text-base tracking-tight text-[#111111] dark:text-white">
              Gowtham
            </span>
            <span className="text-black/30 dark:text-white/30 font-light text-sm">
              |
            </span>
            <span className="text-xs md:text-sm font-medium text-black/70 dark:text-white/70">
              The Analyst who codes
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#E54835] font-semibold tracking-wider uppercase mt-0.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>PORTFOLIO OS // ISOMETRIC WORLD</span>
          </div>
        </div>
      </header>

      {/* Top Right: Pill Buttons (Resume, Contact, Admin, Theme) */}
      <nav
        aria-label="Quick actions"
        className="fixed top-6 right-6 md:right-8 z-40 pointer-events-auto flex items-center gap-2"
      >
        {/* Resume Pill */}
        <button
          onClick={() => setActiveModal('resume')}
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/90 dark:bg-[#161616]/90 backdrop-blur-md border border-black/8 dark:border-white/12 shadow-sm text-[#222222] dark:text-white hover:border-[#E54835]/50 hover:text-[#E54835] dark:hover:text-[#E54835] transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-black/60 dark:text-white/60 group-hover:text-[#E54835] transition-colors" />
          <span>Resume</span>
        </button>

        {/* Contact Pill (Flies camera to Zone 5 or opens modal) */}
        <button
          onClick={() => handleSelectZone(5)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#E54835] dark:hover:bg-[#E54835] dark:hover:text-white shadow-sm transition-all cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact</span>
        </button>

        {/* Admin Link (Only if logged in / link to admin portal) */}
        {isAdminAuthenticated ? (
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        ) : (
          <Link
            to="/admin"
            className="inline-flex items-center justify-center p-2 rounded-full text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            title="Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
          </Link>
        )}

        {/* Light/Dark Mode Switcher */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full bg-white/90 dark:bg-[#161616]/90 backdrop-blur-md border border-black/8 dark:border-white/12 text-black/70 dark:text-white/70 hover:text-[#E54835] dark:hover:text-[#E54835] transition-colors shadow-sm cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>
      </nav>

      {/* Subtle Camera Flight Indicator / Coordinates HUD (Top Center) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md border border-black/5 dark:border-white/8 text-[11px] font-mono text-black/60 dark:text-white/60">
        <span className="text-[#E54835] font-bold">FLIGHT CAM</span>
        <span>•</span>
        <span>POS: [X: {camera.x}vw, Y: {camera.y}vh]</span>
        <span>•</span>
        <span>ZOOM: {camera.scale}x</span>
      </div>

      {/* =========================================================================
          THE OVERSIZED ISOMETRIC WORLD CANVAS (~400vw x 300vh)
          ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-auto">
        {/* PARALLAX LAYER 1: Deep Distant Background (Subtle contours & distant flight vectors) */}
        <motion.div
          animate={{
            x: `${camera.x * 0.25}vw`,
            y: `${camera.y * 0.25}vh`,
          }}
          transition={{
            type: 'spring',
            stiffness: 45,
            damping: 18,
            mass: 1,
          }}
          className="absolute -top-[50vh] -left-[50vw] w-[500vw] h-[400vh] pointer-events-none opacity-40 dark:opacity-20"
        >
          {/* Gentle background terrain contour lines */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="isoGridFine" width="60" height="35" patternUnits="userSpaceOnUse">
                <path d="M 0 17.5 L 30 0 L 60 17.5 L 30 35 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#isoGridFine)" />
          </svg>
        </motion.div>

        {/* PARALLAX LAYER 2: Main Isometric Illustrated World Canvas */}
        <motion.div
          animate={{
            x: `${camera.x}vw`,
            y: `${camera.y}vh`,
            scale: camera.scale,
            rotate: camera.rotate,
            filter: isTransitioning ? 'blur(1px)' : 'blur(0px)',
          }}
          transition={{
            type: 'spring',
            stiffness: 55,
            damping: 20,
            mass: 0.95,
          }}
          style={{ willChange: 'transform, filter' }}
          className="absolute top-0 left-0 w-[420vw] h-[280vh] origin-top-left"
        >
          {/* Continuous Map Terrain Mesh Base */}
          <div className="relative w-full h-full">
            {/* -------------------------------------------------------------
                ZONE 1: Landscape with winding road (Hero)
                Coordinates: (0vw to 100vw, 0vh to 100vh)
                ------------------------------------------------------------- */}
            <div className="absolute top-[8vh] left-[6vw] w-[90vw] h-[95vh] max-w-[1700px] max-h-[1100px]">
              <Scene1 />
            </div>

            {/* -------------------------------------------------------------
                ZONE 2: Port with cranes, ship, planes (Skills)
                Coordinates: (75vw to 175vw, 25vh to 125vh)
                ------------------------------------------------------------- */}
            <div className="absolute top-[28vh] left-[78vw] w-[92vw] h-[95vh] max-w-[1700px] max-h-[1100px]">
              <Scene2 onOpenSkills={() => setActiveModal('skills')} />
            </div>

            {/* -------------------------------------------------------------
                ZONE 3: Office towers (About & Career Journey)
                Coordinates: (150vw to 250vw, 55vh to 155vh)
                ------------------------------------------------------------- */}
            <div className="absolute top-[58vh] left-[150vw] w-[92vw] h-[95vh] max-w-[1700px] max-h-[1100px]">
              <Scene3 onOpenAbout={() => setActiveModal('about')} />
            </div>

            {/* -------------------------------------------------------------
                ZONE 4: Warehouse with trucks (Projects)
                Coordinates: (220vw to 320vw, 95vh to 195vh)
                ------------------------------------------------------------- */}
            <div className="absolute top-[98vh] left-[222vw] w-[92vw] h-[95vh] max-w-[1700px] max-h-[1100px]">
              <Scene4
                onSelectProject={(projId) => {
                  setSelectedProjectId(projId);
                  setActiveModal('projects');
                }}
              />
            </div>

            {/* -------------------------------------------------------------
                ZONE 5: Warehouse interior (Contact & Dispatch)
                Coordinates: (290vw to 390vw, 138vh to 238vh)
                ------------------------------------------------------------- */}
            <div className="absolute top-[138vh] left-[294vw] w-[92vw] h-[95vh] max-w-[1700px] max-h-[1100px]">
              <Scene5
                onOpenContact={() => setActiveModal('contact')}
                onOpenSocial={(type) => {
                  if (type === 'linkedin') {
                    window.open(settings.linkedin || 'https://www.linkedin.com/in/gowtham-pandiyan-kannan-a7474b304', '_blank');
                  } else if (type === 'github') {
                    window.open(settings.github || 'https://github.com/gowthampandiyank', '_blank');
                  } else {
                    window.location.href = `mailto:${settings.email || 'gowthampandiyan7@gmail.com'}`;
                  }
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* PARALLAX LAYER 3: Foreground Atmospheric Drift (Subtle cloud wisps & floating telemetry) */}
        <motion.div
          animate={{
            x: `${camera.x * 1.3}vw`,
            y: `${camera.y * 1.3}vh`,
          }}
          transition={{
            type: 'spring',
            stiffness: 65,
            damping: 22,
          }}
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
        >
          {/* Subtle slow drifting cloud elements */}
          <div className="absolute top-1/4 left-1/3 w-64 h-24 bg-white/40 dark:bg-white/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-2/3 left-2/3 w-80 h-32 bg-white/30 dark:bg-white/5 rounded-full blur-3xl animate-pulse" />
        </motion.div>
      </div>

      {/* =========================================================================
          FIXED BOTTOM UI: Floating InfoCard & StepNav
          ========================================================================= */}
      <InfoCard zone={activeZone} onAction={handleAction} />

      <StepNav
        zones={ZONES}
        activeZoneId={activeZoneId}
        onSelectZone={handleSelectZone}
      />

      {/* Helper Scroll / Key Indicator (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30 hidden md:flex items-center gap-2 text-[11px] font-mono text-black/40 dark:text-white/40 pointer-events-none">
        <span className="px-1.5 py-0.5 rounded border border-black/15 dark:border-white/15 bg-white/60 dark:bg-black/40">
          ↑ / ↓
        </span>
        <span>Scroll or Arrows to Fly</span>
      </div>

      {/* =========================================================================
          MODAL OVERLAYS (Skills, About, Projects, Contact, Resume)
          ========================================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/40 dark:bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#141414] border border-black/10 dark:border-white/12 shadow-[0_24px_64px_rgba(0,0,0,0.18)] p-6 md:p-10 text-[#111111] dark:text-[#E8E8E4]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* -------------------------------------------------------------
                  MODAL 1: SKILLS MATRIX (3-Column Architecture Grid)
                  ------------------------------------------------------------- */}
              {activeModal === 'skills' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-mono text-[#E54835] font-semibold uppercase tracking-wider">
                      ZONE 02 // LOGISTICS PORT TERMINAL
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-[#111111] dark:text-white">
                      Technical Skills Architecture
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                      Production-tested technical repertoire across database modeling, business intelligence, and automated pipelines.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                    {/* Column 1: Data Analytics & BI */}
                    <div className="rounded-2xl p-5 bg-[#F9F9F7] dark:bg-[#1A1A1A] border border-black/5 dark:border-white/8 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#111111] dark:text-white">
                        <BarChart3 className="w-4 h-4 text-[#E54835]" />
                        <h4>Data Analytics & BI</h4>
                      </div>
                      <div className="flex flex-col gap-2 pt-1">
                        {skills
                          .filter((s) => s.category.includes('BI') || s.category.includes('Analytics'))
                          .map((skill) => (
                            <div
                              key={skill.id}
                              className="px-3 py-2 rounded-xl bg-white dark:bg-[#222222] border border-black/5 dark:border-white/5 text-xs font-medium flex items-center justify-between"
                            >
                              <span>{skill.name}</span>
                              <span className="text-[10px] font-mono text-black/40 dark:text-white/40">
                                {skill.proficiency_level}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Column 2: SQL & Data Warehousing */}
                    <div className="rounded-2xl p-5 bg-[#F9F9F7] dark:bg-[#1A1A1A] border border-black/5 dark:border-white/8 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#111111] dark:text-white">
                        <Database className="w-4 h-4 text-[#06B6D4]" />
                        <h4>SQL & Warehousing</h4>
                      </div>
                      <div className="flex flex-col gap-2 pt-1">
                        {skills
                          .filter((s) => s.category.includes('SQL') || s.category.includes('Warehousing'))
                          .map((skill) => (
                            <div
                              key={skill.id}
                              className="px-3 py-2 rounded-xl bg-white dark:bg-[#222222] border border-black/5 dark:border-white/5 text-xs font-medium flex items-center justify-between"
                            >
                              <span>{skill.name}</span>
                              <span className="text-[10px] font-mono text-black/40 dark:text-white/40">
                                {skill.proficiency_level}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Column 3: Python & ETL Pipelines */}
                    <div className="rounded-2xl p-5 bg-[#F9F9F7] dark:bg-[#1A1A1A] border border-black/5 dark:border-white/8 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#111111] dark:text-white">
                        <Cpu className="w-4 h-4 text-[#10B981]" />
                        <h4>Python & ETL Pipelines</h4>
                      </div>
                      <div className="flex flex-col gap-2 pt-1">
                        {skills
                          .filter((s) => s.category.includes('Python') || s.category.includes('ETL') || s.category.includes('Modeling'))
                          .map((skill) => (
                            <div
                              key={skill.id}
                              className="px-3 py-2 rounded-xl bg-white dark:bg-[#222222] border border-black/5 dark:border-white/5 text-xs font-medium flex items-center justify-between"
                            >
                              <span>{skill.name}</span>
                              <span className="text-[10px] font-mono text-black/40 dark:text-white/40">
                                {skill.proficiency_level}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  MODAL 2: ABOUT & CAREER JOURNEY
                  ------------------------------------------------------------- */}
              {activeModal === 'about' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-mono text-[#E54835] font-semibold uppercase tracking-wider">
                      ZONE 03 // CORPORATE TOWERS & DISTRICT
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-[#111111] dark:text-white">
                      Career Trajectory & Philosophy
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                      From frontend software engineering into rigorous business intelligence and analytical modeling.
                    </p>
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed text-[#444444] dark:text-[#B0B0A8]">
                    <p>
                      {settings.bio ||
                        'Data Analyst based in Chennai specializing in business intelligence, SQL relational data modeling, automated ETL pipelines, and executive Power BI dashboards.'}
                    </p>
                    <p>
                      {settings.secondary_bio ||
                        'Bridging rigorous data architecture with strategic business insights — transforming raw, multi-source records into star-schema data warehouses, statistical predictive models, and high-impact visual decision platforms.'}
                    </p>
                  </div>

                  {/* Experience Timeline */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/8">
                    <h4 className="text-sm font-mono uppercase tracking-wider font-bold mb-4 text-[#111111] dark:text-white">
                      Production Experience & Roles
                    </h4>
                    <div className="space-y-4">
                      {experience.map((exp) => (
                        <div
                          key={exp.id}
                          className="rounded-2xl p-4 bg-[#F9F9F7] dark:bg-[#1A1A1A] border border-black/5 dark:border-white/8"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h5 className="font-bold text-sm text-[#111111] dark:text-white">
                              {exp.job_title} <span className="font-normal text-black/50 dark:text-white/50">at {exp.company}</span>
                            </h5>
                            <span className="text-xs font-mono text-[#E54835] font-semibold">
                              {exp.start_date} - {exp.end_date || 'Present'}
                            </span>
                          </div>
                          <p className="text-xs text-black/70 dark:text-white/70 mt-2">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  MODAL 3: PROJECTS WORKSTATIONS
                  ------------------------------------------------------------- */}
              {activeModal === 'projects' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-mono text-[#E54835] font-semibold uppercase tracking-wider">
                      ZONE 04 // LOGISTICS WAREHOUSE FLEET
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-[#111111] dark:text-white">
                      Featured Data Analytics Workstations
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                      Click any project workstation below to review the architecture, schemas, and live dashboards.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* The 4 core projects */}
                    {[
                      {
                        id: 'proj-lumio',
                        title: 'Lumio SaaS Telemetry Platform',
                        category: 'Executive BI & Telemetry',
                        desc: 'Automated executive metric platform monitoring recurring revenue, retention cohorts, and user activation velocity with live Power BI dashboarding.',
                        tech: ['Power BI', 'SQL', 'DAX', 'PostgreSQL'],
                        link: 'https://gowthampandiyank.github.io/portfolio/',
                      },
                      {
                        id: 'proj-shopiq',
                        title: 'ShopIQ SQL Commercial Case Study',
                        category: 'E-Commerce Database & RFM',
                        desc: 'Dimensional warehouse modeling 180k+ transactional sales logs. Engineered RFM customer value clustering and inventory stockout predictive views.',
                        tech: ['PostgreSQL', 'CTE Optimization', 'Data Modeling', 'Power Query'],
                        link: 'https://github.com/gowthampandiyank',
                      },
                      {
                        id: 'proj-cricket',
                        title: 'IPL / WPL Cricket Match Analytics',
                        category: 'Sports Telemetry Modeling',
                        desc: 'Time-series Python prediction engine calculating ball-by-ball win probabilities, strike-rate variance, and bowler economy clusters.',
                        tech: ['Python', 'Pandas', 'Seaborn', 'Power BI'],
                        link: 'https://github.com/gowthampandiyank',
                      },
                      {
                        id: 'proj-builder',
                        title: 'Portfolio Builder Pro',
                        category: 'Analytics Engineering Suite',
                        desc: 'End-to-end full-stack data showcase application with integrated Supabase authentication, live telemetry monitors, and dynamic reporting.',
                        tech: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
                        link: 'https://gowthampandiyank.github.io/portfolio/',
                      },
                    ].map((p) => {
                      const isHighlighted = selectedProjectId === p.id;
                      return (
                        <div
                          key={p.id}
                          className={`rounded-2xl p-5 transition-all duration-200 border flex flex-col justify-between gap-4 ${
                            isHighlighted
                              ? 'bg-white dark:bg-[#1F1F1F] border-[#E54835] shadow-md ring-2 ring-[#E54835]/20'
                              : 'bg-[#F9F9F7] dark:bg-[#1A1A1A] border-black/5 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-black/50 dark:text-white/50 mb-1">
                              <span className="text-[#E54835] font-semibold">{p.category}</span>
                            </div>
                            <h4 className="text-base font-bold text-[#111111] dark:text-white">
                              {p.title}
                            </h4>
                            <p className="text-xs text-black/70 dark:text-white/70 mt-2 leading-relaxed">
                              {p.desc}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                            <div className="flex flex-wrap gap-1.5">
                              {p.tech.map((t, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-md bg-white dark:bg-[#252525] text-[10px] font-mono text-black/70 dark:text-white/70 border border-black/5 dark:border-white/5"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-black/60 dark:text-white/60 hover:text-[#E54835] transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  MODAL 4: CONTACT TRANSMISSION CONSOLE
                  ------------------------------------------------------------- */}
              {activeModal === 'contact' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-mono text-[#E54835] font-semibold uppercase tracking-wider">
                      ZONE 05 // FULFILLMENT INTERIOR TRANSMISSION HUB
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-[#111111] dark:text-white">
                      Initiate Direct Transmission
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                      Send a project inquiry or consultation request directly to Supabase.
                    </p>
                  </div>

                  {contactSuccess ? (
                    <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                      <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                        Transmission Dispatched Successfully!
                      </h4>
                      <p className="text-xs text-black/60 dark:text-white/60 max-w-sm">
                        Thank you for reaching out. Your transmission has been logged to the portfolio telemetry backend. I will respond within 24 hours.
                      </p>
                      <button
                        onClick={() => setContactSuccess(false)}
                        className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#E54835] transition-colors"
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendContact} className="flex flex-col gap-4">
                      {contactError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          <span>{contactError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-semibold text-black/70 dark:text-white/70 mb-1">
                            YOUR NAME *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Alex Morgan"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#F8F8F5] dark:bg-[#1E1E1E] border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:border-[#E54835] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-semibold text-black/70 dark:text-white/70 mb-1">
                            EMAIL ADDRESS *
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#F8F8F5] dark:bg-[#1E1E1E] border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:border-[#E54835] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-black/70 dark:text-white/70 mb-1">
                          SUBJECT
                        </label>
                        <input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Data Analyst Opportunity / BI Consulting"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8F8F5] dark:bg-[#1E1E1E] border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:border-[#E54835] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-black/70 dark:text-white/70 mb-1">
                          MESSAGE *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Tell me about your analytics objectives, dimensional models, or dashboard requirements..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8F8F5] dark:bg-[#1E1E1E] border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:border-[#E54835] transition-colors"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-[11px] font-mono text-black/50 dark:text-white/50">
                          DIRECT: {settings.email || 'gowthampandiyan7@gmail.com'}
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmittingContact}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#E54835] dark:hover:bg-[#E54835] dark:hover:text-white transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingContact ? (
                            <span>Transmitting...</span>
                          ) : (
                            <>
                              <span>Transmit Message</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* -------------------------------------------------------------
                  MODAL 5: RESUME SUMMARY & DOWNLOAD
                  ------------------------------------------------------------- */}
              {activeModal === 'resume' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-mono text-[#E54835] font-semibold uppercase tracking-wider">
                      EXECUTIVE PROFILE CREDENTIALS
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-[#111111] dark:text-white">
                      Gowtham Pandiyan Kannan
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                      Data Analyst · SQL Relational Architect · Power BI & DAX Specialist · Chennai, TN
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#F8F8F5] dark:bg-[#1A1A1A] border border-black/5 dark:border-white/8">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#E54835] mb-2">
                        Core Competencies
                      </h4>
                      <ul className="text-xs space-y-1.5 text-black/70 dark:text-white/70">
                        <li>• Star Schema & Dimensional Relational Modeling</li>
                        <li>• Advanced SQL CTEs, Window Functions, Indexing</li>
                        <li>• Power BI Executive Dashboard Authoring & DAX</li>
                        <li>• Automated Python ETL Pipelines (Pandas & NumPy)</li>
                        <li>• Financial Revenue Variance & Attrition Analysis</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8F8F5] dark:bg-[#1A1A1A] border border-black/5 dark:border-white/8">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#E54835] mb-2">
                        Education & Location
                      </h4>
                      <ul className="text-xs space-y-1.5 text-black/70 dark:text-white/70">
                        <li>• Bachelor of Engineering (Computer Science)</li>
                        <li>• Base: Chennai, Tamil Nadu, India (Remote Open)</li>
                        <li>• Direct Email: {settings.email}</li>
                        <li>• LinkedIn: Gowtham Pandiyan Kannan</li>
                        <li>• Status: Open to Full-Time Data Analyst Roles</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/8">
                    <span className="text-xs font-mono text-black/50 dark:text-white/50">
                      DOCUMENT: GOWTHAM_PANDIYAN_DATA_ANALYST_RESUME.PDF
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={settings.linkedin || 'https://www.linkedin.com/in/gowtham-pandiyan-kannan-a7474b304'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                      <a
                        href={`mailto:${settings.email || 'gowthampandiyan7@gmail.com'}?subject=Requesting%20Gowtham%20Pandiyan%20Resume`}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#E54835] dark:hover:bg-[#E54835] dark:hover:text-white transition-colors"
                      >
                        Request PDF via Email
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
