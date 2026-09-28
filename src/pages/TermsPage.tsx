import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileCheck } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const TermsPage: React.FC = () => {
  const { settings } = usePortfolioStore();

  return (
    <div className="pt-28 pb-24 bg-[#F5F5F3] dark:bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8] transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="pb-8 mb-10 border-b border-[#E2E2DE] dark:border-[#262624]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#111111] dark:text-[#EBEBE8] block mb-2 font-bold">
            Legal Terms & Conditions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] dark:text-[#EBEBE8]">
            Terms of Use
          </h1>
          <p className="mt-3 text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
            Effective Date: September 26, 2026 · Last Updated: September 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#737373] dark:text-[#9E9E9A] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website (the "Portfolio"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              2. Intellectual Property Rights
            </h2>
            <p>
              The design, layout, editorial typography, visual assets, code architectures, and written descriptions presented on this website are the intellectual property of Gowtham Pandiyan, unless otherwise noted. Project source code shared via open-source repositories (such as GitHub) is subject to its respective open-source license (e.g. MIT).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              3. Portfolio & Technical Project Information
            </h2>
            <p>
              All materials, case studies, skill descriptions, and technical summaries provided on this site are for informational and demonstration purposes to illustrate professional experience and capabilities in data analytics, business intelligence modeling, and vibe-coded web applications. While we strive to maintain accurate information, we do not warrant that all specifications or external dependencies are always free of error.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              4. External Links
            </h2>
            <p>
              This website may contain links to external third-party websites (such as LinkedIn, GitHub, documentation references, or live application demos). Gowtham Pandiyan has no control over the content, security, or privacy practices of these external sites and accepts no responsibility for them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              5. User Responsibilities & Conduct
            </h2>
            <p className="mb-2">
              When communicating through our contact forms or administrative interfaces:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>You agree not to submit unlawful, abusive, harassing, or spam communications.</li>
              <li>You agree not to attempt unauthorized access to the administrative dashboard, database endpoints, or server infrastructure.</li>
              <li>You agree not to introduce malicious scripts, viruses, or automated scraping engines.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall Gowtham Pandiyan be liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use this website, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              7. Modifications to Terms
            </h2>
            <p>
              We reserve the right to revise or update these Terms of Use at any time without prior notice. Continued use of the website following any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              8. Contact & Legal Notices
            </h2>
            <p>
              If you have any questions or legal inquiries regarding these Terms:
            </p>
            <div className="mt-3 p-4 bg-[#EFEFEA] dark:bg-[#141412] border border-[#D9D9D5] dark:border-[#262624] font-mono text-xs text-[#111111] dark:text-[#EBEBE8]">
              <div><strong>Contact:</strong> Gowtham Pandiyan</div>
              <div><strong>Email:</strong> {settings.email}</div>
              <div><strong>Website:</strong> https://gowthampandiyan.com</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
