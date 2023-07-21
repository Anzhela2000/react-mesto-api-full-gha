function PopupWithForm({ name, title, isOpen, children, onClose, onSubmit }) {
    return (
        <section className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
            <div className="popup__container">
                <button className={`popup__close popup__close_${name}`} type="button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__form_${name}`} noValidate name={name} onSubmit={onSubmit}>
                    {children}
                    <button className={`popup__button popup__button_${name}`} type="submit">Сохранить</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;