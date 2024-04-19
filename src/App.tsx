import "./App.css";
import HomeView from "./views/home/HomeView";
import WorldSelection from "./views/worlds/views/WorldSelection";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import StageView from "./views/stage/views/StageView";
import { tutorialSet } from "./data/tutorial";
import Credits from "./views/credits/CreditsView";
import MapSelection from "./views/worlds/views/MapSelection";
import { useWorldStore } from "./views/worlds/store/worldStore";
import TeamSetup from "./views/teamsetup/view/TeamSetup";
import { MenuView } from "./views/menu/views/MenuView";
import { CodexView } from "./views/codex/views/CodexView";

function App() {
  const { selectedMap } = useWorldStore();
  const { name, enemyFrontRow, enemyBackRow, backgroundUrl } = selectedMap;

  return (
    <div className="size-full min-w-max min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/worlds" element={<WorldSelection />} />
          <Route path="/worlds/:name" element={<MapSelection />} />
          <Route
            path="/tutorial"
            element={
              <StageView
                mapName={"Tutorial"}
                enemiesFrontRow={tutorialSet.enemies}
                playersFrontRow={tutorialSet.players}
              />
            }
          />
          <Route
            path="/stage"
            element={
              <StageView
                mapName={name}
                enemiesFrontRow={enemyFrontRow}
                enemiesBackRow={enemyBackRow}
                playersFrontRow={tutorialSet.players}
                backgroundUrl={backgroundUrl}
              />
            }
          />
          <Route path="/credits" element={<Credits />} />
          <Route path="/teamSetup" element={<TeamSetup />} />
          <Route path="/menu" element={<MenuView />} />
          <Route path="/codex" element={<CodexView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
