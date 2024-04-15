/* eslint-disable react-hooks/exhaustive-deps */
import { Entity } from "../../../classes/entity";
import NavBarView from "../components/UI/NavBar";
import EnemiesSection from "../components/Field/EnemiesSection";
import UserOverlay from "../components/UI/UserOverlay";
import PlayersSection from "../components/Field/PlayersSection";
import { StageWatcher } from "./StageWatcher";
import { useGameStore } from "../stores/GameStore";
import { useEffect } from "react";
import LoadingView from "@/views/loading/LoadingView";
import { useLoaderStore } from "@/views/loading/stores/loadingStore";

interface Props {
  tutorial?: true;
  mapName: string;
  enemiesFrontRow: Entity[];
  enemiesBackRow?: Entity[];
  playersFrontRow: Entity[];
  playersBackRow?: Entity[];
}

const StageView = (props: Props) => {
  const { isLoading } = useLoaderStore();
  const {
    methodsGame: { setupGame },
  } = useGameStore();
  useEffect(() => {
    setupGame(props);
  }, []);

  return (
    <div className="flex flex-row justify-around items-center h-screen min-h-screen overflow-hidden">
      {isLoading && <LoadingView title={props.mapName}></LoadingView>}
      <StageWatcher>
        <NavBarView></NavBarView>
        <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen mx-6">
          <img
            src="src/assets/images/maps/Astralis_city.jpeg"
            className="-z-50 absolute left-0 top-0 w-full h-full object-fill blur-md"
          />
          <EnemiesSection></EnemiesSection>
          <UserOverlay></UserOverlay>
          <PlayersSection></PlayersSection>
        </div>
      </StageWatcher>
    </div>
  );
};

export default StageView;
