const baseUrl = "http://localhost:3001";

function getResult(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => getResult(res));
}
function addaItem({ nameValue, urlValue, type }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameValue,
      imageUrl: urlValue,
      weather: type,
    }),
  }).then((res) => getResult(res));
}
function deleteItem({ _id }) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => getResult(res));
}

export { getItems, getResult, addaItem, deleteItem, baseUrl };
