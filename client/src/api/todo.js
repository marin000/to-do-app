import axiosInstance from '../utils/axios';

const url = '/api/todos';

const createTodo = (text) => axiosInstance.post(url, text); 
const getTodos = () => axiosInstance.get(url);
const updateTodo = (id, data) => axiosInstance.patch(`${url}/${id}`, data);

export default {
  createTodo,
  getTodos,
  updateTodo
}
