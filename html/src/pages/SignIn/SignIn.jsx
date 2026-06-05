import { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError } from '@/features/auth/authSlice';
import { loginUser, sendOtpThunk, verifyOtpThunk } from '@/features/auth/authThunk';
import { ROUTES } from '@/constants/routes';
import { getPostLoginRoute } from '@/utils/authRedirect';
import { COUNTRY_CODES } from '@/constants/mockData';
import VisualPanelOrnament from '@/features/auth/components/VisualPanelOrnament';
import useOtpInput from '@/hooks/useOtpInput';
import useResendTimer from '@/hooks/useResendTimer';
import './SignIn.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, otpSent, maskedPhone, otpLoading } = useSelector(
    (state) => state.auth
  );

  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));

  const { inputsRef, handleChange, handleKeyDown, focusFirst, getValues } = useOtpInput(6);
  const { label: resendLabel, start: startResend, canResend } = useResendTimer(30);

  const switchTab = (tab) => {
    setActiveTab(tab);
    dispatch(clearAuthError());
  };

  const handleRememberChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      loginUser({ email, password, rememberMe })
    );
    if (loginUser.fulfilled.match(result)) {
      navigate(getPostLoginRoute(result.payload.user, location.state?.from?.pathname), {
        replace: true,
      });
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      sendOtpThunk({ countryCode, phone })
    );
    if (sendOtpThunk.fulfilled.match(result)) {
      startResend();
      setTimeout(focusFirst, 100);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = getValues() || otpValues.join('');
    const result = await dispatch(verifyOtpThunk({ countryCode, phone, otp }));
    if (verifyOtpThunk.fulfilled.match(result)) {
      navigate(getPostLoginRoute(result.payload.user, location.state?.from?.pathname), {
        replace: true,
      });
    }
  };

  const onOtpChange = useCallback((index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setOtpValues((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    handleChange(index, digit);
  }, [handleChange]);

  return (
    <>
      <div className="visual-panel">
        <div className="vp-gradient-orb-1" />
        <div className="vp-gradient-orb-2" />
        <VisualPanelOrnament />

        <div className="vp-top">
          <div className="vp-logo">
            <div className="logo-mark">♥</div>
            <span className="logo-text">
              Shadi<span>Sampanna</span>
            </span>
          </div>
        </div>

        <div className="vp-middle">
          <h1 className="vp-headline">
            Begin your<br />
            journey to<br />
            <em>forever love</em>
          </h1>
          <p className="vp-subtext">
            Join millions of families who found their perfect match through our
            trusted, verified platform built on Indian values.
          </p>
          <div className="float-cards">
            <div className="float-card">
              <div className="fc-avatar fc-av1">👩</div>
              <div className="fc-info">
                <div className="fc-name">Kavya · 26 · CA</div>
                <div className="fc-detail">Chennai · Tamil Brahmin · Verified ✓</div>
              </div>
              <div className="fc-match">94% Match</div>
            </div>
            <div className="float-card">
              <div className="fc-avatar fc-av2">👨</div>
              <div className="fc-info">
                <div className="fc-name">Arjun · 30 · IIT Engineer</div>
                <div className="fc-detail">Bangalore · Gujarati · Premium 💎</div>
              </div>
              <div className="fc-match">91% Match</div>
            </div>
            <div className="float-card">
              <div className="fc-avatar fc-av3">👩</div>
              <div className="fc-info">
                <div className="fc-name">Sneha · 27 · Doctor</div>
                <div className="fc-detail">Mumbai · Punjabi · AIIMS Graduate</div>
              </div>
              <div className="fc-match">88% Match</div>
            </div>
          </div>
        </div>

        <div className="vp-bottom">
          <div className="vp-stats">
            <div>
              <div className="vp-stat-num">3.2M+</div>
              <div className="vp-stat-label">Marriages Made</div>
            </div>
            <div className="vp-stat-divider" />
            <div>
              <div className="vp-stat-num">47L+</div>
              <div className="vp-stat-label">Active Profiles</div>
            </div>
            <div className="vp-stat-divider" />
            <div>
              <div className="vp-stat-num">98%</div>
              <div className="vp-stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-panel">
        <div className="form-container">
          <div className="form-welcome">
            <div className="welcome-emoji">🙏</div>
            <h1 className="form-title">
              Welcome<br />
              <em>back</em>
            </h1>
            <p className="form-subtitle">
              Sign in to continue your journey to finding the perfect life partner.
            </p>
          </div>

          <div className="tab-switcher">
            <button
              type="button"
              className={`tab-btn${activeTab === 'email' ? ' on' : ''}`}
              onClick={() => switchTab('email')}
            >
              📧 Email / ID
            </button>
            <button
              type="button"
              className={`tab-btn${activeTab === 'phone' ? ' on' : ''}`}
              onClick={() => switchTab('phone')}
            >
              📱 Mobile OTP
            </button>
          </div>

          <div className="social-row">
            <button type="button" className="social-btn">
              <span className="social-icon">G</span> Google
            </button>
            <button type="button" className="social-btn">
              <span className="social-icon">F</span> Facebook
            </button>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <div className="divider-text">or continue with</div>
            <div className="divider-line" />
          </div>

          {error && (
            <p style={{ color: 'var(--rose)', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>
              {error}
            </p>
          )}

          {activeTab === 'email' ? (
            <form id="emailForm" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address or Shadi Sampanna ID
                </label>
                <div className="input-wrap">
                  <div className="input-icon">📧</div>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com or SHG1234567"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pwdInput">
                  Password
                </label>
                <div className="input-wrap">
                  <div className="input-icon">🔒</div>
                  <input
                    id="pwdInput"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="input-suffix"
                    onClick={() => setShowPassword((p) => !p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowPassword((p) => !p)}
                  >
                    👁️
                  </div>
                </div>
              </div>

              <div className="remember-row">
                <label className="remember-check">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberChange}
                  />
                  <div className="custom-cb">{rememberMe ? '✓' : ''}</div>
                  <span className="remember-label">Remember me</span>
                </label>
                <a className="forgot-link" href="#">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In to Shadi Sampanna ♥'}
              </button>
            </form>
          ) : (
            <form id="phoneForm" onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
              {!otpSent && (
                <>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <div className="phone-row">
                      <select
                        className="country-code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <div className="input-wrap phone-input">
                        <div className="input-icon">📱</div>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="Enter 10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="submit-btn" disabled={otpLoading}>
                    {otpLoading ? 'Sending...' : 'Send OTP →'}
                  </button>
                </>
              )}

              {otpSent && (
                <div className="otp-section" style={{ display: 'block' }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                      Enter the 6-digit OTP sent to
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark)' }}>
                      {maskedPhone}
                    </div>
                  </div>
                  <div className="otp-inputs">
                    {otpValues.map((val, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          inputsRef.current[idx] = el;
                        }}
                        className="otp-input"
                        maxLength={1}
                        type="text"
                        inputMode="numeric"
                        value={val}
                        onChange={(e) => onOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                      />
                    ))}
                  </div>
                  <div className="resend-row">
                    Didn&apos;t receive?{' '}
                    <span
                      className="resend-link"
                      style={{
                        color: canResend ? 'var(--rose)' : undefined,
                        cursor: canResend ? 'pointer' : undefined,
                      }}
                      onClick={canResend ? () => dispatch(sendOtpThunk({ countryCode, phone })) : undefined}
                      role="button"
                      tabIndex={0}
                    >
                      {resendLabel}
                    </span>
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP & Sign In ✓'}
                  </button>
                </div>
              )}
            </form>
          )}

          <p className="form-footer-text">
            New to Shadi Sampanna?{' '}
            <Link to={ROUTES.REGISTER}>Create your free profile →</Link>
          </p>

          <p className="terms-text">
            By signing in, you agree to our <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>. Your data is fully encrypted and never shared.
          </p>

          <div className="trust-badges">
            <div className="tb">🔒 SSL Secured</div>
            <div className="tb">✓ ISO Certified</div>
            <div className="tb">🛡️ DPDP Compliant</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
