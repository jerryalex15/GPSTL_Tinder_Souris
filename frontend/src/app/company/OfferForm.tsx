import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { JobPosting, JobPostingCreation } from "@/app/api";

const OfferForm = ({ newOffer, setNewOffer, handleAddOffer, handleBack }: {
  newOffer: JobPostingCreation,
  setNewOffer: React.Dispatch<React.SetStateAction<JobPostingCreation>>,
  handleAddOffer: () => void,
  handleBack: () => void,
}) => {
  return (
    <Box 
      sx={{ 
        mb: 4, 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: 3, 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', 
        padding: 3 
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
        Créer une nouvelle offre
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Titre de l'offre"
            value={newOffer.positionTitle}
            onChange={(e) => setNewOffer({ ...newOffer, positionTitle: e.target.value })}
            margin="normal"
            variant="outlined"
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#6a1b9a',
                },
                '&:hover fieldset': {
                  borderColor: '#ab47bc',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ab47bc',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skills"
            value={newOffer.requiredSkills}
            onChange={(e) => setNewOffer({ ...newOffer, requiredSkills: e.target.value })}
            margin="normal"
            variant="outlined"
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#6a1b9a',
                },
                '&:hover fieldset': {
                  borderColor: '#ab47bc',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ab47bc',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button 
            variant="contained" 
            onClick={handleAddOffer} 
            sx={{ 
              textTransform: 'none', 
              backgroundColor: '#6a1b9a', 
              '&:hover': {
                backgroundColor: '#ab47bc',
              },
              borderRadius: 2, 
            }}
          >
            Ajouter l'offre
          </Button>
        </Grid>

        {/* Ajout du bouton Retour */}
        <Grid item xs={12}>
          <Button 
            variant="outlined" 
            onClick={handleBack} 
            sx={{ 
              textTransform: 'none', 
              color: '#6a1b9a',
              borderColor: '#6a1b9a',
              '&:hover': {
                borderColor: '#ab47bc',
              },
              borderRadius: 2, 
            }}
          >
            Retour
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OfferForm;
