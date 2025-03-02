import { useState, useEffect } from "react";
import { vapi, startAssistant, stopAssistant } from "./ai";
import ActiveCallDetails from "./call/ActiveCallDetails";

function App() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");

  useEffect(() => {
    vapi
      .on("call-start", () => {
        setLoading(false);
        setStarted(true);
      })
      .on("call-end", () => {
        setStarted(false);
        setLoading(false);
      })
      .on("speech-start", () => {
        setAssistantIsSpeaking(true);
      })
      .on("speech-end", () => {
        setAssistantIsSpeaking(false);
      })
      .on("volume-level", (level) => {
        setVolumeLevel(level);
      });

    // Automatically start the assistant when the page loads
    handleStart();
  }, []);

  const handleStart = async () => {
    const data = await startAssistant();
    setCallId(data.id);
  };

  const handleStop = () => {
    stopAssistant();
    // Redirect to dashboard after ending the call
    window.location.href = "http://127.0.0.1:5501/dashboard/index.html";
  };

  return (
    <div className="app-container">
      <div className="mainb" style={{
    border: "2px solid #007bff", 
    borderRadius: "10px",  
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding:"60px"
  }}>
        {(loading) && <div className="loading"></div>}
        {loading && <p>Starting assistant... please wait</p>}
        {started && (
          <ActiveCallDetails
            assistantIsSpeaking={assistantIsSpeaking}
            volumeLevel={volumeLevel}
            endCallCallback={handleStop}
          />
        )}
      </div>
    </div>
  );
}

export default App;


