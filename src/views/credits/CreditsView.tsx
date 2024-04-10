import "../credits/credits.css";

export default function CreditsView() {
  const fieldData = [
    { name: "Aphidech Mahakoat", user: "@jjack46", year: "2024" },
    { name: "FrozenXSouL", user: "@FrozenXSouL", year: "2024" },
  ];

  const handleGoBack = () => {
    history.back();
  };

  return (
    <>
      <div className="mist-background"></div>
      <div className="absolute w-full h-full top-0 -z-40 backdrop-blur-3xl"></div>
      <div
        className="absolute left-1/3  inset-32 -z-50 bg-gradient-to-br from-blue-500 to-red-600 rounded-full"
        style={{ width: 500, height: 500 }}
      ></div>
      <span rel="container" className="flex justify-around mx-40">
        <div rel="contents" className="grid grid-cols-2 gap-10 mt-20">
          {fieldData.map((data, index) => (
            <div
              key={index}
              className="p-12 w-96 rounded-xl bg-black bg-opacity-75 hover:scale-105 border-2 hover:border-red-500"
            >
              <p className="text-3xl">{data.name}</p>
              <p className="text-lg">{data.user}</p>
              <p className="text-lg">{data.year}</p>
            </div>
          ))}
        </div>
      </span>
      <div className="my-20"></div>
      <div className="flex flex-col w-auto justify-center  ">
        <button
          className="p-2 w-32  mx-auto px-10 border-2 rounded-xl hover:scale-105"
          onClick={handleGoBack}
        >
          Back
        </button>
        <footer className="flex my-5 justify-center">
          @2024 All Rights Reserved.
        </footer>
      </div>
    </>
  );
}
