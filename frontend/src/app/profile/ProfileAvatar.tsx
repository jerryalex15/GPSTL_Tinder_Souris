import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Upload } from "@mui/icons-material";

function ProfileAvatar({ user, previewAvatar, editing, handleChange }) {
  return (
    <Box sx={{ position: "relative", textAlign: "center" }}>
      <Avatar
        alt={user.name}
        src={previewAvatar}
        sx={{
          width: 140,
          height: 140,
          mx: "auto",
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
              name="avatarUrl"
              onChange={handleChange}
            />
            <Typography
              variant="body2"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Changer la photo de profil
            </Typography>
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default ProfileAvatar;
