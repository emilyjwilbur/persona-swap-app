import React, { useState } from "react";
import { personas } from "./personas";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [activePersona, setActivePersona] = useState(personas[0]);
  const [newPersona, setNewPersona] = useState({
    name: "",
    styles: {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontFamily: "Arial, sans-serif",
    },
    microcopy: {
      tooltip: "Enter your tooltip here.",
      button: "Enter your button text here.",
    },
    blurIntensity: "4",
  });

  const [errors, setErrors] = useState({
    name: "",
    backgroundColor: "",
    textColor: "",
    blurIntensity: "",
  });

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if we're changing the text fields (tooltip or button)
    if (name === "tooltip" || name === "button") {
      setNewPersona({
        ...newPersona,
        microcopy: {
          ...newPersona.microcopy,
          [name]: value,
        },
      });
    } else {
      setNewPersona({
        ...newPersona,
        [name]: value,
      });
    }
  };

  // Handle persona style changes (colors and fonts)
  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setNewPersona({
      ...newPersona,
      styles: {
        ...newPersona.styles,
        [name]: value,
      },
    });
  };

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Validate name
    if (!newPersona.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Validate background color
    if (!/^#[0-9A-F]{6}$/i.test(newPersona.styles.backgroundColor)) {
      newErrors.backgroundColor =
        "Please select a valid hex color for background.";
      isValid = false;
    }

    // Validate text color
    if (!/^#[0-9A-F]{6}$/i.test(newPersona.styles.color)) {
      newErrors.textColor = "Please select a valid hex color for text.";
      isValid = false;
    }

    // Validate blur intensity
    if (newPersona.blurIntensity < 0 || newPersona.blurIntensity > 20) {
      newErrors.blurIntensity = "Blur intensity must be between 0 and 20.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle adding a new persona
  const handleAddPersona = () => {
    if (validateForm()) {
      const updatedPersonas = [...personas, newPersona];
      setActivePersona(newPersona); // Apply the new persona as active
      console.log("Updated Personas:", updatedPersonas);
    }
  };

  // Reset the form to the default state
  const handleReset = () => {
    setNewPersona({
      name: "",
      styles: {
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "Arial, sans-serif",
      },
      microcopy: {
        tooltip: "Enter your tooltip here.",
        button: "Enter your button text here.",
      },
      blurIntensity: "4",
    });
    setErrors({});
  };

  // Debugging the state when colors change
  console.log("Current Persona Colors:", newPersona.styles);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona.name + "-background"}
          className="App"
          style={activePersona.styles}
          initial={{
            opacity: 0,
            filter: `blur(${activePersona.blurIntensity})`,
          }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: `blur(${activePersona.blurIntensity})` }}
          transition={{ duration: 0.6 }}
        >
          <h1>PersonaSwap 🎭</h1>

          <div className="persona-buttons">
            {personas.map((persona) => (
              <button
                key={persona.name}
                onClick={() => setActivePersona(persona)}
              >
                {persona.name}
              </button>
            ))}
          </div>

          <motion.div
            key={activePersona.name + "-card"}
            className="preview-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Preview Area</h2>
            <p>{activePersona.microcopy.tooltip}</p>
            <button>{activePersona.microcopy.button}</button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="persona-customization">
        <h2>Create Your Persona</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newPersona.name}
              onChange={handleChange}
            />
          </label>
          {errors.name && <span className="error">{errors.name}</span>}

          <label>
            Background Color:
            <input
              type="color"
              name="backgroundColor"
              value={newPersona.styles.backgroundColor}
              onChange={handleStyleChange}
            />
          </label>
          {errors.backgroundColor && (
            <span className="error">{errors.backgroundColor}</span>
          )}

          <label>
            Text Color:
            <input
              type="color"
              name="color"
              value={newPersona.styles.color}
              onChange={handleStyleChange}
            />
          </label>
          {errors.textColor && (
            <span className="error">{errors.textColor}</span>
          )}

          <label>
            Font Family:
            <input
              type="text"
              name="fontFamily"
              value={newPersona.styles.fontFamily}
              onChange={handleStyleChange}
            />
          </label>

          <label>
            Tooltip Text:
            <input
              type="text"
              name="tooltip"
              value={newPersona.microcopy.tooltip}
              onChange={handleChange}
            />
          </label>

          <label>
            Button Text:
            <input
              type="text"
              name="button"
              value={newPersona.microcopy.button}
              onChange={handleChange}
            />
          </label>

          <label>
            Blur Intensity:
            <input
              type="number"
              name="blurIntensity"
              value={newPersona.blurIntensity}
              onChange={handleChange}
              min="0"
              max="20"
            />
          </label>
          {errors.blurIntensity && (
            <span className="error">{errors.blurIntensity}</span>
          )}

          <button type="button" onClick={handleAddPersona}>
            Add Persona
          </button>

          <button type="button" onClick={handleReset} className="reset-button">
            Reset Form
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
