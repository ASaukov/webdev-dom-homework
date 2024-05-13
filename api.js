const apiAdres = "https://wedev-api.sky.pro/api/v2/:aleksandr-saukov/comments";
const apiUser = "https://wedev-api.sky.pro/api/user/login";

let token = null;
export const getToken = () => {
return token;
}

export const setToken = (newToken) => {
  token = newToken;
  }

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