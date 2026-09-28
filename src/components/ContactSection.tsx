import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const ContactSection: React.FC = () => {
  const { settings, submitMessage, setCursor, resetCursor } = usePortfolioStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email, and message.');
      setStatus('error');
      return;
    }

    try {
      setStatus('submitting');
      await submitMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      });

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please reach out directly to gowthampandiyan7@gmail.com.');
    }
  };

  return (
    <section
      id="contact"
      className="py-28 md:py-36 bg-[#F9F9F7]/95 dark:bg-[#0D0D0D]/95 backdrop-blur-[1px] border-b border-[#E2E2DE] dark:border-[#262624] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <span className="text-xs font-mono tracking-widest text-[#111111] dark:text-[#EBEBE8] uppercase mb-2 block font-bold">
            05. Contact &amp; Collaboration
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase leading-[1.05]"
            style={{ textWrap: 'balance' }}
          >
            LET'S WORK TOGETHER
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries & Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <p className="text-sm sm:text-base text-[#6B6B67] dark:text-[#9E9E9A] leading-relaxed mb-8">
                Have a data analytics challenge, business intelligence dashboard, or modern web application in mind? I'm always open to discussing new opportunities, collaborations, and projects.
              </p>

              <div className="space-y-6 text-sm">
                {/* Email Direct */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] mb-1.5 font-bold">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${settings.email}`}
                    onMouseEnter={() => setCursor({ label: 'EMAIL', type: 'contact' })}
                    onMouseLeave={resetCursor}
                    className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#EBEBE8] hover:underline transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] mb-1.5 font-bold">
                    Location &amp; Work Hours
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#111111] dark:text-[#EBEBE8]">
                    {settings.location || 'Chennai, Tamil Nadu, India'} (IST / UTC+5:30)
                  </span>
                  <span className="text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A] mt-1">
                    Open for remote global collaboration and onsite roles
                  </span>
                </div>

                {/* Social Networks */}
                <div className="pt-6 border-t border-[#E2E2DE] dark:border-[#262624] space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] block font-bold">
                    Professional Networks
                  </span>

                  <div className="flex flex-col space-y-3">
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] dark:text-[#EBEBE8] hover:underline transition-colors group"
                    >
                      <Linkedin className="w-4 h-4 text-[#6B6B67] dark:text-[#9E9E9A] group-hover:text-black dark:group-hover:text-white" />
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={settings.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] dark:text-[#EBEBE8] hover:underline transition-colors group"
                    >
                      <Github className="w-4 h-4 text-[#6B6B67] dark:text-[#9E9E9A] group-hover:text-black dark:group-hover:text-white" />
                      <span>GitHub Repositories</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="pt-6 border-t border-[#E2E2DE] dark:border-[#262624] flex items-center gap-3 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Prompt response within 24 hours guaranteed</span>
            </div>
          </div>

          {/* Right Column: Clean Classic Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#E2E2DE] dark:border-[#262624] bg-white dark:bg-[#141412] p-8 md:p-10 rounded-2xl shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] mb-2 font-bold"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#F9F9F7] dark:bg-[#0D0D0D] border border-[#E2E2DE] dark:border-[#262624] text-sm text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none transition-colors rounded-xl"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] mb-2 font-bold"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 bg-[#F9F9F7] dark:bg-[#0D0D0D] border border-[#E2E2DE] dark:border-[#262624] text-sm text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none transition-colors rounded-xl"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] mb-2 font-bold"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Sales Analytics Dashboard or Web App Initiative"
                    className="w-full px-4 py-3 bg-[#F9F9F7] dark:bg-[#0D0D0D] border border-[#E2E2DE] dark:border-[#262624] text-sm text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none transition-colors rounded-xl"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] mb-2 font-bold"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message, project goals, or questions here..."
                    className="w-full px-4 py-3 bg-[#F9F9F7] dark:bg-[#0D0D0D] border border-[#E2E2DE] dark:border-[#262624] text-sm text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none transition-colors rounded-xl"
                  />
                </div>

                {/* Status Notification Alerts */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2 rounded-xl"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono flex items-center gap-3 rounded-xl"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                      <div>
                        <div className="font-bold">Message Delivered Successfully!</div>
                        <div>Thank you for reaching out. Gowtham will review your message and reply promptly.</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action Button - Unified Black & White */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  onMouseEnter={() => setCursor({ label: 'SEND', type: 'contact' })}
                  onMouseLeave={resetCursor}
                  className="w-full py-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
