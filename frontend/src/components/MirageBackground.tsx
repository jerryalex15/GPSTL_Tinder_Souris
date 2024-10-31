// src/components/MirageBackground.tsx
import { useRef, useEffect } from "react";
import bgImg from "../../img/fond.jpg";

const MirageBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    // Load the background image first
    const backgroundImage = new Image();
    backgroundImage.src = bgImg.src;
    // Remove crossOrigin if not needed
    // backgroundImage.crossOrigin = "anonymous";

    // Function to draw the background image
    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the background image scaled to fit the canvas, but a mask and a bit of blur
      ctx.filter = "blur(2px)";
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
    };

    // Function to set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      if (backgroundImage.complete && backgroundImage.naturalWidth !== 0) {
        drawBackground();
      }
    };

    // Initialize canvas size
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Once the background image is loaded, draw it
    backgroundImage.onload = () => {
      drawBackground();
    };

    // Handle image load error
    backgroundImage.onerror = () => {
      console.error("Failed to load background image.");
      // Optionally, set a fallback background color or image
      ctx.fillStyle = "#2a2a2a"; // Fallback color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Handle mouse movement
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Wave parameters
    const wave = {
      amplitude: 15, // Height of the wave peaks
      wavelength: 150, // Distance between wave peaks
      speed: 0.05, // Speed of wave animation
      phase: 0, // Initial phase of the wave
      color: "rgba(255, 255, 255, 0.2)", // Wave color with transparency
    };

    const render = () => {
      // Redraw the background image each frame to ensure it's beneath the wave
      if (backgroundImage.complete && backgroundImage.naturalWidth !== 0) {
        drawBackground();
      } else {
        // If image failed to load, use fallback background
        ctx.fillStyle = "#2a2a2a"; // Fallback color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.beginPath();

      // Create multiple wave layers for depth
      for (let y = 0; y < canvas.height; y += 40) {
        // Increased vertical spacing for better performance
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x++) {
          const distance = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          );
          const waveOffset =
            wave.amplitude *
            Math.sin((x / wave.wavelength) * 2 * Math.PI + wave.phase) *
            Math.exp(-distance / 300); // Damping factor for wave spread

          ctx.lineTo(x, y + waveOffset);
        }
      }

      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Update wave phase for animation
      wave.phase += wave.speed;

      animationFrameId = requestAnimationFrame(render);
    };

    // Start the rendering loop
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none", // Allow clicks to pass through
        zIndex: 1, // Ensure it sits above the tile background
      }}
    />
  );
};

export default MirageBackground;
