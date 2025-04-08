import React from "react";
import MediaComponent from "../standalone/MediaComponent";
import MediaCard from "../composed/MediaCard";
import { useNavigate } from "react-router-dom";
import Copyright from "../standalone/Copyright";
import "../../css/Introduction.css";

const Introduction = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const goHome = () => {
    navigate("/");
  };
  const exit = () => {
    navigate("/");
  };

  return (
    <div className="introduction">
      <div className="media-card-group">
        <MediaCard
          heading="Research Libs Introduction"
          style={{ background: "linear-gradient(to right, #ff9a8b, #fecfef)" }}
        >
          {
            <MediaComponent
              content={`Research Libs turns data collection into a storytelling journey. By allowing respondents to craft narratives, this innovative tool unlocks deeper insights and builds a richer understanding of your audience. Research Libs is about breaking away from traditional survey methods to engage respondents in ways that are fun, meaningful, and impactful. Let's look at how Research Libs makes your surveys stand out while delivering the insights you need to make informed decisions.`}
            />
          }
        </MediaCard>
        <MediaCard
          heading="Research Libs Benefits"
          style={{ background: "linear-gradient(to right, #a1c4fd, #c2e9fb)" }}
        >
          {
            <MediaComponent
              title="Encourages Engagement:"
              content={`Turns traditional surveys into interactive storytelling experiences, keeping respondents more invested.`}
            />
          }
          {
            <MediaComponent
              title="Delivers Deeper Insights:"
              content={`Narrative responses reveal richer context and motivations behind answers.`}
            />
          }
          {
            <MediaComponent
              title="Builds Respondent Affinity:"
              content={`By making the process enjoyable, Research Libs fosters a positive connection between respondents and the research process.`}
            />
          }
        </MediaCard>
      </div>
      <div className="media-card-group">
        <MediaCard
          heading="Research Libs Results"
          style={{ background: "linear-gradient(to right, #fbc2eb, #a6c1ee)" }}
        >
          {
            <MediaComponent
              title="More Meaningful Data:"
              content={`Turns traditional surveys into interactive storytelling experiences, keeping respondents more invested.`}
            />
          }
          {
            <MediaComponent
              title="Stronger Connections:"
              content={`Respondents feel heard and valued, creating a better foundation for ongoing participation.`}
            />
          }
          {
            <MediaComponent
              title="Reduced Risk:"
              content={`
                   Eliminates questionable responses that could
                  skew results, helping to mitigate decision-making errors.
                  Cubicon Information Page If you have any more images you want
                  me to transcribe, please feel free to share them.`}
            />
          }
        </MediaCard>

        <MediaCard
          heading="Research Libs Next Steps"
          style={{ background: "linear-gradient(to right, #fdcbf1, #e6dee9)" }}
        >
          {
            <MediaComponent
              title="Design Narrative Surveys:"
              content={`Incorporate storytelling elements into your surveys to foster respondent engagement.`}
            />
          }
          {
            <MediaComponent
              title="Test and Refine:"
              content={` Pilot Research Libs surveys with small groups and adjust based on respondent feedback.`}
            />
          }
          {
            <MediaComponent
              title="Analyze Stories for Patterns:"
              content={`Use narrative responses to identify trends, motivations, and opportunities that traditional surveys might miss.`}
            />
          }
        </MediaCard>
        
      </div>

      <div className="intro-button-group">
        <button
          className="intro-btn intro-btn-primary"
          onClick={goHome}
        >
          Back
        </button>
        <button
          className="intro-btn intro-btn-secondary"
          onClick={exit}
        >
          Exit
        </button>
        <div className="intro-logo-container">
          <img src={`${import.meta.env.BASE_URL}/assets/Logo.svg`} alt="" className="intro-logo" />
        </div>
      </div>
      <Copyright color={"white"} />
    </div>
  );
};

export default Introduction;
