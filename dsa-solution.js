/**
 * Solution for Problem 1: Job Tracker Sorting
 * 
 * Task: Sort jobs by appliedDate (latest first)
 * 
 * Time Complexity: O(n log n) - due to the sorting operation
 * Space Complexity: O(1) - sorting is done in-place
 */
function sortJobsByDate(jobs) {
  // Sort jobs by appliedDate in descending order (newest first)
  return jobs.sort((a, b) => {
    const dateA = new Date(a.appliedDate);
    const dateB = new Date(b.appliedDate);
    return dateB - dateA;
  });
}

/**
 * Solution for Problem 2: Status Frequency Counter
 * 
 * Task: Count the frequency of each status in job applications
 * 
 * Time Complexity: O(n) - where n is the number of jobs
 * Space Complexity: O(1) - since there are only a fixed number of possible statuses
 */
function countStatusFrequency(jobs) {
  const statusCount = {
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0
  };
  
  // Iterate through each job and count the occurrences of each status
  for (const job of jobs) {
    if (statusCount.hasOwnProperty(job.status)) {
      statusCount[job.status]++;
    }
  }
  
  return statusCount;
}

/**
 * Solution for Problem 3: Detect Duplicate Applications
 * 
 * Task: Find duplicate applications based on company + role (case insensitive)
 * 
 * Time Complexity: O(n) - where n is the number of jobs
 * Space Complexity: O(n) - in worst case, we store all jobs in the set
 */
function findDuplicateApplications(jobs) {
  const seen = new Set();
  const duplicates = [];
  
  for (const job of jobs) {
    // Create a key by combining company and role (in lowercase)
    const key = `${job.company.toLowerCase()}-${job.role.toLowerCase()}`;
    
    // If we've seen this combination before, it's a duplicate
    if (seen.has(key)) {
      duplicates.push(job);
    } else {
      seen.add(key);
    }
  }
  
  return duplicates;
}

// Example usage
const jobs = [
  {
    company: "Google",
    role: "SDE Intern",
    status: "Applied",
    appliedDate: "2025-03-15"
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    status: "Interview",
    appliedDate: "2025-04-01"
  },
  {
    company: "Amazon",
    role: "Frontend Developer",
    status: "Rejected",
    appliedDate: "2025-02-20"
  },
  {
    company: "Google",
    role: "sde intern", // This is a duplicate of the first entry (case-insensitive)
    status: "Interview",
    appliedDate: "2025-03-20"
  }
];

console.log("Sorted Jobs by Date (Newest First):");
console.log(sortJobsByDate([...jobs]));

console.log("\nStatus Frequency Count:");
console.log(countStatusFrequency(jobs));

console.log("\nDuplicate Applications:");
console.log(findDuplicateApplications(jobs));
