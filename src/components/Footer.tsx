import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Lock, Shield } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const Footer: React.FC = () => {
  const { settings, openSecurityModal } = usePortfolioStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Projects', href: '/work' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="py-16 bg-[#EFEFEA] dark:bg-[#0A0A0A] border-t border-[#D9D9D5] dark:border-[#262624] text-[#737373] dark:text-[#9E9E9A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#D9D9D5] dark:border-[#262624]">
          {/* Identity */}
          <div>
            <div className="text-xl font-black text-[#111111] dark:text-[#EBEBE8] uppercase tracking-tight">
              Gowtham Pandiyan
            </div>
            <div className="text-xs font-mono tracking-widest text-[#111111] dark:text-[#EBEBE8] uppercase mt-1 font-bold">
              Data Analyst &amp; Vibe Coder
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#EBEBE8]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] dark:bg-[#EBEBE8] text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white rounded-lg transition-colors"
              title="Admin Portal Management (/admin)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#111111] dark:text-[#EBEBE8]" />
          </button>
        </div>

        {/* Bottom Sub-row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
          <div>
            © {new Date().getFullYear()} Gowtham Pandiyan. Actively building &amp; shipping data and vibe-coded projects.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={settings.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={settings.github || 'https://github.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors"
            >
              GitHub
            </a>
            <Link
              to="/privacy-policy"
              className="hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
