// components/ConversationList.js
import { Box, List, ListItem, Typography, Avatar, Paper } from '@mui/material';

const ConversationList = ({ conversations, onConversationClick }) => {
  return (
    <Box
      sx={{
        width: '30%',
        backgroundColor: 'rgb(0, 0, 0)', // Légèrement transparent pour un effet plus doux
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Ombre plus marquée
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#fff', // Couleur du titre en blanc
          marginBottom: 3,
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '1.25rem', // Taille de police agrandie
        }}
      >
        Conversations
      </Typography>
      <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {conversations.map((conversation) => (
          <ListItem
            key={conversation.id}
            button
            onClick={() => onConversationClick(conversation)}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)', // Bordure blanche légèrement transparente
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Survol blanc clair
                transition: 'background-color 0.3s ease', // Transition douce
              },
              paddingY: 1, // Padding vertical pour les éléments de la liste
            }}
          >
            <Avatar src={conversation.avatar} sx={{ marginRight: 2, width: 40, height: 40 }} />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', color: '#fff' }} // Couleur du nom en blanc
              >
                {conversation.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }} // Couleur et taille du dernier message
              >
                {conversation.lastMessage}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversationList;
