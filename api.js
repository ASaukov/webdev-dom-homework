const apiAdres = "https://wedev-api.sky.pro/api/v2/:aleksandr-saukov/comments";
const apiUser = "https://wedev-api.sky.pro/api/user/login";

export let token = null;
export const getToken = () => {
return token;
}

export const setToken = (newToken) => {
  token = newToken;
  }

  export let user = null;
  export const setName = (newName) => {
    user = newName
  }

export function getTodos() {
    return fetch(apiAdres, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
       return response.json();
      })
};

export function postTodo({text, name}) {
    return fetch(apiAdres, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify ({
          text: text,
          name: name,
          forceError: true,
        })
      })
      .then((response) => {
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
      })
};

export function login({login, password}) {
  return fetch(apiUser, {
      method: "POST",
      body: JSON.stringify ({
        login,
        password,
      }),
    }).then((response) => {
      return response.json();
    });
};