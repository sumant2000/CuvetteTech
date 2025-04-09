import axios from 'axios';

// Use the Railway backend URL in production or default to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'https://web-production-aceaa.up.railway.app/api';

// For local development, uncomment this line and comment the one above
// const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all jobs with optional filters
export const getJobs = async (filters = {}) => {
  try {
    const params = {};
    
    if (filters.status) {
      params.status = filters.status;
    }
    
    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
      params.sortOrder = filters.sortOrder || 'asc';
    }
    
    const response = await api.get('/jobs', { params });
    return response.data;
  } catch (error) {
    // More detailed error handling
    console.error('Error fetching jobs:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Get a specific job by ID
export const getJobById = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await api.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// Update a job
export const updateJob = async (id, jobData) => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id) => {
  try {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};
