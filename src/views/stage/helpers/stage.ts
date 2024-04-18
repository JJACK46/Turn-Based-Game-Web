import { EffectSkill } from "@/classes/effect";
import { EntityType, Entity } from "@/classes/entity";
import { Skill } from "@/classes/skills";

export function getSpeedOfTeam(entities: EntityType[]) {
  return entities.reduce((sum, entity) => entity.speed + sum, 0);
}

export const getLeastHealthEntity = (
  entities: Entity[]
): Entity | undefined => {
  if (entities.length === 0) return undefined;

  let leastHP = Infinity;
  let resultEntity: Entity | undefined = undefined;

  for (const entity of entities) {
    if (entity.attackPower < leastHP) {
      leastHP = entity.health;
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
    if (entity.attackPower > maxATK) {
      maxATK = entity.attackPower;
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

export function updateRemainingSkills(entities: Entity[]): Entity[] {
  return entities.map((entity) => {
    const activateSkills = entity.activateSkills.map((skill) => {
      const updated = new Skill({
        ...skill,
        duration: skill.duration - 1,
      });

      return updated;
    });

    const effectedSkills = entity.effectedSkills.map((skill) => {
      const updated = new EffectSkill({
        ...skill,
        duration: skill.duration - 1,
      });

      return updated;
    });

    const updatedEntity = new Entity({
      ...entity,
      activateSkills,
      effectedSkills,
    });

    return updatedEntity.updateStatRemainingSkills();
  });
}
