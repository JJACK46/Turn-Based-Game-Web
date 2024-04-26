import "./App.css";
import HomeView from "./views/home/HomeView";
import WorldSelection from "./views/worlds/views/WorldSelection";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import StageView from "./views/stage/views/StageView";
import Credits from "./views/credits/CreditsView";
import MapSelection from "./views/worlds/views/MapSelection";
import { useWorldStore } from "./views/worlds/store/worldStore";
import TeamSetup from "./views/teamsetup/view/TeamSetup";
import { CodexView } from "./views/codex/views/CodexView";
import { TestUI } from "./views/home/components/Test";
import { EntitiesData } from "./data/models/entities";
import { TutorialMap } from "./data/worlds/tutorial/data";
import { MenuView } from "./views/menu/views/MenuView";
import { useUserStore } from "./global/userStore";

function App() {
  const { selectedMap } = useWorldStore();
  const debug = EntitiesData.find((ent) => ent.id === 2024);
  const tutorialPlayer = [EntitiesData[10], EntitiesData[8], debug!];
  const user = useUserStore()

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
                mapData={TutorialMap}
                playersFrontRow={tutorialPlayer}
              />
            }
          />
          <Route
            path="/stage"
            element={
              <StageView
                mapData={selectedMap}
                playersFrontRow={user.troops}
              />
            }
          />
          <Route path="/credits" element={<Credits />} />
          <Route path="/menu" element={<MenuView />} />
          <Route path="/codex" element={<CodexView />} />
          <Route path="/team-setup" element={<TeamSetup />}></Route>
          <Route path="/test-ui" element={<TestUI />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
