import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

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

const tasks = [
  { employeeId: 'mohamed-riyanudeen', priority: 'High', completed: false },
  { employeeId: 'mohamed-riyanudeen', priority: 'Medium', completed: false },
  { employeeId: 'riyanudeen', priority: 'Medium', completed: true },
  { employeeId: 'aisha-rahman', priority: 'Low', completed: false },
];

const priorityColors = { High: 'error', Medium: 'warning', Low: 'default' } as const;

export default function EmployeeTaskReportPage() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const openTasks = tasks.length - completedTasks;
  const completionRate = Math.round((completedTasks / tasks.length) * 100);

  const prioritySummary = useMemo(
    () => ['High', 'Medium', 'Low'].map((priority) => ({
      priority,
      count: tasks.filter((task) => task.priority === priority).length,
    })),
    []
  );

  const employeeSummary = employees.map((employee) => {
    const assigned = tasks.filter((task) => task.employeeId === employee.id);
    const completed = assigned.filter((task) => task.completed).length;
    return { ...employee, total: assigned.length, completed, open: assigned.length - completed };
  });

  return (
    <>
      <title>{`Task report - ${CONFIG.appName}`}</title>
      <DashboardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4">Task report</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              A snapshot of task progress across the organization.
            </Typography>
          </Box>
          <Button component={RouterLink} to="/employees/tasks" variant="outlined" startIcon={<Iconify icon="eva:arrow-ios-forward-fill" sx={{ transform: 'rotate(180deg)' }} />}>
            Back to tasks
          </Button>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
          {([
            { label: 'Total tasks', value: tasks.length, icon: 'solar:settings-bold-duotone', color: 'primary.main' },
            { label: 'Open tasks', value: openTasks, icon: 'solar:bell-bing-bold-duotone', color: 'warning.main' },
            { label: 'Completion rate', value: `${completionRate}%`, icon: 'solar:check-circle-bold', color: 'success.main' },
          ] as const).map((stat) => (
            <Card key={stat.label} sx={{ p: 2.5 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 1.5, bgcolor: 'action.hover', color: stat.color }}>
                  <Iconify icon={stat.icon} width={24} />
                </Box>
                <Box>
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.4fr) minmax(280px, 0.6fr)' }, gap: 3 }}>
          <Card>
            <Box sx={{ p: 2.5 }}>
              <Typography variant="h6">Employee workload</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Compare assigned work and completion by employee.
              </Typography>
            </Box>
            <Divider />
            <TableContainer>
              <Table sx={{ minWidth: 560 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell align="center">Assigned</TableCell>
                    <TableCell align="center">Open</TableCell>
                    <TableCell align="right">Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeSummary.map((employee) => {
                    const progress = employee.total ? Math.round((employee.completed / employee.total) * 100) : 0;
                    return (
                      <TableRow key={employee.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2">{employee.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{employee.role}</Typography>
                        </TableCell>
                        <TableCell align="center">{employee.total}</TableCell>
                        <TableCell align="center">{employee.open}</TableCell>
                        <TableCell align="right" sx={{ minWidth: 150 }}>
                          <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end">
                            <Box sx={{ width: 80, height: 6, borderRadius: 3, bgcolor: 'grey.200', overflow: 'hidden' }}>
                              <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: 'success.main' }} />
                            </Box>
                            <Typography variant="caption">{progress}%</Typography>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Card sx={{ p: 2.5 }}>
            <Typography variant="h6">Priority breakdown</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
              Open and completed work by priority.
            </Typography>
            <Stack spacing={2.5}>
              {prioritySummary.map(({ priority, count }) => (
                <Stack key={priority} spacing={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip label={priority} color={priorityColors[priority as keyof typeof priorityColors]} size="small" variant="outlined" />
                    <Typography variant="subtitle2">{count} {count === 1 ? 'task' : 'tasks'}</Typography>
                  </Stack>
                  <Box sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', overflow: 'hidden' }}>
                    <Box sx={{ width: `${(count / tasks.length) * 100}%`, height: '100%', bgcolor: priorityColors[priority as keyof typeof priorityColors] + '.main' }} />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Box>
      </DashboardContent>
    </>
  );
}