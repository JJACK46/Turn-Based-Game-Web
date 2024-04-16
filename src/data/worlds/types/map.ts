export interface MapData {
  name: string;
  entitiesLevel: number[];
  grade: "COMMON" | "UNCOMMON" | "HARD" | "BOSS";
  detail?: string;
  cardImageUrl: string;
  backgroundImageUrl?: string;
}
