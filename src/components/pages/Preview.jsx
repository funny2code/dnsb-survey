import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setScrollSpeed } from "../../store/elements";
import Cue from "../Cue";
import Button from "../Button";
import "../../css/preview.css";
import Copyright from "../standalone/Copyright";

function Preview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeStory = useSelector((state) => state.entities.responses.story);
 

  const handleGoBack = () => {
    dispatch(setScrollSpeed(10));
    navigate(-1);
  };
  return (
    <main className="main-container">
      <section className="preview-container">
        <Cue className={"story preview-queue"}>
        { <div dangerouslySetInnerHTML={{ __html: storeStory }} />}
        </Cue>
        <div className="preview-buttons">
          <Button
            style={{ marginBottom: "0" }}
            // onClick={}
            label="PDF IT"
            className={` bottom_button`}
          />
          <Button
            style={{ marginBottom: "0" }}
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

export default Preview;
