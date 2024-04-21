import { PositionEnum } from "@/data/enums/positions";
import { createUniqueID } from "./uniqueId";
import { Entity } from "@/classes/entity";

export const createEntityInstances = (
  entities: Entity[],
  position: PositionEnum,
  playable: boolean
): Entity[] =>
  entities.map((ent, index) => {
    const { name, id } = ent;
    ent.instanceId = createUniqueID({ name, id: id, index, position });
    ent.index = index;
    ent.position = position;
    ent.playable = playable;

    return ent;
  });
