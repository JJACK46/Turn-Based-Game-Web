/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
// import { useUIStore } from "../stores/UI_Store";
import { useGameStore } from "../stores/gameStore";
import { botAction } from "../stores/BotLogic";
import { restoreManaForEntities } from "../helpers/entity";
import { updateRemainingActive } from "../helpers/stage";
import { PositionEnum } from "@/data/enums/positions";

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

  // const allEntities = playersFrontRow.concat(
  //   playersBackRow ?? [],
  //   enemiesFrontRow,
  //   enemiesBackRow ?? []
  // );

  function restoreManaEveryEntity() {
    setEntities({
      entities: restoreManaForEntities(playersFrontRow),
      isPlayer: true,
      position: PositionEnum.FRONT,
    });
    setEntities({
      entities: restoreManaForEntities(enemiesFrontRow),
      isPlayer: false,
      position: PositionEnum.FRONT,
    });
    if (playersBackRow && enemiesBackRow) {
      setEntities({
        entities: restoreManaForEntities(playersBackRow),
        isPlayer: true,
        position: PositionEnum.BACK,
      });
      setEntities({
        entities: restoreManaForEntities(enemiesBackRow),
        isPlayer: false,
        position: PositionEnum.BACK,
      });
    }
  }
  function updateRemainingActiveAll() {
    setEntities({
      entities: updateRemainingActive(playersFrontRow),
      isPlayer: true,
      position: PositionEnum.FRONT,
    });
    setEntities({
      entities: updateRemainingActive(enemiesFrontRow),
      isPlayer: false,
      position: PositionEnum.FRONT,
    });
    if (playersBackRow && enemiesBackRow) {
      setEntities({
        entities: updateRemainingActive(playersBackRow),
        isPlayer: true,
        position: PositionEnum.BACK,
      });
      setEntities({
        entities: updateRemainingActive(enemiesBackRow),
        isPlayer: false,
        position: PositionEnum.BACK,
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
  }, [availableActions, isGameStart]);

  //update round
  useEffect(() => {
    if (cycleRound === 0) {
      increaseRound();
      restoreManaEveryEntity();
      updateRemainingActiveAll();
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
