/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
// import { useUIStore } from "../stores/UI_Store";
import { useGameStore } from "../stores/GameStore";
import { botAction } from "../stores/BotLogic";
import { restoreManaForEntities } from "../helpers/entity";

export function StageWatcher({ children }: { children: React.ReactNode }) {
  const {
    infoGame: {
      turn,
      availableActions,
      cycleRound,
      isGameStart,
      remainEnemiesCount,
      remainPlayersCount,
    },
    methodsGame: {
      switchTurn,
      increaseRound,
      resetCycleRound,
      updateCycleRound,
      endGame,
    },
    infoField: {
      playersFrontRow,
      playersBackRow,
      enemiesFrontRow,
      enemiesBackRow,
    },
    methodsField: { setEntities },
    infoMarkedEntities,
  } = useGameStore();
  // const uiLogic = useUIStore();

  function restoreManaEveryEntity() {
    setEntities({
      entities: restoreManaForEntities(playersFrontRow),
      isPlayer: true,
      site: "front",
    });
    setEntities({
      entities: restoreManaForEntities(enemiesFrontRow),
      isPlayer: false,
      site: "front",
    });
    if (playersBackRow && enemiesBackRow) {
      setEntities({
        entities: restoreManaForEntities(playersBackRow),
        isPlayer: true,
        site: "back",
      });
      setEntities({
        entities: restoreManaForEntities(enemiesBackRow),
        isPlayer: false,
        site: "back",
      });
    }
  }

  //update turn
  useEffect(() => {
    if (isGameStart) {
      setTimeout(() => {
        if (availableActions === 0 && turn) {
          switchTurn();
          updateCycleRound();
        }
      }, 2000);
      if (turn === "enemy" && isGameStart) {
        botAction({
          turn,
          availableActions,
          sourceEntities: enemiesFrontRow,
          targetEntities: playersFrontRow,
          entitiesTakenAction: infoMarkedEntities.takenAction,
        });
      }
    }
  }, [availableActions]);

  //update round
  useEffect(() => {
    if (cycleRound === 0) {
      increaseRound();
      restoreManaEveryEntity();
      resetCycleRound();
    }
  }, [cycleRound]);

  //update end game
  useEffect(() => {
    if (isGameStart) {
      if (remainEnemiesCount === 0) {
        endGame();
        alert("VICTORY");
      }
      if (remainPlayersCount === 0) {
        endGame();
        alert("DEFEAT");
      }
    }
  }, [remainEnemiesCount, remainPlayersCount]);

  return <>{children}</>;
}
