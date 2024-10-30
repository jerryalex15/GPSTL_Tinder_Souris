"use client";

import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
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
  companyId: getAuthData()?.userId || 0,
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
  const [isCreatingOffer, setIsCreatingOffer] = useState(false);

  const handleAddOffer = () => {
    if (true) {
      createJobPosting(newOffer);
      const newId = offers.length + 10000;
      setOffers([...offers, { id: newId, createdAt: new Date().toLocaleDateString(), ...newOffer }]);
      setNewOffer(emptyOffer);
      setIsCreatingOffer(false);
    }
  };

  const handleSelectOffer = (offerId: number) => {
    setSelectedOfferId(offerId);
  };

  const handleBackToOffers = () => {
    setSelectedOfferId(null);
    setIsCreatingOffer(false);
  };

  const handleCreateNewOffer = () => {
    setIsCreatingOffer(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',

      }}
    >
      <AppBarComponent isLoggedIn={true} />

      <Container maxWidth="md" sx={{ paddingTop: 14, flex: 1 }}>
        {isCreatingOffer ? (
          <OfferForm
            newOffer={newOffer}
            setNewOffer={setNewOffer}
            handleAddOffer={handleAddOffer}
            handleBack={handleBackToOffers}
          />
        ) : selectedOfferId ? (
          <Box  sx={{borderRadius: 3}}>
            <CandidateList
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
    </Box>
  );
};

export default EntreprisePage;
