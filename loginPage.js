import { login, setToken, token } from "./api.js";
import { renderRegistr } from "./registrPage.js";


export const renderLogin = () => {
    const appElement = document.getElementById('app');
    const loginHtml = `
    <div class="login-form">
        <h2 class="login-header">Форма входа</h2>
        <input id="login-input" type="text" class="input-form" placeholder="Введите логин" />
        <input id="password-input" type="text" class="input-form" placeholder="Введите пароль" />
        <button id="login-button" class="add-form-button">Войти</button>
        <a class="registration" href="#" id="registration">Зарегистрироваться</a>
      </div>`;

      appElement.innerHTML = loginHtml;

      const buttonElement = document.getElementById('login-button');
      const loginInputElement = document.getElementById('login-input');
      const passwordElement = document.getElementById('password-input');
      
      buttonElement.addEventListener('click', () => {
          login({
              login: loginInputElement.value,
              password: passwordElement.value,
          }).then((responseData) => {
              setToken(responseData.user.token);
              console.log(token);
          });
      });

    const registrElement = document.getElementById('registration');
    registrElement.addEventListener('click', () => {
    renderRegistr();
    });
    
};
