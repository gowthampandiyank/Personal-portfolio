import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <ContactSection />
    </div>
  );
};
