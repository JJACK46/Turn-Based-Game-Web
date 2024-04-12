import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
  onClick?: () => void;
}

const ButtonHome = (props: Props) => {
  return (
    <>
      <button onClick={props.onClick}>
        <Link
          to={props.path}
          className="font-mono text-white/80 drop-shadow uppercase font-extrabold text-7xl hover:italic hover:text-red-600 hover:border-b-8 hover:border-red-600"
        >
          {props.title}
        </Link>
      </button>
    </>
  );
};

export default ButtonHome;
