const apiAdres = "https://wedev-api.sky.pro/api/v1/:aleksandr-saukov/comments";

export function getTodos() {
    return fetch(apiAdres, {
        method: "GET",
      })
      .then((response) => {
       return response.json();
      })
};

export function postTodo({text, name}) {
    return fetch(apiAdres, {
        method: "POST",
        body: JSON.stringify ({
          text: text,
          name: name,
          forceError: true,
        })
      })
};