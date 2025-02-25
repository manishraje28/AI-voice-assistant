import AssistantSpeechIndicator from "./AssistantSpeechIndicator";
import VolumeLevel from "./VolumeLevel";

const ActiveCallDetails = ({
  // eslint-disable-next-line react/prop-types
  assistantIsSpeaking,
  // eslint-disable-next-line react/prop-types
  volumeLevel,
  // eslint-disable-next-line react/prop-types
  endCallCallback,
}) => {
  return (
    <div className="active-call-detail">
      <div className="call-info">
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        <VolumeLevel volume={volumeLevel} />
      </div>
      <div className="end-call-button">
        <button onClick={endCallCallback}>End Call</button>
      </div>
    </div>
  );
};

export default ActiveCallDetails