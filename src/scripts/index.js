import '../pages/index.css';
import '../scripts/index.js';
import { createCard, deleteCard} from '../scripts/card.js'
// import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { loadData, updateServerProfile, postNewCard, updateServerAvatar } from './api.js';
// DOM узлы

const placeContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button') 

const popupEditProfile = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile']
const profileTitle = document.querySelector('.profile__title')
const profileDesc = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')
const profileSaveButton = editProfileForm.querySelector('.button')

const popupOpenImage = document.querySelector('.popup_type_image')
const popupImage = popupOpenImage.querySelector('.popup__image')
const popupImageCaption = popupOpenImage.querySelector('.popup__caption')

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document.forms['new-place']
const popupNewCardSaveButton= popupNewCardForm.querySelector('.button')

const popupEditAvatar = document.querySelector('.popup_type_avatar')
const popupEditAvatarButton = document.querySelector('.profile__image-edit-button')
const popupEditAvatarForm = document.forms['edit-avatar']
const SaveAvatarButton = popupEditAvatarForm.querySelector('.button')
const AvatarURL = popupEditAvatarForm.querySelector('.popup__input_type_avatar_url')

// Объект со всеми параметрами
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const updateConfig = {
  profileAvatar: profileAvatar, 
  profileTitle: profileTitle, 
  profileDesc: profileDesc, 
  container: placeContainer, 
  createFunc: createCard, 
  deleteFunc: deleteCard, 
  openFunc: openImage
}
loadData(updateConfig)


// Кнопки редактирования
editButton.addEventListener('click', function () {
    openModal(popupEditProfile)
    editProfileForm['name'].value = profileTitle.textContent;
    editProfileForm['description'].value = profileDesc.textContent;
    clearValidation(popupEditProfile, validationConfig)
})

popupEditAvatarButton.addEventListener('click', async function () {
  openModal(popupEditAvatar)
  popupEditAvatarForm['avatar'].value = '';
  clearValidation(popupEditAvatar, validationConfig)
})


// Кнопка добавления
addButton.addEventListener('click', function() {
    openModal(popupNewCard);
    popupNewCardForm['place-name'].value = '';
    popupNewCardForm['link'].value = '';
    clearValidation(popupNewCardForm, validationConfig)
})

function openImage(src, alt, title) {
    popupImage.src = src
    popupImage.alt = alt
    popupImageCaption.textContent = title
    openModal(popupOpenImage)
}

popupEditAvatarForm.addEventListener('submit', async function(evt) {
  evt.preventDefault();
  const avatarURL = popupEditAvatarForm['avatar'].value;
  buttonLoading(SaveAvatarButton)
  await updateServerAvatar(avatarURL)
  await loadData(updateConfig)
  closeModal(popupEditAvatar);
  buttonFinishLoading(SaveAvatarButton)
})

// Обработка формы добавления карточки
popupNewCardForm.addEventListener('submit',async function(evt) {
    evt.preventDefault();
    const PlaceName = popupNewCardForm['place-name'].value;
    const PlaceLink = popupNewCardForm['link'].value;
    await postNewCard(PlaceName, PlaceLink)
    buttonLoading(popupNewCardSaveButton)
    await loadData(updateConfig)
    closeModal(popupNewCard);
    popupNewCardForm['place-name'].value = '';
    popupNewCardForm['link'].value = '';
    buttonFinishLoading(popupNewCardSaveButton)
});



// Обработка формы редактирования профиля
editProfileForm.addEventListener('submit', async function(evt){
    evt.preventDefault();
    await updateServerProfile(editProfileForm.elements.name.value, editProfileForm.elements.description.value);
    buttonLoading(profileSaveButton)
    await loadData(updateConfig) ;
    closeModal(popupEditProfile)
    buttonFinishLoading(profileSaveButton)
}); 

function buttonLoading(button) {
  button.textContent = 'Сохранение...'
}

function buttonFinishLoading(button) {
  button.textContent = 'Сохранить'
}


enableValidation(validationConfig); 
