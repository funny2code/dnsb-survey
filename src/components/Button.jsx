import "../css/button.css";

const Button = ({ label, className, onClick, style }) => {
  return (
    <button style={style} onClick={onClick} className={`button ${className}`}>
      {label}
    </button>
  );
};
export default Button;
