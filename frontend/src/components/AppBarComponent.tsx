import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { AccountCircle, Mail, Home, Star } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
        height: '64px',
        boxShadow: 'none',
        width: '100%',
        zIndex: 1100,
        backdropFilter: 'blur(10px)', // Ajout du flou pour éviter de voir l'arrière du site

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
          <Link href="/superlikes" className={"h-full flex items-center cursor-pointer mr-2"}>
            <div>10x</div>
            <IconButton
              color="primary"
              aria-label="Super Like"
              sx={{
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                "&:hover": { backgroundColor: "rgba(0, 123, 255, 0.4)" },
                transition: "background-color 0.3s",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Star fontSize="medium" />
            </IconButton>
          </Link>
          <IconButton onClick={handleLogoClick}>
            <Home sx={{ color: '#FFF', fontSize: 30, marginRight: '10px' }} />
          </IconButton>
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
