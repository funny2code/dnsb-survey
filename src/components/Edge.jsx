import "../css/edge.css";

const Edge = ({ type, onClick }) => {
  return type === "standing" ? (
    <img
      src={`${import.meta.env.BASE_URL}/assets/Edge_Emotional_States_Hands_Back_Blue.svg`}
    />
  ) : (
    <div className="edge-container">
      <div className="click-me-box">Click Me</div>
      <img
        src={`${import.meta.env.BASE_URL}/assets/Edge_Emotional_States_Sitting_Stool_Blue.svg`}
        className="edge"
        onClick={onClick}
      />
    </div>
  );
};

export default Edge;
