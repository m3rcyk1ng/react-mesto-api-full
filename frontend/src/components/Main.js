import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {apiAuth} from "../utils/ApiAuth";
import Spinner from './Spinner';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    return (

        <main className="content">
            {isLoading ? <Spinner /> :
                <><section className="profile">
                    <div className="profile__titles">
                        <img className="profile__avatar" title="" src={currentUser.avatar} alt="Аватарка" />
                        <div className="profile__overlay" onClick={onEditAvatar}></div>
                        <div className="profile__titles-box">
                            <div className="profile__title-box">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button className="profile__button-edit" type="button" aria-label="Отредактировать профиль"
                                        onClick={onEditProfile}></button>
                            </div>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="Добавить новую карточку"
                            onClick={onAddPlace}></button>
                </section><section className="elements">{cards.map((card) => (
                    <Card key={card._id} card={card}
                          onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}</section></>
            }
        </main>
    )
}

export default Main;