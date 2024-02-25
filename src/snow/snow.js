/**
 * Генерирует случайное целое число включительно в заданном диапазоне
 * @param {number} n - Минимальное значение диапазона
 * @param {number} m - Максимальное значение диапазона
 * @returns {number} - Случайное целое число включительно в заданном диапазоне
 */
const getRandomIntInclusive = (n, m) => {
  const min = Math.min(n, m);
  const max = Math.max(n, m);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Создает анимацию "снегопада" на странице
 * @param {number} min - Минимальная длительность анимации снежинки (в секундах)
 * @param {number} max - Максимальная длительность анимации снежинки (в секундах)
 * @param {number} saturation - Интервал между появлением снежинок (в миллисекундах)
 */
const createSnow = (min, max, saturation) => {
  const style = document.createElement('style');
  document.head.append(style);

  style.textContent = `
    body {
      position: relative;
    }
    
    .snow {
      position: fixed;
      width: 20px;
      height: 20px;
      top: -20px;
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
      animation-name: fall;
      animation-timing-function: linear;
    }

    @keyframes fall {
      100% { 
        transform: translateY(100vh);
      }
    }
  `;

  // Количество доступных снежинок 
  const count = 4;
  
  /**
   * Создает и добавляет на страницу элемент снежинки
  */
  const createSnowItem = () => {
    const snowItem  = document.createElement('div');
    snowItem.classList.add('snow');

    const time = getRandomIntInclusive(min, max);

    // Установка случайного положение снежинки по горизонтали и фонового изображения
    snowItem.style.cssText = `
      left: ${getRandomIntInclusive(0, 100)}%;
      background-image: url('./snow/snowflake${getRandomIntInclusive(1, count)}.svg');
      animation-duration: ${time}s;
    `;

    // Добавление снежинки на страницу
    document.body.append(snowItem);
    
    // Удаление снежинки после завершения анимации
    setTimeout(() => {
      snowItem.remove();
    }, time * 1000);
  }

  // Запуск создания снежинок с интервалом saturation (в миллисекундах)
  setInterval(createSnowItem, saturation);
};

// Инициализация эффекта снегопада
createSnow(5, 20, 500);