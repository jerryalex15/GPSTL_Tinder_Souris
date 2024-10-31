"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { register, Role } from "@/app/api";
import Image from "next/image";
import DalleImage from "../../../img/dalle.png";

export default function Register() {
  const router = useRouter();

  // States for form data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("student");

  // States for errors
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // States for modal
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    };

    if (!username) {
      formIsValid = false;
      newErrors.username = "Le nom d'utilisateur est requis.";
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors.email = "Une adresse email valide est requise.";
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = "Le mot de passe est requis.";
    } else if (password.length < 6) {
      formIsValid = false;
      newErrors.password =
        "Le mot de passe doit comporter au moins 6 caractères.";
    }

    if (password !== confirmPassword) {
      formIsValid = false;
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (!role) {
      formIsValid = false;
      newErrors.role = "Veuillez sélectionner un rôle.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await register(username, email, password, role);
        console.log("User registered successfully");
        // Set modal state for success
        setModalTitle("Inscription réussie");
        setModalMessage("Votre compte a été créé avec succès.");
        setIsSuccess(true);
        setOpenModal(true);
        // Do not navigate immediately
        // router.push("/login");
      } catch (e: any) {
        // Handle error and show modal with error message
        setModalTitle("Erreur d'inscription");
        // If the error message is available, display it; otherwise, use a default message
        const errorMessage =
          e.response?.data?.message ||
          "Une erreur est survenue lors de l'inscription.";
        setModalMessage(errorMessage);
        setIsSuccess(false);
        setOpenModal(true);
        // Optionally, set the error in form fields if the error is specific
        if (errorMessage.includes("nom d'utilisateur")) {
          setErrors({ ...errors, username: errorMessage });
        }
      }
    }
  };

  const handleRoleChange = (event: SelectChangeEvent<Role>) => {
    setRole(event.target.value as Role);
  };

  return (
    <div
      style={{
        display: "flex",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      {/* Left area with the stylized text and image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Semi-transparent overlay for better text visibility
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

      {/* Right area with the registration form */}
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
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent background
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "16px",
          }}
        >
          <CardHeader
            title="S'inscrire"
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
                id="email"
                label="Adresse email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
              <TextField
                id="confirm-password"
                label="Confirmer le mot de passe"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
              />
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="role-label">Sélectionner un rôle</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  label="Sélectionner un rôle"
                  required
                >
                  <MenuItem value="student">Étudiant</MenuItem>
                  <MenuItem value="company">Entreprise</MenuItem>
                  <MenuItem value="cfa">CFA</MenuItem>
                </Select>
                <FormHelperText>{errors.role}</FormHelperText>
              </FormControl>
              <Button
                variant="contained"
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
                S'inscrire
              </Button>
            </form>
          </CardContent>
          <CardActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
            <Button
              variant="text"
              onClick={() => router.push("/login")}
              sx={{ color: "#673ab7" }}
            >
              Déjà un compte ? Se connecter
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Modal for registration success/failure */}
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          if (isSuccess) {
            router.push("/login");
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
                router.push("/login");
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
