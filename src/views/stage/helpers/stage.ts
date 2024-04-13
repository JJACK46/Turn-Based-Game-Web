import { Entity, EntityInstance } from "@/classes/entity";

export function getSpeedOfTeam(entities: Entity[]) {
  return entities.reduce((sum, entity) => entity.speed + sum, 0);
}

export const getLeastHealthEntity = (
  entities: Entity[]
): EntityInstance | undefined => {
  if (entities.length === 0) return undefined;

  let leastHP = Infinity;
  let resultEntity: EntityInstance | undefined = undefined;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.health < leastHP) {
      leastHP = entity.health;
      resultEntity = new EntityInstance({
        entity: entity,
        position: i,
        site: "front",
      });
    }
  }
  return resultEntity;
};

export const getMostAttackPowerEntity = (
  entities: Entity[]
): EntityInstance | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: EntityInstance | undefined = undefined;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.attackPower > maxATK) {
      maxATK = entity.attackPower;
      resultEntity = new EntityInstance({
        entity: entity,
        position: i,
        site: "front",
      });
    }
  }
  return resultEntity;
};

export const getAliveEntities = (entities: Entity[]) => {
  //be carful index changed
  return entities.filter((entity) => entity.health > 0);
};
