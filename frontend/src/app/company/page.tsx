"use client";

import { SetStateAction, useState } from 'react';

type Offer = {
  id: number;
  title: string;
  description: string;
  educationLevel?: string;
  sector?: string;
};
import { Container, Typography, Box, Button } from '@mui/material';
import OfferForm from './OfferForm';
import OfferList from './OfferList';
import CandidateList from './CandidateList';
import AppBarComponent from '@/components/AppBarComponent';
import DalleImage from '../../../img/dalle.png';

const EntreprisePage = () => {
  const [offers, setOffers] = useState([
    { id: 1, title: 'Développeur Front-End', description: 'Recherche alternant avec expérience en React.' },
    { id: 2, title: 'Designer UX/UI', description: 'Conception des interfaces d’applications web et mobile.' }
  ]);
  
  const [newOffer, setNewOffer] = useState({ title: '', description: '', educationLevel: '', sector: '' });
  
  const [candidates, setCandidates] = useState({
    1: [
      { id: 1, name: 'Alice Dupont', skills: 'React, JavaScript, CSS' },
      { id: 2, name: 'Jean Martin', skills: 'Vue, TypeScript, HTML' }
    ],
    2: [
      { id: 3, name: 'Marc Lebrun', skills: 'Photoshop, Figma, UI Design' },
      { id: 4, name: 'Sophie Durand', skills: 'Illustrator, XD, Prototyping' }
    ]
  });

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [isCreatingOffer, setIsCreatingOffer] = useState(false); // Nouvel état pour gérer l'affichage du formulaire

  const handleAddOffer = () => {
    if (newOffer.title && newOffer.description && newOffer.educationLevel && newOffer.sector) {
      const newId = offers.length + 1;
      setOffers([...offers, { id: newId, ...newOffer }]);
      setCandidates({ ...candidates, [newId]: [] });
      setNewOffer({ title: '', description: '', educationLevel: '', sector: '' });
      setIsCreatingOffer(false); // Réinitialiser l'état après l'ajout
    }
  };

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOfferId(offer.id);
  };

  const handleBackToOffers = () => {
    setSelectedOfferId(null);
    setIsCreatingOffer(false); // Réinitialiser l'état si l'on revient à la liste des offres
  };

  const handleCreateNewOffer = () => {
    setIsCreatingOffer(true); // Activer l'état pour afficher le formulaire
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 12, paddingTop: 2 }}> {/* Ajout de paddingTop pour l'espace sous la navbar */}
      <AppBarComponent isLoggedIn={true} profileType={"company"}/>
      {isCreatingOffer ? ( // Vérifie si l'on est en train de créer une nouvelle offre
        <OfferForm 
          newOffer={newOffer} 
          setNewOffer={setNewOffer} 
          handleAddOffer={handleAddOffer} 
          handleBack={handleBackToOffers} // Passe la fonction de retour
        />
      ) : selectedOfferId ? (
        <Box>
          <CandidateList 
            candidates={candidates[selectedOfferId]} 
            offer={offers.find(offer => offer.id === selectedOfferId)} 
            handleBackToOffers={handleBackToOffers} 
          />
        </Box>
      ) : (
        <OfferList 
          offers={offers} 
          handleSelectOffer={handleSelectOffer} 
          handleCreateNewOffer={handleCreateNewOffer} 
        />
      )}
    </Container>
  );
};

export default EntreprisePage;
