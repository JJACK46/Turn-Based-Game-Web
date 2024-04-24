import { EntityCard } from "../components/EntityCard";

export function TroopsView() {
  return (
    <>
      <span className="grid grid-cols-6 gap-5">
        <EntityCard></EntityCard>
        <EntityCard></EntityCard>
        <EntityCard></EntityCard>
        <EntityCard></EntityCard>
        <EntityCard></EntityCard>
        <EntityCard></EntityCard>
        <EntityCard></EntityCard>
      </span>
    </>
  );
}
