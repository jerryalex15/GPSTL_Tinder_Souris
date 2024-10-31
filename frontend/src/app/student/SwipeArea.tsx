// src/components/SwipeArea.tsx
import { Box, IconButton, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { ThumbUp, ThumbDown, Star } from "@mui/icons-material";
import CardComponent from "./CardComponent";
import { JobPosting } from "@/app/api";

interface SwipeAreaProps {
  cards: JobPosting[];
  onSwipeLeft: (cardId: number) => void;
  onSwipeRight: (cardId: number) => void;
  onSuperLike: (cardId: number) => void;
  swipeDirection: "left" | "right" | null;
  setSwipeDirection: React.Dispatch<
    React.SetStateAction<"left" | "right" | null>
  >;
}

const SwipeArea: React.FC<SwipeAreaProps> = ({
  cards,
  onSwipeLeft,
  onSwipeRight,
  onSuperLike,
  swipeDirection,
  setSwipeDirection,
}) => {
  const controls = useAnimation();

  const handleSwipeLeft = (cardId: number) => {
    setSwipeDirection("left");
    controls.start({ x: -window.innerWidth, opacity: 0 }).then(() => {
      onSwipeLeft(cardId);
      controls.set({ x: 0, opacity: 1 });
    });
  };

  const handleSwipeRight = (cardId: number) => {
    setSwipeDirection("right");
    controls.start({ x: window.innerWidth, opacity: 0 }).then(() => {
      onSwipeRight(cardId);
      controls.set({ x: 0, opacity: 1 });
    });
  };

  const handleSuperLike = (cardId: number) => {
    onSuperLike(cardId);
  };

  return (
    <Box
      sx={{
        marginTop: "20px",
        width: { xs: "90%", sm: "400px" },
        height: { xs: "500px", sm: "600px" },
        textAlign: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        backgroundColor: "rgba(255, 255, 255, 0.05)", // Semi-transparent for depth
      }}
    >
      {cards.length > 0 ? (
        <motion.div
          initial={{ scale: 1 }}
          animate={controls}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset }) => {
            if (offset.x > 150) {
              handleSwipeRight(cards[0].id);
            } else if (offset.x < -150) {
              handleSwipeLeft(cards[0].id);
            } else {
              controls.start({ x: 0, opacity: 1 });
              setSwipeDirection(null);
            }
          }}
        >
          <CardComponent
            title={cards[0].positionTitle}
            company={"Company " + cards[0].companyId}
            image={
              "https://i.pinimg.com/736x/50/f9/f6/50f9f6a4ad0471d7c6f5b4a0148fea54.jpg"
            }
            description={cards[0].requiredSkills}
            swipeDirection={swipeDirection}
          />
        </motion.div>
      ) : (
        <Typography variant="h6" color="text.secondary">
          Plus d'offres à swiper !
        </Typography>
      )}

      {/* Action Buttons */}
      {cards.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            display: "flex",
            gap: "30px",
          }}
        >
          {/* Swipe Left Button */}
          <IconButton
            color="error"
            onClick={() => handleSwipeLeft(cards[0].id)}
            aria-label="Dislike"
            sx={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.4)" },
              transition: "background-color 0.3s",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ThumbDown fontSize="large" />
          </IconButton>

          {/* Super Like Button */}
          <IconButton
            color="primary"
            onClick={() => handleSuperLike(cards[0].id)}
            aria-label="Super Like"
            sx={{
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              "&:hover": { backgroundColor: "rgba(0, 123, 255, 0.4)" },
              transition: "background-color 0.3s",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Star fontSize="large" />
          </IconButton>

          {/* Swipe Right Button */}
          <IconButton
            color="success"
            onClick={() => handleSwipeRight(cards[0].id)}
            aria-label="Like"
            sx={{
              backgroundColor: "rgba(0, 200, 0, 0.2)",
              "&:hover": { backgroundColor: "rgba(0, 200, 0, 0.4)" },
              transition: "background-color 0.3s",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ThumbUp fontSize="large" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default SwipeArea;
