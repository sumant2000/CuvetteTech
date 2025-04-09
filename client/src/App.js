import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import FilterBar from './components/FilterBar';
import { getJobs, createJob, updateJob, deleteJob } from './services/api';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    sortBy: 'appliedDate',
    sortOrder: 'desc'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await getJobs(filters);
      setJobs(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  // Add a new job
  const handleAddJob = async (jobData) => {
    try {
      setIsLoading(true);
      const newJob = await createJob(jobData);
      setJobs([newJob, ...jobs]);
      setIsFormOpen(false);
      setError('');
    } catch (err) {
      setError('Failed to add job. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update a job
  const handleUpdateJob = async (id, jobData) => {
    try {
      setIsLoading(true);
      const updatedJob = await updateJob(id, jobData);
      setJobs(jobs.map(job => job._id === id ? updatedJob : job));
      setCurrentJob(null);
      setIsFormOpen(false);
      setError('');
    } catch (err) {
      setError('Failed to update job. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a job
  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      await deleteJob(id);
      setJobs(jobs.filter(job => job._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete job. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit a job (open form with job data)
  const handleEditJob = (job) => {
    setCurrentJob(job);
    setIsFormOpen(true);
  };

  // Apply filters
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (isFormOpen) {
      setCurrentJob(null);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <div className="actions">
          <button 
            className="btn btn-primary" 
            onClick={toggleForm}
          >
            {isFormOpen ? 'Close Form' : 'Add New Job'}
          </button>
          
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        {isFormOpen && (
          <JobForm 
            onSubmit={currentJob ? handleUpdateJob : handleAddJob} 
            initialData={currentJob}
            jobId={currentJob?._id}
          />
        )}

        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <JobList 
            jobs={jobs} 
            onEdit={handleEditJob} 
            onDelete={handleDeleteJob} 
            onUpdateStatus={handleUpdateJob}
          />
        )}
      </main>
    </div>
  );
}

export default App;
