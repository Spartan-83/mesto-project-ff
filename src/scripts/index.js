import '../pages/index.css';
import '../scripts/index.js';
import { createCard, deleteCard} from '../scripts/card.js'
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

// DOM узлы

const placeContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button') 


const popupEditProfile = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile']
const profileTitle = document.querySelector('.profile__title')
const profileDesc = document.querySelector('.profile__description')

const popupOpenImage = document.querySelector('.popup_type_image')
const popupImage = popupOpenImage.querySelector('.popup__image')
const popupImageCaption = popupOpenImage.querySelector('.popup__caption')

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document. forms['new-place']

// Вывод карточек на страницу
for (let i = 0; i < initialCards.length; i++) {
placeContainer.append(createCard(initialCards[i].name, initialCards[i].link, deleteCard, openImage))
}

// Кнопки редактирования
editButton.addEventListener('click', function () {
    openModal(popupEditProfile)
    editProfileForm['name'].value = profileTitle.textContent;
    editProfileForm['description'].value = profileDesc.textContent;
})

// Кнопка добавления
addButton.addEventListener('click', function() {
    openModal(popupNewCard);
})

// Обработка формы добавления карточки
popupNewCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const PlaceName = popupNewCardForm['place-name'].value;
    const PlaceLink = popupNewCardForm['link'].value;
    placeContainer.prepend(createCard(PlaceName, PlaceLink, deleteCard, openImage))
    closeModal(popupNewCard);
    popupNewCardForm['place-name'].value = '';
    popupNewCardForm['link'].value = '';
});


// Обработка формы редактирования профиля
editProfileForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    profileTitle.textContent = editProfileForm.elements.name.value;
    profileDesc.textContent = editProfileForm.elements.description.value;
    closeModal(popupEditProfile)
}); 

function openImage(src, alt, title) {
    popupImage.src = src
    popupImage.alt = alt
    popupImageCaption.textContent = title
    openModal(popupOpenImage)
}