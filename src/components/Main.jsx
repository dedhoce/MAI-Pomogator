import React, { useContext } from "react"; // импорт библиотеки

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__block">
          <div className="profile__edit-avatar">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar" />            
          </div>
          <div className="profile__info">
            <div className="profile__position-name-button">
              <h1 className="profile__name">{currentUser.name}</h1>              
            </div>
            <p className="profile__subname">{currentUser.about}</p>
          </div>
        </div>        
      </section>
      <section aria-label="elements">        
      </section>
    </main>
  );
}

export default Main;
