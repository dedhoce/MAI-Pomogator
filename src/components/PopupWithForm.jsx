import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  name,
  isOpen,
  specClass,
  title,
  onSubmit,
  children,
  buttonStatus,
  buttonText
}) {
  
  return (
    <Popup isOpen={isOpen} specClass={specClass} title={title} name={name}>
      <form
        onSubmit={onSubmit}
        name={name}
        className="popup__form-input"
        noValidate
      >
        {children}
        <button
          type="submit"
          name="popup__button-save"
          className={`popup__button-save ${
            !buttonStatus ? "popup__button-save_inactive" : ""
          }`}
          disabled={!buttonStatus}
        >
          {buttonText}         
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
