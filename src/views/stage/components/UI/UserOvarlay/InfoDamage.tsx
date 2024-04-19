import { useGameStore } from "@/views/stage/stores/gameStore";

export function InfoDamageOverlay() {
  const {
    infoDamage: { lastHitDamage, blockedDamage, totalHitDamage, missed },
  } = useGameStore();
  return (
    <span className="absolute top-32 right-8 flex flex-col z-10">
      {lastHitDamage > 0 && (
        <i className="font-medium text-lg">Hit Damage: {lastHitDamage}</i>
      )}
      {blockedDamage > 0 && !missed && (
        <i className="font-medium text-lg">Blocked Damage: {blockedDamage}</i>
      )}
      {totalHitDamage > 0 && !missed && (
        <i className="font-medium text-2xl ">Total Damage: {totalHitDamage}</i>
      )}
      {missed && <i className="font-medium text-lg ">Missed !</i>}
    </span>
  );
}
