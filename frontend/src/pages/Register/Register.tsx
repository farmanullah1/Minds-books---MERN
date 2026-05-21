import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser, clearError, updateUserInState } from '../../store/slices/authSlice';
import { FiEye, FiEyeOff, FiCheckCircle, FiChevronDown, FiChevronUp, FiCamera, FiImage, FiTrash2 } from 'react-icons/fi';
import PasswordStrengthMeter from '../../components/ui/PasswordStrengthMeter';
import ProfilePicModal from '../../components/Profile/ProfilePicModal';
import Navbar from '../../components/Navbar/Navbar';
import api from '../../services/api';
import './Auth.css';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  // Core registration states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  // Accordion details state
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  // Photo uploads state (during registration)
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [profilePicBlob, setProfilePicBlob] = useState<Blob | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [coverPhotoBlob, setCoverPhotoBlob] = useState<Blob | null>(null);

  // Modals visibility states
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [showCoverPhotoModal, setShowCoverPhotoModal] = useState(false);

  // Upload progress message states
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const calculatePasswordScore = (pass: string): number => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++; // standard visual score
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return Math.min(score, 5);
  };

  const passwordScore = calculatePasswordScore(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!firstName.trim() || !lastName.trim()) {
      setLocalError('First name and last name are required');
      return;
    }

    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      setLocalError('You must agree to both the Terms and Privacy Policy');
      return;
    }

    // 1. Dispatch standard registration details
    const result = await dispatch(registerUser({
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      password,
      ...(gender && { gender }),
      ...(birthdate && { birthdate }),
    }));

    if (registerUser.fulfilled.match(result)) {
      // 2. Successful registration sets token in session/cookies. 
      // If user selected profile pic or cover photo locally, upload them immediately now!
      if (profilePicBlob || coverPhotoBlob) {
        setUploadingPhotos(true);
        try {
          if (profilePicBlob) {
            setUploadStatus('Uploading profile picture...');
            const formData = new FormData();
            formData.append('profilePicture', profilePicBlob, 'profile.webp');
            const res = await api.post('/users/upload-profile-pic', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            const picUrl = res.data.profilePicture;
            dispatch(updateUserInState({ profilePicture: picUrl }));
          }

          if (coverPhotoBlob) {
            setUploadStatus('Uploading cover photo...');
            const formData = new FormData();
            formData.append('coverPhoto', coverPhotoBlob, 'cover.webp');
            const res = await api.post('/users/upload-cover-photo', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            const coverUrl = res.data.coverPhoto;
            dispatch(updateUserInState({ coverPicture: coverUrl }));
          }
        } catch (photoErr: any) {
          console.error('Error uploading registration photos:', photoErr);
          setLocalError('Account created, but photo uploads failed. You can configure them in Settings later.');
        } finally {
          setUploadingPhotos(false);
        }
      }

      setSuccess(true);
      setTimeout(() => navigate('/'), 2000); // Redirect directly to main feed dashboard since they are logged in!
    }
  };

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    password.length >= 8 &&
    confirmPassword &&
    password === confirmPassword &&
    agreeTerms &&
    agreePrivacy;

  return (
    <div className="auth-page">
      {/* Navbar Integration */}
      <Navbar />

      {/* Animated background blobs */}
      <div className="auth-bg-blob blob-1" />
      <div className="auth-bg-blob blob-2" />
      <div className="auth-bg-blob blob-3" />
      <div className="auth-container">
        {/* Branding Section */}
        <div className="auth-branding-center">
          <div className="auth-logo-large">
            <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F7B928" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="20" fill="url(#logoGrad)" />
              <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">M</text>
            </svg>
            <h1 className="auth-title-large">MindBook</h1>
          </div>
          <p className="auth-tagline-center">
            Join the most vibrant community on the web.
          </p>
        </div>

        {/* Register Card */}
        <div className="auth-card-glass">
          {success ? (
            <div className="auth-success" style={{ textAlign: 'center', padding: '40px 0' }}>
              <FiCheckCircle size={64} color="var(--success)" style={{ marginBottom: '20px' }} />
              <h2>Welcome Aboard!</h2>
              <p>Your account has been created successfully.</p>
              <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>Redirecting to home...</p>
            </div>
          ) : (
            <>
              <div className="auth-card-header">
                <h2>Create Account</h2>
                <p>It's quick, easy, and always will be.</p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {(error || localError) && (
                  <div className="auth-error">{error || localError}</div>
                )}

                {uploadingPhotos && (
                  <div className="auth-success" style={{ padding: '8px 12px', fontSize: '14px', marginBottom: '8px' }}>
                    {uploadStatus}
                  </div>
                )}

                <div className="input-row">
                  <div className="input-group">
                    <input
                      type="text"
                      className="input-field-modern"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={loading || uploadingPhotos}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="input-field-modern"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      disabled={loading || uploadingPhotos}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    className="input-field-modern"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={loading || uploadingPhotos}
                  />
                </div>

                <div className="input-group">
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-field-modern"
                      placeholder="New password (8+ characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      disabled={loading || uploadingPhotos}
                    />
                    <button
                      type="button"
                      className="pw-eye-modern"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading || uploadingPhotos}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <PasswordStrengthMeter score={passwordScore} password={password} />
                  )}
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    className="input-field-modern"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading || uploadingPhotos}
                  />
                </div>

                {/* ── DETAILS ACCORDION PANEL ──────────────────────────────── */}
                <div className={`details-accordion ${detailsExpanded ? 'expanded' : ''}`}>
                  <button
                    type="button"
                    className="accordion-trigger"
                    onClick={() => setDetailsExpanded(!detailsExpanded)}
                  >
                    <span>Optional Personal Details</span>
                    {detailsExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                  </button>

                  <AnimatePresence initial={false}>
                    {detailsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="accordion-content">
                          <div className="input-row">
                            <div className="input-group">
                              <select
                                className="input-field-modern"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                disabled={loading || uploadingPhotos}
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                              </select>
                            </div>
                            <div className="input-group">
                              <input
                                type="date"
                                className="input-field-modern"
                                placeholder="Date of birth"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                disabled={loading || uploadingPhotos}
                              />
                            </div>
                          </div>

                          {/* Profile & Cover Selection Cache previews */}
                          <div className="photo-selectors-row">
                            <div className="photo-selector-box">
                              <label>Profile Pic</label>
                              <div
                                className="preview-circle-container"
                                onClick={() => setShowProfilePicModal(true)}
                              >
                                {profilePicPreview ? (
                                  <>
                                    <img src={profilePicPreview} alt="Profile Cache Preview" />
                                    <div className="remove-photo-overlay">
                                      <FiCamera size={14} style={{ marginRight: '4px' }} /> Edit
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setProfilePicPreview(null);
                                        setProfilePicBlob(null);
                                      }}
                                      style={{ position: 'absolute', top: 0, right: 0, background: 'var(--danger)', padding: '2px', borderBottomLeftRadius: '5px', zIndex: 10 }}
                                      aria-label="Remove profile pic"
                                    >
                                      <FiTrash2 size={10} color="#fff" />
                                    </button>
                                  </>
                                ) : (
                                  <div className="upload-btn-placeholder">
                                    <FiCamera size={20} />
                                    <span>Add</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="photo-selector-box">
                              <label>Cover Photo</label>
                              <div
                                className="preview-rect-container"
                                onClick={() => setShowCoverPhotoModal(true)}
                              >
                                {coverPhotoPreview ? (
                                  <>
                                    <img src={coverPhotoPreview} alt="Cover Cache Preview" />
                                    <div className="remove-photo-overlay">
                                      <FiImage size={14} style={{ marginRight: '4px' }} /> Edit
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCoverPhotoPreview(null);
                                        setCoverPhotoBlob(null);
                                      }}
                                      style={{ position: 'absolute', top: 0, right: 0, background: 'var(--danger)', padding: '2px', borderBottomLeftRadius: '5px', zIndex: 10 }}
                                      aria-label="Remove cover photo"
                                    >
                                      <FiTrash2 size={10} color="#fff" />
                                    </button>
                                  </>
                                ) : (
                                  <div className="upload-btn-placeholder">
                                    <FiImage size={20} />
                                    <span>Add</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="auth-legal-modern">
                  <p>By clicking Sign Up, you agree to our policies.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label className="auth-checkbox-modern">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      disabled={loading || uploadingPhotos}
                    />
                    <span>I agree to the <a href="#terms">Terms of Service</a></span>
                  </label>

                  <label className="auth-checkbox-modern">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      disabled={loading || uploadingPhotos}
                    />
                    <span>I agree to the <a href="#privacy">Privacy & Data Policy</a></span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="auth-btn-primary"
                  disabled={loading || uploadingPhotos || !isFormValid}
                  style={{ marginTop: '12px' }}
                >
                  {loading || uploadingPhotos ? 'Creating account...' : 'Sign Up'}
                </button>

                <div className="auth-footer-links">
                  <Link to="/login">Already have an account?</Link>
                </div>

                {/* VIP CREATOR ATTRIBUTION CREDIT CARD MOCKUP */}
                <div className="vip-creator-card">
                  <div className="vip-card-header">
                    <span className="vip-card-badge">MindBook VIP Creator</span>
                    <div className="vip-card-chip" />
                  </div>
                  <div className="vip-card-info">
                    <div className="vip-card-holder">
                      <span className="vip-card-label">Developer</span>
                      <span className="vip-card-name">Farmanullah Ansari</span>
                    </div>
                    <a
                      href="https://farmanullah1.github.io/My-Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vip-card-link"
                    >
                      My Portfolio
                    </a>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <footer className="auth-footer-brand">
        <p>MindBook © {new Date().getFullYear()}. Built for community.</p>
      </footer>

      {/* CROP MODALS */}
      <ProfilePicModal
        open={showProfilePicModal}
        onClose={() => setShowProfilePicModal(false)}
        type="profile"
        mode="signup"
        onSave={(_url, previewUrl, blob) => {
          if (previewUrl && blob) {
            setProfilePicPreview(previewUrl);
            setProfilePicBlob(blob);
          }
        }}
      />

      <ProfilePicModal
        open={showCoverPhotoModal}
        onClose={() => setShowCoverPhotoModal(false)}
        type="cover"
        mode="signup"
        onSave={(_url, previewUrl, blob) => {
          if (previewUrl && blob) {
            setCoverPhotoPreview(previewUrl);
            setCoverPhotoBlob(blob);
          }
        }}
      />
    </div>
  );
};

export default Register;
