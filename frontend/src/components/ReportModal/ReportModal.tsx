import React, { useState } from 'react';
import { FiX, FiAlertTriangle } from 'react-icons/fi';
import api from '../../services/api';
import './ReportModal.css';

interface ReportModalProps {
  targetId: string;
  targetType: 'Post' | 'User' | 'Comment' | 'Message' | 'Group';
  onClose: () => void;
}

const REPORT_REASONS = [
  'Spam',
  'Nudity',
  'Violence',
  'Harassment',
  'Hate Speech',
  'Misinformation',
  'Self-harm',
  'Copyright',
  'Fake account',
  'Impersonation',
  'Underage user',
  'Other'
];

const ReportModal: React.FC<ReportModalProps> = ({ targetId, targetType, onClose }) => {
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/reports', {
        targetId,
        targetType,
        reason,
        details
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit report');
      setLoading(false);
    }
  };

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal-content" onClick={e => e.stopPropagation()}>
        <div className="report-modal-header">
          <h2><FiAlertTriangle size={20} color="var(--danger)" /> Report {targetType}</h2>
          <button className="icon-btn" onClick={onClose}><FiX size={20} /></button>
        </div>

        {success ? (
          <div className="report-modal-success">
            <div className="success-icon">✓</div>
            <h3>Report Submitted</h3>
            <p>Thank you for helping keep MindBook safe. Our moderation team will review this shortly.</p>
          </div>
        ) : (
          <form className="report-modal-form" onSubmit={handleSubmit}>
            <p className="report-modal-desc">
              Please select a reason for reporting this {targetType.toLowerCase()}.
            </p>
            
            {error && <div className="report-modal-error">{error}</div>}

            <div className="input-group">
              <label>Reason</label>
              <select value={reason} onChange={e => setReason(e.target.value)} className="input-field-modern">
                {REPORT_REASONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Additional Details (Optional)</label>
              <textarea 
                placeholder="Provide more context to help us understand the issue..."
                value={details}
                onChange={e => setDetails(e.target.value)}
                className="input-field-modern"
                rows={4}
                maxLength={500}
              />
              <span className="char-count">{details.length}/500</span>
            </div>

            <div className="report-modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn-danger" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportModal;
