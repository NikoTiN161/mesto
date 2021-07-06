export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _response(res) {
        if (!res.ok) {
            return new Error(res.status);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._response);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._response);
    }

    updateUserInfo(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: user.name,
                about: user.about,
            })
        })
            .then(this._response);
    }

    updateUserAvatar({ link }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: link,

            })
        })
            .then(this._response);
    }

    addNewCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        })
            .then(this._response);;
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._response);
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            headers: this._headers,
            method: 'PUT',
        })
            .then(this._response);
    }

    removeLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._response);
    }
}