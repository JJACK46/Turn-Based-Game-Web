import { Entity } from "@/classes/entity";

interface Props {
  entity: Entity;
}

export function CardOverlayFX({ entity }: Props) {
  const wrapClass = "z-10 absolute inset-0 rounded-lg opacity-35 size-full";
  if (!entity.isCanAction) {
    return <div className={`${wrapClass} animate-shimmerStun`}></div>;
  }
  if (entity.isPoisoned) {
    return <div className={`${wrapClass} animate-shimmerPoison`}></div>;
  }
  return null;
}
