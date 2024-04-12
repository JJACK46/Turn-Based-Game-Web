import { Entity, EntityDetails, Site } from "@/classes/entity";
import { Skill } from "@/classes/skills";
import { TurnType } from "@/classes/turn";
import { create } from "zustand";
import { getAliveEntities, getSpeedOfTeam } from "../helpers/stage";
import {
  isEntityHasEnoughMana,
  getDamageMadeBy,
  getUpdatedManaFromUsed,
} from "../helpers/entity";

interface GameLogicType {
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
  cycleRound: number;
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
    skill: Skill;
    sourceEntityData: EntityDetails;
    targetEntityData: EntityDetails;
    sourceEntities: Entity[];
    targetEntities: Entity[];
    isEnemyAction: boolean;
  }) => boolean;
  startGame: () => void;
  endGame: () => void;
  setupGame: (props: {
    mapName: string;
    enemiesFrontRow: Entity[];
    enemiesBackRow?: Entity[];
    playersFrontRow: Entity[];
    playersBackRow?: Entity[];
  }) => void;
  setEntities: (props: {
    entities: Entity[];
    isPlayer: boolean;
    site: Site;
  }) => void;
  increaseRound: () => void;
  updateCycleRound: () => void;
  resetCycleRound: () => void;
}

export const useGameStore = create<GameLogicType>((set) => ({
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
  availableActions: -1,
  maxActions: 0,
  roundCount: 1,
  speedEnemyTeam: 0,
  speedPlayerTeam: 0,
  entitiesTakenAction: [],
  totalHitDamage: 0,
  lastHitDamage: 0,
  cycleRound: 2,
  setupGame: (props: {
    mapName: string;
    enemiesFrontRow: Entity[];
    enemiesBackRow?: Entity[];
    playersFrontRow: Entity[];
    playersBackRow?: Entity[];
  }) =>
    set((state) => {
      const enemies = props.enemiesFrontRow.concat(props.enemiesBackRow ?? []);
      const players = props.playersFrontRow.concat(props.playersBackRow ?? []);
      const speedEnemyTeam = getSpeedOfTeam(enemies);
      const speedPlayerTeam = getSpeedOfTeam(players);
      const remainEnemiesCount = getAliveEntities(
        state.enemiesFrontRow.concat(state.enemiesBackRow ?? [])
      ).length;
      const remainPlayersCount = getAliveEntities(
        state.playersFrontRow.concat(state.playersBackRow ?? [])
      ).length;
      const turn: TurnType =
        getSpeedOfTeam(enemies) >= getSpeedOfTeam(players) ? "enemy" : "player";
      const availableActions =
        turn === "enemy" ? enemies.length : players.length;
      return {
        ...state,
        ...props,
        speedEnemyTeam,
        speedPlayerTeam,
        availableActions,
        maxActions: availableActions,
        remainEnemiesCount,
        remainPlayersCount,
        turn,
      };
    }),
  startGame: () => set((state) => ({ ...state, isGameStart: true })),
  endGame: () => set((state) => ({ ...state, isGameStart: false })),
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
      const remainEnemiesCount = getAliveEntities(
        state.enemiesFrontRow.concat(state.enemiesBackRow ?? [])
      ).length;
      const remainPlayersCount = getAliveEntities(
        state.playersFrontRow.concat(state.playersBackRow ?? [])
      ).length;
      const entitiesCount: number =
        newTurn === "enemy" ? remainEnemiesCount : remainPlayersCount;
      return {
        ...state,
        turn: newTurn,
        availableActions: entitiesCount,
        maxActions: entitiesCount,
        lastHitDamage: 0,
        totalHitDamage: 0,
        entitiesTakenAction: [],
        remainEnemiesCount,
        remainPlayersCount,
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
    skill: Skill;
    sourceEntityData: EntityDetails;
    targetEntityData: EntityDetails;
    sourceEntities: Entity[];
    targetEntities: Entity[];
    isEnemyAction: boolean;
  }) => {
    const {
      sourceEntities,
      targetEntities,
      isEnemyAction,
      skill,
      sourceEntityData,
      targetEntityData,
    } = prop;

    if (skill && sourceEntityData && targetEntityData) {
      if (
        isEntityHasEnoughMana({ entity: sourceEntityData.entity, skill: skill })
      ) {
        if (skill.isAttackSkill) {
          const damageMade = getDamageMadeBy({
            entity: sourceEntityData.entity,
            skill,
          });
          const newTargetEntityData = { ...targetEntityData };
          newTargetEntityData.entity.healthPower -= damageMade;

          const newTargetFrontRow = [...targetEntities];
          newTargetFrontRow[targetEntityData.position] =
            newTargetEntityData.entity;

          const newSourceFrontRow = [...sourceEntities];
          newSourceFrontRow[sourceEntityData.position] = getUpdatedManaFromUsed(
            { entity: sourceEntityData.entity, skill }
          );

          set((state) => ({
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
          }));

          return true; // Skill was used successfully
        }
      } else {
        alert("not enough MP/EP");
      }
    }

    return false; // Skill was not used
  },
  setEntities: (props: {
    entities: Entity[];
    isPlayer: boolean;
    site: Site;
  }) => {
    const { entities, isPlayer, site } = props;
    set(() => {
      if (isPlayer) {
        if (site === "front") {
          return { playersFrontRow: [...entities] };
        }
        return { playersBackRow: [...entities] };
      } else {
        if (site === "front") {
          return { enemiesFrontRow: [...entities] };
        }
        return { enemiesBackRow: [...entities] };
      }
    });
  },
  increaseRound: () => {
    set((state) => ({ ...state, roundCount: state.roundCount + 1 }));
  },
  updateCycleRound: () => {
    set((state) => ({ ...state, cycleRound: state.cycleRound - 1 }));
  },
  resetCycleRound: () => {
    set((state) => ({ ...state, cycleRound: 2 }));
  },
}));
