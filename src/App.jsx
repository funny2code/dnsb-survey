import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActiveMode from "./components/pages/ActiveMode";
import Preview from "./components/pages/Preview";
import WelcomePage from "./components/pages/WelcomePage";
import FinishPage from "./components/pages/FinishPage";
import Compare from "./components/pages/Compare";
import Exit from "./components/pages/ExitPage";
import Home from "./components/pages/Home";
import Introduction from "./components/composed/IntroductionPage";
import LearnMode from "./components/pages/LearnMode";
//import NotFound from "./components/pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/exit" element={<Exit />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/activemode" element={<ActiveMode />} />
        <Route path="/learnmode" element={<LearnMode />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
