import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity, EntityAndIndex } from "../../../models/entity";
import { Skill } from "../../../models/skills";

interface StageData {
  speedEnemies: number;
  speedPlayers: number;
}

// Define a type for the slice state
interface Stage {
  selectedSkill: Skill | null;
  attackEntity: boolean;
  enemiesFrontRow: Entity[];
  playersFrontRow: Entity[];
  enemiesBackRow: Entity[];
  playersBackRow: Entity[];
  currentEntity: EntityAndIndex | null;
  targetEntity: EntityAndIndex | null;
  entitiesInField: Entity[];
  actionOverlay: boolean;
  turn: "player" | "enemy" | null;
  availableActions: number;
  maxActions: number;
  round: number;
  lastHitDamage: number | null;
  entitiesTakenAction: Entity[];
  stageData: StageData;
}

type Position = "front" | "back";
type TypeOfEntity = "player" | "enemy";

// Define the initial state using that type
const initialState: Stage = {
  selectedSkill: null,
  attackEntity: false,
  enemiesFrontRow: [],
  playersFrontRow: [],
  enemiesBackRow: [],
  playersBackRow: [],
  entitiesInField: [],
  currentEntity: null,
  targetEntity: null,
  actionOverlay: false,
  turn: null,
  availableActions: 0,
  maxActions: 0,
  round: 1,
  lastHitDamage: null,
  entitiesTakenAction: [],
  stageData: { speedEnemies: 0, speedPlayers: 0 },
};

const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
    markEntityTakenAction: (state, action: PayloadAction<Entity>) => {
      state.entitiesTakenAction.push(action.payload);
    },
    setCurrentEntity: (s, action: PayloadAction<EntityAndIndex>) => {
      s.currentEntity = action.payload;
    },
    setTargetEntity: (s, action: PayloadAction<EntityAndIndex>) => {
      s.currentEntity = action.payload;
    },
    openActionOverlay: (s) => {
      s.actionOverlay = true;
    },
    closeActionOverlay: (s) => {
      s.actionOverlay = false;
    },
    decreaseActions: (s, action: PayloadAction<number>) => {
      s.availableActions -= action.payload;
    },
    switchTurn: (s) => {
      if (s.availableActions === 0) {
        if (s.turn === "enemy") {
          s.turn = "player";
          s.availableActions = s.playersFrontRow.length;
          s.entitiesTakenAction = [];
        } else {
          s.turn = "enemy";
          s.availableActions = s.enemiesFrontRow.length;
          s.entitiesTakenAction = [];
        }
      }
    },
    initTurn: (
      s,
      action: PayloadAction<{ enemies: Entity[]; players: Entity[] }>
    ) => {
      const { enemies, players } = action.payload;
      const speedOfEnemies = enemies.reduce(
        (sum, enemy) => enemy.speed + sum,
        0
      );
      s.stageData.speedEnemies = speedOfEnemies;
      const speedOfPlayers = players.reduce(
        (sum, player) => player.speed + sum,
        0
      );
      s.stageData.speedPlayers = speedOfPlayers;
      if (speedOfEnemies >= speedOfPlayers) {
        s.turn = "enemy";
        s.availableActions = enemies.length;
        s.maxActions = enemies.length;
      } else {
        s.turn = "player";
        s.availableActions = players.length;
        s.maxActions = players.length;
      }
    },
    assignEntities: (
      s,
      action: PayloadAction<{
        entities: Entity[];
        position: Position;
        type: TypeOfEntity;
      }>
    ) => {
      const { position, type, entities } = action.payload;
      if (type === "player") {
        if (position === "front") {
          s.playersFrontRow = entities;
        } else {
          s.playersBackRow = entities;
        }
      } else {
        if (position === "front") {
          s.enemiesFrontRow = entities;
        } else {
          s.enemiesBackRow = entities;
        }
      }
    },
    assignSkill: (state, action: PayloadAction<Skill | null>) => {
      state.selectedSkill = action.payload;
    },
    resetCurrentEntity: (state) => {
      state.currentEntity = null;
    },
    resetEntitiesTakenAction: (s) => {
      s.entitiesTakenAction = [];
    },
    skillToEntity: (
      state,
      action: PayloadAction<{
        toEnemy: boolean;
        indexTargetEntity: number;
        sourceEntity: Entity;
        skill: Skill;
      }>
    ) => {
      const { toEnemy, indexTargetEntity, sourceEntity, skill } =
        action.payload;

      const updatedEntitiesFrontRow = toEnemy
        ? [...state.enemiesFrontRow]
        : [...state.playersFrontRow];

      const totalDamage = sourceEntity.attackPower * skill.emitValueMultiply;

      updatedEntitiesFrontRow[indexTargetEntity].healthPower -= totalDamage;

      state.enemiesFrontRow = toEnemy
        ? updatedEntitiesFrontRow
        : state.enemiesFrontRow;
      state.playersFrontRow = toEnemy
        ? state.playersFrontRow
        : updatedEntitiesFrontRow;

      state.lastHitDamage = totalDamage;
      console.log("Hits ", state.lastHitDamage);
      //reset selected
      state.entitiesTakenAction.push(sourceEntity);
      state.selectedSkill = null;
      state.currentEntity = null;
      state.targetEntity = null;
    },
  },
});

export const {
  resetEntitiesTakenAction,
  markEntityTakenAction,
  setCurrentEntity,
  setTargetEntity,
  assignSkill,
  assignEntities,
  skillToEntity,
  initTurn,
  decreaseActions,
  resetCurrentEntity,
  openActionOverlay,
  closeActionOverlay,
  switchTurn,
} = stageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.actions.value

export default stageSlice.reducer;
