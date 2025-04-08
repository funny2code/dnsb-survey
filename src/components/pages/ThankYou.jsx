import Copyright from "../standalone/Copyright";
import Cue from "./Cue";

function ThankYou() {
  return (
    <main className="main-container">
      <Cue className={"question"}>
        <p>Thank you for telling us your story</p>
      </Cue>
      <Copyright/>
    </main>
  );
}

export default ThankYou;
