import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

const employees = [
  { name: 'Mohamed Riyanudeen', initials: 'MR', role: 'AWS Solutions Architect', team: 'Engineering', status: 'Active' },
  { name: 'Riyanudeen', initials: 'R', role: 'Solutions Architect', team: 'Engineering', status: 'Active' },
  { name: 'System Account', initials: 'SA', role: 'Read-Only', team: 'Operations', status: 'Pending' },
  { name: 'Aisha Rahman', initials: 'AR', role: 'Product Manager', team: 'Product', status: 'Active' },
  { name: 'Daniel Wong', initials: 'DW', role: 'Security Analyst', team: 'Operations', status: 'Inactive' },
];

const statusColors = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'default',
} as const;

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const matchesSearch = `${employee.name} ${employee.role} ${employee.team}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus = status === 'All' || employee.status === status;
        return matchesSearch && matchesStatus;
      }),
    [search, status]
  );

  const activeCount = employees.filter((employee) => employee.status === 'Active').length;
  const pendingCount = employees.filter((employee) => employee.status === 'Pending').length;

  return (
    <>
      <title>{`Employees - ${CONFIG.appName}`}</title>
      <DashboardContent>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4">Employees</Typography>
          <Typography color="text.secondary">
            Keep your organization&apos;s people, roles, and access in one place.
          </Typography>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
          {([
            { label: 'Total employees', value: employees.length, icon: 'solar:settings-bold-duotone' },
            { label: 'Active members', value: activeCount, icon: 'solar:check-circle-bold' },
            { label: 'Pending invites', value: pendingCount, icon: 'solar:bell-bing-bold-duotone' },
          ] as const).map((stat) => (
            <Card key={stat.label} sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 1.5, bgcolor: 'primary.lighter', color: 'primary.main' }}>
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

        <Card>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ p: 2.5 }}>
            <TextField
              fullWidth
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><Iconify icon="eva:search-fill" width={20} /></InputAdornment>
                ),
              }}
            />
            <Select value={status} onChange={(event) => setStatus(event.target.value)} sx={{ minWidth: 150 }}>
              <MenuItem value="All">All statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Stack>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Tasks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow hover key={employee.name}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box sx={{ display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: '50%', bgcolor: 'grey.200', color: 'text.secondary', fontWeight: 700, fontSize: 13 }}>
                          {employee.initials}
                        </Box>
                        <Typography
                          component={RouterLink}
                          to={`/employees/${employee.name.toLowerCase().replace(/\s+/g, '-')}`}
                          variant="subtitle2"
                          sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                        >
                          {employee.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.team}</TableCell>
                    <TableCell>
                      <Chip label={employee.status} color={statusColors[employee.status as keyof typeof statusColors]} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        component={RouterLink}
                        to={`/employees/tasks?employee=${employee.name.toLowerCase().replace(/\s+/g, '-')}`}
                        size="small"
                        startIcon={<Iconify icon="solar:check-circle-bold" width={16} />}
                      >
                        View tasks
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!filteredEmployees.length && (
            <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
              No employees match your search.
            </Typography>
          )}
        </Card>
      </DashboardContent>
    </>
  );
}