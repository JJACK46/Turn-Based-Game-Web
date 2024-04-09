import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity, EntityAndIndex } from "../../../models/entity";
import { Skill } from "../../../models/skills";
import _ from "lodash";

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
  isActionOverlayOpen: boolean;
  turn: "player" | "enemy" | null;
  availableActions: number;
  maxActions: number;
  round: number;
  lastHitDamage: number;
  entitiesTakenAction: Entity[];
  stageData: StageData;
  isDisplayOpen: boolean;
  remainEnemiesCount: number;
  indexEnemyAction: number;
  totalHitDamage: number;
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
  isActionOverlayOpen: false,
  turn: null,
  availableActions: 0,
  maxActions: 0,
  round: 1,
  lastHitDamage: 0,
  entitiesTakenAction: [],
  stageData: { speedEnemies: 0, speedPlayers: 0 },
  isDisplayOpen: true,
  remainEnemiesCount: 8,
  indexEnemyAction: 0,
  totalHitDamage: 0,
};

const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
    increaseIndexEnemyAction: (s) => {
      s.indexEnemyAction++;
    },
    resetIndexEnemyAction: (s) => {
      s.indexEnemyAction = 0;
    },
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
      s.isActionOverlayOpen = true;
    },
    closeActionOverlay: (s) => {
      s.isActionOverlayOpen = false;
    },
    openDisplay: (s) => {
      s.isDisplayOpen = true;
    },
    closeDisplay: (s) => {
      s.isDisplayOpen = false;
    },
    decreaseActions: (s, action: PayloadAction<number>) => {
      s.availableActions -= action.payload;
    },
    resetTotalHitDamage: (s) => {
      s.totalHitDamage = 0;
    },
    resetLastHitDamage: (s) => {
      s.lastHitDamage = 0;
    },
    switchTurn: (s) => {
      if (s.availableActions === 0) {
        if (s.turn === "enemy") {
          s.turn = "player";
          const remainEntity = s.playersFrontRow.filter(
            (entity) => entity.healthPower > 0
          );
          s.maxActions = remainEntity.length;
          s.availableActions = remainEntity.length;
          s.availableActions = s.playersFrontRow.length;
          s.entitiesTakenAction = [];
        } else {
          s.turn = "enemy";
          const remainEntity = s.enemiesFrontRow.filter(
            (entity) => entity.healthPower > 0
          );
          s.maxActions = remainEntity.length;
          s.availableActions = remainEntity.length;
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
      s.remainEnemiesCount = enemies.length;
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
    cancelSkill: (s) => {
      s.selectedSkill = null;
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
        indexSourceEntity: number;
        sourceEntity: Entity;
        skill: Skill;
        sourceEntities: Entity[];
        targetEntities: Entity[];
      }>
    ) => {
      const {
        toEnemy,
        indexTargetEntity,
        indexSourceEntity,
        sourceEntity,
        skill,
        targetEntities,
        sourceEntities,
      } = action.payload;

      const wasAction = state.entitiesTakenAction.some((entity) =>
        _.isEqual(entity, sourceEntity)
      );

      if (!wasAction) {
        const damageMade = Math.round(
          sourceEntity.attackPower * skill.emitValueMultiply
        );
        const updatedSourceEntity = { ...sourceEntity };
        const updatedTargetEntities = [...targetEntities];
        const updatedSourceEntities = [...sourceEntities];

        if (updatedSourceEntity.manaPower >= skill.requiredMana) {
          updatedSourceEntity.manaPower -= skill.requiredMana;
        } else {
          alert("not enough MP");
          return;
        }

        if (skill.requiredEnergy) {
          if (updatedSourceEntity.energyPower! >= skill.requiredEnergy) {
            updatedSourceEntity.energyPower! -= skill.requiredEnergy;
          } else {
            alert("not enough EP");
            return;
          }
        }

        updatedSourceEntities[indexSourceEntity] = updatedSourceEntity;

        const targetEntity = { ...updatedTargetEntities[indexTargetEntity] };
        console.log("before: " + targetEntity.healthPower);
        targetEntity.healthPower -= damageMade;
        console.log("after: " + targetEntity.healthPower);
        if (targetEntity.healthPower <= 0) {
          state.remainEnemiesCount -= 1;
        }
        //updated
        updatedTargetEntities[indexTargetEntity] = targetEntity;

        console.log("damage :" + damageMade);
        console.log("HP:" + targetEntity.healthPower);

        //update
        if (toEnemy) {
        state.playersFrontRow = _.cloneDeep(updatedSourceEntities);
        state.enemiesFrontRow = _.cloneDeep(updatedTargetEntities);
        // state.playersFrontRow = updatedSourceEntities;
        // state.enemiesFrontRow = updatedTargetEntities;
      } else {
        // state.enemiesFrontRow = updatedSourceEntities;
        // state.playersFrontRow = updatedTargetEntities;
        state.enemiesFrontRow = _.cloneDeep(updatedSourceEntities);
        state.playersFrontRow = _.cloneDeep(updatedTargetEntities);
        console.log(state.playersFrontRow, " updated data");
      }
      try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("localData", serializedState);
      } catch (err) {}
      // console.log(JSON.stringify(updatedTargetEntities) ,"update data");

      state.lastHitDamage = damageMade;
      state.totalHitDamage += damageMade;
      //reset selected
      state.entitiesTakenAction.push(updatedSourceEntity);
      state.availableActions -= 1;
      state.selectedSkill = null;
      state.currentEntity = null;
      state.targetEntity = null;
    } else {
      alert("you was action");
    }
  },
},
});

export const {
  increaseIndexEnemyAction,
  resetIndexEnemyAction,
  cancelSkill,
  openDisplay,
  closeDisplay,
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
  resetLastHitDamage,
  resetTotalHitDamage,
} = stageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.actions.value

export default stageSlice.reducer;
