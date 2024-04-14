export enum TraitEnum {
  HUMAN = 0,
  ROBOT = 1,
}

export type TraitType = {
  id:number,
  name:string,
}

export const TraitData:TraitType[] = [
  {
    id:0,
    name:"human"
  },
  {
    id:1,
    name:"robot"
  }
]
