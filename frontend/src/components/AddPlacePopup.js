import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useEffect } from "react";

export function AddPlacePopup({ isOpen, onClose, onUpdatePlace }) {

    const placeNameRef = React.useRef('');
    const placeLinkRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdatePlace(placeNameRef.current.value, placeLinkRef.current.value);
    }

    useEffect(() => {
        placeNameRef.current.value = ('');
        placeLinkRef.current.value = ('')
    }, [isOpen]);

    return (
        <PopupWithForm
            name={'place'}
            title={'Новое место'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" id="place-input" className="popup__input popup__input_place" minLength="2"
                maxLength="30" required placeholder="Название" ref={placeNameRef} name="name" />
            <span className="place-input-error popup__span-error"></span>
            <input type="url" id="link-input" className="popup__input popup__input_link" required
                placeholder="Ссылка на картинку" name="link" ref={placeLinkRef} />
            <span className="link-input-error popup__span-error"></span>
        </PopupWithForm>
    )
}
