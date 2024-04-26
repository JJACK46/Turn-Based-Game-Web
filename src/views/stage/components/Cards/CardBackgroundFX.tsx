import { Entity } from "@/classes/entity";
import { useState } from "react";

interface Props {
  entity: Entity;
  children: React.ReactNode;
}

export function CardBackgroundFX({ entity, children }: Props) {
  const [currentHP, setCurrentHP] = useState(entity.health.max);

  function handleAttackedStyle() {
    if (entity.health.value < currentHP) {
      setTimeout(() => {
        setCurrentHP(entity.health.value);
      }, 150);
      return "opacity-75 scale-95";
    }
  }

  function handleOverStat() {
    if (entity.isAlive) {
      if (entity.hasOverDefend) {
        return "animate-shimmerOverDef";
      }
      if (entity.hasOverHealth) {
        return "animate-shimmerOverHealth";
      }
      if (entity.hasOverAttack) {
        return "animate-shimmerOverATK";
      }
    }
  }

  return (
    <div
      className={`relative p-2 rounded-lg transition ${handleOverStat()} 
      ${handleAttackedStyle()} `}
    >
      {children}
    </div>
  );
}
