import { Entity, EntityDetails } from "@/models/entity";
import { Skill } from "@/models/skills";
import { TurnType } from "@/models/turn";
import { create } from "zustand";
import { getAliveEntities, getSpeedOfTeam } from "../helpers/stage";
import {
  isEntityHasEnoughMana,
  getDamageMadeBy,
  getUpdatedManaFromUsed,
} from "../helpers/entity";

export interface GameLogicType {
  mapName: string;
  enemiesFrontRow: Entity[];
  enemiesBackRow?: Entity[];
  playersFrontRow: Entity[];
  playersBackRow?: Entity[];
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
  totalHitDamage: number;
  lastHitDamage: number;
  isGameStart: boolean;
  increaseAction: (n: number) => void;
  decreaseAction: (n: number) => void;
  switchTurn: () => void;
  resetEntitiesTakenAction: () => void;
  markEntityTakenAction: (e: Entity) => void;
  setSelectSkill: (s: Skill) => void;
  resetSelectSkill: () => void;
  setCurrentEntity: (e: EntityDetails) => void;
  resetCurrentEntity: () => void;
  setTargetEntity: (e: EntityDetails) => void;
  resetTargetEntity: () => void;
  usingSkillToTargetEntity: (props: {
    sourceEntities: Entity[];
    targetEntities: Entity[];
    isEnemyAction: boolean;
  }) => void;
}

const initialState: GameLogicType = {
  mapName: "",
  isGameStart: false,
  enemiesFrontRow: [],
  playersFrontRow: [],
  remainEnemiesCount: 0,
  remainPlayersCount: 0,
  currentEntityData: null,
  targetEntityData: null,
  selectedSkill: null,
  turn: null,
  availableActions: 0,
  maxActions: 0,
  roundCount: 0,
  speedEnemyTeam: 0,
  speedPlayerTeam: 0,
  entitiesTakenAction: [],
  totalHitDamage: 0,
  lastHitDamage: 0,

  switchTurn: function (): void {
    throw new Error("Function not implemented.");
  },
  resetEntitiesTakenAction: function (): void {
    throw new Error("Function not implemented.");
  },
  markEntityTakenAction: function (): void {
    throw new Error("Function not implemented.");
  },
  increaseAction: function (): void {
    throw new Error("Function not implemented.");
  },
  decreaseAction: function (): void {
    throw new Error("Function not implemented.");
  },
  setSelectSkill: function (): void {
    throw new Error("Function not implemented.");
  },
  resetSelectSkill: function (): void {
    throw new Error("Function not implemented.");
  },
  setCurrentEntity: function (): void {
    throw new Error("Function not implemented.");
  },
  resetCurrentEntity: function (): void {
    throw new Error("Function not implemented.");
  },
  setTargetEntity: function (): void {
    throw new Error("Function not implemented.");
  },
  resetTargetEntity: function (): void {
    throw new Error("Function not implemented.");
  },
  usingSkillToTargetEntity: function (): void {
    throw new Error("Function not implemented.");
  },
};

