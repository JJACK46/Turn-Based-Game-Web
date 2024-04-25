import { Entity } from "@/classes/entity";
import _ from "lodash";

export function getSpeedOfTeam(entities: Entity[]) {
  return entities.reduce((sum, entity) => entity.speed + sum, 0);
}

export const getLeastHealthEntity = (
  entities: Entity[]
): Entity | undefined => {
  if (entities.length === 0) return undefined;

  let leastHP = Infinity;
  let resultEntity: Entity | undefined = undefined;

  for (const entity of entities) {
    if (entity.attack.value < leastHP) {
      leastHP = entity.health.value;
      resultEntity = entity;
    }
  }
  return resultEntity;
};

export const getMostAttackPowerEntity = (
  entities: Entity[]
): Entity | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: Entity | undefined = undefined;

  for (const entity of entities) {
    if (entity.attack.value > maxATK) {
      maxATK = entity.attack.value;
      resultEntity = entity;
    }
  }
  return resultEntity;
};

export const getAliveEntities = (entities: Entity[]): Entity[] => {
  return entities.filter((e) => e.isAlive);
};

export const getUpdateEntityInRow = (props: {
  target: Entity;
  entities: Entity[];
}) => {
  const { target, entities } = props;
  return entities.map((entity) => {
    return entity.instanceId === target.instanceId ? target : entity;
  });
};

export function updateRemainingEffect(entities: Entity[]): Entity[] {
  return entities.map((entity) => entity.updateRemainingEffect());
}

export function findTargetIndex({
  entities,
  target,
}: {
  entities: Entity[];
  target: Entity;
}): number {
  return entities.findIndex((ent) =>
    _.isEqual(ent.instanceId, target.instanceId)
  );
}

export function updateArrayByEntity(
  updatedEntity: Entity,
  entities: Entity[]
): Entity[] {
  const index = entities.findIndex(
    (element) => element.instanceId === updatedEntity.instanceId
  );
  if (index !== -1) {
    // Element found, replace it with the updated element
    entities[index] = updatedEntity;
  } else {
    console.error(`Element with ID ${updatedEntity.instanceId} not found.`);
  }
  return entities;
}
