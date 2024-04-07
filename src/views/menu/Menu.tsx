import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="flex w-full min-h-screen bg-stone-500">
      <div className="w-full min-h-screen bg-black opacity-60"></div>

      <div className="absolute flex flex-col items-center size-full justify-center gap-5 ">
        <h1 className="font-mono font-extrabold text-7xl">Select the World</h1>

        <div className="flex flex-row justify-between w-full h-3/5 p-20">
          <button className="font-mono text-lg border-white border-2 w-96 h-56 flex-wrap justify-center hover:text-black">
            <div className="size-full bg-red-600">picture 1</div>
            <p>World 1</p>
          </button>

          <button className="font-mono text-lg border-white border-2 w-96 h-56 flex-wrap justify-center hover:text-black">
            <div className="size-full bg-red-600">picture 2</div>
            <p>World 2</p>
          </button>

          <button className="font-mono text-lg border-white border-2 w-96 h-56 flex-wrap justify-center hover:text-black">
            <div className="size-full bg-red-600">picture 3</div>
            <p>World 3</p>
          </button>
        </div>
      </div>
      <Link
        to="/"
        className="absolute size-fit py-2 px-5 border-white border-2"
      >
        {"<"}
      </Link>
    </div>
  );
}

export default Menu;
