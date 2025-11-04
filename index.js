let startTime = 0;
let elapsed = 0;
let timer = null;
let isRunning = false;

const h = document.getElementById("hour");
const m = document.getElementById("minute");
const s = document.getElementById("second");
const ms = document.getElementById("millisecond");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateTime() {
  const now = performance.now();
  const diff = now - startTime;

  const hour = Math.floor(diff / 3600000);
  const minute = Math.floor((diff % 3600000) / 60000);
  const second = Math.floor((diff % 60000) / 1000);
  const millisecond = Math.floor((diff % 1000) / 100);

  h.textContent = hour;
  m.textContent = minute;
  s.textContent = second;
  ms.textContent = millisecond;
}

function startStopwatch() {
  if (!isRunning) {
      if (elapsed === 0) {
          startTime = performance.now();
      } else {
          startTime = performance.now() - elapsed;
      }

  timer = setInterval(() => {
      elapsed = performance.now() - startTime;
      updateTime();
  }, 10);

  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled =false;

  isRunning = true;
  }
}

function stopStopwatch() {
  if (!isRunning) return;
    
  clearInterval(timer);

  elapsed = performance.now() - startTime;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = false;

  isRunning = false;
}

function resetStopwatch() {
  clearInterval(timer);

  startTime = 0;
  elapsed = 0;

  h.textContent = 0;
  m.textContent = 0;
  s.textContent = 0;
  ms.textContent = 0;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;

  isRunning = false;
}

stopBtn.disabled = true;
resetBtn.disabled = true;


startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);