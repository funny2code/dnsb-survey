import React from "react";
import Edge from "../Edge";
import Timer from "../../utilities/Timer";
import Logo from "../Logo";
import TopButton from "../TopButton";
import "../../css/header.css";

const Header = ({ duration, label, ...props }) => {
  return (
    <>
      <div className="logo">
        <Logo />
      </div>
      <div className="header">
        <Edge />
        <Timer duration={duration} label={label} />
        <TopButton {...props} />
      </div>
    </>
  );
};

export default Header;
