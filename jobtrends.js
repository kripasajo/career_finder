// jobTrends.js

function showJobTrends(jobTitle) {
    // Display a loader while data is being fetched
    const trendsContainer = document.getElementById('jobTrendsContainer');
    trendsContainer.innerHTML = 'Loading job trends...';

    // Construct API URL based on job title (replace with your Indeed API URL and key)
    const apiUrl = `https://api.indeed.com/ads/apisearch?publisher=YOUR_API_KEY&q=${jobTitle}&l=&v=2`;

    // Fetch job data from the Indeed API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear previous content
            trendsContainer.innerHTML = `<h3>Job Trends for ${jobTitle}</h3>`;

            // Check if we received valid data
            if (data.results && data.results.length > 0) {
                const jobCount = data.totalResults;
                const jobs = data.results;

                // Display job openings count
                const openings = document.createElement('p');
                openings.textContent = `Total Job Openings: ${jobCount}`;
                trendsContainer.appendChild(openings);

                // If salary data is available, display it (or any other relevant data you want to show)
                const salaryData = jobs[0].estimatedSalary;
                if (salaryData) {
                    const salaryInfo = document.createElement('p');
                    salaryInfo.textContent = `Estimated Salary Range: ${salaryData.minimum} - ${salaryData.maximum}`;
                    trendsContainer.appendChild(salaryInfo);
                } else {
                    const noSalaryInfo = document.createElement('p');
                    noSalaryInfo.textContent = 'Salary information not available for this job role.';
                    trendsContainer.appendChild(noSalaryInfo);
                }

                // Display job listings for further insights (optional)
                const jobList = document.createElement('ul');
                jobs.forEach(job => {
                    const jobItem = document.createElement('li');
                    jobItem.textContent = `${job.jobtitle} at ${job.company} in ${job.location}`;
                    jobList.appendChild(jobItem);
                });
                trendsContainer.appendChild(jobList);
            } else {
                trendsContainer.innerHTML += 'No job trends available for this role.';
            }
        })
        .catch(error => {
            trendsContainer.innerHTML = 'Failed to load job trends.';
            console.error('Error fetching job trends:', error);
        });
}







// After quiz result is displayed
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
    jobTrendsButton.onclick = () => showJobTrends(recommendedCareers[0]); // Call the function with the job title (first suggestion)
    
    document.getElementById("resultPage").appendChild(jobTrendsButton);
}



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

    // Function to fetch job trends (replace with your API logic)
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


