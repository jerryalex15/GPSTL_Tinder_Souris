// components/MessageWindow.js
import { Box, Paper, Typography } from '@mui/material';

const MessageWindow = ({ activeConversation }) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#3f3d56', marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Chat with {activeConversation.name}
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
        {activeConversation.messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start',
              marginBottom: 2,
            }}
          >
            <Paper
              sx={{
                backgroundColor: message.sender === 'You' ? '#d1c4e9' : '#f1f0ff',
                padding: 2,
                maxWidth: '60%',
                borderRadius: '10px',
                textAlign: message.sender === 'You' ? 'right' : 'left',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {message.sender}
              </Typography>
              <Typography variant="body2">{message.content}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MessageWindow;
