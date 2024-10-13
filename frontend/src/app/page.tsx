'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Alternance Designer Graphique',
      company: 'ArtStudio',
      image: 'https://i.pinimg.com/736x/50/f9/f6/50f9f6a4ad0471d7c6f5b4a0148fea54.jpg',
      description: 'Rejoignez une équipe créative et réalisez des projets uniques dans l’art digital.',
    },
    {
      id: 2,
      title: 'Alternance Développeur Web',
      company: 'WebCreatives',
      image: 'https://i.pinimg.com/736x/50/f9/f6/50f9f6a4ad0471d7c6f5b4a0148fea54.jpg',
      description: 'Développez des sites web artistiques et interactifs pour nos clients.',
    },
    {
      id: 3,
      title: 'Alternance Illustrateur',
      company: 'DigitalArt Co.',
      image: 'https://i.pinimg.com/736x/50/f9/f6/50f9f6a4ad0471d7c6f5b4a0148fea54.jpg',
      description: 'Créez des illustrations digitales pour des projets ambitieux.',
    },
  ]);

  const handleSwipe = (direction: 'left' | 'right', cardId: number) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      setSwipeDirection(null); // Réinitialise la direction du swipe
    }, 500); // Attends 500ms avant de retirer la carte
  };

  const handleHold = () => {
    console.log('Carte maintenue, pas d\'action');
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#F5F5F5',
        padding: '20px',
      }}
    >
      {/* AppBar minimaliste */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderBottom: '1px solid #E0E0E0' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '20px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            ArtAlternance
          </Typography>
          <Box>
            <Button
              variant="text"
              sx={{ marginRight: '10px', color: '#333', fontWeight: 'bold' }}
              onClick={() => router.push('/login')}
            >
              Connexion
            </Button>
            <IconButton onClick={() => router.push('/profil')}>
              <AccountCircle sx={{ color: '#333', fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Titre principal */}
      <Typography variant="h4" color="primary" sx={{ marginTop: '40px', fontWeight: 'bold', color: '#333' }}>
        Trouvez votre alternance en Art Digital
      </Typography>

      {/* Zone de swipe des cartes */}
      <Box sx={{ marginTop: '20px', maxWidth: '400px', maxHeight: '600px', textAlign: 'center' }}>
        {cards.length > 0 ? (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.05 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.5}
            onDragEnd={(e, { offset }) => {
              const swipe = offset.x > 200 ? 'right' : offset.x < -200 ? 'left' : 'hold';
              if (swipe === 'right') {
                handleSwipe('right', cards[0].id);
              } else if (swipe === 'left') {
                handleSwipe('left', cards[0].id);
              } else {
                handleHold(); // On remet la carte à sa place
              }
            }}
          >
            <Card
              sx={{
                position: 'relative',
                width: '300px',
                height: '400px',
                marginBottom: '20px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                // Applique le filtre vert ou rouge selon la direction du swipe
                filter: swipeDirection === 'left' ? 'brightness(0.7) sepia(1) hue-rotate(-50deg)' :
                        swipeDirection === 'right' ? 'brightness(0.7) sepia(1) hue-rotate(90deg)' : 'none',
                transition: 'filter 0.5s ease',
              }}
            >
              <CardMedia
                component="img"
                image={cards[0].image}
                alt={cards[0].title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))',
                  color: 'white',
                  padding: '10px',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {cards[0].title}
                </Typography>
                <Typography variant="subtitle1">
                  {cards[0].company}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                  {cards[0].description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Plus d'offres à swiper !
          </Typography>
        )}
      </Box>
    </Box>
  );
}
