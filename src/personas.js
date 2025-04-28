export const personas = [
  {
    name: "Goth Mode",
    styles: {
      backgroundColor: "#1a1a1a",
      color: "#ff0000",
      fontFamily: "'Courier New', monospace",
    },
    microcopy: {
      tooltip: "This will probably break.",
      button: "Whatever",
    },
    blurIntensity: "10px", // <-- Add this
  },
  {
    name: "Cheerleader Mode",
    styles: {
      backgroundColor: "#ffe4e1",
      color: "#ff69b4",
      fontFamily: "'Comic Sans MS', cursive",
    },
    microcopy: {
      tooltip: "You got this! 💪",
      button: "Let's Go!",
    },
    blurIntensity: "4px", // <-- Softer blur
  },
  {
    name: "Grumpy Dev Mode",
    styles: {
      backgroundColor: "#282c34",
      color: "#61dafb",
      fontFamily: "'Fira Code', monospace",
    },
    microcopy: {
      tooltip: "Don't bother.",
      button: "Fine, Submit it.",
    },
    blurIntensity: "6px", // <-- Medium blur
  },
];
