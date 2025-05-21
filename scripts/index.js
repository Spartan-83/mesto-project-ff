// @todo: Темплейт карточки

// @todo: DOM узлы

const placeContainer = document.querySelector('.places__list');
// const addButton = document.querySelector('.profile__add-button');


// @todo: Функция создания карточки

function addCard(titleValue, imageSrc, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = titleValue;
    cardElement.querySelector('.card__image').src = imageSrc;
    placeContainer.addEventListener('click', deleteCard)
    return cardElement;
}

// addButton.addEventListener('click', function () {
//     placeContainer.append(addCard());
// });

// @todo: Функция удаления карточки

function deleteCard(evt) {
    if (evt.target.classList.contains('card__delete-button')) {
        const card = evt.target.closest('.card');
        card.remove();
    }
}

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
placeContainer.append(addCard(initialCards[i].name, initialCards[i].link, deleteCard))
}