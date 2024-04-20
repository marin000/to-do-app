import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import apiTodo from '../api/todo';
import { todo } from '../constants/todo';
import { useTheme } from '@emotion/react';

export default function AddTodoModal({ open, onClose }) {
  const theme = useTheme();
  const { addTodo, buttonAdd } = todo;
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      text: taskText
    };
    apiTodo
      .createTodo(data)
      .then((res) => {
        console.log('Todo created successfully:', res.data);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: theme.palette.background.default,
          boxShadow: 24,
          p: 4,
          borderRadius: 5
        }}
      >
        <Typography variant="h5" color={theme.palette.text.primary}>
          {addTodo}
        </Typography>
        <TextField
          id="task-text"
          label="Task Text"
          fullWidth
          value={taskText}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {buttonAdd}
        </Button>
      </Box>
    </Modal>
  );
}
