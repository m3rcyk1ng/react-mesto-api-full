import React, {useEffect, useState} from 'react';
import {Route, useHistory, Switch} from 'react-router-dom';

import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";

import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";
import {apiAuth} from "../utils/ApiAuth";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import SuccessfulLogin from "./SuccessfulLogin"

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();


    function setSuccessfullLog() {
        setSuccessfulLogin(true);
    }

    function setIsLoad() {
        setIsLoading(false);
    }

    function handleUpdateUser(profile) {
        api
            .updateUserInfo(profile)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((rej) => console.log(rej))
    }

    // Данные для профиля
    useEffect(() => {
        api
            .getUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((rej) => console.log(rej))
    }, []);

    const [cards, setCards] = useState([])
    // Данные для рендера
    useEffect(() => {
        api
            .getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch((rej) => console.log(rej));
    }, []);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    const [selectedCard, setSelectedCard] = useState({});

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setInfoToolTipPopup(false);
        setSuccessfulLogin(false);
    }

    function handlePopupClose(event) {
        if (event.target === event.currentTarget) {
            closeAllPopups();
        }
    }

    function handleAddPlaceSubmit(card) {
        api
            .addNewCard(card)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((rej) => console.log(rej))
    }

    function handleUpdateAvatar(profile) {
        api
            .updateAvatar(profile)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((rej) => console.log(rej))
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((rej) => console.log(rej));
    }

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch((rej) => console.log(rej));
    }

    const [email, setEmail] = useState({});
    const [successfulLogin, setSuccessfulLogin] = useState(false);
    const [status, setStatus] = useState(false);
    const [infoToolTipPopup, setInfoToolTipPopup] = useState(false);

    function handleUserLogin(data) {
        setIsLoading(true);
        apiAuth.userLogin(data)
            .then((res) => {
                    if (res.token) {
                        localStorage.setItem('token', res.token);
                        setLoggedIn(true);
                        setEmail(data);
                        history.push('/');
                        Promise.all([api.getUserInfo(), api.getInitialCards()]).then((res) => {
                            setTimeout(setIsLoad, 2000);
                            setTimeout(setSuccessfullLog, 6000);
                        }).catch(() => console.log(res.status));
                    }
                }
            )
            .catch((res) => {
                console.log(res.status);
                setLoggedIn(false);
                setInfoToolTipPopup(true);
                setStatus(true);
            })
    }

    function handleUserRegister(data) {
        apiAuth.userReg(data)
            .then(() => {
                history.push('/sign-in');
                setStatus(false);
            })
            .catch((res) => {
                console.log(res.status);
                setStatus(true);
            })
            .finally(() => {
                setInfoToolTipPopup(true);
            })
    }

    function deleteToken() {
        setLoggedIn(false)
        localStorage.removeItem('token');
        history.push('/sign-in');
    }

    useEffect(() => {
        loggedIn ? history.push('/') : history.push('/sign-in')
    }, [loggedIn]);

    useEffect(() => {
        const closeByEscape = (event) => {
            if (event.key === 'Escape') {
                closeAllPopups()
            }
        }
        document.addEventListener('keyup', closeByEscape)
        return () => document.removeEventListener('keyup', closeByEscape)
    }, [selectedCard, isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen])

    function checkToken(localToken) {
        apiAuth
            .checkToken(localToken)
            .then((res) => {
                setLoggedIn(true);
                setEmail(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (localStorage.token) {
            checkToken(localStorage.token);
            history.push('/');
        }
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header email={email} quit={deleteToken}/>
            <Switch>
                <Route path="/sign-in">
                    <Login onSubmit={handleUserLogin}/>
                </Route>
                <Route path="/sign-up">
                    <Register onSubmit={handleUserRegister}/>
                </Route>
                <ProtectedRoute component={Main} cards={cards} loggedIn={loggedIn}
                                onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete} isLoading={isLoading} exact path="/"/>
            </Switch>
            <InfoTooltip isOpen={infoToolTipPopup} error={status} onClose={handlePopupClose}/>
            <SuccessfulLogin isOpen={successfulLogin} onClose={handlePopupClose}/>
            <ImagePopup card={selectedCard} onClose={handlePopupClose}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handlePopupClose}
                              onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose}
                             onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handlePopupClose}
                           onAddPlace={handleAddPlaceSubmit}/>
            <Footer/>
        </CurrentUserContext.Provider>
    )
}


export default App;