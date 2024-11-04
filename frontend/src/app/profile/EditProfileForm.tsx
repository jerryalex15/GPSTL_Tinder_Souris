import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { Upload } from "@mui/icons-material";

function EditProfileForm({
  formData,
  handleChange,
  handleSaveProfile,
  handlePhotoChange,
  previewPhoto,
}) {
  return (
    <Box
      component="form"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Fond blanc légèrement transparent
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
            borderRadius: "8px", // Coins arrondis
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
            borderRadius: "8px",
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
            borderRadius: "8px",
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
            borderRadius: "8px",
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
            borderRadius: "8px",
          },
        }}
      />
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          CV (fichier)
        </Typography>
        <input
          type="file"
          name="resume"
          accept=".pdf"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </Box>
      <TextField
        label="Lien du Portfolio Pinterest"
        name="pinterestUrl"
        value={formData.pinterestUrl}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          sx: {
            borderRadius: "8px",
          },
        }}
      />
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Photo de profil
        </Typography>
        <IconButton
          color="primary"
          component="label"
          sx={{
            bgcolor: "#9c27b0", // Couleur de fond violet
            "&:hover": { bgcolor: "#7b1fa2" }, // Teinte au survol
            borderRadius: "12px",
            padding: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Upload sx={{ color: "#fff", mr: 1 }} />{" "}
          {/* Icône blanche avec un espacement */}
          <input
            hidden
            type="file"
            accept="image/*"
            name="photo"
            onChange={handlePhotoChange}
          />
          <Typography
            variant="body2"
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            Changer la photo de profil
          </Typography>
        </IconButton>
        {previewPhoto && (
          <Box sx={{ mt: 2 }}>
            <img
              src={previewPhoto}
              alt="Preview"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </Box>
        )}
      </Box>
      <Button
        variant="contained"
        onClick={handleSaveProfile}
        sx={{
          mb: 2,
          width: "100%",
          backgroundColor: "#9c27b0", // Couleur violet
          "&:hover": {
            backgroundColor: "#7b1fa2", // Teinte au survol
          },
        }}
      >
        Enregistrer
      </Button>
    </Box>
  );
}

export default EditProfileForm;
