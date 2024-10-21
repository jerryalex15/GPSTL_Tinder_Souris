import { Button, Box } from '@mui/material';

function ProfileButtons({ handleEditProfile, router }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '10px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#9c27b0', // Couleur violette
          color: '#fff', // Texte en blanc
          mb: 2,
          width: '100%',
          borderRadius: '12px',
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4,
            backgroundColor: '#7b1fa2', // Teinte plus sombre au survol
          },
        }}
        onClick={handleEditProfile}
      >
        Modifier le profil
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push('/login')}
        sx={{
          width: '100%',
          mt: 3,
          borderRadius: '12px',
          borderWidth: 2,
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        Se déconnecter
      </Button>
    </Box>
  );
}

export default ProfileButtons;
