import { Entity } from "@/models/entity";

export function calculateTeamSpeed(entities: Entity[]) {
  return entities.reduce((sum, entity) => entity.speed + sum, 0);
}
