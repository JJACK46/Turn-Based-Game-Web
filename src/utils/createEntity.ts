import { PositionEnum } from "@/data/enums/positions";
import { createUniqueID } from "./uniqueId";
import { Entity } from "@/classes/entity";
import { BASE_SCALING_LEVEL } from "./constants";
import _ from "lodash";

export const createEntitiesInstances = (
  entities: Entity[],
  position: PositionEnum,
  playable: boolean,
  entitiesLevel?: number[]
): Entity[] => {
  return entities.map((entityData, index) => {
    // const entity = new Entity(entityData);
    const entity = _.cloneDeep(entityData);
    const { name, id } = entity;
    entity.instanceId = createUniqueID({ name, id: id, index, position });
    entity.index = index;
    entity.position = position;
    entity.playable = playable;

    if (entitiesLevel && entitiesLevel.length > 0) {
      const randomLevel = Math.floor(
        Math.random() * (entitiesLevel[1] - entitiesLevel[0] + 1) +
          entitiesLevel[0]
      );
      const increaseByLevel = randomLevel * BASE_SCALING_LEVEL;
      entity.level = randomLevel;
      entity.health = {
        value: entity.health.value + increaseByLevel,
        max: entity.health.max + increaseByLevel,
      };
      entity.attack = {
        value: entity.attack.value + increaseByLevel,
        max: entity.attack.max + increaseByLevel,
      };
      entity.defense = {
        value: entity.defense.value + Math.floor(increaseByLevel / 1.5),
        max: entity.defense.max + Math.floor(increaseByLevel / 1.5),
      };
    }
    return entity;
  });
};
