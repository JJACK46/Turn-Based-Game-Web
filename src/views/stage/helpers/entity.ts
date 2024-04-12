import { Entity } from "@/classes/entity";
import { Skill } from "@/classes/skills";
import _ from "lodash";

export function isSkillUseEP(skill: Skill): boolean {
  const temp = skill.requiredEnergy ?? -1;
  if (temp > -1) {
    return true;
  }
  return false;
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
  const entityEnergyPower = entity.energyPower ?? 0;
  const skillRequiredEnergy = skill.requiredEnergy ?? 0;

  if (!entity.energyPower && skillRequiredEnergy > 0) {
    return false;
  }

  if (entityEnergyPower && skillRequiredEnergy) {
    return entityEnergyPower >= skillRequiredEnergy;
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
  if (updatedEntity.manaPower > 0) {
    updatedEntity.manaPower -= skill.requiredMana;
  }
  if (updatedEntity.energyPower > 0 && skill.requiredEnergy) {
    updatedEntity.energyPower -= skill.requiredEnergy;
  }

  return updatedEntity;
}

export const isEntityInEntities = (entity: Entity, entities: Entity[]) => {
  return entities.some((ent) => _.isEqual(ent.id, entity.id));
};

export const restoreManaForEntities = (entities: Entity[]) => {
  if (entities.length === 0) return [];

  const updated = [...entities];

  for (let i = 0; i < updated.length; i++) {
    const restoreAmount = updated[i].restoreManaOrEnergy;
    const maxManaEnergy = updated[i].maxManaEnergyPower;
    //energyPower = -1 mean it's entity does not involve with energy
    if (updated[i].energyPower > -1 && updated[i].healthPower > 0) {
      updated[i].energyPower += restoreAmount;
      updated[i].energyPower = Math.max(
        0,
        Math.min(updated[i].energyPower!, maxManaEnergy)
      );
    }
    if (updated[i].manaPower > -1 && updated[i].healthPower > 0) {
      updated[i].manaPower += restoreAmount;
      updated[i].manaPower = Math.max(
        0,
        Math.min(updated[i].manaPower, maxManaEnergy)
      );
    }
  }

  return updated;
};
