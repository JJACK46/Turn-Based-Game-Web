import CardPlaceholder from "./components/CardPlaceholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";

export default function Stage() {
  return (
    <>
      <span className="py-1 justify-center bg-black flex">Map names</span>
      <div rel="enemies-section" className="py-4 absolute top-10 w-full">
        <span className="grid grid-cols-6 gap-4 justify-items-center">
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
        </span>
      </div>
      <div rel="players-section" className="py-4 absolute bottom-20 w-full">
        <span className="grid grid-cols-4 gap-4 justify-items-center">
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
        </span>
      </div>
      <span className="py-4 justify-center bg-black flex fixed w-full bottom-0">
        <ul className="flex gap-4">
          <li>
            <button
              className="rounded-md p-2"
              style={{ background: "#122a33" }}
            >
              <FontAwesomeIcon icon={faBox} className="mr-2"></FontAwesomeIcon>
              Inventory
            </button>
          </li>
        </ul>
        <p className="absolute left-4">Round : </p>
      </span>
    </>
  );
}
