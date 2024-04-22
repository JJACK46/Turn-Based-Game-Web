/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGameStore } from "../stores/gameStore";
import { botAction } from "../stores/BotLogic";
import { restoreManaForEntities } from "../helpers/entity";
import { updateRemainingEffect } from "../helpers/stage";
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
    infoField: { players, enemies },
    methodsField: { setEntities },
    infoIndicator: { selectedSkill, currentEntity },
    infoMarkedEntities,
  } = useGameStore();
  const { selectedMap } = useWorldStore();

  function restoreManaEveryEntity() {
    setEntities({
      entities: restoreManaForEntities(players),
      isPlayer: true,
    });
    setEntities({
      entities: restoreManaForEntities(enemies),
      isPlayer: false,
    });
  }
  function updateAllRemainingEffect() {
    setEntities({
      entities: updateRemainingEffect(players),
      isPlayer: true,
    });
    setEntities({
      entities: updateRemainingEffect(enemies),
      isPlayer: false,
    });
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
          sourceEntities: enemies,
          targetEntities: players,
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
