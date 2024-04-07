import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "../../../models/entity";
import { Skill } from "../../../models/skills";
// import { RootState } from "../../../app/store";

// Define a type for the slice state
interface Actions {
  selectedPlayer: { entity: Entity; index: number } | null;
  selectedEnemy: { entity: Entity; index: number } | null;
  selectedSkill: Skill | null;
  attackEntity: boolean;
}

// Define the initial state using that type
const initialState: Actions = {
  selectedPlayer: null,
  selectedEnemy: null,
  selectedSkill: null,
  attackEntity: false,
};

const actionSlice = createSlice({
  name: "actions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAttackEntity: (state) => {
      state.attackEntity = true;
    },
    unSetAttackEntity: (state) => {
      state.attackEntity = false;
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
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const {
  assignPlayer,
  assignEnemy,
  assignSkill,
  setAttackEntity,
  unSetAttackEntity,
} = actionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.actions.value

export default actionSlice.reducer;
