function ImagePopup({ card, onClose }) {
    return(
        <div className={`popup ${card.link ? 'popup_open' : ''}`} onClick={onClose}>
            <div className="popup__image-container">
                <button className="popup__button-close" type="button" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name}/>
                <p className="popup__image-text">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;
