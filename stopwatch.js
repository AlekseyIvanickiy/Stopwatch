const startButton = document.querySelector('.js-start');
const clockDisplay = document.querySelector('.js-clock');
const lapButton = document.querySelector('.lap-but');
const lapParagraphs = document.querySelectorAll('.lap-time'); // Параграфы, куда будем вставлять значения времени
let lapCounter = 0;

let totalMilliseconds = 0;
let timerInterval;
let resetButton = document.createElement('button');
resetButton.classList.add('reset-but');
resetButton.textContent = ('Reset');    

startButton.addEventListener('click', () => {
    startTimer();
    const stopButton = document.createElement('button'); // Создаем новый элемент кнопки
    stopButton.classList.add('pause'); // Добавляем класс "pause" для стилей
    stopButton.textContent = 'Stop'; // Устанавливаем текст кнопки
    startButton.parentNode.replaceChild(stopButton, startButton); // Заменяем кнопку "Start" на созданный элемент


    stopButton.addEventListener('click', stopTimer); // Добавляем обработчик для кнопки "Stop"

    stopButton.addEventListener('click', () => {
    stopButton.parentNode.replaceChild(resetButton, lapButton);
    });

    stopButton.addEventListener('click', () => {
        stopButton.parentNode.replaceChild(startButton, stopButton);
    });  
});

startButton.addEventListener('click', () => {
    resetButton.parentNode.replaceChild(lapButton, resetButton);
});

lapButton.addEventListener('click', () => {
    if (totalMilliseconds > 0) {
        const lapParagraphs = document.querySelectorAll('.first-row, .second-row, .three-row, .four-row, .five-row');
        const lapIndex = Array.from(lapParagraphs).findIndex(paragraph => paragraph.textContent === '');
        
        if (lapIndex !== -1) {
            const formattedLapTime = getFormattedTime();
            lapParagraphs[lapIndex].textContent = formattedLapTime;
        }
    }
});

  function getFormattedTime() {
    const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const milliseconds = Math.floor((totalMilliseconds % 1000));

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().slice(0, -1).padStart(2, '0')}`;
};

resetButton.addEventListener('click', clearTimer);

resetButton.addEventListener('click', () => {
    document.querySelectorAll('.first-row, .second-row, .three-row, .four-row, .five-row')
        .forEach(paragraph => {
            paragraph.textContent = '';
        });
});

resetButton.addEventListener('click', () => {
    resetButton.parentNode.replaceChild(lapButton, resetButton);
});

function stopTimer() {
    clearInterval(timerInterval); 
};

function clearTimer() {
    clearInterval(timerInterval); // Останавливаем интервал
    totalMilliseconds = 0; // Сбрасываем значение таймера
    clockDisplay.textContent = '00:00.00'; // Сбрасываем отображение времени
};


function displayTimer() {
    totalMilliseconds += 10;
    const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const milliseconds = Math.floor((totalMilliseconds % 1000));

    const formattedTime = `
      ${minutes.toString().padStart(2, '0')}:
      ${seconds.toString().padStart(2, '0')}.
      ${milliseconds.toString().slice(0, -1).padStart(2, '0')}
    `;
    clockDisplay.textContent = formattedTime;
};

function startTimer() {
    timerInterval = setInterval(displayTimer, 10);
};