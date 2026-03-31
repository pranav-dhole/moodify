import { createContext, useContext, useState } from "react";
import { MOOD_TYPES, PALETTE_DATA } from "../utils/choiceData";

const MoodContext = createContext(null);

export function MoodProvider({ children }) {
  const [selectedMoodName, setSelectedMoodName] = useState("Romantic");

  const selectedMood =
    MOOD_TYPES.find((m) => m.name === selectedMoodName) || null;

  const selectedPalette =
    PALETTE_DATA.find((p) => p.name === selectedMoodName) || null;

  return (
    <MoodContext.Provider
      value={{
        selectedMoodName,
        setSelectedMoodName,
        selectedMood,
        selectedPalette,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}
