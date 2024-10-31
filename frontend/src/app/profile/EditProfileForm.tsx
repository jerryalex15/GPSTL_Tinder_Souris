import { Box, TextField, Button } from '@mui/material';

function EditProfileForm({ formData, handleChange, handleSaveProfile }) {
  return (
    <Box
      component="form"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond blanc légèrement transparent
        borderRadius: 3,
        padding: 3,
        boxShadow: 2, // Ombre pour profondeur
      }}
    >
      <TextField
        label="Date de naissance"
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          sx: {
            borderRadius: '8px', // Coins arrondis
          },
        }}
      />
      <TextField
        label="Lieu de naissance"
        name="birthPlace"
        value={formData.birthPlace}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          sx: {
            borderRadius: '8px',
          },
        }}
      />
      <TextField
        label="Numéro de téléphone"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          sx: {
            borderRadius: '8px',
          },
        }}
      />
      <TextField
        label="Adresse"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          sx: {
            borderRadius: '8px',
          },
        }}
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          sx: {
            borderRadius: '8px',
          },
        }}
      />
      <TextField
        label="CV (fichier)"
        type="file"
        name="resume"
        accept=".pdf"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }} // Ajout de shrink: true pour le label
      />
      <TextField
        label="Lien du Portfolio Pinterest"
        name="pinterestUrl"
        value={formData.pinterestUrl}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          sx: {
            borderRadius: '8px',
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSaveProfile}
        sx={{
          mb: 2,
          width: '100%',
          backgroundColor: '#9c27b0', // Couleur violet
          '&:hover': {
            backgroundColor: '#7b1fa2', // Teinte au survol
          },
        }}
      >
        Enregistrer
      </Button>
    </Box>
  );
}

export default EditProfileForm;
