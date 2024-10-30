import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { AccountCircle, Mail } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DalleImage from '../../img/dalle.png';

interface AppBarComponentProps {
  isLoggedIn: boolean;
  profileType: 'student' | 'company'; // Ajout du prop profileType
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ isLoggedIn, profileType }) => {
  const router = useRouter();

  const handleLogoClick = () => {
    if (profileType === 'student') {
      router.push('/student'); // Page d'accueil étudiant
    } else {
      router.push('/company'); // Page d'accueil entreprise
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '16px',
        boxShadow: 'none',
        top: 20,
        width: '90%',
        maxWidth: '600px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleLogoClick}>
            <Image
              src={DalleImage}
              alt="Logo"
              width={64}
              height={64}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn && (
            <IconButton onClick={() => router.push('/messages')}>
              <Mail sx={{ color: '#FFF', fontSize: 30, marginRight: '10px' }} />
            </IconButton>
          )}
          {isLoggedIn ? (
            <IconButton onClick={() => router.push('/profile')}>
              <AccountCircle sx={{ color: '#FFF', fontSize: 36 }} />
            </IconButton>
          ) : (
            <Button
              variant="text"
              sx={{ marginRight: '10px', color: '#FFF', fontWeight: 'bold', fontSize: '0.875rem' }}
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
