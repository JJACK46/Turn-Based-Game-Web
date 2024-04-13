import { Entity } from "@/classes/entity";
import _ from "lodash";

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
    if (updated[i].energy > -1 && updated[i].health > 0) {
      updated[i].energy += restoreAmount;
      updated[i].energy = Math.max(
        0,
        Math.min(updated[i].energy!, maxManaEnergy)
      );
    }
    if (updated[i].mana > -1 && updated[i].health > 0) {
      updated[i].mana += restoreAmount;
      updated[i].mana = Math.max(0, Math.min(updated[i].mana, maxManaEnergy));
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
