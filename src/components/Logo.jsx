import "../css/Logo.css";
const Logo = (className) => {
  return (
    <>
      <img src={`${import.meta.env.BASE_URL}//assets/Logo.svg`} className="logo" />
    </>
  );
};

export default Logo;
