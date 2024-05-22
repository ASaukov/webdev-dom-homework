import { renderLogin } from "./loginPage.js";

export const renderRegistr = () => {
    const appElement = document.querySelector('#app');
    const registrHtml = `
    <div class="login-form">
        <h2 class="login-header">Форма регистрации</h2>
        <input id="name-input" type="text" class="input-form" placeholder="Введите логин" />
        <input id="login-input" type="text" class="input-form" placeholder="Введите логин" />
        <input id="password-input" type="text" class="input-form" placeholder="Введите пароль" />
        <button id="login-button" class="add-form-button">Зарегистрироваться</button>
        <a class="enter-login" href="#" id="enter-login">Войти</a>
      </div>`;

      appElement.innerHTML = registrHtml;

      const enterElement = document.getElementById('enter-login');
enterElement.addEventListener('click', () => {
    renderLogin();
});
};

