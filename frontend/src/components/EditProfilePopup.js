import { useState } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleInputName(e) {
        setName(e.target.value);
    }

    function handleInputDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            username: name,
            job: description,
        });
    }

    return (
        <>
            <PopupWithForm
                name={'profile'}
                title={'Редактировать профиль'}
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
            >
                <input type="text" id="name-input" className="popup__input popup__input_name" value={name} onChange={handleInputName} minLength="2"
                    maxLength="40" required placeholder="Введите имя" name="username" />
                <span className="name-input-error popup__span-error"></span>
                <input type="text" id="job-input" className="popup__input popup__input_job" value={description} onChange={handleInputDescription} minLength="2"
                    maxLength="200" required placeholder="Введите род деятельности" name="job" />
                <span className="job-input-error popup__span-error"></span>
            </PopupWithForm>

        </>)
}

export default EditProfilePopup;