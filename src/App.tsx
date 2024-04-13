import "./App.css";
import HomeView from "./views/home/HomeView";
import Menu from "./views/worlds/Menu";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import StageView from "./views/stage/views/StageView";
import { tutorialSet } from "./data/tutorial";
import Credits from "./views/credits/CreditsView";
import { AppContextProvider } from "./contexts/AppContextProvider";
import WorldSelection from "./views/home/world/WorldSelection";

function App() {
  return (
    <AppContextProvider>
      <div className="size-full min-w-max min-h-screen ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/World/:id" element={<WorldSelection />} />
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
    </AppContextProvider>
  );
}

export default App;
