import { Entity } from "@/classes/entity";
import { PositionEnum } from "@/data/enums/positions";
import { createUniqueID } from "./uniqueId";

export const createEntityInstances = (
  entities: Entity[],
  position: PositionEnum,
  playable: boolean
) =>
  entities.map((ent, index) => {
    // const {
    //   id,
    //   name,
    //   imageUrl,
    //   level,
    //   equipmentSkills = [],
    //   normalHitSkill,
    //   traitSkill,
    //   attackPower,
    //   healingPower = 0,
    //   defend = 0,
    //   health,
    //   mana,
    //   energy,
    //   maxManaEnergyPower,
    //   maxHealth,
    //   maxDefendPower = 0,
    //   maxAttackPower,
    //   equipment,
    //   status,
    //   speed,
    //   trait,
    //   restoreManaOrEnergy,
    //   restoreHealth = 0,
    //   evasion,
    //   selectedSound,
    // } = ent;

    // const entity = new Entity({
    //   instanceId: createUniqueID({ name, id: id!, index, position }),
    //   index,
    //   position,
    //   playable,

    // });
    const { name, id } = ent;
    ent.instanceId = createUniqueID({ name, id: id, index, position });
    ent.index = index;
    ent.position = position;
    ent.playable = playable;

    return ent;
  });
