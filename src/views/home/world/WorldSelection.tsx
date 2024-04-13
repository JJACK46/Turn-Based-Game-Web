import { useParams } from "react-router-dom";
// import { useWorldStore } from "../store/worldStore";

function WorldSelection() {
  const { id } = useParams();
  // const worldStore = useWorldStore();
  // switch (id) {
  //     case "0":
  //         worldStore.setMap()
  //         break;
  //     case "1":
  //         worldStore.setMap()
  //         break;
  //     case "2":
  //         worldStore.setMap()
  //         break;
  // }
  return (
    <div className="flex flex-col items-center justify-around w-full min-h-screen h-screen bg-black">
      <div className="flex justify-center items-center w-fit h-2/6">
        <h1 className="font-mono font-extrabold text-5xl p-10 px-20 border-2 border-white rounded-xl">
          {id}
        </h1>
      </div>
      <div className="flex flex-col justify-around items-center gap-10 w-full h-4/6 border-2 border-blue-500">
        <div className="flex justify-around items-center gap-10 w-full h-1/4 px-60">
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">1</h1>
          </button>
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">2</h1>
          </button>
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">3</h1>
          </button>
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">4</h1>
          </button>
        </div>

        <div className="flex justify-around items-center gap-10 w-full h-1/4 px-28">
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">5</h1>
          </button>
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">6</h1>
          </button>
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">7</h1>
          </button>
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">8</h1>
          </button>
        </div>

        <div className="flex justify-around items-center gap-10 w-full h-1/4 px-80">
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">9</h1>
          </button>
          <button
            // onClick={}
            className="flex flex-col items-center justify-center size-20 border-2 border-red-500 bg-red-500"
          >
            <h1 className="font-mono font-semibold text-lg">10</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorldSelection;
