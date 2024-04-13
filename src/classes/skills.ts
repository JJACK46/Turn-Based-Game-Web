import { PowerType } from "./powerType";

export type Skill = {
  name: string;
  isAttackSkill: boolean;
  type: PowerType;
  requiredEnergy?: number;
  requiredHealth?: number;
  comboAble?: true;
  comboWith?: Skill[];
  emitValueMultiply: number;
  requiredMana: number;
  downtimeRound?: number;
};
