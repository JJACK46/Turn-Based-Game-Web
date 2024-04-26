import { Weapon } from "@/classes/weapon";
import { Card } from "flowbite-react/components/Card";

export function WeaponCard({ weapon }: { weapon: Weapon }) {
  return (
    <Card
      renderImage={() => (
        <img draggable={false} src={weapon.image} alt={weapon.name} />
      )}
      className="max-w-sm overflow-hidden select-none"
    >
      <div className="p-3 bg-black capitalize">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {weapon.name}
        </h5>
        <div className="font-normal text-sm text-gray-700 dark:text-gray-400">
          <ul>
            <li>Level: {weapon.level}</li>
            <li>Damage: {weapon.powerValue}</li>
            <li>Damage type: {weapon.damageType}</li>
            <li>Type: {weapon.type}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
