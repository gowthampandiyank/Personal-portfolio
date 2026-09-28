import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const PrivacyPolicyPage: React.FC = () => {
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
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] dark:text-[#EBEBE8]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
            Effective Date: September 26, 2026 · Last Updated: September 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#737373] dark:text-[#9E9E9A] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              1. Overview
            </h2>
            <p>
              This Privacy Policy explains how Gowtham Pandiyan ("we", "our", or "the portfolio site") handles information collected through this portfolio website ({settings.name}). We respect your privacy and are committed to safeguarding personal information submitted through our contact forms or interactions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              2. Information Collected
            </h2>
            <p className="mb-2">
              We collect information that you voluntarily choose to provide when interacting with the portfolio:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-[#111111] dark:text-[#EBEBE8]">Contact Details:</strong> Your name, email address, message subject, and message content submitted through the contact form.</li>
              <li><strong className="text-[#111111] dark:text-[#EBEBE8]">Technical Metadata:</strong> Standard browser request headers, IP address, and browser user agent collected automatically for server security and bot mitigation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              3. Cookies & Local Storage
            </h2>
            <p>
              This website uses local browser storage (<code className="font-mono text-xs bg-[#E5E5E0] dark:bg-[#1E1E1C] px-1.5 py-0.5 text-[#111111] dark:text-[#EBEBE8]">localStorage</code>) solely to remember your aesthetic theme preferences (Light or Dark Mode) and administrative dashboard sessions if you are authenticated as an administrator. We do not use third-party tracking cookies or advertising pixels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              4. Analytics & Telemetry
            </h2>
            <p>
              We prioritize minimalist and privacy-conscious design. No invasive third-party telemetry, keystroke trackers, or cross-site tracking engines are embedded on this portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              5. Third-Party Services & Supabase Integration
            </h2>
            <p>
              Contact form submissions and administrative authentication are securely managed via Supabase (PostgreSQL with Row Level Security). When you submit a contact inquiry, your message is transferred using encrypted HTTPS/TLS connections to our protected database. Supabase complies with enterprise data privacy standards (SOC 2, GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              6. Data Security
            </h2>
            <p>
              We implement industry-standard technical measures to prevent unauthorized access, alteration, or disclosure of submitted information. Access to contact inquiries is strictly limited to authorized administrative sessions verified via authentication tokens.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              7. Data Retention
            </h2>
            <p>
              Contact submissions are retained only as long as necessary to respond to your technical inquiry or professional opportunity, after which they may be archived or permanently purged upon request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              8. User Rights
            </h2>
            <p>
              Depending on your jurisdiction (such as under GDPR or CCPA), you have the right to request access to the personal information we hold about you, request corrections, or request deletion of your messages. To exercise these rights, please contact us directly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#111111] dark:text-[#EBEBE8] mb-3">
              9. Contact Information
            </h2>
            <p>
              For privacy-related questions or data removal requests regarding this website:
            </p>
            <div className="mt-3 p-4 bg-[#EFEFEA] dark:bg-[#141412] border border-[#D9D9D5] dark:border-[#262624] font-mono text-xs text-[#111111] dark:text-[#EBEBE8]">
              <div><strong>Name:</strong> Gowtham Pandiyan</div>
              <div><strong>Role:</strong> Data Analyst &amp; Vibe Coder</div>
              <div><strong>Email:</strong> {settings.email}</div>
              <div><strong>Location:</strong> {settings.location}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
