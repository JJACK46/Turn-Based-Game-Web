import { Link } from "react-router-dom";

export interface PropsMenu {
  title: string;
  path: string;
  bgPath: string;
}

export function MenuButton({ title, path, bgPath: bg }: PropsMenu) {
  return (
    <Link
      to={path}
      className={`flex flex-row justify-center items-center w-full h-1/3 ${bg}
          bg-cover backdrop-blur bg-no-repeat bg-center`}
    >
      <div className="hover:backdrop-blur-sm size-full flex justify-center items-center bg-black/20 ">
        <h1 className="text-6xl flex hover:border-b-8 hover:border-white hover:italic">
          {title}
        </h1>
      </div>
    </Link>
  );
}
