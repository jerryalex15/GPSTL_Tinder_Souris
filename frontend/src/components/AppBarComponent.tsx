import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { AccountCircle, Mail } from '@mui/icons-material'; // Importer l'icône Mail
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DalleImage from '../../img/dalle.png';

const AppBarComponent = ({ isLoggedIn }) => {
  const router = useRouter();

  return (
    <AppBar
      position="fixed" // L'AppBar est fixée en haut de la page
      sx={{
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '16px',
        boxShadow: 'none',
        top: 20, // Position en haut
        width: '90%', // Limiter la largeur à 90% de l'écran
        maxWidth: '600px', // Largeur maximale pour éviter que l'AppBar prenne toute la largeur sur grand écran
        left: '50%', // Centrer horizontalement
        transform: 'translateX(-50%)', // Centrer en utilisant la transformation
        zIndex: 1100, // S'assurer qu'elle reste au-dessus des autres éléments
      }}
    >
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }} // Réduire le padding horizontal
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => router.push('/')}>
            <Image
              src={DalleImage}
              alt="Logo"
              width={64}
              height={64}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn && ( // Afficher l'icône de mail uniquement si connecté
            <IconButton onClick={() => router.push('/messages')}>
              <Mail sx={{ color: '#FFF', fontSize: 30, marginRight: '10px' }} /> {/* Réduire l'icône */}
            </IconButton>
          )}
          {isLoggedIn ? (
            <IconButton onClick={() => router.push('/profile')}>
              <AccountCircle sx={{ color: '#FFF', fontSize: 36 }} /> {/* Réduire l'icône */}
            </IconButton>
          ) : (
            <Button
              variant="text"
              sx={{ marginRight: '10px', color: '#FFF', fontWeight: 'bold', fontSize: '0.875rem' }} // Réduire la taille du texte
              onClick={() => router.push('/login')}
            >
              Connexion
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
