import { Entity } from "../../../models/entity";
import NavBarView from "../components/NavBar";
import EnemiesSection from "../components/EnemiesSection";
import UserOverlay from "../components/UserOverlay";
import PlayersSection from "../components/PlayersSection";
import StageContextProvider from "../contexts/StageContextProvider";
import { StageWatcher } from "./StageWatcher";

interface Props {
  tutorial?: true;
  mapName: string;
  enemiesFrontRow: Entity[];
  enemiesBackRow?: Entity[];
  playersFrontRow: Entity[];
  playersBackRow?: Entity[];
}

const StageView = (props: Props) => {
  return (
    <div className="flex flex-row justify-around items-center w-full h-screen min-h-screen">
      <StageContextProvider StageProps={props}>
        <StageWatcher>
          <NavBarView></NavBarView>
          <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen bg-slate-900">
            <EnemiesSection></EnemiesSection>
            <UserOverlay></UserOverlay>
            <PlayersSection></PlayersSection>
          </div>
        </StageWatcher>
      </StageContextProvider>
    </div>
  );
};

export default StageView;
