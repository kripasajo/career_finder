// jobTrends.js
// Function to fetch and display job trends based on job title
function showJobTrends(jobTitle) {
    const trendsContainer = document.getElementById('jobTrendsContainer');
    trendsContainer.innerHTML = 'Loading job trends...';
    
    // Ensure trendsContainer is visible
    trendsContainer.style.display = 'block'; // Make sure it is visible

    // Simulating a successful response with mock data
    const mockData = {
        totalResults: 5000,
        results: [
            {
                jobtitle: "Backend Developer",
                company: "Tech Solutions",
                location: "Remote",
                estimatedSalary: {
                    minimum: 60000,
                    maximum: 90000
                }
            },
            {
                jobtitle: "Full Stack Engineer",
                company: "Innovate Inc.",
                location: "San Francisco, CA",
                estimatedSalary: {
                    minimum: 80000,
                    maximum: 120000
                }
            },
            {
                jobtitle: "Data Scientist",
                company: "AI Labs",
                location: "New York, NY",
                estimatedSalary: {
                    minimum: 95000,
                    maximum: 140000
                }
            }
        ]
    };

    // Simulate the API response handling
    const data = mockData;

    trendsContainer.innerHTML = `<h3>Job Trends for ${jobTitle}</h3>`;

    const jobCount = data.totalResults;
    const jobs = data.results;

    // Display job openings count
    const openings = document.createElement('p');
    openings.textContent = `Total Job Openings: ${jobCount}`;
    trendsContainer.appendChild(openings);

    // Display salary data if available
    const salaryData = jobs[0]?.estimatedSalary;
    if (salaryData) {
        const salaryInfo = document.createElement('p');
        salaryInfo.textContent = `Estimated Salary Range: ${salaryData.minimum} - ${salaryData.maximum}`;
        trendsContainer.appendChild(salaryInfo);
    } else {
        const noSalaryInfo = document.createElement('p');
        noSalaryInfo.textContent = 'Salary information not available for this job role.';
        trendsContainer.appendChild(noSalaryInfo);
    }

    // Display job listings for further insights
    const jobList = document.createElement('ul');
    jobs.forEach(job => {
        const jobItem = document.createElement('li');
        jobItem.textContent = `${job.jobtitle} at ${job.company} in ${job.location}`;
        jobList.appendChild(jobItem);
    });
    trendsContainer.appendChild(jobList);
}


// Function to display quiz results and suggest careers
function showResults() {
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";

    const careerCount = {
        "problem-solving": 0,
        "creativity": 0,
        "data-analysis": 0,
        "hands-on": 0
    };

    userResponses.forEach(response => {
        careerCount[response]++;
    });

    let highestCategory = "";
    let highestCount = 0;

    for (let category in careerCount) {
        if (careerCount[category] > highestCount) {
            highestCategory = category;
            highestCount = careerCount[category];
        }
    }

    const recommendedCareers = careerPaths[highestCategory];
    document.getElementById("careerResults").innerHTML = `
        <p>Based on your answers, we suggest the following careers in tech:</p>
        <ul>
            ${recommendedCareers.map(career => `<li>${career}</li>`).join('')}
        </ul>
    `;

    // Add a button to show job trends for the selected career
    const jobTrendsButton = document.createElement('button');
    jobTrendsButton.textContent = "Show Job Trends";
    jobTrendsButton.addEventListener('click', () => {
        showJobTrends(recommendedCareers[0]); // Ensure this passes a valid career title
    }); // Call the function with the first suggested career
    document.getElementById("resultPage").appendChild(jobTrendsButton);
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const jobTitleInput = document.getElementById('jobTitle');
    const searchButton = document.getElementById('searchButton');
    const jobTrendsContainer = document.getElementById('jobTrendsContainer');

    // Get the career result from local storage and pre-fill the job title input
    const careerResult = localStorage.getItem('careerResult');
    if (careerResult) {
        jobTitleInput.value = careerResult;
        fetchJobTrends(careerResult);
    }

    // Fetch job trends when the search button is clicked
    searchButton.addEventListener('click', () => {
        const jobTitle = jobTitleInput.value.trim();
        if (jobTitle) {
            fetchJobTrends(jobTitle);
        }
    });

    // Function to fetch job trends (example simulation, replace with real API logic).
    function fetchJobTrends(jobTitle) {
        jobTrendsContainer.innerHTML = `<p>Loading job trends for "${jobTitle}"...</p>`;

        // Simulate fetching data (replace this with the actual API call)
        setTimeout(() => {
            jobTrendsContainer.innerHTML = `
                <h3>Job Trends for "${jobTitle}"</h3>
                <p>Average Salary: $80,000/year</p>
                <p>Number of Openings: 5,000</p>
                <p>Growth Rate: 10% annually</p>
            `;
        }, 1000);
    }
});


