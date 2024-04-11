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
    <StageContextProvider StageProps={props}>
      <span className="bg-gray-900 flex fixed w-full bottom-0">
        <div className="flex flex-row justify-around items-center w-full min-h-screen h-screen">
          <NavBarView></NavBarView>
          <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen">
            <EnemiesSection></EnemiesSection>
            <UserOverlay></UserOverlay>
            <PlayersSection></PlayersSection>
          </div>
        </div>
      </span>
    </StageContextProvider>
  );
};

export default StageView;
