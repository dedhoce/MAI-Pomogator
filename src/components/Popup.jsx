import React, { useEffect, useContext } from "react";
import { OnCloseContext } from "../contexts/OnCloseContext";
// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, title, specClass, children, flag, icon }) => {
  const closeAllPopups = useContext(OnCloseContext);
  // внутри указываем `useEffect` для обработчика `Escape`

  useEffect(() => {
    function closePopupByEsc(key) {
      if (key.key === "Escape") {
        closeAllPopups();
      }
    }
    function closePopupByClickOverlay(e) {
      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closePopupByEsc);
      document.addEventListener("click", closePopupByClickOverlay);
      return () => {
        document.removeEventListener("keydown", closePopupByEsc);
        document.removeEventListener("click", closePopupByClickOverlay);
      };
    }
  }, [isOpen]);

  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_status_active" : ""}`}>
      <div className={flag ? specClass : `popup__form ${specClass}`}>
        {icon ? (
          <img
            src={require(`../images/${icon}`)}
            alt="#"
            className={`${specClass}__image`}
          />
        ) : (
          ""
        )}
        {title ? <h2 className={`popup__title ${specClass}__title`}>{title}</h2> : ""}
        <button
          type="button"
          name="popup__button"
          className="popup__button-close"
          onClick={closeAllPopups}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
