import React from 'react';
import { FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/JobCard.css';

const JobCard = ({ job, onEdit, onDelete, onUpdateStatus }) => {
  const formattedDate = new Date(job.appliedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'var(--color-applied)';
      case 'Interview': return 'var(--color-interview)';
      case 'Offer': return 'var(--color-offer)';
      case 'Rejected': return 'var(--color-rejected)';
      default: return '#777';
    }
  };
  
  const handleStatusChange = (e) => {
    onUpdateStatus(job._id, { ...job, status: e.target.value });
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-company">{job.company}</div>
        <div className="job-actions">
          <button 
            className="btn btn-icon" 
            onClick={() => onEdit(job)} 
            title="Edit job"
          >
            <FaEdit />
          </button>
          <button 
            className="btn btn-icon btn-danger" 
            onClick={() => onDelete(job._id)} 
            title="Delete job"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <h3 className="job-role">{job.role}</h3>
      
      <div className="job-details">
        <div className="job-detail">
          <span className="label">Applied:</span> {formattedDate}
        </div>
        
        <div className="job-detail status-selector">
          <span className="label">Status:</span>
          <select 
            value={job.status}
            onChange={handleStatusChange}
            style={{ color: getStatusColor(job.status) }}
            className="status-select"
          >
            <option value="Applied" style={{ color: getStatusColor('Applied') }}>Applied</option>
            <option value="Interview" style={{ color: getStatusColor('Interview') }}>Interview</option>
            <option value="Offer" style={{ color: getStatusColor('Offer') }}>Offer</option>
            <option value="Rejected" style={{ color: getStatusColor('Rejected') }}>Rejected</option>
          </select>
        </div>
      </div>
      
      {job.link && (
        <a href={job.link} target="_blank" rel="noopener noreferrer" className="job-link">
          View Job <FaExternalLinkAlt />
        </a>
      )}
    </div>
  );
};

export default JobCard;
