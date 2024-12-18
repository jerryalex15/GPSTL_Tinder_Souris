import { ListItem, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { JobPosting } from "@/app/api";

const OfferItem = ({ offer, handleSelectOffer }: {
  offer: JobPosting;
  handleSelectOffer: (offerId: number) => void;
}) => {
  return (
    <ListItem 
      sx={{ 
        marginBottom: 2, 
        display: 'flex', 
        justifyContent: 'center', 
        cursor: 'pointer' 
      }}
      onClick={() => handleSelectOffer(offer.id)}
    >
      <Card 
        sx={{ 
          width: '100%', 
          maxWidth: 800, 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          borderRadius: 3, 
          padding: 2, 
          transition: 'transform 0.2s ease', 
          '&:hover': { 
            transform: 'scale(1.01)', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
          } 
        }}
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              {offer.positionTitle}
            </Typography>
            <Typography sx={{ color: '#7f8c8d' }}>
              {offer.requiredSkills}
            </Typography>
          </Box>
          <IconButton 
            aria-label="settings" 
            onClick={(e) => {
              e.stopPropagation(); // Empêche le clic de se propager au ListItem
              // Ajoutez ici la logique pour ouvrir les paramètres de l'offre si nécessaire
            }}
            sx={{ color: '#3f51b5', '&:hover': { color: '#1e88e5' }}}
          >
            <SettingsIcon />
          </IconButton>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default OfferItem;
