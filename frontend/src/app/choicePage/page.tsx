"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, Button, Typography, Box } from '@mui/material';
import Image from 'next/image';
import DalleImage from '../../../img/dalle.png';

const ChoicePage: React.FC = () => {
  const router = useRouter();

  const handleChoice = (choice: 'etudiant' | 'entreprise') => {
    router.push(choice === 'etudiant' ? '/loginStudent' : '/loginEntreprise');
  };

  return (
    <div style={{ display: 'flex', minWidth: '100vw', minHeight: '100vh' }}>
      {/* Zone de gauche avec l'image */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Overlay pour l'image
          flexDirection: 'column',
        }}
      >
        <Image
          src={DalleImage}
          alt="Votre entreprise"
          width={400}
          height={400}
        />
      </Box>

      {/* Zone de droite avec les choix de profil */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          flexDirection: 'column',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond semi-transparent
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
          }}
        >
          <CardHeader
            title="Bienvenue sur notre plateforme !"
            subheader="Veuillez sélectionner votre profil pour continuer"
            sx={{ textAlign: 'center', color: '#2c3e50' }}
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleChoice('etudiant')}
                sx={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                }}
              >
                <Typography variant="h6">Étudiant</Typography>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleChoice('entreprise')}
                sx={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#218838',
                  },
                }}
              >
                <Typography variant="h6">Entreprise</Typography>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ChoicePage;
