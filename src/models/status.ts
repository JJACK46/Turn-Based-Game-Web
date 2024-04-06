export type Status = {
  title: string;
  canAction: boolean;
  remainRound?: number;
  immuneTo?: Status[];
  negativeBuff?: true;
};
