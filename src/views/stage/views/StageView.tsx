/* eslint-disable react-hooks/exhaustive-deps */
import NavBarView from "../components/UI/NavBar";
import EnemiesSection from "../components/Field/EnemiesSection";
import UserOverlay from "../components/UI/UserOverlay/UserOverlay";
import PlayersSection from "../components/Field/PlayersSection";
import { StageWatcher } from "./StageWatcher";
import { useEffect } from "react";
import LoadingView from "@/views/loading/LoadingView";
import { useLoaderStore } from "@/views/loading/stores/loadingStore";
import { useGameStore } from "../stores/gameStore";
import { Entity } from "@/classes/entity";
import { MapData } from "@/data/worlds/types/map";

interface Props {
  mapData: MapData;
  playersFrontRow: Entity[];
  playersBackRow?: Entity[];
}

const StageView = ({
  mapData: {
    name,
    enemiesFrontRow,
    enemiesBackRow,
    entitiesLevel,
    backgroundUrl,
  },
  playersFrontRow,
  playersBackRow,
}: Props) => {
  const { isLoading } = useLoaderStore();
  const {
    methodsGame: { setupGame },
  } = useGameStore();
  useEffect(() => {
    setupGame({
      mapName: name,
      enemiesFrontRow,
      enemiesBackRow,
      playersFrontRow,
      playersBackRow,
      entitiesLevel,
    });
  }, []);

  return (
    <span className="flex flex-row justify-around items-center h-screen min-h-screen overflow-hidden">
      {isLoading && <LoadingView title={name}></LoadingView>}
      <StageWatcher>
        <NavBarView></NavBarView>
        <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen mx-6">
          {backgroundUrl && (
            <img
              src={backgroundUrl}
              className="-z-[100] absolute inset-0 w-full h-screen blur"
            />
          )}
          {!backgroundUrl && (
            <div className="-z-[100] absolute inset-0 w-full h-full">
              <div
                className="absolute left-[20%] top-[35%] w-[1024px] h-64 bg-gradient-to-r 
            from-indigo-500 via-purple-500 to-orange-500 blur-[100px]"
              ></div>
            </div>
          )}
          <EnemiesSection></EnemiesSection>
          <UserOverlay></UserOverlay>
          <PlayersSection></PlayersSection>
        </div>
      </StageWatcher>
    </span>
  );
};

export default StageView;
