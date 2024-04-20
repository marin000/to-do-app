import axiosInstance from '../utils/axios';

const url = '/api/todos';

const getTodos = () => axiosInstance.get(url);
const updateTodo = (id, data) => axiosInstance.patch(`${url}/${id}`, data);

export default {
  getTodos,
  updateTodo
}
