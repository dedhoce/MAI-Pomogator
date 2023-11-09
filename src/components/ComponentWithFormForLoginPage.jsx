import React, { useContext } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { ButtonTextContext } from "../contexts/ButtonTextContext";
import { LabelForForm } from "./LabelForForm"; 

function ComponentWithForm({ nameForm, setUserInfo }) {
  const isLoading = useContext(ButtonTextContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  //передаем данные стэйтов в запрос к серверу при сабмите
  function handleSubmit(e) {
    e.preventDefault();
    setUserInfo({
      email: values.email,
      password: values.password,
    });
    resetForm({}, {}, false);
  } 

  return (
    <form
      onSubmit={handleSubmit}
      name={nameForm}
      className="regist__form"
      noValidate
    >
      <LabelForForm
        classType={true}
        typeInput="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        onClick={() => resetForm({ ...values, email: "" }, {}, false)}
        isValid={isValid}
        errors={errors.email}
        minLength=""
        maxLength=""
      />
      <LabelForForm
        classType={true}
        typeInput="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Пароль"
        onClick={() => resetForm({ ...values, password: "" }, {}, false)}
        isValid={isValid}
        errors={errors.password}
        minLength=""
        maxLength=""
      />
      <button
        type="submit"
        name="regist__button-save"
        className={`regist__button-save ${
          !isValid ? "regist__button-save_inactive" : ""
        }`}
        disabled={!isValid}
      >
        {nameForm === "register"
          ? !isLoading
            ? "Зарегестрироваться"
            : "Регистрация..."
          : ""}
        {nameForm === "login" ? (!isLoading ? "Вход" : "Проверка...") : ""}
      </button>
      <button 
        type="button"
        className="button verificate-tg-button"          
        disabled
        >Войти</button>
    </form>      
  );
}

export default ComponentWithForm;
