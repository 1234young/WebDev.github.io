const timeDisplay = document.getElementById('time-display');
const sessionTypeDisplay = document.getElementById('session-type');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

let timerInterval;
let timeRemaining = 25 * 60; // Default work time in seconds (25 minutes)
let isRunning = false;
let isWorkSession = true; // true for work, false for break
const workDuration = 25 * 60; // 25 minutes
const breakDuration = 5 * 60; // 5 minutes

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeDisplay.textContent = formattedTime;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateDisplay();

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                isWorkSession = !isWorkSession; // Switch session type
                sessionTypeDisplay.textContent = isWorkSession ? 'Work Session' : 'Break Session';
                timeRemaining = isWorkSession ? workDuration : breakDuration;
                updateDisplay();
                // Optionally add a sound notification here
                alert(isWorkSession ? 'Break time is over! Start your work session.' : 'Work session is over! Take a break.');
            }
        }, 1000); // Update every 1 second
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isWorkSession = true; // Reset to work session
    sessionTypeDisplay.textContent = 'Work Session';
    timeRemaining = workDuration; // Reset to default work time
    updateDisplay();
}

// Initial display update
updateDisplay();

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);



const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // In a real application, you would collect the data here
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username/Email:', username);
    console.log('Password:', password);

    // Here you would typically send the data to a server for authentication
    // For this example, we'll just show an alert
    alert('Form submitted! (Check console for values)');

    // You could also reset the form after submission
    // loginForm.reset();
});

