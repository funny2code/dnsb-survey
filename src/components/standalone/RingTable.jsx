import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRowIndex } from "../../store/elements";
import capitalizeWords from "../../utilities/capilizeWords";

export default function RingTable({
  onHandleItemSelect,
}) {
  const dispatch = useDispatch();
  const { choiceList } = useSelector((state) => state.entities.surveys);
  const { activeRow } = useSelector((state) => state.entities.elements);
  
  return choiceList.map((choice, rowIndex) => {
    return (
      <tr
        key={rowIndex}
        onClick={() => {
         dispatch(setActiveRowIndex(rowIndex)); // Store the clicked row index
          onHandleItemSelect(choice);
        }}
        className={activeRow.text === choice.text ? "active-row" : ""}
      >
        <td>
          {!choice.text.toLowerCase().startsWith("other") && (
            <div
              className="ring-checker"
              style={{
                background: choice.value > 0 ? choice.color : "white",
              }}
            ></div>
          )}
        </td>
        <td id="ring-list">{capitalizeWords(choice.text)}</td>
        {choice.text.toLowerCase() !== "others" && <td>{choice.value}</td>}
      </tr>
    );
  });
}
