import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { PositionEnum } from "@/data/enums/positions";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Inventory = {
  entityInventory: Entity[];
  // itemInventory : item[]
  weaponInventory: Weapon[];
  armorInventory: Armor[];
  frontRow: Entity[];
  backRoW: Entity[];
};

type Methods = {
  setRowForEntity: (props: { row: PositionEnum; entity: Entity }) => void;
  setEntities: (entities: Entity[]) => void;
};

export const useInventoryStore = create<Inventory & Methods>()(
  immer((set) => ({
    entityInventory: [],
    weaponInventory: [],
    armorInventory: [],
    frontRow: [],
    backRoW: [],

    setRowForEntity(props) {
      const { row, entity } = props;
      if (row != PositionEnum.NONE) {
        entity.position = row;
        if (row == PositionEnum.FRONT) {
          set((state) => {
            state.frontRow.push(entity);
          });
          return true;
        } else {
          const newRow = [...this.backRoW];
          newRow.push(entity);
          set(() => ({ backRoW: newRow }));
          return true;
        }
      } else {
        if (entity.position == PositionEnum.FRONT) {
          const newRow = this.frontRow.filter((item) => item !== entity);
          entity.position = row;
          set(() => ({ frontRow: newRow }));
          return true;
        } else {
          const newRow = this.backRoW.filter((item) => item !== entity);
          entity.position = row;
          set(() => ({ backRoW: newRow }));
          return true;
        }
      }
    },
    setEntities(entities) {
      set((state) => {
        state.entityInventory = entities;
      });
    },
  }))
);
