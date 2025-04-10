// jobSorter.js

/**
 * Sorts an array of job applications by appliedDate (latest first)
 * @param {Array} jobs - Array of job application objects
 * @returns {Array} Sorted array by appliedDate (latest first)
 */
function sortJobsByDate(jobs) {
    return jobs.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  }
  
  // Example usage:
  const jobApplications = [
    { company: "Google", role: "SDE Intern", appliedDate: "2025-04-01" },
    { company: "Amazon", role: "Backend Engineer", appliedDate: "2025-03-29" },
    { company: "Microsoft", role: "AI Research Intern", appliedDate: "2025-04-05" },
    { company: "Meta", role: "Frontend Developer", appliedDate: "2025-04-02" },
  ];
  
  const sortedJobs = sortJobsByDate(jobApplications);
  
  console.log("Sorted Job Applications:");
  console.log(sortedJobs);