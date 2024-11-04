import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  Application,
  applicationsByPostingRegular,
  applicationsByPostingSuperLiked,
  usePromise
} from "@/app/api";
import { Star } from "@mui/icons-material";

const CandidateList = ({ offer, handleBackToOffers }: any) => {
  const [doneLiked, candidatesLiked, errorLiked] = usePromise(() => applicationsByPostingSuperLiked(offer.id));
  const [doneRegular, candidatesRegular, errorRegular] = usePromise(() => applicationsByPostingRegular(offer.id));
  const done = doneLiked && doneRegular;
  const error = errorLiked || errorRegular;
  const candidates: (Application & {superLike: boolean})[] = [
    ...(candidatesLiked || []).map((c) => ({ ...c, superLike: true })),
    ...(candidatesRegular || []).map((c) => ({ ...c, superLike: false })),
  ];

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
        aria-label="Retour aux offres"
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

      {done === false && (
        <CircularProgress sx={{ marginY: 4 }} />
      )}

      {error && (
        <Typography
          variant="body1"
          sx={{ color: 'red', textAlign: 'center', marginY: 4 }}
        >
          Une erreur est survenue lors du chargement des candidats. Veuillez réessayer plus tard.
        </Typography>
      )}

      {candidates && candidates.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 800, padding: 0 }}>
          {candidates.map((candidate) => (
            <ListItem
              key={candidate.id}
              sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}
            >
              <Card
                sx={{
                  width: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: 3,
                  padding: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.0)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }
                }}
              >
                <CardContent className="flex items-center">
                  <div className="flex flex-col grow">
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
                        aria-label={`Contacter ${candidate.student.user.email}`}
                      >
                        Contacter
                      </Button>
                    </a>
                  </div>
                  <div>
                    {candidate.superLike && <IconButton
                      color="primary"
                      aria-label="Super Like"
                      sx={{
                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                        "&:hover": { backgroundColor: "rgba(0, 123, 255, 0.4)" },
                        transition: "background-color 0.3s",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Star fontSize="large" />
                    </IconButton>}
                  </div>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        !error && (
          <Typography
            variant="body1"
            sx={{ color: '#757575', textAlign: 'center', marginY: 4 }}
          >
            Aucun candidat pour cette offre pour le moment. Revenez plus tard pour voir les mises à jour.
          </Typography>
        )
      )}
    </Box>
  );
};

export default CandidateList;
