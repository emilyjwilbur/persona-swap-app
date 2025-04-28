import React, { useState } from "react";
import { personas } from "./personas";
import "./App.css"; // 👈 make sure this is imported!

function App() {
  // State to keep track of the selected persona
  const [activePersona, setActivePersona] = useState(personas[0]); // default to the first persona

  // When the user clicks a persona button
  const handlePersonaChange = (persona) => {
    setActivePersona(persona);
  };

  // Dynamic style based on the active persona
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

      {/* Preview Card */}
      <div className="preview-card" style={personaStyle}>
        <h2>Preview Area</h2>
        <p>{activePersona.microcopy.tooltip}</p>
        <button>{activePersona.microcopy.button}</button>
      </div>
    </div>
  );
}

export default App;
