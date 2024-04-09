import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "../../../models/entity";
import { Skill } from "../../../models/skills";

// Define a type for the slice state
interface Stage {
  selectedPlayer: { entity: Entity; index: number } | null;
  selectedEnemy: { entity: Entity; index: number } | null;
  selectedSkill: Skill | null;
  attackEntity: boolean;
  enemiesFrontRow: Entity[];
  playersFrontRow: Entity[];
  enemiesBackRow: Entity[];
  playersBackRow: Entity[];
}

type Position = "front" | "back";
type TypeOfEntity = "player" | "enemy";

// Define the initial state using that type
const initialState: Stage = {
  selectedPlayer: null,
  selectedEnemy: null,
  selectedSkill: null,
  attackEntity: false,
  enemiesFrontRow: [],
  playersFrontRow: [],
  enemiesBackRow: [],
  playersBackRow: [],
};

const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
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
    assignPlayer: (
      state,
      action: PayloadAction<{ entity: Entity; index: number }>
    ) => {
      state.selectedPlayer = action.payload;
    },
    assignEnemy: (
      state,
      action: PayloadAction<{ entity: Entity; index: number }>
    ) => {
      state.selectedEnemy = action.payload;
    },
    skillToEntity: (
      state,
      action: PayloadAction<{
        indexTargetEntity: number;
        sourceEntity: Entity;
        skill: Skill;
      }>
    ) => {
      const { indexTargetEntity, sourceEntity, skill } = action.payload;
      const updatedEnemiesFrontRow = [...state.enemiesFrontRow];
      const totalDamage = sourceEntity.attackPower * skill.emitValueMultiply;
      updatedEnemiesFrontRow[indexTargetEntity].healthPower = Math.max(updatedEnemiesFrontRow[indexTargetEntity].healthPower - totalDamage,0);
      state.enemiesFrontRow = updatedEnemiesFrontRow;
      console.log("Hits ", totalDamage);
      //reset selected player
      state.selectedSkill = null;
      state.selectedPlayer = null;
    },
  },
});

export const {
  assignPlayer,
  assignEnemy,
  assignSkill,
  assignEntities,
  skillToEntity,
} = stageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.actions.value

export default stageSlice.reducer;
