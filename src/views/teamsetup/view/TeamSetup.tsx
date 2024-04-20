import { Entity } from "@/classes/entity";
import { useInventoryStore } from "../store/inventoryStore";
import { Link } from "react-router-dom";

export default function TeamSetup() {
  const {
    entityInventory,
    weaponInventory,
    armorInventory,
    frontRow,
    backRoW,
  } = useInventoryStore();
  return (
    <div className="absolute flex flex-col justify-center items-center size-full gap-5 p-16 bg-black">
      <h1 className="text-5xl mt-10 py-2 px-32 border-2 border-white rounded-xl">
        Team Setup
      </h1>
      <div className="flex justify-center items-center size-full gap-5">
        <div className="flex flex-col items-center justify-around h-full w-3/5  border-2 border-white rounded-xl">
          {/* <h1>FIELD</h1> */}
          <div className="flex flex-col w-full h-1/3 bg-slate-400">
            <h1 className="text-3xl text-center py-2 px-32">FRONT</h1>
            <div className="flex justify-around w-full h-full">
              {/* {frontRow.map((item:Entity,index:number)=> (

                ))} */}
            </div>
          </div>
          <div className="flex flex-col w-full h-1/3 bg-slate-200">
            <h1 className="text-3xl text-center py-2 px-32 text-black">BACK</h1>
            <div className="flex justify-around w-full h-full">
              {/* {backRow.map((item:Entity,index:number)=> (

                ))} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden h-full w-2/5 justify-around border-2 border-white rounded-xl">
          <h1 className="flex text-4xl text-center justify-center items-center p-2 px-32 w-full">
            INVENTORY
          </h1>
          <div className=" w-full h-2/6">
            <h1>Character</h1>
            <div className="flex justify-around w-full h-5/6 bg-slate-600">
              {/* {backRow.map((item:Entity,index:number)=> (

                ))} */}
            </div>
          </div>
          <div className=" w-full h-1/6 ">
            <h1>Item</h1>
            <div className="flex justify-around w-full h-5/6 bg-slate-400">
              {/* {backRow.map((item:Entity,index:number)=> (

                ))} */}
            </div>
          </div>
          <div className=" w-full h-1/6 ">
            <h1>Weapon</h1>
            <div className="flex justify-around w-full h-5/6 bg-slate-800">
              {/* {backRow.map((item:Entity,index:number)=> (

                ))} */}
            </div>
          </div>
          <div className=" w-full h-1/6 ">
            <h1>Armor</h1>
            <div className="flex justify-around w-full h-5/6 bg-slate-200">
              {/* {backRow.map((item:Entity,index:number)=> (

                ))} */}
            </div>
          </div>
        </div>
      </div>
      <Link to={"/stage"} className="uppercase border p-2 px-10 rounded-lg">
        confirm
      </Link>
    </div>
  );
}
