export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        }).then(this._checkResponse)
    }

    createCard(name,link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }).then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse)
    }

    putLikeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse)
    }

    patchUser(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.job
            })
        }).then(this._checkResponse)
    }

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar: data})
        }).then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.putLikeCard(cardId);
        } else {
            return this.deleteLike(cardId);
        }
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '7d716c27-b426-4453-ad59-42f7b8df7686',
        'Content-Type': 'application/json'
    }
});