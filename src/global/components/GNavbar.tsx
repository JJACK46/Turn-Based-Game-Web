import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  backTo: string;
}

export function GNavbar({ title, backTo }: Props) {
  return (
    <div className="z-[1] absolute border-b w-full flex justify-between bg-black/80 backdrop-blur-sm gap-3 p-3 text-xl">
      <div>{title}</div>
      <Link to={backTo}>
        <Icon path={mdiArrowLeft} size={1}></Icon>
      </Link>
    </div>
  );
}
