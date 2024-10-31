// src/components/CardComponent.tsx
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CardComponentProps {
  title: string;
  company: string;
  image: string;
  description: string;
  swipeDirection: "left" | "right" | null;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  company,
  image,
  description,
  swipeDirection,
}) => {
  const [swipeProgress, setSwipeProgress] = useState<number | null>(null);

  // Play sound based on swipe direction
  useEffect(() => {
    if (swipeDirection) {
      const audio = new Audio(
        swipeDirection === "left"
          ? "/sounds/leftSwipeSound.wav"
          : "/sounds/rightSwipeSound.wav"
      );
      audio.play();
    }
  }, [swipeDirection]);

  // Capture swipe movement
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    const swipePosition = (touch.clientX / screenWidth) * 100; // Percentage of screen width
    setSwipeProgress(swipePosition);
  };

  // Reset swipe progress
  const handleTouchEnd = () => {
    setSwipeProgress(null); // Reset progress after swipe
  };

  // Change filter based on swipe progress
  const getSwipeFilter = () => {
    if (swipeProgress === null) return "none";
    if (swipeProgress < 50)
      return "brightness(0.7) sepia(1) hue-rotate(-50deg)"; // Swipe left
    if (swipeProgress > 50) return "brightness(0.7) sepia(1) hue-rotate(90deg)"; // Swipe right
    return "none";
  };

  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      sx={{
        position: "relative",
        width: "320px",
        height: "420px",
        padding: "10px",
        boxSizing: "border-box",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark background
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        transition: "transform 0.3s ease",
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Company Image */}
      <Box
        sx={{
          width: "100%",
          height: "60%",
          overflow: "hidden",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the image covers the container without distortion
          }}
        />
      </Box>

      {/* Job Details with Animation */}
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        sx={{
          width: "100%",
          height: "40%",
          position: "relative",
          top: "-10px",
          borderRadius: "0 0 20px 20px",
          background: "rgba(0, 0, 0, 0.8)", // Semi-transparent for better text readability
          color: "white",
          padding: "15px",
          boxShadow: "none",
          filter: getSwipeFilter(),
          transition: "filter 0.2s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ padding: "0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
            {company}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardComponent;
