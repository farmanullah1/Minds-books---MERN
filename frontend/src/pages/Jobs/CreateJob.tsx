import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './CreateJob.css';

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'Technology',
    type: 'Full-time',
    salaryRange: { min: 0, max: 0, currency: 'USD' },
    requirements: [''],
    isRemote: false,
    deadline: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/jobs', {
        ...formData,
        requirements: formData.requirements.filter(r => r.trim() !== '')
      });
      navigate('/jobs');
    } catch (err) {
      console.error('Failed to create job', err);
    }
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newReqs = [...formData.requirements];
    newReqs[index] = value;
    setFormData({ ...formData, requirements: newReqs });
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    const newReqs = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newReqs });
  };

  return (
    <div className="create-job-container">
      <div className="create-job-card">
        <h2>Post a New Job</h2>
        <p>Fill in the details to find your next great hire</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Senior Frontend Developer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <div className="input-with-icon">
              <FiMapPin />
              <input 
                type="text" 
                required 
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="isRemote" 
                checked={formData.isRemote}
                onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
              />
              <label htmlFor="isRemote">This is a remote position</label>
            </div>
          </div>

          <div className="form-group">
            <label>Salary Range (Annual k)</label>
            <div className="salary-inputs">
              <div className="input-with-icon">
                <FiDollarSign />
                <input 
                  type="number" 
                  placeholder="Min"
                  value={formData.salaryRange.min}
                  onChange={(e) => setFormData({ ...formData, salaryRange: { ...formData.salaryRange, min: parseInt(e.target.value) } })}
                />
              </div>
              <span>to</span>
              <div className="input-with-icon">
                <FiDollarSign />
                <input 
                  type="number" 
                  placeholder="Max"
                  value={formData.salaryRange.max}
                  onChange={(e) => setFormData({ ...formData, salaryRange: { ...formData.salaryRange, max: parseInt(e.target.value) } })}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              required 
              rows={6}
              placeholder="Describe the role, responsibilities, and company culture..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Requirements</label>
            {formData.requirements.map((req, idx) => (
              <div key={idx} className="requirement-input">
                <input 
                  type="text" 
                  placeholder="e.g. 5+ years of React experience"
                  value={req}
                  onChange={(e) => handleRequirementChange(idx, e.target.value)}
                />
                <button type="button" onClick={() => removeRequirement(idx)}><FiTrash2 /></button>
              </div>
            ))}
            <button type="button" className="btn-add-req" onClick={addRequirement}>
              <FiPlus /> Add Requirement
            </button>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/jobs')}>Cancel</button>
            <button type="submit" className="btn-primary">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
