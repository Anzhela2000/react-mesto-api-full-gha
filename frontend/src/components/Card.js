
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(cards, onCardClick, onCardLike, onCardDelete) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = cards.owner._id === currentUser._id;

    const isLiked = cards.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `gallery__button-like ${isLiked && 'gallery__button-like_active'}`
    );;

    const handleClick = () => {
        cards.onCardClick(cards);
    }

    const handleLikeClick = () => {
        cards.onCardLike(cards);
    }

    const handleDeleteClick = () => {
        cards.onCardDelete(cards)
    }
    return (
        <div className="gallery__item" key={cards._id}>
            <button className="gallery__picture_click" onClick={handleClick}><div className="gallery__picture" style={{ backgroundImage: `url(${cards.link})` }} onClick={handleClick} /></button>
            {isOwn && <button className='gallery__delete' onClick={handleDeleteClick} />}
            <div className="gallery__bottom">
                <h2 className="gallery__title">{cards.name}</h2>
                <div className="gallery__counter_likes">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <span className="gallery__like-count">{cards.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;