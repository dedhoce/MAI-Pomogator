import React, { useState, useEffect } from "react"; // импорт библиотеки
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ButtonTextContext } from "../contexts/ButtonTextContext";
import ImageAvatar from "../images/image.jpg";
//import api from "../utils/Api";
import auth from "../utils/auth";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import { Layout } from "./Layout";

// токен телеграм
const tokenTgBot = '6802445883:AAGeGU9Grw8rBtxZLYVELa7KvGwWCNryIyc'

function App() {
  
  /* Глобальный стэйт с данными профиля пользователя. */
  const [currentUser, setCurrentUser] = useState({
    name: '',
    avatar: ImageAvatar,
  });  
  
  /** стэйты для изменения текста в кнопках сабмита в формах. */
  const [isLoading, setIsLoading] = useState(false);

  /** Стэйт авторизации пользователя. */
  const [loggedIn, setLoggedIn] = useState(false);
  const [userAuthInfo, setUserAuthInfo] = useState({});

  const handleLogin = () => {
    setLoggedIn(true);
  }; 

  /** Отправляем данные для регимстрации пользователя, меняем подпись кнопки сабмита при загрузке,
   *  при положительном ответе переходим в окно входа. */
  const navigate = useNavigate();
  function handleRegisterUser({ email, password }) {
    callingBaseToServer({
      apiMetod: auth.regisrationNewUser({ email, password }),
      thenCallback: (res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }        
        navigate("/sign-in", { replace: true });
      }     
    });
  }

  function handleEnterUser({ email, password }) {
    callingBaseToServer({
      apiMetod: auth.getUserToken({ email, password }),
      thenCallback: (res) => {
        if (res.token) {
          setUserAuthInfo({ email });
          localStorage.setItem("jwt", res.token);
          handleLogin();
          navigate("/", { replace: true });
        }
      }      
    });
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const localJWT = localStorage.getItem("jwt");
      callingBaseToServer({
        apiMetod: auth.checkUserToken(localJWT),
        thenCallback: (res) => {
          if (res) {
            setUserAuthInfo(res.data);
            handleLogin();
            navigate("/", { replace: true });
          }
        },
      });
    } else {
      navigate("/sign-in", { replace: true });
    }
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setUserAuthInfo({});
    navigate("/sign-in", { replace: true });
  };

  /** Базовая функция для обращения к серверу и обработки ответа,
   * принимает апи метод и колбэк then так как обрабтка промиса индивидуальная. */
  function callingBaseToServer({ apiMetod, thenCallback }) {
    setIsLoading(true);
    apiMetod
      .then(thenCallback)
      .catch((err) => {                
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }   

  return (       
    <CurrentUserContext.Provider value={currentUser}>
      <ButtonTextContext.Provider value={isLoading}>
        <div className="content">
          <Routes>
            <Route
              to="/"
              element={
                <Layout email={userAuthInfo.email} onExit={handleSignOut} /> }>
              <Route 
                to='*' 
                element={<Navigate to='/' replace/>} />
              <Route
                path="sign-up"
                element={
                  <Register
                    nameForm="registration"
                    onRegisterUser={handleRegisterUser}/> }/>
              <Route
                path="sign-in"
                element={
                  <Login nameForm="login" onEnterUser={handleEnterUser} /> }/>
              <Route
                index
                element={
                  <ProtectedRouteElement
                    component={Main}                     
                    loggedIn={loggedIn} /> }/>
            </Route>
          </Routes>            
        </div>
      </ButtonTextContext.Provider>
    </CurrentUserContext.Provider>            
  );
}

export default App;
