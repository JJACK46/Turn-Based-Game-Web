import { Link } from "react-router-dom";

export function MenuView() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Link
          to={"/worlds"}
          className="flex flex-row justify-center items-center w-full h-1/3 bg-gray-500"
        >
          <h1 className="p-10 text-6xl flex">Navigation</h1>
        </Link>
        <div className="flex flex-row justify-center items-center w-full h-1/3 bg-gray-700">
          <h1 className="p-10 text-6xl flex">Basement</h1>
        </div>
        <Link
          to={"/codex"}
          className="flex flex-row justify-center items-center w-full h-1/3 bg-gray-500"
        >
          <h1 className="p-10 text-6xl flex">Codex</h1>
        </Link>
      </div>
    </>
  );
}
