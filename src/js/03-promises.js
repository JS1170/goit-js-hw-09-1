import Notiflix from 'notiflix';

const inputForm = document.querySelector(".form");
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const delayValue = Number(firstDelay.value);
  const stepValue = Number(delayStep.value);
  const amountValue = Number(amountInput.value);
  // console.log(stepValue, delayValue, amountValue);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue + (i - 1) * stepValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    }, delay);
  });

}
