// statusCounter.js

/**
 * Counts the frequency of each status in job applications
 * @param {Array} jobs - Array of job application objects with a 'status' field
 * @returns {Object} Status count object
 */
function countJobStatuses(jobs) {
    return jobs.reduce((acc, job) => {
      const status = job.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }
  
  // Example usage:
  const jobApplications = [
    { company: "Google", status: "Applied" },
    { company: "Amazon", status: "Interview" },
    { company: "Meta", status: "Rejected" },
    { company: "Netflix", status: "Applied" },
    { company: "Apple", status: "Offer" },
    { company: "Microsoft", status: "Rejected" },
    { company: "Tesla", status: "Interview" },
    { company: "Spotify", status: "Applied" },
    { company: "Adobe", status: "Rejected" },
    { company: "Snapchat", status: "Applied" }
  ];
  
  const statusCounts = countJobStatuses(jobApplications);
  
  console.log("Status Frequency:");
  console.log(statusCounts);