// Функция открытия модального окна
export function openModal(element) {
    element.classList.add('popup_is-opened');
    element.addEventListener('mousedown', handleClose)  // Добавляем слушатели при открытии
    document.addEventListener('keydown', handleEscKeyUp)
}

// Функция закрытия модального окна
export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('mousedown', handleClose);
    document.removeEventListener('keydown',handleEscKeyUp); // Избавляемся от слушателей при закрытии
}
// Обработчик закрытия окна через Esc
const handleEscKeyUp = (e) => {
  const popup = document.querySelector(".popup_is-opened");  // находим открытый попап
  if (e.key === "Escape") {
    closeModal(popup);
  }
};

const handleClose = (e) => {
  const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
  if (e.target === popup || e.target.classList.contains('popup__close')) {
    closeModal(popup)
  }
}