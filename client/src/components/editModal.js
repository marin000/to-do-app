import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import { todo } from '../constants/todo';
import { useTheme } from '@emotion/react';
import '../styles/modals.css';

export default function EditModal({ selectedTask, open, onClose, handleEditTodo }) {
  const theme = useTheme();
  const { editTodo, buttonConfirm } = todo;
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleSubmit = () => {
    handleEditTodo(selectedTask.id, { text: taskText });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ bgcolor: theme.palette.background.default }}
        className='modal-container'
      >
        <Typography variant="h5" color={theme.palette.text.primary}>
          {editTodo}
        </Typography>
        <IconButton className='modal-close' onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <TextField
          id="task-text"
          label="Task Text"
          fullWidth
          value={taskText || selectedTask?.text}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <Button disabled={!taskText} onClick={handleSubmit} variant="contained" color="primary">
          {buttonConfirm}
        </Button>
      </Box>
    </Modal>
  );
}
