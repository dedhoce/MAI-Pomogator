import React from "react";
import ComponentWithForm from "./ComponentWithFormForLoginPage";

function Login({ onEnterUser }) {
  return (
    <div className="regist">
      <div className="regist__block-form">
        <h2 className="regist__title">Вход</h2>
        <ComponentWithForm setUserInfo={onEnterUser} nameForm="login" />
      </div>
    </div>
  );
}

export default Login;
