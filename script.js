// Career paths categorized based on the answers
const careerPaths = {
    "problem-solving": ["Software Developer", "Backend Developer", "AI/ML Engineer"],
    "creativity": ["UI/UX Designer", "Frontend Developer", "Game Designer"],
    "data-analysis": ["Data Analyst", "Data Scientist", "Business Intelligence Analyst"],
    "hands-on": ["Network Engineer", "IT Support Specialist", "DevOps Engineer"]
};

// Store quiz questions and answer options
const quizQuestions = [
    {
        question: "What kind of work do you prefer?",
        answers: [
            { text: "Problem-solving and logic-based work", value: "problem-solving" },
            { text: "Creativity and design-focused work", value: "creativity" },
            { text: "Working with data and statistics", value: "data-analysis" },
            { text: "Hands-on technical work", value: "hands-on" }
        ]
    },
    {
        question: "Which of these programming languages are you most comfortable with (or want to learn)?",
        answers: [
            { text: "Python, Java, or C++", value: "problem-solving" },
            { text: "JavaScript, HTML, CSS, React", value: "creativity" },
            { text: "SQL, R, or other data-analysis languages", value: "data-analysis" },
            { text: "No programming language, but interested in learning", value: "hands-on" }
        ]
    },
    {
        question: "How do you prefer to solve problems?",
        answers: [
            { text: "Step-by-step logical reasoning and debugging", value: "problem-solving" },
            { text: "Thinking outside the box and coming up with creative solutions", value: "creativity" },
            { text: "Looking for patterns and trends in data", value: "data-analysis" },
            { text: "Fixing practical issues and implementing hands-on solutions", value: "hands-on" }
        ]
    },
    
    {
        question: "Which of these tasks do you enjoy the most?",
        answers: [
            { text: "Debugging and optimizing code", value: "problem-solving" },
            { text: "Designing user interfaces and experiences", value: "creativity" },
            { text: "Analyzing large datasets and deriving insights", value: "data-analysis" },
            { text: "Setting up networks or servers", value: "hands-on" }
        ]
    },
    {
        question: "What environment do you prefer to work in?",
        answers: [
            { text: "Collaborative and focused on problem-solving", value: "problem-solving" },
            { text: "Creative space with lots of design work", value: "creativity" },
            { text: "Data-driven, analytical teams", value: "data-analysis" },
            { text: "Technical and hands-on work in IT infrastructure", value: "hands-on" }
        ]
    },
    {
        question: "Which of these best describes your strengths?",
        answers: [
            { text: "Logical thinking and troubleshooting", value: "problem-solving" },
            { text: "Visual design and aesthetic skills", value: "creativity" },
            { text: "Working with numbers and deriving insights", value: "data-analysis" },
            { text: "Technical proficiency and practical solutions", value: "hands-on" }
        ]
    },
    {
        question: "Do you enjoy continuous learning and adapting to new technologies?",
        answers: [
            { text: "Yes, especially in the area of software development and algorithms", value: "problem-solving" },
            { text: "Yes, especially in design tools and trends", value: "creativity" },
            { text: "Yes, especially in new data analysis techniques", value: "data-analysis" },
            { text: "Yes, especially in IT and networking technologies", value: "hands-on" }
        ]
    },
    {
        question: "Which of these describes your ideal career growth?",
        answers: [
            { text: "Progressing through software development and engineering roles", value: "problem-solving" },
            { text: "Growing as a UI/UX designer or creative director", value: "creativity" },
            { text: "Advancing as a data scientist or analytics lead", value: "data-analysis" },
            { text: "Advancing in IT infrastructure or network management", value: "hands-on" }
        ]
    },
    {
        question: "Which of these tasks sounds most interesting to you?",
        answers: [
            { text: "Developing algorithms and software systems", value: "problem-solving" },
            { text: "Creating beautiful, user-friendly websites or apps", value: "creativity" },
            { text: "Cleaning, analyzing, and visualizing large datasets", value: "data-analysis" },
            { text: "Setting up and managing network configurations and hardware", value: "hands-on" }
        ]
    },
    {
        question: "How do you like to approach learning new technologies?",
        answers: [
            { text: "Through hands-on coding and building projects", value: "problem-solving" },
            { text: "By experimenting with design and user interaction", value: "creativity" },
            { text: "By diving into datasets and analyzing them", value: "data-analysis" },
            { text: "By hands-on practice with hardware and networking", value: "hands-on" }
        ]
    }
];

// Current question index and user responses
let currentQuestionIndex = 0;
let userResponses = [];

// Function to start the quiz
function startQuiz() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    displayQuestion();
}

// Function to display the current question
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const quizForm = document.getElementById("quizForm");
    quizForm.innerHTML = `<h2>${question.question}</h2>`;

    question.answers.forEach((answer, index) => {
        quizForm.innerHTML += `
            <input type="radio" name="answer" id="answer${index}" value="${answer.value}">
            <label for="answer${index}">${answer.text}</label><br>
        `;
    });

    document.getElementById("nextButton").style.display = "inline";
}

// Function to handle the next question
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userResponses.push(selectedAnswer.value);
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Please select an answer.");
    }
}

// Function to show the results
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
}

// Function to restart the quiz
function restartQuiz() {
    userResponses = [];
    currentQuestionIndex = 0;
    document.getElementById("resultPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
}
