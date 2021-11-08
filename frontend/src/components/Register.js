import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({onSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePass(e) {
        setPass(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            email,
            password
        })
    }

    return(
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">Регистрация</h2>
            <input className="form__input" placeholder="Email" onChange={handleChangeEmail} value={email || ''} />
            <input className="form__input" placeholder="Пароль" onChange={handleChangePass} value={password || ''} />
            <button className="form__button">Зарегистрироваться</button>
            <p className="form__caption">Уже зарегистрированы?
                <Link className="form__caption-link" to="/sign-in" >&#8194; Войти</Link>
            </p>
        </form>
    )


}

export default Register;
