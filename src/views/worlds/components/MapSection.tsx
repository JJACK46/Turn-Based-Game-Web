export const MapSection = (props: {
  backgroundUrl: string;
  children: React.ReactNode;
}) => {
  const backgroundStyle =
    props.backgroundUrl.length > 0
      ? {
          backgroundImage: `url(${props.backgroundUrl})`,
          backgroundSize: "cover",
        }
      : {
          backgroundImage: 'url("/images/maps/Astralis_city.jpeg")', // Fallback to a default background image
          backgroundSize: "cover",
        };

  return (
    <section
      className={`z-0 px-10 flex flex-row justify-around w-full h-screen`}
      style={backgroundStyle}
    >
      {props.children}
    </section>
  );
};
