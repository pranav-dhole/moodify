import "./App.css";
import Body from "./components/Body";
import { MoodProvider } from "./context/MoodContext";

function App() {
  return (
    <MoodProvider>
      <Body />
    </MoodProvider>
  );
}

export default App;
