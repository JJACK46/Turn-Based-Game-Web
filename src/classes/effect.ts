import { PowerEnum } from "@/data/enums/powers";
import { Skill } from "./skills";

export class EffectSkill {
  name: string;
  emitValueMultiplier: number;
  value: number;
  powerType: PowerEnum;
  duration: number;
  canDispelWith: Skill | null;
  canAction: boolean;
  isNegative: boolean;
  immediately: boolean;

  constructor({
    name,
    emitValueMultiplier,
    powerType,
    value,
    duration,
    canDispelWith,
    canAction,
    isNegative,
    immediately,
  }: {
    name: string;
    emitValueMultiplier: number;
    powerType: PowerEnum;
    value?: number;
    duration?: number;
    canDispelWith?: Skill;
    canAction?: boolean;
    isNegative: boolean;
    immediately?: boolean;
  }) {
    this.name = name;
    this.emitValueMultiplier = emitValueMultiplier;
    this.powerType = powerType;
    this.value = value ?? 0;
    this.duration = duration ?? 0;
    this.canDispelWith = canDispelWith ?? null;
    this.canAction = canAction ?? true;
    this.isNegative = isNegative;
    this.immediately = immediately ?? false;
  }
}
