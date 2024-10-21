"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import SwipeArea from './SwipeArea';
import AppBarComponent from '../../components/AppBarComponent';
import { applyToJob, getStudentPostings, JobPosting, usePromise } from "@/app/api";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const [done, jobs, error] = usePromise(getStudentPostings);
  const [cards, setCards] = useState<JobPosting[]>([]);

  useEffect(() => {
    if (done && jobs) {
      setCards(jobs);
    }
  }, [done, jobs]);

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
    if (direction === 'right') {
      applyToJob(cardId);
    }
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
