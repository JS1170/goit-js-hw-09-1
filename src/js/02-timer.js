import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const inputArea = document.querySelector('input[type="text"]');
const startBtn = document.querySelector("button[data-start]");
const valueDays = document.querySelector("[data-days]");
const valueHours = document.querySelector("[data-hours]");
const valueMinutes = document.querySelector("[data-minutes]");
const valueSeconds = document.querySelector("[data-seconds]");
let selectedDate = null;
startBtn.disabled = true;

startBtn.addEventListener("click", () => {
  timer.start();
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
      if (selectedDate < Date.now()) {
          Notiflix.Notify.warning('Please choose a date in the future');
        //   alert("Please choose a date in the future");
          startBtn.disabled = true;
          return;
      } else {
          startBtn.disabled = false;

      }
      
  },
};

flatpickr(inputArea, options);

const timer = {
  intervalId: null,
  start() {
    const id = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      const time = convertMs(deltaTime);

      updateClockFace(time);

      if (deltaTime < 999) {
          clearInterval(id);
          startBtn.disabled = true;
      }
        startBtn.disabled = true;
    }, 1000);
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  clockFace = `${days}:${hours}:${minutes}:${seconds}`;

  valueDays.textContent = days;
  valueHours.textContent = hours;
  valueMinutes.textContent = minutes;
  valueSeconds.textContent = seconds;

  // console.log(clockFace);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
