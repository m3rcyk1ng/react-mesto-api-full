import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm isOpen={isOpen} title='Редактировать профиль' buttonText='Сохранить'
                       onClose={onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_name" placeholder="Имя" type="text" name="authorName"
                   id="name" minLength="2" maxLength="40" onChange={handleChangeName} value={name || ''} required/>
            <span className="popup__input-error name-error"></span>
            <input className="popup__input popup__input_type_description" placeholder="О себе" type="text"
                   name="authorDescription" id="description" minLength="2" maxLength="200"
                   onChange={handleChangeDescription}
                   value={description || ''} required/>
            <span className="popup__input-error description-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;