
 function ImagePopup({card, onClose}) {

    return(
        <section className={`popup popup_gallery ${card? 'popup_opened':''}`}>
        <div className="popup__container popup__container_gallery">
            <button className="popup__close popup__close_gallery" type="button" onClick={onClose}></button>
            <img src={card?.link} alt={card?.name} className="popup__image"></img>
            <h3 className="popup__text">{card?.name}</h3>
        </div>
    </section>
    )
 }

 export default ImagePopup;