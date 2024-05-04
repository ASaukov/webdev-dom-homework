export function answerComment({comments}) {
    const commentHtml = document.querySelectorAll('.comment');
    commentHtml.forEach((el, index) => {
      const textareaComment = document.getElementById('textarea');
      el.addEventListener('click', function () {
       textareaComment.value = `QUOTE_BEGIN ${comments[index].text}\n ${comments[index].name} QUOTE_END`;
      });
    });
  };