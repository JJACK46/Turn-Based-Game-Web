import { PositionEnum } from "@/data/enums/positions";

export function createUniqueID(p: {
  name: string;
  id: number | string;
  index: number;
  position: PositionEnum;
}): string {
  const { name = "unnamed", id = "none", index = -1, position = "none" } = p;
  return `${name
    .trim()
    .toLowerCase()
    .replace(" ", "_")}-${id}-${index}-${position}`;
}
