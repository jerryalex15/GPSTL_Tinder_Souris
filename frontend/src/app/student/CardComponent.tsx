import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';
import DalleImage from '../../../img/frame.png';

interface CardComponentProps {
  title: string;
  company: string;
  image: string;
  description: string;
  swipeDirection: 'left' | 'right' | null;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  company,
  image,
  description,
  swipeDirection,
}) => {
  const [swipeProgress, setSwipeProgress] = useState<number | null>(null); // Ajout du state pour capturer la position du swipe

  // Jouer le son basé sur la direction du swipe
  useEffect(() => {
    if (swipeDirection) {
      const audio = new Audio(
        swipeDirection === 'left'
          ? '/../../../sounds/leftSwipeSound.wav'
          : '/../../../sounds/rightSwipeSound.wav'
      );
      audio.play();
    }
  }, [swipeDirection]);

  // Fonction pour capturer le mouvement de swipe
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    const swipePosition = (touch.clientX / screenWidth) * 100; // Pourcentage de la largeur de l'écran
    setSwipeProgress(swipePosition);
  };

  // Fonction pour réinitialiser le swipe
  const handleTouchEnd = () => {
    setSwipeProgress(null); // Réinitialiser la progression après le swipe
  };

  // Logique pour changer la couleur pendant le swipe
  const getSwipeFilter = () => {
    if (swipeProgress === null) return 'none';
    if (swipeProgress < 50) return 'brightness(0.7) sepia(1) hue-rotate(-50deg)'; // Swipe à gauche
    if (swipeProgress > 50) return 'brightness(0.7) sepia(1) hue-rotate(90deg)'; // Swipe à droite
    return 'none';
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '320px',
        height: '420px',
        padding: '10px',
        boxSizing: 'border-box',
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image de l'entreprise */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Image de l'encadrement */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          left: -35,
          width: '120%',
          height: '120%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <Image
          src={DalleImage}
          alt="Frame"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      {/* Texte et informations */}
      <Card
        sx={{
          position: 'absolute',
          height: '100%',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))',
          color: 'white',
          padding: '10px',
          zIndex: 2,
          boxShadow: 'none',
          filter: getSwipeFilter(),
          transition: 'filter 0.2s ease', // Mise à jour plus fluide des filtres pendant le swipe
        }}
      >
        <Box sx={{ marginTop: 'auto' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="subtitle1">{company}</Typography>
            <Typography variant="body2" sx={{ marginTop: '10px' }}>
              {description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default CardComponent;
