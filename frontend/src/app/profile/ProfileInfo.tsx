import { Typography, Box } from '@mui/material';

function ProfileInfo({ user }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
        {user.name}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        {user.email}
      </Typography>
    </Box>
  );
}

export default ProfileInfo;
