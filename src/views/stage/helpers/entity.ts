import { Armor } from "@/classes/armor";
import { Entity, EntityInstance } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { UsingStatusEnum } from "@/data/enums/status";
// import { bowSkillSet } from "@/data/bowSkillSet";
// import { gunSkillSet } from "@/data/gunSkillSet";
// import { swordSkillSet } from "@/data/swordSkillSet";
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

export const settingEntity = (entityData: Entity) => {
  // if (!entityData.traitSkill) {
  //   entityData.traitSkill = TraitSkill[entityData.trait.id];
  // }
  if (entityData.equipment?.weapon) {
    entityData.skills = [];
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

export const settingEntityWeapon = (entityData: Entity, equipment: Weapon) => {
  entityData.equipment = {
    weapon: equipment,
  };
  equipment.status = UsingStatusEnum.INUSE
};

export const settingEntityArmor = (entityData: Entity, equipment: Armor) => {
  entityData.equipment = {
    armor: equipment,
  };
  equipment.status = UsingStatusEnum.INUSE
};

// export const setHoldingItem = (entityData: Entity, equipment: Item) => {
//   entityData.holdingItem = equipment
//   equipment.status = UsingStatusEnum.INUSE
// };

// export const findRowFromEntity = (props :{entity: EntityInstance, row: Entity[]}) => {

// };
