
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { Routes, Route, Navigate, BrowserRouter, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from '../utils/auth.js';
import InfoTooltip from "./InfoTooltip";

function App() {

  //стэйты попапов 

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  //стэйт юзера

  const [currentUser, setCurrentUser] = useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });

  //Остальный стэйты

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState('');

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const [errorMessage, setErrorMessage] = useState('');

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessfull, setIsSuccessful] = useState(false);
  const [popupMessage, setPopupMessage] = useState('')

  const navigate = useNavigate();

  function handleLogin(data) {
    setLoggedIn(true);
    setUserEmail(data);
  }

  //Проверка токена

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.tokenCheck(jwt)
        .then((data) => {
          handleLogin(data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  //лайк и удаление

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id );

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(card) {

    const isOwn = card.owner === currentUser._id;

    api.deleteCard(card._id, !isOwn).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => console.log(err));
  }

  //обработчики кликов

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (cards) => {
    setSelectedCard(cards);
  }

  //Закрыть попапы

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false)
  }

  //Получение карточек и информации о пользователе

  const handleUpdateUser = (data) => {
    api.patchUser(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      }).catch((err) => console.log(err));
  }

  const handleUpdateAvatar = (data) => {
    api.changeAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      }).catch((err) => console.log(err));
  }

  //Создать карточку

  const handleAddPlaceSubmit = (name, link) => {
    api.createCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => console.log(err));
  }

  //Регистрация пользователя

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    auth.register(formValue.email, formValue.password).then(() => {
      navigate('/signin', { replace: true }
      );
    })
      .catch(err => {
        setIsInfoTooltipOpen(true);
        setIsSuccessful(false);
        setPopupMessage('Что-то пошло не так! Попробуйте еще раз.')
      })
      .finally(
        setIsInfoTooltipOpen(true),
        setIsSuccessful(true),
        setPopupMessage('Вы успешно зарегистрировались!')
      )
  }

  //Авторизация пользователя

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      setErrorMessage('Both fields are required');
      return;
    }

    const { email, password } = formValue;

    auth.authorize(email, password)
      .then(data => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          handleLogin(formValue.email);
          navigate("/", {
            replace: true
          });
        }
      })
      .catch(error => {
        console.log(error);
        setIsInfoTooltipOpen(true);
        setIsSuccessful(false);
        setPopupMessage('Что-то пошло не так!Попробуйте ещё раз.')
      })
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUser(), api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards.reverse());
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/signup" element={<Register handleChange={handleChangeRegister} handleSubmit={handleSubmitRegister} formValue={formValue} />} />
          <Route path="/signin" element={<Login handleSubmit={handleSubmitLogin} handleChange={handleChangeLogin} formValue={formValue} />} />
          <Route path="/" element={
            <ProtectedRoute component={Main} loggedIn={loggedIn} cards={cards}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              userData={userEmail}
            />
          } />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleAddPlaceSubmit} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip isSuccessfull={isSuccessfull} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} title={popupMessage} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;