import { PowerEnum } from "@/data/enums/powers";

// export type Status = {
//   name: string;
//   canAction: boolean;
//   valueMultiply?: number;
//   duration?: number;
//   immuneTo?: PowerEnum;
//   canDispel?: boolean;
// };

export class Status {
  name: string;
  canAction: boolean;
  valueMultiply?: number;
  duration?: number;
  immuneTo?: PowerEnum;
  canDispel?: boolean;

  constructor(props: {
    name: string;
    canAction: boolean;
    valueMultiply?: number;
    duration?: number;
    immuneTo?: PowerEnum;
    canDispel?: boolean;
  }) {
    this.name = props.name;
    this.canAction = props.canAction;
    this.valueMultiply = props.valueMultiply;
    this.duration = props.duration;
    this.immuneTo = props.immuneTo;
    this.canDispel = props.canDispel;
  }
}
