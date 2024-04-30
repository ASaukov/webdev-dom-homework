"use strict";

import { getTodos, postTodo } from "./api.js";

  const buttonEl = document.getElementById('button');
  const inputName = document.querySelector('input');
  const textareaComment = document.getElementById('textarea');
  const listCart = document.getElementById('list');
  const loaderComments = document.querySelector('.loader-comments');
  const loaderNewcomment = document.querySelector('.loader-newcomment');
  const formEl = document.querySelector('.add-form');
//   const apiAdres = "https://wedev-api.sky.pro/api/v1/:aleksandr-saukov/comments"

  loaderComments.classList.remove("hidden")
  const fetchComments = () => {
    
//     fetch(apiAdres, {
//     method: "GET",
//   })
//   .then((response) => {
//    return response.json();
//   })
  getTodos().then((responseData) => {
    loaderComments.classList.add("hidden")
    formEl.classList.remove("hidden");
    loaderNewcomment.classList.add("hidden");
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    comments = appComments;
      renderComments();
    });
  
  };
  fetchComments();

  let comments = [];

    const renderComments = () => {
      const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${getDate(comment.date)}</div>
          </div> 
          <div class="comment-body">
            <div class="comment-text"> 
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index='${index}'></button>
            </div>
          </div>
        </li>`;
      })
      .join('');
      listCart.innerHTML = commentsHtml;
      changementLikes();
      answerComment();
    };
    

    function answerComment() {
      const commentHtml = document.querySelectorAll('.comment');
      commentHtml.forEach((el, index) => {
        el.addEventListener('click', function () {
          textareaComment.value = `QUOTE_BEGIN ${comments[index].text}\n ${comments[index].name} QUOTE_END`;
        });
      });
    };

    renderComments();


    function changementLikes () {
      const likeButtons = document.querySelectorAll('.like-button');
      for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (e) => {
          e.stopPropagation();
          if (comments[likeButton.dataset.index].isLiked) {
            comments[likeButton.dataset.index].isLiked = false;
            comments[likeButton.dataset.index].likes --;
          } else {
            comments[likeButton.dataset.index].isLiked = true;
            comments[likeButton.dataset.index].likes ++;
          }
          renderComments();
        });
      }
    };
    
    function protectInput(text) {
      return text.replaceAll('<', '&lt').replaceAll('>', '&gt')
      .replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
    }

  const getDate = (commentDate) => {
    let d = new Date(commentDate);
  function addZero(a) {
    return (a < 10) ? '0' + a : a;
  }
  let date = addZero(d.getDate());
  let month = addZero(d.getMonth() + 1);
  let year = d.getFullYear();
  let hours = addZero(d.getHours());
  let min = addZero(d.getMinutes());
  const userDate = date + '.' + month + '.' + year + ' ' + hours + ':' + min;
  return userDate;
  };
  

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

//   fetch(apiAdres, {
//     method: "POST",
//     body: JSON.stringify ({
//       text: protectInput(textareaComment.value),
//       name: protectInput(inputName.value),
//       forceError: true,
//     })
//   })
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
  .then((responseData) => {
    fetchComments();
  })
    
    changementLikes();
    renderComments();    
  });
 
  console.log("It works!");