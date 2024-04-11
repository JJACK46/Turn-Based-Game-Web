// import { useAppDispatch } from "@/app/hooks";
import { FC, useEffect, useState } from "react";
// import { setLoadingComplete } from "./features/loadingReducer";

interface Props {
  title: string;
}

const LoadingView: FC<Props> = (props) => {
  const [progressValue, setProgressValue] = useState(0);
  const [animate, setAnimate] = useState(false);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    const loadTime = setInterval(() => {
      setProgressValue((prevValue) => {
        // Increment progressValue by 1
        const newValue = prevValue + 1;
        // If progressValue reaches 100, clear the interval
        if (newValue === 100) {
          clearInterval(loadTime);
          setAnimate(true);
          setTimeout(() => {
            // dispatch(setLoadingComplete(true));
          }, 500);
        }
        return newValue;
      });
    }, 20);

    // Clear the interval when the component unmounts
    return () => clearInterval(loadTime);
  }, []);

  return (
    <>
      <span
        rel="loader-wrapper"
        className={`absolute w-full h-full bg-black top-0 left-0 flex justify-center items-center 
        transition-opacity duration-500
        ${animate ? "opacity-0" : "opacity-100"}`}
      >
        <div
          rel="loader-sub-wrapper"
          className="flex flex-col justify-center items-center"
        >
          <div
            rel="loader"
            className="w-16 h-16 inline-block text-center border-4 rounded-lg border-white animate-pulse"
          ></div>
          <p className="text-center my-2">{props.title}</p>
          <div className="w-40 h-2 bg-gray-600 rounded-lg">
            <div
              className="bg-white flex h-full rounded-lg"
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            ></div>
          </div>
        </div>
      </span>
    </>
  );
};
export default LoadingView;
