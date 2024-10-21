import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Upload } from '@mui/icons-material';

function ProfileAvatar({ user, previewAvatar, editing, handleChange }) {
  return (
    <Box sx={{ position: 'relative', textAlign: 'center' }}>
      <Avatar
        alt={user.name}
        src={previewAvatar}
        sx={{
          width: 140,
          height: 140,
          mx: 'auto',
          border: `4px solid #9c27b0`, // Couleur violette pour le bord
          boxShadow: 3, // Ombre pour donner de la profondeur
        }}
      />
      {editing && (
        <Box sx={{ mt: 2 }}>
          <IconButton
            color="primary"
            component="label"
            sx={{
              bgcolor: '#9c27b0', // Couleur de fond violet
              '&:hover': { bgcolor: '#7b1fa2' }, // Teinte au survol
              borderRadius: '12px',
              padding: 1,
            }}
          >
            <Upload sx={{ color: '#fff' }} /> {/* Icône blanche */}
            <input hidden type="file" accept="image/*" name="avatarUrl" onChange={handleChange} />
          </IconButton>
          <Typography variant="body2" sx={{ mt: 1, color: '#555', fontWeight: 'bold' }}>
            Changer la photo de profil
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ProfileAvatar;
