import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { UsingStatusEnum } from "@/data/enums/status";
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
    if (entity.isAlive) {
      if (entity.capacity?.energy) {
        entity.capacity.energy.value = Math.min(
          entity.capacity.energy.max,
          entity.capacity.energy.value + entity.capacity?.energy?.restore
        );
      }
      if (entity.capacity?.mana) {
        entity.capacity.mana.value = Math.min(
          entity.capacity.mana.max,
          entity.capacity.mana.value + entity.capacity?.mana?.restore
        );
      }
    }
  }

  return updated;
};

// export const settingEntity = (entityData: Entity) => {
// if (!entityData.traitSkill) {
//   entityData.traitSkill = TraitSkill[entityData.trait.id];
// }
// if (entityData.equipment?.weapon) {
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
//   }
// };

export const settingEntityWeapon = (entityData: Entity, equipment: Weapon) => {
  entityData.equipment = {
    weapon: equipment,
  };
  // equipment.status = UsingStatusEnum.INUSE;
};

export const settingEntityArmor = (entityData: Entity, equipment: Armor) => {
  entityData.equipment = {
    armor: equipment,
  };
  equipment.status = UsingStatusEnum.INUSE;
};

// export const setHoldingItem = (entityData: Entity, equipment: Item) => {
//   entityData.holdingItem = equipment
//   equipment.status = UsingStatusEnum.INUSE
// };

// export const findRowFromEntity = (props :{entity: EntityInstance, row: Entity[]}) => {

// };
