/**
 * Инициализация гирлянды
 * Этот скрипт динамически создает и анимирует эффект гирлянды на веб-странице
 */

/**
 * Функция для инициализации гирлянды
 */
const garlandInit = () => {
  // Создаем элемент <style> для динамического добавления стилей CSS
  const style = document.createElement('style');

  // Создаем элемент <div> для фонового изображения гирлянды
  const elka = document.createElement('div');
  elka.classList.add('garland-elka');

  // Создаем элемент <div> для анимации гирлянды
  const garland = document.createElement('div');
  garland.className = 'garland garland_1';

  // Добавляем элементы <style>, <div class="garland-elka"> и <div class="garland"> в DOM
  document.head.append(style);
  document.body.append(elka, garland);

  // Устанавливаем начальные CSS-стили для фона гирлянды
  style.textContent = `
    :root {
      --garland-bg-size: 100px;
    }

    body {
      position: relative;
    }
    
    .garland-elka {
      position: fixed;
      inset: 0;
      background-image: url('./img/garland/elka-bg.png');
      background-repeat: no-repeat;
      pointer-events: none;
      z-index: 399;
    }

    .garland {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 36px;
      background-image: url('./img/garland/garland-bg.png');
      pointer-events: none;
      z-index: 300;
    }

    .garland_1 {
      background-position: 0 0;
    }
    
    .garland_2 {
      background-position: 0 -36px;
    }

    .garland_3 {
      background-position: 0 -72px;
    }

    .garland_4 {
      background-position: 0 -108px;
    }

    @media (max-width: 1600px) {
      :root {
        --garland-bg-size: 100px;
      }
    }

    @media (max-width: 500px) {
      :root {
        --garland-bg-size: 80px;
      }
    }  
  `;

  // Массив классов для разных анимаций гирлянды
  const garlandClasses = [
    'garland_1',
    'garland_2',
    'garland_3',
    'garland_4'
  ];

  // Переменная для отслеживания текущего индекса анимации гирлянды
  let currentIndex = 0;
  
  // Устанавливаем интервал для изменения класса анимации гирлянды каждые 300 миллисекунд
  setInterval(() => {
    const  prevIndex = currentIndex;

    // Убеждаемся, что новый индекс отличается от предыдущего
    while (prevIndex === currentIndex) {
      currentIndex = Math.round(Math.random() * (garlandClasses.length - 1));
    }
    
    // Обновляем класс гирлянды для создания эффекта анимации
    garland.className = `garland ${garlandClasses[currentIndex]}`;
  }, 300);
}

// Вызываем функцию garlandInit для инициализации эффекта гирлянды
garlandInit();