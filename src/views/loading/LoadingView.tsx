import { getRandomTrivia } from "@/data/trivia";
import { useEffect, useState } from "react";
import { useLoaderStore } from "./stores/loadingStore";

interface Props {
  title: string;
}

const LoadingView = (props: Props) => {
  const [progressValue, setProgressValue] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [trivia, setTrivia] = useState<string | null>(null);
  const { setLoading } = useLoaderStore();

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const randomTrivia = await getRandomTrivia();
        setTrivia(randomTrivia);
      } catch (error) {
        console.error("Error fetching trivia:", error);
      }
    };

    fetchTrivia();

    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    const loadTime = setInterval(() => {
      setProgressValue((prevValue) => {
        const newValue = prevValue + 1;
        if (newValue === 100) {
          clearInterval(loadTime);
          setTimeout(() => {
            setAnimate(false);
            setLoading(false);
          }, 500);
        }
        return newValue;
      });
    }, 20);

    return () => clearInterval(loadTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <span
        rel="loader-wrapper"
        className={`select-none z-[100] overflow-hidden fixed w-full h-full bg-black inset-0 flex justify-center items-center 
        transition-opacity duration-500
        ${progressValue >= 100 ? "opacity-0" : "opacity-100"}`}
      >
        <div
          rel="loader-sub-wrapper"
          className="flex flex-col justify-center items-center"
        >
          <div
            rel="loader"
            className={`w-16 h-20 inline-block text-center border-4 rounded-lg border-white ${
              animate ? "animate-bounce" : ""
            } `}
          ></div>
          <div className="w-40 h-2 bg-gray-600 rounded-lg">
            <div
              className="bg-white flex h-full rounded-lg"
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            ></div>
          </div>
          <p className="text-center text-2xl my-2">{props.title}</p>
          <p className="text-gray-300">{trivia}</p>
        </div>
      </span>
    </>
  );
};
export default LoadingView;
