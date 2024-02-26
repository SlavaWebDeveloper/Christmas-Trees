
/**
 * Преобразует число и выбирает правильное склонение слова для него в соответствии с переданным массивом форм слова
 *
 * @param {number} n - Число, для которого нужно выбрать склонение
 * @param {string[]} titles - Массив форм слова для различных чисел (например, ['день', 'дня', 'дней'])
 * @param {boolean} [from] - Флаг, указывающий на особое правило выбора формы слова (необязательный параметр)
 * @returns {string} - Строка с числом и выбранным склонением слова
 */
const declOfNum = (n, titles, from) => n + ' ' + titles[from ? n % 10 === 1 && n % 100 !== 11 ?
  1 : 2 : n % 10 === 1 && n % 100 !== 11 ? 0 :
  n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

/**
 * Отображает таймер обратного отсчета до указанного времени.
 */
const timers = () => {

  // Создание элементов таймера
  const timer = document.createElement('div');
  const timerText = document.createElement('p');
  const timerCount = document.createElement('span');

  // Добавление классов к элементам
  timer.classList.add('timer');
  timerText.classList.add('timer__text');
  timerCount.classList.add('timer__count');

  // Задание текстового содержимого элементов
  timerText.textContent = 'До конца распродажи осталось:';
  timerCount.textContent = '3 дня 0 часов 15 минут 17 секунд';

  // Структурирование элементов
  timerText.append(timerCount);
  timer.append(timerText);
  document.body.prepend(timer);

  /**
   * Запускает таймер обратного отсчета до заданного времени.
   */
  const startTimer = () => {
    const deadLine = new Date(2025, 0, 1, 0, 0, 0);
    const now = new Date();
    const timeRemaining = (deadLine - now) / 1000;

    // Вычисление оставшегося времени в днях, часах, минутах и секундах
    const seconds = Math.floor(timeRemaining % 60);
    const minutes = Math.floor(timeRemaining / 60 % 60);
    const hours = Math.floor(timeRemaining / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 60 / 60 / 24);

    // Выбор правильного склонения для каждой единицы времени
    const s = declOfNum(seconds, ['секунда', 'секунды', 'секунд'])
    const m = declOfNum(minutes, ['минута', 'минуты', 'минут'])
    const h = declOfNum(hours, ['час', 'часа', 'часов'])
    const d = declOfNum(days, ['день', 'дня', 'дней'])

    // Обновление отображаемого времени
    timerCount.textContent = `${d} ${h} ${m} ${s}`
    console.log('timerCount: ', timerCount);

    // Повторный запуск таймера через 1 секунду
    if (timeRemaining > 0) {
      setTimeout(startTimer, 1000);
    } else {
      timer.remove();
    }
  }
  
  // Запуск таймера
  startTimer();
}

// Вызов функции для отображения таймера
timers();