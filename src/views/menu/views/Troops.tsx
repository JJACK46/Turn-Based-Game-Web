import { useUserStore } from "@/global/userStore";
import { EntityCard } from "../components/EntityCard";

export function TroopsView() {
  const user = useUserStore();
  const troops = user.troops;
  return (
    <>
      <span className="grid grid-cols-6 gap-5">
        {troops.map((entity, index) => (
          <EntityCard key={index} entity={entity}></EntityCard>
        ))}
      </span>
    </>
  );
}
