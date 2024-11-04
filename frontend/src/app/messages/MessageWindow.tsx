// components/MessageWindow.js
import { Box, Paper, Typography } from "@mui/material";

const MessageWindow = ({ activeConversation }) => {
  if (!activeConversation) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography>Select a conversation to start chatting</Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: "#3f3d56",
          marginBottom: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Chat with {activeConversation.name}
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
        {activeConversation.messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: message.sender === "You" ? "flex-end" : "flex-start",
              marginBottom: 2,
            }}
          >
            <Paper
              sx={{
                backgroundColor:
                  message.sender === "You" ? "#d1c4e9" : "#f1f0ff",
                padding: 2,
                maxWidth: "60%",
                borderRadius: "10px",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {message.sender}
              </Typography>
              <Typography variant="body2">{message.content}</Typography>
              {message.timestamp && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1, opacity: 0.7 }}
                >
                  {new Date(message.timestamp).toLocaleString()}
                </Typography>
              )}
            </Paper>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MessageWindow;
