const numBars = 10;

// eslint-disable-next-line react/prop-types
const VolumeLevel = ({volume}) => {
  return (
    <div className="volume-level">
      <div className="volume-bars">
        {Array.from({ length: numBars }, (_, i) => {
          return (
            <div
              key={i}
              className={`volume-bar ${i / numBars < volume ? "active" : ""}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default VolumeLevel