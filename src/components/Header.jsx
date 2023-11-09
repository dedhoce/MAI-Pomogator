import React from "react"; // импорт библиотеки
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function Header({ email, onExit }) {
  const location = useLocation();
  const { width } = useWindowDimensions();

  const [isBarOpen, setIsBarOpen] = useState(false);

  return (
    <>
      {width <= 767 &&
      width >= 320 &&
      location.pathname === "/" &&
      isBarOpen ? (
        <div className="header__email-botton-case ">
          <h2 className="header__user-email">{email}</h2>
          <button onClick={onExit} className="header__log-out">
            Выход
          </button>
        </div>
      ) : (
        ""
      )}
      <header className="header">
        <div className="logo">MAI-Pomogator</div>
        {/* Проверяю рамерность экрана и находимся ли на странице домашней, так же проверяю открыт ли бар, чтоб назначить в этом состоянии нужную кнопку */}
        {width <= 767 &&
        width >= 320 &&
        location.pathname === "/" &&
        !isBarOpen ? (
          <button
            onClick={() => {
              setIsBarOpen(true);
            }}
            className="header__button-bar-open"
          ></button>
        ) : (
          ""
        )}
        {width <= 767 &&
        width >= 320 &&
        location.pathname === "/" &&
        isBarOpen ? (
          <button
            onClick={() => {
              setIsBarOpen(false);
            }}
            className="header__button-bar-close"
          ></button>
        ) : (
          ""
        )}
        {width >= 768 && location.pathname === "/" ? (
          <div className="header__email-botton-case">
            <h2 className="header__user-email">{email}</h2>
            <button onClick={onExit} className="header__log-out">
              Выход
            </button>
          </div>
        ) : location.pathname === "/sign-in" ? (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        ) : location.pathname === "/sign-up" ? (
          <Link to="/sign-in" className="header__link">
            Вход
          </Link>
        ) : (
          ""
        )}
      </header>
    </>
  );
}

export default Header;
