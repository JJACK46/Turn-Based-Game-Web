import { useStageContext } from "../contexts/useStageContext";
import { useEntityContext } from "../contexts/useEntityContext";
import { useGameContext } from "../contexts/useGameContext";
import { useState } from "react";
import { Entity, EntityDetails } from "@/models/entity";
import { Skill } from "@/models/skills";
import { TurnType } from "../contexts/StageContextProvider";

export function useSharedState() {
  const stageContext = useStageContext();
  const entityContext = useEntityContext();
  const gameContext = useGameContext();

  const [sharedState, setSharedState] = useState({
    stage: stageContext,
    entity: entityContext,
    game: gameContext,
  });

  const updateSharedState = (newState: {
    stage: {
      increaseAction: (n: number) => void;
      decreaseAction: (n: number) => void;
      calculateRemainEntities: ({
        players,
        enemies,
      }: {
        players: Entity[];
        enemies: Entity[];
      }) => void;
      calculateAvailableActions: (turn: TurnType) => void;
      switchTurn: (turn: TurnType, availableActions: number) => void;
      isEntityTakenAction: (entity: Entity) => boolean;
      getLastEntitiesTakenAction: () => Entity;
      markEntityTakenAction: (entity: Entity) => void;
      getSetupStageDataBy: ({
        enemies,
        players,
      }: {
        enemies: Entity[];
        players: Entity[];
      }) => {
        turn: TurnType;
        availableActions: number;
        maxActions: number;
        speedEnemiesTeam: number;
        speedPlayersTeam: number;
      };
      mapName: string;
      enemiesFrontRow: Entity[];
      enemiesBackRow?: Entity[] | undefined;
      playersFrontRow: Entity[];
      playersBackRow?: Entity[] | undefined;
      remainEnemiesCount: number;
      remainPlayersCount: number;
      currentEntityData: EntityDetails | null;
      targetEntityData: EntityDetails | null;
      selectedSkill: Skill | null;
      turn: TurnType;
      availableActions: number;
      maxActions: number;
      roundCount: number;
      speedEnemyTeam: number;
      speedPlayerTeam: number;
      entitiesTakenAction: Entity[];
      userOverlay: {
        isActionOverlayOpen: boolean;
        isStageOverlayOpen: boolean;
        isInfoOverlayOpen: boolean;
        isTurnWarning: boolean;
        isActionWarning: boolean;
      };
      totalHitDamage: number;
      lastHitDamage: number;
      isGameStart: boolean;
    };
    entity: {
      setSelectSkill: (skill: Skill) => void;
      resetSelectSkill: () => void;
      setCurrentEntity: (entity: EntityDetails) => void;
      resetCurrentEntity: () => void;
      setTargetEntity: (entity: EntityDetails) => void;
      resetTargetEntity: () => void;
      usingSkillToTargetEntity: (prop: {
        sourceEntityData: EntityDetails;
        targetEntityData: EntityDetails;
        sourceEntities: Entity[];
        targetEntities: Entity[];
        skill: Skill;
        isEnemyAction: boolean;
      }) => boolean;
      mapName: string;
      enemiesFrontRow: Entity[];
      enemiesBackRow?: Entity[] | undefined;
      playersFrontRow: Entity[];
      playersBackRow?: Entity[] | undefined;
      remainEnemiesCount: number;
      remainPlayersCount: number;
      currentEntityData: EntityDetails | null;
      targetEntityData: EntityDetails | null;
      selectedSkill: Skill | null;
      turn: TurnType;
      availableActions: number;
      maxActions: number;
      roundCount: number;
      speedEnemyTeam: number;
      speedPlayerTeam: number;
      entitiesTakenAction: Entity[];
      userOverlay: {
        isActionOverlayOpen: boolean;
        isStageOverlayOpen: boolean;
        isInfoOverlayOpen: boolean;
        isTurnWarning: boolean;
        isActionWarning: boolean;
      };
      totalHitDamage: number;
      lastHitDamage: number;
      isGameStart: boolean;
    };
    game: {
      startGame: () => void;
      endGame: () => void;
      openInfoOverlay: () => void;
      openActionOverlay: () => void;
      closeActionOverlay: () => void;
      closeInfoOverlay: () => void;
      setActionWarning: (input: boolean) => void;
      setTurnWarning: (input: boolean) => void;
      mapName: string;
      enemiesFrontRow: Entity[];
      enemiesBackRow?: Entity[] | undefined;
      playersFrontRow: Entity[];
      playersBackRow?: Entity[] | undefined;
      remainEnemiesCount: number;
      remainPlayersCount: number;
      currentEntityData: EntityDetails | null;
      targetEntityData: EntityDetails | null;
      selectedSkill: Skill | null;
      turn: TurnType;
      availableActions: number;
      maxActions: number;
      roundCount: number;
      speedEnemyTeam: number;
      speedPlayerTeam: number;
      entitiesTakenAction: Entity[];
      userOverlay: {
        isActionOverlayOpen: boolean;
        isStageOverlayOpen: boolean;
        isInfoOverlayOpen: boolean;
        isTurnWarning: boolean;
        isActionWarning: boolean;
      };
      totalHitDamage: number;
      lastHitDamage: number;
      isGameStart: boolean;
    };
  }) => {
    setSharedState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return { sharedState, updateSharedState };
}
