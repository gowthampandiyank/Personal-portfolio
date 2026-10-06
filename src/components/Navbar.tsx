import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  Terminal,
  History,
  Briefcase,
  Mail,
  Sun,
  Moon,
  FileText,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Dynamic active section spy on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isHomePage) {
        // Updated scroll order: home -> about -> skills -> experience -> work -> contact
        const sections = ['home', 'about', 'skills', 'experience', 'work', 'contact'];
        const scrollPosition = window.scrollY + 240;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Section navigation links: Experience 4th, Projects 5th
  const navLinks = [
    { label: 'Home', icon: Home, num: '01', href: '/', sectionId: 'home' },
    { label: 'About', icon: User, num: '02', href: '/about', sectionId: 'about' },
    { label: 'Skills', icon: Terminal, num: '03', href: '/#skills', sectionId: 'skills' },
    { label: 'Experience', icon: History, num: '04', href: '/experience', sectionId: 'experience' },
    { label: 'Projects', icon: Briefcase, num: '05', href: '/work', sectionId: 'work' },
    { label: 'Contact', icon: Mail, num: '06', href: '/contact', sectionId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (isHomePage && link.sectionId) {
      e.preventDefault();
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(link.sectionId);
    } else if (!isHomePage && link.sectionId && link.href.startsWith('/#')) {
      e.preventDefault();
      navigate('/#' + link.sectionId);
    }
  };

  const handleResumeClick = () => {
    window.print();
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR: Brand Logo on Left, Theme Toggle & Resume on Right */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/75 dark:bg-[#0D0D0D]/75 backdrop-blur-xl border-b border-[#E2E2DE]/70 dark:border-[#262624]/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.35)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand wordmark on Top-Left */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none select-none"
            aria-label="Gowtham Pandiyan - Home"
          >
            <span className="font-black text-xl tracking-tighter text-[#111111] dark:text-[#EBEBE8] group-hover:text-[#E54835] transition-colors">
              GP
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] uppercase hidden sm:inline-block">
              / DATA ANALYST
            </span>
          </Link>

          {/* Primary Top-Right Actions: Theme Switcher & Resume */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              role="switch"
              aria-checked={theme === 'dark'}
              onClick={toggleTheme}
              className="relative inline-flex items-center justify-between w-[58px] h-[30px] px-2 rounded-none bg-[#E5E5E0] dark:bg-[#1E1E1C] border border-[#D9D9D5] dark:border-[#333330] cursor-pointer shrink-0 select-none transition-colors duration-300 focus:outline-none"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark and light theme"
            >
              <Sun className={`w-3.5 h-3.5 shrink-0 pointer-events-none ${theme === 'dark' ? 'text-[#737373]' : 'text-[#111111]'}`} />
              <Moon className={`w-3.5 h-3.5 shrink-0 pointer-events-none ${theme === 'dark' ? 'text-[#EBEBE8]' : 'text-[#737373]'}`} />

              <motion.div
                className="theme-toggle-knob absolute left-[3px] top-[3px] w-[22px] h-[22px] rounded-none bg-white dark:bg-[#0D0D0D] shadow-md flex items-center justify-center border border-[#D9D9D5]/60 dark:border-[#333330] pointer-events-none shrink-0"
                initial={false}
                animate={{
                  x: theme === 'dark' ? 28 : 0,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-[#EBEBE8]" />
                ) : (
                  <Sun className="w-3 h-3 text-[#111111]" />
                )}
              </motion.div>
            </button>

            {/* Resume Button in Header Nav */}
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                handleResumeClick();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#111111] dark:border-[#EBEBE8] text-xs font-mono uppercase text-[#111111] dark:text-[#EBEBE8] hover:bg-[#111111] hover:text-white dark:hover:bg-[#EBEBE8] dark:hover:text-[#111111] transition-all shrink-0 font-bold rounded-none cursor-pointer"
              title="Download & View Resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW: EXPANDABLE & MINIMIZABLE LEFT-SIDE RAIL                  */}
      {/* Left side vertically centered, icon first and second name                 */}
      {/* ========================================================================= */}
      <nav
        aria-label="Desktop side navigation"
        className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start"
      >
        <motion.div
          animate={{ width: isExpanded ? 180 : 54 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="flex flex-col rounded-none bg-white/80 dark:bg-[#0D0D0D]/85 backdrop-blur-xl border border-[#E2E2DE] dark:border-[#262624] shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Minimize / Expand Toggle Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#E2E2DE]/70 dark:border-[#262624]/70 bg-black/5 dark:bg-white/5">
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#737373] dark:text-[#8E8E8A]"
                >
                  MENU
                </motion.span>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              type="button"
              className="p-1 hover:bg-[#E54835]/15 hover:text-[#E54835] text-[#737373] dark:text-[#8E8E8A] transition-colors ml-auto cursor-pointer"
              title={isExpanded ? 'Minimize Navigation' : 'Expand Navigation'}
              aria-label={isExpanded ? 'Minimize navigation' : 'Expand navigation'}
            >
              {isExpanded ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links: Icon first and second name */}
          <div className="flex flex-col py-3 px-1.5 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isHomePage
                ? activeSection === link.sectionId
                : location.pathname === link.href;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative group px-2 py-2 flex items-center cursor-pointer transition-colors rounded-none ${
                    isActive
                      ? 'bg-black/5 dark:bg-white/5 text-[#E54835] font-bold'
                      : 'text-[#737373] dark:text-[#8E8E8A] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  title={!isExpanded ? `${link.num} - ${link.label}` : undefined}
                  aria-label={link.label}
                >
                  {/* Active Left Vertical Accent Line (| style) */}
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveVerticalLine"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#E54835] shadow-[0_0_8px_#E54835]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* First: Icon */}
                  <div className="w-6 flex items-center justify-center shrink-0">
                    <Icon
                      className={`w-4 h-4 transition-all duration-200 ${
                        isActive
                          ? 'text-[#E54835] scale-110 drop-shadow-[0_0_8px_rgba(229,72,53,0.6)]'
                          : 'group-hover:text-[#111111] dark:group-hover:text-[#FFFFFF]'
                      }`}
                    />
                  </div>

                  {/* Second: Name (Shows when expanded) */}
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.18 }}
                        className="ml-2.5 flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-xs font-mono uppercase tracking-wide"
                      >
                        <span className="text-[10px] text-neutral-400 font-normal">
                          {link.num}.
                        </span>
                        <span className={isActive ? 'text-[#E54835] font-bold' : ''}>
                          {link.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tooltip when in Minimized state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#111111] dark:bg-white text-white dark:text-black text-[10px] font-mono uppercase tracking-wider font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0 rounded-none z-50">
                      {link.num} // {link.label}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. MOBILE VIEW: BOTTOM DOCKED NAVIGATION BAR                              */}
      {/* First: Icon, Second: Name underneath with Experience 4th, Projects 5th    */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile bottom navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-[#E2E2DE] dark:border-[#262624] px-2 py-2 flex items-center justify-around shadow-[0_-8px_24px_rgba(0,0,0,0.12)] safe-area-bottom"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = isHomePage
            ? activeSection === link.sectionId
            : location.pathname === link.href;

          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="relative px-2 py-1 flex flex-col items-center justify-center cursor-pointer select-none"
              aria-label={link.label}
            >
              {/* First: Icon */}
              <Icon
                className={`w-4 h-4 mb-0.5 transition-all duration-200 ${
                  isActive
                    ? 'text-[#E54835] drop-shadow-[0_0_6px_rgba(229,72,53,0.6)]'
                    : 'text-[#737373] dark:text-[#8E8E8A]'
                }`}
              />

              {/* Second: Name */}
              <span
                className={`font-mono text-[9px] uppercase tracking-tight transition-colors ${
                  isActive
                    ? 'font-bold text-[#E54835]'
                    : 'text-[#737373] dark:text-[#8E8E8A]'
                }`}
              >
                {link.label}
              </span>

              {/* Active Horizontal Underline Accent */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveUnderline"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#E54835] shadow-[0_0_8px_#E54835]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
};
