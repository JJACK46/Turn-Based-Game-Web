import { Armor } from "@/classes/armor";
import { EntityType, Entity } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
// import { bowSkillSet } from "@/data/bowSkillSet";
// import { gunSkillSet } from "@/data/gunSkillSet";
// import { swordSkillSet } from "@/data/swordSkillSet";
// import _ from "lodash";

export const isEntityInEntities = (
  entityInstance: Entity,
  entities: Entity[]
) => {
  return entities.some((e) => e.instanceId === entityInstance.instanceId);
};

export const restoreManaForEntities = (entities: Entity[]) => {
  if (entities.length === 0) return [];

  const updated = [...entities];

  for (let i = 0; i < updated.length; i++) {
    const entity = updated[i];
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

// export const getIndexEntitiesWithSkillDowntime = (entities: EntityType[]) => {
//   return entities.map((entity, index) => {
//     if (entity.equipmentSkills.some((skill) => skill.duration)) {
//       return index;
//     }
//   });
// };

export const settingEntity = (entityData: EntityType) => {
  // if (!entityData.traitSkill) {
  //   entityData.traitSkill = TraitSkill[entityData.trait.id];
  // }
  if (entityData.equipment?.weapon) {
    entityData.equipmentSkills = [];
    // switch (entityData.equipment.weapon.type.id) {
    //   case WeaponEnum.BOW:
    //     entityData.skills.push(bowSkillSet[entityData.trait.id][0]);
    //     entityData.skills.push(bowSkillSet[entityData.trait.id][1]);
    //     break;
    //   case WeaponEnum.SWORD:
    //     entityData.skills.push(swordSkillSet[entityData.trait.id][0]);
    //     entityData.skills.push(swordSkillSet[entityData.trait.id][1]);
    //     break;
    //   case WeaponEnum.GUN:
    //     entityData.skills.push(gunSkillSet[entityData.trait.id][0]);
    //     entityData.skills.push(gunSkillSet[entityData.trait.id][1]);
    //     break;
    // }
  }
};

export const settingEntityWeapon = (
  entityData: EntityType,
  equipment: Weapon
) => {
  entityData.equipment = {
    weapon: equipment,
  };
};

export const settingEntityArmor = (
  entityData: EntityType,
  equipment: Armor
) => {
  entityData.equipment = {
    armor: equipment,
  };
};

// export const findRowFromEntity = (props :{entity: EntityInstance, row: Entity[]}) => {

// };
