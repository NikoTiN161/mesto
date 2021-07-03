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

    updateUserAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatarLink,
                
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
                about: card.link,
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

    likedCard(card) {
        
    }

}