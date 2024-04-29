import { Armor } from "@/classes/armor";
import { Weapon } from "@/classes/weapon";
import { Card } from "flowbite-react/components/Card";

export function EquipmentCard({
  weapon,
  armor,
  size,
  previewMode,
}: {
  weapon?: Weapon;
  armor?: Armor;
  previewMode?: true;
  size?: { width: number; height?: number };
}) {
  return (
    <Card
      renderImage={() => (
        <img
          draggable={false}
          src={weapon?.image || armor?.image || ""}
          alt={weapon?.name || armor?.name || ""}
        />
      )}
      className="max-w-sm overflow-hidden select-none hover:scale-105"
      style={{ width: size?.width, height: size?.height }}
    >
      {!previewMode && (
        <div className="p-3 bg-black capitalize">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {weapon?.name || armor?.name}
          </h5>
          <div className="font-normal text-sm text-gray-700 dark:text-gray-400">
            <ul>
              <li>Level: {weapon?.levelExp.level || armor?.levelExp.level}</li>
              <li>Damage: {weapon?.powerValue}</li>
              <li>Damage type: {weapon?.damageType}</li>
              <li>Type: {weapon?.type}</li>
            </ul>
          </div>
        </div>
      )}
      {previewMode && (
        <h5 className="text-center capitalize tracking-tight text-gray-900 dark:text-white">
          {weapon?.name || armor?.name}
        </h5>
      )}
    </Card>
  );
}
