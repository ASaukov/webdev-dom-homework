"use strict";

import { postTodo } from "./api.js";
import { fetchComments } from "./fetch comments.js";

export let commentText = "";
function setCommentText(newValue) {
  commentText = newValue;
}

const loaderComments = document.querySelector('.loader-comments');


loaderComments.classList.remove("hidden")

fetchComments();

let comments = [];

export function protectInput(text) {
  return text.replaceAll('<', '&lt').replaceAll('>', '&gt')
    .replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
}

const loaderNewcomment = document.querySelector('.loader-newcomment');

export function formEvents() {
  const buttonEl = document.getElementById('button');
  const inputName = document.querySelector('#input');
  const textareaComment = document.getElementById('textarea');

  buttonEl.setAttribute('disabled', true);
  textareaComment.addEventListener('input', function (e) {
    if (textareaComment.value.trim() === '') {
      buttonEl.setAttribute('disabled', true);
    } else {
      buttonEl.removeAttribute('disabled')
    }
  });

  buttonEl.addEventListener('click', () => {
    inputName.classList.remove("error");
    textareaComment.classList.remove("error");
    if (inputName.value === '' || textareaComment.value === '') {
      inputName.classList.add("error"), textareaComment.classList.add("error");
      return;
    };

    loaderNewcomment.classList.remove("hidden");
    document.querySelector('.add-form').classList.add("hidden");

    setCommentText(protectInput(textareaComment.value))

    postTodo({
      text: protectInput(textareaComment.value),
      name: protectInput(inputName.value),
    })
      .then(() => {
        setCommentText("")
        inputName.value = "";
        textareaComment.value = "";
      })
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "400") {
          alert("Имя и комментарий должны быть не короче 3 символов");
          return;
        }
        if (error.message === "500") {
          alert("Сервер сломался, попробуй позже");
          return;
        }
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      })
      .finally(() => {
        document.querySelector('.add-form').classList.remove("hidden")
      })

  });
}

console.log("It works!");