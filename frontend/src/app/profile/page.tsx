"use client";
import { Container, Paper, useTheme, Divider } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import EditProfileForm from './EditProfileForm';
import ProfileDetails from './ProfileDetails';
import ProfileButtons from './ProfileButtons';
import AppBarComponent from '@/components/AppBarComponent';

export default function Profile() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState({
    name: 'Alice Dupont',
    email: 'alice.dupont@example.com',
    birthDate: '1995-04-15',
    birthPlace: 'Lyon, France',
    phoneNumber: '0612345678',
    resume: 'Développeuse front-end avec 5 ans d’expérience dans la création d’applications web.',
    avatarUrl: '/avatar-alice.png', // Remplace par un chemin d'image valide
    pinterestUrl: 'https://www.pinterest.com/alicedupont',
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [previewAvatar, setPreviewAvatar] = useState(user.avatarUrl);

  const handleEditProfile = () => setEditing(true);
  const handleSaveProfile = () => {
    setUser(formData);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0 && name === 'avatarUrl') {
      const avatarFile = files[0];
      setPreviewAvatar(URL.createObjectURL(avatarFile));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <AppBarComponent isLoggedIn={true} /> {/* Affichage de la barre de navigation */}
      <Container maxWidth="md" sx={{ minHeight: '100vh', py: 5, mt: 2 }}> {/* Ajout de margin-top ici */}
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
          <ProfileAvatar user={user} previewAvatar={previewAvatar} editing={editing} handleChange={handleChange} />
          <ProfileInfo user={user} />
          <Divider sx={{ my: 3 }} />
          {editing ? (
            <EditProfileForm formData={formData} handleChange={handleChange} handleSaveProfile={handleSaveProfile} />
          ) : (
            <ProfileDetails user={user} />
          )}
          {!editing && <ProfileButtons handleEditProfile={handleEditProfile} router={router} />}
        </Paper>
      </Container>
    </>
  );
}
