import { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import { todo } from "../../constants/todo";
import apiTodo from '../../api/todo';
import DataTable from "../../components/dataTable";
import './todo.css';

export default function Todo() {
  const theme = useTheme();
  const { title } = todo;
  const [todos, setTodos] = useState(null);

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

  return (
    <Box className='todo-container' bgcolor={theme.palette.background.default} >
      <Box sx={{ height: '100%' }}>
        <Box className='todo-header'>
          <IconButton color={theme.palette.primary.main} style={{ marginBottom: '20px' }}>
            <TaskIcon fontSize='large' />
          </IconButton>
          <Typography className='todo-title' color={theme.palette.text.primary}>{title}</Typography>
        </Box>
        <DataTable
          todos={todos}
          onCheck={handleCheck}
        />
      </Box>
    </Box>
  )
}
