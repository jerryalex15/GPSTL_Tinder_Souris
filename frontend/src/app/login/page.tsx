"use client";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { login } from "@/app/api";

export default function Login() {
  const router = useRouter();
  
  // States for form data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State for error
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!username) {
      setError("Le nom d'utilisateur est requis.");
      return false;
    }
    if (!password) {
      setError("Le mot de passe est requis.");
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await login(username, password);
        console.log("User logged in successfully");
      } catch (e) {
        setError("Le nom d'utilisateur ou le mot de passe est incorrect");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-[#f7f5f2]">
      <Card className="w-[400px] bg-[#fff7e6] shadow-lg">
        <CardHeader className="text-center">
          <h2 className="text-xl font-bold" style={{ color: '#4e342e', fontFamily: 'Georgia, serif' }}>
            Se connecter
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              id="username"
              label="Nom d'utilisateur"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!error}
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
              error={!!error}
              required
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </form>
        </CardContent>
        <CardActions className="justify-between p-4">
          <Button variant="outlined" onClick={() => router.push('/register')} style={{ borderColor: '#4e342e', color: '#4e342e' }}>
            Pas encore inscrit ? S'inscrire
          </Button>
          <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#ff8a65', color: '#fff' }}>
            Se connecter
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
