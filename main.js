"use strict";

import { renderForm } from "./addForm.js";
import { postTodo } from "./api.js";
import { fetchComments } from "./fetch.js";
import { changementLikes } from "./likes.js";
import { renderLogin } from "./loginPage.js";
import { renderComments } from "./renderСomments.js";

  const buttonEl = document.getElementById('button');
  const inputName = document.querySelector('input');
  const textareaComment = document.getElementById('textarea');
  const loaderComments = document.querySelector('.loader-comments');
  const loaderNewcomment = document.querySelector('.loader-newcomment');
  const formEl = document.querySelector('.add-form');
  const linkAuthotization = document.querySelector('.link-authorization');
  const listCart = document.getElementById('list');
  const titleLink = document.querySelector('.title-link');

  loaderComments.classList.remove("hidden")

  fetchComments();

  linkAuthotization.addEventListener('click', () => {
    listCart.classList.add("hidden");
    titleLink.classList.add("hidden");
    renderLogin();
  });

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
    // formEl.classList.add("hidden");

  postTodo({
    text: protectInput(textareaComment.value),
    name: protectInput(inputName.value),
  })
  .then(() => {
    fetchComments();
  })
    
    changementLikes({comments}, {renderComments});
    renderComments({comments});    
  });
 
  console.log("It works!");