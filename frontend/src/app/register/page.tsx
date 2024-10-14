"use client";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Register() {
  const router = useRouter();
  
  // States for form data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  
  // States for errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { username: '', email: '', password: '', confirmPassword: '', role: '' };

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
      newErrors.password = "Le mot de passe doit comporter au moins 6 caractères.";
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      // Logic to handle successful registration
      console.log("Form submitted successfully");
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '100vw', minHeight: '100vh', backgroundColor: '#f7f5f2' }}>
      <Card sx={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#fff7e6' }}>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            {/* Select for role */}
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
          </form>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between', padding: '16px' }}>
          <Button variant="outlined" onClick={() => router.push('/login')} style={{ borderColor: '#4e342e', color: '#4e342e' }}>
            Déjà un compte ? Se connecter
          </Button>
          <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#ff8a65', color: '#fff' }}>
            S'inscrire
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
