// duplicateDetector.js

/**
 * Detects duplicate job applications based on company + role (case-insensitive)
 * @param {Array} jobs - Array of job application objects
 * @returns {Boolean} true if duplicate exists, false otherwise
 */
function hasDuplicateApplications(jobs) {
    const seen = new Set();
  
    for (const job of jobs) {
      const key = `${job.company.toLowerCase()}-${job.role.toLowerCase()}`;
      if (seen.has(key)) {
        return true; // Duplicate found
      }
      seen.add(key);
    }
  
    return false; // No duplicates
  }
  
  // Example usage:
  const jobApplications = [
    { company: "Google", role: "SDE Intern" },
    { company: "Amazon", role: "Backend Engineer" },
    { company: "google", role: "sde intern" }, // Duplicate (case-insensitive)
    { company: "Meta", role: "AI Researcher" }
  ];
  
  const hasDuplicates = hasDuplicateApplications(jobApplications);
  
  console.log("Has Duplicates?", hasDuplicates); // true