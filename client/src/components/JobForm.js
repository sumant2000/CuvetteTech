import React, { useState, useEffect } from 'react';
import '../styles/JobForm.css';

const JobForm = ({ onSubmit, initialData, jobId }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    link: ''
  });
  
  const [errors, setErrors] = useState({});

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        appliedDate: new Date(initialData.appliedDate).toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Job role is required';
    }
    
    if (!formData.appliedDate) {
      newErrors.appliedDate = 'Application date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (jobId) {
      onSubmit(jobId, formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="job-form-container">
      <h2>{initialData ? 'Edit Job Application' : 'Add New Job Application'}</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="company">Company Name*</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'error' : ''}
          />
          {errors.company && <div className="error-message">{errors.company}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Job Role*</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? 'error' : ''}
          />
          {errors.role && <div className="error-message">{errors.role}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status*</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="appliedDate">Date Applied*</label>
          <input
            type="date"
            id="appliedDate"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            className={errors.appliedDate ? 'error' : ''}
          />
          {errors.appliedDate && <div className="error-message">{errors.appliedDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="link">Job Link</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update Job' : 'Add Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