export const useGameStore = create<GameLogicType>((set) => ({
  ...initialState,
  increaseAction: (n: number) =>
    set((state) => ({
      availableActions: state.availableActions + n,
    })),
  decreaseAction: (n: number) =>
    set((state) => ({
      ...state,
      availableActions: state.availableActions - n,
    })),
  calculateRemainEntities: ({
    players,
    enemies,
  }: {
    players: Entity[];
    enemies: Entity[];
  }) =>
    set((state) => ({
      ...state,
      remainPlayersCount: getAliveEntities(players).length,
      remainEnemiesCount: getAliveEntities(enemies).length,
    })),
  switchTurn: () => {
    set((state) => {
      const newTurn: TurnType = state.turn === "enemy" ? "player" : "enemy";
      const entitiesCount: number =
        newTurn === "enemy"
          ? getAliveEntities(
              state.enemiesFrontRow.concat(state.enemiesBackRow ?? [])
            ).length
          : getAliveEntities(
              state.playersFrontRow.concat(state.playersBackRow ?? [])
            ).length;
      return {
        ...state,
        turn: newTurn,
        availableActions: entitiesCount,
        maxActions: entitiesCount,
        lastHitDamage: 0,
        totalHitDamage: 0,
      };
    });
  },
  resetEntitiesTakenAction: () =>
    set((state) => ({ ...state, entitiesTakenAction: [] })),
  markEntityTakenAction: (entity: Entity) =>
    set((state) => ({
      ...state,
      entitiesTakenAction: [...state.entitiesTakenAction, entity],
    })),
  getSetupStageDataBy: ({
    enemies,
    players,
  }: {
    enemies: Entity[];
    players: Entity[];
  }) => {
    const speedEnemiesTeam = getSpeedOfTeam(enemies);
    const speedPlayersTeam = getSpeedOfTeam(players);
    return getSpeedOfTeam(enemies) >= getSpeedOfTeam(players)
      ? {
          turn: "enemy" as TurnType,
          availableActions: enemies.length,
          maxActions: enemies.length,
          speedEnemiesTeam,
          speedPlayersTeam,
        }
      : {
          turn: "player" as TurnType,
          availableActions: players.length,
          maxActions: players.length,
          speedEnemiesTeam,
          speedPlayersTeam,
        };
  },
  setSelectSkill: (skill: Skill) => {
    set((prevState) => ({
      ...prevState,
      selectedSkill: { ...skill },
    }));
  },
  resetSelectSkill: () => {
    set((prevState) => ({
      ...prevState,
      selectedSkill: null,
    }));
  },
  setCurrentEntity: (entity: EntityDetails) => {
    set((prevState) => ({
      ...prevState,
      currentEntityData: { ...entity },
    }));
  },
  resetCurrentEntity: () => {
    set((prevState) => ({
      ...prevState,
      currentEntityData: null,
    }));
  },
  setTargetEntity: (entity: EntityDetails) => {
    set((prevState) => ({
      ...prevState,
      targetEntityData: { ...entity },
    }));
  },
  resetTargetEntity: () => {
    set((prevState) => ({
      ...prevState,
      targetEntityData: null,
    }));
  },
  usingSkillToTargetEntity: (prop: {
    sourceEntities: Entity[];
    targetEntities: Entity[];
    isEnemyAction: boolean;
  }) => {
    set((state) => {
      const { sourceEntities, targetEntities, isEnemyAction } = prop;
      const skill = state.selectedSkill;
      const sourceEntityData = state.currentEntityData;
      const targetEntityData = state.targetEntityData;

      if (skill && sourceEntityData && targetEntityData) {
        if (
          isEntityHasEnoughMana({
            entity: sourceEntityData.entity,
            skill: skill,
          })
        ) {
          if (skill.isAttackSkill) {
            const damageMade = getDamageMadeBy({
              entity: sourceEntityData.entity,
              skill,
            });
            const newTargetEntityData = { ...targetEntityData };
            newTargetEntityData.entity.healthPower -= damageMade;

            //update target data
            const newTargetFrontRow = [...targetEntities];
            newTargetFrontRow[targetEntityData.position] =
              newTargetEntityData.entity;

            //update source mana/energy
            const newSourceFrontRow = [...sourceEntities];
            newSourceFrontRow[sourceEntityData.position] =
              getUpdatedManaFromUsed({
                entity: sourceEntityData.entity,
                skill,
              });

            //update calculated result
            return {
              ...state,
              totalHitDamage: state.totalHitDamage + damageMade,
              lastHitDamage: damageMade,
              playersFrontRow: isEnemyAction
                ? [...newTargetFrontRow]
                : [...newSourceFrontRow],
              enemiesFrontRow: isEnemyAction
                ? [...newSourceFrontRow]
                : [...newTargetFrontRow],
              targetEntityData: { ...newTargetEntityData },
            };
          }
        } else {
          alert("not enough MP/EP");
        }
      }
      return { ...state };
    });
  },
}));
