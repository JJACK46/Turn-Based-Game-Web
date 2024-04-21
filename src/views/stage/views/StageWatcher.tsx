/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
// import { useUIStore } from "../stores/UI_Store";
import { useGameStore } from "../stores/gameStore";
import { botAction } from "../stores/BotLogic";
import { restoreManaForEntities } from "../helpers/entity";
import { updateRemainingEffect } from "../helpers/stage";
import { PositionEnum } from "@/data/enums/positions";
import { SoundtrackPlayer } from "@/utils/SoundtrackPlayer";
import { useWorldStore } from "@/views/worlds/store/worldStore";
import { SFXPlayer } from "@/utils/SFXPlayer";

export function StageWatcher({ children }: { children: React.ReactNode }) {
  const {
    infoGame: {
      turn,
      availableActions,
      cycleRound,
      isGameStart,
      remainEnemiesCount,
      remainPlayersCount,
      roundCount,
    },
    methodsGame: {
      switchTurn,
      increaseRound,
      resetCycleRound,
      updateCycleRound,
      endGame,
      setGameResult,
      updateRemainingEntities,
    },
    infoField: {
      playersFrontRow,
      playersBackRow,
      enemiesFrontRow,
      enemiesBackRow,
    },
    methodsField: { setEntities },
    infoIndicator: { selectedSkill, currentEntity },
    infoMarkedEntities,
  } = useGameStore();
  const { selectedMap } = useWorldStore();
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
  function updateAllRemainingEffect() {
    setEntities({
      entities: updateRemainingEffect(playersFrontRow),
      isPlayer: true,
      position: PositionEnum.FRONT,
    });
    setEntities({
      entities: updateRemainingEffect(enemiesFrontRow),
      isPlayer: false,
      position: PositionEnum.FRONT,
    });
    if (playersBackRow && enemiesBackRow) {
      setEntities({
        entities: updateRemainingEffect(playersBackRow),
        isPlayer: true,
        position: PositionEnum.BACK,
      });
      setEntities({
        entities: updateRemainingEffect(enemiesBackRow),
        isPlayer: false,
        position: PositionEnum.BACK,
      });
    }
  }

  //update turn
  useEffect(() => {
    if (isGameStart) {
      setTimeout(() => {
        if (availableActions === 0) {
          switchTurn();
          updateCycleRound();
        }
      }, 2000);
      if (turn === "enemy") {
        botAction({
          turn,
          availableActions,
          sourceEntities: enemiesFrontRow,
          targetEntities: playersFrontRow,
          entitiesTakenAction: infoMarkedEntities.takenAction,
        });
      }
    }
  }, [availableActions, isGameStart, turn]);

  useEffect(() => {
    updateRemainingEntities();
  }, [availableActions, turn, roundCount]);

  //update round
  useEffect(() => {
    if (cycleRound === 0) {
      increaseRound();
      updateAllRemainingEffect();
      restoreManaEveryEntity();
      resetCycleRound();
    }
  }, [cycleRound, availableActions]);

  //update end game
  useEffect(() => {
    if (isGameStart) {
      if (remainEnemiesCount === 0) {
        endGame();
        setGameResult("victory");
      }
      if (remainPlayersCount === 0) {
        endGame();
        setGameResult("defeat");
      }
    }
  }, [remainEnemiesCount, remainPlayersCount]);

  return (
    <>
      {selectedMap.soundtrackPath ? (
        <SoundtrackPlayer soundFilePath={selectedMap.soundtrackPath} />
      ) : null}
      {children}
      {selectedSkill?.soundPath ? (
        <SFXPlayer soundFilePath={selectedSkill.soundPath} />
      ) : null}
      {currentEntity?.selectedSoundPath ? (
        <SFXPlayer soundFilePath={currentEntity.selectedSoundPath} />
      ) : null}
    </>
  );
}
