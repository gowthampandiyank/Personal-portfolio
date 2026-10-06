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
  Database,
  LineChart,
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ContactSkeleton } from './skeletons/ContactSkeleton';

export const ContactSection: React.FC = () => {
  const { settings, submitMessage, setCursor, resetCursor, isLoading } = usePortfolioStore();

  if (isLoading) {
    return <ContactSkeleton />;
  }

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
        subject: formData.subject || 'Data Analytics Inquiry',
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

  // High-end spring physics configuration
  const springTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  };

  return (
    <section
      id="contact"
      className="py-28 md:py-36 bg-[#F9F9F7]/95 dark:bg-[#0D0D0D]/95 backdrop-blur-[1px] border-b border-[#E2E2DE] dark:border-[#262624] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#E2E2DE] dark:border-[#262624]">
          <span className="text-xs font-mono tracking-widest text-[#E54835] uppercase mb-2 block font-bold">
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
                Have a data analytics initiative, business intelligence dashboard, or relational SQL modeling pipeline in mind? I'm always open to discussing new opportunities, collaborations, and quantitative projects.
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
                    {settings.email || 'gowthampandiyan7@gmail.com'}
                  </a>
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] mb-1.5 font-bold">
                    Base Location
                  </span>
                  <span className="text-sm text-[#111111] dark:text-[#EBEBE8] font-medium">
                    Chennai, Tamil Nadu, India (Open to Remote &amp; Relocation)
                  </span>
                </div>

                {/* Social Connects */}
                <div className="flex flex-col pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] dark:text-[#9E9E9A] mb-3 font-bold">
                    Professional Profiles
                  </span>
                  <div className="flex flex-wrap gap-4">
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

          {/* Right Column: Clean Classic Contact Form with High-End Micro-Interactions */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="border border-[#E2E2DE] dark:border-[#262624] bg-white dark:bg-[#141412] p-8 md:p-10 rounded-2xl shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={springTransition}
                    className="relative group"
                  >
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] group-hover:text-[#111111] dark:group-hover:text-white mb-2 font-bold transition-colors"
                    >
                      Your Name *
                    </label>
                    <motion.div
                      whileHover={{
                        borderColor: '#E54835',
                        boxShadow: '0 6px 20px -4px rgba(229, 72, 53, 0.15)',
                      }}
                      whileFocusWithin={{
                        borderColor: '#E54835',
                        boxShadow: '0 0 0 1px rgba(229, 72, 53, 0.35), 0 8px 24px -4px rgba(229, 72, 53, 0.2)',
                      }}
                      transition={springTransition}
                      className="border border-[#E2E2DE] dark:border-[#262624] bg-[#F9F9F7] dark:bg-[#0D0D0D] rounded-xl overflow-hidden"
                    >
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 bg-transparent text-sm text-[#111111] dark:text-[#EBEBE8] focus:outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={springTransition}
                    className="relative group"
                  >
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] group-hover:text-[#111111] dark:group-hover:text-white mb-2 font-bold transition-colors"
                    >
                      Your Email *
                    </label>
                    <motion.div
                      whileHover={{
                        borderColor: '#E54835',
                        boxShadow: '0 6px 20px -4px rgba(229, 72, 53, 0.15)',
                      }}
                      whileFocusWithin={{
                        borderColor: '#E54835',
                        boxShadow: '0 0 0 1px rgba(229, 72, 53, 0.35), 0 8px 24px -4px rgba(229, 72, 53, 0.2)',
                      }}
                      transition={springTransition}
                      className="border border-[#E2E2DE] dark:border-[#262624] bg-[#F9F9F7] dark:bg-[#0D0D0D] rounded-xl overflow-hidden"
                    >
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 bg-transparent text-sm text-[#111111] dark:text-[#EBEBE8] focus:outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={springTransition}
                  className="relative group"
                >
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] group-hover:text-[#111111] dark:group-hover:text-white mb-2 font-bold transition-colors"
                  >
                    Subject
                  </label>
                  <motion.div
                    whileHover={{
                      borderColor: '#E54835',
                      boxShadow: '0 6px 20px -4px rgba(229, 72, 53, 0.15)',
                    }}
                    whileFocusWithin={{
                      borderColor: '#E54835',
                      boxShadow: '0 0 0 1px rgba(229, 72, 53, 0.35), 0 8px 24px -4px rgba(229, 72, 53, 0.2)',
                    }}
                    transition={springTransition}
                    className="border border-[#E2E2DE] dark:border-[#262624] bg-[#F9F9F7] dark:bg-[#0D0D0D] rounded-xl overflow-hidden"
                  >
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Sales Analytics Dashboard or SQL Pipeline Architecture"
                      className="w-full px-4 py-3 bg-transparent text-sm text-[#111111] dark:text-[#EBEBE8] focus:outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    />
                  </motion.div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={springTransition}
                  className="relative group"
                >
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] group-hover:text-[#111111] dark:group-hover:text-white mb-2 font-bold transition-colors"
                  >
                    Message *
                  </label>
                  <motion.div
                    whileHover={{
                      borderColor: '#E54835',
                      boxShadow: '0 6px 20px -4px rgba(229, 72, 53, 0.15)',
                    }}
                    whileFocusWithin={{
                      borderColor: '#E54835',
                      boxShadow: '0 0 0 1px rgba(229, 72, 53, 0.35), 0 8px 24px -4px rgba(229, 72, 53, 0.2)',
                    }}
                    transition={springTransition}
                    className="border border-[#E2E2DE] dark:border-[#262624] bg-[#F9F9F7] dark:bg-[#0D0D0D] rounded-xl overflow-hidden"
                  >
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your analytical requirements, data sources, or project goals..."
                      className="w-full px-4 py-3 bg-transparent text-sm text-[#111111] dark:text-[#EBEBE8] focus:outline-none resize-y placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    />
                  </motion.div>
                </motion.div>

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
                        <div className="font-bold">Inquiry Transmitted Successfully</div>
                        <div>Thank you for reaching out. Gowtham will review your requirements and respond promptly.</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action Button with Spring Physics Micro-Interactions */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={springTransition}
                  onMouseEnter={() => setCursor({ label: 'SEND', type: 'contact' })}
                  onMouseLeave={resetCursor}
                  className="w-full py-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 rounded-xl shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer group"
                >
                  {status === 'submitting' ? (
                    <span>Transmitting Data...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
