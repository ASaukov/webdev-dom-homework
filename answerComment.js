

export function answerComment({comments}, {textareaComment}) {
    const commentHtml = document.querySelectorAll('.comment');
    commentHtml.forEach((el, index) => {
      el.addEventListener('click', function () {
       textareaComment.value = `QUOTE_BEGIN ${comments[index].text}\n ${comments[index].name} QUOTE_END`;
      });
    });
  };