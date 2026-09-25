import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

const employees = [
  { id: 'mohamed-riyanudeen', name: 'Mohamed Riyanudeen', role: 'AWS Solutions Architect' },
  { id: 'riyanudeen', name: 'Riyanudeen', role: 'Solutions Architect' },
  { id: 'system-account', name: 'System Account', role: 'Read-Only' },
  { id: 'aisha-rahman', name: 'Aisha Rahman', role: 'Product Manager' },
  { id: 'daniel-wong', name: 'Daniel Wong', role: 'Security Analyst' },
];

type Task = {
  id: number;
  employeeId: string;
  title: string;
  due: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, employeeId: 'mohamed-riyanudeen', title: 'Review AWS architecture proposal', due: 'Today', priority: 'High', completed: false },
  { id: 2, employeeId: 'mohamed-riyanudeen', title: 'Complete quarterly access review', due: 'Tomorrow', priority: 'Medium', completed: false },
  { id: 3, employeeId: 'riyanudeen', title: 'Prepare solution workshop', due: 'Sep 29', priority: 'Medium', completed: true },
  { id: 4, employeeId: 'aisha-rahman', title: 'Share product launch brief', due: 'Oct 02', priority: 'Low', completed: false },
];

const priorityColors = { High: 'error', Medium: 'warning', Low: 'default' } as const;

export default function EmployeeTasksPage() {
  const [searchParams] = useSearchParams();
  const [selectedEmployee, setSelectedEmployee] = useState(
    searchParams.get('employee') ?? employees[0].id
  );
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const employee = employees.find((item) => item.id === selectedEmployee) ?? employees[0];
  const employeeTasks = useMemo(
    () => tasks.filter((task) => task.employeeId === selectedEmployee),
    [selectedEmployee, tasks]
  );
  const completedCount = employeeTasks.filter((task) => task.completed).length;
  const progress = employeeTasks.length ? Math.round((completedCount / employeeTasks.length) * 100) : 0;

  const toggleTask = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const addTask = () => {
    const title = newTask.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), employeeId: selectedEmployee, title, due: 'No due date', priority: 'Medium', completed: false },
    ]);
    setNewTask('');
  };

  return (
    <>
      <title>{`Employee tasks - ${CONFIG.appName}`}</title>
      <DashboardContent>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4">Employee tasks</Typography>
          <Typography color="text.secondary">
            Assign work, track progress, and keep each employee&apos;s next steps visible.
          </Typography>
        </Stack>

        <Card sx={{ mb: 3, p: 2.5 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }}>
            <FormControl sx={{ minWidth: { xs: '100%', md: 320 } }}>
              <InputLabel id="employee-task-owner">Employee</InputLabel>
              <Select
                labelId="employee-task-owner"
                value={selectedEmployee}
                label="Employee"
                onChange={(event) => setSelectedEmployee(event.target.value)}
              >
                {employees.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="subtitle1">{employee.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{employee.role}</Typography>
                </Box>
                <Typography variant="subtitle2">{completedCount}/{employeeTasks.length} complete</Typography>
              </Stack>
              <Box sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', overflow: 'hidden' }}>
                <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: 'success.main', transition: 'width 300ms ease' }} />
              </Box>
            </Box>
          </Stack>
        </Card>

        <Card>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ p: 2.5 }}>
            <TextField
              fullWidth
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') addTask(); }}
              placeholder={`Add a task for ${employee.name}`}
              InputProps={{ startAdornment: <Iconify icon="mingcute:add-line" sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
            <Button variant="contained" onClick={addTask} sx={{ minWidth: 120 }}>Add task</Button>
          </Stack>
          <Divider />
          <Stack divider={<Divider />}>
            {employeeTasks.map((task) => (
              <Stack key={task.id} direction="row" alignItems="center" spacing={1.5} sx={{ px: 2.5, py: 2 }}>
                <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.disabled' : 'text.primary' }}>
                    {task.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Due {task.due}</Typography>
                </Box>
                <Chip label={task.priority} color={priorityColors[task.priority]} size="small" variant="outlined" />
              </Stack>
            ))}
            {!employeeTasks.length && (
              <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                No tasks assigned yet. Add the first task above.
              </Typography>
            )}
          </Stack>
        </Card>
      </DashboardContent>
    </>
  );
}