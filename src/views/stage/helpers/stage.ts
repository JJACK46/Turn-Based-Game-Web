import { Entity, EntityDetails } from "@/classes/entity";

export function getSpeedOfTeam(entities: Entity[]) {
  return entities.reduce((sum, entity) => entity.speed + sum, 0);
}

export const getLeastHealthEntity = (
  entities: Entity[]
): EntityDetails | undefined => {
  if (entities.length === 0) return undefined;

  let leastHP = Infinity;
  let resultEntity: EntityDetails | undefined = undefined;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.healthPower < leastHP) {
      leastHP = entity.healthPower;
      resultEntity = { entity: entity, position: i, site: "front" };
    }
  }
  return resultEntity;
};

export const getMostAttackPowerEntity = (
  entities: Entity[]
): EntityDetails | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: EntityDetails | undefined = undefined;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.attackPower > maxATK) {
      maxATK = entity.attackPower;
      resultEntity = { entity: entity, position: i, site: "front" };
    }
  }
  return resultEntity;
};

export const getAliveEntities = (entities: Entity[]) => {
  //be carful index changed
  return entities.filter((entity) => entity.healthPower > 0);
};
