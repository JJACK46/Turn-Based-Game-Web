import { EntityType, Entity } from "@/classes/entity";
import { PositionEnum } from "@/data/enums/positions";
import { createUniqueID } from "./uniqueId";

export const createEntityInstances = (
  entities: EntityType[],
  position: PositionEnum,
  playable: boolean
) =>
  entities.map((ent, index) => {
    const {
      id,
      name,
      imageUrl,
      level,
      equipmentSkills = [],
      normalHitSkill,
      traitSkill,
      attackPower,
      healingPower = 0,
      defend = 0,
      health,
      mana,
      energy,
      maxManaEnergyPower,
      maxHealth,
      maxDefendPower = 0,
      maxAttackPower,
      equipment,
      status,
      speed,
      trait,
      restoreManaOrEnergy,
      restoreHealth = 0,
      evasion,
      selectedSound,
    } = ent;

    const entity = new Entity({
      instanceId: createUniqueID({ name, id: id!, index, position }),
      index,
      position,
      playable,
      activateSkills: [],
      effectedSkills: [],
      id,
      name,
      imageUrl,
      level,
      equipmentSkills,
      normalHitSkill,
      traitSkill,
      attackPower,
      healingPower,
      defend,
      health,
      mana,
      energy,
      maxManaEnergyPower,
      maxHealth,
      maxDefendPower,
      maxAttackPower,
      equipment,
      status,
      speed,
      trait,
      restoreManaOrEnergy,
      restoreHealth,
      evasion,
      selectedSound,
    });

    return entity;
  });
