import { PowerEnum } from "@/data/enums/powers";

export class EffectSkill {
  key: string;
  emitValueMultiplier: number;
  value: number;
  powerType: PowerEnum;
  duration: number;
  canDispel: boolean;
  canAction: boolean;

  constructor({
    key,
    emitValueMultiplier,
    powerType,
    value,
    duration,
    canDispel,
    canAction,
  }: {
    key: string;
    emitValueMultiplier: number;
    powerType: PowerEnum;
    value?: number;
    duration?: number;
    canDispel?: boolean;
    canAction?: boolean;
  }) {
    this.key = key;
    this.emitValueMultiplier = emitValueMultiplier;
    this.powerType = powerType;
    this.value = value ?? 0;
    this.duration = duration ?? 0;
    this.canDispel = canDispel ?? true;
    this.canAction = canAction ?? true;
  }
}
