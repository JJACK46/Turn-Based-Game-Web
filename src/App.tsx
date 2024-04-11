import "./App.css";
import HomeView from "./views/home/HomeView";
import Menu from "./views/menu/Menu";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import StageView from "./views/stage/views/StageView";
import { tutorialSet } from "./data/tutorial";
import Credits from "./views/credits/CreditsView";

function App() {
  return (
    <div className="size-full min-w-max min-h-screen ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/tutorial"
            element={
              <StageView
                tutorial
                mapName="Tutorial"
                enemiesFrontRow={tutorialSet.enemies}
                playersFrontRow={tutorialSet.players}
              />
            }
          />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
