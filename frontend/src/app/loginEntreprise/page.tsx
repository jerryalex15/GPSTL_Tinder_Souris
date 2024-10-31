"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Button,
  FormHelperText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { login } from "@/app/api";
import Image from "next/image";
import DalleImage from "../../../img/dalle.png";

export default function Login() {
  const router = useRouter();

  // States for form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // States for errors
  const [errors, setErrors] = useState({ username: "", password: "" });

  // States for modal
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // State for user role
  const [userRole, setUserRole] = useState("");

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { username: "", password: "" };

    if (!username) {
      formIsValid = false;
      newErrors.username = "Le nom d'utilisateur est requis.";
    }
    if (!password) {
      formIsValid = false;
      newErrors.password = "Le mot de passe est requis.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const res = await login(username, password);
        console.log("User logged in successfully");
        const { userId, token, role } = res;

        setUserRole(role); // Store the role in state
        // Set modal state for success
        setModalTitle("Connexion réussie");
        setModalMessage("Vous êtes maintenant connecté.");
        setIsSuccess(true);
        setOpenModal(true);

        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("token", token);
        localStorage.setItem("role", role.split("_")[1].toLowerCase());

        // Do not navigate immediately
        // router.push("/"+role);
      } catch (e: any) {
        // Handle error and show modal with error message
        setModalTitle("Erreur de connexion");
        // If the error message is available, display it; otherwise, use a default message
        const errorMessage =
          e.response?.data?.message ||
          "Le nom d'utilisateur ou le mot de passe est incorrect.";
        setModalMessage(errorMessage);
        setIsSuccess(false);
        setOpenModal(true);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      {/* Left area with the image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          flexDirection: "column",
        }}
      >
        <Image
          src={DalleImage}
          onClick={() => router.push("/choicePage")}
          alt="Alter'n'art"
          width={400}
          height={400}
        />
      </Box>

      {/* Right area with the login form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "16px",
          }}
        >
          <CardHeader
            title="Se connecter"
            style={{ textAlign: "center", color: "#4e342e" }}
          />
          <CardContent>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <TextField
                id="username"
                label="Nom d'utilisateur"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                required
              />
              <TextField
                id="password"
                label="Mot de passe"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  backgroundColor: "#673ab7",
                  color: "#fff",
                  marginTop: "16px",
                  "&:hover": {
                    backgroundColor: "#5e35b1",
                  },
                }}
              >
                Se connecter
              </Button>
            </form>
          </CardContent>
          <CardActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
            <Button
              variant="text"
              onClick={() => router.push("/register")}
              sx={{ color: "#673ab7" }}
            >
              Pas encore inscrit ? S'inscrire
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Modal for login success/failure */}
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          if (isSuccess) {
            // Redirect to the role-based page after successful login
            router.push(`/${userRole.split("_")[1].toLowerCase()}`);
          }
        }}
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
              if (isSuccess) {
                // Redirect to the role-based page after successful login
                router.push(`/${userRole.split("_")[1].toLowerCase()}`);
              }
            }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
