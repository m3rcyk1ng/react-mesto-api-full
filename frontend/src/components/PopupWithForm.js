function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup ${isOpen ? 'popup_open' : ''}`} onClick={onClose}>
            <form className="popup__container" name={name} onSubmit={onSubmit}>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                {children}
                <button className="popup__submit" type="submit">{buttonText}</button>
            </form>
        </div>
    )
}

export default PopupWithForm;