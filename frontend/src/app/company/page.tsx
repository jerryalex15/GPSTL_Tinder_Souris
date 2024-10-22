"use client";

import { SetStateAction, useEffect, useState } from 'react';

import { Container, Typography, Box, Button } from '@mui/material';
import OfferForm from './OfferForm';
import OfferList from './OfferList';
import CandidateList from './CandidateList';
import AppBarComponent from '@/components/AppBarComponent';
import {
  createJobPosting,
  getAuthData,
  getCompanyPostings,
  JobPosting,
  JobPostingCreation,
  usePromise
} from "@/app/api";

const emptyOffer: () => JobPostingCreation = () => ({
  companyId: getAuthData()!.userId,
  duration: "",
  positionTitle: "",
  requiredSkills: "",
  categories: [],
});

const EntreprisePage = () => {
  const [done, apiOffers, error] = usePromise(getCompanyPostings);
  const [offers, setOffers] = useState<JobPosting[]>([]);
  useEffect(() => {
    if (apiOffers) {
      setOffers(apiOffers);
    }
  }, [apiOffers]);
  
  const [newOffer, setNewOffer] = useState<JobPostingCreation>(emptyOffer);

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [isCreatingOffer, setIsCreatingOffer] = useState(false); // Nouvel état pour gérer l'affichage du formulaire

  const handleAddOffer = () => {
    if (true) {
      createJobPosting(newOffer);
      const newId = offers.length + 10000; // BIG
      setOffers([...offers, { id: newId, createdAt: new Date().toLocaleDateString(), ...newOffer }]);
      setNewOffer(emptyOffer);
      setIsCreatingOffer(false); // Réinitialiser l'état après l'ajout
    }
  };

  const handleSelectOffer = (offer: JobPosting) => {
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
      <AppBarComponent isLoggedIn={true} />
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
            candidates={[]}
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
