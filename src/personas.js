export const personas = [
  {
    name: "Goth Mode",
    styles: {
      gradientType: "linear",
      colors: ["black", "#000000"],
      angle: "45deg", // only for linear
      animation: true,
      textColor: "#ffffff",
      fontFamily: "'UnifrakturCook', sans-serif", // Gothic font
    },
    microcopy: {
      tooltip: "Darkness falls...",
      button: "Embrace the night",
    },
    blurIntensity: 10, // <-- NUMBER, no "px"
  },
  {
    name: "Cheerleader Mode",
    styles: {
      gradientType: "linear",
      colors: ["pink", "#000000"],
      angle: "45deg", // only for linear
      animation: true,
      textColor: "#ffffff",
      fontFamily: "'Fredoka One', sans-serif",
    },
    microcopy: {
      tooltip: "You got this! 💪",
      button: "Let's Go!",
    },
    blurIntensity: 4, // <-- NUMBER, no "px"
  },
  {
    name: "Grumpy Dev Mode",
    styles: {
      gradientType: "linear",
      colors: ["blue", "#000000"],
      angle: "45deg", // only for linear
      animation: true,
      textColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },
    microcopy: {
      tooltip: "Don't bother.",
      button: "Fine, Submit it.",
    },
    blurIntensity: 6, // <-- NUMBER, no "px"
  },
];
