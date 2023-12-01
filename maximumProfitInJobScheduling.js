class Job {
    constructor(start, end, profit) {
        this.start = start;
        this.end = end;
        this.profit = profit;
    }
}

/**
 * Function to find the index of the latest job that doesn't conflict with the current job
 * @param {Job[]} jobs - Array of jobs
 * @param {number} currentIndex - Index of the current job
 * @returns {number} - Index of the non-conflicting job
 */
function binarySearch(jobs, currentIndex) {
    let low = 0,
        high = currentIndex - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (jobs[mid].end <= jobs[currentIndex].start) {
            if (jobs[mid + 1].end <= jobs[currentIndex].start) {
                low = mid + 1;
            } else {
                return mid;
            }
        } else {
            high = mid - 1;
        }
    }

    return -1;
}

/**
 * Function to find the maximum profit for the given jobs
 * @param {Job[]} jobs - Array of jobs
 * @returns {number} - Maximum profit
 */
function jobScheduling(jobs) {
    // Sort jobs based on their end times
    jobs.sort((a, b) => a.end - b.end);

    // Initialize an array to store the maximum profit at each index
    const dp = new Array(jobs.length);
    dp[0] = jobs[0].profit;

    // Dynamic programming to calculate the maximum profit for each job
    for (let i = 1; i < jobs.length; i++) {
        // Find the index of the latest non-conflicting job
        const nonConflictingJobIndex = binarySearch(jobs, i);

        // Calculate the maximum profit including the current job or excluding it
        const includeCurrentJob =
            nonConflictingJobIndex !== -1
                ? dp[nonConflictingJobIndex] + jobs[i].profit
                : jobs[i].profit;

        const excludeCurrentJob = dp[i - 1];

        // Update the maximum profit for the current job
        dp[i] = Math.max(includeCurrentJob, excludeCurrentJob);
    }

    // The last element in the dp array contains the maximum profit
    return dp[jobs.length - 1];
}

// Example usage:
const jobs = [
    new Job(1, 3, 5),
    new Job(2, 5, 6),
    new Job(6, 9, 8),
    new Job(3, 8, 7),
];

const maxProfit = jobScheduling(jobs);
console.log("Maximum Profit:", maxProfit);
