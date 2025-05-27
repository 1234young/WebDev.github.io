let startTime;
let updatedTime;
let difference = 0; // Initialize difference to 0
let tInterval;
let running = false;
let paused = false;
let pausedTime = 0; // Variable to store time when paused

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn'); // Get the pause button
const resetBtn = document.getElementById('resetBtn');

startStopBtn.addEventListener('click', startStop);
pauseBtn.addEventListener('click', pause); // Add event listener for pause
resetBtn.addEventListener('click', reset);

function startStop() {
    if (!running) {
        // If not running, start or resume
        if (paused) {
            // If paused, calculate new start time based on pausedTime
            startTime = new Date().getTime() - pausedTime;
        } else {
            // If starting fresh
            startTime = new Date().getTime();
        }

        tInterval = setInterval(getShowTime, 1); // Update every millisecond
        startStopBtn.innerHTML = "Stop";
        running = true;
        paused = false; // No longer paused
    } else {
        // If running, stop
        clearInterval(tInterval);
        pausedTime = new Date().getTime() - startTime; // Store elapsed time before stopping
        startStopBtn.innerHTML = "Start";
        running = false;
        paused = false; // Not paused, just stopped
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        pausedTime = new Date().getTime() - startTime; // Store elapsed time when pausing
        running = false;
        paused = true; // Set paused flag
        startStopBtn.innerHTML = "Start"; // Change Start/Stop button to Start
    }
}


function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    difference = 0; // Reset difference
    pausedTime = 0; // Reset paused time
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    startTime = null;
}
function getShowTime() {
    updatedTime = new Date().getTime();
    // Calculate the current difference
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;

    // Update the display with the format HH:MM:SS:ms
    display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

    difference = document.getElementById('display').innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;

    // Optional: Add milliseconds if needed
    

   