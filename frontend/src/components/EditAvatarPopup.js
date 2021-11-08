import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avaRef = React.useRef();

    function handleAvatarSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avaRef.current.value
        });
    }

    return (
        <PopupWithForm isOpen={isOpen} title='Обновить аватар' buttonText='Создать' onClose={onClose} onSubmit={handleAvatarSubmit}>
        <input ref={avaRef} className="popup__input popup__input_type_avatar" id="avatar" type="url" name="avatar"
               placeholder="Ссылка на новую аватарку" required/>
        <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>)
}

export default EditAvatarPopup;