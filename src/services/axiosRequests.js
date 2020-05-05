import axios from 'axios'

const apiURL='https://test-api.updivision.work/api';

export const httpService = {
  login,
  register,
  getProducts
};

function login(user) {

  return axios.post(`${apiURL}/login`,user);
}

function register(user) {
  return axios.post(`${apiURL}/register`,user);
}

function getProducts() {
  const url = `${apiURL}/products`;
  let token = JSON.parse(localStorage.getItem('token'));
  const AuthStr = `Bearer ${token}`;
  return axios.get(url, { headers: { 'Accept': 'application/json', 'Authorization': AuthStr } })
}
