import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChoiceList } from "../../store/surveys";
import choiceListUpdater from "../../utilities/choiceListUpdater";
import "../../css/bar.css";

const Bar = ({ widgetOutAnimation }) => {
  const dispatch = useDispatch();
  const { choiceList } = useSelector((state) => state.entities.surveys);
  const progressBarRef = useRef(null);
  const isDragging = useRef(false);
  const [progress, setProgress] = useState(0); // Initial progress (in %)

  useEffect(() => {}, [widgetOutAnimation]);

  // Handle desktop version
  const handleMouseDown = (event) => {
    isDragging.current = true;
    updateProgress(event);
  };

  const handleMouseMove = (event) => {
    if (isDragging.current) {
      updateProgress(event);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Handle mobile version
  const handleTouchStart = (event) => {
    isDragging.current = true;
    updateProgress(event);
  };
  const handleTouchMove = (event) => {
    if (!isDragging.current) return;

    updateProgress(event);
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const incrementProgress = () => {
    setProgress(progress + 1);
  };

  const decrementProgress = () => {
    if (progress >= 1) {
      setProgress(progress - 1);
    }
  };

  // Calculate and set progress based on mouse position
  const updateProgress = (event) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();

      // Get the x-coordinate, considering both mouse and touch events
      const x = event.clientX || (event.touches && event.touches[0].clientX);

      const newProgress = ((x - rect.left) / rect.width) * 100;
      setProgress(Math.max(0, Math.min(newProgress, 100)));
    }
  };

  useEffect(() => {
    if (progress >= 1) {
      const value = Math.round(progress);
      dispatch(updateChoiceList(choiceListUpdater(choiceList, value)));
    }
  }, [progress]);

  // This always referesh the bar progress on new blanks
  useEffect(() => {
    if (choiceList.length === 1 && choiceList[0].value === 0) setProgress(0);
  }, [choiceList]);

  return (
    <div className="bar-set">
      <div
        className={`bar ${
          widgetOutAnimation
            ? widgetOutAnimation
            : `animate__animated animate__backInRight`
        }`}
      >
        <div className="progress_bar-base">
          <svg
            viewBox="0 0 24 31"
            onClick={incrementProgress}
            className="counter-arrow up"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.4101 19.0529C13.1871 19.182 12.9406 19.182 12.7294 19.1116C12.5651 19.405 12.5533 19.6867 12.6707 20.0271C14.6776 23.1842 19.1023 23.5011 19.1023 23.5011C19.1023 23.5011 12.5064 22.8438 11.7552 30.8833C11.1332 23.2898 4.26737 23.4658 4.26737 23.4658C4.26737 23.4658 7.51837 23.4893 9.85393 21.1068C9.72483 21.0481 9.58399 20.9777 9.45489 20.8603C5.67574 17.5859 -2.37548 8.71309 0.676004 3.13827C3.6336 -2.27225 9.06759 1.56558 12.0487 5.02784C14.6189 1.51863 20.0412 -1.23944 22.5763 3.92461C25.17 9.25297 17.4005 16.7408 13.4101 19.0529ZM18.1399 5.91981C16.8489 3.52557 15.5931 3.53731 14.3255 5.96676C13.9148 6.61226 13.5744 7.28124 13.3162 7.99717C12.8937 8.95956 11.5557 8.72483 11.0628 7.99717C9.99477 6.37753 7.95262 2.96222 5.51143 3.26737C0.699478 3.8894 3.72749 8.92435 4.68988 10.6966C6.29778 13.6659 8.46903 16.1188 10.9806 18.3135C11.0745 18.3722 11.1684 18.4309 11.274 18.5013C11.6261 18.2783 12.0839 17.9614 12.3538 17.6563C12.5298 17.4568 12.5885 17.3981 12.6355 17.4216C14.8185 15.5907 16.7785 13.7011 18.3159 11.2364C18.6446 10.7318 18.938 10.1919 19.2079 9.65201C20.6398 8.04411 20.2877 6.80005 18.1634 5.93155L18.1399 5.91981Z"
              fill="white"
            />
          </svg>
          <div className="progress-counter">
            {Math.round(progress)}
            <span id="percentage">%</span>
          </div>
          <svg
            viewBox="0 0 24 31"
            onClick={decrementProgress}
            className="counter-arrow"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.4101 19.0529C13.1871 19.182 12.9406 19.182 12.7294 19.1116C12.5651 19.405 12.5533 19.6867 12.6707 20.0271C14.6776 23.1842 19.1023 23.5011 19.1023 23.5011C19.1023 23.5011 12.5064 22.8438 11.7552 30.8833C11.1332 23.2898 4.26737 23.4658 4.26737 23.4658C4.26737 23.4658 7.51837 23.4893 9.85393 21.1068C9.72483 21.0481 9.58399 20.9777 9.45489 20.8603C5.67574 17.5859 -2.37548 8.71309 0.676004 3.13827C3.6336 -2.27225 9.06759 1.56558 12.0487 5.02784C14.6189 1.51863 20.0412 -1.23944 22.5763 3.92461C25.17 9.25297 17.4005 16.7408 13.4101 19.0529ZM18.1399 5.91981C16.8489 3.52557 15.5931 3.53731 14.3255 5.96676C13.9148 6.61226 13.5744 7.28124 13.3162 7.99717C12.8937 8.95956 11.5557 8.72483 11.0628 7.99717C9.99477 6.37753 7.95262 2.96222 5.51143 3.26737C0.699478 3.8894 3.72749 8.92435 4.68988 10.6966C6.29778 13.6659 8.46903 16.1188 10.9806 18.3135C11.0745 18.3722 11.1684 18.4309 11.274 18.5013C11.6261 18.2783 12.0839 17.9614 12.3538 17.6563C12.5298 17.4568 12.5885 17.3981 12.6355 17.4216C14.8185 15.5907 16.7785 13.7011 18.3159 11.2364C18.6446 10.7318 18.938 10.1919 19.2079 9.65201C20.6398 8.04411 20.2877 6.80005 18.1634 5.93155L18.1399 5.91981Z"
              fill="white"
            />
          </svg>
        </div>

        <div
          className="progress_bar-container"
          ref={progressBarRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Ensures drag stops if mouse leaves the bar
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {Math.round(progress) < 1 ? (
            <p id="progress-label">Drag in this direction ➡️ </p>
          ) : (
            ""
          )}
          <div className="progress_bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
