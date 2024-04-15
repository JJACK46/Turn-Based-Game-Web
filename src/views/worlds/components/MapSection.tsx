export const MapSection = (props: {
  backgroundUrl: string;
  children: React.ReactNode;
}) => (
  <section
    className={`px-40 flex flex-row justify-around w-full h-screen backdrop-blur
     bg-cover bg-astralis-city 
      `}
  >
    {/* <div className="backdrop-blur inset-0 w-full h-full absolute -z-50"></div> */}
    {props.children}
  </section>
);
