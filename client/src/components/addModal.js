import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { todo } from '../constants/todo';
import { useTheme } from '@emotion/react';
import '../styles/modals.css';

export default function AddTodoModal({ open, onClose, handleAddTask }) {
  const theme = useTheme();
  const { addTodo, buttonAdd } = todo;
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const onSubmit = () => {
    handleAddTask(taskText);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ bgcolor: theme.palette.background.default }}
        className='modal-container'
      >
        <Typography variant="h5" color={theme.palette.text.primary}>
          {addTodo}
        </Typography>
        <IconButton className='modal-close' onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <TextField
          id="task-text"
          label="Task Text"
          fullWidth
          value={taskText}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <Button disabled={!taskText} onClick={() => onSubmit()} variant="contained" color="primary">
          {buttonAdd}
        </Button>
      </Box>
    </Modal>
  );
}
