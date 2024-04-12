import { useUIStore } from "../stores/UI_Store";

export function TurnWarning() {
  const { setTurnWarning } = useUIStore();
  return (
    <span className="absolute inset-0 flex items-center justify-center size-full z-10">
      <button
        onClick={() => {
          setTurnWarning(false);
        }}
        className="top-0 left-0 size-full bg-black opacity-40"
      ></button>
      <div className="absolute flex justify-center items-center p-8 bg-black rounded-2xl border-2 border-white">
        <h3 className="font-mono text-3xl font-bold">Not Your Turn!</h3>
      </div>
    </span>
  );
}

export function ActionWarning() {
  const { setActionWarning } = useUIStore();
  return (
    <span className="absolute inset-0 flex items-center justify-center size-full z-10">
      <button
        onClick={() => {
          setActionWarning(false);
        }}
        className="top-0 left-0 size-full bg-black opacity-40"
      ></button>
      <div className="absolute flex justify-center items-center p-8 bg-black rounded-2xl border-2 border-white">
        <h3 className="font-mono text-3xl font-bold">
          Character Already Action!
        </h3>
      </div>
    </span>
  );
}
