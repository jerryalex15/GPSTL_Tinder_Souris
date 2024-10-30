"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, Button, Typography, Box } from '@mui/material';
import Image from 'next/image';
import DalleImage from '../../../img/dalle.png';

const ChoicePage: React.FC = () => {
  const router = useRouter();

  const handleChoice = (choice: 'etudiant' | 'entreprise') => {
    if (choice === 'etudiant') {
      router.push('/loginStudent');
    } else if (choice === 'entreprise') {
      router.push('/loginEntreprise');
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
      {/* Zone de gauche avec l'image */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay pour l'image
          flexDirection: 'column',
        }}
      >
        <Image
          src={DalleImage}
          alt="Alter'n'art"
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
          padding: '20px',
          flexDirection: 'column',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // Fond semi-transparent
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '16px',
          }}
        >
          <CardHeader
            title="Bienvenue !"
            subheader="Veuillez choisir votre profil"
            sx={{ textAlign: 'center', color: '#4e342e' }}
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleChoice('etudiant')}
                sx={{
                  backgroundColor: '#673ab7',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#5e35b1',
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
                  backgroundColor: '#ff7043',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#f4511e',
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
