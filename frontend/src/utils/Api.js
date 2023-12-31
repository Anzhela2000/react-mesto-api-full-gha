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

    getUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `${localStorage.getItem("jwt")}`,
             },
        }).then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `${localStorage.getItem("jwt")}`,
             },
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
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
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
    url: 'https://api.mesto-anzhela.nomoredomains.xyz',
    headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    }
});