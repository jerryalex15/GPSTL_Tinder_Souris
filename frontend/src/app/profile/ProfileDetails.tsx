import { Grid, Box, Typography, Link } from '@mui/material';
import { DateRange, LocationOn, Phone, Description, Pinterest } from '@mui/icons-material';

function ProfileDetails({ user }) {
  return (
    <Grid container spacing={2} sx={{ mt: 2, padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: 2 }}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <DateRange sx={{ mr: 1, color: '#3f51b5' }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
            <strong>Date de naissance :</strong> {user.birthDate}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <LocationOn sx={{ mr: 1, color: '#3f51b5' }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
            <strong>Lieu de naissance :</strong> {user.birthPlace}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <Phone sx={{ mr: 1, color: '#3f51b5' }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
            <strong>Numéro de téléphone :</strong> {user.phoneNumber}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <Description sx={{ mr: 1, color: '#3f51b5' }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
            <strong>CV :</strong> {user.resume ? (
              <Link href={user.resume} target="_blank" sx={{ color: '#3f51b5', textDecoration: 'underline' }}>
                Télécharger le CV
              </Link>
            ) : (
              <Typography sx={{ color: '#888' }}>Aucun CV téléchargé</Typography>
            )}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <Pinterest sx={{ mr: 1, color: '#3f51b5' }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
            <strong>Portfolio :</strong> 
            <Link href={user.pinterestUrl} target="_blank" sx={{ color: '#3f51b5', textDecoration: 'underline' }}>
              Voir le portfolio
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfileDetails;
