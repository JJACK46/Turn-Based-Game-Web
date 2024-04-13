/* eslint-disable react-hooks/exhaustive-deps */
import { Entity } from "../../../classes/entity";
import NavBarView from "../components/UI/NavBar";
import EnemiesSection from "../components/Field/EnemiesSection";
import UserOverlay from "../components/UI/UserOverlay";
import PlayersSection from "../components/Field/PlayersSection";
import { StageWatcher } from "./StageWatcher";
import { useGameStore } from "../stores/GameStore";
import { useEffect } from "react";

interface Props {
  tutorial?: true;
  mapName: string;
  enemiesFrontRow: Entity[];
  enemiesBackRow?: Entity[];
  playersFrontRow: Entity[];
  playersBackRow?: Entity[];
}

const StageView = (props: Props) => {
  const {
    methodsGame: { setupGame },
  } = useGameStore();
  useEffect(() => {
    setupGame(props);
  }, []);

  return (
    <div className="flex flex-row justify-around items-center w-full h-screen min-h-screen">
      <StageWatcher>
        <NavBarView></NavBarView>
        <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen bg-slate-900">
          <EnemiesSection></EnemiesSection>
          <UserOverlay></UserOverlay>
          <PlayersSection></PlayersSection>
        </div>
      </StageWatcher>
    </div>
  );
};

export default StageView;
