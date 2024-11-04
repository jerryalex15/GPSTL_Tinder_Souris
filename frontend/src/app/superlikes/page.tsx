"use client";
import AppBarComponent from "@/components/AppBarComponent";
import MirageBackground from "@/components/MirageBackground";
import { Star } from "@mui/icons-material";
import { IconButton, Box, Typography } from "@mui/material";

function FunnyStar() {
  return (
    <IconButton
      color="primary"
      aria-label="Super Like"
      sx={{
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        "&:hover": { backgroundColor: "rgba(0, 123, 255, 0.4)" },
        transition: "background-color 0.3s",
        width: "30px",
        height: "30px",
        borderRadius: "50%", // Bouton rond
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Star fontSize="medium" />
    </IconButton>
  );
}

export default function Page() {
  return (
    <>
      <AppBarComponent isLoggedIn={true} profileType={"student"} />
      <Box
        className="flex w-full h-full justify-center items-center absolute z-20"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 20,
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          className="flex flex-col max-w-md w-[400px] h-[600px] justify-center items-center"
          sx={{
            maxWidth: "400px",
            width: "100%",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px", // Bords arrondis du conteneur principal
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(8.5px)",
            WebkitBackdropFilter: "blur(8.5px)",
            overflow: "hidden", // Empêche tout débordement de contenu
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "white", fontWeight: "bold", marginBottom: "10px" }}
          >
            Super Likes
          </Typography>
          <Typography variant="body1" sx={{ color: "white", marginBottom: "20px" }}>
            You have 10 Super Likes remaining.
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "white", fontWeight: "bold", marginTop: "20px" }}
          >
            Buy more Super Likes
          </Typography>
          {[5, 10, 20, 100, undefined].map((count) => (
            <Box
              key={count}
              sx={{
                width: "80%",
                textAlign: "center",
                borderRadius: "12px", // Bords arrondis des boutons d'achat
                backgroundColor: "rgba(210, 210, 210, 0.8)",
                "&:hover": { backgroundColor: "rgba(180, 180, 180, 0.9)" },
                transition: "background-color 0.3s ease",
                color: "black",
                fontWeight: "bold",
                padding: "12px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Typography>
                {count ? `Buy ${count} Super Likes` : "Buy custom amount..."}
              </Typography>
              {count && <FunnyStar />}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
