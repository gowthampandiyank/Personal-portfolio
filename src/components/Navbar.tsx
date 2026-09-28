import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowUpRight, FileText, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isHomePage) {
        const sections = ['home', 'about', 'skills', 'experience', 'work', 'contact'];
        const scrollPosition = window.scrollY + 200;

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

  const navLinks = [
    { label: 'Home', href: '/', sectionId: 'home' },
    { label: 'About', href: '/about', sectionId: 'about' },
    { label: 'Skills', href: '/#skills', sectionId: 'skills' },
    { label: 'Projects', href: '/work', sectionId: 'work' },
    { label: 'Experience', href: '/experience', sectionId: 'experience' },
    { label: 'Contact', href: '/contact', sectionId: 'contact' },
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
    setMobileMenuOpen(false);
  };

  const handleResumeClick = () => {
    window.print();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#F9F9F7]/90 dark:bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#E2E2DE]/80 dark:border-[#262624]/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand wordmark - Clean Vibe Coder identity */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Gowtham Pandiyan - Home"
          >
            <span className="font-black text-xl tracking-tighter text-[#111111] dark:text-[#EBEBE8] group-hover:opacity-80 transition-opacity">
              GP
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] uppercase">
              / VIBE CODER
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = isHomePage
                ? activeSection === link.sectionId
                : location.pathname === link.href;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#111111] dark:text-[#EBEBE8] font-bold'
                      : 'text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E54835]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Primary actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={theme === 'dark'}
              onClick={toggleTheme}
              className="relative inline-flex items-center justify-between w-[64px] h-[32px] px-2 rounded-full bg-[#E5E5E0] dark:bg-[#1E1E1C] border border-[#D9D9D5] dark:border-[#333330] cursor-pointer shrink-0 select-none transition-colors duration-300 focus:outline-none"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark and light theme"
            >
              <Sun className={`w-3.5 h-3.5 shrink-0 pointer-events-none ${theme === 'dark' ? 'text-[#737373]' : 'text-[#111111]'}`} />
              <Moon className={`w-3.5 h-3.5 shrink-0 pointer-events-none ${theme === 'dark' ? 'text-[#EBEBE8]' : 'text-[#737373]'}`} />
              
              <motion.div
                className="theme-toggle-knob absolute left-[3px] top-[3px] w-[26px] h-[26px] rounded-full bg-white dark:bg-[#0D0D0D] shadow-md flex items-center justify-center border border-[#D9D9D5]/60 dark:border-[#333330] pointer-events-none shrink-0"
                initial={false}
                animate={{
                  x: theme === 'dark' ? 32 : 0,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-[#EBEBE8]" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-[#111111]" />
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#111111] dark:border-[#EBEBE8] text-xs font-mono uppercase text-[#111111] dark:text-[#EBEBE8] hover:bg-[#111111] hover:text-white dark:hover:bg-[#EBEBE8] dark:hover:text-[#111111] transition-all shrink-0 font-bold rounded-none cursor-pointer"
              title="Download & View Resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-none text-[#111111] dark:text-[#EBEBE8] hover:bg-[#EBEBE8] dark:hover:bg-[#1A1A18] transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#F5F5F3] dark:bg-[#0D0D0D] flex flex-col justify-between p-8 pt-24 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#737373] dark:text-[#9E9E9A]">
                Navigation
              </span>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="text-2xl font-bold tracking-tight text-[#111111] dark:text-[#EBEBE8] hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#737373] dark:text-[#9E9E9A]" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#D9D9D5] dark:border-[#262624] flex flex-col space-y-3">
              <button
                onClick={handleResumeClick}
                className="w-full py-3 rounded-none flex items-center justify-center gap-2 bg-[#111111] dark:bg-[#EBEBE8] text-[#F5F5F3] dark:text-[#111111] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download / Print Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
