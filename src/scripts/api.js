const config = {
  baseUrl: 'https://nomoreparties.co/v1//wff-cohort-41',
  headers: {
    authorization: 'fe7ae636-3daa-429f-a858-14d86ef6e8ee',
    'Content-Type': 'application/json'
  }
}

export function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
    return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}


export function updateServerProfile(profileName, profileAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
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
}