import axios from "axios"

const URL = process.env.REACT_APP_BACKEND_HOST

export const postUser = (body) => {
  return axios.post(`${URL}/user`, body);
};

export const getUser = (userid) => {
  return axios.get(`${URL}/user/${userid}`);
};

export const deleteUser = (userid) => {
  return axios.delete(`${URL}/user/${userid}`);
};

