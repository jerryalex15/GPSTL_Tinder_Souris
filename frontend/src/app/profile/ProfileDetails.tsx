import { Grid, Box, Typography, Link } from '@mui/material';
import { DateRange, LocationOn, Phone, Description, Pinterest } from '@mui/icons-material';

function ProfileDetails({ user }) {
  return (
    <Box 

      sx={{ 
        mt: 2, 
        padding: 3, 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: '6px',
        boxShadow: 2 
      }}
    >
      {[
        { icon: <DateRange />, label: 'Date de naissance', value: user.birthDate },
        { icon: <LocationOn />, label: 'Lieu de naissance', value: user.birthPlace },
        { icon: <Phone />, label: 'Numéro de téléphone', value: user.phoneNumber },
        { 
          icon: <Description />, 
          label: 'CV', 
          value: user.resume ? (
            <Link href={user.resume} target="_blank" sx={{ color: '#3f51b5', textDecoration: 'underline' }}>
              Télécharger le CV
            </Link>
          ) : (
            <Typography sx={{ color: '#888' }}>Aucun CV téléchargé</Typography>
          )
        },
        { 
          icon: <Pinterest />, 
          label: 'Portfolio', 
          value: (
            <Link href={user.pinterestUrl} target="_blank" sx={{ color: '#3f51b5', textDecoration: 'underline' }}>
              Voir le portfolio
            </Link>
          )
        },
      ].map(({ icon, label, value }, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
            {icon && <Box sx={{ mr: 1, color: '#3f51b5' }}>{icon}</Box>}
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
              <strong>{label} :</strong> {value}
            </Typography>
          </Box>  

      ))}
    </Box>
  );
}

export default ProfileDetails;
