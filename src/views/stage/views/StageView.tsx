/* eslint-disable react-hooks/exhaustive-deps */
import { Entity } from "../../../classes/entity";
import NavBarView from "../components/UI/NavBar";
import EnemiesSection from "../components/Field/EnemiesSection";
import UserOverlay from "../components/UI/UserOverlay";
import PlayersSection from "../components/Field/PlayersSection";
import { StageWatcher } from "./StageWatcher";
import { useEffect } from "react";
import LoadingView from "@/views/loading/LoadingView";
import { useLoaderStore } from "@/views/loading/stores/loadingStore";
import { useGameStore } from "../stores/gameStore";

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
    <span className="flex flex-row justify-around items-center h-screen min-h-screen overflow-hidden">
      {isLoading && <LoadingView title={props.mapName}></LoadingView>}
      <StageWatcher>
        <NavBarView></NavBarView>
        <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen mx-6">
          <div className="-z-[100] absolute inset-0">
            <div
              className="absolute left-[25%] top-[39%] w-[1024px] h-64 bg-gradient-to-r 
            from-indigo-500 via-purple-500 to-orange-500 blur-[100px]"
            ></div>
          </div>
          <EnemiesSection></EnemiesSection>
          <UserOverlay></UserOverlay>
          <PlayersSection></PlayersSection>
        </div>
      </StageWatcher>
    </span>
  );
};

export default StageView;
