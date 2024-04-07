import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { Skill } from "../../../models/skills";

const PopupDialog = ({
  closeModal,
  skills,
}: {
  closeModal: Dispatch<SetStateAction<boolean>>;
  skills: Skill[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <div
        rel="overlay"
        onClick={() => closeModal(false)}
        className="flex justify-center"
      >
        <div
          rel="contents"
          className="p-2 rounded-lg bg-gray-950 cursor-pointer w-full"
        >
          <ul className="flex gap-4 justify-around">
            {skills.map((skill) => (
              <li
                onMouseEnter={() => handleHover(0)}
                onMouseLeave={() => handleMouseLeave()}
                style={{ color: hoveredIndex !== null ? "red" : "inherit" }}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket}></FontAwesomeIcon>
                <p className="text-xs">{skill.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default PopupDialog;
