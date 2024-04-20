import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './editModal';

export default function DataTable({ todos, handleEditTodo, handleDeleteTodo }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortByStatus, setSortByStatus] = useState('asc');

  const rows = todos ? todos.map(todo => ({
    id: todo._id,
    text: todo.text,
    done: todo.done
  })) : [];

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedTask(null);
    setOpenEditModal(false);
  };

  const handleSortStatus = () => {
    setSortByStatus(sortByStatus === 'asc' ? 'desc' : 'asc');
  };

  const sortedRows = sortByStatus === 'asc' ? [...todos].sort((a, b) => a.done - b.done) : [...todos].sort((a, b) => b.done - a.done);

  return (
    <>
      <TableContainer component={Paper} style={{ height: '65%', width: '90%', margin: '0 auto', borderRadius: '15px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortByStatus}
                  onClick={handleSortStatus}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Task</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox checked={row.done} onChange={() => handleEditTodo(row.id, { done: !row.done })} />
                </TableCell>
                <TableCell align="right" sx={{ width: '500px' }}>{row.text}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditModal(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteTodo(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditModal
        selectedTask={selectedTask}
        open={openEditModal}
        onClose={handleCloseEditModal}
        handleEditTodo={handleEditTodo} />
    </>
  );
}
