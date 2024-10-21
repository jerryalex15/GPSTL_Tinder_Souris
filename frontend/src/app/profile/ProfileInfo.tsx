import { Typography } from '@mui/material';

function ProfileInfo({ user }) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
        {user.name}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        {user.email}
      </Typography>
    </>
  );
}

export default ProfileInfo;
