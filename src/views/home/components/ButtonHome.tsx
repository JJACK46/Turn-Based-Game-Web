import { Link } from "react-router-dom";
import useSound from "use-sound";
import clickSound from "/sounds/ui/click-button.mp3";

interface Props {
  title: string;
  path: string;
  onClick?: () => void;
}

const ButtonHome = (props: Props) => {
  const [playClickSound] = useSound(clickSound, { volume: 0.3 });

  const handleClick = () => {
    props.onClick;
    playClickSound();
  };

  return (
    <>
      <button onClick={handleClick}>
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
