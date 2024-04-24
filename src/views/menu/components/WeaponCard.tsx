import { Card } from "flowbite-react/components/Card";

interface Props {
  imgUrl: string;
  name: string;
  // data: {}
}

export function WeaponCard({ name, imgUrl }: Props) {
  return (
    <Card
      // imgSrc={`${BASE_URL_IMAGE_WEAPONS}/swords/katana_sword.jpeg`}
      renderImage={() => <img draggable={false} src={imgUrl} alt={name} />}
      className="max-w-sm overflow-hidden select-none"
    >
      <div className="p-3 bg-black">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <div className="font-normal text-sm text-gray-700 dark:text-gray-400">
          {/* data */}
          <ul>
            <li>Level: 1</li>
            <li>Damage: 1</li>
            <li>Damage type: Physical</li>
            <li>Type: Sword</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
