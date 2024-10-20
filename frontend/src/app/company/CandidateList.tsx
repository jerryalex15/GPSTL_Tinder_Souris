import { List, ListItem, Card, CardContent, Typography, Button, Box } from '@mui/material';

const CandidateList = ({ candidates, offer, handleBackToOffers }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#f9f9f9',
        padding: 3 
      }}
    >
      <Button 
        variant="outlined" 
        onClick={handleBackToOffers} 
        sx={{ mb: 2, color: '#6a1b9a', borderColor: '#6a1b9a', '&:hover': { borderColor: '#3f51b5', color: '#3f51b5' } }}
      >
        Retour aux offres
      </Button>
      
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
        Candidats pour l'offre : {offer.title}
      </Typography>
      
      <List sx={{ width: '100%', maxWidth: 800 }}>
        {candidates.map((candidate) => (
          <ListItem key={candidate.id} sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
            <Card 
              sx={{ 
                width: '100%', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                borderRadius: 3, 
                padding: 2,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {candidate.name}
                </Typography>
                <Typography sx={{ color: '#7f8c8d' }}>
                  Compétences : {candidate.skills}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ 
                    alignSelf: 'flex-start', 
                    backgroundColor: '#6a1b9a', 
                    textTransform: 'none', 
                    '&:hover': { backgroundColor: '#3f51b5' }
                  }}
                >
                  Contacter
                </Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CandidateList;
