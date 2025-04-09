require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001 as default

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Tracker API',
      version: '1.0.0',
      description: 'API documentation for the Job Tracker application',
      contact: {
        name: 'Sumant Khapre',
        url: 'https://github.com/sumant2000/CuvetteTech'
      }
    },
    servers: [
      {
        url: 'https://web-production-aceaa.up.railway.app/api',
        description: 'Production server'
      },
      {
        url: 'http://localhost:5001/api',
        description: 'Local development server'
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js'] // Path to the API routes and models
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api/jobs', jobRoutes);

// Add a health check endpoint for Railway
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Root route redirects to API docs
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.log('❌ MongoDB Connection Error:');
    if (error.name === 'MongoParseError') {
      console.log('Invalid MongoDB connection string format. Please check your .env file and ensure you have a valid MongoDB URI.');
      console.log('The connection string should start with "mongodb://" or "mongodb+srv://"');
      console.log('\nExample format: mongodb+srv://username:password@cluster.mongodb.net/dbname');
    } else if (error.name === 'MongoNetworkError') {
      console.log('Network error connecting to MongoDB. Please check your internet connection and firewall settings.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('Connection refused. Make sure your MongoDB server is running and accessible.');
    } else if (error.message.includes('AuthenticationFailed')) {
      console.log('Authentication failed. Please verify your MongoDB username and password.');
    } else {
      console.log(`Detailed error: ${error.message}`);
    }
    console.log('\nPlease update your MONGODB_URI in the .env file with a valid connection string.');
  });

// Ensure we're using the PORT variable defined above
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
