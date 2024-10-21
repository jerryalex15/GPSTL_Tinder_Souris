import { Box, IconButton, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import CardComponent from './CardComponent';
import { JobPosting } from "@/app/api";

interface SwipeAreaProps {
  cards: JobPosting[];
  onSwipeLeft: (cardId: number) => void;
  onSwipeRight: (cardId: number) => void;
  swipeDirection: 'left' | 'right' | null;
  setSwipeDirection: React.Dispatch<React.SetStateAction<'left' | 'right' | null>>;
}

const SwipeArea: React.FC<SwipeAreaProps> = ({
  cards,
  onSwipeLeft,
  onSwipeRight,
  swipeDirection,
  setSwipeDirection,
}) => {
  const controls = useAnimation();

  const handleSwipeLeft = (cardId: number) => {
    setSwipeDirection('left');
    controls.start({ x: -window.innerWidth, opacity: 0 }).then(() => {
      onSwipeLeft(cardId);
      controls.set({ x: 0, opacity: 1 });
    });
  };

  const handleSwipeRight = (cardId: number) => {
    setSwipeDirection('right');
    controls.start({ x: window.innerWidth, opacity: 0 }).then(() => {
      onSwipeRight(cardId);
      controls.set({ x: 0, opacity: 1 });
    });
  };

  return (
    <Box
      sx={{
        marginTop: '20px',
        maxWidth: '400px',
        maxHeight: '600px',
        textAlign: 'center',
      }}
    >
      {cards.length > 0 ? (
        <motion.div
          initial={{ x: 0, scale: 1, opacity: 1 }}
          animate={controls}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.5}
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
            image={'https://i.pinimg.com/736x/50/f9/f6/50f9f6a4ad0471d7c6f5b4a0148fea54.jpg'}
            description={cards[0].requiredSkills}
            swipeDirection={swipeDirection}
          />
        </motion.div>
      ) : (
        <Typography variant="h6" color="text.secondary">
          Plus d'offres à swiper !
        </Typography>
      )}
    </Box>
  );
};

export default SwipeArea;
