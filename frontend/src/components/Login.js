import {useState} from "react";

function Login({onSubmit}) {
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
    <h2 className="form__title">Вход</h2>
        <input className="form__input" placeholder="Email" onChange={handleChangeEmail} value={email || ''}/>
        <input className="form__input" placeholder="Пароль" onChange={handleChangePass} value={password || ''}/>
        <button className="form__button">Войти</button>
    </form>
)
}

export default Login;