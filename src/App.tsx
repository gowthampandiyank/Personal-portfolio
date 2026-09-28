import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { PageLoadingProgress } from './components/PageLoadingProgress';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { DataBackgroundAnimation } from './components/DataBackgroundAnimation';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPortal } from './components/AdminPortal';
import { SecurityAuthModal } from './components/SecurityAuthModal';

import { usePortfolioStore } from './store/usePortfolioStore';

export default function App() {
  const { theme, fetchData, checkSupabaseAuth } = usePortfolioStore();
  const location = useLocation();

  // Scroll to top on route change (unless hash link)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Sync theme class with DOM root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  // Initial data sync and auth check
  useEffect(() => {
    fetchData();
    checkSupabaseAuth();
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col justify-between selection:bg-[#111111] selection:text-white dark:selection:bg-white dark:selection:text-[#111111] relative">
        {/* Global auto-moving data animations background */}
        <DataBackgroundAnimation />

        {/* Custom interactive cursor for desktop */}
        <CustomCursor />

        {/* Global Scroll Progress Bar */}
        <ScrollProgress />

        {/* Route Page Transition Loader */}
        <PageLoadingProgress />

        {/* Floating / Sticky Navigation Bar */}
        <Navbar />

        {/* Global Security & Auth Modal */}
        <SecurityAuthModal />

        {/* Route views */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/projects" element={<WorkPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
