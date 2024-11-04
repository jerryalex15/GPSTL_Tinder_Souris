"use client";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ConversationList from "./ConversationList";
import MessageWindow from "./MessageWindow";
import MessageInput from "./MessageInput";
import AppBarComponent from "../../components/AppBarComponent";
import {
  ChatMessage,
  getAuthData,
  getUserMessages,
  sendChatMessage,
  getUserDetails,
} from "../api";

const MessagingPage = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = getAuthData();

  useEffect(() => {
    if (currentUser?.userId) {
      loadUserMessages();

      // Check if we need to open a specific conversation
      const lastContactedCandidate = localStorage.getItem(
        "lastContactedCandidate"
      );
      if (lastContactedCandidate) {
        const candidateInfo = JSON.parse(lastContactedCandidate);
        // Create or open conversation with this candidate
        const conversation = {
          id: candidateInfo.id,
          name: `Candidat pour ${candidateInfo.jobTitle}`,
          messages: [],
          jobOfferId: candidateInfo.jobOfferId,
        };
        setActiveConversation(conversation);
        // Clear the stored info
        localStorage.removeItem("lastContactedCandidate");
      }

      // Set up a timer to periodically check for new messages
      const intervalId = setInterval(loadUserMessages, 5000); // Check every 5 seconds

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [currentUser]);

  const loadUserMessages = async () => {
    try {
      const messages = await getUserMessages(currentUser!.userId);
      // Group messages by conversation partner
      const conversationsMap = new Map();

      for (const msg of messages) {
        const partnerId =
          msg.senderId === currentUser!.userId ? msg.receiverId : msg.senderId;
        if (!conversationsMap.has(partnerId)) {
          const partnerDetails = await getUserDetails(partnerId);
          conversationsMap.set(partnerId, {
            id: partnerId,
            name: partnerDetails.name,
            messages: [],
            lastMessage: msg.message,
          });
        }
        conversationsMap.get(partnerId).messages.push({
          sender:
            msg.senderId === currentUser!.userId
              ? "You"
              : conversationsMap.get(partnerId).name,
          content: msg.message,
          timestamp: msg.timestamp,
        });
      }

      setConversations(Array.from(conversationsMap.values()));
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleConversationClick = (conversation: any) => {
    setActiveConversation(conversation);
  };
  const handleSendMessage = async () => {
    if (newMessage.trim() && activeConversation && currentUser) {
      try {
        const message: ChatMessage = {
          senderId: currentUser.userId,
          receiverId: activeConversation.id,
          message: newMessage.trim(),
        };

        await sendChatMessage(message);

        // Update the active conversation with the new message
        const updatedConversation = {
          ...activeConversation,
          messages: [
            ...activeConversation.messages,
            {
              sender: "You",
              content: newMessage.trim(),
              timestamp: new Date().toISOString(),
            },
          ],
        };

        setActiveConversation(updatedConversation);

        // Update the conversations list with the new message
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === activeConversation.id
              ? { ...conv, messages: updatedConversation.messages }
              : conv
          )
        );

        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const user_role = currentUser?.role || "student";

  return (
    <>
      <AppBarComponent
        isLoggedIn={true}
        profileType={user_role as "student" | "company"}
      />
      <Box sx={{ display: "flex", height: "100vh", paddingTop: 8 }}>
        {/* Ajuste 'marginTop' pour laisser de l'espace sous l'AppBar */}
        {/* Liste des conversations à gauche */}
        <ConversationList
          conversations={conversations}
          onConversationClick={handleConversationClick}
        />

        {/* Fenêtre de discussion à droite */}
        <Box
          sx={{
            width: "70%",
            backgroundColor: "rgb(255, 255, 255)",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <MessageWindow activeConversation={activeConversation} />
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </Box>
      </Box>
    </>
  );
};

export default MessagingPage;
