import { Entity } from "@/models/entity";
import { Skill } from "@/models/skills";

export function isSkillUseEP(skill: Skill): boolean {
  return skill.requiredEnergy ? true : false;
}

export function getDamageMadeBy({
  entity,
  skill,
}: {
  entity: Entity;
  skill: Skill;
}): number {
  return Math.round(
    Math.round(entity.attackPower ?? 0) * skill.emitValueMultiply
  );
}

export function isEntityHasEnoughMana({
  entity,
  skill,
}: {
  entity: Entity;
  skill: Skill;
}): boolean {
  if (isSkillUseEP(skill) && entity.energyPower && skill.requiredEnergy) {
    return entity.energyPower >= skill.requiredEnergy;
  }
  return entity.manaPower >= skill.requiredMana;
}

export function getUpdatedManaFromUsed({
  entity,
  skill,
}: {
  entity: Entity;
  skill: Skill;
}): Entity {
  const updatedEntity = { ...entity };
  updatedEntity.manaPower -= skill.requiredMana;
  if (
    isSkillUseEP(skill) &&
    updatedEntity.energyPower &&
    skill.requiredEnergy
  ) {
    updatedEntity.energyPower -= skill.requiredEnergy;
  }

  return updatedEntity;
}
