import React from "react";
import { Link } from "react-router-dom";
import ComponentWithForm from "./ComponentWithFormForLoginPage";

function Register({ onRegisterUser }) {
  return (
    <div className="regist">
      <div className="regist__block-form">
        <h2 className="regist__title">Регистрация</h2>
        <ComponentWithForm setUserInfo={onRegisterUser} nameForm="register" />
        <h3 className="regist__text">
          Уже зарегестрированны?
          <Link to="/sign-in" className="regist__text-link">
            Войти
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Register;
