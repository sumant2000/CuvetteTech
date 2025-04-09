const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Get all jobs with optional filters
router.get('/', jobController.getAllJobs);

// Create a new job
router.post('/', jobController.createJob);

// Get a job by ID
router.get('/:id', jobController.getJobById);

// Update a job
router.put('/:id', jobController.updateJob);

// Delete a job
router.delete('/:id', jobController.deleteJob);

module.exports = router;
