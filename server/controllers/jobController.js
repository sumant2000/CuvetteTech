const Job = require('../models/Job');

// Get all jobs with optional filters
exports.getAllJobs = async (req, res) => {
  try {
    const { status, sortBy, sortOrder } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions = { appliedDate: -1 }; // Default: newest first
    }
    
    const jobs = await Job.find(query).sort(sortOptions);
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error getting jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Error getting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
