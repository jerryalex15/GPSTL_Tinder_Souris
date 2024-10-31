import { List, Box, Paper, Typography, Button, CircularProgress } from '@mui/material';
import OfferItem from './OfferItem';
import { JobPosting } from "@/app/api";

interface OfferListProps {
  offers: JobPosting[];
  handleSelectOffer: (offerId: number) => void;
  handleCreateNewOffer: () => void;
  isLoading?: boolean; // Nouvelle prop pour indiquer l'état de chargement
}

const OfferList: React.FC<OfferListProps> = ({
  offers,
  handleSelectOffer,
  handleCreateNewOffer,
  isLoading = false, // Valeur par défaut
}) => {
  return (
    <Box
      sx={{
        padding: 5,
        borderRadius: 3, 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)', 
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
        Gestion des Offres
      </Typography>

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
          Ajouter une offre
        </Button>
      </Box>

      {isLoading ? ( // Affichage d'un indicateur de chargement
        <Box sx={{ textAlign: 'center', marginY: 4 }}>
          <CircularProgress />
        </Box>
      ) : offers.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ color: '#757575', textAlign: 'center', marginY: 4 }}
        >
          Aucune offre disponible pour le moment. Cliquez sur "Ajouter une offre" pour en créer une nouvelle.
        </Typography>
      ) : (
        <List sx={{ padding: 0 }}>
          {offers.map((offer: JobPosting) => (
            <OfferItem key={offer.id} offer={offer} handleSelectOffer={handleSelectOffer} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default OfferList;
