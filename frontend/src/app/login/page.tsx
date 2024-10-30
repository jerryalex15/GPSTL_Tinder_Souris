"use client";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Button,
  FormHelperText,
  Typography,
  Box
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { login } from "@/app/api";
import Image from 'next/image';
import DalleImage from '../../../img/dalle.png';

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
        const res = await login(username, password);
        console.log("User logged in successfully");
        router.push(`/${res.role.split('_')[1].toLowerCase()}`);
      } catch (e) {
        setError("Le nom d'utilisateur ou le mot de passe est incorrect");
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      {/* Left area (optional) */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay for text visibility
          flexDirection: 'column',
        }}
      >
        <Image
                // we have an image in img/dalle.webp
                  src= {DalleImage}
                  onClick={() => router.push('/choicePage')}
                  alt="Alter'n'art"
                  width={400}
                  height={400}
                />
      </Box>

      {/* Right area with the login form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          flexDirection: 'column',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent background
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '16px',
          }}
        >
          <CardHeader title="Se connecter" style={{ textAlign: 'center', color: '#4e342e' }} />
          <CardContent>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{backgroundColor: '#673ab7',
                        color: '#fff',
                        marginTop: '16px',
                        '&:hover': {
                          backgroundColor: '#5e35b1',
                            },}}>
                  Se connecter
                </Button>
            </form>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
              <Button
                variant="text"
                onClick={() => router.push('/register')}
                sx={{ color: '#673ab7' }}
              >
                Pas encore inscrit ? S'inscrire
              </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
