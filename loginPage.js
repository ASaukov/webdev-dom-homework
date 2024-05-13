import { login } from "./api.js";

const buttonElement = document.getElementById('login-button');
const loginInputElement = document.getElementById('login-input');
const passwordElement = document.getElementById('password-input');

buttonElement.addEventListener('click', () => {
    login({
        login: loginInputElement.value,
        password: passwordElement.value,
    }).then((responseData) => {
console.log(responseData);
    })
});