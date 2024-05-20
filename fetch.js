
import { getTodos, postTodo } from "./api.js";
import { changementLikes } from "./likes.js";
import { renderComments } from "./renderСomments.js";

// const titleLink = document.querySelector('.title-link');

export const fetchComments = (comments) => {
    getTodos()
    .then((responseData) => {
      loaderComments.classList.add("hidden")
      loaderNewcomment.classList.add("hidden");
      // titleLink.classList.remove('hidden');
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
     
      const loaderComments = document.querySelector('.loader-comments');
      const loaderNewcomment = document.querySelector('.loader-newcomment');
    

  };
    