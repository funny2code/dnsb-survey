import React from "react";
import { useNavigate } from "react-router-dom";
import Copyright from "../standalone/Copyright";
import "../../css/home.css";

const Home = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const goToWelcomeScreen = () => {
    navigate("/welcome");
  };
  const goToIntroduction = () => {
    navigate("/introduction");
  };

  return (
    <>
      <main className=" home-container ">
        <div>
          <img id="logo" src={`${import.meta.env.BASE_URL}/assets/Research_Lib_Logo.svg`} alt="" />
        </div>

        <div className="cards">
          <div className="card" onClick={goToIntroduction}>
            INTRODUCTION
          </div>
          <div className="card" onClick={goToWelcomeScreen}>
            GUIDED TOUR - SELF PACE
          </div>
          <div className="card">
            {" "}
            SELF-RUNNING OVERVIEW [SIT BACK AND RELAX]{" "}
          </div>
        </div>
        <Copyright color={"white"}/>
      </main>
    </>
  );
};

export default Home;
