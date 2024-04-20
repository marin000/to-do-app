import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

export default function DataTable({ todos, onCheck }) {

  const rows = todos ? todos.map(todo => ({
    id: todo._id,
    text: todo.text,
    done: todo.done
  })) : [];

  return (
    <TableContainer component={Paper} style={{ height: '65%', width: '90%', margin: '0 auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Done</TableCell>
            <TableCell align="right">Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Checkbox checked={row.done} onChange={() => onCheck(row.id, !row.done)} />
              </TableCell>
              <TableCell align="right" sx={{ width: '500px' }}>{row.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
