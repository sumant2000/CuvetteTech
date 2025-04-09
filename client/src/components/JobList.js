import React from 'react';
import JobCard from './JobCard';
import '../styles/JobList.css';

const JobList = ({ jobs, onEdit, onDelete, onUpdateStatus }) => {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No job applications found</h3>
        <p>Add your first job application to start tracking!</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map(job => (
        <JobCard
          key={job._id}
          job={job}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default JobList;
