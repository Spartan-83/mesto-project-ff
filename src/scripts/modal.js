// Функция открытия модального окна
export function openModal(element) {
    element.classList.add('popup_is-opened');
    const closeButton = element.querySelector('.popup__close');

    element.addEventListener('click', function handleClose(evt) {
        if (evt.target === element || evt.target.classList.contains('popup__close')) {
            closeModal(element)
        }
    })
    
    addEventListener('keydown', handleEscKeyUp)
}

// Функция закрытия модального окна
export function closeModal(element) {

    element.classList.remove('popup_is-opened');;
}

// Обработчик закрытия окна через Esc
const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
    removeEventListener('keydown',handleEscKeyUp)
  }
};
