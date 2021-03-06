const api = process.env.REACT_APP_PHONES_API_URL || "http://localhost:5001";

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const getAll = () =>
  fetch(`${api}/phones`, { headers })
    .then(res => res.json())
    .then(data => data.phones);
