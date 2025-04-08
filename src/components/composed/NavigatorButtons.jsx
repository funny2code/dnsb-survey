import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIndex, setQuestionTypeIndex } from "../../store/elements";

import elements from "../../services/learnMode";
import "../../css/LearnMode.css";

export default function NavigatorButtons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const index = useSelector((state) => state.entities.elements.index);
  const questionTypeIndex = useSelector(
    (state) => state.entities.elements.questionTypeIndex
  );

  const isBarrel = elements[index].widget === "barrel";

  const handleNext = () => {
    if (index < elements.length - 1) dispatch(setIndex(index + 1));
    if (questionTypeIndex < 3 && isBarrel) {
      dispatch(setQuestionTypeIndex(questionTypeIndex + 1));
    }
  };

  const handlePrevious = () => {
    if (index > 0) dispatch(setIndex(index - 1));
    if (questionTypeIndex > 0 && isBarrel) {
      dispatch(setQuestionTypeIndex(questionTypeIndex - 1));
    }
  };

  const handleExit = () => {
    navigate(-1);
  };

  return (
    <div className="learn_mode_navigator">
      <Button onClick={handlePrevious} label="PREVIOUS" className={`secondary button-small`} />
      <Button onClick={handleNext} label="NEXT" className={`secondary button-small`} />
      <Button onClick={handleExit} label="EXIT" className={`secondary button-small`} />
    </div>
  );
}
