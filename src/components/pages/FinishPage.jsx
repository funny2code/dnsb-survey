import React from "react";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import exitProgram from "../../utilities/exitProgram";
import Cue from "../Cue";
import Teleprompter from "../standalone/Teleprompter";
import Button from "../Button";
import Copyright from "../standalone/Copyright";

import "../../css/FinishPage.css";

function FinishPage() {
  const { story } = useSelector((state) => state.entities.responses);
  const { redirect } = useSelector((state) => state.entities.surveys.lastFetch);
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pulished = story.replace(/<mark>/g, "").replace(/<\/mark>/g, "");

    const pageWidth = doc.internal.pageSize.getWidth() - 20; // Adjust for margins
    const wrappedText = doc.splitTextToSize(pulished, pageWidth);
    doc.text(wrappedText, 10, 10);
    doc.save("story.pdf");
  };

  const handleExit = () => {
    exitProgram();
    window.location.href =
      redirect ||
      "http://bizpinion.com/endlink2.php?t=n&sr=5qmqQ1n9wQEvzWai6&id=EOL4313d3f5-tester1743758230.2072";
  };

  return (
    <main className="main-container">
      <section className="main-section">
        <Cue className={"story"}>
          <Teleprompter
            story={`Thank you for telling your story. You can now print or download your finished story or EXIT.`}
          >
            {/* <div dangerouslySetInnerHTML={{ __html: storeStory }} /> */}
          </Teleprompter>
        </Cue>
        <div className="finish-buttons">
          <Button
            onClick={handleDownloadPDF}
            label="PDF IT"
            className={`bottom_button primary`}
          />
          <Button
            onClick={handleExit}
            label="EXIT"
            className={`bottom_button primary`}
          />
        </div>
      </section>
      <Copyright />
    </main>
  );
}

export default FinishPage;
