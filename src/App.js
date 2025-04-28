import React, { useState } from "react";
import { personas } from "./personas";
import { motion, AnimatePresence } from "framer-motion"; // 👈 import framer-motion
import "./App.css";

function App() {
  const [activePersona, setActivePersona] = useState(personas[0]);

  const handlePersonaChange = (persona) => {
    setActivePersona(persona);
  };

  const personaStyle = {
    backgroundColor: activePersona.styles.backgroundColor,
    color: activePersona.styles.color,
    fontFamily: activePersona.styles.fontFamily,
  };

  return (
    <div className="App">
      <h1>PersonaSwap 🎭</h1>

      {/* Persona Buttons */}
      <div className="persona-buttons">
        {personas.map((persona) => (
          <button
            key={persona.name}
            onClick={() => handlePersonaChange(persona)}
          >
            {persona.name}
          </button>
        ))}
      </div>

      {/* Animated Preview Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona.name} // 👈 important for AnimatePresence to detect changes
          className="preview-card"
          style={personaStyle}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Preview Area</h2>
          <p>{activePersona.microcopy.tooltip}</p>
          <button>{activePersona.microcopy.button}</button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
