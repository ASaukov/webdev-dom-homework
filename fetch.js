import { renderForm } from "./addForm.js";
import { getTodos } from "./api.js";
import { renderComments } from "./renderСomments.js";
const loaderComments = document.querySelector('.loader-comments');
const formEl = document.querySelector('.add-form');
const loaderNewcomment = document.querySelector('.loader-newcomment');
const titleLink = document.querySelector('.title-link');

export const fetchComments = (comments) => {
    getTodos()
    .then((responseData) => {
      loaderComments.classList.add("hidden")
      // formEl.classList.remove("hidden");
      loaderNewcomment.classList.add("hidden");
      titleLink.classList.remove('hidden');
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
      renderComments({comments});
      });
    };
    