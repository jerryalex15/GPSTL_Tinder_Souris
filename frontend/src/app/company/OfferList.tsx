import { List, Box, Paper, Typography, Button } from '@mui/material'; // Importation du composant Button
import OfferItem from './OfferItem';
import { Key } from 'react';
import { JobPosting } from "@/app/api";

interface OfferListProps {
  offers: JobPosting[];
  handleSelectOffer: (offer: JobPosting) => void;
  handleCreateNewOffer: () => void;
}

const OfferList: React.FC<OfferListProps> = ({ offers, handleSelectOffer, handleCreateNewOffer }) => {
  return (
    <Paper
      elevation={3} // Ajoute une ombre au papier
      sx={{
        borderRadius: 3, // Coins arrondis
        padding: 3, // Espacement à l'intérieur
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Couleur de fond légèrement plus claire
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
        Gestion des Offres
      </Typography>

      {/* Conteneur pour le bouton */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
      <Button 
            variant="contained" 
            onClick={handleCreateNewOffer}
            sx={{ 
              textTransform: 'none', 
              backgroundColor: '#6a1b9a', 
              '&:hover': {
                backgroundColor: '#ab47bc',
              },
              borderRadius: 2, 
            }}
          > 
        
          Ajouter une offre {/* Texte plus descriptif */}
        </Button>
      </Box>

      <List sx={{ padding: 0 }}>
        {offers.map((offer: { id: Key | null | undefined; }) => (
          <OfferItem key={offer.id} offer={offer} handleSelectOffer={handleSelectOffer} />
        ))}
      </List>
    </Paper>
  );
};

export default OfferList;
