import { getDate } from "./getDate.js";
import { changementLikes } from "./likes.js";

const listCart = document.getElementById('list');

export const renderComments = ({comments}) => {
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
    changementLikes({});
    // function answerComment() {
        const commentHtml = document.querySelectorAll('.comment');
        commentHtml.forEach((el, index) => {
          el.addEventListener('click', function () {
            textareaComment.value = `QUOTE_BEGIN ${comments[index].text}\n ${comments[index].name} QUOTE_END`;
          });
        });
    //   };
  };
  