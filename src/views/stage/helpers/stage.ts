import { Entity, EntityInstance } from "@/classes/entity";
import { SkillInstance } from "@/classes/skills";

export function getSpeedOfTeam(entities: Entity[]) {
  return entities.reduce((sum, entity) => entity.speed + sum, 0);
}

export const getLeastHealthEntity = (
  entities: EntityInstance[]
): EntityInstance | undefined => {
  if (entities.length === 0) return undefined;

  let leastHP = Infinity;
  let resultEntity: EntityInstance | undefined = undefined;

  for (const entity of entities) {
    if (entity.ATK < leastHP) {
      leastHP = entity.HP;
      resultEntity = entity;
    }
  }
  return resultEntity;
};

export const getMostAttackPowerEntity = (
  entities: EntityInstance[]
): EntityInstance | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: EntityInstance | undefined = undefined;

  for (const entity of entities) {
    if (entity.ATK > maxATK) {
      maxATK = entity.ATK;
      resultEntity = entity;
    }
  }
  return resultEntity;
};

export const getAliveEntities = (
  entities: EntityInstance[]
): EntityInstance[] => {
  return entities.filter((e) => e.entity.health > 0);
};

export const getUpdateEntityInRow = (props: {
  target: EntityInstance;
  entities: EntityInstance[];
}) => {
  const { target, entities } = props;
  return entities.map((entity) => {
    return entity.instanceId === target.instanceId ? target : entity;
  });
};

export function updateRemainingActiveSkill(
  entities: EntityInstance[]
): EntityInstance[] {
  return entities.map((entity) => {
    const updatedEntity = new EntityInstance({
      ...entity,
      hasActiveSkills: entity.activeSkills.map((skillInstance) => {
        const updatedSkillInstance = new SkillInstance({
          ...skillInstance,
          remainingRound:
            skillInstance.remainingRound > 0
              ? skillInstance.remainingRound - 1
              : skillInstance.remainingRound,
        });
        return updatedSkillInstance;
      }),
    });
    return updatedEntity;
  });
}
