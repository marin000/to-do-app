import { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { todo } from "../../constants/todo";
import apiTodo from '../../api/todo';
import DataTable from "../../components/dataTable";
import './todo.css';
import AddTodoModal from "../../components/addTodoModal";

export default function Todo() {
  const theme = useTheme();
  const [todos, setTodos] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    apiTodo.getTodos()
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [todos]);

  const handleCheck = (taskId, check) => {
    const data = {
      done: check
    };
    apiTodo.updateTodo(taskId, data)
      .then((res) => {
        console.log("Todo updated successfully:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
  };

  return (
    <Box className='todo-container' bgcolor={theme.palette.background.default} >
      <Box sx={{ height: '100%' }}>
        <Box className='todo-header'>
          <Typography className='todo-title' color={theme.palette.text.primary}>{todo.title}</Typography>
          <IconButton className='todo-add-icon' onClick={handleOpenModal} >
              <AddCircleOutlineIcon fontSize='large' />
            </IconButton>
        </Box>
        <DataTable
          todos={todos}
          onCheck={handleCheck}
        />
      </Box>
      <AddTodoModal open={openAddModal} onClose={handleCloseModal} />
    </Box>
  )
}
