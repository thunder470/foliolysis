import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Logo } from '@/components/common';
import { signInSchema, signUpSchema } from '../schemas/authSchemas';
import { X, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, loginAsGuest } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSuccessfulAuth = () => {
    if (location.pathname === '/' || location.pathname === '/landing') {
      navigate('/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    if (mode === 'login') {
      const result = signInSchema.safeParse({ email, password });
      if (!result.success) {
        const fieldErrors = {};
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      const res = await login(email, password);
      setIsSubmitting(false);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        handleSuccessfulAuth();
      } else {
        toast.error(res.error || 'Authentication failed. Please verify credentials.');
      }
    } else {
      const result = signUpSchema.safeParse({ name, email, password });
      if (!result.success) {
        const fieldErrors = {};
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      const res = await register({ name, email, password, tier: 'Pro Tier' });
      setIsSubmitting(false);
      if (res.success) {
        toast.success(`Account created successfully! Welcome to foliolysis, ${res.user.name}.`);
        handleSuccessfulAuth();
      } else {
        toast.error(res.error || 'Registration failed.');
      }
    }
  };

  const handleGuestAccess = async () => {
    setIsSubmitting(true);
    await loginAsGuest();
    setIsSubmitting(false);
    toast.info('Entered Guest Sandbox Mode with ₹10,00,000 trial capital.');
    handleSuccessfulAuth();
  };

  const fillDemoAccount = () => {
    setEmail('ansh@foliolysis.in');
    setPassword('AnshTrader@2026');
    setErrors({});
    setMode('login');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'pageFadeIn 0.2s ease',
      }}
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E5E9EE',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          width: '100%',
          maxWidth: '460px',
          overflow: 'hidden',
          animation: 'dropdownSlideIn 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FAFBFD',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo size={36} showText={false} />
            <div>
              <h2 id="auth-modal-title" style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                foliolysis Account Access
              </h2>
              <p style={{ fontSize: '0.74rem', color: '#64748B', margin: 0, marginTop: '2px' }}>
                Secure Institutional Quantitative Session
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close dialog"
            style={{
              border: 'none',
              background: '#F1F5F9',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E5E9EE', padding: '0 28px', backgroundColor: '#FAFBFD' }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setErrors({}); }}
            style={{
              flex: 1,
              padding: '12px 0',
              border: 'none',
              background: 'transparent',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: mode === 'login' ? '#2563EB' : '#64748B',
              borderBottom: mode === 'login' ? '2px solid #2563EB' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrors({}); }}
            style={{
              flex: 1,
              padding: '12px 0',
              border: 'none',
              background: 'transparent',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: mode === 'register' ? '#2563EB' : '#64748B',
              borderBottom: mode === 'register' ? '2px solid #2563EB' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px 28px' }}>
          {/* Quick Demo Credentials Pill */}
          {mode === 'login' && (
            <div
              style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #DBEAFE',
                borderRadius: '12px',
                padding: '10px 14px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#1E40AF', display: 'block' }}>
                  Demo Pro Account Available
                </span>
                <span style={{ fontSize: '0.68rem', color: '#3B82F6' }}>
                  ansh@foliolysis.in • AnshTrader@2026
                </span>
              </div>
              <button
                type="button"
                onClick={fillDemoAccount}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  cursor: 'pointer',
                }}
              >
                Auto-fill
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'register' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="Trader Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '38px', width: '100%', borderColor: errors.name ? '#EF4444' : undefined }}
                  />
                </div>
                {errors.name && <span style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px', width: '100%', borderColor: errors.email ? '#EF4444' : undefined }}
                />
              </div>
              {errors.email && <span style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px', width: '100%', borderColor: errors.password ? '#EF4444' : undefined }}
                />
              </div>
              {errors.password && <span style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.88rem',
                borderRadius: '12px',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Terminal' : 'Create Quantitative Account'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
            <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          </div>

          {/* Instant Guest Sandbox Access */}
          <button
            type="button"
            onClick={handleGuestAccess}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '11px',
              fontSize: '0.84rem',
              fontWeight: 650,
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
          >
            <Sparkles size={16} color="#00A87E" />
            <span>Launch Instant Guest Sandbox (₹10L)</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
            <ShieldCheck size={14} color="#00A87E" />
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              HttpOnly Secure Cookie Sessions • AES-256 Protected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
