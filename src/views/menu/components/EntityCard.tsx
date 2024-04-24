import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useState } from "react";

export function EntityCard() {
  const [openModal, setOpenModal] = useState(false);

  function handleSaveEntity() {
    setOpenModal(false);
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <div className="border h-[452px] w-64 rounded-lg overflow-hidden hover:border-cyan-300">
          <img
            src={`${BASE_URL_IMAGE_ENTITIES}/super_soldier_rifle_1.jpeg`}
            alt=""
            draggable={false}
          />
          <div className="p-3 select-none">
            <h5 className="text-sm bg-red-500 rounded-full px-2 py-0.5 w-fit">
              Trait
            </h5>
            <h5 className="text-lg">Name</h5>
            <p className="text-gray-300"> stats</p>
          </div>
        </div>
      </button>
      {openModal && (
        <span className="fixed size-full inset-0 flex justify-center items-center">
          <button
            onClick={handleSaveEntity}
            className="z-30 fixed indent-0 size-full bg-black/50 backdrop-blur"
          ></button>
          <div className="z-40 bg-slate-600 rounded-lg p-3 h-1/2 relative">
            <div className="flex flex-row justify-center gap-6">
              <img
                draggable={false}
                src={`${BASE_URL_IMAGE_ENTITIES}/super_soldier_rifle_1.jpeg`}
                className="object-cover w-52 "
                alt="entity name"
              />
              <div className="border border-dashed w-52 rounded flex justify-center items-center">
                weapons
              </div>
              <div className="border border-dashed w-52 rounded flex justify-center items-center">
                armor
              </div>
            </div>
            <div className="p-2 space-y-2 select-none">
              <div>stat</div>
            </div>
            <div className="flex flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-500 p-0.5 text-gray-800 rounded-full w-fit px-2 text"
              >
                Cancel
              </button>
              <button className="bg-blue-500 p-0.5 rounded-full w-fit px-2 text">
                Confirm
              </button>
            </div>
          </div>
        </span>
      )}
    </>
  );
}
