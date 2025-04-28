import React, { useState } from "react";
import { personas } from "./personas"; // Import the personas data

function App() {
  // Set initial persona state (e.g., starting with the first persona)
  const [activePersona, setActivePersona] = useState(personas[0]);

  // Function to change persona
  const handlePersonaChange = (persona) => {
    setActivePersona(persona);
  };

  return (
    <div
      style={{
        backgroundColor: activePersona.styles.backgroundColor,
        color: activePersona.styles.color,
        fontFamily: activePersona.styles.fontFamily,
      }}
    >
      <h1>Welcome to PersonaSwap!</h1>
      <button>{activePersona.microcopy.button}</button>
      <p>{activePersona.microcopy.tooltip}</p>

      <div>
        {/* Map through the personas and create buttons for each one */}
        {personas.map((persona) => (
          <button
            key={persona.name}
            onClick={() => handlePersonaChange(persona)}
          >
            {persona.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
