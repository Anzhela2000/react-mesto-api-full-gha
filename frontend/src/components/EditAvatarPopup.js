import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useEffect } from "react";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value)
    avatarRef.current.value = '';
  }

  useEffect(() => {
    avatarRef.current.value = ('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ><input type="url" id="avatar-input" className="popup__input popup__input_avatar" ref={avatarRef} required
      placeholder="Аватар" name="avatar" />
      <span className="avatar-input-error popup__span-error"></span>
    </PopupWithForm>
  )
}