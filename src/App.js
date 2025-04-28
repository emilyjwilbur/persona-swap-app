import React, { useState, useEffect } from "react";
import { personas as initialPersonas } from "./personas";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [personas, setPersonas] = useState(() => {
    const saved = localStorage.getItem("personas");
    return saved ? JSON.parse(saved) : initialPersonas;
  });

  const [activePersona, setActivePersona] = useState(null);
  const [newPersona, setNewPersona] = useState({
    name: "",
    styles: {
      gradientType: "linear",
      colors: ["#ff0000", "#000000"],
      angle: "45deg", // only for linear
      textColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },
    microcopy: {
      tooltip: "Enter your tooltip here.",
      button: "Enter your button text here.",
    },
    blurIntensity: 4,
  });

  const [errors, setErrors] = useState({
    name: "",
    backgroundColor: "",
    textColor: "",
    blurIntensity: "",
  });

  // Set the first persona as active upon page load
  useEffect(() => {
    if (personas.length > 0 && !activePersona) {
      setActivePersona(personas[0]);
    }
  }, [personas, activePersona]);

  // Function to generate gradient background dynamically based on persona styles
  const generateGradientBackground = (personaStyles) => {
    const { gradientType, colors, angle } = personaStyles;
    if (gradientType === "linear") {
      return `linear-gradient(${angle}, ${colors.join(", ")})`;
    } else if (gradientType === "radial") {
      return `radial-gradient(circle, ${colors.join(", ")})`;
    }
    return "#ffffff"; // fallback in case of invalid type
  };

  // Handle changes in input fields
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

    if (newPersona.blurIntensity < 0 || newPersona.blurIntensity > 20) {
      newErrors.blurIntensity = "Blur intensity must be between 0 and 20.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddPersona = () => {
    if (validateForm()) {
      let updatedPersonas;
      if (editingIndex !== null) {
        // We're editing, so replace the existing persona
        updatedPersonas = [...personas];
        updatedPersonas[editingIndex] = newPersona;
      } else {
        // We're adding a new one
        updatedPersonas = [...personas, newPersona];
      }
      setPersonas(updatedPersonas);
      setActivePersona(newPersona);
      localStorage.setItem("personas", JSON.stringify(updatedPersonas));
      setEditingIndex(null); // 👈 Reset after saving
    }
  };

  const handleReset = () => {
    setNewPersona({
      name: "",
      styles: {
        gradientType: "linear",
        colors: ["#ff0000", "#000000"],
        angle: "45deg",
        textColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
      },
      microcopy: {
        tooltip: "Enter your tooltip here.",
        button: "Enter your button text here.",
      },
      blurIntensity: 4,
    });
    setErrors({});
  };
  const [editingIndex, setEditingIndex] = useState(null);
  const handleClearPersonas = () => {
    localStorage.removeItem("personas");
    setPersonas(initialPersonas);
    setActivePersona(initialPersonas[0]);
  };

  const handleEditPersona = (index) => {
    const personaToEdit = personas[index];

    setNewPersona({
      name: personaToEdit.name || "",
      styles: {
        gradientType: personaToEdit.styles.gradientType || "linear",
        colors: personaToEdit.styles.colors || ["#ff0000", "#000000"],
        angle: personaToEdit.styles.angle || "45deg",
        textColor: personaToEdit.styles.textColor || "#ffffff",
        fontFamily: personaToEdit.styles.fontFamily || "Arial, sans-serif",
      },
      microcopy: {
        tooltip: personaToEdit.microcopy.tooltip || "Enter your tooltip here.",
        button:
          personaToEdit.microcopy.button || "Enter your button text here.",
      },
      blurIntensity: personaToEdit.blurIntensity ?? 4,
    });

    setActivePersona(personaToEdit);
    setEditingIndex(index); // ✅
  };

  const handleDeletePersona = (index) => {
    const updatedPersonas = personas.filter((_, i) => i !== index);
    setPersonas(updatedPersonas);
    setActivePersona(updatedPersonas[0] || null);
    localStorage.setItem("personas", JSON.stringify(updatedPersonas));
  };

  // Default styles if no persona is active yet
  const backgroundStyle = activePersona
    ? generateGradientBackground(activePersona.styles)
    : "linear-gradient(45deg, #ff0000, #000000)";

  const textStyle = activePersona
    ? {
        color: activePersona.styles.textColor,
        fontFamily: activePersona.styles.fontFamily,
      }
    : { color: "#ffffff", fontFamily: "Arial, sans-serif" };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={
            activePersona
              ? activePersona.name + "-background"
              : "default-background"
          }
          className="App"
          style={{
            background: backgroundStyle,
            color: textStyle.color,
            fontFamily: textStyle.fontFamily,
            filter: `blur(${
              activePersona ? activePersona.blurIntensity : 0
            }px)`,
          }}
          initial={{
            opacity: 0,
            filter: `blur(${
              activePersona ? activePersona.blurIntensity : 0
            }px)`,
          }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            filter: `blur(${
              activePersona ? activePersona.blurIntensity : 0
            }px)`,
          }}
          transition={{ duration: 0.6 }}
        >
          <h1>PersonaSwap 🎭</h1>

          <div className="persona-buttons">
            {personas.map((persona, index) => (
              <div key={persona.name} className="persona-button-group">
                <button onClick={() => setActivePersona(persona)}>
                  {persona.name}
                </button>
                <button onClick={() => handleEditPersona(index)}>✏️</button>
                <button onClick={() => handleDeletePersona(index)}>🗑️</button>
              </div>
            ))}
          </div>

          {activePersona && (
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
          )}

          <button onClick={handleClearPersonas} className="reset-button">
            Clear Saved Personas
          </button>
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
            Gradient Type:
            <select
              name="gradientType"
              value={newPersona.styles.gradientType}
              onChange={handleStyleChange}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </label>

          <label>
            Background Gradient Colors:
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                type="color"
                value={newPersona.styles.colors[0]}
                onChange={(e) => {
                  const newColors = [...newPersona.styles.colors];
                  newColors[0] = e.target.value;
                  setNewPersona({
                    ...newPersona,
                    styles: {
                      ...newPersona.styles,
                      colors: newColors,
                    },
                  });
                }}
              />
              <input
                type="color"
                value={newPersona.styles.colors[1]}
                onChange={(e) => {
                  const newColors = [...newPersona.styles.colors];
                  newColors[1] = e.target.value;
                  setNewPersona({
                    ...newPersona,
                    styles: {
                      ...newPersona.styles,
                      colors: newColors,
                    },
                  });
                }}
              />

              {/* Live Gradient Preview */}
              <div
                style={{
                  width: "60px",
                  height: "30px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: `linear-gradient(${
                    newPersona.styles.angle || "90deg"
                  }, ${newPersona.styles.colors.join(", ")})`,
                }}
              />
            </div>
          </label>

          <label>
            Text Color:
            <input
              type="color"
              name="textColor"
              value={newPersona.styles.textColor}
              onChange={handleStyleChange}
            />
          </label>

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
            {editingIndex !== null ? "Save Changes" : "Add Persona"}
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
