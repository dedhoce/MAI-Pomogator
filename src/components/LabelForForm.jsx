import React from "react";

function LabelForForm({
  classType,
  typeInput,
  name,
  value,
  onChange,
  placeholder,
  onClick,
  isValid,
  errors,
  minLength,
  maxLength,
}) {
  return (
    <label className={classType ? "regist__form-field" : "popup__form-field"}>
      <input
        type={typeInput}
        name={name}
        className={classType ? "regist__input" : "popup__text"}
        id={classType ? `regist-${name}` : `popup-${name}`}
        value={value ? value : ""}
        onChange={onChange}
        placeholder={placeholder}
        required
        minLength={minLength}
        maxLength={maxLength}
      />
      <button
        onClick={onClick}
        type="button"
        name={`button-clear-input-${name}`}
        className={
          classType
            ? `regist__button-clear-input ${
                value ? "regist__button-clear-input_status_active" : ""
              }`
            : `popup__button-clear-input ${
                value ? "popup__button-clear-input_status_active" : ""
              }`
        }
        tabIndex="-1"
        disabled={!value}
      ></button>
      <span
        className={
          classType
            ? `regist__text-error regist-${name}-error ${
                !isValid ? "regist__text-error_active" : ""
              }`
            : `popup__text-error popup-${name}-error ${
                !isValid ? "popup__text-error_active" : ""
              }`
        }
      >
        {!(value === "") && !isValid && value ? errors : ""}
      </span>
    </label>
  );
}

export { LabelForForm };
