import { Box, Button, TextField, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { Category, JobPosting, JobPostingCreation } from "@/app/api";
import { useEffect, useState } from 'react';
import { CategoryList } from "@/app/company/CategoryList";

const OfferForm = ({
  newOffer,
  setNewOffer,
  handleAddOffer,
  handleBack,
}: {
  newOffer: JobPostingCreation;
  setNewOffer: React.Dispatch<React.SetStateAction<JobPostingCreation>>;
  handleAddOffer: () => Promise<void>; // Assurez-vous que handleAddOffer retourne une promesse
  handleBack: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chosenCategories, setChosenCategories] = useState<Category[]>([]);

  useEffect(() => {
    setNewOffer((prev) => ({ ...prev, categories: chosenCategories.map((c) => c.id) }));
  }, [chosenCategories]);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await handleAddOffer(); // Assurez-vous que cette fonction gère l'ajout de l'offre
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'offre.'); // Gestion d'erreur simple
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        mb: 4, 
        borderRadius: 3, 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)', 
        padding: 3 
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
        Créer une nouvelle offre
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

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

        <div className="flex flex-wrap justify-center">
          <CategoryList chosenCategories={chosenCategories} setChosenCategories={setChosenCategories}/>
        </div>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={onSubmit} // Appel de la fonction de soumission
            disabled={loading} // Désactiver le bouton pendant le chargement
            sx={{
              textTransform: 'none',
              backgroundColor: '#6a1b9a',
              '&:hover': {
                backgroundColor: '#ab47bc',
              },
              borderRadius: 2,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit"/> : 'Ajouter l\'offre'}
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
