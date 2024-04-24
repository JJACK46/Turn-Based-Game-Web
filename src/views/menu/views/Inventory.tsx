import { WeaponEnum } from "@/classes/weapon";
import { PowerEnum } from "@/data/enums/powers";
import { BASE_URL_IMAGE_WEAPONS } from "@/utils/constants";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { Badge } from "flowbite-react";
import { WeaponCard } from "../components/WeaponCard";

export function InventoryView() {
  return (
    <>
      <div className="w-full flex flex-col justify-center gap-4 items-center">
        <div
          rel="search-btn"
          className="relative flex rounded-full bg-black/50 pl-4 w-fit"
        >
          <input
            type="text"
            className="bg-transparent focus:outline-none w-full"
          />
          <Icon className="right-0 m-2" path={mdiMagnify} size={1}></Icon>
        </div>
        <span rel="filter" className="flex flex-col gap-2">
          <div>
            Type:
            <div className="flex flex-wrap gap-2">
              {Object.values(WeaponEnum).map((weapon, index) => (
                <Badge
                  key={index}
                  className="bg-blue-500 capitalize select-none"
                >
                  {weapon}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            Damage Type:
            {Object.values(PowerEnum).map((power, index) => (
              <Badge key={index} className="bg-blue-500 capitalize select-none">
                {power}
              </Badge>
            ))}
          </div>
        </span>
      </div>
      <div className="grid grid-cols-8">
        <WeaponCard
          imgUrl={`${BASE_URL_IMAGE_WEAPONS}/swords/katana_sword.jpeg`}
          name="Katana"
        ></WeaponCard>
      </div>
    </>
  );
}
