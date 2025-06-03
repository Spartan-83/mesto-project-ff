const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(titleValue, imageSrc, deleteCard, openImage) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardDelete = cardElement.querySelector('.card__delete-button')
    const cardLike = cardElement.querySelector('.card__like-button')
    const cardImage = cardElement.querySelector('.card__image')

    cardElement.querySelector('.card__title').textContent = titleValue;
    cardImage.src = imageSrc;
    cardImage.alt = 'На картинке изображен пейзаж из ' + titleValue;

    cardDelete.addEventListener('click', deleteCard)
    cardLike.addEventListener('click', () => likeCard(cardLike))
    cardImage.addEventListener('click', () => openImage(cardImage.src, cardImage.alt, titleValue))
    return cardElement;
}

// Функция лайка
export function likeCard(item) {
    item.classList.toggle('card__like-button_is-active')
    console.log('log')
}

// Функция удаления
export function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}
