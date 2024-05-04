

export function changementLikes ({comments}, {renderComments}) {
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
        renderComments({comments});
      });
    }
  };