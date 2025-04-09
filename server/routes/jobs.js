const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the job
 *         company:
 *           type: string
 *           description: Company name
 *         position:
 *           type: string
 *           description: Job position/title
 *         status:
 *           type: string
 *           description: Job application status
 *           enum: [pending, interview, rejected, offered]
 *           default: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date the job was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date the job was last updated
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     description: Retrieve a list of all jobs with optional filtering
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by job status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */

// Get all jobs with optional filters
router.get('/', jobController.getAllJobs);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     description: Add a new job to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 */

// Create a new job
router.post('/', jobController.createJob);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *   put:
 *     summary: Update a job
 *   delete:
 *     summary: Delete a job
 */

// Get a job by ID
router.get('/:id', jobController.getJobById);

// Update a job
router.put('/:id', jobController.updateJob);

// Delete a job
router.delete('/:id', jobController.deleteJob);

module.exports = router;
