import { useContext, useEffect, useState } from "react";
import { useStageContext } from "../contexts/useStageContext";
import { useBotContext } from "../contexts/useBotContext";
import { StageContext } from "../contexts/StageContextProvider";
import { useUIStore } from "../stores/UI_Store";

export function StageWatcher({ children }: { children: React.ReactNode }) {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error("StageWatcher must be used within an StageContextProvider");
  }
  const [state] = useState(context);
  const { switchTurn, calculateRemainEntities } = useStageContext();
  const { botAction } = useBotContext();
  const UIStore = useUIStore();

  useEffect(() => {
    setTimeout(() => {
      switchTurn(state.turn, state.availableActions);
      calculateRemainEntities({
        players: state.playersFrontRow.concat(state.playersBackRow ?? []),
        enemies: state.enemiesFrontRow.concat(state.enemiesBackRow ?? []),
      });
    }, 2000);
  }, [state.availableActions]);

  useEffect(() => {
    if (state.turn === "enemy" && state.isGameStart) {
      botAction({
        turn: state.turn,
        availableActions: state.availableActions,
        sourceEntities: state.enemiesFrontRow,
        entitiesTakenAction: state.entitiesTakenAction,
      });
    }
  }, [state.availableActions]);

  useEffect(() => {
    if (state.isGameStart) {
      if (state.remainEnemiesCount === 0) {
        alert("VICTORY");
      }
      if (state.remainPlayersCount === 0) {
        alert("DEFEAT");
      }
    }
  }, [state.isGameStart]);
  return <>{children}</>;
}
