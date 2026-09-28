import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Mail,
  User,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  X,
  Clock,
  Laptop,
  Check,
  Eye,
  EyeOff,
  Send,
  HelpCircle,
  FileKey
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { UserRole } from '../types';

export const SecurityAuthModal: React.FC = () => {
  const {
    isSecurityModalOpen,
    closeSecurityModal,
    securityModalMode,
    openSecurityModal,
    loginUser,
    verifyOtpCode,
    resendOtpCode,
    requestPasswordReset,
    completePasswordReset,
    adminResetUserPassword,
    verifyUserEmail,
    currentUser,
    activeSession,
    isAdminAuthenticated,
    otpPendingEmail,
    lastOtpGenerated,
    loginSecurityAlert,
    emailVerificationNotification,
    clearSecurityAlert,
    signOut,
  } = usePortfolioStore();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot_password' | 'admin_reset' | 'otp_verify' | 'session_info'>(
    securityModalMode || 'login'
  );

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('viewer');
  const [otpInput, setOtpInput] = useState('');
  const [adminTargetEmail, setAdminTargetEmail] = useState('');
  const [adminNewTempPassword, setAdminNewTempPassword] = useState('');

  // CAPTCHA verification challenge
  const [captchaNum1, setCaptchaNum1] = useState(7);
  const [captchaNum2, setCaptchaNum2] = useState(4);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(60);

  // Sync mode with store
  useEffect(() => {
    if (securityModalMode) {
      setAuthMode(securityModalMode);
    }
  }, [securityModalMode]);

  // Regenerate CAPTCHA
  const generateNewCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaAnswer('');
    setCaptchaError('');
  };

  useEffect(() => {
    if (isSecurityModalOpen) {
      generateNewCaptcha();
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [isSecurityModalOpen, authMode]);

  // OTP Countdown timer
  useEffect(() => {
    let timer: any;
    if (authMode === 'otp_verify' && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [authMode, otpCountdown]);

  if (!isSecurityModalOpen) return null;

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate CAPTCHA
    if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
      setCaptchaError('Incorrect security CAPTCHA answer. Please recalculate.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUser(email, password, selectedRole);
      if (!res.success) {
        setErrorMessage(res.error || 'Login failed. Please verify credentials.');
      } else if (res.requiresOtp) {
        setAuthMode('otp_verify');
        setOtpCountdown(60);
      } else {
        setSuccessMessage('Authentication successful. Session initialized.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await verifyOtpCode(otpInput);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid OTP code.');
      } else {
        setSuccessMessage('OTP Verified successfully. Session unlocked.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification error.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password Request
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email) {
      setErrorMessage('Please enter your account email.');
      return;
    }
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setSuccessMessage(`Reset OTP code dispatched to ${email}. Check below for preview code.`);
      setAuthMode('admin_reset');
    } catch (err: any) {
      setErrorMessage('Failed to request password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Reset Password with OTP
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await completePasswordReset(email, password, otpInput);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to update password.');
      } else {
        setSuccessMessage('Password updated successfully! You may now log in.');
        setTimeout(() => setAuthMode('login'), 2000);
      }
    } catch (err: any) {
      setErrorMessage('Failed to update password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Admin Manual Override Password
  const handleAdminOverrideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await adminResetUserPassword(adminTargetEmail, adminNewTempPassword);
      if (!res.success) {
        setErrorMessage(res.error || 'Override failed.');
      } else {
        setSuccessMessage(`Temporary password generated for ${adminTargetEmail}.`);
      }
    } catch (err: any) {
      setErrorMessage('Admin reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-lg bg-white dark:bg-[#141412] border border-[#D9D9D5] dark:border-[#262624] shadow-2xl rounded-2xl overflow-hidden max-h-[94vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-[#D9D9D5] dark:border-[#262624] bg-[#F5F5F3] dark:bg-[#181816]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#111111] dark:bg-white text-white dark:text-[#111111]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider text-[#111111] dark:text-[#EBEBE8]">
                Security &amp; Access Control
              </h3>
              <span className="text-[11px] font-mono text-[#737373] dark:text-[#9E9E9A]">
                RBAC · OTP · Session Encryption · CAPTCHA
              </span>
            </div>
          </div>

          <button
            onClick={closeSecurityModal}
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Alert Notification Banner */}
        {loginSecurityAlert && (
          <div className="px-5 py-2.5 bg-neutral-500/10 border-b border-neutral-500/20 text-[#111111] dark:text-neutral-300 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{loginSecurityAlert}</span>
            </div>
            <button onClick={clearSecurityAlert} className="hover:underline text-[10px] uppercase font-bold">
              Dismiss
            </button>
          </div>
        )}

        {/* Sub-navigation Tabs */}
        <div className="flex border-b border-[#D9D9D5] dark:border-[#262624] text-xs font-mono uppercase tracking-wider bg-[#F9F9F8] dark:bg-[#161614] overflow-x-auto">
          <button
            onClick={() => setAuthMode('login')}
            className={`px-4 py-2.5 font-bold transition-colors whitespace-nowrap ${
              authMode === 'login'
                ? 'border-b-2 border-[#111111] dark:border-white text-[#111111] dark:text-white bg-white dark:bg-[#141412]'
                : 'text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8]'
            }`}
          >
            Sign In / Login
          </button>
          <button
            onClick={() => setAuthMode('forgot_password')}
            className={`px-4 py-2.5 font-bold transition-colors whitespace-nowrap ${
              authMode === 'forgot_password' || authMode === 'admin_reset'
                ? 'border-b-2 border-[#111111] dark:border-white text-[#111111] dark:text-white bg-white dark:bg-[#141412]'
                : 'text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8]'
            }`}
          >
            Forgot Password
          </button>
          {activeSession && (
            <button
              onClick={() => setAuthMode('session_info')}
              className={`px-4 py-2.5 font-bold transition-colors whitespace-nowrap ${
                authMode === 'session_info'
                  ? 'border-b-2 border-[#111111] dark:border-white text-[#111111] dark:text-white bg-white dark:bg-[#141412]'
                  : 'text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-[#EBEBE8]'
              }`}
            >
              Session &amp; Roles
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Role Toggle Selector */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-1.5 font-semibold">
                  Access Portal Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'admin', label: 'Admin', desc: 'Full Console' },
                    { id: 'developer', label: 'Developer', desc: 'Vibe Coder' },
                    { id: 'viewer', label: 'Viewer', desc: 'Read-Only' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSelectedRole(r.id as UserRole);
                        if (r.id === 'admin') {
                          setEmail('gowthampandiyan7@gmail.com');
                          setPassword('admin123');
                        } else if (r.id === 'developer') {
                          setEmail('developer@vibecoding.dev');
                          setPassword('vibecoder123');
                        } else {
                          setEmail('guest@company.org');
                          setPassword('guest123');
                        }
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        selectedRole === r.id
                          ? 'border-[#111111] dark:border-white bg-[#111111]/10 dark:bg-white/10 text-[#111111] dark:text-white font-bold'
                          : 'border-[#D9D9D5] dark:border-[#262624] text-[#737373] dark:text-[#9E9E9A] hover:border-[#111111] dark:hover:border-white'
                      }`}
                    >
                      <div className="text-xs font-bold uppercase">{r.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#9E9E9A]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gowthampandiyan7@gmail.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#F5F5F3] dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A]">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot_password')}
                    className="text-[11px] font-mono text-[#111111] dark:text-[#EBEBE8] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#9E9E9A]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-[#F5F5F3] dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Interactive Mathematical Anti-Bot CAPTCHA Challenge */}
              <div className="p-3.5 rounded-lg bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-[#737373] dark:text-[#9E9E9A] font-bold">
                    Security Verification (CAPTCHA)
                  </span>
                  <button
                    type="button"
                    onClick={generateNewCaptcha}
                    className="flex items-center gap-1 text-[10px] font-mono text-[#111111] dark:text-[#EBEBE8] hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>New Challenge</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded bg-white dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] font-mono text-sm font-bold text-[#111111] dark:text-white select-none tracking-widest">
                    {captchaNum1} + {captchaNum2} = ?
                  </div>
                  <input
                    type="number"
                    required
                    value={captchaAnswer}
                    onChange={(e) => {
                      setCaptchaAnswer(e.target.value);
                      setCaptchaError('');
                    }}
                    placeholder="Enter sum"
                    className="w-28 px-3 py-2 rounded bg-white dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
                  />
                </div>
                {captchaError && (
                  <p className="mt-1.5 text-[11px] font-mono text-red-500">{captchaError}</p>
                )}
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                  {successMessage}
                </div>
              )}

              {/* Submit Button - Black & White Unified */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-[#111111] dark:bg-[#EBEBE8] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authenticate &amp; Initialize Session</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: OTP VERIFICATION WORKFLOW */}
          {authMode === 'otp_verify' && (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[#111111] dark:text-white flex items-center justify-center mx-auto mb-2 border border-[#D9D9D5] dark:border-[#333]">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-[#111111] dark:text-[#EBEBE8]">
                  Two-Factor OTP Security Challenge
                </h4>
                <p className="text-xs font-mono text-[#737373] dark:text-[#9E9E9A] mt-1 max-w-sm mx-auto">
                  A high-entropy 6-digit one-time password has been generated for <strong>{otpPendingEmail}</strong>.
                </p>
              </div>

              {/* Live Simulated OTP Preview Box for Test Verification */}
              {lastOtpGenerated && (
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-[#D9D9D5] dark:border-[#333] text-xs font-mono text-center">
                  <span className="text-[#737373] dark:text-[#9E9E9A] block mb-1">
                    Security Dispatch Simulation: Your 6-Digit Code is:
                  </span>
                  <span className="font-black text-xl tracking-[0.3em] text-[#111111] dark:text-white bg-white dark:bg-[#181816] px-4 py-1 rounded inline-block border border-[#D9D9D5] dark:border-[#333]">
                    {lastOtpGenerated}
                  </span>
                  <div className="mt-1 text-[10px] text-[#737373] dark:text-[#9E9E9A]">
                    Click to auto-fill:
                    <button
                      type="button"
                      onClick={() => setOtpInput(lastOtpGenerated)}
                      className="ml-2 text-[#111111] dark:text-white underline font-bold"
                    >
                      Fill Code
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-center text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-2 font-semibold">
                  Enter 6-Digit One-Time Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="••••••"
                  className="w-full text-center text-2xl font-mono tracking-[0.4em] font-bold py-3 rounded-lg bg-[#F5F5F3] dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono text-center">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono text-center">
                  {successMessage}
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
                <span>
                  Expires in: <strong>{otpCountdown}s</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    resendOtpCode();
                    setOtpCountdown(60);
                  }}
                  className="text-[#111111] dark:text-white hover:underline"
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || otpInput.length < 6}
                className="w-full py-3 rounded-lg bg-[#111111] dark:bg-[#EBEBE8] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span>Verify OTP &amp; Unlock Session</span>
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {authMode === 'forgot_password' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <h4 className="font-bold text-sm text-[#111111] dark:text-[#EBEBE8] mb-1">
                  Account Recovery &amp; Password Reset
                </h4>
                <p className="text-xs text-[#737373] dark:text-[#9E9E9A] leading-relaxed">
                  Enter your registered email address. A secure one-time password (OTP) reset code will be generated to allow you to configure a new password.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#9E9E9A]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gowthampandiyan7@gmail.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#F5F5F3] dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-[#111111] dark:bg-[#EBEBE8] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Password Reset OTP</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-mono text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white"
                >
                  Return to Sign In
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: COMPLETE PASSWORD RESET WITH OTP */}
          {authMode === 'admin_reset' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div>
                <h4 className="font-bold text-sm text-[#111111] dark:text-[#EBEBE8] mb-1">
                  Set New Account Password
                </h4>
                <p className="text-xs text-[#737373] dark:text-[#9E9E9A]">
                  Enter the verification code dispatched to <strong>{email}</strong> and specify your new credentials.
                </p>
              </div>

              {/* Preview Code */}
              {lastOtpGenerated && (
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-[#D9D9D5] dark:border-[#333] text-xs font-mono text-center">
                  <span>Reset OTP: </span>
                  <strong className="text-[#111111] dark:text-white font-black">{lastOtpGenerated}</strong>
                  <button
                    type="button"
                    onClick={() => setOtpInput(lastOtpGenerated)}
                    className="ml-3 underline text-[#111111] dark:text-white"
                  >
                    Auto-Fill OTP
                  </button>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-1">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  required
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F5F3] dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F5F3] dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F5F3] dark:bg-[#0D0D0D] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-[#111111] dark:bg-[#EBEBE8] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                Save New Password &amp; Sign In
              </button>
            </form>
          )}

          {/* TAB 5: ACTIVE SESSION & ROLE BASED PERMISSIONS */}
          {authMode === 'session_info' && activeSession && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#F5F5F3] dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9D9D5] dark:border-[#262624]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#737373] block">Active User</span>
                    <strong className="text-sm text-[#111111] dark:text-[#EBEBE8]">
                      {activeSession.user.name} ({activeSession.user.email})
                    </strong>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#111111] text-white dark:bg-white dark:text-[#111111] font-mono text-[10px] uppercase font-bold">
                    Role: {activeSession.user.role}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
                  <div>
                    <span className="block text-[10px] uppercase">Session IP</span>
                    <span className="font-semibold text-[#111111] dark:text-[#EBEBE8]">{activeSession.ip}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase">Device</span>
                    <span className="font-semibold text-[#111111] dark:text-[#EBEBE8]">{activeSession.device}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase">Email Verification</span>
                    <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{activeSession.user.is_verified ? 'Verified' : 'Pending'}</span>
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase">MFA Status</span>
                    <span className="font-semibold text-[#111111] dark:text-[#EBEBE8]">
                      {activeSession.otp_verified ? 'Enforced & Verified' : 'Standard'}
                    </span>
                  </div>
                </div>

                {/* Verification Action if not verified */}
                {!activeSession.user.is_verified && (
                  <button
                    onClick={() => verifyUserEmail(activeSession.user.email)}
                    className="w-full mt-2 py-2 rounded border border-[#111111] dark:border-white text-[#111111] dark:text-white text-xs font-mono hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-colors"
                  >
                    Send Verification Email / Mark Verified
                  </button>
                )}
              </div>

              {/* RBAC Matrix Breakdown */}
              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-[#737373] dark:text-[#9E9E9A] font-bold mb-2">
                  Role-Based Access Control (RBAC) Matrix
                </h5>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624]">
                    <span>Manage Projects &amp; Data Models</span>
                    <span className={activeSession.user.role === 'admin' || activeSession.user.role === 'developer' ? 'text-emerald-500 font-bold' : 'text-zinc-400'}>
                      {activeSession.user.role === 'admin' || activeSession.user.role === 'developer' ? 'Granted' : 'Restricted'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624]">
                    <span>Download Raw Project Files &amp; Datasets</span>
                    <span className="text-emerald-500 font-bold">Granted (All Roles)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624]">
                    <span>View &amp; Manage Contact Inquiries</span>
                    <span className={activeSession.user.role === 'admin' ? 'text-emerald-500 font-bold' : 'text-zinc-400'}>
                      {activeSession.user.role === 'admin' ? 'Granted' : 'Admin Only'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#181816] border border-[#D9D9D5] dark:border-[#262624]">
                    <span>Admin Password Reset &amp; User Audit</span>
                    <span className={activeSession.user.role === 'admin' ? 'text-emerald-500 font-bold' : 'text-zinc-400'}>
                      {activeSession.user.role === 'admin' ? 'Granted' : 'Admin Only'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Session Termination */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    signOut();
                    closeSecurityModal();
                  }}
                  className="w-full py-2.5 rounded-lg border border-[#111111] dark:border-white text-[#111111] dark:text-white hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Terminate Active Session (Sign Out)
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
