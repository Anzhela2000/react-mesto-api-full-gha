import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';

function Main({ onEditProfile, onEditAvatar, onAddPlace, cards, onCardClick, onCardLike, onCardDelete, userData }) {

    const currentUser = React.useContext(CurrentUserContext);

    const signOut = () => {
        localStorage.removeItem('jwt');
    }

    return (<main>
        <Header enter={'/signin'} enterTitle={'Выход'} userData={userData} signOut={signOut} />
        <section className="profile">
            <button className="profile__avatar-button" title="Сменить аватар" onClick={onEditAvatar}>
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
            </button>
            <div className="profile__info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__button-change" type="button" onClick={onEditProfile}></button>
                <p className="profile__job">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <ul className="gallery">
            {
                cards.map((card) =>
                    <Card
                        key={card._id}
                        likes={card.likes}
                        name={card.name}
                        link={card.link}
                        owner={card.owner}
                        _id={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                )
            }
        </ul>
    </main>)
}

export default Main;