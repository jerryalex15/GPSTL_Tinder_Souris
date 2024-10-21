'use client';

import { useRouter } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  useTheme,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { DateRange, LocationOn, Phone, Description, Upload, Pinterest } from '@mui/icons-material';

export default function Profile() {
  const router = useRouter();
  const theme = useTheme();
  const [user, setUser] = useState({
    name: 'Malek Bouzarkouna',
    email: 'malek.bouzarkouna@example.com',
    birthDate: '2002-09-30',
    birthPlace: 'Tunis, Tunisie',
    phoneNumber: '0616551509',
    resume: '',
    avatarUrl: '/avatar.png',
    pinterestUrl: 'https://www.pinterest.com/tonportfolio',
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [previewAvatar, setPreviewAvatar] = useState(user.avatarUrl);

  const handleEditProfile = () => setEditing(true);
  const handleSaveProfile = () => {
    setUser(formData);
    setEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0 && name === 'avatarUrl') {
      const avatarFile = files[0];
      setPreviewAvatar(URL.createObjectURL(avatarFile));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Container maxWidth="md" sx={{ background: '#f4f4f4', minHeight: '100vh', py: 5 }}>
      <Paper
        elevation={10}
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '16px',
          boxShadow: theme.shadows[5],
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Avatar
            alt={user.name}
            src={previewAvatar}
            sx={{
              width: 140,
              height: 140,
              mx: 'auto',
              border: `4px solid ${theme.palette.primary.dark}`,
              boxShadow: theme.shadows[5],
            }}
          />
          {editing && (
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" component="label">
                <Upload />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  name="avatarUrl"
                  onChange={handleChange}
                />
              </IconButton>
              <Typography variant="body2">Changer la photo de profil</Typography>
            </Box>
          )}
        </Box>

        <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: theme.palette.primary.dark }}>
          {user.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {user.email}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {editing ? (
          <Box component="form">
            <TextField
              label="Date de naissance"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Lieu de naissance"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Numéro de téléphone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="CV (fichier)"
              type="file"
              name="resume"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Lien du Portfolio Pinterest"
              name="pinterestUrl"
              value={formData.pinterestUrl}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveProfile}
              sx={{ mb: 2, width: '100%' }}
            >
              Enregistrer
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <DateRange sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1"><strong>Date de naissance :</strong> {user.birthDate}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <LocationOn sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1"><strong>Lieu de naissance :</strong> {user.birthPlace}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Phone sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1"><strong>Numéro de téléphone :</strong> {user.phoneNumber}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Description sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1">
                  <strong>CV :</strong>{' '}
                  {user.resume ? (
                    <a href={user.resume} target="_blank" rel="noopener noreferrer">
                      Télécharger le CV
                    </a>
                  ) : (
                    'Aucun CV téléchargé'
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Pinterest sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1">
                  <strong>Portfolio :</strong>{' '}
                  <Link href={user.pinterestUrl} target="_blank" rel="noopener">
                    Voir le portfolio sur Pinterest
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditProfile}
                sx={{ mb: 2, width: '100%' }}
              >
                Modifier le profil
              </Button>
            </Grid>
          </Grid>
        )}

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push('/login')}
          sx={{ width: '100%', mt: 3, borderRadius: '12px' }}
        >
          Se déconnecter
        </Button>
      </Paper>
    </Container>
  );
}
