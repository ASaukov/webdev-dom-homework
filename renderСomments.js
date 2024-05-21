import { getDate } from "./getDate.js";
import { changementLikes } from "./likes.js";
import { answerComment } from "./answerComment.js";
import { user, token } from "./api.js";
import { renderLogin } from "./loginPage.js";
import { formEvents } from "./main.js";



export const renderComments = ({comments}) => {
  const appElement = document.querySelector('#app');
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

    const appHtml = `
    <ul id="list" class="comments">${commentsHtml}</ul>
    <div class="add-form">
      <input id="input" type="text" readonly class="add-form-name" value=${user} />
      <textarea id="textarea" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="button" class="add-form-button">Написать</button>
      </div>
    </div>`
  
    const appNoToken = `
    <ul id="list" class="comments">${commentsHtml}</ul>
    <span class="title-link" id="title-link">Что бы добавить коментарий,&nbsp;
      <a class="link-authorization" href="#" id="link-authorization">авторизутесь</a>
    </span>`

    if(token) {
      appElement.innerHTML = appHtml;
      changementLikes({comments}, {renderComments});
      answerComment({comments});
      formEvents();
    } else {
      appElement.innerHTML = appNoToken;
      const linkAuthotization = document.querySelector('.link-authorization');
    linkAuthotization.addEventListener('click', () => {
      const listCart = document.getElementById('list');
      const titleLink = document.querySelector('.title-link');
      listCart.classList.add("hidden");
      titleLink.classList.add("hidden");
      renderLogin();
    });
    }

  };