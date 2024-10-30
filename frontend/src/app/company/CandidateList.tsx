import { List, ListItem, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Application, applicationsByPosting, usePromise } from "@/app/api";

const CandidateList = ({ offer, handleBackToOffers }: any) => {
  const [done, candidates, error] = usePromise(() => applicationsByPosting(offer.id));

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f0f5',
        padding: 4,
      }}
    >
      <Button
        variant="outlined"
        onClick={handleBackToOffers}
        sx={{
          mb: 3,
          color: '#673ab7',
          borderColor: '#673ab7',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': { borderColor: '#5e35b1', color: '#5e35b1' },
        }}
      >
        Retour aux offres
      </Button>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#673ab7', textAlign: 'center' }}
      >
        Candidats pour l'offre : {offer.title}
      </Typography>

      {candidates && candidates.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 800, padding: 0 }}>
          {candidates.map((candidate: Application) => (
            <ListItem
              key={candidate.id}
              sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}
            >
              <Card
                sx={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond semi-transparent pour correspondre au style
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: 3,
                  padding: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.02)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {candidate.student.user.email}
                  </Typography>
                  <Typography sx={{ color: '#757575' }}>
                    Compétences : {candidate.student.keySkills}
                  </Typography>
                  <a href={`mailto:${candidate.student.user.email}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      sx={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#673ab7',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#5e35b1' },
                      }}
                    >
                      Contacter
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="body1"
          sx={{ color: '#757575', textAlign: 'center', marginY: 4 }}
        >
          Aucun candidat pour cette offre pour le moment. Revenez plus tard pour voir les mises à jour.
        </Typography>
      )}
    </Box>
  );
};

export default CandidateList;
