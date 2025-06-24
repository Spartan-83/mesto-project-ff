const config = {
  baseUrl: 'https://nomoreparties.co/v1//wff-cohort-41',
  headers: {
    authorization: 'fe7ae636-3daa-429f-a858-14d86ef6e8ee',
    'Content-Type': 'application/json'
  }
}

function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
    return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err)
  })
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err)
  })
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

export async function loadData({profileAvatar, profileTitle, profileDesc, container, createFunc, deleteFunc, openFunc}) {
  const [userData, cardsData] = await Promise.all([
    getUserData(), // Функция для получения данных пользователя
    getCards()     // Функция для получения карточек
  ]);
  container.innerHTML = ""
  updateProfile(userData, profileAvatar, profileTitle, profileDesc);
  displayCards(cardsData, container, createFunc, deleteFunc, openFunc, userData);
}

export function updateServerProfile(profileName, profileAbout) {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err)
  })
}

export function postNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err)
  })
}

export function deleteServerCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err)
  })
}

export function putCardLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
 .then(res => {
    if (res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err)
  })
}

export function removeCardLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err)
  })
}

export function updateServerAvatar(avatarURL) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL
    })
  })
    .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}