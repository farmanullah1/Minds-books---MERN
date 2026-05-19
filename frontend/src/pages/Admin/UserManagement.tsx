import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './AdminDashboard.css';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const payload = { status: newStatus, durationDays: newStatus === 'suspended' ? 7 : undefined };
      const res = await api.put(`/admin/users/${userId}/status`, payload);
      setUsers(users.map(u => u._id === userId ? { ...u, status: res.data.user.status } : u));
    } catch (err: any) {
      console.error('Failed to change status', err);
      alert(err.response?.data?.message || 'Failed to change status');
    }
  };

  if (loading) return <div className="admin-loading">Loading users...</div>;

  return (
    <div className="user-management">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Reports</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {u.profilePicture ? (
                    <img src={u.profilePicture} alt="avatar" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                  ) : (
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{u.name[0]}</div>
                  )}
                  {u.name}
                </div>
              </td>
              <td>{u.email}</td>
              <td><span className={`badge badge-${u.role === 'admin' ? 'high' : 'low'}`}>{u.role}</span></td>
              <td>
                <select 
                  value={u.status} 
                  onChange={(e) => handleStatusChange(u._id, e.target.value)}
                  className="status-select"
                  disabled={u.role === 'admin'}
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended (7 days)</option>
                  <option value="banned">Banned</option>
                </select>
              </td>
              <td>{u.reportCount || 0}</td>
              <td className="actions-cell">
                <button className="btn-sm btn-secondary" onClick={() => window.open(`/profile/${u._id}`, '_blank')}>View Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
