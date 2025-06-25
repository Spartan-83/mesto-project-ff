import '../pages/index.css';
import '../scripts/index.js';
import { createCard, deleteCard} from '../scripts/card.js'
// import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { updateServerAvatar, getUserData, getCards, postNewCard, updateServerProfile} from './api.js';
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

function openImage(src, alt, title) {
    popupImage.src = src
    popupImage.alt = alt
    popupImageCaption.textContent = title
    openModal(popupOpenImage)
}

function buttonLoading(button) {
  button.textContent = 'Сохранение...'
}

function buttonFinishLoading(button) {
  button.textContent = 'Сохранить'
}

function updateProfile(userData, profileAvatar, profileTitle, profileDesc) {
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  profileTitle.textContent = userData.name;
  profileDesc.textContent = userData.about;
}

function displayCards(cardsData, container, createFunc, deleteFunc, openFunc, userData) {
  for (let i = 0; i < cardsData.length; i++) {
    container.append(createFunc(cardsData[i].name, cardsData[i].link, deleteFunc, openFunc, cardsData[i].likes, cardsData[i]._id, userData._id, cardsData[i].owner._id))
  }
}

async function loadData({profileAvatar, profileTitle, profileDesc, container, createFunc, deleteFunc, openFunc}) {
  try {
    const [userData, cardsData] = await Promise.all([
      getUserData(), // Функция для получения данных пользователя
      getCards()     // Функция для получения карточек
    ]);

    container.innerHTML = "";
    updateProfile(userData, profileAvatar, profileTitle, profileDesc);

    displayCards(cardsData, container, createFunc, deleteFunc, openFunc, userData);
  } catch (err) {
    console.error("Произошла ошибка при загрузке данных:", err);
  }
}

// Кнопки редактирования
editButton.addEventListener('click', function () {
    openModal(popupEditProfile)
    editProfileForm['name'].value = profileTitle.textContent;
    editProfileForm['description'].value = profileDesc.textContent;
    clearValidation(popupEditProfile, validationConfig)
})

popupEditAvatarButton.addEventListener('click', function () {
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

// Обработка формы добавления карточки
popupNewCardForm.addEventListener('submit', async function(evt) {
  evt.preventDefault();
  const PlaceName = popupNewCardForm['place-name'].value;
  const PlaceLink = popupNewCardForm['link'].value;
  buttonLoading(popupNewCardSaveButton);

  try {
    const res = await postNewCard(PlaceName, PlaceLink)
    placeContainer.prepend(createCard(res.name, res.link, deleteCard, openImage, res.likes, res._id, res.owner._id, res.owner._id))
  } catch (err) {
    console.log('Произошла ошибка при добавлении карточки:', err);
  } finally {
    closeModal(popupNewCard);
    popupNewCardForm['place-name'].value = '';
    popupNewCardForm['link'].value = '';
    buttonFinishLoading(popupNewCardSaveButton);
  }
});

// Обработка формы редактирования профиля
editProfileForm.addEventListener('submit', async function(evt) {
  evt.preventDefault();
  buttonLoading(profileSaveButton);
  try {
    const res = await updateServerProfile(editProfileForm['name'].value , editProfileForm['description'].value )
    updateProfile(res, profileAvatar, profileTitle, profileDesc)
  } catch (err) {
    console.error('Произошла ошибка при обновлении профиля:', err);
  } finally {
    closeModal(popupEditProfile);
    buttonFinishLoading(profileSaveButton);
  }
});
 
popupEditAvatarForm.addEventListener('submit', async function(evt) {
  evt.preventDefault();
  const avatarURL = popupEditAvatarForm['avatar'].value;
  buttonLoading(SaveAvatarButton);
  try {
    await updateServerAvatar(avatarURL).then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`
      closeModal(popupEditAvatar);
    })
  } catch (err) {
    console.log('Произошла ошибка при обновлении аватара:', error);
  } finally {
    buttonFinishLoading(SaveAvatarButton);
  }
});

loadData(updateConfig)

enableValidation(validationConfig); 
