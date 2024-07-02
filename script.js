let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
const timerDisplay = document.getElementById('timer');
const laps = document.getElementById('laps');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

function startStopTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerHTML = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = true;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = 'Start';
        lapBtn.disabled = true;
        resetBtn.disabled = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    timerDisplay.innerHTML = '00:00:00.00';
    startStopBtn.innerHTML = 'Start';
    laps.innerHTML = '';
    lapCounter = 0;
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function lapTime() {
    lapCounter++;
    let lapTime = timerDisplay.innerHTML;
    let lapItem = document.createElement('li');
    lapItem.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapItem);
}

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTime);
lapBtn.disabled = true;
resetBtn.disabled = true;
