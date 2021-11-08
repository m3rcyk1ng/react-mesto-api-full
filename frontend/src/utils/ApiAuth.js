class ApiAuth {
    constructor({baseUrl}) {
        this._url = baseUrl;
    }

    userLogin(data) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else if (data.status === 401) {
                    return Promise.reject(`Пользователь с такой комбинацией E-mail и пароля не найден!`)
                } else {
                    return Promise.reject(`Что-то пошло не так! Попробуйте ещё раз. Ошибка: ${data.status}`)
                }
            })
    }


    userReg(data) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else if (data.status === 400) {
                    return Promise.reject(`Некорректно заполнено одно из полей!`)
                } else {
                    return Promise.reject(`Что-то пошло не так! Попробуйте ещё раз. Ошибка: ${data.status}`)
                }
            })
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
                .then((data) => {
                    if (data.ok) {
                        return data.json();
                    } else if (data.status === 401) {
                        return Promise.reject(`Переданный токен некорректен!`)
                    } else {
                        return Promise.reject(`Что-то пошло не так! Попробуйте ещё раз. Ошибка: ${data.status}`)
                    }
                })

    }
}

export const apiAuth = new ApiAuth({
    baseUrl: 'https://auth.nomoreparties.co.'
})