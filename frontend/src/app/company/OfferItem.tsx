import { ListItem, Card, CardContent, Typography, IconButton,Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const OfferItem = ({ offer, handleSelectOffer }) => {
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
          transition: 'transform 0.3s ease', 
          '&:hover': { 
            transform: 'scale(1.02)', 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' 
          } 
        }}
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              {offer.title}
            </Typography>
            <Typography sx={{ color: '#7f8c8d' }}>
              {offer.description}
            </Typography>
          </Box>
          <IconButton aria-label="settings" sx={{ color: '#3f51b5' }}>
            <SettingsIcon />
          </IconButton>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default OfferItem;
