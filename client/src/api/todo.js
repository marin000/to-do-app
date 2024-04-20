import axiosInstance from '../utils/axios';

const url = '/api/todos';

const createTodo = (text) => axiosInstance.post(url, text); 
const getTodos = () => axiosInstance.get(url);
const updateTodo = (id, data) => axiosInstance.patch(`${url}/${id}`, data);
const getTodoById = (id) => axiosInstance.get(`${url}/${id}`);
const deleteTodo = (id) => axiosInstance.delete(`${url}/${id}`);

export default {
  createTodo,
  getTodos,
  updateTodo,
  getTodoById,
  deleteTodo
}
