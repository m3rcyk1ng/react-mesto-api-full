import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({
            name,
            link
        })
    }

    useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen, onClose]);

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeLink(event) {
        setLink(event.target.value);
    }

    return (
        <PopupWithForm isOpen={isOpen} title='Новое место' buttonText='Создать' onSubmit={handleSubmit}
                       onClose={onClose}>
            <input className="popup__input popup__input_type_title" placeholder="Название" type="text" name="name"
                   id="place" minLength="2" maxLength="30" onChange={handleChangeName} value={name || ''} required/>
            <span className="popup__input-error place-error"></span>
            <input className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" type="url"
                   name="link" id="link" onChange={handleChangeLink} value={link || ''} required/>
            <span className="popup__input-error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;