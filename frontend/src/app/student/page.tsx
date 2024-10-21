"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import SwipeArea from './SwipeArea';
import AppBarComponent from '../../components/AppBarComponent';
import { getJobPostings, usePromise } from "@/app/api";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
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

  const [done, jobs, error] = usePromise(getJobPostings);

  useEffect(() => {
    setMounted(true);

    // Désactiver le scroll lorsque le composant est monté
    document.body.style.overflow = 'hidden';

    return () => {
      // Réactiver le scroll lors du démontage du composant
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSwipe = (direction: 'left' | 'right', cardId: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const swipeLeft = (cardId: number) => {
    handleSwipe('left', cardId);
  };

  const swipeRight = (cardId: number) => {
    handleSwipe('right', cardId);
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <AppBarComponent isLoggedIn={true} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1, // Permet à ce Box de prendre l'espace restant
        }}
      >
        <SwipeArea
          cards={cards}
          onSwipeLeft={swipeLeft}
          onSwipeRight={swipeRight}
          swipeDirection={swipeDirection}
          setSwipeDirection={setSwipeDirection}
        />
      </Box>
    </Box>
  );
}
