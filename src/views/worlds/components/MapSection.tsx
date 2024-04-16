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
      : {};

  return (
    <section
      className={`z-0 px-10 flex flex-row justify-around w-full h-screen sticky top-0`}
      style={backgroundStyle}
    >
      {props.children}
    </section>
  );
};
