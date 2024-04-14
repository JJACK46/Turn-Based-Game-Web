import { Entity, EntityInstance } from "@/classes/entity";
// import _ from "lodash";

export const isEntityInEntities = (
  entityInstance: EntityInstance,
  entities: EntityInstance[]
) => {
  return entities.some((e) => e.instanceId === entityInstance.instanceId);
};

export const restoreManaForEntities = (entities: EntityInstance[]) => {
  if (entities.length === 0) return [];

  const updated = [...entities];

  for (let i = 0; i < updated.length; i++) {
    const entity = updated[i].entity;
    const restoreAmount = entity.restoreManaOrEnergy;
    const maxManaEnergy = entity.maxManaEnergyPower;
    //energyPower = -1 mean it's entity does not involve with energy
    if (entity.energy > -1 && entity.health > 0) {
      entity.energy += restoreAmount;
      entity.energy = Math.max(0, Math.min(entity.energy, maxManaEnergy));
    }
    if (entity.mana > -1 && entity.health > 0) {
      entity.mana += restoreAmount;
      entity.mana = Math.max(0, Math.min(entity.mana, maxManaEnergy));
    }
  }

  return updated;
};

export const getIndexEntitiesWithSkillDowntime = (entities: Entity[]) => {
  return entities.map((entity, index) => {
    if (entity.skills.some((skill) => skill.duration)) {
      return index;
    }
  });
};
