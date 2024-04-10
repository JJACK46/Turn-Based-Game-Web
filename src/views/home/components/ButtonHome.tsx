import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
  onClick?: () => void;
}

const ButtonHome: FC<Props> = (props) => {
  return (
    <>
      <button onClick={props.onClick}>
        <Link
          to={props.path}
          className="font-mono uppercase font-extrabold text-7xl hover:italic border-red-100 hover:text-red-600 hover:border-b-2 hover:border-red-600"
        >
          {props.title}
        </Link>
      </button>
    </>
  );
};

export default ButtonHome;
