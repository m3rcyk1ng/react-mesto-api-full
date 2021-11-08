import silence from "../images/silence.svg"

function SuccessfulLogin({isOpen, onClose}) {
    return (
        <div className={`popup ${isOpen ? ' popup_open' : ''}`} onClick={onClose}>
            <div className="popup__container">
                <button type="button" className="popup__button-close" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__icon" src={silence} alt="Изображение статуса"/>
                <p className="popup__title-secret">Добро пожаловать в</p>
                <p className="popup__title-secret popup__title-secret_purple">Dark-Instagram!</p>
                <p className="popup__title-secret">Первое правило
                    <span className="popup__title-secret_purple"> Dark-Instagram </span>
                    гласит: никому не рассказывать о
                    <span className="popup__title-secret_purple"> Dark-Instagram. </span>
                </p>
                <p className="popup__title-secret"> &#8194; &#8194; &#8194; &#8194;И о красивой вёрстке. </p>
            </div>
        </div>
    )
}

export default SuccessfulLogin;
