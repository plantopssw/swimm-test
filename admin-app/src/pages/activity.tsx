import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const activities = [
  { title: 'New employee profile created', detail: 'Maya Patel joined the Design team', time: '12 min ago', status: 'New' },
  { title: 'Task completed', detail: 'Quarterly inventory review was marked complete', time: '48 min ago', status: 'Done' },
  { title: 'Report exported', detail: 'Employee task report was downloaded as a PDF', time: '2 hours ago', status: 'Export' },
  { title: 'Product stock updated', detail: 'Wireless keyboard inventory increased by 24 units', time: 'Yesterday', status: 'Updated' },
];

export default function Page() {
  return (
    <>
      <title>{`Activity - ${CONFIG.appName}`}</title>

      <Box sx={{ maxWidth: 960, mx: 'auto', py: { xs: 3, md: 5 } }}>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4">Activity</Typography>
          <Typography color="text.secondary">
            A quick view of what has changed across your workspace.
          </Typography>
        </Stack>

        <Card sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={0} divider={<Box sx={{ borderBottom: 1, borderColor: 'divider' }} />}>
            {activities.map((activity) => (
              <Stack
                key={activity.title}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ py: 2.5, alignItems: { sm: 'center' } }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{activity.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.detail}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Chip size="small" label={activity.status} variant="outlined" />
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 72, textAlign: 'right' }}>
                    {activity.time}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Box>
    </>
  );
}