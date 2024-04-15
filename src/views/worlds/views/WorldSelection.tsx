import { useParams } from "react-router-dom";
import { MapButton } from "../components/MapButton";
import { MapSection } from "../components/MapSection";
import { AstralisMaps } from "@/data/worlds/astralis/maps";
import LoadingView from "@/views/loading/LoadingView";
import { useLoaderStore } from "@/views/loading/stores/loadingStore";

function WorldSelection() {
  const { name: worldName } = useParams();
  const { isLoading } = useLoaderStore();

  return (
    <>
      {isLoading && <LoadingView title={worldName ?? ""}></LoadingView>}
      <span className="flex flex-col items-center justify-center py-10 w-full h-full">
        <section className="flex justify-center items-center mb-10">
          <h1 className="text-4xl py-2 px-32 border-2 border-white rounded-xl">
            {worldName}
          </h1>
        </section>
        {["A", "B", "C"].map((grade) => (
          <MapSection key={grade} backgroundUrl={``}>
            {AstralisMaps.filter((map) => map.grade === grade).map((map) => (
              <MapButton
                key={map.name}
                name={map.name}
                imageUrl=""
                details=""
                enemyLevels={[1, 10]}
              />
            ))}
          </MapSection>
        ))}
      </span>
    </>
  );
}

export default WorldSelection;
