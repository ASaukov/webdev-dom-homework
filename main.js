"use strict";

import { getTodos, postTodo } from "./api.js";
import { fetchComments } from "./fetch.js";
import { changementLikes } from "./likes.js";
import { renderComments } from "./renderСomments.js";

  const buttonEl = document.getElementById('button');
  const inputName = document.querySelector('input');
  const textareaComment = document.getElementById('textarea');
  const loaderComments = document.querySelector('.loader-comments');
  const loaderNewcomment = document.querySelector('.loader-newcomment');
  const formEl = document.querySelector('.add-form');

  loaderComments.classList.remove("hidden")

  fetchComments();

  let comments = [];

  renderComments({comments});

    function protectInput(text) {
      return text.replaceAll('<', '&lt').replaceAll('>', '&gt')
      .replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
    }

buttonEl.setAttribute('disabled', true);
inputName.addEventListener('input', function (e) {
  if (inputName.value.trim() === '') {
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
    formEl.classList.add("hidden");

  postTodo({
    text: protectInput(textareaComment.value),
    name: protectInput(inputName.value),
  }).then((response) => {
    if(response.status === 400) {
      throw new Error("400")
    }

    if(response.status === 500) {
      throw new Error("500")
    }
  })
  
  .then(() => {
    inputName.value = "";
    textareaComment.value = "";
  })
  .catch((error) => {
    if(error) {
      formEl.classList.remove("hidden")
    }
    if(error.message === "400") {
      alert("Имя и комментарий должны быть не короче 3 символов");
      return;
    }
    if(error.message === "500") {
      alert("Сервер сломался, попробуй позже");
      return;
    }  
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      return;
    console.warn(error)
    
  })
  .then(() => {
    fetchComments();
  })
    
    changementLikes({comments}, {renderComments});
    renderComments({comments});    
  });
 
  console.log("It works!");