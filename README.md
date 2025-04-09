# Student Job Tracker - MERN Stack Application

A full-stack web application to help students track their job applications. Built with MongoDB, Express.js, React, and Node.js.

## Features

- Add new job applications with company, role, status, date, and link
- List all applications with responsive layout
- Filter applications by status or date
- Update application status
- Delete job applications

## Tech Stack

- **Frontend**: React with Hooks
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

## Live Demo

- Frontend: [Vercel Link]
- Backend: [Render Link]

## Project Structure

```
student-job-tracker/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # React components
│       ├── services/     # API services
│       └── styles/       # CSS files
└── server/               # Express backend
    ├── controllers/      # Route controllers
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    └── config/           # Configuration files
```

## Local Development

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

## Running the Application

If you're already in the client directory (`/Users/sumantkhapre/Downloads/project/Covette/client`), you can run the frontend with these commands:

```bash
# Make sure you have Node.js installed
# Install dependencies (if not done already)
npm install

# Start the development server - use 'start' not 'dev'
npm start
```

The React application should open automatically in your browser at http://localhost:3000.

**Note:** For the application to work properly, you'll also need to start the backend server. Open a new terminal and run:

```bash
# Navigate to server directory from project root
cd ../server

# Install dependencies (if not done already)
npm install

# Start the server
npm run dev  # Or check package.json for the correct script name
```

The backend API should start on http://localhost:5000 (or your configured port).

## Troubleshooting

If you encounter the error "Could not find a required file. Name: index.html", make sure the public directory contains all necessary files:
- Check that `/client/public/index.html` exists
- If missing, create it with the proper HTML5 structure including a div with id="root"
- You may also need to create favicon.ico, manifest.json, and other public assets

## DSA Problem Solution

The solution for the chosen DSA problem is located in the `dsa-solution.js` file.

## Video Walkthrough

[Link to video walkthrough]

## AI Tools Usage

- Used GitHub Copilot for boilerplate code generation
- Used ChatGPT for debugging and optimization suggestions
- Made manual changes to improve error handling and UI/UX
