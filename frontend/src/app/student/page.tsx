// src/pages/Home.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import SwipeArea from "./SwipeArea";
import MirageBackground from "../../components/MirageBackground"; // Import the MirageBackground component
import AppBarComponent from "../../components/AppBarComponent";
import {
  applyToJob,
  Category,
  getCategories,
  getPostingsByCategory,
  getStudentPostings,
  JobPosting,
  usePromise,
} from "@/app/api";
import backgroundimage from "../../../img/background.png";
import { CategoryList } from "../company/CategoryList";

const cache = new Map<string, any>();

async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const data = await fetchFn();
  cache.set(key, data);
  return data;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [categoriesDone, categories, categoriesError] = usePromise(() =>
    getCachedData("categories", getCategories)
  );
  const [chosenCategories, setChosenCategories] = useState<Category[]>([]);

  const [done, jobs, error] = usePromise<JobPosting[]>(() => {
    if (chosenCategories.length === 0) {
      return getCachedData("studentPostings", getStudentPostings);
    } else {
      const categoryPromises = chosenCategories.map((category) =>
        getCachedData(`category_${category.id}`, () =>
          getPostingsByCategory(category.id)
        )
      );
      return Promise.all(categoryPromises).then((r) => r.flat());
    }
  });

  const [cards, setCards] = useState<JobPosting[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  useEffect(() => {
    if (done && jobs) {
      setCards(jobs);
    }
  }, [done, jobs]);

  useEffect(() => {
    setMounted(true);

    // Disable scrolling when component is mounted
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSwipe = async (direction: "left" | "right", cardId: number) => {
    if (direction === "left") {
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      setSnackbarMessage("You disliked this job.");
      setSnackbarSeverity("info");
      setOpenSnackbar(true);
    } else if (direction === "right") {
      try {
        await applyToJob(cardId, false); // Regular apply
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        setSnackbarMessage("You applied to the job successfully.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Apply to job failed", error);
        setSnackbarMessage("Failed to apply to the job. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const swipeLeft = (cardId: number) => {
    handleSwipe("left", cardId);
  };

  const swipeRight = (cardId: number) => {
    handleSwipe("right", cardId);
  };

  const handleSuperLike = async (cardId: number) => {
    try {
      await applyToJob(cardId, true); // Super Like
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      setSnackbarMessage("You super liked this job!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error: any) {
      console.error("Super Like failed", error);
      setSnackbarMessage("Super Like failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (!mounted) return null;

  const user_role =
    localStorage.getItem("role") === "student" ? "student" : "company";

  return (
    <>
      <AppBarComponent isLoggedIn={true} profileType={user_role} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
          // Set the tile background
          backgroundImage: backgroundimage,
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px", // Adjust based on tile image dimensions
          // Optionally add a base background color for better contrast
          backgroundColor: "#2a2a2a", // Lighter than previous #1a1a1a
        }}
      >
        {/* Mirage Background */}
        <MirageBackground />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1, // Let this Box take remaining space
            position: "relative",
            zIndex: 2, // Ensure content sits above the mirage effect
          }}
        >
          <div className="flex flex-wrap justify-center max-w-[400px]">
            <CategoryList
              chosenCategories={chosenCategories}
              setChosenCategories={setChosenCategories}
            />
          </div>

          {error && (
            <Typography variant="h6" color="error">
              Failed to load job postings. Please try again later.
            </Typography>
          )}

          {!done && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}

          {done && (
            <SwipeArea
              cards={cards}
              onSwipeLeft={swipeLeft}
              onSwipeRight={swipeRight}
              onSuperLike={handleSuperLike} // Pass the Super Like handler
              swipeDirection={swipeDirection}
              setSwipeDirection={setSwipeDirection}
            />
          )}
        </Box>

        {/* Snackbar for Notifications */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>

      {/* Global Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: "Roboto", sans-serif;
          background-color: #2a2a2a; /* Match the backgroundColor in Box */
        }
      `}</style>
    </>
  );
}
