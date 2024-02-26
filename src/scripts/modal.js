/**
 * Скрипт управляет модальными окнами для консультации и заказа деревьев на странице
 * 
 * @constant {NodeListOf<Element>} buttonsOrder - Список всех кнопок заказа деревьев
 * @constant {HTMLElement} buttonConsultation - Элемент кнопки "Консультация"
 * @constant {HTMLElement} overlayConsultation - Элемент "overlay" модального окна консультации
 * @constant {HTMLElement} overlayOrder - Элемент "overlay" модального окна заказа
 * @constant {HTMLElement} order - Элемент модального окна для ввода заказа
 */

// Получение элементов со страницы
const buttonsOrder = document.querySelectorAll('.tree-card_button-order');
const buttonConsultation = document.querySelector('.button__consultation');
const overlayConsultation = document.querySelector('.overlay-consultation');
const overlayOrder = document.querySelector('.overlay-order');
const order = document.querySelector('.modal__order');
const consultation = document.querySelector('.modal__consultation');

// Обработчик события клика на кнопку "Консультация"
/**
 * Отображает модальное окно консультации при клике на кнопку "Консультация"
 */
buttonConsultation.addEventListener('click', () => {
  overlayConsultation.classList.add('overlay-active');
  consultation.value  = buttonConsultation.dataset.consultation;
});

// Обработчик события клика на overlay модального окна консультации
/**
 * Закрывает модальное окно консультации при клике на overlay или на кнопку закрытия
 * 
 * @param {Event} event - Объект события клика
 */
overlayConsultation.addEventListener('click', event => {
  const target =  event.target;

  if (target === overlayConsultation || target.closest('.modal__close')) {
    overlayConsultation.classList.remove('overlay-active');
  }  
})

// Обработчики событий для кнопок заказа деревьев
/**
 * Отображает модальное окно заказа с информацией о заказе при клике на кнопку заказа деревьев
 */
buttonsOrder.forEach(buttonOrder => {
  buttonOrder.addEventListener('click', () => {
    overlayOrder.classList.add('overlay-active');
    order.value = buttonOrder.dataset.order;
  });
})

// Обработчик события клика на overlay модального окна заказа
/**
 * Закрывает модальное окно заказа при клике на overlay или на кнопку закрытия
 * 
 * @param {Event} event - Объект события клика
 */
overlayOrder.addEventListener('click', event => {
  const target =  event.target;

  if (target === overlayOrder || target.closest('.modal__close')) {
    overlayOrder.classList.remove('overlay-active');
  }  
})