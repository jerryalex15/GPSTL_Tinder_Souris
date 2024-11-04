"use client";
import AppBarComponent from "@/components/AppBarComponent";
import MirageBackground from "@/components/MirageBackground";
import { Star } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function FunnyStar() {
  return <IconButton
    color="primary"
    aria-label="Super Like"
    sx={{
      backgroundColor: "rgba(0, 123, 255, 0.2)",
      "&:hover": { backgroundColor: "rgba(0, 123, 255, 0.4)" },
      transition: "background-color 0.3s",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    }}
  >
    <Star fontSize="medium" />
  </IconButton>
}

export default function Page() {
  return <>
    <AppBarComponent isLoggedIn={true} profileType={"student"} />
    <MirageBackground/>
    <div className="flex w-full h-full justify-center items-center absolute z-20">
      <div className="flex flex-col max-w-md w-[400px] h-[600px] justify-center items-center rounded-md backdrop-blur-sm bg-[rgba(0,0,0,0.5)]">
        <h1 className="text-xl font-bold text-white">Super Likes</h1>
        <p className="text-white">You have 10 Super Likes remaining.</p>
        <h1 className="text-xl font-bold text-white mt-4">Buy more Super Likes</h1>
        {[5, 10, 20, 100, undefined].map(count => (
          <div className="w-[80%] text-center rounded-md mt-4 bg-slate-300 hover:bg-slate-400 transition-colors text-black font-semibold p-2 cursor-pointer flex justify-center items-center space-x-2">
            <div>{count ? `Buy ${count} Super Likes` : "Buy custom amount..."}</div>{count && <FunnyStar />}
          </div>
        ))}
      </div>
    </div>
  </>;
}