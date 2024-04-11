import { Entity } from "../../../models/entity";
import NavBarView from "../components/NavBar";
import EnemiesSection from "../components/EnemiesSection";
import UserOverlay from "../components/UserOverlay";
import PlayersSection from "../components/PlayersSection";
import StageContextProvider from "../contexts/StageContextProvider";

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
        <NavBarView></NavBarView>
        <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen bg-slate-900">
          <EnemiesSection></EnemiesSection>
          <UserOverlay></UserOverlay>
          <PlayersSection></PlayersSection>
        </div>
      </StageContextProvider>
    </div>
  );
};

export default StageView;
