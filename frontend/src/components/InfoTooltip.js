import done from "../images/done.svg"
import fail from "../images/fail.svg"

function InfoTooltip({isOpen, error, onClose}) {
    return (
        <div className={`popup ${isOpen ? ' popup_open' : ''}`} onClick={onClose}>
            <div className="popup__container">
                <button type="button" className="popup__button-close" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__icon" src={error ? fail : done } alt="Изображение статуса"/>
                <p className="popup__title-auth">{error ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;
