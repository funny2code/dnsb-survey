import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cue from "../Cue";
import Copyright from "../standalone/Copyright";

function Exit({ redirect }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirect || "/";
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, redirect]);

  return (
    <main className="main-container">
      <Cue className={"question"}>
        <p>
          We are sorry to see you go, but<span> "Goodbye"</span>
        </p>
      </Cue>
      <Copyright/>
    </main>
  );
}

export default Exit;
