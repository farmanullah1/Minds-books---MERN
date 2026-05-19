import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './AdminDashboard.css';

const ModerationQueue: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/reports?status=Pending');
      setReports(res.data.reports || []);
    } catch (err) {
      console.error('Failed to load reports', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id: string, action: string) => {
    try {
      await api.put(`/admin/reports/${id}/resolve`, {
        status: action === 'Dismiss' ? 'Dismissed' : 'Action Taken',
        actionTaken: action
      });
      // Remove from pending list
      setReports(reports.filter(r => r._id !== id));
    } catch (err) {
      console.error('Failed to resolve report', err);
      alert('Failed to resolve report');
    }
  };

  if (loading) return <div className="admin-loading">Loading moderation queue...</div>;

  return (
    <div className="moderation-queue">
      {reports.length === 0 ? (
        <div className="empty-state">No pending reports to review! 🎉</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Priority</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Reporter</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>
                  <span className={`badge badge-${report.priority.toLowerCase()}`}>
                    {report.priority}
                  </span>
                </td>
                <td>{report.targetType}</td>
                <td>
                  <strong>{report.reason}</strong>
                  {report.details && <p className="report-details-small">{report.details}</p>}
                </td>
                <td>{report.reporter?.name || 'Unknown'}</td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button className="btn-sm btn-secondary" onClick={() => handleResolve(report._id, 'Dismiss')}>Dismiss</button>
                  <button className="btn-sm btn-danger" onClick={() => handleResolve(report._id, 'Content Removed')}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ModerationQueue;
