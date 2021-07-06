export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
    }

    updateUserAvatar({ link }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: link,

            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            headers: this._headers,
            method: 'PUT',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
    }

    removeLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .catch(err => {
                console.error(err);
            })
    }

}