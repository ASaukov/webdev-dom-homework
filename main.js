"use strict";

import { postTodo } from "./api.js";
import { fetchComments } from "./fetch.js";
import { changementLikes } from "./likes.js";
import { renderComments } from "./renderСomments.js";

const loaderComments = document.querySelector('.loader-comments');


  loaderComments.classList.remove("hidden")

  fetchComments();

  let comments = [];

  // renderComments({comments});

    export function protectInput(text) {
      return text.replaceAll('<', '&lt').replaceAll('>', '&gt')
      .replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
    }

    const loaderNewcomment = document.querySelector('.loader-newcomment');

    const buttonEl = document.getElementById('button');
    const inputName = document.querySelector('#input');
    const textareaComment = document.getElementById('textarea');

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