import { Button, Box } from '@mui/material';
import { logout } from "@/app/api";

function ProfileButtons({ handleEditProfile, router }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: '15px'}}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#9c27b0', // Couleur violette
          color: '#fff', // Texte en blanc
          width: '100%',
          borderRadius: '6px',
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
        onClick={() => { logout(); router.push('/login'); }}
        sx={{
          width: '100%',
          borderRadius: '6px',
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
