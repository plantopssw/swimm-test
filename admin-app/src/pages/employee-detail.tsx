import { useParams, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

const employees = [
  { id: 'mohamed-riyanudeen', name: 'Mohamed Riyanudeen', initials: 'MR', role: 'AWS Solutions Architect', team: 'Engineering', status: 'Active', email: 'mohamed.riyanudeen@example.com', joined: 'January 12, 2024' },
  { id: 'riyanudeen', name: 'Riyanudeen', initials: 'R', role: 'Solutions Architect', team: 'Engineering', status: 'Active', email: 'riyanudeen@example.com', joined: 'March 04, 2024' },
  { id: 'system-account', name: 'System Account', initials: 'SA', role: 'Read-Only', team: 'Operations', status: 'Pending', email: 'system@example.com', joined: 'Invite pending' },
  { id: 'aisha-rahman', name: 'Aisha Rahman', initials: 'AR', role: 'Product Manager', team: 'Product', status: 'Active', email: 'aisha.rahman@example.com', joined: 'July 18, 2023' },
  { id: 'daniel-wong', name: 'Daniel Wong', initials: 'DW', role: 'Security Analyst', team: 'Operations', status: 'Inactive', email: 'daniel.wong@example.com', joined: 'November 21, 2022' },
];

const taskSummary = [
  { label: 'Assigned tasks', value: 2, icon: 'solar:settings-bold-duotone' },
  { label: 'Open tasks', value: 2, icon: 'solar:bell-bing-bold-duotone' },
  { label: 'Completed', value: 0, icon: 'solar:check-circle-bold' },
] as const;

const statusColors = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'default',
} as const;

export default function EmployeeDetailPage() {
  const { employeeId } = useParams();
  const employee = employees.find((item) => item.id === employeeId) ?? employees[0];

  return (
    <>
      <title>{`${employee.name} - ${CONFIG.appName}`}</title>
      <DashboardContent>
        <Button component={RouterLink} to="/employees" startIcon={<Iconify icon="eva:arrow-ios-forward-fill" sx={{ transform: 'rotate(180deg)' }} />} sx={{ mb: 3 }}>
          Back to employees
        </Button>

        <Card sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ sm: 'center' }}>
            <Box sx={{ display: 'grid', placeItems: 'center', width: 88, height: 88, borderRadius: '50%', bgcolor: 'primary.lighter', color: 'primary.main', fontSize: 28, fontWeight: 700 }}>
              {employee.initials}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
                <Typography variant="h4">{employee.name}</Typography>
                <Chip label={employee.status} color={statusColors[employee.status as keyof typeof statusColors]} size="small" variant="outlined" />
              </Stack>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>{employee.role} · {employee.team}</Typography>
            </Box>
            <Button component={RouterLink} to={`/employees/tasks?employee=${employee.id}`} variant="contained" startIcon={<Iconify icon="solar:check-circle-bold" />}>
              View tasks
            </Button>
          </Stack>
        </Card>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.4fr) minmax(280px, 0.6fr)' }, gap: 3 }}>
          <Card>
            <Box sx={{ p: 2.5 }}>
              <Typography variant="h6">Task overview</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Current work assigned to {employee.name}.
              </Typography>
            </Box>
            <Divider />
            <Stack direction={{ xs: 'column', sm: 'row' }} divider={<Divider orientation="vertical" flexItem />} sx={{ p: 2.5 }}>
              {taskSummary.map((item) => (
                <Stack key={item.label} direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1, py: { xs: 1, sm: 0 } }}>
                  <Iconify icon={item.icon} width={24} sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h5">{item.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Card>

          <Card sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Employee details</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography variant="body2">{employee.email}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Team</Typography>
                <Typography variant="body2">{employee.team}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Joined</Typography>
                <Typography variant="body2">{employee.joined}</Typography>
              </Box>
            </Stack>
          </Card>
        </Box>
      </DashboardContent>
    </>
  );
}