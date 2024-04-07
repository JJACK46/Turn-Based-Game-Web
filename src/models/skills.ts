import { DamageType } from "./damageType";

export type Skill = {
  name: string;
  isAttackSkill: boolean;
  type: DamageType;
  requiredEnergy?: number;
  requiredHealth?: number;
  comboAble?: true;
  comboWith?: Skill[];
  emitValueMultiply: number;
  requiredMana: number;
};
