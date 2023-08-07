import axios from "axios";

const Domain = "http://localhost:3001";
const getTokenConfig = () => {
  const token = localStorage.getItem("todoToken") ?? "";
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
const ApiService = {
  register: (data) => {
    return axios.post(`${Domain}/api/auth/register`, data);
  },
  login: (data) => {
    return axios.post(`${Domain}/api/auth/login`, data);
  },
  getUserInfo: () => {
    return axios.get(`${Domain}/api/auth/userInfo`, getTokenConfig());
  },
  getCategory: () => {
    return axios.get(`${Domain}/api/category`, getTokenConfig());
  },
  addCategory: (data) => {
    return axios.post(`${Domain}/api/category`, data, getTokenConfig());
  },
  deleteCategory: (id) => {
    return axios.delete(`${Domain}/api/category/${id}`, getTokenConfig());
  },
  getTodoByCategory: (categoryId) => {
    return axios.get(`${Domain}/api/todos/${categoryId}`, getTokenConfig());
  },
  addTodoForCategory: (data) => {
    return axios.post(`${Domain}/api/todos`, data, getTokenConfig());
  },
  updateTodo: (data, id) => {
    return axios.put(`${Domain}/api/todos/${id}`, data, getTokenConfig());
  },
  deleteTodo: (id) => {
    return axios.delete(`${Domain}/api/todos/${id}`, getTokenConfig());
  },
};
export default ApiService;
