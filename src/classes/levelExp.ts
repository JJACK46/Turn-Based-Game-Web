type ExpType = {
  level?: number;
  exp?: number;
};

export class LevelExp {
  level: number = 1;
  exp: number = 0;
  maxExp: number = 1000;

  constructor({ level, exp }: ExpType) {
    this.level = level ?? 1;
    this.exp = exp ?? 0;
    this.maxExp = level ?? 1 * 1000
  }

  increaseExp(amount: number) {
    if (amount >= this.maxExp) {
      this.level++;
      this.maxExp += 1000;
    }
  }
}
