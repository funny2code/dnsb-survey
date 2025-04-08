import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setScrollSpeed } from "../../store/elements";

import Cue from "../Cue";
import Button from "../Button";
import Copyright from "../standalone/Copyright";

import "../../css/Compare.css";


function Compare() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const handleGoBack = () => {
    dispatch(setScrollSpeed(10));
    navigate(-1);
  }; 
  
  return (
    <main className="main-container">
      <section className="compare-container">
      <Cue className={"story"}>
        <p>COMING SOON</p>
      </Cue>
      <div className="compare-buttons">
         
          <Button
            onClick={handleGoBack}
            label="GO BACK"
            className={`bottom_button primary`}
          />
        </div>
      </section>
      <Copyright/>
    </main>
  );
}

export default Compare;
