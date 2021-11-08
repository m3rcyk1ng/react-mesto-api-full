export default class Api {
    constructor(aut) {
        this._link = aut.link;
        this._token = aut.token;
    };

    getInitialCards() {
        return fetch(`${this._link}/cards`, {
            headers: this._token,
            credentials: 'include',
        })
            .then(this._checkStatus);
    }

    getUserInfo() {
        return fetch(`${this._link}/users/me`, {
            headers: this._token,
            credentials: 'include',
        })
            .then(this._checkStatus);
    }

    updateUserInfo(profile) {
        return fetch(`${this._link}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._token,
            body: JSON.stringify({
                name: profile.name,
                about: profile.about
            })
        })
            .then(this._checkStatus);
    }

    addNewCard(card) {
        return fetch(`${this._link}/cards`, {
            method: 'POST',
            headers: this._token,
            credentials: 'include',
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then(this._checkStatus);
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._link}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._token,
            credentials: 'include',
        })
            .then(this._checkStatus);
    }

    deleteCard(cardId) {
        return fetch(`${this._link}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._token,
            credentials: 'include',
        })
            .then(this._checkStatus);
    }

    updateAvatar(avatar) {
        return fetch(`${this._link}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._token,
            credentials: 'include',
            body: JSON.stringify(avatar)
        })
            .then(this._checkStatus);
    }
}

export const api = new Api({
    link: 'https://api.debugger.nomoredomains.rocks',
    token: {
        'Content-Type': 'application/json',
    },
});