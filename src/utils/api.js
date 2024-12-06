const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrbyjulie.twilightparadox.com"
    : "http://localhost:3001";

function getResult(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}
function request(url, options) {
  return fetch(url, options).then(getResult);
}
function getItems() {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function addaItem({ nameValue, urlValue, type }, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameValue,
      imageUrl: urlValue,
      weather: type,
    }),
  });
}
function deleteItem({ _id }, token) {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
const getUserInfo = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const updateProfile = ({ name, avatar }, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar,
    }),
  });
};
const likeItem = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const dislikeItem = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export {
  getItems,
  getResult,
  addaItem,
  deleteItem,
  getUserInfo,
  updateProfile,
  likeItem,
  dislikeItem,
  baseUrl,
};
