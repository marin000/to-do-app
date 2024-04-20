import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme, IconButton, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { todo } from "../../constants/todo";
import apiTodo from '../../api/todo';
import DataTable from "../../components/dataTable";
import './todo.css';
import AddTodoModal from "../../components/addModal";

export default function Todo() {
  const theme = useTheme();
  const { noTasks, title } = todo;
  const [todos, setTodos] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllTasks = () => {
    apiTodo.getTodos()
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getAllTasks();
  }, []);

  const handleAddTask = (text) => {
    const data = { text: text };
    apiTodo
      .createTodo(data)
      .then((res) => {
        console.log('Todo created successfully:', res.data);
        getAllTasks();
      })
      .catch((err) => {
        alert(err.response.data.errors[0].msg);
        console.log(err);
      });
  };

  const handleEditTodo = (taskId, data) => {
    apiTodo.updateTodo(taskId, data)
      .then((res) => {
        console.log("Todo updated successfully:", res.data);
        getAllTasks();
      })
      .catch((err) => {
        alert(err.response.data.errors[0].msg);
        console.log(err);
      });
  };

  const handleDeleteTodo = (taskId) => {
    apiTodo.deleteTodo(taskId)
      .then(() => {
        console.log("Todo deleted successfully:");
        getAllTasks();
      })
      .catch((err) => {
        alert(err.response.data.errors[0].msg);
        console.log(err);
      });
  };

  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
  };

  if (loading) {
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color="inherit" />
    </Box>
  }

  return (
    <Box className='todo-container' bgcolor={theme.palette.background.default} >
      <Box sx={{ height: '100%' }}>
        <Box className='todo-header'>
          <Link to="/">
            <IconButton className='todo-back-icon' >
              <ArrowBackIcon fontSize='large' />
            </IconButton>
          </Link>
          <Typography className='todo-title' color={theme.palette.text.primary}>{title}</Typography>
          <IconButton className='todo-add-icon' onClick={handleOpenModal} >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        </Box>
        {todos ?
          <DataTable
            todos={todos}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
          : <Typography className='todo-noTasks' color={theme.palette.text.primary}>{noTasks}</Typography>
        }
      </Box>
      <AddTodoModal open={openAddModal} onClose={handleCloseModal} handleAddTask={handleAddTask} />
    </Box>
  )
}
