import { baseUrl, getResult } from "./api";
function signUp({ email, password, name, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  }).then((res) => getResult(res));
}

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => getResult(res));
}

export { signIn, signUp };
