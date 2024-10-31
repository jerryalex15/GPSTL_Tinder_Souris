"use client";
// pages/messaging.js
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import ConversationList from './ConversationList';
import MessageWindow from './MessageWindow';
import MessageInput from './MessageInput';
import AppBarComponent from '../../components/AppBarComponent';

const MessagingPage = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', avatar: '/avatar1.jpg' },
    { id: 2, name: 'Jane Doe', lastMessage: 'I am good! How about you?', avatar: '/avatar2.jpg' },
    { id: 3, name: 'Alex Smith', lastMessage: 'See you tomorrow!', avatar: '/avatar3.jpg' },
  ]);

  const [activeConversation, setActiveConversation] = useState({
    id: 1,
    name: 'John Doe',
    messages: [
      { sender: 'John Doe', content: 'Hey, how are you?', avatar: '/avatar1.jpg' },
      { sender: 'You', content: 'I am good, thanks!', avatar: '/avatar3.jpg' },
    ],
  });

  const [newMessage, setNewMessage] = useState('');

  const handleConversationClick = (conversation) => {
    // Simuler le chargement des messages (tu peux remplacer ça par une vraie requête)
    const messages = [
      { sender: conversation.name, content: conversation.lastMessage, avatar: conversation.avatar },
      { sender: 'You', content: 'Sure, talk soon!', avatar: '/avatar3.jpg' },
    ];
    setActiveConversation({ ...conversation, messages });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setActiveConversation({
        ...activeConversation,
        messages: [
          ...activeConversation.messages,
          { sender: 'You', content: newMessage, avatar: '/avatar3.jpg' },
        ],
      });
      setNewMessage('');
    }
  };

  return <>
    <AppBarComponent isLoggedIn={true} />
    <Box sx={{ display: 'flex', height: '100vh', paddingTop: 8}}>
      {/* Ajuste 'marginTop' pour laisser de l'espace sous l'AppBar */}
      {/* Liste des conversations à gauche */}
      <ConversationList
        conversations={conversations}
        onConversationClick={handleConversationClick}
      />

      {/* Fenêtre de discussion à droite */}
      <Box
      
        sx={{
          width: '70%',
          backgroundColor: 'rgb(255, 255, 255)',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <MessageWindow activeConversation={activeConversation} />
        <MessageInput newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
      </Box>
    </Box>
  </>;
};

export default MessagingPage;
