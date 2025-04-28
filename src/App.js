import React, { useState } from "react";
import { personas as initialPersonas } from "./personas";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [personas, setPersonas] = useState(initialPersonas); // Store personas in state
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

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!newPersona.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!/^#[0-9A-F]{6}$/i.test(newPersona.styles.backgroundColor)) {
      newErrors.backgroundColor =
        "Please select a valid hex color for background.";
      isValid = false;
    }

    if (!/^#[0-9A-F]{6}$/i.test(newPersona.styles.color)) {
      newErrors.textColor = "Please select a valid hex color for text.";
      isValid = false;
    }

    if (newPersona.blurIntensity < 0 || newPersona.blurIntensity > 20) {
      newErrors.blurIntensity = "Blur intensity must be between 0 and 20.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddPersona = () => {
    if (validateForm()) {
      setPersonas((prevPersonas) => [...prevPersonas, newPersona]);
      setActivePersona(newPersona);
      console.log("Updated Personas:", personas);
    }
  };

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
