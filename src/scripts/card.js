import { deleteServerCard, putCardLike, removeCardLike} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(titleValue, imageSrc, deleteCard, openImage, likes,  cardId, userId, creatorID) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
    const cardLike = cardElement.querySelector('.card__like-button')
    const cardImage = cardElement.querySelector('.card__image')
    const cardLikeAmmount = cardElement.querySelector('.card__like-ammount')

    cardElement.querySelector('.card__title').textContent = titleValue;
    cardImage.src = imageSrc;
    cardImage.alt = 'На картинке изображен ' + titleValue;
    cardLikeAmmount.textContent = likes.length;
    

    if (userId === creatorID) {
        cardDeleteButton.addEventListener('click', (evt) => {
            const card = evt.target.closest('.card')
            deleteCard(cardId, card)
        }) 
    }
    else cardDeleteButton.remove();

    if (likes.find(user => user._id === userId)) {
        cardLike.classList.add('card__like-button_is-active');
    }

    cardLike.addEventListener('click', () => likeCard(cardLike, cardLikeAmmount, cardId))
    cardImage.addEventListener('click', () => openImage(cardImage.src, cardImage.alt, titleValue))
    return cardElement;
}

// Функция лайка
function likeCard(button, cardLikeAmmount, cardId) {
    if (!button.classList.contains('card__like-button_is-active')) {
        putCardLike(cardId)
        .then((data) => {
            cardLikeAmmount.textContent = data.likes.length
            button.classList.toggle('card__like-button_is-active');
        })  
        .catch((error) => {
            console.log('Произошла ошибка при добавлении лайка:', error);
        });
    }
    else {
        removeCardLike(cardId)
        .then((data) => {
            cardLikeAmmount.textContent = data.likes.length
            button.classList.toggle('card__like-button_is-active');
        })
        .catch((error) => {
            console.log('Произошла ошибка при снятии лайка:', error);
        });
    }
}
// Функция удаления
export const deleteCard = (cardId, card) => {
    deleteServerCard(cardId)
    .then(() => {
        card.remove()
    })
    .catch(err => console.log('Произошла ошибка при удалении карточки'))
}