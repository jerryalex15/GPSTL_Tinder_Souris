// components/MessageInput.js
import { Box, TextField, Button } from "@mui/material";

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSendMessage}
        sx={{ marginLeft: 2, padding: "10px 20px" }}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
